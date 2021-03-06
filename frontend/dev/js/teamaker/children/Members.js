import React from "react";
import css from "../../../css/css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { setStatus } from "../../helpers";
import { initialState } from "../../reducer";

const url = "http://localhost:8080/teamaker/members/?format=json"

//Skill level value (int) corresponds to the array indexes of this array
const skillLevels = [null, 'Junior', 'Intermediate', 'Senior']

export default ()=>{

    var memberChange = useSelector((state)=>state.member_change)


    const dispatch  = useDispatch()

    //this list stores html elements
    const [membersList, setMembersList] = useState([]);

    const deleteMember = (pk, e)=>{

        e.preventDefault();
        e.stopPropagation();

        axios.delete(`http://localhost:8080/teamaker/members/${pk}/`)
            .then(res=>{

                dispatch({
                    type:'member_change',
                    member_change : ++memberChange
                })

                dispatch(setStatus("Member has been deleted", "error"))

            })
    }


    const addTeamMember = (e)=>{

        e.preventDefault();
        e.stopPropagation();

        dispatch({
            type:"add_team_member", 
            url : initialState.member_form_url,
        })

    }


    const createDisplayList = (data)=>{

        var arr = [];
        for (let i=0; i<data.length; i++){

            let member = data[i]

            //push list of members into the the arr array
            arr.push(

                <div className="card my-1 py-0" key={i}>
                    <div className="card-body p-2">
                        <h5 className="card-title">{member.first_name} {member.last_name}</h5>
                        <p className="card-text">{skillLevels[member.skill_level]}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 px-2 d-flex justify-content-end">
                        {/* <a href='#' onClick={(e)=>editMember(member.pk) } className='mr-2'>Edit</a> */}
                        <a href="#" onClick={(e)=>{deleteMember(member.pk, e)} }>Delete</a>
                    </div>
                </div>
            )
        }

        return arr;
    }

    //Keep an eye out for when the 'member_change' state has changed
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

                setMembersList( createDisplayList(res.data) );
            })
            .catch(e=>{

                dispatch(setStatus("Error loading members", "error"))                
            })


    }, [memberChange])


    return (

        <div className="d-block" >

            <div className=" d-flex justify-content-between">

                <h5>Team members ({membersList.length})</h5>
                <button onClick={(e)=>{addTeamMember(e)} } className="btn btn-secondary">Add</button>

            </div>

            <div style={css.members_list}>
                {membersList}
            </div>
        </div>

    );

}