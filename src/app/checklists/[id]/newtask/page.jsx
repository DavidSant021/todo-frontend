import AddTaskForm from "@/components/AddTasksForm";
import Header from "@/components/Header";
import style from './page.module.scss'

export default function newTask({ params }) {
    return (
        <>
            <Header />
            <div className={style.container}>
                <h1>Adicionar uma Tarefa</h1>
                <AddTaskForm checklist={params.id} />
            </div>

        </>
    )
}