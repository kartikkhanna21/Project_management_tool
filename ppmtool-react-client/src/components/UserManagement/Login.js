import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';

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
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username
                      })}
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
                  <div className="form-group">
                    <input type="password"
                      className={classnames("form-control form-control-lg", {
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
                  <input type="submit" className="btn btn-info btn-block mt-4" />
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
