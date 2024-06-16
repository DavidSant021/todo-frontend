import AddChecklistForm from "@/components/AddChecklistForm"
import Header from "@/components/Header"
import style from './page.module.scss'

export default function New() {
    return (
        <>
            <Header />
            <div className={style.container}>
                <h1>Adicionar uma Checklist:</h1>
                <AddChecklistForm />
            </div>

        </>
    )
}