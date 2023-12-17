import { Types } from "mongoose";
import { server } from "../../src/server";
import usersDAL from "../../src/users/Dal.users";
import usersService from "../../src/users/service.users";
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
      const users = await usersDAL.getAllUsers();
      return users;
    },
    getUserById: async (_: any, { id }: any) => {
      const user = await usersDAL.getUserById(id);
      console.log(user);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    },
  },
  Mutation: {
    deleteUser:async (_:any,id:string) => {
      const deletionResult = await usersDAL.deleteUserById(id);
      if (!deletionResult) {
        throw new Error('Error deleting user.');
      }
  
      return  'User deleted successfully' ;
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
        return updatedUser;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
  },
};
