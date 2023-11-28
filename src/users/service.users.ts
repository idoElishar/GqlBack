import { Types } from 'mongoose';
import usersDAL from './Dal.users';
import { UserInterface } from './users.model';
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};
const sendVerificationEmail = async (email: any, url: any) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'idoelishar81@gmail.com',
      pass: 'oqni opjs ggto cpjo'
    }
  });

  const mailOptions = {
    from: 'idoelishar81@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset. Click <a href="${url}">here</a> to reset your password.</p>`
  };

  await transporter.sendMail(mailOptions);
};
const usersService = {
  getAllUsers: async () => usersDAL.getAllUsers(),

  registerUser: async (user: UserInterface) => {
    const existingUser = await usersDAL.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const newUser = await usersDAL.createUser(user);
    if (!newUser) throw new Error("faild to create user");

    return { success: true, message: 'Registration successful', user: newUser };
  },
  getUserById: async (userId: string) => {
    const user = await usersDAL.getUserById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return { success: true, message: 'User retrieval successful', user };
  },
  deleteUserById: async (userId: string) => {
    const deletionResult = await usersDAL.deleteUserById(userId);
    if (!deletionResult) {
      throw new Error('Error deleting user.');
    }

    return { success: true, message: 'User deleted successfully' };
  },

  updateUserById: async (userId: Types.ObjectId, updateData: UserInterface) => {
    const existingUser = await usersDAL.getUserByMongoId(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }


    const updatedUser = await usersDAL.updateUserById(userId, updateData);
    if (!updatedUser) {
      throw new Error('Error updating user.');
    }

    return { success: true, message: 'User updated successfully', user: updatedUser };
  },
  loginUser: async (email: string, password: string) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }
    if (!user.isAdmin) {
      throw new Error('Access denied. Admin rights required.');
    }
    return { username: user.username, email: user.email, _id: user._id };
  },
  saveTemporaryPasswordAndToken: async (email: string, tempPassword: string, token: string) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    await usersDAL.saveTempPasswordAndToken(user._id, tempPassword, token);
  }
  ,

  changePassword: async (userId: string, newPassword: string) => {
    const user = await usersDAL.getUserById(userId);

    if (!user) {
      throw new Error('משתמש לא נמצא.');
    }

    const objectId = new Types.ObjectId(userId);

    const updatedUser = await usersDAL.updateUserById(objectId, { password: newPassword });
    if (!updatedUser) {
      throw new Error('שגיאה בעדכון הסיסמה.');
    }

    return { success: true, message: 'הסיסמה עודכנה בהצלחה' };
  },

  changePasswordByEmail: async (email: string) => {
    const user = await usersDAL.getUserByEmail(email);
    console.log('Changing password for email:', email);
    if (!user) {
      throw new Error('User not found');
    }

    // יצירת טוקן אימות וזמן תפוגה
    const token = generateToken();
    console.log('Generated token:', token);
    const expiration = new Date(Date.now() + 3600000); // זמן תפוגה 1 שעה מהזמן הנוכחי

    // שמירת הטוקן וזמן התפוגה במשתמש
    await usersDAL.savePasswordResetToken(user._id, token, expiration);
    // שליחת מייל עם קישור לאימות
    const verificationUrl = `http://localhost:8008/api/users/reset-password?token=${token}`;
    await sendVerificationEmail(email, verificationUrl);
    console.log('Sent verification email to:', email);
    return { success: true, message: 'Verification email sent. Please check your email to confirm password change.' };
  },


  verifyPasswordChange: async (token: string) => {
    // חיפוש המשתמש לפי הטוקן
    const user = await usersDAL.findUserByPasswordResetToken(token);
    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // בדיקה אם הטוקן עדיין בתוקף
    if (user.passwordResetExpires && new Date(user.passwordResetExpires) < new Date()) {
      throw new Error('Token has expired');
    }

    // עדכון הסיסמה לסיסמה החדשה שנשמרה באופן זמני
    const updatedUser = await usersDAL.updateUserById(user._id, { password: user.tempPassword, tempPassword: null, passwordResetToken: null, passwordResetExpires: null });
    if (!updatedUser) {
      throw new Error('Error updating password');
    }

    return { success: true, message: 'Password has been successfully updated' };
  }

}


export default usersService;




