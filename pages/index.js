import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Тестовое задание для фронтенд-разработчиков PXSTUDIO </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>PXSTUDIO</h1>

        <p className={styles.description}>
          Тестовое задание для фронтенд-разработчиков
        </p>

        <p>
          <Link href="/api/graphql">
            <a>GraphQL API</a>
          </Link>
        </p>
        <p>
          <a href="https://github.com/reactcoder-it/pxstudio-task">Исходники</a>
        </p>
      </main>
    </div>
  )
}
