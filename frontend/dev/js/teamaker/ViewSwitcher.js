/**
 * 
 * This component renders a given component without reloading the page
 * 
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getReactForm, submitForm, setStatus } from '../helpers';
import { initialState } from '../reducer';

//store some form paths so that we can know which form was used and act accordingly
const memberForm = '/teamaker/members'


export default (props)=>{

    const dispatch = useDispatch()

    const [component, setComponent] = useState(null)

    var componentName   =  useSelector(state=>state.component)
    var componentChange =  useSelector(state=>state.component_change)
    var url             =  useSelector(state=>state.url)
   

    //Becuase we are loading the form dynamically from HTML string we need to 
    //use jquery to intercept it at sumbission so that the user is not redirected away from SPA
    $('body').on('submit', 'form', (e)=>{

        //Prevent propagation and default behaviour to stop multiple requests
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      
        //submit the form with the event
        submitForm(e)
            .then(res=>{

                //processing for member forms
                if(e.target.action.indexOf(memberForm) !== -1){

                    //Trigger an update of the members list
                    dispatch({
                        type:'member_change', 
                        member_change: Date.now(),
                    })

                    //reset the form
                    dispatch({type:'form_reset', url: initialState.member_form_url})


                    dispatch(setStatus(res.statusText, 'success'))
                }

            })
            .catch(e=>{

                // Get all the response error messages and reduce them to a single message
                const errorArray    = e.response.data.email.flat()
                const reducer       = (previousValue, currentValue) => previousValue +'. '+ currentValue;
                var errorText       = errorArray.reduce(reducer);
                
                dispatch(setStatus(errorText, 'danger'))
               
            })
            .catch(e=>{

                dispatch(setStatus("Whoops!! something went wrong. Actual error message can't be processed", 'danger'))

            })

    })    


    //respond to changes to the coponent name
    useEffect(() => {    
       
        //Create a JSX element dynamically and set the component value to it
        let elem = React.createElement(componentName)

        setComponent( elem );

        //clear the form on unload so that a fresh one may be shown
        return ()=>setComponent(null)

    }, [componentChange]);

    //respond to changes in the url

    useEffect(()=>{

        //if the component is already set by the previous effect then return
        if(url){

            //fetch the form from the server and set 
            getReactForm(url).then(reactForm=>setComponent( reactForm ));

            //clear the form on unload so that a fresh one may be shown
            return ()=>setComponent(null)

        }

    }, [url])



    return (<>{component}</>);

}