import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'

const Menu = () => {
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${server}/auth/logout`, { withCredentials: true })
            window.location.reload();
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='link-menu'>
            <Link to={"/"} className='link'>Home</Link>
            <Link to={"/addtask"} className='link'>Add Task</Link>
            <Link to={"/profile"} className='link'>Profile</Link>
            <button className='link' onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Menu
