import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { server } from '../../main';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [taskdata, setTaskData] = useState([])
    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${server}/tasks/alltasks/${user._id}`, { withCredentials: true });
            setTaskData(res.data.response)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchTasks();
    }, [])
    return (
        <div className='profile'>
            <h1>Profile</h1>
            <div className="prof-box">
                <h4>Name : {user.username}</h4>
                <h4>Email Id : {user.email}</h4>
                <h4>Current Notes : {taskdata.length}</h4>
            </div>
        </div>
    )
}

export default Profile
