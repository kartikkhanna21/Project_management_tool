import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getBacklog } from '../../actions/backlogActions';
import styles from "./ProjectBoard.module.css";

class ProjectBoard extends Component {

    constructor() {
        super();

        this.state = {
            errors: {}
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    render() {
        const { project_tasks } = this.props.backlog;
        const { id } = this.props.match.params;
        console.log(id,"render id");
        const { errors } = this.state;

        let boardContent;

        const boardAlgorithm = (errors, project_tasks) => {
            if (project_tasks.length < 1) {
                if (errors.projectNotFound) {
                    return (
                        <div style={{margin:"3rem 1rem"}} className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    )
                }
                else if(errors.projectIdentifier){
                    return (
                        <div style={{margin:"3rem 1rem"}} className="alert alert-danger text-center" role="alert">
                            {errors.projectIdentifier}
                        </div>
                    )
                }
                else {
                    return (
                        <div style={{margin:"3rem 1rem"}} className={`${styles.alert_info} alert text-center`} role="alert">
                            No Project Tasks on this board
                        </div>
                    )
                }
            }
            else{
                return(
                    <Backlog id={id} project_tasks_prop={project_tasks} />
                )
            }
        }

        boardContent = boardAlgorithm(errors,project_tasks);
        return (
            <div>
                <div style={{marginTop:"2rem"}} className="container">
                    <Link to={`/addProjectTask/${id}`} className={`${styles.btn_createProject} btn mb-3`}>
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />

                </div>

                {boardContent}

            </div>
        )
    }
}

ProjectBoard.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors

});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
