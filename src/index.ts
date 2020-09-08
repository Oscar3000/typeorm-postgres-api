import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import routes from "./routes";

createConnection().then(async connection => {

    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());


    //Set all routes from routes folder
    app.use("/", routes);


    app.listen('5000', () => {
        console.log("server started on 5000");
    })

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));