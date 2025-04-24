import mongoose, { connections } from "mongoose";

interface IConnection {
  isConnected?: number;
}

const connection: IConnection = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }
  console.log("Connecting to Database...");
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error: any) {
    console.log("Database connection failed!", error.message);
    process.exit(1);
  }
}
