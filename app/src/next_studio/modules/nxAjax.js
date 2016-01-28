nx.module('nxAjax',[function(){
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
}]);