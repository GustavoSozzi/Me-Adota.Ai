import React, { Component } from 'react';
//import styles ....
import styles from "./Dogs.module.css";
import Dogs from "../img/svg/Dog.Svg?react";
import { Link } from 'react-router-dom';
import Home from './Home';

const Header = () => {
    //const {data, userLogout} = React.useContext();

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                {""}
                {/*combina a classe nav do modulo styles com a container*/}
                <ul>
                    <li>
                        <Link to ="/" aria-label="Dogs - Home" className={styles.link}>
                           <img src={Dogs} alt="Dog Shelter" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/pets" className={`${styles.link} ${styles.login}`}>
                            Pets
                        </Link>
                    </li>
                    <li>
                        <Link to="/login/register" className={`${styles.link} ${styles.login}`}>
                            Tutor
                        </Link>
                    </li>
                    <li>
                        <Link to="/abrigo" className={`${styles.link} ${styles.login}`}>
                            Abrigo
                        </Link>
                    </li>
                    <li>
                        <Link to="/sobre" className={`${styles.link} ${styles.login}`}>
                            Sobre nós
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;

