import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DBURL = process.env.DBURL;
    const conn = await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
