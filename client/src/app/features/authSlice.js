{/*
import {createSlice} from '@reduxjs/toolkit'
import { login } from '../../../../server/controller/UserController'
const authSlice = createSlice({
    name :'auth',
    initialState:{
        token:null,
        user:null,
        loading:true
    },
    reducers:{
        login:(state,action)=>{
            state.token = action.payload.token
            state.user = action.payload.user

        },
        logout:(state)=>{
            state.token = ''
            state.user=null
            localStorage.remmoveItem('token')
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        }
    }

})
export const {login,logout,setLoading} = authSlice.actions
export default authSlice.reducer*/}