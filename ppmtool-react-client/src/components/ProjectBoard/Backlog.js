import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask';

class Backlog extends Component {
    render() {
        const {project_tasks_prop}=this.props;
        const {id}=this.props;
        console.log(id,"render id backlog");

        const tasks=project_tasks_prop.map(project_task=>(
            <ProjectTask key={project_task.id} project_task={project_task} project_identifier={id}/>
        ))

        let todoItems=[];
        let inProgressItems=[];
        let doneItems=[];

        for(let i=0;i<tasks.length;i++){
            // console.log(tasks[i]);
            if(tasks[i].props.project_task.status=="TO_DO"){
                todoItems.push(tasks[i]);
            }
            if(tasks[i].props.project_task.status=="IN_PROGRESS"){
                inProgressItems.push(tasks[i]);
            }
            if(tasks[i].props.project_task.status=="DONE"){
                doneItems.push(tasks[i]);
            }

        }

        
        return (
            <div>
                {/* <!-- Backlog STARTS HERE --> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                                {todoItems}
                            


                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-primary text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->

                                <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                                {inProgressItems}
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->

                                <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                            {doneItems}
                        </div>
                    </div>
                </div>

                {/* <!-- Backlog ENDS HERE --> */}
            </div>
        )
    }
}

export default Backlog;
