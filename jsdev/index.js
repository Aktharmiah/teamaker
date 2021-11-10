import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import initialStates from './redux_store'
import Teamaker from './teamaker/components/Teamaker.js'

window.addEventListener('load', init)

/**
 * Function loads when window load
 * @param {*} e 
 */
function init(e){

    var rootElement = document.getElementById('main_container');


    ReactDOM.render(
        <Provider store={initialStates}>
            <Teamaker />
        </Provider>, rootElement
    )
}


