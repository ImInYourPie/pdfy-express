export default [
	{
		path: "/",
		method: "get",
		controller: "index",
	},
	{
		path: "/:id",
		method: "get",
		controller: "withParams",
	},
	{
		path: "/test",
		method: "get",
		controller: "test",
	},
];
