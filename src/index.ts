import { app } from "@infrastructure";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}.local`),
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
