import { Urls } from '../constants/url';
import { Router as ExpressRouter } from 'express';

import UserController from './user.controller';
import TodosController from './todos.controller';

export default class Router {
    private static _router :ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.use(`/${Urls.api}/${Urls.users}`, UserController.routes());
        this._router.use(`/${Urls.api}/${Urls.todos}`, TodosController.routes());

        return this._router;
    }
}