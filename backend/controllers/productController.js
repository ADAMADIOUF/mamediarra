import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/Product.js'
const getPorducts = asyncHandler(async (req, res) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  // Search
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  // Filters
  const filters = {
    ...keyword,
    ...(req.query.category ? { category: req.query.category } : {}),
    ...(req.query.rating ? { rating: { $gte: req.query.rating } } : {}),
    ...(req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {}),
    ...(req.query.inStock === 'false' ? { countInStock: { $eq: 0 } } : {}),
    ...(req.query.minPrice ? { price: { $gte: req.query.minPrice } } : {}),
    ...(req.query.maxPrice ? { price: { $lte: req.query.maxPrice } } : {}),
  }

  const count = await Product.countDocuments(filters)

  // Set sorting options based on query
  let sortOptions = {}
  if (req.query.sortBy) {
    sortOptions =
      req.query.sortBy === 'priceAsc'
        ? { price: 1 }
        : req.query.sortBy === 'priceDesc'
        ? { price: -1 }
        : { rating: -1 } // Default sort by rating if no valid sortBy is provided
  }

  // Fetch products with pagination and sorting
  const products = await Product.find(filters)
    .sort(sortOptions) // Apply sorting here
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


const getPorductsShoes = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: 'Shoes' })

  res.json({ products })
})
const getPorductsClothing = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: 'Clothing' })
  res.json({ products })
})
const getPorductsAccesory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: 'Accesory' })
  res.json({ products })
})
const getPorductsAfrican = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: 'African' })
  res.json({ products })
})
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  }
  res.status(404)
  throw new Error('Resource not found')
})
const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    images: ['/images/sample.jpg', '/images/sample.jpg'],
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, images, brand, category, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    ;(product.name = name),
      (product.price = price),
      (product.description = description),
      (product.images = images),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock)
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReview) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})
const deleteProductReview = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const reviewId = req.params.reviewId

  const product = await Product.findById(productId)
  if (product) {
    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    )
    if (reviewIndex !== -1) {
      // Check if the review belongs to the authenticated user
      if (
        product.reviews[reviewIndex].user.toString() !== req.user._id.toString()
      ) {
        res.status(401)
        throw new Error('You are not authorized to delete this review')
      }

      product.reviews.splice(reviewIndex, 1)
      product.numReviews = product.reviews.length
      if (product.numReviews > 0) {
        product.rating =
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
      } else {
        product.rating = 0
      }
      await product.save()
      res.json({ message: 'Review deleted' })
    } else {
      res.status(404)
      throw new Error('Review not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.status(200).json(products)
})
export {
  getPorducts,
  getPorductsShoes,
  getPorductsClothing,
  getPorductsAccesory,
  getPorductsAfrican,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts,
}
