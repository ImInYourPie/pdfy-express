import { IControllerLoader, IModule } from "@types";
import { RequestHandler } from "express";

class ControllerLoader implements IControllerLoader {
	private controllers: any;
	private values: any[] = [];

	constructor() {
		this.init();
	}

	public init(): void {
		this.controllers = require.context("@modules", true, /\.controller\.(ts)$/);

		this.values = this.controllers.keys().map((path: any) => ({
			path,
			rootPath: path.replace("/@module/_.controller.ts", "").replace("./", ""),
			modulePath: path
				.replace("/@module/_.controller.ts", "")
				.replace("./", ""),

			name: path.replace("./", "").split("/")[1].replace(".controller.ts", ""),
			value: this.controllers(path).default,
		}));
	}

	public findByRoute(route: any): RequestHandler {
		const { value } = this.values.find(
			(controller) => controller.rootPath === route.modulePath,
		);
		return value;
	}

	public findByName(name: string): RequestHandler {
		const { value } = this.values.find(
			(controller) => controller.name === name,
		);
		return value;
	}
}

export default ControllerLoader;
