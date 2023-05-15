import { Request, Response } from "express";

abstract class HomeController {
	public static index(req: Request, res: Response): Response {
		return res.send("Welcome to PDFY Express");
	}
}

export default HomeController;
