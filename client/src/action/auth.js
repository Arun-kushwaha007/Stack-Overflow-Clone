import * as api from '../api'

export const signup = (authdata, navigate) => async(dispatch)=>{
    try{
        const {data} = await api.signup(authdata);
        dispatch({type: 'AUTH', data});
        navigate('/');
    } catch (error){
        console.log(error);
    }
}

export const login = (authdata, navigate) => async(dispatch)=>{
    try{
        const {data} = await api.login(authdata);
        dispatch({type: 'AUTH', data});
        navigate('/');
    } catch (error){
        console.log(error);
    }
}