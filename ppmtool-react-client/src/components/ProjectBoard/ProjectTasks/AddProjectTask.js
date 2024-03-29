import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProjectTask, getProjectTask, updateProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types';
import classnames from "classnames";
import styles from '../../UserManagement/Auth.module.css';

class AddProjectTask extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors: "",
            created_At: ""

        }

        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const project_task_seq = this.props.match.params.ptid;
        this.setState({ project_task_sequence: project_task_seq })
        if (id && project_task_seq) {
            this.props.getProjectTask(id, project_task_seq, this.props.history);
        }
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.projectSequence && this.state.projectIdentifier) {
            const newTask = {
                id: this.state.id,
                projectSequence: this.state.projectSequence,
                summary: this.state.summary,
                acceptanceCriteria: this.state.acceptanceCriteria,
                status: this.state.status,
                priority: this.state.priority,
                dueDate: this.state.dueDate,
                created_At: this.state.created_At

            }
            this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, newTask, this.props.history);
        }
        else {
            console.log("inside else condn")
            const newTask = {
                summary: this.state.summary,
                acceptanceCriteria: this.state.acceptanceCriteria,
                status: this.state.status,
                priority: this.state.priority,
                dueDate: this.state.dueDate,

            }
            console.log("inside else condn", newTask);
            this.props.addProjectTask(this.state.projectIdentifier, newTask, this.props.history);
        }
        console.log(this.state.errors, "errors");

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
            console.log(this.state.errors);
        }
        if (nextProps.backlog) {
            this.setState({
                id: nextProps.backlog.project_task.id,
                projectSequence: nextProps.backlog.project_task.projectSequence,
                summary: nextProps.backlog.project_task.summary,
                acceptanceCriteria: nextProps.backlog.project_task.acceptanceCriteria,
                status: nextProps.backlog.project_task.status,
                priority: nextProps.backlog.project_task.priority,
                dueDate: nextProps.backlog.project_task.dueDate,
                created_At: nextProps.backlog.project_task.created_At
            })
        }
    }
    render() {
        const id = this.props.match.params.id;
        const project_task_seq = this.props.match.params.ptid;
        const { errors } = this.state;
        let heading;
        if (id && project_task_seq) {
            heading = (
                <h4 className={`${styles.form_header_project} display-4 text-center`}>Update Project Task</h4>
            )
        }
        else {
            heading = (
                <h4 className={`${styles.form_header_project} display-4 text-center`}>Add Project Task</h4>
            )
        }
        return (
            // < !--CREATE / UPDATE PROJECT TASK FORM STARTS HERE-- >
            <div className="add-PBI">
                <div className="container">
                    <div className={styles.backButton}>
                        <Link to={`/projectBoard/${id}`} style={{textDecoration:"none",}} className={`${styles.btn_backbutton} btn btn-block mt-4`}>
                            Back to Project Board
                        </Link>
                    </div>
                    <div className="row">
                        <div className={`${styles.form_container_projectTask} col-md-5 m-auto`}>

                            {heading}

                            <form onSubmit={this.onSubmit}>
                                <div className={`${styles.input_style} form-group`}>
                                    <input type="text" name="summary" placeholder="Project Task summary" value={this.state.summary}
                                        onChange={(e) => { this.setState({ summary: e.target.value }) }}
                                        className={classnames(`${styles.form_control} `, {
                                            "is-invalid": errors.summary
                                        })} />
                                    {errors.summary ?
                                        (<div className="invalid-feedback">
                                            {errors.summary}
                                        </div>)
                                        :
                                        null}
                                </div>
                                <div className={`${styles.input_style} form-group`}>
                                    <textarea className={styles.form_control} placeholder="Acceptance Criteria" name="acceptanceCriteria" value={this.state.acceptanceCriteria}
                                        onChange={(e) => { this.setState({ acceptanceCriteria: e.target.value }) }}></textarea>
                                </div>
                                <h6 style={{ marginTop: "1rem", color: "black" }} >Due Date</h6>
                                <div className={`${styles.input_style} form-group`}>
                                    <input type="date" className={styles.form_control} name="dueDate" value={this.state.dueDate}
                                        onChange={(e) => { this.setState({ dueDate: e.target.value }) }} />
                                </div>
                                <div className={`${styles.input_style} form-group`}>
                                    <select className={styles.form_control} name="priority" value={this.state.priority}
                                        onChange={(e) => { this.setState({ priority: e.target.value }) }}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className={`${styles.input_style} form-group`}>
                                    <select className={styles.form_control} name="status" value={this.state.status}
                                        onChange={(e) => { this.setState({ status: e.target.value }) }}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input
                                    type="submit"
                                    className={`${styles.btn_secondary} btn btn-block mt-4`}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            // <!--CREATE / UPDATE PROJECT TASK FORM ENDS HERE-- >
        )
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    errors: state.errors,
    backlog: state.backlog
});

export default connect(mapStateToProps, { addProjectTask, getProjectTask, updateProjectTask })(AddProjectTask);
