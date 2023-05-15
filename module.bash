#!/bin/bash

# Get input for module name and file name
read -p "Enter module name: " dir_name

# X = dir name
x=$(echo $dir_name)

# Create files in src/modules directory
mkdir src/modules/${x}
touch src/modules/${x}/_.bundle.ts
touch src/modules/${x}/${x}.controller.ts
touch src/modules/${x}/${x}.routes.ts

# Bundle boilerplate
echo "export const routes = require.context(\"./\", true, /\.(routes)\.(ts)$/);" >> src/modules/${x}/_.bundle.ts
echo "export const controllers = require.context(\"./\", true, /\.(controller)\.(ts)$/);" >> src/modules/${x}/_.bundle.ts

# .routes.ts boilerplate
echo "export default [
	{
		path: \"/${x}\",
		method: \"get\",
		controller: \"index\",
	},
];
" >> src/modules/${x}/${x}.routes.ts

# Convert string to camel case
camel_case_x=$(echo $dir_name | sed -e 's/[[:space:]]\{1,\}/ /g' -e 's/\([[:alpha:]]\)\([[:upper:]]\)/\1 \2/g' -e 's/\([[:lower:]]\)\([[:digit:]]\)/\1 \2/g' -e 's/\([[:digit:]]\)\([[:alpha:]]\)/\1 \2/g' -e 's/^\([[:lower:]]\)/\u\1/g' -e 's/ \([[:alpha:]]\)/\u\1/g' -e 's/\([[:digit:]]\)\([[:alpha:]]\)/\1_\2/g' -e 's/\([[:alpha:]]\)\([[:digit:]]\)/\1_\2/g' | sed 's/ //g')

# .controller.ts boilerplate
echo "import { Request, Response } from \"express\";

abstract class ${camel_case_x} {
    	public static index(req: Request, res: Response): Response {
		return res.send(\"Hello from module: ${camel_case_x} \");
	}
}

export default ${camel_case_x}
" >> src/modules/${x}/${x}.controller.ts

