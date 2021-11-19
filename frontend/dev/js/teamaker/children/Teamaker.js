import React, { useEffect } from "react";
import css from "../../../css/css"
import { useSelector, useDispatch } from 'react-redux'
import { createProbabilities, setStatus } from "../../helpers";

const url = "http://localhost:8080/teamaker/members/?format=json"


export default (props=null)=>{

    const dispatch = useDispatch();

    const membersList       = useSelector((state)=>state.members_list)
    const lastTeamakerPk    = useSelector((state)=>state.selected_teamaker_pk)
    const teamakerChange    = useSelector((state)=>state.teamaker_change)
    const selectedTeamaker  = useSelector((state)=>state.selected_teamaker_object)
    var statusChange        = useSelector((state)=>state.status_change) 

    const pickTeamaker = ()=>{
   
        
        //When theres only 1 member, its not possible to pick a teamaker as the same member
        //is not allowed to appear twice in a row. At least 2 members required
        if(membersList.length < 2){

           throw new Error("More than 1 member is required. Add more memebers");
        }


        var probabilities = createProbabilities(membersList);       
        var selectedTeaMakerPk = null;

        //limit the number of loops
        var     counter     = 0;
        const   maxCount    = 10

        //pick as member who was not the last teamaker
        do{

            selectedTeaMakerPk = probabilities[Math.floor(Math.random()*probabilities.length)];
            counter++;

        }while(
            
            (lastTeamakerPk == selectedTeaMakerPk) &&
            counter < maxCount        
        )

    

        //go through the results and find the correspoding member
        var memberDetails = null;
        for(let member of membersList){

            if(member.pk == selectedTeaMakerPk){

                memberDetails = member;
                break;
            }
        }

        return memberDetails;
    };


    useEffect(()=>{

        //when the members list is empty, prompt the user to create a member
        if(membersList.length == 0){

            dispatch({
                type:'select_teamaker', 
                selected_teamaker_object : {first_name:'No', last_name:'Body'},
            })

            dispatch(setStatus("There's nobody to make tea :(  . Add a member to get started.", "warning"))

        }else{


            try{

                var member = pickTeamaker();
                
                dispatch({
                    type:'teamaker_changed', 
                    selected_teamaker_pk: member.pk,
                    selected_teamaker_object : member,
                })


                dispatch(setStatus(`${member.first_name} ${member.last_name} is making tea!!`, 'info'))

            }catch(e){

                dispatch(setStatus(e.message, "error"))
          
            };


        }

    }, [teamakerChange])

    return(


        <div style={css.teamaker} className="d-flex align-items-center justify-content-center" >
            <div className='d-block'>

                <h1 style={css.inherit_width}>And the unlucky winner is ...</h1><br />
                <h2 className="text-warning">{selectedTeamaker.first_name} {selectedTeamaker.last_name}</h2>

            </div>
        </div>

    )


}