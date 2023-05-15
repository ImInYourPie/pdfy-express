const path = require("path");

module.exports = {
	extensions: [".ts", ".tsx", ".js"],
	alias: {
		"@infrastructure": path.resolve("infrastructure"),
		"@modules": path.resolve("src/modules"),
		"@repositories": path.resolve("src/repositories"),
		"@models": path.resolve("src/models"),
		"@libs": path.resolve("src/libs"),
		"@assets": path.resolve("src/assets"),
	},
};
