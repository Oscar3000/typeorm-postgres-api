export const response = {
    Book: {
      type: "object",
      required: ["title", "isbn"],
      properties: {
        id: {
          type: "string",
          description: "book's id",
        },
        title: {
          type: "string",
        },
        isbn: {
          type: "number",
        },
        price: {
          type: "number",
        }
      },
    },
    Books: {},
    Success: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "message on successfully creation",
        },
      },
    },
    Error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "message on error",
        },
        error: {
          type: "object",
          description: "full error information",
        },
      },
    },
  };
  
  response.Books = {
    type: "array",
    items: response.Book,
  };
  
  export const getBooks = {
    tags: ["Books"],
    description: "Returns all Books in the db",
    operationId: "getBooks",
    security: [],
    summary: "Gets all books",
    responses: {
      "200": {
        description: "a list of books",
        content: {
          "application/json": {
            schema: response.Books,
          },
        },
      },
    },
  };
  
  export const getBook = {
    tags: ["Books"],
    description: "Return book by id",
    operationId: "getBook",
    security: [],
    summary: "Gets book by id",
    responses: {
      "200": {
        description: "a book",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                book: {
                  type: "object",
                  properties: response.Book.properties,
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Book not found",
        content: {
          "application/json": {
            schema: response.Error,
          },
        },
      },
    },
  };
  
  export const createBook = {
    tags: ["Books"],
    description: "create a book",
    operationId: "createBook",
    security: [],
    summary: "creates a book",
    requestBody: {
      required: true,
      description: "book that we want to create",
      content: {
        "application/json": {
          schema: response.Book,
          examples: {
            book: {
              summary: "an example of a book",
              value: {
                title: "The Awakening",
                isbn: 1,
                price: 30.99
              },
            },
          },
        },
      },
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    responses: {
      "201": {
        description: " message after creation",
        content: {
          "application/json": {
            schema: response.Success,
          },
        },
      },
    },
  };
  
  export const editBook = {
    tags: ["Books"],
    description: "edit a book",
    operationId: "editBook",
    security: [],
    summary: "edit a book",
    requestBody: {
      required: true,
      description: "Book that we want to edit",
      content: {
        "application/json": {
          schema: response.Book,
          examples: {
            book: {
              summary: "an example of a book",
              value: {
                title: "The Awakening",
                isbn: 1,
                price: 30.99
              },
            },
          },
        },
      },
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    responses: {
      "204": {
        description: "book successfully updated",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                book: {
                  type: "object",
                  properties: response.Book.properties,
                },
              },
            },
          },
        },
      },
    },
  };
  
  export const deleteBook = {
    tags: ["Books"],
    description: "delete a book",
    operationId: "deleteBook",
    security: [],
    summary: "delete a book",
    produces: ["application/json"],
    responses: {
      "204": {
        description: "book successfully deleted",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                book: {
                  type: "object",
                  properties: response.Book.properties,
                },
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Book not found",
        content: {
          "application/json": {
            schema: response.Error,
          },
        },
      },
    },
  };
  