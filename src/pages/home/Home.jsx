import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { server } from '../../main'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {
    const { user } = useContext(UserContext);
    const [taskdata, setTaskData] = useState([])
    const [statusValue, setStatusValue] = useState('')
    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${server}/tasks/alltasks/${user._id}`, { withCredentials: true });
            setTaskData(res.data.response)
        } catch (error) {

        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`${server}/tasks/deletetask/${id}`, { withCredentials: true })
            toast.success(res.data.response)
            window.location.reload();
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const getSearched = () => {

        const taskdataupdate = taskdata.filter(task => task.status === statusValue);
        setTaskData(taskdataupdate)
    }
    useEffect(() => {
        fetchTasks()
    }, [statusValue])
    return (
        <div className='home'>
            <h1>Souparno's Tasks</h1>
            <div className="filter">
                <select onChange={(e) => setStatusValue(e.target.value)}>
                    <option value="default">Select by Status</option>
                    <option value="pending"> Pending</option>
                    <option value="default"> Complete</option>
                </select>
                <button onClick={getSearched}>Search</button>
            </div>
            <div className="task-board">
                <table className='table'>
                    <tr>
                        <th>Title</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>


                    </tr>

                    {
                        taskdata.length == 0 ? <h1 style={{ padding: "10px 0px", textAlign: "center" }}>No Data To Show</h1> :
                            taskdata.map((task) => (
                                <tr>
                                    <td>{task.title}</td>
                                    <td>{task.desc}</td>
                                    <td>
                                        <span className='pending'>{task.status}</span>

                                    </td>
                                    <td>
                                        <span>{task.due}</span>
                                    </td>
                                    <td>
                                        <Link className='edit' to={`/edittask/${task._id}`}>Edit</Link>
                                        <button className='delete' onClick={() => deleteTask(task._id)}>Delete</button>
                                    </td>
                                </tr>

                            ))
                    }


                </table>


            </div>
        </div>
    )
}

export default Home
