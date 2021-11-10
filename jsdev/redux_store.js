import { configureStore } from '@reduxjs/toolkit'

var initialState = {

    foo : 'bar'
}


export default configureStore({
  
    
  reducer: (state = initialState, action)=>{

    console.log("this is the default reducer", state, action);


    return {...state, foo:'baz'}

  },




})