import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import Router from './router/router';

import constants from './constants/server';
import bodyParser from 'body-parser';


class App {
    _port :number;
    _app :express.Application;
    private static _instance :App;

    constructor(port :number = constants.port) {
        this._app = express();
        this._port = port;
        this._app.use(cors());

        this.setMiddlewares();

        this._app.use('/', Router.routes);

        this._app.use(this.logErrors);
        this._app.use(this.errorHandler);
    }

    public static get Instance() :App {
        return this._instance || (this._instance = new this());
    }

    public init() {
        return this._app.listen( this._port, () => console.log(`App listen on port: ${this._port}`) );
    }

    private logErrors(err :Error, req :Request, res :Response, next :NextFunction) {
        console.error(err.stack);
        next(err);
    }

    private errorHandler(err :Error, req :Request, res :Response, next :NextFunction) {
        res.status(500);
        res.send({error: err});
    }

    private setMiddlewares() {
        this._app.use(bodyParser.text());
        this._app.use(bodyParser.json());
    }
}

const app = App.Instance;
export default app.init();