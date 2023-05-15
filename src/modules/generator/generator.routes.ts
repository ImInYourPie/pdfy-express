export default [
	{
		path: "/generate",
		method: "get",
		controller: "index",
	},
	{
		path: "/generate/pdf/browser",
		method: "post",
		controller: "byUrl",
	},
	{
		path: "/generate/pdf/template/:template",
		method: "post",
		controller: "byTemplate",
	},
];
