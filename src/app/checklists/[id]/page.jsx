import ChecklistTasks from "@/components/ChecklistTasks"
import Header from "@/components/Header"
import Link from "next/link"
import style from './page.module.scss'

const apiUrl = process.env.NEXT_PUBLIC_API_CONNECT_URL

export default async function ViewChecklist({ params }) {
    const response = await fetch(`${apiUrl}/api/checklists/${params.id}`)
    const checklist = await response.json()

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.titleContent}>
                    <h2>{checklist.name}</h2>
                    <Link href={`/checklists/${checklist._id}/newtask`}>
                        <button className={style.addTaskBtn}>
                            Adicionar Tarefa
                        </button>
                    </Link>
                </div>
                <ChecklistTasks id={checklist._id} />
            </div>
        </>

    )
}