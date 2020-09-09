import { getUsers, createUser, getUser, editUser, deleteUser } from "./users.swagger";
export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'your description here',
        termsOfService: '',
        contact: {
            name: 'Oscar',
            email: 'eumeh18@gmail.com',
            url: 'https://github.com'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: "http://localhost:5000",
            description: "Local server"
        }
    ],
    tags: [
        {
            name: "Users"
        }
    ],
    paths: {
        "/user": {
            "get": getUsers,
            "post": createUser
        },
        "/user/{id}" :{
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Id of the user that we want to find",
                    type:"string"
                }
            ],
            "get": getUser,
            "patch": editUser,
            "delete": deleteUser
        }
    }
}