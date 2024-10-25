import React from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DashboardScreen = () => {

  // Get total payments, reviews, and purchased products from Redux store
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // Calculate total payments and total purchased products
  const totalPayments = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const totalPurchasedProducts = cartItems.length
  const totalReviews = 200 

  // Data for the chart
  const data = {
    labels: ['Total Payments', 'Total Reviews', 'Total Purchases'],
    datasets: [
      {
        label: 'Counts',
        data: [totalPayments, totalReviews, totalPurchasedProducts],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Dashboard Summary',
      },
    },
  }

  return (
    <div>
      <h2>Welcome to Your User Dashboard</h2>
      <p>Here’s a summary of your activity:</p>
      <ul>
        <li>Total Payment: ${totalPayments.toFixed(2)}</li>
        <li>Total Reviews: {totalReviews}</li>
        <li>Total Purchased Products: {totalPurchasedProducts}</li>
      </ul>

      <div style={{ width: '80%', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default DashboardScreen
