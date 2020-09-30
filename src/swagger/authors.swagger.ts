export const response = {
    Author: {
      type: "object",
      required: ["title", "isbn"],
      properties: {
        id: {
          type: "string",
          description: "author's id",
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
    Authors: {},
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
  
  response.Authors = {
    type: "array",
    items: response.Author,
  };
  
  export const getAuthors = {
    tags: ["Authors"],
    description: "Returns all Authors in the db",
    operationId: "getAuthors",
    security: [],
    summary: "Gets all authors",
    responses: {
      "200": {
        description: "a list of authors",
        content: {
          "application/json": {
            schema: response.Authors,
          },
        },
      },
    },
  };
  
  export const getAuthor = {
    tags: ["Authors"],
    description: "Return author by id",
    operationId: "getAuthor",
    security: [],
    summary: "Gets author by id",
    responses: {
      "200": {
        description: "an author",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                author: {
                  type: "object",
                  properties: response.Author.properties,
                },
              },
            },
          },
        },
      },
      "404": {
        description: "Author not found",
        content: {
          "application/json": {
            schema: response.Error,
          },
        },
      },
    },
  };
  
  export const createAuthor = {
    tags: ["Authors"],
    description: "create an author",
    operationId: "createAuthor",
    security: [],
    summary: "creates an author",
    requestBody: {
      required: true,
      description: "author that we want to create",
      content: {
        "application/json": {
          schema: response.Author,
          examples: {
            author: {
              summary: "an example of an author",
              value: {
                firstname: "test",
                lastname: "test",
                age: 25
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
  
  export const editAuthor = {
    tags: ["Authors"],
    description: "edit an author",
    operationId: "editAuthor",
    security: [],
    summary: "edit an author",
    requestBody: {
      required: true,
      description: "Author that we want to edit",
      content: {
        "application/json": {
          schema: response.Author,
          examples: {
            author: {
              summary: "an example of an author",
              value: {
                firstname: "test",
                lastname: "test",
                age: 25
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
        description: "author successfully updated",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                author: {
                  type: "object",
                  properties: response.Author.properties,
                },
              },
            },
          },
        },
      },
    },
  };
  
  export const deleteAuthor = {
    tags: ["Authors"],
    description: "delete an author",
    operationId: "deleteAuthor",
    security: [],
    summary: "delete an author",
    produces: ["application/json"],
    responses: {
      "204": {
        description: "author successfully deleted",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                author: {
                  type: "object",
                  properties: response.Author.properties,
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
        description: "Author not found",
        content: {
          "application/json": {
            schema: response.Error,
          },
        },
      },
    },
  };
  