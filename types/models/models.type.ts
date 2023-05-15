import IPDFGenerator from "./pdf-generator.type";

export default interface IModels {
	PDFGenerator: new () => IPDFGenerator;
}
