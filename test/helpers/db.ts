import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer | null = null;

export const connectDB = async () => {
  if (!mongo) {
    mongo = await MongoMemoryServer.create();
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(mongo.getUri());
};

export const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const collection of Object.values(collections)) {
    await collection.deleteMany({});
  }
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongo) {
    await mongo.stop();
    mongo = null;
  }
};
