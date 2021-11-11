/**
 * 
 * This component renders a given component without reloading the page
 * 
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default (props)=>{

    const [component, setComponent] = useState()
    var componentName    =  useSelector(state=>state.component)

    
    useEffect(() => {    
        
        //Create a JSX element dynamically and set the component value to it
        let elem = React.createElement(componentName)

        setComponent( elem );

    }, [componentName]);

    return (<>{component}</>);

}