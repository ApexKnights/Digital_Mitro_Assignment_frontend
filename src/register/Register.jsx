import React, { useState } from 'react'
import "./styles.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { server } from '../main'

const Register = () => {
    const navigateTo = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/register`, { username, email, password }, { withCredentials: true });
            toast.success(res.data.message)
            navigateTo("/")
            window.location.reload();
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='register'>
            <h1>Register</h1>
            <form className='form' onSubmit={handleRegister}>
                <input type="text" placeholder='Enter Your Name' required onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder='Enter Your Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Your Password' required onChange={(e) => setPassword(e.target.value)} />
                <button>Register</button>
            </form>
            <span>Already an user? <Link to={"/"}>Login</Link></span>
        </div>
    )
}

export default Register
