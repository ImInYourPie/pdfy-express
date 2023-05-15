import { RequestHandler } from "express";

export default interface IMiddlewareLoader {
	init: () => void;
	findByRoute: (route: any) => RequestHandler[];
}
