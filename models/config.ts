import { MongoOptions } from "mongodb";

type dbConfig = {
  uri: string;
  user: string;
  pass: string;
  options: MongoOptions;
};
