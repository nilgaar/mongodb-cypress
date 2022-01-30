# mongodb-cypress

## Integrate package with Cypress

Setup your `index.js` like:

```[JavaScript]
const mongoCypress = require("mongodb-cypress-client");
...
module.exports = (on, config) => {
  on("before:run", () => {
    mongoCypress.initMongoConn(config.mongodb).then(() => {
      mongoCypress.setdb(config.mongodb.db);
    });
  });
  on("after:run", mongoCypress.closeMongoConn);
  on("task", mongoCypress.tasks);
};
```

## Mongodb Connection Options and Usage

In order to custom to your mongo connection, add the [connection options](https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#connection-options) to `cypress.json` under `mongodb.options` like:

```[JSON]
"mongodb":{
    "uri": "<your uri>",
    "db" : "<initial db connecting to>",
    "options" : {
        <config to mongodb conection>
    }
}
```
