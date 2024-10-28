import express from 'express'
import { generateInvoice } from '../controllers/generateController.js'

const router = express.Router()
router.get('/orders/:orderId/invoice', generateInvoice)

export default router
