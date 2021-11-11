/**
 * A fetch function that also triggers a custom 'fetch' event
 * 
 * JS does not support a 'fetch' event listener, which we need to trigger a message fetch from the server.
 * This function wraps a fetch() and intercepts its responses while dispatching the "fetch" event we need
 * to trigger a message fetch
 * 
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
 function fetchFromServer(url, options={}) {
 
    return new Promise((resolve, reject)=>{
  
      fetch(url, options).then(
        
        value=>resolve(value),
        reason=>reject(reason)
        
      ).finally(res=>{
  
        var event = new Event("fetch")
        window.dispatchEvent(event);
        
      })
  
    }); 
}
  
  
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
  


export {fetchFromServer, }