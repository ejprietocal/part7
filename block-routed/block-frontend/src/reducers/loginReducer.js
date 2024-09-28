import { createSlice, current  } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import UserSelector from '../services/users'


const credentials = JSON.parse(window.localStorage.getItem('loggeBlogAppUser'))

let initialState = {
    name: null,
    user: null,
    token: null,
    id: null
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        login(state, action){
            state.name = action.payload.name
            state.user = action.payload.username,
            state.token = action.payload.token,
            state.id = action.payload.id
        },
        logout(state, action){
            state.name = null,
            state.user = null,
            state.token = null,
            state.id = null

        }
    }
})

export const { login , logout} = loginSlice.actions

const setLogin = (arrayWithCredentials) => {
    return async dispatch => {
        dispatch(login(arrayWithCredentials))
    }
}

const eraseLogin = () => {
    return async dispatch => {  
       dispatch(logout()) 
       window.localStorage.removeItem('loggeBlogAppUser')
    }
}

export {setLogin , eraseLogin }
export default loginSlice.reducer

