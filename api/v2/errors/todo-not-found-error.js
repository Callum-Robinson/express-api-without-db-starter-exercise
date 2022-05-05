module.exports = class TodoNotFoundError extends Error {

    constructor(id) {
        super(`Todo not found with id ${id}`);
        this.id = id;
    }
}