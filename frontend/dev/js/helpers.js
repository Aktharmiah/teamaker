import axios from "axios";
import React from "react";

const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;

export const getFormUriError = new URIError("No url has been supplied")


const messageTypeArray = ['info' , 'success', 'warning' , 'error' , 'danger'];



/**
 * 
 * This function fetches a form, described in the formUrl and creates a React element out of it
 * so that the code can be injected directly into JSX
 * 
 * @param {String} formUrl: The URL the form can be found at
 * @return {ReactElement} : A react element
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

          //     console.log("Selected found", node);

             
              
              
          //     delete node.attribs['selected']
          //     node.children[0].data = 'ddd'
          //     console.log('modified node', node);

          //     return React.createElement(node.name, node.attribs);
          //   }

          // },
          {

            // Anything else
            shouldProcessNode: (node)=>{
              return true;
            },
            processNode: processNodeDefinitions.processDefaultNode

          },
        ];

        //<option value="1" selected> -- the selected causes a problem for React
        //the '/g' replaces all
        var strHTMLForm = res.data.replace(/selected>/g, '>');

        //rename 'class' to 'classname' -- the parser will cammel case it automatically 
        strHTMLForm = strHTMLForm.replace(/class/g, 'classname');


        const htmlToReactParser = new HtmlToReactParser();
        const reactComponent = htmlToReactParser.parseWithInstructions(strHTMLForm, isValidNode, processingInstructions);
        
        
        // const reactHtml = ReactDOMServer.renderToStaticMarkup(reactComponent);
        // console.log("getReactForm", reactHtml);
        
        resolve(reactComponent)

      })
      .catch(e=>reject(e) )

  });
}


export function setComponenet(componentName){

  return {type:'set_componenet', component: componentName, component_change: Date.now()}
}


/**
 * Quickly dispatch a status change without creating the JSON object manually.
 * Type defaults to 'info' if not supplied
 * 
 * Usage : dispatch(setState("New status message"))
 * 
 * 
 * @param {String} message  - The message
 * @param {String} type - [info | warning | error | danger]
 * @returns 
 */
export function setStatus(message, type='info'){

  //lowercase type
  if(type instanceof String){
    type = type.toLowerCase()
  }

  //if the message is not a string, force it to be a blank string
  if (typeof(message) != 'string'){

    message = '';
  }

  //if the message is not a string, or its a valid type, force it to be a string 'info'
  if (typeof(type) != 'string'){

    type = 'info';
  }

  //if an invalid message type has been given, default to 'info'
  if(messageTypeArray.indexOf(type) == -1){

    type = 'info';
  }

  const status = {

    type:type,
    message : message

  }


  //check that the type is in
  return {type:'set_status', status:status, status_change:Date.now()}
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

  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(e.target);

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
