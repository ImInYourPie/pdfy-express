const path = require("path");

module.exports = {
	extensions: [".ts", ".tsx", ".js"],
	alias: {
		"@controllers": path.resolve("src/controllers"),
		"@models": path.resolve("src/models"),
		"@repositories": path.resolve("src/repositories"),
	},
};
