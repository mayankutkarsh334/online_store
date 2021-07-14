import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://mayank334:dkzZJl21tIZhEEiu@cluster0-shard-00-00.xppsf.mongodb.net:27017,cluster0-shard-00-01.xppsf.mongodb.net:27017,cluster0-shard-00-02.xppsf.mongodb.net:27017/online-store?ssl=true&replicaSet=atlas-g9lz7a-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
