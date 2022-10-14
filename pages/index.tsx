import type { NextPage } from 'next';
import Test from '../components/Test';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Test />
    </div>
  );
};

export default Home;
