import pool from '../db/db.connect';

export default class TodosService {
    public static async getAllTodos() {
        const allTodos = await pool.query('SELECT * FROM todos');
        return allTodos.rows;
    }

    public static async getTodo(todoId :string) {
        const todo = await pool.query(`SELECT * FROM todos WHERE todo_id = ${todoId}`);
        return todo.rows[0];
    }

    public static async addNewTodo(body :any) {
        const newTodo = await pool.query(
            'INSERT INTO todos (author, title, description, date_create) VALUES($1, $2, $3, NOW()) RETURNING *',
            ['lorem_user', 'lorem_title', 'lorem_description']
        )
        return newTodo;
    }
}