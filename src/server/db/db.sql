CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(user_id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date_create timestamp,
    status BOOLEAN,
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users(login, email, password) VALUES ('root', 'root@root.com', 'toor');