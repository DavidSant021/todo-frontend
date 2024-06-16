import Link from "next/link";
import style from './header.module.scss'

export default function Header() {
    return (
        <header className={style.header}>
            <span>
                <Link className={style.homeBtn} href="/">TODO-LIST</Link>
            </span>
            <ul className={style.navArea}>
                <li>
                    <Link className={style.linkBtn} href="/checklists">Listas de Tarefas</Link>
                </li>
            </ul>
        </header>
    )
}