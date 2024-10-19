import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoute from "./routes/productRoute.js"
import userRoute from './routes/userRoute.js'
import connectDB from './config/db.js'
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const port = process.env.PORT || 5000
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`The server running at port ${port}`))
 
