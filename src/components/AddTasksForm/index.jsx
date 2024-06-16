'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react"

import style from './index.module.scss'

const apiUrl = process.env.NEXT_PUBLIC_API_CONNECT_URL

export default function AddTaskForm({ checklist }) {
    const [taskName, setTaskName] = useState('')
    const router = useRouter()
    const checklistId = checklist
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/checklists/${checklistId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: { name: taskName} })
            })

            if (response.ok) {
                console.log('Tarefa adicionada com sucesso!')
                setLoading(false)
                router.push(`/checklists/${checklistId}`)
            } else {
                console.error('Falha ao adicionar a tarefa')
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
        <form className={style.addTaskForm} onSubmit={handleSubmit}>
            <input
                type="text"
                name="taskName"
                id="taskName"
                placeholder='Nome da Tarefa...'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button type="submit">Adicionar</button>
        </form>
    )
}