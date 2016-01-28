
nx.nodeMgr('node0','$tab',['constants',function(constants){
           this.entry(function(config){
            console.log(config);
        // now entry is done start the templating process , listeners , exit, then fire communinication 
        //to parent node
                    
           });
           this.preLoadTmpl(['constant',function(constant){
                //we get tabodj having its md also constants module access
           }]);
           this.global('entry',['constant',function(constant){
                //we get tabodj having its md also constants module access
           }]);
           
}]);

//TO DO: theses methods to be implemented
/*app.nodeMgr('node0',['constant',function(constant){
    var cn=constant;
    return{
        'config':{
         'addToDom':'<div id="root"></div>',
         'tmplType':'tab'
          },
        'preLoadTmpl':function(nodeMd,config){
            console.log(arguments);
            nodeMd.tmplType='card';
        },
        'postLoadTmpl':function(){
            //gets the config and parent md if any change is to be neded
            //can be used to make ajax call to get some other dom or md and this will be passed on 
            //when the call goes to addListeners
        },
        'addListeners':function(){
            //gets the config and parent md if any change is to be neded
        },
        'childEventListeners': function(){
            //fired internaly by fw for every event occuring in the child
        },
        'postFetchChildMd':function(){
            // an exit function if any child md has to be changed before calling the child nodes
        }
    } 
}]);*/
