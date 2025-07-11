import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on(
          "file:preprocessor",
          createBundler({
            plugins: [createEsbuildPlugin(config)],
          })
      );
      return config;
    },
    env: {
      "cypress-cucumber-preprocessor": {
        stepDefinitions: "cypress/e2e/step_definitions/**/*.{js,ts,cy.js,cy.ts}"
      }
    }
  },
});
