import Head from 'next/head'
import Calculator from '../src/components/Calculator'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Calculator</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Pizza Calculator
        </h1>

        <Calculator />

      </main>
    </div>
  )
}
