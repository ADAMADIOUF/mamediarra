import express from "express"
import dotenv from 'dotenv'
import productRoute from "./routes/productRoute.js"
import connectDB from './config/db.js'
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 5000
app.use('/api/products', productRoute)
app.listen(port, () => console.log(`The server running at port ${port}`))
 
