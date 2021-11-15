import Teamaker from "./teamaker/children/Teamaker";

export var initialState = {

    //Members component watches this as a trigger for update
    member_change : 0,

    //Teamaker component watches this as a trigger for update
    teamaker_change : 0,

    status_change : 0,

    status : {type:'info', message:'Welcome to Teamaker v0.1'},

    //stores the location of the form, with or without params
    //set this before changing the component
    member_form_url : "http://localhost:8080/teamaker/forms/member",

    //store the pk of the last teamaker
    selected_teamaker_pk  : null,
    selected_teamaker_object : {},


    //stores the members list as an array
    members_list : [],


    foo : 'bar',
    component : Teamaker
}


export default (state = initialState, action)=>{

    delete action['type'];
    return {...state, ...{...action}}
}