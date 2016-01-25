var $nx = (function () {
    'use strict';
    var resources = {
        'filters' : { },
        'constants' : { },
        'factory' : { },
        '$_nx' : { },
        'mode' : null,
        'node':{},
        'nodeTypeMd':{},
        'nodeClass':{},
        'root' : '/',
        'routes' : [],
        'controller' : { },
        'controller_dependancy':{},
        'config': function(options) {
            resources.mode = options && options.mode && options.mode == 'history' 
                        && !!(history.pushState) ? 'history' : 'hash';
            resources.root = options && options.root ? '/' + resources.clearSlashes(options.root) + '/' : '/';
        },
        'getFragment': function() {
            var fragment = '';
            if(resources.mode === 'history') {
                fragment = resources.clearSlashes(decodeURI(location.pathname + location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = resources.root != '/' ? fragment.replace(resources.root, '') : fragment;
            } else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }
            return resources.clearSlashes(fragment);
        },
        'clearSlashes': function(path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        },
        'check': function (hash) {
            var reg, keys, match, routeParams;
            for (var i = 0, max = resources.routes.length; i < max; i++ ) {
                routeParams = {}
                keys = resources.clearSlashes(resources.routes[i].path).match(/:([^\/]+)/g);
                match = hash.match(new RegExp(resources.clearSlashes(resources.routes[i].path).replace(/:([^\/]+)/g, "([^\/]*)")));
                console.log(resources.routes[i].path);
                if (match) {
                    match.shift();
                    match.forEach(function (value, i) {
                        routeParams[keys[i].replace(":", "")] = value;
                    });
                    var LDependancy = api.loadDependancies(resources.controller_dependancy[resources.routes[i].handler]);
                        LDependancy.push(routeParams);
                        resources.controller[resources.routes[i].handler].apply(this, LDependancy);
                        break;
                }
                else{
                    if(resources.clearSlashes(resources.routes[i].path) == hash){
                        //load dependency and call
                        var LDependancy = api.loadDependancies(resources.controller_dependancy[resources.routes[i].handler]);
                        resources.controller[resources.routes[i].handler].apply(this, LDependancy);
                        break;
                    }
                }
            }
        },
        
        'listen': function() {
            var current = "/";
            var fn = function() {
                // console.log("..");
                if(current !== resources.getFragment()) {
                    current = resources.getFragment();
                    resources.check(current);
                }
            }
            if(resources.mode == 'hash'){
                clearInterval(this.interval);
                this.interval = setInterval(fn, 50);
            }
            if(resources.mode == 'history'){
                this.interval = setTimeout(fn, 50);    
            }
        },
    }, 
    api = {
        'filters': function (key, val) {
            resources.filters[key] = val;
        },
        'factory': function (key, arrayArg) {
            var last_index = arrayArg.length-1;
            var dependancies = arrayArg.slice(0, -1);
            if (typeof arrayArg[last_index] === "function") {
                console.log("-"+api.loadDependancies(dependancies));
                resources.factory[key] = arrayArg[last_index].apply(this, api.loadDependancies(dependancies)); // arrayArg[last_index];
            } else {
                console.log("Nan");
            }
        },
        'routes' :  function(route, controller){
            var temp = {'path':route, 'handler':controller };
            resources.routes.push(temp);
        },
        'controller' : function(controller, handler){
            var last_index = handler.length-1;
            var dependancies = handler.slice(0, -1);
            if (typeof handler[last_index] === "function") {
                resources.controller[controller] = handler[last_index];
                resources.controller_dependancy[controller] =  dependancies;
            } else {
                console.log("Nan");
            }
        },
        'loadDependancies' : function(arrayArg){
            var dependancy = [], iter;
            for (iter = 0; iter < arrayArg.length; iter += 1) {
                if (typeof arrayArg[iter] === "string") {
                    //look in modules
                    if (resources.hasOwnProperty(arrayArg[iter])){
                        dependancy.push(api.loadModule(arrayArg[iter]));
                    } else {
                    //look in factory
                    if (resources.factory.hasOwnProperty(arrayArg[iter])) {
                        dependancy.push(api.loadDependancy(arrayArg[iter]));
                    } else {
                            //look in constants
                            if (resources.constants.hasOwnProperty(arrayArg[iter])) {
                                dependancy.push(api.loadConstant(arrayArg[iter]));
                            } else {
                                //if it is $_nx scope
                                if (arrayArg[iter] === "$_nx") {
                                    dependancy.push({});
                                } else {
                                    console.log("Error: " + arrayArg[iter] + " is not Found in constants and Factories");
                                }
                            }
                        }
                    }
                } 
            }
            return dependancy;
        },
        
        'loadModule': function (key) {
            return resources[key];
        },

        'loadDependancy': function (key) {
            return resources.factory[key];
        },

        'loadConstant': function (key) {
            return resources.constants[key];
        },

        'constants': function (key, val) {
            resources.constants[key] = val(); 
        },

        'module': function(key, arrayArg){
            if(key.startsWith('$')){
                var last_index = arrayArg.length-1;
                var dependancies = arrayArg.slice(0, -1);
                if (typeof arrayArg[last_index] === "function") {
                    console.log("-"+api.loadDependancies(dependancies));
                    resources[key] = arrayArg[last_index].apply(this, api.loadDependancies(dependancies)); // arrayArg[last_index];
                } else {
                    console.log("Nan");
                }
            }
            else{
                console.log("Error in module "+key+": should starts with $");
            }
        },
/*        'nodeMgr':function(key, arrayArg){
              var fn_index = arrayArg.length-1;
              var dependancies = arrayArg.slice(0, -1);
               if (typeof arrayArg[fn_index] === "function") {
                var _this=resources.node[key] = arrayArg[fn_index].apply(this, api.loadDependancies(dependancies));
                var $nmodObj=new $nmod();
                     $nmodObj.create({
                         'addToDom':_this.config.addToDom,
                         'tmplType':_this.config.tmplType
                    });
                    if (typeof _this.preLoadTmpl === "function")
                     _this.preLoadTmpl.apply(_this,[$nmodObj.getNodeMd(),'maperConfig']);
                 //through the mapper find the parent node and fire its childEventListeners for event preLoadTmpl

                    $nmodObj.getNodeMd()
                    
               }else{
                  console.log("Nan for node"+key);
               }
        },*/
        'nodeMgr':function(key,nd_type,arrayArg){
             var fn_index = arrayArg.length-1;
              var dependancies = arrayArg.slice(0, -1);
               if (typeof arrayArg[fn_index] === "function") {
                dependancies=api.loadDependancies(dependancies);
                dependancies.unshift(new resources.nodeClass[nd_type](resources.nodeTypeMd[nd_type]));
                arrayArg[fn_index].apply(this,dependancies);
                var _nMgrObj=dependancies[0];
                //add this _nMgrObj obj to the _mapper so that it can be intiated when map come to load this node
                resources.node[key]=_nMgrObj;
               }
        },
        'node':function(key, arrayArg){
             var fn_index = arrayArg.length-1;
              var dependancies = arrayArg.slice(0, -1);
               if (typeof arrayArg[fn_index] === "function") {
                var _node=resources.nodeTypeMd[key]=arrayArg[fn_index].apply(this, api.loadDependancies(dependancies));
                if(_node.dom!=''){
                   // $(_node.dom).addClass(_node.class);
                    var a=[],a=Object.keys(_node.addListeners);
                    for (var index = 0, len = a.length; index < len; ++index) {
                            _node.listeners[a[index]]=_node.addListeners[a[index]];
                        }
                    delete _node.addListeners;
                    //so far listeners ready in the _node json
                    //make a class from _node and push it to resources.nodeType[key]
                    var _nd=(function(_node){
                        var config=_node;
                        // recived nodetype specific config here from which take out
                        //the node specific listeners and provide implementation handler functions
                        var fn={};
                        var _nd_api={
                            '_get_fn':function(_fn){
                                 return fn[_fn];
                            },
                            '_set_fn':function(_fn,obj){
                                fn[_fn]=obj;
                            }
                        };
                    
                        this.seter=function(){
                            return _nd_api._set_fn;
                        }
                        this.geter=function(){
                            return _nd_api._get_fn;
                        }
                    });
                     _nd.prototype._fn_parser=function(arrayArg,_fn){
                        if(typeof arrayArg=='function'){
                                        arrayArg=[arrayArg];
                                    }
                                     var fn_index = arrayArg.length-1;
                                     var dependancies = arrayArg.slice(0, -1);
                                      if (typeof arrayArg[fn_index] === "function") {
                                        dependancies=api.loadDependancies(dependancies);
                                        this.seter().apply(this,[_fn,
                                            {
                                            'dependancies':dependancies,
                                            '_fn':arrayArg[fn_index]
                                            }]);
                                      }
                     };
                     _nd.prototype.entry=function(arrayArg){
                       this._fn_parser(arrayArg,'_entry');
                    };
                    _nd.prototype.preLoadTmpl=function(arrayArg){
                       this._fn_parser(arrayArg,'_preLoadTmpl'); 
                   };
                    _nd.prototype.addListeners=function(arrayArg){
                       this._fn_parser(arrayArg,'_addListeners'); 
                   };
                    _nd.prototype.childEventListeners=function(arrayArg){
                       this._fn_parser(arrayArg,'_childEventListeners'); 
                   };
                    _nd.prototype.postFetchChildMd=function(arrayArg){
                       this._fn_parser(arrayArg,'_postFetchChildMd'); 
                   };
                     _nd.prototype.exit=function(arrayArg){
                       this._fn_parser(arrayArg,'_exit');
                    };                   

                }

                resources.nodeClass[key]=_nd;
            }
        }
    };

        
    function filters() {
        api.filters(arguments[0], arguments[1]);
    }

    function factory() {
        api.factory(arguments[0], arguments[1]);
    }

    function constants() {
        api.constants(arguments[0], arguments[1]);
    }

    function routes(){
        api.routes(arguments[0], arguments[1]);
    }

    function controller(){
        api.controller(arguments[0], arguments[1]);
    }

    function module(){
        api.module(arguments[0], arguments[1]);
    }
    function nodeMgr(){
        api.nodeMgr(arguments[0], arguments[1], arguments[2]);
    }
     function node(){
        api.node(arguments[0], arguments[1]);
    }
    function initiate(){
        resources.config({mode :'history'});
        resources.listen();

        if (typeof String.prototype.startsWith != 'function') {
          // see below for better implementation!
          String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
          };
        }
    }

    initiate();

    return {
        'nxfilters': filters,
        'factory': factory,
        'routes': routes,
        'controller': controller,
        'constants': constants,
        'module': module,
        'nodeMgr': nodeMgr,
        'node':node
    }
});
//TODO, waiting to be made ready as an class for injection
var nxAjax=(function(){
    'use strict';
    function templateCall(){
        return $.ajax({ 
            cache: false,
            url: arguments[0],
            method: "GET",
            contentType: "application/json",
            dataType:"html"
            });
    };
    var api={
        'getAppData':function getAppData(){
            console.log(arguments);
        },
        'getData':function getData(){
            console.log(arguments);
        },
        'getTemplate':function getTemplate(key,scope,done,fail){
          if (typeof key === "string" && typeof done === "function" && typeof scope != "undefined") {
                fail=typeof fail !='function'?done:fail;
                var template = key
                var callbacks = arrayArg;
                templateCall(key).then(function(){
                    done.apply(scope,arguments);
                },function(){
                    fail.apply(scope,arguments);
                });
            }
        }
    }
    return{
        'getTemplate':function(){
            api.getTemplate.apply(this,arguments);
        },
        'getAppData':function(){
            api.getAppData.apply(this,arguments);
        },
        'getData':function(){
            api.getAppData.apply(this,arguments);
        }
    }
});

var nx = $nx();
nx.constants('constant', function(){
 return {
 'dependancy1':'d1',
 'dependancyn':'d2'
 }
});


nx.node('$tab',['$nxAjax','constants',function($nxAjax,constants){
    return{
        'dom':'<div id="tab"></div>',
        'template':'',
        'extraParamAjax':'',
        'class':'hi',
        'addListeners':{
            'tabClick':function(){

            },
            'tabMove':function(){

            }
        },
        'listeners':{
            'entry':function(){

            },
            'preLoadTmpl':function(){

            },
            'exit':function(){

            }
        }

    }
}]);

nx.nodeMgr('node0','$tab',['constants',function($tabObj,constants){
           $tabObj.entry(function(config){
            console.log(config);
        // now entry is done start the templating process , listeners , exit, then fire communinication 
        //to parent node
                    
           });
           $tabObj.preLoadTmpl(['constant',function(constant){
                //we get tabodj having its md also constants module access
           }]);
           
}]);
//TO DO: thieses methods to be implemented
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




