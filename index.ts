import { dbConfig } from "models/config";
import { MongoClient } from "mongodb";

let myConnection: MongoClient;
let config: dbConfig;

/**
 * Connect to mongodb.
 * @param dbConfig cypress.json configuraion
 *
 */
const initMongoConn = async (dbConfig: dbConfig): Promise<MongoClient> => {
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
const setdb = (dbConfig: dbConfig | string) => {
  const mydb: string =
    typeof dbConfig === "string" ? dbConfig : (dbConfig.db as string);
  myConnection.db(mydb);
};

/**
 *
 */
const tasks = {
  mongoQuery() {
    myConnection.db();
  },
  mongoInsert() {},
};

module.exports = { initMongoConn, closeMongoConn, setdb, tasks };
