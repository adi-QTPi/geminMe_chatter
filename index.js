import "dotenv/config"
import session from "express-session";
import express from "express";
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 
    }
}))
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");

import { handlePostApiAsk } from "./controllers/api.js";
app.post("/api/ask", handlePostApiAsk);

import { handleRenderMainPage } from "./controllers/rendering.js";
app.get("/", handleRenderMainPage);

app.listen(process.env.SERVER_PORT, ()=>{
  console.log(`the app has started now\nAccess on localhost:${process.env.SERVER_PORT}`);
})