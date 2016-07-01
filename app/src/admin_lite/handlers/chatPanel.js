nx.nodeMgr('node0','$header',['constants',function(constants){
          this.mdSrc='chatMd';
           this.entry(function(config){
            console.log(config);
            //at this point the config needed for bussiness Md call is prepared
           });
           this.preLoadTmpl(['constant',function(constant){
            console.log(this);
                //we have got the node type dom ready to be appended to the content here
                //at this point we will make the call for busssiness md and get it ready
                //we get tabodj having its md ,also constants module access
           }]);
           this.postLoadTmpl(['constant',function(constant){
            console.log(this);
                //we have appended the dom (procesed with MD) to the content where we need
                //we get tabodj having its md also constants module access
           }]);
           this.listeners('nx.navLeft.menuClick',['constant',function(data,constant){
              console.log('tab clicked');
           }]);
           this.listeners('tabMove',['constant',function(data,constant){
                //we get tabodj having its md also constants module access
           }]);
           this.childEventListeners(['constant',function(constant){
                //we get tabodj having its md also constants module access
           }]);
           this.preLoadChildTmpl(['constant',function(element,constant){
                //add classes to tmplt
          }]);
            this.nodeDataReady(['constant',function(constant){
                console.log(this);
           }]);
           this.global('entry',['constant',function(constant){
                //this is a entry fn that gets fired before the FW node entry begins, this will pass params to the FW node entry
                //then the FW entry fires followed by this mgr entry
                //MANDATORY RETURN
                return {};
           }]);
            this.global('exit',['constant',function(constant){
               //this is a exit fn that gets fired before the FW node exit begins, this will pass params to the FW node exit
                //then the FW exit fires followed by this mgr exit
                return {};
           }]);
           
}]);