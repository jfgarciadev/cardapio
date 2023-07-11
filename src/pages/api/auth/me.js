import { db } from "../../../database/index.js";
import jwt from 'jsonwebtoken';

export default async function me(req, res) {
    const token = req.cookies.authToken;
    const jwtSecret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, jwtSecret);
    const { sub } = decodedToken;
    const user = await db('users').where({ id: sub }).first();
    if (!user) {
        res.status(401).json({ message: 'User not found' });
    }
    res.status(200).json({
        message: 'User found',
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
}