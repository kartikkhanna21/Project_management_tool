import React from 'react'
import styles from './style.module.css';

const PageNotFound = () => {
    return (
        <div className={styles.containerdiv}>
                <div className={styles.mainbox}>
                    <div className={styles.err}>4</div>
                    <i className={` fa-spin ${styles.far}`}>0</i>
                    <div className={styles.err2}>4</div>
                    <div className={styles.msg}>
                        <p>The page you are looking for doesn't exist.</p>
                    </div>
                </div>
        </div>
    )
}

export default PageNotFound;
