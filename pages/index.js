import Head from "next/head";
import Calculator from "../src/components/Calculator";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Pizza Calculator</title>
                <meta
                    id="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
                />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>🍕 Pizza Calculator 🍕</h1>

                <Calculator />
            </main>
        </div>
    );
}
