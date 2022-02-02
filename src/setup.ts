import { Db, MongoClient, MongoClientOptions } from "mongodb";

/**
 * Connect to mongodb.
 * @param dbConfig cypress.json configuraion
 *
 */
/*
const initMongoConn = async (dbConfig: {
  uri: string;
  options?: MongoClientOptions;
}): Promise<MongoClient> => {
  try {
    const myConnection = new MongoClient(dbConfig.uri, dbConfig.options);
    return await myConnection.connect();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
*/

module.exports = (dbConfig: {
  uri: string;
  db: string;
  options?: MongoClientOptions;
}) => {
  return {
    mongoConnection: async () => {
      let data;
      const c = new MongoClient(dbConfig.uri, dbConfig.options).connect();
      const db = (await c).db("arrimat").collection("categories");
      data = await db.find({}).toArray();
      return data;
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
