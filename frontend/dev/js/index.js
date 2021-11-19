/**
 * This file is the entrypoint into the app * 
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer'
import App from './teamaker/index'

const store = createStore(rootReducer)

export default store

window.addEventListener('load', init)

/**
 * Function loads when window load
 * @param {*} e 
 */
function init(e){

    var rootElement = document.getElementById('main_container');

    ReactDOM.render(
        <Provider store={store}><App /></Provider>, rootElement
    )
}


