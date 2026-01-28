import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/dpdp";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global._mongooseConn ?? { conn: null, promise: null };
global._mongooseConn = cached;

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI || DEFAULT_URI;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      // Keep defaults; this option avoids strictQuery warnings in older setups.
      // (Mongoose v7+ defaults to strictQuery=true anyway.)
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


