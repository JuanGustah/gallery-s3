import express from "express";
import { apiRouter } from "./routes";

const PORT = process.env.port || 3000

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(apiRouter);

app.listen(PORT, ()=>{
    console.log("Api listen on port"+ PORT);
})