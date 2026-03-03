export default function plopGenerator(plop) {
  plop.setGenerator("feature", {
    description: "Generate a new feature",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/api/index.ts",
        templateFile: "scripts/generators/feature/templates/api.hbs",
      },
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/constants/index.ts",
        templateFile: "scripts/generators/feature/templates/constants.hbs",
      },
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/types/index.ts",
        templateFile: "scripts/generators/feature/templates/types.hbs",
      },
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/components/.gitkeep",
        template: "",
      },
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/hooks/use{{pascalCase name}}.ts",
        templateFile: "scripts/generators/feature/templates/hook.hbs",
      },
      {
        type: "add",
        path: "src/features/{{lowerCase name}}/index.ts",
        templateFile: "scripts/generators/feature/templates/index.hbs",
      },
    ],
  });
}
