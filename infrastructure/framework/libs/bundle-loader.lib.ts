import {
	IBundleLoader,
	IControllerLoader,
	IMiddlewareLoader,
	IModule,
} from "@types";
import { RequestHandler } from "express";

class BundleLoader implements IBundleLoader {
	public routes: {}[] = [];

	private context: __WebpackModuleApi.RequireContext;

	private middlewareLoader: IMiddlewareLoader;
	private controllerLoader: IControllerLoader;

	constructor(
		context: __WebpackModuleApi.RequireContext,
		middlewareLoader: IMiddlewareLoader,
		controllerLoader: IControllerLoader,
	) {
		this.context = context;
		this.middlewareLoader = middlewareLoader;
		this.controllerLoader = controllerLoader;

		this.init();
	}

	public findMiddlewareByRoute(route: any): RequestHandler[] {
		const middleware: RequestHandler[] =
			this.middlewareLoader.findByRoute(route);
		return middleware;
	}

	public findMiddlewareByName(name: string): RequestHandler[] {
		const middleware: RequestHandler[] =
			this.middlewareLoader.findByRoute(name);
		return middleware;
	}

	public findControllerByRoute(route: any): RequestHandler {
		const controller: RequestHandler = this.controllerLoader.findByRoute(route);
		return controller;
	}

	public findControllerByName(name: string): RequestHandler {
		const controller: RequestHandler = this.controllerLoader.findByName(name);
		return controller;
	}

	private init(): void {
		this.routes = this.context
			.keys()
			.map((p: string) => {
				const asset = this.context(p).routes;

				return asset
					.keys()
					.map((p: string) => asset(p).default)
					.map((routes: any[]) => {
						return routes.map((route: any) => {
							return {
								...route,
								modulePath: this.getModulePath(this.context),
								moduleName: this.getModuleName(this.context),
							};
						});
					});
			})
			.flat()
			.flat();
	}

	private getModuleName(asset: __WebpackModuleApi.RequireContext): string {
		return asset.keys()[0].replace("./", "").split("/")[0];
	}

	private getModulePath(asset: __WebpackModuleApi.RequireContext): string {
		return asset.keys()[0];
	}
}

export default BundleLoader;
