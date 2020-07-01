CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    date_create timestamp
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users(login, email, password) VALUES ('root', 'root@root.com', 'toor');