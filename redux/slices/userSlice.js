//this file will contain all the user related state management logic

import { createSlice } from "@reduxjs/toolkit";

const initilalState = {
    currentUser : null,
  
};

const userSlice = createSlice({
    name : "user",
    initialState : initilalState,
    reducers : {
        loginSuccessful : (state, action) => {
            state.currentUser = action.payload;
            
        }
    }
})

export const {loginSuccessful} = userSlice.actions;
export default userSlice.reducer;