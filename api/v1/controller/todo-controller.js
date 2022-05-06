const TodoNotFoundError = require('../errors/todo-not-found-error.js');
const Todo = require('../model/todo.js');


module.exports = {

    readAll: async (req, res, next) => {
        const todos = await Todo.find({});

        res.status(200).json(todos);
    },
    
    readById: async (req, res, next) => {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if (todo) {
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    },

    create: async (req, res, next) => {
        const todo = new Todo(req.body);
        
        try {
            await todo.save();
            res.status(200).json(todo);
        } catch (error) {
            next(error);
        }
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