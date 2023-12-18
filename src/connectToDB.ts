import mongoose, { Document, Schema } from 'mongoose';
import chalk from "chalk";
import { Users, userSchema } from './interface';
import { api } from './server';

const icon = `
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳━━╮
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╮╭╮┃╭╮┃
╭╮╭┳━━┳━╮╭━━┳━━╮┃┃┃┃╰╯╰╮
┃╰╯┃╭╮┃╭╮┫╭╮┃╭╮┃┃┃┃┃╭━╮┃
┃┃┃┃╰╯┃┃┃┃╰╯┃╰╯┣╯╰╯┃╰━╯┃
╰┻┻┻━━┻╯╰┻━╮┣━━┻━━━┻━━━╯
╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╰━━╯`;

export { UserModel };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(api);
        console.log(chalk.greenBright(`Connected to ${icon}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }


const UserModel = mongoose.model<Users>('banners', userSchema, 'users');