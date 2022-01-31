import { dbConfig } from "models/config";
import {
  BulkWriteOptions,
  Db,
  DeleteResult,
  Document,
  Filter,
  FindCursor,
  FindOptions,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  MongoClient,
  MongoClientOptions,
  OptionalId,
  UpdateFilter,
  UpdateResult,
  WithId,
} from "mongodb";

let myConnection: MongoClient;
let db: Db;

/**
 * Connect to mongodb.
 * @param dbConfig cypress.json configuraion
 *
 */
const initMongoConn = async (dbConfig: {
  uri: string;
  options?: MongoClientOptions;
}): Promise<MongoClient> => {
  try {
    myConnection = new MongoClient(dbConfig.uri, dbConfig.options);
    return await myConnection.connect();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/**
 * Close mongodb connection.
 *
 */
const closeMongoConn = () => {
  if (myConnection) myConnection.close();
};

/**
 * Set the connection's db
 */
const setdb = (mydb: string) => {
  db = myConnection.db(mydb);
  return db;
};

/**
 *
 */
const tasks = {
  mongoFind(
    collection: string,
    filter?: Filter<Document>,
    options?: FindOptions
  ): FindCursor<WithId<Document>> {
    const myCollection = db.collection(collection);
    if (filter) {
      return myCollection.find(filter, options);
    } else {
      return myCollection.find();
    }
  },
  mongoFindOne(
    collection: string,
    filter: Filter<Document>,
    options?: FindOptions
  ): Document {
    const myCollection = db.collection(collection);

    return myCollection.findOne(filter, options);
  },
  mongoInsert(
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
  },
  mongoInsertMany(
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
  },
  mongoDeleteMany(
    collection: string,
    filter: Filter<Document>
  ): Promise<DeleteResult> {
    const myCollection = db.collection(collection);
    return myCollection.deleteMany(filter);
  },
  mongoDelete(
    collection: string,
    filter: Filter<Document>
  ): Promise<DeleteResult> {
    const myCollection = db.collection(collection);
    return myCollection.deleteOne(filter);
  },
  mongoUpdateMany(
    collection: string,
    filter: Filter<Document>,
    update: UpdateFilter<Document>
  ): Promise<Document | UpdateResult> {
    const myCollection = db.collection(collection);
    return myCollection.updateMany(filter, update);
  },
  mongoUpdate(
    collection: string,
    filter: Filter<Document>,
    update: UpdateFilter<Document>
  ): Promise<UpdateResult> {
    const myCollection = db.collection(collection);
    return myCollection.updateOne(filter, update);
  },
};

module.exports = { initMongoConn, closeMongoConn, setdb, tasks };
