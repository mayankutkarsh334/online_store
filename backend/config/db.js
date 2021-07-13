import mongoose from 'mongoose';

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect('mongodb+srv://mayank334:dkzZJl21tIZhEEiu@cluster0.xppsf.mongodb.net/online-store?retryWrites=true&w=majority',{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;