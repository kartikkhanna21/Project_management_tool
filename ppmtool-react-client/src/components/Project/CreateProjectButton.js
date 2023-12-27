import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../Dashboard.module.css';

const CreateProjectButton = () => {
    return (
        <React.Fragment>
            <Link to="/addProject">
                <button className={`${styles.btn_secondary} ${styles.btn} btn-block mt-4`}>Create a Project</button>
            </Link>
        </React.Fragment>
    )
}

export default CreateProjectButton
