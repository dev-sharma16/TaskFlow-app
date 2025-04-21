import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import {logout} from '../../store/authSlice'

function LogoutBtn(){
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout(). then (()=>{
            dispatch(logout())
        })
    }
    return(
        <button  className='inline-block px-5 py-2 text-sm font-medium rounded-full hover:bg-green-400 hover:text-white transition-all duration-200'
        onClick={logoutHandler}> 
          Logout
        </button>
    )
}

export default LogoutBtn
