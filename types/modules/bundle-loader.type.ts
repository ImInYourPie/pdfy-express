import { RequestHandler } from "express";
import IModule from "./module.type";

export default interface IBundleLoader {
	routes: {}[];
	findMiddlewareByRoute: (route: any) => RequestHandler[];
	findMiddlewareByName: (name: string) => RequestHandler[];
	findControllerByRoute: (route: any) => RequestHandler;
	findControllerByName: (name: string) => any;
}
