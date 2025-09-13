// src/db/memoryDb.js

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;

export const connectDB = async () => {
  try {
    mongod = await MongoMemoryServer.create(); // start in-memory MongoDB
    const uri = mongod.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('[db] Connected to in-memory MongoDB');
  } catch (err) {
    console.error('[db] Failed to connect:', err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
