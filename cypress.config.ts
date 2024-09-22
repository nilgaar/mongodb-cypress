import { defineConfig } from "cypress";

const mongoCypress = require("./dist");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", mongoCypress.mongoSetup(config.env.mongodb));
    },
  },
  env: {
    mongodb: {
      uri: "mongodb://localhost:27017",
      db: "test",
      options: {},
    },
  },
});
