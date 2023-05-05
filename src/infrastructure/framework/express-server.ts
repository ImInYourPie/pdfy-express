import express, { Express } from "express";
import { IModule } from "@types";

class ExpressServer {
	private static instance: ExpressServer;
	private app: Express;

	private constructor(modules: IModule[]) {
		this.app = this.initApp();
		this.setModules(modules);
	}

	public static getInstance(modules: IModule[]): ExpressServer {
		if (!ExpressServer.instance) {
			ExpressServer.instance = new ExpressServer(modules);
		}
		return ExpressServer.instance;
	}

	public getApp(): express.Express {
		return this.app;
	}

	private initApp(): Express {
		const app = express();
		return app;
	}

	private setModules(modules: IModule[]): void {
		modules.forEach((module: IModule) => {
			const { method, path, controller } = module;
			return this.app[method](path, controller);
		});
	}
}

export default ExpressServer;
