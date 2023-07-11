
import { db } from "../../../database/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function registerUser(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userExists = await db('users').where({ email }).first();
        if (userExists) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            const user = await db('users').insert({ name, email, password: hashedPassword }).returning('*');

            res.status(200).json({
                message: 'User created successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

