import React from "react";
import ViewSwitcher from "./children/ViewSwitcher";

import { useSelector, useDispatch } from 'react-redux'
import css from "../css"


import Teamaker from "./children/Teamaker";
import Members from "./children/Members";
import AddTeamMember from "./children/AddTeamMember";
import AddTeam from "./children/AddTeam";

export default (props=null)=>{

    const dispatch = useDispatch();

    var component = useSelector((state=>{state.component}));
    

    return(


        <div className="border my-3 container p-2 shadow" style={css.container}>
            

            <div className="d-flex justify-content-between">

                

                <div className="d-block" style={css.inherit_width}>
                    
                    <div className="d-inline-flex justify-content-between" style={css.inherit_width}>
                        <button onClick={(e)=>dispatch({type:"setComponent", component:Teamaker}) } className="btn btn-warning">Select tea maker</button>
                        <button onClick={(e)=>dispatch({type:"setComponent", component:AddTeam}) } className="btn btn-secondary">Create new team</button>
                        <button onClick={(e)=>dispatch({type:"setComponent", component:AddTeamMember}) } className="btn btn-secondary">Add team member</button>
                    </div>
                    <hr />                    
                    
                    <ViewSwitcher />
                
                </div>
                
                <div className="col-3">
                    <Members />
                </div>
                

            </div>

        </div>

    )


}