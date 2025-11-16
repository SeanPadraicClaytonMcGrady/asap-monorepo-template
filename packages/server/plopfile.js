export default function (plop) {
	// create your generators here
	plop.setGenerator("usecase", {
		description:
			"Generates a new UseCase class with Zod validation and a Drizzle client.",
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
				path: "src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.use-case.ts",
				templateFile: "src/plop-templates/usecase.hbs",
			},
			{
				type: "add",
				path: "src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.test.ts",
				templateFile: "src/plop-templates/usecase.test.hbs",
			},
			{
				type: "add",
				path: "src/use-cases/{{kebabCase category}}/{{kebabCase name}}/{{kebabCase name}}.schema.ts",
				templateFile: "src/plop-templates/usecase.schema.hbs",
			},
		],
	});
}
