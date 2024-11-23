import express, { Application, Request, Response } from "express";
const app : Application = express();
const port = 3000;

// parser
app.use(express.json())


app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});
console.log(port);
console.log(process.cwd());
export default app
