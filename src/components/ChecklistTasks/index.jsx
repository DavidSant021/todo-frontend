'use client'

import { useEffect, useState } from "react"
import style from './index.module.scss'

import { FaTrash } from "react-icons/fa";

const apiUrl = process.env.NEXT_PUBLIC_API_CONNECT_URL

export default function ChecklistTasks({ id }) {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const checklistId = id

    const getTasks = async (checklistId) => {
        try {
            const response = await fetch(`${apiUrl}/api/checklists/${checklistId}/tasks`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const tasks = await response.json()
            return tasks
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (taskId) => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== taskId))
                setLoading(false)
            }
        } catch (error) {
            console.log('Erro ao deletar task:', error)
        }
    }

    useEffect(() => {
        getTasks(checklistId)
            .then(tasks => {
                setTasks(tasks)
            })
            .catch(error => {
                console.error('Failed to fetch tasks:', error)
            })
    }, [checklistId])

    const handleCheckbox = async (taskId, done) => {
        // Update the local state optimistically
        const taskToUpdateIndex = tasks.findIndex(task => task._id === taskId)
        if (taskToUpdateIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskToUpdateIndex] = { ...updatedTasks[taskToUpdateIndex], done };
            setTasks(updatedTasks);
        }

        // Make the API request
        try {
            const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: { done: done } })
            })

            if (!response.ok) {
                throw new Error('Failed to update task')
            }

            const updatedTask = await response.json()

            // Confirm the update with the response from the server
            const taskToUpdateIndex = tasks.findIndex(task => task._id === updatedTask._id)
            if (taskToUpdateIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[taskToUpdateIndex] = updatedTask;
                setTasks(updatedTasks);
            }
        } catch (error) {
            console.log(`Erro: ${error}`)
        }
    }

    if (loading) return (
        <div className={style.loadingContent}>
            <div className={style.loading}></div>
        </div>
    )

    return (
        <div className={style.tasksContent}>
            {tasks.map(task => (
                <div className={style.taskContent} key={task._id}>
                    <p className={task.done ? style.checked : style.unchecked}>{task.name}</p>
                    <div className={style.taskController}>
                        <input
                            className={style.inputCheckTask}
                            type="checkbox"
                            name="task"
                            id={`task-${task._id}`}
                            checked={task.done}
                            onChange={(e) => handleCheckbox(task._id, e.target.checked)}
                        />
                        <button
                            className={style.deleteBtn}
                            onClick={() => deleteTask(task._id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
