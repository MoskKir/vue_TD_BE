import pool from '../db/db.connect';

import ITodo from '../interfaces/todo.interface';

export default class TodosService {
    public static async getAllTodos(authorId :any) {
        const allTodos = await pool.query(`SELECT * FROM todos WHERE author_id = ${authorId}`);
        return allTodos.rows;
    }

    public static async getTodo(todoId :string) {
        const todo = await pool.query(`SELECT * FROM todos WHERE todo_id = ${todoId}`);
        return todo.rows[0];
    }

    public static async addNewTodo(todo :ITodo) {
        const newTodo = await pool.query(
            'INSERT INTO todos (author_id, title, description, date_create, status) VALUES($1, $2, $3, NOW(), $4) RETURNING *',
            [ todo.author_id, todo.title, todo.description, todo.status ]
        )
        return newTodo;
    }

    public static async deleteTodo(todoId :string) {
        const todo = await pool.query(`DELETE FROM todos WHERE todo_id = ${todoId}`);
        console.log(todo)
        return todo.rows[0];
    }
}