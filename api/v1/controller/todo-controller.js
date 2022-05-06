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

    update: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        
        const todo = await Todo.updateOne({ _id: id}, updates);
        if (todo) {
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    },

    delete: async (req, res, next) => {
        const filter = { _id: req.params.id };
        const todo = await Todo.findOneAndDelete(filter);

        if (todo) {
            return res.status(200).json(todo);
        }
        next(new TodoNotFoundError(id));
    }
}