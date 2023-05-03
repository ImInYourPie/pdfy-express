const path = require("path");

require("dotenv").config({
	path: path.resolve(`.env.${process.env.NODE_ENV}.local`),
});

module.exports = {
	BUILD_PATH: path.resolve(process.env.BUILD_PATH),
	BUILD_MODE: process.env.NODE_ENV,
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
};
