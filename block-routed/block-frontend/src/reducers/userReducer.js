import { createSlice } from "@reduxjs/toolkit";
import UserSelector from '../services/users'


const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers:{
        setUsers(state, action){
            return action.payload
        },
        getUser(state, action){
            return action.payload
        }
    
    }
})

export const { setUsers, getUser } = userSlice.actions

const setAllusers = () => {
    return async dispatch => {
        const users = await UserSelector.getUsers()
        dispatch(setUsers(users))
    }
}

const getParticularUser = (id) =>{
    return async dispatch => {
        const user = await UserSelector.getUser(id)
        dispatch(getUser(user))
    }
}

export { setAllusers, getParticularUser }
export default userSlice.reducer