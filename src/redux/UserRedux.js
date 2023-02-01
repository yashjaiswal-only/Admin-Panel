import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false 
    },

    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload //store the response
            state.error=false;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logoutSuccess:(state=>{
            state.currentUser=null;
        })
    }//just in redux toolkit 
    
});

export const {loginFailure,loginStart,loginSuccess,logoutSuccess}=userSlice.actions;
export default userSlice.reducer;
//reducer is combination of actions(functions)

