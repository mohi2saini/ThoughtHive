import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 text-white'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn