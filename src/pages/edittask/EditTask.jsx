import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserContext';

const EditTask = () => {
    const params = useParams().taskId;
    const user = useContext(UserContext)
    const [data, setData] = useState({})
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [due, setDue] = useState('');
    const [status, setStatus] = useState('');

    const getTheTask = async () => {
        try {
            const res = await axios.get(`${server}/tasks/getatask/${params}`, { withCredentials: true });
            setData(res.data.response);
            setTitle(res.data.response.title);
            setDesc(res.data.response.desc);
            setDue(res.data.response.due);
            setStatus(res.data.response.status);
        } catch (error) {
            console.log(error)
        }
    }

    const updateTheTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${server}/tasks/edittask/${params}`, {
                title,
                desc,
                due,
                status,
                userId: user._id,
            }, { withCredentials: true })
            toast.success("Successfully updated")
        } catch (error) {

        }
    }

    useEffect(() => {
        getTheTask();
    }, [])
    return (
        <div className='edit-task'>
            <h1>Edit Task</h1>
            <form className='form' onSubmit={updateTheTask}>
                <input type="text" placeholder='Enter a title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Enter your Note' value={desc} onChange={(e) => setDesc(e.target.value)} />
                <input type="date" placeholder='Enter due date' value={due} onChange={(e) => setDue(e.target.value)} />
                <div className="status">
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="complete">Completed</option>
                    </select>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditTask
