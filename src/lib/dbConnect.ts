import mongoose, { Connection } from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const uri = process.env.URI;

  if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
  }

  const db = await mongoose.connect(uri, { dbName: "E-commerce" });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
