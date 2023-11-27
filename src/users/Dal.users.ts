import { Types } from 'mongoose';
import { UserModel } from './users.model'; 
import { UserInterface } from './users.model'; 
interface UserUpdateData extends Partial<UserInterface> {}

const usersDAL = {
  getAllUsers: async () => {
    try {
      return await UserModel.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user= await UserModel.findOne({ email });
      return user
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },


 getUserById :async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},
 getUserByMongoId :async (userId: Types.ObjectId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; 
    }
},

  updateUserById: async (userId: Types.ObjectId, updateData: UserUpdateData) => {
    try {
      return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  createUser: async (user: UserInterface) => {
    try {
      return await UserModel.create(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  deleteUserById: async (userId: string) => {
    try {
      return await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
 

};

export default usersDAL;










