import { Request, Response } from "express";

abstract class Generator {
	public static index(req: Request, res: Response): Response {
		return res.send("Hello from module: Generator");
	}
}

export default Generator;
