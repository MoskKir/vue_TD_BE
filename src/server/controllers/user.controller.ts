import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import Validation from '../middleware/validation';
import createUserSchema from '../validators/createUser.validator';


export default class UserController {
    private static _router :ExpressRouter = ExpressRouter();

    private static async addNewUser(req :Request, res :Response, next :NextFunction) {
        try {
            if (req.body) {
                const user = await UserService.addUser(req.body);
                res.json(user);
            }            
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.post(`${path}`, Validation.createNewUser(createUserSchema), this.addNewUser);

        return this._router;
    }
}