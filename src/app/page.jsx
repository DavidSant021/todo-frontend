import Header from "@/components/Header";
import Link from "next/link";
import style from './page.module.scss'

export default function Home() {
  return (
    <>
      <Header />
      <div className={style.container}>
        <h1 className={style.title}>Finalmente organize seu trabalho e sua vida.</h1>
        <p className={style.text}>
          Simplifique a sua vida e a da sua equipe. O gerenciador de tarefas e aplicativo de to-do list nº 1.
        </p>
        <Link href="/checklists" >
          <button className={style.btn}>
            Começar
          </button>
        </Link>
      </div>
    </>
  );
}
