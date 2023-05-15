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
		this.routes = this.fixOrder(
			this.context
				.keys()
				.map((p: string) => {
					const asset = this.context(p).routes;

					return asset
						.keys()
						.map((p: string) => asset(p).default)
						.map((routes: any[]) => {
							return routes.map((route: any) => {
								console.log(`${route}`, asset);
								return {
									...route,
									modulePath: this.getModulePath(p),
									moduleName: this.getModuleName(asset.keys()[0]),
								};
							});
						});
				})
				.flat()
				.flat(),
		);
	}

	private getModuleName(asset: string): string {
		return asset.replace("./", "").split(".")[0];
	}

	private getModulePath(asset: string): string {
		return asset.replace("./", "");
	}

	private fixOrder(routes: any[]): any[] {
		if (routes.length === 0) return routes;

		const wildCardRoutes = routes.filter((route) => ~route.path.indexOf(":"));
		const regRoutes = routes.filter((route) => !~route.path.indexOf(":"));

		wildCardRoutes.sort((a, b) => {
			const bAddend = ~b.path.indexOf("(") ? 1 : 0;
			const aAddend = ~a.path.indexOf("(") ? 1 : 0;
			return (
				b.path.split(":").length +
				bAddend -
				(a.path.split(":").length + aAddend)
			);
		});

		return regRoutes.concat(wildCardRoutes);
	}
}

export default BundleLoader;
