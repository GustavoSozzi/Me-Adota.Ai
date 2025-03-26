import React from 'react';
import styles from './Home.module.css';
import Head from '../hooks/helper/Head';
import Feed from './Feed/Feed';

const Home = () => {
  return (
    <section className={`${styles.container} `}>
      <Head
        title="Home"
        description="Home do site Me Adota ai"
      />
      <Feed/>
    </section>
  );
};

export default Home;
