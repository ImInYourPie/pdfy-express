const webpack = require("webpack");
const entries = require("./libs/entries");
const envConfig = require("./env.config");
const resolver = require("./resolver.config");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const NodemonPlugin = require("nodemon-webpack-plugin");

const { BUILD_MODE, BUILD_PATH } = envConfig;

module.exports = {
	target: "node",
	entry: entries,
	mode: BUILD_MODE,
	externals: [nodeExternals()],
	optimization: {
		minimize: BUILD_MODE === "development" ? false : true,
	},
	output: {
		path: path.resolve(BUILD_PATH),
		filename: "[name].js",
		libraryTarget: "commonjs2",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: resolver,
	plugins: [
		new NodemonPlugin({
			script: `${BUILD_PATH}/main.js`,
			watch: path.resolve(`${BUILD_PATH}/main.js`),
		}),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(envConfig),
		}),
		BUILD_MODE === "development" &&
			new webpack.SourceMapDevToolPlugin({
				exclude: /node_modules/,
				module: true,
				columns: false,
				filename: "[name].map",
			}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
	].filter(Boolean),
};
