import axios from "axios"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";
import { Api, API_BASE_URL } from "../../config/api";


 export const loginUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/user/login`,loginData.data);
        if(data){
            localStorage.setItem("jwt",data.token);
            
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.token})
    }catch(error){
        dispatch({type:LOGIN_FAILURE,payload:error})

    }
}


export const registerUserAction=(registerData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/user/register`,registerData.data);
        dispatch({type:LOGIN_SUCCESS,payload:data.token})
    }catch(error){
        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}

export const GetUserProfile=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_PROFILE_REQUEST})

    try{
        const {data} = await axios.get(
            `${API_BASE_URL}/user/getUser`,
            {
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            }
        );
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:GET_PROFILE_FAILURE,payload:error})
    }
}

export const UpdateUserProfile=(reqData)=>async(dispatch)=>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try{
        const {data} = await Api.post(`${API_BASE_URL}/user/updateUser`,reqData)
        
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAILURE,payload:error})
    }
}