import { db } from "../../../database/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default function loginByEmail(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        db('users').where({ email }).first().then(user => {
            if (!user) {
                res.status(401).json({ message: 'User not found' });
            } else {
                bcrypt.compare(password, user.password).then(async result => {
                    if (!result) {
                        res.status(401).json({ message: 'Password does not match' });
                    } else {
                        const claims = { sub: user.id, myUserEmail: user.email };
                        const jwtSecret = process.env.JWT_SECRET;
                        const jwtToken = jwt.sign(claims, jwtSecret, { expiresIn: '1h' });
                        await res.setHeader('Set-Cookie', `authToken=${jwtToken}; path=/`);
                        res.status(200).json({
                            message: 'User logged in successfully',
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                })
            }

        })
    }
}
