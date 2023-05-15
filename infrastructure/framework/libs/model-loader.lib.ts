import { IModelLoader } from "@types";

class ModelLoader implements IModelLoader {
	private assets: any;
	private values: {} = {};

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

	public getValues(): {} {
		return this.values;
	}
}

export default ModelLoader;
