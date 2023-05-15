import {
	IBundleLoader,
	IMiddlewareLoader,
	IModule,
	IModuleLoader,
} from "@types";

class Modules implements IModuleLoader {
	private static instance: Modules;

	private middlewareLoader: IMiddlewareLoader;
	private bundleLoader: IBundleLoader;

	public modules: IModule[] = [];

	private constructor(
		middlewareLoader: IMiddlewareLoader,
		bundleLoader: IBundleLoader,
	) {
		this.middlewareLoader = middlewareLoader;
		this.bundleLoader = bundleLoader;

		this.init();
	}

	public static getInstance(
		middlewareLoader: IMiddlewareLoader,
		bundleLoader: IBundleLoader,
	): Modules {
		if (!Modules.instance) {
			Modules.instance = new Modules(middlewareLoader, bundleLoader);
		}
		return Modules.instance;
	}

	private init() {
		this.modules = this.bundleLoader.routes.map((route: any) => ({
			...route,
			controller: this.bundleLoader.findControllerByName(route.moduleName)[
				route.controller
			],
		}));
	}

	private orderRoutes(modules: any[]): any[] {
		return this.bundleLoader.routes;
	}

	public getModuleByPath(path: string): IModule {
		return {} as IModule;
	}
}

export default Modules;
