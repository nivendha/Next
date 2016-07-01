nx.module('nxAjax',[function(){
     'use strict';
    function templateCall(tmplId){
        return $.ajax({ 
            cache: false,
            url: '/template',
            method: "GET",
            contentType: "text/template",
            dataType:"text",
            data:{"tmplId":tmplId}
            });
    };
    function dataCall(url,data,method){
        return $.ajax({ 
            cache: false,
            url: url,
            data:data,
            method: method || "GET",
            contentType: "application/json",
            });
    };
    var api={
        'getNodeData':function getAppData(nodeMrSrcId,scope,done,fail){
             dataCall('/nodeData',(nodeMrSrcId).trim()).then(function(){
                    done.apply(scope,arguments);
                },function(){
                    fail.apply(scope,arguments);
                });
        },
        'getData':function getData(obj,done,fail){
             dataCall(obj.url || '/nodeData',obj.data).then(function(){
                    done.apply(obj.scope,arguments);
                },function(){
                    fail.apply(obj.scope,arguments);
                });
        },
        'getTemplate':function getTemplate(key,scope,done,fail){
          if (typeof key === "string" && typeof done === "function" && typeof scope != "undefined") {
                fail=typeof fail !='function'?done:fail;
                templateCall(key.trim()).then(function(template){
                    if(template!=''){
                        var custom_css="<link rel='stylesheet' type='text/css' href='custom_css/"+key.trim()+".css'>";
                        var element=$(template).append(custom_css);
                    }
                    done.apply(scope,element);
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
        'getNodeData':function(){
            api.getNodeData.apply(this,arguments);
        },
        'getData':function(){
            api.getData.apply(this,arguments);
        }
    }
}]);