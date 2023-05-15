import { IModelLoader, IModels } from "@types";

class ModelLoader implements IModelLoader {
	private assets: any;
	private values!: IModels;

	constructor() {
		this.init();
	}

	public init(): void {
		this.assets = require.context("@models", true, /\.model\.(ts)$/);

		this.values = this.assets.keys().reduce((acc: {}, path: any) => {
			const asset = this.assets(path);

			return { ...acc, [asset.default.name]: asset.default };
		}, {});
	}

	public getValues(): IModels {
		return this.values;
	}
}

export default ModelLoader;
