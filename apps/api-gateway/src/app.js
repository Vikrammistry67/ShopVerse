import express from "express";
import morgan from "morgan";

import authProxy from "./routes/users/auth.proxy.js";
import productsProxy from './routes/Products/product.proxy.js';
import cartProxy from './routes/Products/cart.proxy.js'
import orderProxy from './routes/Products/order.proxy.js'
const app = express();

app.use(morgan("dev"));

// IMPORTANT — NO express.json() BEFORE PROXY

app.use("/api/auth", authProxy);
app.use("/api/products", productsProxy);
app.use('/api/carts', cartProxy);
app.use('/api/orders', orderProxy)

export default app;