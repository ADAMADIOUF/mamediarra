import express from "express"
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoute from "./routes/productRoute.js"
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
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
app.use('/api/orders', orderRoute)
app.use(`/api/upload`, uploadRoute)
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`The server running at port ${port}`))
 
