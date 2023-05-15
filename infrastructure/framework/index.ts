import ExpressServer from "./express-server";
import { BundleLoader, ControllerLoader, MiddlewareLoader } from "./libs";
import ModuleLoader from "./modules";

const moduleLoader = ModuleLoader.getInstance(
	new MiddlewareLoader(),
	new BundleLoader(
		require.context("@modules", true, /\.bundle\.(ts)$/),
		new MiddlewareLoader(),
		new ControllerLoader(),
	),
);

export default ExpressServer.getInstance(moduleLoader).getApp();
