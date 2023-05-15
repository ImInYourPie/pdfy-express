interface PDFGenerator {
	init: () => Promise<void>;
	close: () => Promise<void>;
	generatePDF: (htmlFilePath: string, handlebarsData: any) => Promise<Buffer>;
}

interface Models {
	PDFGenerator: new () => PDFGenerator;
}

declare namespace Express {
	interface Request {
		models: Models;
	}
}
