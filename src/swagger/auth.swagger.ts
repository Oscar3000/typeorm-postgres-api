import { response } from "./users.swagger";
export const loginUser = {
  tags: ["Auth"],
  description: "logins in the user",
  operationId: "loginUser",
  security: [],
  summary: "log the user in",
  requestBody: {
    required: true,
    description: "User that we want to create",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              description: "The user's name",
            },
            password: {
              type: "string",
              description: "The user's name",
            },
          },
        },
        examples: {
          user: {
            summary: "an example of a login",
            value: {
              username: "Test",
              password: "password",
            },
          },
        },
      },
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  responses: {
    "200": {
      description: "the user",
      content: {
        "application/json": {
          schema: response.User,
        },
      },
    },
  },
};

export const changePassword = {
  tags: ["Auth"],
  description: "change user's password",
  operationId: "changePassword",
  security: [],
  summary: "changes user's password",
  requestBody: {
    required: true,
    description: "User that we want to create",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["oldPassword", "newPassword"],
          properties: {
            oldPassword: {
              type: "string",
              description: "The user's name",
            },
            newPassword: {
              type: "string",
              description: "The user's name",
            },
          },
        },
        examples: {
          user: {
            summary: "an example of changing password",
            value: {
              oldPassword: "password",
              newPassword: "trickstar00",
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
      description: "the user",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
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
    "400": {
        description: "validation errors",
        content: {
          "application/json": {
            schema: {
                type: "object"
            },
          },
        },
      },
  },
};

export const logoutUser = {
    tags: ["Auth"],
    description: "log the user out",
    operationId: "logout",
    security: [],
    summary: "log the user out.",
    produces: ["application/json"],
    responses: {
      "200": {
        description: "message from server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      "401": {
        description: "unauthorized",
        content: {
          "application/json": {
            schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
          },
        },
      },
    },
  };
