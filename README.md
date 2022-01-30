# mongodb-cypress

## Integrate package with Cypress

Setup your `index.js` like:

```JavaScript
const mongoCypress = require("mongodb-cypress-client");

module.exports = (on, config) => {
  on("before:run", () => {
    mongoCypress.initMongoConn(config.mongodb).then(() => {
      //if you want to setup de db later, you can ignore the next line:
      mongoCypress.setdb(config.mongodb.db);
      //you can change the db anytime with mongoCypress.setdb('newdb')

    });
  });
  on("after:run", mongoCypress.closeMongoConn);
  on("task", mongoCypress.tasks);
};
```

## Mongodb Connection Options and Usage

In order to custom to your mongo connection, add the [connection options](https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#connection-options) to `cypress.json` under `mongodb.options` like:

```JSON
"mongodb":{
    "uri": "<your uri>",
    "db" : "<initial db connecting to>",
    "options" : {
        "<config to mongodb conection>"
    }
}
```

## Integrated Functionalities

```JavaScript
cy.task('mongoFind', {'myCollection'})
cy.task('mongoFind', {'myCollection', {name:"6147a7b6bea6e0ac35c8cfb3"}})
cy.task('mongoFind', {'myCollection', {name:"6147a7b6bea6e0ac35c8cfb3"}, {limit:10}})

cy.task('mongoFindOne', {'myCollection'}, {city:"Terrassa"})
cy.task('mongoFindOne', {'myCollection'}, {city:"Terrassa"}, {limit:10})


cy.task('mongoInsert', {'myCollection'}, {city:"Terrassa"})
cy.task('mongoInsert', {'myCollection'}, {city:"Terrassa"}, {noResponse:false})

cy.task('mongoInsertMany', {'myCollection'}, [{city:"Terrassa"}])
cy.task('mongoInsertMany', {'myCollection'}, [{city:"Terrassa"}], {noResponse:false})

cy.task('mongoDelete', {'myCollection'}, {city:"Terrassa"})

cy.task('mongoDeleteMany', {'myCollection'}, {city:"Terrassa"})

cy.task('mongoUpdateMany', {'myCollection'}, {city:"Terrassa"}, {city:"Terrassa", cp:08224 })

cy.task('mongoUpdate', {'myCollection'}, {city:"Terrassa"}, {city:"Terrassa", cp:08224 })
```
