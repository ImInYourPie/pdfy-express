import { Request, Response } from "express";

abstract class HomeController {
	public static index(req: Request, res: Response): Response {
		return res.send("Hello home: index");
	}

	public static test(req: Request, res: Response): Response {
		return res.send("Hello home: test");
	}

	public static withParams(req: Request, res: Response): Response {
		const { id } = req.params;

		return res.send(`Hello home: ${id}`);
	}
}

export default HomeController;
