import { IMiddlewareLoader, IModule } from "@types";
import { RequestHandler } from "express";

class MiddlewareLoader implements IMiddlewareLoader {
	public init(): void {}

	public findByRoute(route: any): RequestHandler[] {
		return [];
	}
}

export default MiddlewareLoader;
