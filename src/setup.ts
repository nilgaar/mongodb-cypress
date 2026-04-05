import {
  Collection,
  Filter,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  Document,
  InsertOneOptions,
  BulkWriteOptions,
  OptionalId,
  UpdateFilter,
} from "mongodb";
import { functions } from "./enums";

export { functions };

module.exports = (dbConfig: {
  uri: string;
  db: string;
  options?: MongoClientOptions;
}) => {
  const client = new MongoClient(dbConfig.uri, dbConfig.options);
  let connected = false;

  return {
    mongoConnection: async (arg: {
      fun: functions;
      collection: string;
      findParameters?: { filter?: Filter<Document>; options?: FindOptions };
      insertParameters?: {
        item: OptionalId<Document> | OptionalId<Document>[];
        options?: InsertOneOptions | BulkWriteOptions;
      };
      deleteParameters?: { filter: Filter<Document> };
      updateParameters?: {
        filter: Filter<Document>;
        update: UpdateFilter<Document>;
      };
      db?: string;
    }): Promise<any> => {
      if (!connected) {
        await client.connect();
        connected = true;
      }
      const mydb = arg.db ?? dbConfig.db;
      const db: Collection<Document> = client.db(mydb).collection(arg.collection);
      try {
        return await handleDatabaseOperation(arg, db);
      } catch (e) {
        console.error(
          "An error occurred while performing the database operation:",
          e
        );
        throw e;
      }
    },
  };
};

async function handleDatabaseOperation(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  switch (arg.fun) {
    case functions.mongoFindMany:
      return await db
        .find(arg.findParameters?.filter ?? {}, arg.findParameters?.options)
        .toArray();
    case functions.mongoFindOne:
      return await db.findOne(
        arg.findParameters?.filter ?? {},
        arg.findParameters?.options
      );
    case functions.mongoInsertOne:
      return await db.insertOne(
        arg.insertParameters!.item,
        arg.insertParameters?.options as InsertOneOptions
      );
    case functions.mongoInsertMany:
      return await db.insertMany(
        arg.insertParameters!.item as OptionalId<Document>[],
        arg.insertParameters?.options as BulkWriteOptions
      );
    case functions.mongoDeleteMany:
      return await db.deleteMany(arg.deleteParameters!.filter);
    case functions.mongoDeleteOne:
      return await db.deleteOne(arg.deleteParameters!.filter);
    case functions.mongoUpdateMany:
      return await db.updateMany(
        arg.updateParameters!.filter,
        arg.updateParameters!.update
      );
    case functions.mongoUpdateOne:
      return await db.updateOne(
        arg.updateParameters!.filter,
        arg.updateParameters!.update
      );
    default:
      throw new Error(`function ${arg.fun} not supported`);
  }
}
