import express, { Express } from "express";

class ExpressServer {
	private static instance: ExpressServer;
	private app: Express;

	private constructor() {
		this.app = express();
	}

	public static getInstance(): ExpressServer {
		if (!ExpressServer.instance) {
			ExpressServer.instance = new ExpressServer();
		}
		return ExpressServer.instance;
	}

	public getApp(): express.Express {
		return this.app;
	}
}

export default ExpressServer;
