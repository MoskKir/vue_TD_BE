import bcrypt from 'bcryptjs';

import pool from '../db/db.connect';
import IUser from '../interfaces/user.interface';
import jwt from 'jwt-simple';

export default class UserService {

    public static async addUser(body :IUser) {
        body.password = await UserService.hashPssw(body.password);

        const newUser = await pool.query(
            'INSERT INTO users (login, email, password) VALUES($1, $2, $3) RETURNING *',
            [ body.login, body.email, body.password ]
        )
        return newUser.rows[0];
    }

    public static async getUser(body :any) {       
        try {
            const user = await pool.query(
                `select * from users where email='${body.email}'`
            )
            
            if (!user.rows[0]) {
                throw new Error('User with this email do not exist');
            }

            const isMatch = await bcrypt.compare(body.password, user.rows[0].password);

            if (isMatch) {
                const token = jwt.encode({id: user.rows[0].user_id }, 'mysecretword');
                const userData = user.rows[0];
                return {userData, token}
            } else {
                throw new Error('Wrong password');
            }
        } catch (error) {
            return error.message
        }
    }

    private static async hashPssw(password: string) {
        return await bcrypt.hash(password, 8);
    }

}

