'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import style from './index.module.scss'

import { FaCheck } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const apiUrl = process.env.NEXT_PUBLIC_API_CONNECT_URL

export default function ChecklistContent() {
    const [checklists, setChecklists] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const searchLowerCase = search.toLowerCase()
    const checklistsFilter = searchLowerCase === ''
        ? checklists
        : checklists.filter((checklist) => checklist.name.toLowerCase().includes(searchLowerCase))

    const getChecklists = async (url) => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()

            const checklistsWithTasks = await Promise.all(data.map(async (checklist) => {
                const tasks = await getTasks(`${apiUrl}/api/checklists/${checklist._id}/tasks`)
                return { ...checklist, tasks }
            }))

            setChecklists(checklistsWithTasks)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const getTasks = async (url) => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return await response.json()
    }

    const deleteChecklist = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/checklists/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to delete checklist')
            }

            setChecklists(checklists.filter(checklist => checklist._id !== id))
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getChecklists(`${apiUrl}/api/checklists`)
    }, [])

    if (loading) return (
        <div className={style.loadingContent}>
            <div className={style.loading}></div>
        </div>
    )
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className={style.content}>
            <div className={style.contentSearch}>
                <input
                    className={style.searchInput}
                    type="search"
                    name="searchInput"
                    id="searchInput"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label className={style.searchLabel} htmlFor="searchInput"><FaSearch /></label>
            </div>

            <div className={style.btnAddContent}>
                <h2>Listas:</h2>
                <Link href='/checklists/new'>
                    <button className={style.addChecklistBtn}>Criar Lista de Tarefas</button>
                </Link>
            </div>

            <div className={style.containerGrid}>
                {
                    checklistsFilter.map(checklist => (
                        <div key={checklist._id} className={style.checklistContent}>
                            <h2 className={style.checklistTitle}>{checklist.name}</h2>
                            <ul className={style.tasksList}>
                                <li>
                                    {checklist.tasks.length} Tarefas Totais
                                </li>
                                <li>
                                    {checklist.tasks.filter(task => task.done).length} Tarefas Concluidas
                                    <FaCheck className={style.taskChecked} />
                                </li>
                                <li>
                                    {checklist.tasks.filter(task => !task.done).length} Tarefas Pendentes
                                    <TbAlertTriangleFilled className={style.taskPending} />
                                </li>
                            </ul>
                            <div className={style.btnContent}>
                                <Link href={`/checklists/${checklist._id}`} >
                                    <button className={style.showBtn}>Ver</button>
                                </Link>
                                <button className={style.deleteBtn} onClick={() => deleteChecklist(checklist._id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            
        </div>
    )
}