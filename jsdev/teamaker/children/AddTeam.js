import React, { useState } from "react";
import css from "../../css"
import { useSelector, useDispatch } from 'react-redux'
import { getPage } from "../../helpers";

const parser = new DOMParser();


export default (props=null)=>{

    const [form, setForm] = useState('');


    // getPage('/teamaker/forms/team')
    // .then(res=>{


    //     res = res.replaceAll('class', 'className');

    //     console.log('corrected', res);

    //     let parsedHtml = parser.parseFromString(res, "text/html");

    //     setForm(eval(parsedHtml))
    // })


    return(


        <div style={css.inherit}>
            
            { form }

        </div>

    )


}