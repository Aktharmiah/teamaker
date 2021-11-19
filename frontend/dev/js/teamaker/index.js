import React, {useEffect} from "react";
import ViewSwitcher from "./ViewSwitcher";

import { useSelector, useDispatch } from 'react-redux'
import css from "../../css/css"

import Members from "./children/Members";
import Teamaker from "./children/Teamaker";
import Status from "./Status";
import axios from "axios";
import { setComponenet, setStatus } from "../helpers";


const url = "http://localhost:8080/teamaker/members/?format=json"

export default (props=null)=>{

    const dispatch = useDispatch();
    
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
                
                dispatch(setStatus('Error loading member', 'error'))
            })

    })

    const selectTeamaker = (e)=>{

        dispatch(setComponenet(Teamaker))

        dispatch({
            type:"select_teamaker",            
            teamaker_change : Date.now(),
        })

        dispatch(setComponenet(Teamaker))
    }


    return(
        <>
        <div className="container shadow p-2" style={{height:"90vh"}} >
            
            <div className="d-flex justify-content-between">           

                <div className='container col-8'>
                    
                    <div className="d-inline-flex justify-content-start" style={css.inherit_width}>
                        <button onClick={(e)=>selectTeamaker(e) } className="btn btn-warning">Select tea maker</button>
                    </div>
                    <hr />                    
                    
                    <ViewSwitcher />
                
                </div>
                
                <div className="container col-4" style={{height:"90vh"}}>
                    <Members />
                </div>
            </div>
        </div>

        
        <Status />
        </>

    )


}