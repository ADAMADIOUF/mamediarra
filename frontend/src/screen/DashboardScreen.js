import React, { useState } from 'react'

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
import { useGetAllproductsQuery } from '../slices/productApiSlice'
import { useGetOrdersQuery } from '../slices/orderApiSlice'
import{useGetUsersQuery} from "../slices/userApiSlice"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DashboardScreen = () => {
  const [inStock, setInStock] = useState('')

  // Fetch products data
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetAllproductsQuery({ inStock })
  const products = productsData?.products || []
  const totalProducts = products.length
  const inStockCount = products.filter(
    (product) => product.countInStock > 0
  ).length

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useGetOrdersQuery()
  const totalOrders = ordersData?.length || 0
  const totalEarnings = ordersData
    ? ordersData.reduce((sum, order) => sum + order.totalPrice, 0)
    : 0

  // Fetch users data
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery()
  const totalUsers = usersData?.length || 0

  // Data for the chart
  const data = {
    labels: [
      'In-Stock Products',
      'Total Products',
      'Total Orders',
      'Total Earnings',
      'Total Users',
    ],
    datasets: [
      {
        label: 'Counts',
        data: [
          inStockCount,
          totalProducts,
          totalOrders,
          totalEarnings,
          totalUsers,
        ],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#6366f1',
        ],
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
        text: 'Inventory and User Dashboard Summary',
      },
    },
  }

  return (
    <div>
      <h2>Inventory Management Dashboard</h2>
      {productsLoading || ordersLoading || usersLoading ? (
        <p>Loading...</p>
      ) : productsError || ordersError || usersError ? (
        <p>Error loading data</p>
      ) : (
        <>
          <ul>
            <li>In-Stock Products: {inStockCount}</li>
            <li>Total Products: {totalProducts}</li>
            <li>Total Orders: {totalOrders}</li>
            <li>Total Earnings: ${totalEarnings.toFixed(2)}</li>
            <li>Total Users: {totalUsers}</li>
          </ul>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardScreen
