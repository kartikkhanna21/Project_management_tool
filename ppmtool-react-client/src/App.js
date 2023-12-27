import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import PageNotFound from "./components/Layout/404/PageNotFound";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import Landing from "./components/Layout/Landing/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import setJWTToken from "./securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/secureRoute";
const token = localStorage.jwtToken;


if (token) {
  setJWTToken(token);
  const decoded_token = jwt_decode(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_token
  })

  const currentTime = Date.now() / 1000;
  if (decoded_token.exp < currentTime) {
    store.dispatch(logout());
    window.location.href("/");
  }
}
class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Header history={this.props.history} />
          {/* 
              Public Routes
            
            */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/404" component={PageNotFound} />

          {/* 
              Private routes
            */}
          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute exact path="/updateProject/:id" component={AddProject} />
            <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />
            <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
            <SecuredRoute exact path="/updateProjectTask/:id/:ptid" component={AddProjectTask} />
          </Switch>

        </div>
      </Router>

    );
  }
}

export default App;