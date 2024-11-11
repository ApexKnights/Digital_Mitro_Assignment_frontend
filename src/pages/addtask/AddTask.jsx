import React, { useContext, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';

const AddTask = () => {
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [due, setDue] = useState('');
    const [status, setStatus] = useState('');
    const handleTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/tasks/addtask`, {
                title,
                desc,
                due,
                status,
                userId: user._id,
            }, { withCredentials: true })
            toast.success(res.data.response)
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error)
        }

    }
    return (
        <div className='add-task'>
            <h1>Add A Task</h1>
            <form className='form' onSubmit={handleTask}>
                <input type="text" placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Enter your Note' onChange={(e) => setDesc(e.target.value)} />
                <input type="date" placeholder='Enter due date' onChange={(e) => setDue(e.target.value)} />
                <div className="status">
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Select</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Completed</option>
                    </select>
                </div>
                <button>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask
