import puppeteer, { Browser } from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

class PDFGenerator {
	private browser!: Browser;

	constructor() {
		this.init();
	}

	async init() {
		this.browser = await puppeteer.launch();
	}

	async generatePDF(filename: string, handlebarsData: any): Promise<Buffer> {
		const html = fs.readFileSync(
			path.resolve("src/assets", `${filename}.handlebars`),
			"utf-8",
		);
		const template = handlebars.compile(html);
		const compiledHtml = template(handlebarsData);

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setContent(compiledHtml);

		const pdfBuffer = await page.pdf({ format: "A4" });

		await browser.close();

		return pdfBuffer;
	}

	async close() {
		await this.browser.close();
	}
}

export default PDFGenerator;
