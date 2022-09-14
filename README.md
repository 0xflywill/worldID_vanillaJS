# worldID_vanillaJS
working on worldID - want to keep it vanilla JS and no packages locally installed


currently having problems with following errors

on page load, if any calls to worldID.enable

`World ID verification failed: TypeError: worldID.enable is not a function    index.js:143:15
    loadData http://127.0.0.1:5500/index.js:140
    loadData http://127.0.0.1:5500/index.js:137
    <anonymous> http://127.0.0.1:5500/index.js:7`


`Uncaught (in promise) TypeError: worldID.enable is not a function                     index.js:145:15
    loadData http://127.0.0.1:5500/index.js:145
    loadData http://127.0.0.1:5500/index.js:137
    <anonymous> http://127.0.0.1:5500/index.js:7
    loadData http://127.0.0.1:5500/index.js:145
    (Async: EventListener.handleEvent)
    loadData http://127.0.0.1:5500/index.js:137
    <anonymous> http://127.0.0.1:5500/index.js:7`
    
    
 after a verification 
 can't do another verification atm as simulator hanging on verify
 the error message was something along the lines of 
 `worldID MT.props error is not a function`
 
