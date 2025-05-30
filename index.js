import express from 'express';
import connectToDb from './config/db.js';
import userRoutes from './router/userRoute.js'; // adjust path
import categoryRoutes from './router/categoryRoute.js';
import quotesRoutes from './router/quotesRoute.js';
import wishlistRoute from './router/wishlistRoute.js';


import dotenv from 'dotenv';


dotenv.config()
const app = express()
connectToDb()
const port = process.env.PORT || 4000


app.use(express.json())
app.use('/api/wishlist', wishlistRoute);

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/quotes", quotesRoutes);




app.listen(port, ()=>{
    console.log(`server is running on prot ${port}`);
})