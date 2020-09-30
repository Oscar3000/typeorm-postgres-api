export const response = {
  User: {
    type: "object",
    required: ["username", "password"],
    properties: {
      id: {
        type: "string",
        description: "user's id",
      },
      username: {
        type: "string",
        description: "The user's name",
      },
      firstname: {
        type: "string",
        description: "user's id",
      },
      lastname: {
        type: "string",
        description: "user's id",
      },
      age: {
        type: "number",
      },
      roles: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
  },
  Users: {},
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

response.Users = {
  type: "array",
  items: response.User,
};

export const getUsers = {
  tags: ["Users"],
  description: "Returns all users in the db",
  operationId: "getUsers",
  security: [],
  summary: "Gets all users",
  responses: {
    "200": {
      description: "a list of users",
      content: {
        "application/json": {
          schema: response.Users,
        },
      },
    },
  },
};

export const getUser = {
  tags: ["User"],
  description: "Return user by id",
  operationId: "getUser",
  security: [],
  summary: "Gets user by id",
  responses: {
    "200": {
      description: "a user",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: response.User.properties,
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User not found",
      content: {
        "application/json": {
          schema: response.Error,
        },
      },
    },
  },
};

export const createUser = {
  tags: ["User"],
  description: "create a user",
  operationId: "createUser",
  security: [],
  summary: "creates a user",
  requestBody: {
    required: true,
    description: "User that we want to create",
    content: {
      "application/json": {
        schema: response.User,
        examples: {
          user: {
            summary: "an example of a user",
            value: {
              username: "Test",
              password: "password",
              firstname: "test",
              lastname: "test",
              roles: "",
              age: 25,
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

export const editUser = {
  tags: ["User"],
  description: "edit a user",
  operationId: "editUser",
  security: [],
  summary: "edit a user",
  requestBody: {
    required: true,
    description: "User that we want to edit",
    content: {
      "application/json": {
        schema: response.User,
        examples: {
          user: {
            summary: "an example of a user",
            value: {
              firstname: "test",
              lastname: "test",
              age: 25,
              roles: "author"
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
      description: "user successfully updated",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: response.User.properties,
              },
            },
          },
        },
      },
    },
  },
};

export const deleteUser = {
  tags: ["User"],
  description: "delete a user",
  operationId: "deleteUser",
  security: [],
  summary: "delete a user",
  produces: ["application/json"],
  responses: {
    "204": {
      description: "user successfully deleted",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: response.User.properties,
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
      description: "User not found",
      content: {
        "application/json": {
          schema: response.Error,
        },
      },
    },
  },
};
