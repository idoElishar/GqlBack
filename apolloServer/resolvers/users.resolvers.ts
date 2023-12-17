import { Types } from "mongoose";
import { server } from "../../src/server";
import usersDAL from "../../src/users/Dal.users";
import usersService from "../../src/users/service.users";
import { client } from "../../src/server";

import {
  changePasswordSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from "../../src/users/users.model";
import { generateToken } from "../../src/utils/jwt";
import { sendVerificationEmail } from "../../src/utils/sendEmail";

export const usersResolvers = {
  Query: {
    users: async () => {
      try {
        console.log('Request received to get all users');
        const cachedUsers = await client.get('users');
        if (cachedUsers) {
          console.log("Returning cached users");
          return JSON.parse(cachedUsers);
        }
        console.log("Fetching users from the database.");
        const users = await usersDAL.getAllUsers();
        await client.set('users', JSON.stringify(users), {
        });

        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Internal server error');
      }
    }
    ,
    getUserById: async (_: any, { id }: any) => {
      try {
        const cachedUser = await client.get(`user:${id}`);
        if (cachedUser) {
          console.log("Returning cached user");
          return JSON.parse(cachedUser);
        }

        console.log("Fetching user from the database.");
        const user = await usersDAL.getUserById(id);
        if (!user) {
          throw new Error("User not found.");
        }

        await client.set(`user:${id}`, JSON.stringify(user));

        return user;
      } catch (error) {
        console.error(`Error fetching user by ID ${id}:`, error);
        throw new Error('Internal server error');
      }
    }

  },
  Mutation: {
    deleteUser: async (_: any, { id }: any) => {
      try {
        console.log("Attempting to delete user from the database and cache.");
        const deletionResult = await usersDAL.deleteUserById(id);
        if (!deletionResult) {
          throw new Error("Error deleting user.");
        }
        await client.del(`user:${id}`);
        console.log("User deleted successfully from the database and cache.");
        return deletionResult;
      } catch (error) {
        console.error(`Error deleting user by ID ${id}:`, error);
        throw new Error('Internal server error');
      }
    },

    loginUser: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;

      const { error } = loginUserSchema.validate({ email, password });
      if (error) {
        throw new Error(error.details[0].message);
      }

      try {
        const user = await usersService.loginUser(email, password);
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const token = generateToken(user.email);

        return { user, token };
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
    registerUser: async (_: any, args: { newUser: any }) => {
      const { error } = registerUserSchema.validate(args.newUser);
      if (error) {
        throw new Error(error.details[0].message);
      }

      try {
        const user = await usersService.registerUser(args.newUser);
        return user;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
    changePassword: async (
      _: any,
      args: { email: string; newPassword: string }
    ) => {
      const { email, newPassword } = args;
      const { error } = changePasswordSchema.validate({ email, newPassword });
      if (error) {
        throw new Error(error.details[0].message);
      }

      try {
        const user = await usersDAL.getUserByEmail(email);
        if (!user) {
          throw new Error("User not found");
        }

        const token = generateToken(user._id.toString());
        await usersService.saveTemporaryPasswordAndToken(
          email,
          newPassword,
          token
        );

        const verificationUrl = `${server}/users/verifypasswordchange?token=${token}`;

        try {
          await sendVerificationEmail(email, verificationUrl);
          return {
            message:
              "Verification email sent. Please check your email to confirm password change.",
          };
        } catch (emailError) {
          console.error("Error sending verification email:", emailError);
          throw new Error("Failed to send verification email.");
        }
      } catch (error) {
        throw new Error("User not found");
      }
    },
    updateUserById: async (
      _: any,
      args: { id: string; updatedUserData: any }
    ) => {
      const { id, updatedUserData } = args;
    
      const { error } = updateUserSchema.validate(updatedUserData);
      if (error) {
        throw new Error(error.details[0].message);
      }
    
      const userId = new Types.ObjectId(id);
      try {
        const updatedUser = await usersService.updateUserById(
          userId,
          updatedUserData
        );
        if (!updatedUser) {
          throw new Error("User not found");
        }
    
        await client.set(`user:${id}`, JSON.stringify(updatedUser));
    
        return updatedUser;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } 
    }, 
  }, 
}; 
