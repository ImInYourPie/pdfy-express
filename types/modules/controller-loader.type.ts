import { RequestHandler } from "express";

export default interface IControllerLoader {
	init: () => void;
	findByRoute: (route: any) => RequestHandler;
	findByName: (name: string) => RequestHandler;
}
