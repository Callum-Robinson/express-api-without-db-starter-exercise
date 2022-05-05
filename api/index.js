const express = require('express');
const morgan = require('morgan');
const HttpError = require('./v2/errors/http-error');
const TodoNotFoundError = require('./v2/errors/todo-not-found-error');
const todoRouter = require('./v2/route/todo-router');

const PORT = process.env.PORT || 3000;
const app = express();

// Apply environment configurations and/or middleware
if (process.env.NODE_ENV === "PRODUCTION") {
    console.log("=== PRODUCTION ===");
    app.use(morgan('combined'));
} else {
    console.log("=== DEVELOPMENT ===");
    app.use(morgan('dev'));
}

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Router level middleware here
app.use("/v2/todo", todoRouter);

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.message);

    if (!(error instanceof HttpError)) {
        if (error instanceof TodoNotFoundError) {
            error = new HttpError(error, 404);
        } else {
            // unknown error
            error = new HttpError(new Error("Something went wrong..."), 500);
        }
    }
    // It must be a HTTP error to have reached here, whether that was passed to error, or created
    // above
    return response.status(error.statusCode).json({
        message: error.message,
        data: error.data 
    })
});

// Start the server
const server = app.listen(PORT, function() {
    console.log(`Server up on ${PORT}`);
});