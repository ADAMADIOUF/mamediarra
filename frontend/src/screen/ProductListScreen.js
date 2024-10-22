import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from '../components/Loading'
import Message from '../components/Message'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../slices/productApiSlice'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  })

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Product deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm(`Are you sure you want to create a new product?`)) {
      try {
        await createProduct()
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <div className='header'>
        <h1>Product</h1>
        <button className='btn-create' onClick={createProductHandler}>
          <FaEdit /> Create Product
        </button>
      </div>
      {(loadingCreate || loadingDelete) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='product-list'>
            <div className='product-header'>
              <div>ID</div>
              <div>NAME</div>
              <div>PRICE</div>
              <div>CATEGORY</div>
              <div>SUBCATEGORY</div>
              <div>BRAND</div>
            </div>
            {data.products.map((product) => (
              <div className='product-item-screen' key={product._id}>
                <div>{product._id}</div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.category}</div>
                <div>{product.subcategory}</div>
                <div>{product.brand}</div>
                <div>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className='btn-edit'>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className='btn-delete'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
