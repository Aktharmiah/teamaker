import React from "react";
import ViewSwitcher from "./children/ViewSwitcher";

import { useSelector, useDispatch } from 'react-redux'
import css from "../css"


import Teamaker from "./children/Teamaker";
import Members from "./children/Members";
import AddTeamMember from "./children/AddTeamMember";
import AddTeam from "./children/AddTeam";
import Status from "./children/Status";

export default (props=null)=>{

    const dispatch = useDispatch();
    
    var teamakerChange = useSelector(state=>state.teamaker_change);
    var status = useSelector(state=>state.status);

    const selectTeamaker = (e)=>{

        dispatch({
            type:"select_teamaker",            
            teamaker_change : ++teamakerChange,
            component : Teamaker
        })
    }


    return(
        <>
        <div className="my-3 container p-2 shadow" >
            
            <div className="d-flex justify-content-between">           

                <div className="d-block" style={css.inherit_width}>
                    
                    <div className="d-inline-flex justify-content-start" style={css.inherit_width}>
                        <button onClick={(e)=>selectTeamaker(e) } className="btn btn-warning">Select tea maker</button>
                    </div>
                    <hr />                    
                    
                    <ViewSwitcher />
                
                </div>
                
                <div className="col-3">
                    <Members />
                </div>
            </div>
        </div>
        <Status />
        </>

    )


}