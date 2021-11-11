import Teamaker from "./teamaker/children/Teamaker";
import Members from "./teamaker/children/Members";
var initialState = {

    foo : 'bar',
    component : Teamaker
}


export default (state = initialState, action)=>{

    delete action['type'];

    console.log("in reducer", action);

    return {...state, ...{...action}}
}