import { Request, Response } from "express";

abstract class Generator {
	public static async index(req: Request, res: Response): Promise<Response> {
		const { PDFGenerator } = req.models;

		const generator = new PDFGenerator();

		await generator.init();

		const buffer = await generator.generatePDF("test", {
			users: [{ name: "Miguel Melo", hours: 40 }],
		});

		await generator.close();

		res.setHeader("Content-Type", "application/pdf");
		return res.send(buffer);
	}
}

export default Generator;
