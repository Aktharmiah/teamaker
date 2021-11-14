import Teamaker from "./teamaker/children/Teamaker";
import Members from "./teamaker/children/Members";
var initialState = {

    //simple counter. This is useful for keeping a track of when new members are added and member list updated
    member_change : 0,

    //Teamaker keeps and eye on this an triggers a selection when this is updated
    teamaker_change : 0,

    status : {type:'info', message:'Welcome to Teamaker v0.1'},

    //stores the location of the form, with or without params
    //set this before changing the component
    member_form_url : "http://localhost:8080/teamaker/forms/member",

    //stores the location of the form, with or without params
    //set this before changing the component
    team_form_url : "http://localhost:8080/teamaker/forms/team",

    //store the pk of the last teamaker
    selected_teamaker_pk  : null,
    selected_teamaker_object : {},


    foo : 'bar',
    component : Teamaker
}


export default (state = initialState, action)=>{

    delete action['type'];

    console.log("in reducer", action);

    return {...state, ...{...action}}
}