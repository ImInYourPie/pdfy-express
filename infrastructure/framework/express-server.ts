import express, { Express, Request, Response, NextFunction } from "express";
import { IModelLoader, IModuleLoader } from "@types";

class ExpressServer {
	private static instance: ExpressServer;
	private app: Express;

	private moduleLoader: IModuleLoader;
	private modelLoader: IModelLoader;

	private constructor(moduleLoader: IModuleLoader, modelLoader: IModelLoader) {
		this.moduleLoader = moduleLoader;
		this.modelLoader = modelLoader;
		this.app = this.initApp();
		this.setModels();
		this.setModules();
	}

	public static getInstance(
		moduleLoader: IModuleLoader,
		modelLoader: IModelLoader,
	): ExpressServer {
		if (!ExpressServer.instance) {
			ExpressServer.instance = new ExpressServer(moduleLoader, modelLoader);
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

	private setModels(): void {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			req.models = this.modelLoader.getValues();
			next();
		});
	}

	private setModules(): void {
		this.moduleLoader.modules.forEach((module) => {
			return this.app[module.method || "get"](module.path, module.controller);
		});
	}
}

export default ExpressServer;
