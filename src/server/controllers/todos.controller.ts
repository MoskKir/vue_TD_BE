import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import TodosService from '../services/todos.service';


export default class TodosController {
    private static _router :ExpressRouter = ExpressRouter();

    private static async addNewTodo(req :Request, res :Response, next :NextFunction) {
        console.log(req.body)
        try {            
            if (req.body) {
                let todo = await TodosService.addNewTodo(req.body);
                console.log(todo.rows[0])
                res.json(todo.rows[0]);           
            }
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async getAllTodos(req :Request, res :Response, next :NextFunction) {
        try {
            const todos = await TodosService.getAllTodos();
            res.json(todos);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async getTodo(req :Request, res :Response, next :NextFunction) {
        try {
            const todoID = req.params.id
            const todos = await TodosService.getTodo(todoID);
            res.json(todos);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.post(`${path}`, this.addNewTodo);
        this._router.get(`${path}`, this.getAllTodos);
        this._router.get(`${path}:id`, this.getTodo);

        return this._router;
    }
}