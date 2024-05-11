import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials:true,
    }
))

// adding configuration for accepting the data from diff diff way
app.use(express.json({limit:"16kb"})); // for accepting json data like from form
app.use(express.urlencoded({})); // for accepting url data and encode them
app.use(express.static("public")); // for storing data like file,images when i want to store them in our own server so that they can access by anyone etc
app.use(cookieParser()); // for parsing the cookie data

//routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter);


export {app}