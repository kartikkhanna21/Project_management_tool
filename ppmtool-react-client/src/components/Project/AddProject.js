import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject, getProject } from "../../actions/projectActions";
import classnames from "classnames";
import styles from '../UserManagement/Auth.module.css';

class AddProject extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        const { id } = this.props.match.params;
        // this.setState({ id: id });
        if(id){
            this.props.getProject(id, this.props.history);
        }


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.project) {
            const { id } = this.props.match.params;
            if(id){
                this.setState({
                    id:nextProps.project.id,
                    projectName: nextProps.project.projectName,
                    projectIdentifier: nextProps.project.projectIdentifier,
                    description: nextProps.project.description,
                    start_date: nextProps.project.start_date,
                    end_date: nextProps.project.end_date
                })
            }

        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.id){
            console.log("id condn");
            const newProject = {
                id: this.state.id,
                projectName: this.state.projectName,
                projectIdentifier: this.state.projectIdentifier,
                description: this.state.description,
                start_date: this.state.start_date,
                end_date: this.state.end_date
            };
            this.props.createProject(newProject, this.props.history);
        }
        else{
            const newProject = {
                projectName: this.state.projectName,
                projectIdentifier: this.state.projectIdentifier,
                description: this.state.description,
                start_date: this.state.start_date,
                end_date: this.state.end_date
            };
            this.props.createProject(newProject, this.props.history);
        }


    }



    render() {
        const { errors } = this.state;
        const { id } = this.props.match.params;

        const heading = () => {
            if (id) {
                return <h5 className={`${styles.form_header_project} display-4 text-center`}>Update Project</h5>
            }
            else {
                return <h5 className={`${styles.form_header_project} display-4 text-center`}>Create Project</h5>
            }
        }



        return (

            <div>
                {
                    //check name attribute input fields
                    //create constructor
                    //set state
                    //set value on input fields
                    //create onChange function
                    //set onChange on each input field
                    //bind on constructor
                    //check state change in the react extension
                }

                <div className="project">
                    <div className="container">
                        <div className={`${styles.row}`}>
                            <div className={`${styles.form_container_projectTask} col-md-5`}>
                                {
                                    heading()
                                }
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className={`${styles.input_style} form-group`}>
                                        <input
                                            type="text"
                                            className={classnames(`${styles.form_control} `, {
                                                "is-invalid": errors.projectName
                                            })}
                                            placeholder="Project Name"
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectName ?
                                            (<div className="invalid-feedback">
                                                {errors.projectName}
                                            </div>)
                                            :
                                            null}

                                    </div>
                                    <div className={`${styles.input_style} form-group`}>
                                        {this.state.id?
                                            (
                                                <input
                                                type="text"
                                                className={classnames(`${styles.form_control} `, {
                                                    "is-invalid": errors.projectIdentifier
                                                })}
                                                placeholder="Unique Project ID"
                                                name="projectIdentifier"
                                                value={this.state.projectIdentifier}
                                                disabled
                                            />
                                            )
                                            :
                                            (
                                                <input
                                                type="text"
                                                className={classnames(`${styles.form_control} `, {
                                                    "is-invalid": errors.projectIdentifier
                                                })}
                                                placeholder="Unique Project ID"
                                                name="projectIdentifier"
                                                value={this.state.projectIdentifier}
                                                onChange={this.onChange}
                                            />
                                            )
                                        }

                                        {errors.projectIdentifier ?
                                            (<div className="invalid-feedback">
                                                {errors.projectIdentifier}
                                            </div>)
                                            :
                                            null}
                                    </div>
                                    <div className={`${styles.input_style} form-group`}>
                                        <textarea
                                            className={classnames(`${styles.form_control} `, {
                                                "is-invalid": errors.description
                                            })}
                                            placeholder="Project Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        />
                                        {errors.description ?
                                            (<div className="invalid-feedback">
                                                {errors.description}
                                            </div>)
                                            :
                                            null}
                                    </div>
                                    <div style={{marginTop:"1rem",color:"black"}}>
                                        <p style={{color:"black"}}>Start Date</p>
                                    </div>
                                    
                                    <div className={`${styles.input_style} form-group`}>
                                        <input
                                            type="date"
                                            className={`${styles.form_control}`}
                                            name="start_date"
                                            value={this.state.start_date}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div style={{marginTop:"1rem",color:"black"}}>
                                        <p style={{color:"black"}}>Estimated End Date</p>
                                    </div>
                                    
                                    <div className={`${styles.input_style} form-group`}>
                                        <input
                                            type="date"
                                            className={`${styles.form_control}`}
                                            name="end_date"
                                            value={this.state.end_date}
                                            onChange={this.onChange}
                                        />
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
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    project: state.project.project
});

export default connect(
    mapStateToProps,
    { createProject, getProject }
)(AddProject);