import express, { Express } from "express";
import { IModuleLoader } from "@types";

class ExpressServer {
	private static instance: ExpressServer;
	private app: Express;

	private moduleLoader: IModuleLoader;

	private constructor(moduleLoader: IModuleLoader) {
		this.moduleLoader = moduleLoader;
		this.app = this.initApp();
		this.setModules();
	}

	public static getInstance(moduleLoader: IModuleLoader): ExpressServer {
		if (!ExpressServer.instance) {
			ExpressServer.instance = new ExpressServer(moduleLoader);
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

	private setModules(): void {
		this.moduleLoader.modules.forEach((module) => {
			return this.app[module.method || "get"](module.path, module.controller);
		});
	}
}

export default ExpressServer;
