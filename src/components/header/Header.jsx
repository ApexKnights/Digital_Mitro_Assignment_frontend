import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./styles.scss"
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from './menu'


const Header = () => {
    const [openmenu, setOpenMenu] = useState(false)
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
        <div className='header'>
            <h3>Task Management App</h3>
            <div className="links">
                <Link to={"/"} className='link'>Home</Link>
                <Link to={"/addtask"} className='link'>Add Task</Link>
                <Link to={"/profile"} className='link'>Profile</Link>
                <button className='link' onClick={logoutHandler}>Logout</button>
            </div>
            <div className="ham">
                <GiHamburgerMenu className='ico' onClick={() => setOpenMenu(!openmenu)} />
                {openmenu ? <Menu /> : null}
            </div>
        </div>
    )
}

export default Header
