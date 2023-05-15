import puppeteer, { Browser } from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";

class PDFGenerator {
	private browser!: Browser;

	constructor() {
		this.init();
	}

	async init() {
		this.browser = await puppeteer.launch();
	}

	async generatePDF(
		htmlFilePath: string,
		handlebarsData: any,
		pdfFilePath: string,
	) {
		const html = fs.readFileSync(htmlFilePath, "utf-8");
		const template = handlebars.compile(html);
		const compiledHtml = template(handlebarsData);

		const page = await this.browser.newPage();
		await page.setContent(compiledHtml);

		await page.pdf({ path: pdfFilePath, format: "A4" });

		await page.close();
	}

	async close() {
		await this.browser.close();
	}
}

export default PDFGenerator;
