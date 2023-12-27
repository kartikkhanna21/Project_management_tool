import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { deleteProjectTask } from '../../../actions/backlogActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class ProjectTask extends Component {
    onDeleteClick = (project_identifier, projectSequence) => {
        this.props.deleteProjectTask(project_identifier, projectSequence);
    }
    render() {
        const { project_task } = this.props;
        const { project_identifier } = this.props;
        console.log(project_identifier, "render id projecttask");

        let priorityString;
        let priorityClass;

        if (project_task.priority == 1) {
            priorityClass = "bg-danger text-light";
            priorityString = "HIGH";
        }
        if (project_task.priority == 2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM";
        }
        if (project_task.priority == 3) {
            priorityClass = "bg-info text-light";
            priorityString = "LOW";
        }
        return (

            <div>
                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
                <div className="card mb-1 bg-light">

                    <div  className={`card-header text-primary ${priorityClass}`}>
                        <font>ID: {project_task.projectSequence} -- Priority: {priorityString}</font>
                    </div>
                    <div className="card-body bg-light">
                        <h5 className="card-title">{project_task.summary}</h5>
                        <p style={{color:"black"}} className="card-text text-truncate ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <div >
                            <div style={{float:"left"}}>
                                <Link style={{fontSize:"13px",textDecoration:"none"}} to={`/updateProjectTask/${project_identifier}/${project_task.projectSequence}`} className="btn btn-primary">
                                    View / Update
                                </Link>
                            </div>
                            <div style={{float:"right"}}>
                                <button style={{fontSize:"13px"}} onClick={this.onDeleteClick.bind(this, project_identifier, project_task.projectSequence)} className="btn btn-danger ml-4">
                                    Delete
                                </button>
                            </div>
                            
                        </div>

                    </div>
                </div>

                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
            </div>
        )
    }
}
ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

export default connect(null, { deleteProjectTask })(ProjectTask);
