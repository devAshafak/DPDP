import { MongoClient, Db, Collection, Document } from "mongodb";

// You can also move this URI to an env var: process.env.MONGODB_URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dpdp";

if (!uri) {
  throw new Error("MongoDB connection string is missing");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// In development, use a global variable so that the client is reused
// across hot-reloads. In production, create a new client once.
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(dbName = "dpdp"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getCollection<T extends Document = Document>(
  name: string,
  dbName = "dpdp"
): Promise<Collection<T>> {
  const db = await getDb(dbName);
  return db.collection<T>(name);
}

