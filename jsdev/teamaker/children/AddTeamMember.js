import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import {getForm, submitForm, getReactForm} from '../../helpers'

const $ = require('jquery')
const HtmlToReactParser = require('html-to-react').Parser;

export default (props=null)=>{


    


    const dispatch = useDispatch()
    // const [memberForm, setMemberForm] = useState(null)

    var memberAdded = useSelector((state)=>state.member_change)
    var url = useSelector((state)=>state.member_form_url)
    var memberForm = useSelector((state)=>state.member_form)
    
    getReactForm(url);

    var memberAdded = useSelector((state)=>state.member_form_url)

    //Becuase we are loading the form dynamically from HTML string we need to 
    //use jquery to intercept it at sumbission to that the user is not redirected
    $('body').on('submit', 'form', (e)=>{

        e.preventDefault();
        
        submitForm(e)
        .then(res=>{

            console.log("response", res)
  
            //we want to increse the 'member_change' state by 1. This update should be picked up 
            //and actioned by the Members component
            dispatch({type:'member_change', member_change: ++memberAdded})
  
        })
        .catch(e=>{

            dispatch({type:'status_changed', status: {type:'error', message:e.statusText} })

        })
    })

    useEffect(()=>{

        //fetch the form from the server
        getForm(url)
        .then(res=>{

            // parse the string form into a react element
            const htmlToReactParser = new HtmlToReactParser();
            const reactElement = htmlToReactParser.parse(res);

            dispatch({type:'set_member_form', member_form:reactElement})
        })

    }, [url])


 
    return( <>{memberForm}</> );

}