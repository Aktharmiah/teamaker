import React, { useEffect } from "react";
import css from "../../css"
import { useSelector, useDispatch } from 'react-redux'
import { createProbabilities } from "../../helpers";
import axios from "axios";



const url = "http://localhost:8080/teamaker/members/?format=json"


export default (props=null)=>{

    const dispatch = useDispatch();

    const lastTeamakerPk = useSelector((state)=>state.selected_teamaker_pk)
    const teamakerChange = useSelector((state)=>state.teamaker_change)
    const selectedTeamaker = useSelector((state)=>state.selected_teamaker_object)

    const pickTeamaker = ()=>{

        return new Promise((resolve, reject)=>{

            axios.get(url)
            .then(res=>{
    
                var probabilities = createProbabilities(res.data);
                console.log("probabilities are ", probabilities);
                
                var selectedTeaMakerPk = null;
    
                //pick as member who was not the last teamaker
                do{
    
                    selectedTeaMakerPk = probabilities[Math.floor(Math.random()*probabilities.length)];
    
                }while(lastTeamakerPk == selectedTeaMakerPk)
    
            
    
                //go through the results and find the correspoding member
    
                var memberDetails = null;
                for(let member of res.data){
    
                    if(member.pk == selectedTeaMakerPk){
    
                        memberDetails = member;
                        break;
                    }
                }
    
                resolve(memberDetails);

                console.log("and the winner is ", memberDetails);
    
            })
            .catch(e=>{
    
                reject("Error picking teamaker")
            })

        })




    };


    useEffect(()=>{

        pickTeamaker()
            .then(member=>{

                dispatch({
                    type:'teamaker_chaged', 
                    selected_teamaker_pk: member.pk,
                    selected_teamaker_object : member,
                })
            })


    }, [teamakerChange])

    return(


        <div style={css.inherit}>
            
            <h1 style={css.vCentered}>And the unlucky winner is ... {selectedTeamaker.first_name} {selectedTeamaker.last_name}</h1>
        </div>

    )


}