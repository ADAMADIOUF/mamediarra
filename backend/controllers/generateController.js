import PDFDocument from 'pdfkit'
import fs from 'fs'
import Order from '../models/orderModel.js'

export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      'user',
      'name email'
    )
    if (!order) return res.status(404).send('Order not found')

    const doc = new PDFDocument()
    const filePath = `./invoices/invoice-${order._id}.pdf`
    doc.pipe(fs.createWriteStream(filePath))

    // Header
    doc.fontSize(20).text('Invoice', { align: 'center' })
    doc.fontSize(12).text(`Order ID: ${order._id}`, { align: 'right' })
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' })

    // User info
    doc.text(`Customer: ${order.user.name}`, { align: 'left' })
    doc.text(`Email: ${order.user.email}`, { align: 'left' })

    // Order items
    doc.text('Items:', { underline: true })
    order.orderItems.forEach((item) => {
      doc.text(`${item.name} - ${item.qty} x $${item.price}`)
    })

    // Prices
    doc.text(`Items Price: $${order.itemsPrice}`)
    doc.text(`Tax: $${order.taxPrice}`)
    doc.text(`Shipping: $${order.shippingPrice}`)
    doc.text(`Total Price: $${order.totalPrice}`, { bold: true })

    doc.end()

    res.download(filePath, `invoice-${order._id}.pdf`)
  } catch (error) {
    res.status(500).json({ message: 'Error generating invoice', error })
  }
}
