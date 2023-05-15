import { IModule } from "@types";

export default interface IModuleLoader {
	modules: IModule[];
	getModuleByPath: (path: string) => IModule;
}
