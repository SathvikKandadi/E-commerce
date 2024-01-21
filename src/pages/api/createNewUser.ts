import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/User';
import dbConnect from '@/lib/dbConnect';
import * as bcrypt from 'bcrypt';

type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const {
        email,
        username,
        password,
      } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email, username, and password are required fields.',
        });
      }
      
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            // Username or email already exists
            res.status(400).json({ success:false , message: "Username or email already in use" });
            return;
        }
      const encryptedPassword = await encryptPassword(password);
      
      console.log(email);
      console.log(encryptedPassword);

      const newUser = new User({
                email,
                username,
                password:encryptedPassword,
            });
        
      await newUser.save();

      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      console.error('Error while creating new user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          reject(err);
        } else {
          console.log(hash);
          resolve(hash);
        }
      });
    });
  }