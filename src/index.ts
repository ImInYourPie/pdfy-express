import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}.local`),
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	console.log("running");
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
