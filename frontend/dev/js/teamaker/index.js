import React, {useEffect} from "react";
import ViewSwitcher from "./children/ViewSwitcher";

import { useSelector, useDispatch } from 'react-redux'
import css from "../css"

import Members from "./children/Members";
import Teamaker from "./children/Teamaker";
import Status from "./children/Status";
import axios from "axios";


const url = "http://localhost:8080/teamaker/members/?format=json"

export default (props=null)=>{

    const dispatch = useDispatch();
    
    var teamakerChange = useSelector(state=>state.teamaker_change);

    //Load the memebers on first load
    useEffect(()=>{

        //fetch the members list from the server
        axios.get(url)
            .then(res=>{

                //save the members list so that it can be accessed by other 
                //componenets without fetching from the server
                dispatch({
                    type:'set_members_list', 
                    members_list: res.data,
                })
            })
            .catch(e=>{

                dispatch({
                    type:'members_load_error', 
                    status: {
                        type:'error',
                        message:'Error loading member'
                    },
                    status_change: ++statusChange
                })                
            })

    })

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

                <div style={css.inherit_width}>
                    
                    <div className="d-inline-flex justify-content-start" style={css.inherit_width}>
                        <button onClick={(e)=>selectTeamaker(e) } className="btn btn-warning">Select tea maker</button>
                    </div>
                    <hr />                    
                    
                    <ViewSwitcher />
                
                </div>
                
                <div className="col-4 ">
                    <Members />
                </div>
            </div>
        </div>

        
        <Status />
        </>

    )


}