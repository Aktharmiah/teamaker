import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { submitForm, getReactForm} from '../../helpers'

const $ = require('jquery')

export default (props=null)=>{
    
    const dispatch          = useDispatch() 
    const[form, setForm]    = useState(null)

    var statusChange        = useSelector((state)=>state.status_change) 
    var memberAdded         = useSelector((state)=>state.member_change)
    var url                 = useSelector((state)=>state.member_form_url)

    //Becuase we are loading the form dynamically from HTML string we need to 
    //use jquery to intercept it at sumbission so that the user is not redirected away from SPA
    $('body').on('submit', 'form', (e)=>{

        //stop the default (redirect) behaviour of forms on submission
        e.preventDefault();
        
        submitForm(e, 'post')
            .then(res=>{
    
                //we want to increse the 'member_change' state by 1. This update should be picked up 
                //and actioned by the Members component
                dispatch({
                    type:'member_change', 
                    member_change: ++memberAdded,
                    status_change : ++statusChange,
                    status : {type:'success', message: res.statusText}
                })
    
            })
            .catch(e=>{

                //dispatch state so that the Status component can action it
                dispatch({type:'status_changed', status: {type:'error', message:e.statusText} })

            })
    })

    useEffect(()=>{

        //fetch the form from the server and set 
        getReactForm(url).then(reactForm=>setForm( reactForm ));

        //clear the form on unload so that a fresh one may be shown
        return ()=>setForm(null)

    }, [url])


 
    return( <>{form}</> );

}