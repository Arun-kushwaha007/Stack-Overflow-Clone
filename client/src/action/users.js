import * as api from "../api";

export const fetchallusers = () => async (dispatch) => {
    try {
        const { data } = await api.getallusers();
        dispatch({ type: 'FETCH_USERS', payload: data });
    } catch (error) {
        console.error('Fetch all users Error:', error.message);
        console.log(error);
    }
};

export const updatedprofile = (id, updatedata) => async (dispatch) => {
    try {
        const { data } = await api.updateprofile(id, updatedata);
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data });
    } catch (error) {
        console.error('Update profile Error:', error.message);
        console.log(error);
    }
};
