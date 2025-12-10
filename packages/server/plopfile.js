export default function (plop) {
	// create your generators here
	plop.setGenerator("utility", {
		description:
			"Generates a new Utility class with Zod validation and a Drizzle client.",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the Utility name?",
				validate: (value) => {
					if (/.+/.test(value)) {
						return true;
					}
					return "name is required";
				},
			},
			{
				type: "input",
				name: "category",
				message: "What is the category for this Utility?",
				validate: (value) => {
					if (/.+/.test(value)) {
						return true;
					}
					return "category is required";
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "src/utils/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.utility.ts",
				templateFile: "src/plop-templates/utility.hbs",
			},
			{
				type: "add",
				path: "src/utils/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.test.ts",
				templateFile: "src/plop-templates/utility.test.hbs",
			},
			{
				type: "add",
				path: "../validators/src/utils/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.schema.ts",
				templateFile: "src/plop-templates/utility.schema.hbs",
			},
		],
	});

	plop.setGenerator("usecase", {
		description:
			"Generates a new Use Case class with Zod validation and a Drizzle client.",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the Use Case name?",
				validate: (value) => {
					if (/.+/.test(value)) {
						return true;
					}
					return "name is required";
				},
			},
			{
				type: "input",
				name: "category",
				message: "What is the category for this Use Case?",
				validate: (value) => {
					if (/.+/.test(value)) {
						return true;
					}
					return "category is required";
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.usecase.ts",
				templateFile: "src/plop-templates/usecase.hbs",
			},
			{
				type: "add",
				path: "src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.test.ts",
				templateFile: "src/plop-templates/usecase.test.hbs",
			},
			{
				type: "add",
				path: "../validators/src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.schema.ts",
				templateFile: "src/plop-templates/usecase.schema.hbs",
			},
		],
	});
}
