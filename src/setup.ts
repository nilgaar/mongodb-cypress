import { Db, MongoClient, MongoClientOptions } from "mongodb";

export let myConnection: MongoClient;
export let db: Db;

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

module.exports = { initMongoConn, closeMongoConn, setdb };
