import axios from "axios";
import { CLEAR_ERRORS, DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        console.log(project, "projectobj");
        await axios.post("/api/project", project);
        history.push("/dashboard");
        dispatch({
            type: CLEAR_ERRORS,
            payload: {}
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};


export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    console.log(res);
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        console.log(res);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })
    }
    catch (err) {
        history.push('/404');
    }

}

export const deleteProject = (id, history) => async dispatch => {

    if (window.confirm(
        "Are you sure you want to delete the project and all contents related to it?"
    )){
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        });
    }

}

// export const updateProject=(id,project,history)=>async dispatch=>{
//     const res=await axios.put(`/api/project/${id}`,project);
//     console.log(res,"updateproject");
//     dispatch({
//         type:GET_PROJECT,
//         payload:res.data
//     })
// }