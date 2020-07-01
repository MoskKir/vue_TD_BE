import bcrypt from 'bcryptjs';

import pool from '../db/db.connect';
import IUser from '../interfaces/user.interface';

export default class UserService {

    public static async addUser(body :IUser) {
        body.password = await UserService.hashPssw(body.password)
        const newUser = await pool.query(
            'INSERT INTO users (login, email, password) VALUES($1, $2, $3) RETURNING *',
            [ body.login, body.email, body.password ]
        )
        return newUser.rows[0];
    }

    private static async hashPssw(password: string) {
        return await bcrypt.hash(password, 8);
    }
}

