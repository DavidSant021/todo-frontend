'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import style from './index.module.scss'

const apiUrl = process.env.NEXT_PUBLIC_API_CONNECT_URL

export default function AddChecklistForm() {
    const [name, setName] = useState("")
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const response = await fetch(`${apiUrl}/api/checklists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })

        if (response.ok) {
            console.log('Checklist created successfully!')
            setLoading(false)
            router.replace('/checklists')
        } else {
            console.error('Failed to create checklist')
        }
    }

    if (loading) return (
        <div className={style.loadingContent}>
            <div className={style.loading}></div>
        </div>
    )

    return (
        <form className={style.addChecklistForm} onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                placeholder="Nome da Lista..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Criar</button>
        </form>
    )
}