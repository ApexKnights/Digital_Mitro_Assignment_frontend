import React, { useState } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../../main'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/auth/login`, { email, password }, { withCredentials: true });
            toast.success(res.data.message)
            window.location.reload();
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <form className='form' onSubmit={handleLogin}>
                <input type="email" placeholder='Enter Your Email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Your Password' required onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            <span>Not an user? <Link to={"/register"}>Register</Link></span>
        </div>
    )
}

export default Login
