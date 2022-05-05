# Team project

You are to create two versions of a todo list API.

This work must be uploaded to GitHub.

## Version 1

You must have the following:

- A model for todos with at least 3 fields
- A controller for the following functionality: Create, Read, Read by id, Update, Delete
- A router for handling requests and passing them to the appropriate controller function
- A custom exception for if a todo is not found

## Version 2

You must have the following:

- A model for todos with the 3 fields from the previous v1
- A field on todos representing an array of tags as strings
- The existing CRUD functionality from version 1 (update where necessary to handle todo categories)
- Add two new methods to your controller for managing a todos tags: `addTag` and `removeTag`
- A custom exception for adding and removing tags, this will return messages like "Tag already exists on todo with id 3" or "Tag does not exist on todo with id 3" for example