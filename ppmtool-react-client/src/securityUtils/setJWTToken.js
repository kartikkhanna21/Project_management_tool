import axios from "axios";

import React from 'react'

const setJWTToken = (token) => {
    if(token){
        axios.defaults.headers.common["Authorization"]=token;
    }
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setJWTToken;
