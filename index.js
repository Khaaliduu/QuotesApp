import express from 'express';
import connectToDb from './config/db.js';
import userRoutes from './router/userRoute.js'; // adjust path
import dotenv from 'dotenv';


dotenv.config()
const app = express()
connectToDb()
const port = process.env.PORT || 4000


app.use(express.json())

app.use('/api/users', userRoutes);


app.listen(port, ()=>{
    console.log(`server is running on prot ${port}`);
})