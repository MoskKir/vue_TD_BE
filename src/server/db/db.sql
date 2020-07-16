CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(user_id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date_create timestamp,
    status BOOLEAN
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users(login, email, password) VALUES ('root', 'root@root.com', 'toor');

INSERT INTO todos(author_id, title, description, date_create, status) VALUES ('1', 'First ToDo', 'This is firs todo description', 'now()', 'false');
INSERT INTO todos(author_id, title, description, date_create, status) VALUES ('1', 'Second ToDo', 'This is second todo description', 'now()', 'true');

delete from todos where todo_id = 5;

