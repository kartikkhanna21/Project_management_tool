import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser=(newUser,history)=>async dispatch=>{
    try{
        await axios.post("/api/users/register",newUser);
        history.push('/login');
        dispatch({
            type:CLEAR_ERRORS,
            payload:{}
        });
    }
    catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        });
    }
}

export const login=loginRequest=>async dispatch=>{
    try{
        //post -> login request
        const res=await axios.post("/api/users/login",loginRequest);
        //extract token form res.data
        const {token}=res.data;
        //store the token in localStorage
        localStorage.setItem("jwtToken",token);
        //set our token in header***
        setJWTToken(token);
        //decode the token on react
        const decoded=jwt_decode(token);
        //dispatch to our securityreducer
        dispatch({
            type:SET_CURRENT_USER,
            payload:decoded
        })
    }
    catch(err){
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
}