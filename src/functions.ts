/// <reference types="cypress" />
/// <reference path="../index.d.ts" />

import {
  BulkWriteOptions,
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
import { db } from "./setup";

async function mongoFind(arg: {
  collection: string;
  filter?: Filter<Document>;
  options?: FindOptions;
}): Promise<WithId<Document>[]> {
  const myCollection = db.collection(arg.collection);
  if (arg.filter) {
    return await myCollection.find(arg.filter, arg.options).toArray();
  } else {
    return await myCollection.find().toArray();
  }
}
function mongoFindOne(arg: {
  collection: string;
  filter: Filter<Document>;
  options?: FindOptions;
}): Document {
  const myCollection = db.collection(arg.collection);

  return myCollection.findOne(arg.filter, arg.options);
}
function mongoInsert(
  collection: string,
  item: OptionalId<Document>,
  options?: InsertOneOptions
): Promise<InsertOneResult<Document>> {
  const myCollection = db.collection(collection);
  if (options) {
    return myCollection.insertOne(item, options);
  } else {
    return myCollection.insertOne(item);
  }
}
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

module.exports = function () {
  Cypress.Commands.add(
    "mongoFind",
    (collection: string, filter?: Filter<Document>, options?: FindOptions) => {
      return mongoFind({ collection, filter, options });
    }
  );
};
