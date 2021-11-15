import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import css from '../../css'

export default (props=null)=>{
    
    var pStatus         = useSelector((state)=>state.status)
    var statusChange    = useSelector((state)=>state.status_change) 
    
    
    const [status, setStatus] = useState(pStatus.message)

    useEffect(()=>{

        setStatus(pStatus.message)

        //clear the form on unload so that a fresh one may be shown
        return ()=>setStatus(null)

    }, [statusChange])
 
    return( <div style={css.status}>{status}</div> );
}