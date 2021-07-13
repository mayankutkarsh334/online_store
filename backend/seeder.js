import mongoose from 'mongoose';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import products from './data/products.js';
import users from './data/users.js';
import connectDB from './config/db.js';

connectDB();

const importData=async ()=>{
    try{
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        const importUser=await User.insertMany(users);
        const admn_id=importUser[0].id;
        const importProduct=products.map(product=>{
            return {...product,user:admn_id};
        });
        await Product.insertMany(importProduct);
        console.log("import success");
    }
    catch(error){
        console.log(`${error.message}`);
    }
}

const destroyData=async()=>{
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        console.log("data destroyed!");
    } catch (error) {
        console.log(`${error.message}`);
    }
}

if(process.argv[2]==="-d") destroyData();
else importData();

