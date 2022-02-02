/// <reference types="cypress" />
/// <reference path="../index.d.ts" />

import {
  BulkWriteOptions,
  Db,
  DeleteResult,
  Document,
  Filter,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  OptionalId,
  UpdateFilter,
  UpdateResult,
  WithId,
} from "mongodb";

/*
function mongoInsertMany(
  collection: string,
  items: OptionalId<Document>[],
  options?: BulkWriteOptions
): Promise<InsertManyResult<Document>> {
  const myCollection = db.collection(collection);
  if (options) {
    return myCollection.insertMany(items, options);
  } else {
    return myCollection.insertMany(items);
  }
}
function mongoDeleteMany(
  collection: string,
  filter: Filter<Document>
): Promise<DeleteResult> {
  const myCollection = db.collection(collection);
  return myCollection.deleteMany(filter);
}
function mongoDelete(
  collection: string,
  filter: Filter<Document>
): Promise<DeleteResult> {
  const myCollection = db.collection(collection);
  return myCollection.deleteOne(filter);
}
function mongoUpdateMany(
  collection: string,
  filter: Filter<Document>,
  update: UpdateFilter<Document>
): Promise<Document | UpdateResult> {
  const myCollection = db.collection(collection);
  return myCollection.updateMany(filter, update);
}
function mongoUpdate(
  collection: string,
  filter: Filter<Document>,
  update: UpdateFilter<Document>
): Promise<UpdateResult> {
  const myCollection = db.collection(collection);
  return myCollection.updateOne(filter, update);
}
*/
enum functions {
  "mongoFind",
  "mongoFindMany",
  "mongoInsert",
}

module.exports = function () {
  Cypress.Commands.add(
    "mongoFind",
    (
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoFind,
        collection: "categories",
        findParameters: { filter: { cat: "Roba" } },
      });
    }
  );
  Cypress.Commands.add("mongoFindOne", () => {
    cy.task("mongoConnection", {}).then(() => {});
    /*
        const myDb = data as Db;
        return mongoFind(myDb, { collection: "categories" });
        */
  });
  //return mongoFind({ collection, filter, options });
};
