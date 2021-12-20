import React, { useEffect} from 'react';
const IdleTimeOutHandler = (props)=>{
   const events= ['click','scroll','load','keydown']
   const eventHandler =(eventType)=>{
     
   };
   useEffect(()=>{
        addEvents();
        
        return (()=>{
            
            removeEvents();
        })
    },[])
   const addEvents=()=>{
        
        events.forEach(eventName=>{
            window.addEventListener(eventName,eventHandler)
        })
        
    }
    const removeEvents=()=>{
        events.forEach(eventName=>{
            window.removeEventListener(eventName,eventHandler)
        })
    };
    
    return(
        <div></div>
        )
        
    }
    
    export default IdleTimeOutHandler;