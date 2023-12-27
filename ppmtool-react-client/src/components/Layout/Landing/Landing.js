import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./LandingStyle.module.css";
import background_img from "./purple_background.jpg"

class Landing extends Component {

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
            <div className={styles.container_bg}>
                <div className={`${styles.container_content} landing`}>
                    <div className="light-overlay landing-inner text-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <p className={`mb-4 ${styles.project_heading}`}>Personal Project Management Tool</p>
                                    <p className={`${styles.lead}`}>
                                        Create your account to join active projects or start you own
                                    </p>

                                    <hr />
                                    <div >
                                        <div className={styles.auth_container}>
                                            <Link style={{ textDecoration: 'none' }} className={`${styles.btn_primary} btn btn-lg mr-2`} to="/register">
                                                Sign Up
                                            </Link>
                                        </div>

                                        <div className={styles.auth_container}>
                                            <Link style={{ textDecoration: 'none' }} className={`${styles.btn_secondary} btn btn-lg mr-2`} to="/login">
                                                Login
                                            </Link>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Landing.propTypes = {
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});
export default connect(mapStateToProps)(Landing);