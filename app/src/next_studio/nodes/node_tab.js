nx.node('$tab',['constants',function(constants){
    this.dom='<div id="tab"><div id="tab_wraper"></div></div>';
    this.template='';
    this.class=['impl_class1','impl_class2'];
    this.tab_wraper='<div id="tab_wraper"></div>';
    this.extraParamAjax(function(){
        //this is $nxAjax
    });
    this.addListeners('tabClick',['constants',function(constants){

    }]);
    this.addListeners('tabMove',['constants',function(constants){
        
    }]);
    this.entry(['constants',function(constants){
        console.log(this);
    }]);
}]);