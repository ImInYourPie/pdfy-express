export default [
	{
		path: "/generator/:id/:testId",
		method: "get",
		controller: "index",
	},

	{
		path: "/generator",
		method: "get",
		controller: "index",
	},
	{
		path: "/generator/:id/:testId/hey",
		method: "get",
		controller: "index",
	},
	{
		path: "/generator/:id",
		method: "get",
		controller: "index",
	},
	{
		path: "/generator/:id/hey",
		method: "get",
		controller: "index",
	},
];
