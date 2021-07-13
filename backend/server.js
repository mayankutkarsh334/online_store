import express from "express";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// console.log(process.env.DB_URL);
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

const PAYPAL_CLIENT_ID =
  "AYiRc1nqttsH-2zROzeRHuOg7wqWmmtiPW65bdGaETCJC_oO_rKCH8d9Vvnkx2wazB5Yx3_uId2isjSN";
app.get("/api/config/paypal", (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

// console.log(process.env.PORT);
const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
