import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/securityActions";
import { browserHistory } from "react-router";
import styles from "./HeaderStyle.module.css";

class Header extends Component {
    logout() {
        const { history } = this.props;
        this.props.logout();
        history.push("/");
    }
    render() {
        const { validToken, user } = this.props.security;

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="navbarText">
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                </div>
                <ul className={`navbar-nav mb-lg-0 mb-2 ${styles.ul_screen}`}>
                    <li className="nav-item me-3">
                        <Link className={`${styles.nav_link}`} to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className={`navbar-nav mb-lg-0 mb-2 ${styles.ul_screen}`}>
                    <li className="nav-item me-3">
                        <Link className={`${styles.nav_link} ${styles.userName_style} `} to="/dashboard">
                            <i className={`${styles.userName_icon} fas fa-user-circle mr-1`} />
                            {user.fullName}
                        </Link>
                    </li>
                    <li className="nav-item me-3">
                        <Link
                            className={`${styles.nav_link}`}
                            to="/"
                            onClick={this.logout.bind(this)}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const userIsNotAuthenticated = (

            <div className="collapse navbar-collapse" id="navbarText">
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                </div>
                <ul className={`navbar-nav mb-lg-0 mb-2 ${styles.ul_screen}`}>
                    <li className="nav-item me-3">
                        <Link className={`${styles.nav_link} `} to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className={`nav-item me-3`}>
                        <Link className={`${styles.nav_link}`} to="/login">
                            Login
                        </Link>
                    </li>
                </ul>

                
            </div>

        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <div >
                {/* <nav className="navbar navbar-light bg-light justify-content-between">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Home
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        {headerLinks}
                    </div>
                </nav> */}
                <nav className={`${styles.nav_style} navbar navbar-expand-lg bg-body-tertiary`}>
                    <div className="container-fluid">
                        <Link className={`${styles.nav_text,styles.navbar_brand} ms-3`} to="/">
                            Home
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {headerLinks}

                    </div>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);