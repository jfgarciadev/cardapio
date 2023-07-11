import { db } from "../../database/index.js";
import jwt from 'jsonwebtoken';

export async function getUser(token) {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, jwtSecret);
        const { sub } = decodedToken;
        const user = await db('users').where({ id: sub }).first();
        if (!user) {
            return false;
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}