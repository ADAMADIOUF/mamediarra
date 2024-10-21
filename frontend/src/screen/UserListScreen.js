import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice'
import Loader from '../components/Loading'
import Message from '../components/Message'
import { toast } from 'react-toastify'


const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        refetch()
        toast.success('User deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <div className='container'>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='user-list'>
          {users.map((user) => (
            <div className='user-card' key={user._id}>
              <div className='user-info'>
                <div>ID: {user._id}</div>
                <div>Name: {user.name}</div>
                <div>
                  Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div>
                  Admin:{' '}
                  {user.isAdmin ? (
                    <FaCheck className='fa-check' />
                  ) : (
                    <FaTimes className='fa-times' />
                  )}
                </div>
              </div>
              <div>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <button className='btn btn-light'>
                    <FaEdit />
                  </button>
                </LinkContainer>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteHandler(user._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserListScreen
