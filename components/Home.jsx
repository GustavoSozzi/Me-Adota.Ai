import React from 'react';
import styles from './Home.module.css';
import Dog from '../img/svg/Dog.svg';
import Register from './Tutor/Register';
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
