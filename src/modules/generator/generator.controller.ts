import { NextFunction, Request, Response } from "express";

abstract class Generator {
	public static async index(req: Request, res: Response): Promise<Response> {
		const { PDFGenerator } = req.models;
		const data = req.body;

		const generator = new PDFGenerator();

		await generator.init();

		const buffer = await generator.generateFromTemplate(
			"test",
			data || {
				users: [{ name: "Miguel Melo", hours: 40 }],
			},
		);

		await generator.close();

		res.setHeader("Content-Type", "application/pdf");
		return res.send(buffer);
	}

	public static async byTemplate(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { PDFGenerator } = req.models;
			const { template } = req.params;
			const data = req.body;

			const generator = new PDFGenerator();

			if (!generator.validFilename(template))
				throw new Error("No matching template found!");

			const buffer = await generator.generateFromTemplate(template, data);

			res.setHeader("Content-Type", "application/pdf");
			return res.send(buffer);
		} catch (err) {
			next(err);
		}
	}

	public static async byUrl(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { PDFGenerator } = req.models;
			const { url } = req.body;

			const generator = new PDFGenerator();

			if (!generator.validUrl(url)) throw new Error("Invalid url provided!");

			const buffer = await generator.generateFromUrl(url);

			res.setHeader("Content-Type", "application/pdf");
			return res.send(buffer);
		} catch (err) {
			next(err);
		}
	}
}

export default Generator;
