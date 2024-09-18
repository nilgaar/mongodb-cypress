import {
  Collection,
  Filter,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  Document,
  InsertOneOptions,
  OptionalId,
  UpdateFilter,
} from "mongodb";

export enum functions {
  "mongoFindOne",
  "mongoFindMany",
  "mongoInsertOne",
  "mongoInsertMany",
  "mongoDeleteMany",
  "mongoDeleteOne",
  "mongoUpdateMany",
  "mongoUpdateOne",
}

module.exports = (dbConfig: {
  uri: string;
  db: string;
  options?: MongoClientOptions;
}) => {
  return {
    mongoConnection: async (arg: {
      fun: functions;
      collection: string;
      findParameters?: { filter?: Filter<Document>; findOps?: FindOptions };
      insertParameters?: {
        item: OptionalId<Document> | OptionalId<Document>[];
        options?: InsertOneOptions;
      };
      deleteParameters?: { filter: Filter<Document> };
      updateParameters?: {
        filter: Filter<Document>;
        update: UpdateFilter<Document>;
      };
      db?: string;
    }): Promise<any> => {
      const mydb = arg.db ? arg.db : dbConfig.db;
      try {
        const c = await new MongoClient(
          dbConfig.uri,
          dbConfig.options
        ).connect();
        const db: Collection<Document> = c.db(mydb).collection(arg.collection);
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
      return await handleFindMany(arg, db);
    case functions.mongoFindOne:
      return await handleFindOne(arg, db);
    case functions.mongoInsertOne:
      return await handleInsertOne(arg, db);
    case functions.mongoInsertMany:
      return await handleInsertMany(arg, db);
    case functions.mongoDeleteMany:
      return await handleDeleteMany(arg, db);
    case functions.mongoDeleteOne:
      return await handleDeleteOne(arg, db);
    case functions.mongoUpdateMany:
      return await handleUpdateMany(arg, db);
    case functions.mongoUpdateOne:
      return await handleUpdateOne(arg, db);
    default:
      throw new Error(`function ${arg.fun} not supported`);
  }
}

async function handleFindMany(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  if (arg.findParameters && arg.findParameters.filter) {
    return await db
      .find(arg.findParameters.filter, arg.findParameters.findOps)
      .toArray();
  } else {
    return db.find().toArray();
  }
}

async function handleFindOne(arg: any, db: Collection<Document>): Promise<any> {
  if (arg.findParameters && arg.findParameters.filter) {
    return await db.findOne(
      arg.findParameters.filter,
      arg.findParameters.findOps
    );
  }
}

async function handleInsertOne(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  if (arg.insertParameters?.options) {
    return await db.insertOne(
      arg.insertParameters.item,
      arg.insertParameters.options
    );
  } else {
    return await db.insertOne(arg.insertParameters!.item);
  }
}

async function handleInsertMany(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  if (arg.insertParameters?.options) {
    return await db.insertMany(
      arg.insertParameters.item as OptionalId<Document>[],
      arg.insertParameters.options
    );
  } else {
    return await db.insertMany(
      arg.insertParameters!.item as OptionalId<Document>[]
    );
  }
}

async function handleDeleteMany(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  return await db.deleteMany(arg.deleteParameters!.filter);
}

async function handleDeleteOne(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  return await db.deleteOne(arg.deleteParameters!.filter);
}

async function handleUpdateMany(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  return await db.updateMany(
    arg.updateParameters!.filter,
    arg.updateParameters!.update
  );
}

async function handleUpdateOne(
  arg: any,
  db: Collection<Document>
): Promise<any> {
  return await db.updateOne(
    arg.updateParameters!.filter,
    arg.updateParameters!.update
  );
}
