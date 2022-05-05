const TodoNotFoundError = require('../errors/todo-not-found-error.js');
const Todo = require('../model/todo.js');

let idCounter = 3;
const todos = [new Todo(1, "Laundry", "Not Started"), new Todo(2, "Dishes", "Not Started"), new Todo(3, "Hoovering", "In Progress")];

module.exports = {

    readAll: (req, res, next) => {
        res.status(200).json(todos);
    },
    
    readById: (req, res, next) => {
        const id = req.params.id;
        const todo = todos.find(todo => todo.id == id);
        if (todo) {
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    },

    create: (req, res, next) => {
        const todo = new Todo(idCounter++, req.body.task, req.body.status);
        todos.push(todo);
        res.status(200).json(todo);
    },

    update: (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        console.log(updates);
        const todo = todos.find(todo => todo.id == id);
        if (todo) {
            todo.task = updates.task;
            todo.status = updates.status;
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        const todo = todos.find(todo => todo.id == id);

        if (todo) {
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    }
}