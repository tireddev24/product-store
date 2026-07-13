import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Error: MONGO_URI environment variable is not defined.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(mongoUri, {
      dbName: "product_store",
    });
    console.log(`DB Connected: ${conn.connection.port}`); //for debugging
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 means failure, code 0 means success
  }
};
