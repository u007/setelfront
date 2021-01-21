import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Link from 'next/link'
import styles from '../styles/Home.module.css';

export default function Home() {

  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
      </Head>
      <h1>Hi</h1>
      <p>Click below to proceed to orders....</p>
      <div>
        <Link href="/order">
          <a>Orders</a>
        </Link>

      </div>
    </div>
  );
}
