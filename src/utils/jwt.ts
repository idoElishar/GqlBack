import jwt from 'jsonwebtoken';
import { secret_key } from '../server';


export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, secret_key, { expiresIn: '3h' });
};