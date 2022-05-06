const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task : {
        type: String,
        minlength: 4,
        maxlength: 128,
        required: [true, 'Task needs to be a String']
    },
    status: {
        type: String,
        minlength: 4,
        maxlength: 128,
        required: [true, 'Status needs to be a String']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
