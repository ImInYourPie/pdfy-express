export default interface IPDFGenerator {
	init: () => Promise<void>;
	close: () => Promise<void>;
	generatePDF: (htmlFilePath: string, handlebarsData: any) => Promise<Buffer>;
}
