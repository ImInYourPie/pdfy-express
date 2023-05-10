import { RequestHandler } from "express";

export abstract class Controllers {}

export default interface IModule {
	method: "get" | "post" | "put" | "delete" | "patch";
	path: string;
	modulePath: string;
	controller: RequestHandler;
}
