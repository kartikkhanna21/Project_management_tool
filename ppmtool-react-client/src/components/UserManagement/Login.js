import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {}
    }
    this.onSubmit=this.onSubmit.bind(this);
  }
  componentDidMount() {

    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const user={
      username:this.state.username,
      password:this.state.password
    }

    console.log(user,"user"); 
    
    this.props.login(user);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className={`${styles.row}`}>
              <div className={`${styles.form_container} col-md-5`}>
                <h1 className={`${styles.form_header_login} display-4 text-center`}>Login</h1>
                <form onSubmit={this.onSubmit}>
                  <div className={`${styles.input_style} form-group`}>
                    <input type="email"
                      className={classnames( `${styles.form_control} `, {
                        "is-invalid": errors.username
                      }) }
                      placeholder="Email Address (Username)" name="username"
                      onChange={(e) => { this.setState({ username: e.target.value }) }}
                      value={this.state.username} />
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
                      onChange={(e) => this.setState({ password: e.target.value })}
                      value={this.state.password}
                    />
                    {errors.password ?
                      (<div className="invalid-feedback">
                        {errors.password}
                      </div>)
                      :
                      null
                    }
                  </div>
                  <div className={styles.button_container}>
                    <input type="submit" className={`${styles.btn_secondary} btn btn-block mt-4`} />
                  </div>
                  <div style={{color:"black",marginTop:"1rem"}}>
                    <font >Don't have an account? <Link style={{color:"purple"}} to="/register">Signup</Link> </font>
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

login.PropTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  security:state.security
})
export default connect(mapStateToProps, { login })(Login);
