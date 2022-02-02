import {
  Collection,
  Db,
  Filter,
  FindOptions,
  MongoClient,
  MongoClientOptions,
  Document,
  InsertOneOptions,
  OptionalId,
  WithId,
  InsertOneResult,
} from "mongodb";

enum functions {
  "mongoFind",
  "mongoFindMany",
  "mongoInsert",
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
        item: OptionalId<Document>;
        options?: InsertOneOptions;
      };
      db?: string;
    }): Promise<any> => {
      const mydb = arg.db ? arg.db : dbConfig.db;
      let data;
      let c: MongoClient;
      try {
        c = await new MongoClient(dbConfig.uri, dbConfig.options).connect();
        const db = c.db(mydb).collection("categories");
        switch (arg.fun) {
          case functions.mongoFind:
            if (arg.findParameters && arg.findParameters.filter) {
              return await db
                .find(arg.findParameters.filter, arg.findParameters.findOps)
                .toArray();
            } else {
              return db.find().toArray();
            }
            break;
          case functions.mongoFindMany:
            if (arg.findParameters && arg.findParameters.filter) {
              return db.findOne(
                arg.findParameters.filter,
                arg.findParameters.findOps
              );
            }
            break;

          case functions.mongoInsert:
            if (arg.insertParameters && arg.insertParameters.options) {
              return db.insertOne(
                arg.insertParameters.item,
                arg.insertParameters.options
              );
            } else {
              return db.insertOne(arg.insertParameters!.item);
            }
            break;

          default:
            return null;
            break;
        }
      } catch (e) {
        throw e;
      } finally {
        c!.close();
      }

      /*
      new Promise((res, rej) => {
        try {
          const c = new MongoClient(dbConfig.uri, dbConfig.options);
          return c
            .connect()
            .then((conn: MongoClient) => {
              return conn.db(dbConfig.db);
            })
            .then((db: Db) => {
              res(db);
            });
        } catch (e) {
          console.log(e);
          rej(e);
        }
      });*/
    },
  };
};
