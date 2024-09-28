import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: '',
    border: 'none',
    borderWidth: 0
}

const notificationSlide = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        createNotication(state, action){
            state.content = action.payload;
            state.border = 'solid';
            state.borderWidth = 1;
        },
        clearNotification(state, action){
            state.content = '';
            state.border = 'none';
            state.borderWidth = 0;
        }
    }
})


export const setNotification = content =>{
    return async dispatch =>{
        dispatch(createNotication(content))
        setTimeout(()=>{
            dispatch(clearNotification())
        },5000)
    }
}

export const {createNotication, clearNotification} = notificationSlide.actions
export default notificationSlide.reducer