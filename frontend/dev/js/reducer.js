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

    //view switcher watches this
    component_change : 0,
    component : Teamaker
}

export default (state = initialState, action)=>{


    // Check if a attribute passed into `action` is `url`
    if(typeof(action.url) !== 'undefined'){

        let timeStamp = Date.now();

        //add the timestamp as a hash. This will make the url appear different to React and 
        //cause a re-render
        action.url += `#${timeStamp}`
    }

    delete action['type'];
    return {...state, ...{...action}}
}
