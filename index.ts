import { MongoClient } from "mongodb";

let myConnection: MongoClient;

const initMongoConn = async (dbConfig: any) => {
  try {
    const uri = dbConfig.uri;
    myConnection = new MongoClient(uri);
    await myConnection.connect();
  } catch (e) {
    console.log(e);
  }
};
const closeMongoConn = () => {
  if (myConnection) myConnection.close();
};

module.exports = { initMongoConn, closeMongoConn };
