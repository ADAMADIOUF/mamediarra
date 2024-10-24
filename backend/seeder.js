// import.js (or your existing data import file)

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import Wishlist from './models/Whislist.js' // Import Wishlist model
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Wishlist.deleteMany() // Clear existing wishlist data

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    // Create sample wishlist data
    const sampleWishlist = createdUsers.map((user) => {
      return {
        user: user._id,
        product:
          sampleProducts[Math.floor(Math.random() * sampleProducts.length)]._id, // Random product for each user
      }
    })

    await Wishlist.insertMany(sampleWishlist) // Insert sample wishlist data

    console.log(`Data imported!`.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Wishlist.deleteMany() // Clear existing wishlist data
    console.log(`Data Destroyed!`.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
