import express from "express";

export default interface IModule {
	method: "get" | "post" | "put" | "delete" | "patch";
	path: string;
	controller: express.RequestHandler;
}
