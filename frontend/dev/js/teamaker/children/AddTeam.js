import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import {getForm} from '../../helpers'

const $ = require('jquery')
const url = "http://localhost:8080/teamaker/forms/team";
const HtmlToReactParser = require('html-to-react').Parser;

export default (props=null)=>{

    const dispatch = useDispatch()
    const [form, setForm] = useState(null)

    var memberAdded = useSelector((state)=>state.member_change)
    var url = useSelector((state)=>state.team_form_url)

    //ensure this is only done once otherwise we'll have an inifinate loop
    if(!form){
        
        //fetch the form from the server
        getForm(url)
        .then(res=>{

            // parse the string form into a react element
            const htmlToReactParser = new HtmlToReactParser();
            const reactElement = htmlToReactParser.parse(res);

            //set the memberForm state to the react element just created
            setForm(reactElement)
        })

    }

 
    return( <>{form}</> );

}