import axios from "axios";
import tojsx from "./tojsx";

import React from "react";

const ReactDOMServer = require('react-dom/server');
const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;



export const getFormUriError = new URIError("No url has been supplied")


function fetchMessages(e=null){

fetch('/api/messages/')
.then(res=>{ return res.json() })
.then(res=>{  
  for (let envelope of res.messages){
    
        console.log("message envelope", envelope);
        postMessage(envelope.message, envelope.type);
    }

  })
}
  

/**
 * 
 * This function 
 * 
 */
export function getReactForm(formUrl = null){

  return new Promise((resolve, reject)=>{

    if(!formUrl){

      reject(getFormUriError)
    } 

    var config = {

      timeout : 10000, //10 secs
      baseURL:'',//ensure axios isn't adding anything to the URL
    }

    const isValidNode = function () {
      return true;
    };
    
  
    axios.get(formUrl, config)
      .then(res=>{

        // Order matters. Instructions are processed in the order they're defined
        const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
        const processingInstructions = [
          {

            // Custom <input> processing.
            shouldProcessNode: (node)=>{

              return (node.type === 'tag' && node.name === 'input') &&
                typeof(node.attribs.value) !='undefined';
            },
            processNode: (node, children)=>{

              //We want to rename all input tags value attribute to 'defaultValue' so that its editable
              node.attribs['defaultValue'] = node.attribs.value
              delete node.attribs['value']

              return React.createElement(node.name, node.attribs);
            }

          },
          // {

          //   // Find instances such as <option value="1" selected="">
          //   shouldProcessNode: (node)=>{

          //     return (node.type === 'tag' && node.name === 'option') &&
          //       typeof(node.attribs.selected) !='undefined';
          //   },
          //   processNode: (node, children)=>{

          //     //replace with <option defaultValue="...">
          //     node.attribs['defaultValue'] = node.attribs.value
              
          //     delete node.attribs['selected']

          //     return React.createElement(node.name, node.attribs);
          //   }

          // },
          // {
          //   // class should be renamed to className
          //   shouldProcessNode: (node)=>{

          //     return typeof(node.attribs) !== 'undefined' && 
          //       typeof(node.attribs.class) !=='undefined';
          //   },
          //   processNode: (node, children)=>{
          //     console.log('filtering class', node);
          //     //replace with <option defaultValue="...">
          //     node.attribs['className'] = node.attribs.class
          //     delete node.attribs['class']

          //     return React.createElement(node.name, node.attribs);
          //   }

          // },
          {

            // class should be renamed to className
            shouldProcessNode: (node)=>{

              return (node.type === 'tag' && node.name === 'input') &&
                typeof(node.attribs.maxlength) !='undefined';
            },
            processNode: (node, children)=>{

              //replace with <option defaultValue="...">
              node.attribs['maxLength'] = node.attribs.maxlength
              delete node.attribs['maxlength']

              return React.createElement(node.name, node.attribs);
            }

          },
          {

            // Anything else
            shouldProcessNode: (node)=>{
              return true;
            },
            processNode: processNodeDefinitions.processDefaultNode

          },
        ];

        const htmlToReactParser = new HtmlToReactParser();
        const reactComponent = htmlToReactParser.parseWithInstructions(res.data, isValidNode, processingInstructions);
        
        
        // const reactHtml = ReactDOMServer.renderToStaticMarkup(reactComponent);
        // console.log("getReactForm", reactHtml);
        
        resolve(reactComponent)

      })
      .catch(e=>reject(e) )

  });



}





/**
 * This function will fetch the form at the given formUrl as an ordinary HTML form. 
 * It will then format the form to JSX string
 * @param {*} formUrl 
 * @returns Promise
 */
export function getForm(formUrl = null){

  return new Promise((resolve, reject)=>{

    if(!formUrl){

      reject(getFormUriError)
    } 

    var config = {

      timeout : 10000, //10 secs
      baseURL:'',//ensure axios isn't adding anything to the URL
    }

  
    axios.get(formUrl, config)
      .then(res=>{

        let jsxString  = tojsx(res.data)
        
        //React will render a read-only form when an onChange or defaultValue has not be provided to input fields
        //So we convert the 'value' attributes to 'defaultValue'
        jsxString = jsxString.replaceAll('value=', 'defaultValue='); 

        resolve(jsxString)

      })
      .catch(e=>reject(e) )

  });

};


/**
 * Submits the form as defined in the e.target
 * @param {Event} e
 * @returns {Promise} promise
 */
export function submitForm(e, method = 'post'){


  const formData = new FormData(e.target);
  console.log("Form submitted", );

  const config = {

      method:method,
      data:formData
  }

  //send the form data off to the api
  return axios(e.target.action, config)

}


/**
 * Function creates an array of user IDs based on their senior
 * expects an array of the format : [{pk:int, skill_level:int, ....}, ....]
 * @param {*} members 
*/
export function createProbabilities(members = []){

  //ensure a valid, non-empty array is supplied
  if( (members instanceof  Array) == false ||
      (members instanceof Array && members.length == 0)){

        throw RangeError("Expecting a non empty array input")
      }

      // const skillLevels = [null, 'Junior', 'Intermediate', 'Senior']
      /**
       * Ratios =  senior : senior|intermediate|junior
       * ie,  1 : senior|intermediate|junior 
       * 
       * skill level 1 = 1:3 
       * skill level 2 = 1:2
       * skill level 3 = 1:1
       * 
       * In other words, skill level and chances array are inverted
       * 
       * skillLevels = [null, 'Junior', 'Intermediate', 'Senior']
       * 
       */
      const chancesMultiplyer = [null, 3, 2, 1]

      var probabilityArray = []

      for(let member of members){

        //Ensure memer is an object and it has 'pk' and 'skill_level
        if( (member instanceof Object) == false ||
            (member instanceof Object && typeof(member.pk) == 'undefined') ||
            (member instanceof Object && typeof(member.skill_level) == 'undefined')){

              throw Error("Invalid data stucture")
            }

        let multiplyer = chancesMultiplyer[member.skill_level];
        let tempArray = [];

        //create a temp array and fill with members pk according their chances multiplyer
        for(let i=0; i<multiplyer; i++){

          tempArray.push(member.pk);
        }

        //merge the two arrays
        probabilityArray = [...probabilityArray, ...tempArray]

      }

      return probabilityArray;
}
