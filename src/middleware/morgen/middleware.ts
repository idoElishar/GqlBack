import jwt from 'jsonwebtoken';
const SECRET_KEY = 'erp';
export const authenticateToken = (token:any) => {
  return new Promise((resolve, reject) => {
    console.log("hi"+token);
    if (!token) {
      return reject(new Error('Unauthorized: Missing token'));
    }
    jwt.verify(token, SECRET_KEY, (err:any, user:any) => {
      if (err) {
        return reject(new Error('Forbidden: Invalid token'));
      }
      resolve(user);
    });
  });
};