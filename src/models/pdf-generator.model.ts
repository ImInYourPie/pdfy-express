import puppeteer, { Browser } from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

class PDFGenerator {
	private browser!: Browser;

	private async init() {
		this.browser = await puppeteer.launch({ headless: true });
	}

	private async close() {
		await this.browser.close();
	}

	async generateFromTemplate(
		filename: string,
		handlebarsData: any,
	): Promise<Buffer> {
		const pdfBuffer = await this.handleByTemplate(filename, handlebarsData);

		return pdfBuffer;
	}

	public async generateFromUrl(url: string): Promise<Buffer> {
		if (!this.validUrl(url)) throw "Invalid url provided!";

		const pdfBuffer = await this.handleByUrl(url, { format: "A4" });

		return pdfBuffer;
	}

	private validUrl(url: string): boolean {
		// TODO: Implement
		return !!url;
	}

	private validFilename(filename: string): boolean {
		return fs.existsSync(path.resolve("src/assets", `${filename}.hbs`));
	}

	private async handleByUrl(url: string, options?: {}): Promise<Buffer> {
		await this.init();

		const page = await this.browser.newPage();
		await page.goto(url);

		const pdfBuffer = await page.pdf(options);

		await this.close();

		return pdfBuffer;
	}

	private async handleByTemplate(
		filename: string,
		handlebarsData: {},
		options?: {},
	): Promise<Buffer> {
		await this.init();

		const template = await this.getTemplateByFilename(filename);
		const compiled = template(handlebarsData);

		const page = await this.browser.newPage();
		await page.setContent(compiled);

		const pdfBuffer = await page.pdf(options);

		await this.close();

		return pdfBuffer;
	}

	private async getTemplateByFilename(
		filename: string,
	): Promise<HandlebarsTemplateDelegate> {
		const html = fs.readFileSync(
			path.resolve("src/assets", `${filename}.hbs`),
			"utf-8",
		);

		const template = handlebars.compile(html);
		return template;
	}
}

export default PDFGenerator;
