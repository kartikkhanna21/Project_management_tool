import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {deleteProject} from '../../actions/projectActions';
import styles from '../Dashboard.module.css';
import { left, right } from "@popperjs/core";

class ProjectItem extends Component {

    onDeleteClick=(id)=>{
        const {history}=this.props;
        this.props.deleteProject(id,history);
    }
    render() {
        
        const { project } = this.props;
        return (
            
            <div className="container">
                <div className={ `${styles.card} card-body ${styles.bg_light} mb-3`}>
                    <div className={`${styles.custom_row}`}>
                        <div className={`${styles.col_2}`}>
                            <div className={styles.projectIdHeading_align}>
                                <span className={`${styles.table_heading}`}>Project ID</span>
                            </div>
                            <div className={styles.projectIdContent_align}>
                                <span className={`mx-auto ${styles.projectId}`}>{project.projectIdentifier}</span>
                            </div>
                        </div>
                        <div className={`${styles.col_8} col-lg-6 col-md-4`}>
                        <div className={styles.projectDetail_align}>
                                <span className={`${styles.table_heading}`}>Project Details</span>
                            </div>
                            <div className={styles.projectName}>
                                <div style={{float:left}}>
                                    <span className={styles.projectName_text}>Project Name : </span>
                                </div >
                                <div style={{float:right}}>
                                    <span>{project.projectName}</span>
                                </div>
                                
                            </div>
                            <div className={styles.projectDescription}>
                                <div style={{float:left}}>
                                    <span className={styles.projectDesc_text}>Project Description : </span>
                                </div>
                                <div style={{float:right}}>
                                    <span>{project.description}</span>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className={`${styles.board_actions} col-md-4`}>
                            <ul className="list-group">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li style={{textAlign:"center"}} className={ `${styles.list_group_item_projectboard} board`} >
                                        <i className={`${styles.fa_projectBoard} fa-flag-checkered pr-1`}> Project Board </i>
                                    </li>
                                </Link>
                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li style={{textAlign:"center"}} className={ `${styles.list_group_item_updateProjectboard} board`}>
                                        <i className={`${styles.fa_updateProjectBoard} fa-flag-checkered pr-1`}> Update Project Info</i>
                                    </li>
                                </Link>
                                
                                    <li style={{textAlign:"center"}} className="list-group-item delete">
                                        <i className="fa fa-minus-circle pr-1" onClick={this.onDeleteClick.bind(this,project.projectIdentifier)}> Delete Project</i>
                                    </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectItem.propTypes={
    deleteProject:PropTypes.func.isRequired,
}

export default connect(null,{deleteProject})(ProjectItem);