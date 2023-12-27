import React, { Component } from 'react'
import { createNewUser } from '../../actions/securityActions';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors)
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
            console.log(this.state.errors);
        }

    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }

        this.props.createNewUser(newUser, this.props.history);


    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className={`${styles.row}`}>
                            <div className={`${styles.form_container} col-md-5`}>
                                <h1 className={`${styles.form_header_signup} display-4 text-center`}>Sign Up</h1>
                                <p className={`${styles.subheading} lead text-center`}>Create your Account</p>
                                <form onSubmit={this.onSubmit} >
                                    <div className={`${styles.input_style} form-group`}>
                                        <input type="text" className={classnames(`${styles.form_control} `, {
                                            "is-invalid": errors.fullName
                                        })}
                                            placeholder="Full Name" name="fullName" value={this.state.fullName}
                                            onChange={(e) => { this.setState({ fullName: e.target.value }) }} />
                                        {errors.fullName ?
                                            (<div className="invalid-feedback">
                                                {errors.fullName}
                                            </div>)
                                            :
                                            null
                                        }
                                    </div>
                                    <div className={`${styles.input_style} form-group`}>
                                        <input type="email"
                                            className={classnames(`${styles.form_control} `, {
                                                "is-invalid": errors.username
                                            })}
                                            placeholder="Email Address (Username)" name="username"
                                            value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                        {errors.username ?
                                            (<div className="invalid-feedback">
                                                {errors.username}
                                            </div>)
                                            :
                                            null
                                        }
                                    </div>
                                    <div className={`${styles.input_style} form-group`}>
                                        <input type="password"
                                            className={classnames(`${styles.form_control} `, {
                                                "is-invalid": errors.password
                                            })}
                                            placeholder="Password" name="password"
                                            value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        {errors.password ?
                                            (<div className="invalid-feedback">
                                                {errors.password}
                                            </div>)
                                            :
                                            null
                                        }
                                    </div>
                                    <div className={`${styles.input_style} form-group`}>
                                        <input type="password"
                                            className={classnames(`${styles.form_control} `, {
                                                "is-invalid": errors.confirmPassword
                                            })}
                                            placeholder="Confirm Password"
                                            name="confirmPassword" value={this.state.confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                                        {errors.confirmPassword ?
                                            (<div className="invalid-feedback">
                                                {errors.confirmPassword}
                                            </div>)
                                            :
                                            null
                                        }
                                    </div>
                                    <div className={styles.button_container}>
                                        <input type="submit" className={`${styles.btn_secondary} btn btn-block mt-4`} />
                                    </div>
                                    <div style={{ color: "black", marginTop: "1rem" }}>
                                        <font >Already having an account? <Link style={{ color: "purple" }} to="/login">Login</Link> </font>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,  //makes errors as a prop for register component
    security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,  //recieves errors state from reducer
    security: state.security
})

export default connect(mapStateToProps, { createNewUser })(Register);
