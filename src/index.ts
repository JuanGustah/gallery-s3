import express from "express";
import { router } from "./routes";

const PORT = process.env.port || 3000

const app = express();

app.use(router);

app.listen(PORT, ()=>{
    console.log("Api listen on port"+ PORT);
})