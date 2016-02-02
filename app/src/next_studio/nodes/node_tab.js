/*
*THE APP_MD IS DRAWN AS PER $TAB
*/
nx.node('$tab',['constants',function(constants){
    this.dom=$('<div id="tab"><div id="tab_wraper"><div data-Type="D_cell">1</div><div data-Type="D_cell">2</div></div></div>');
    this.template='';
    this.class=['impl_class1','impl_class2'];
    //this.tab_wraper='<div id="tab_wraper"></div>';
    this.extraParamAjax(function(){
        var _nd=this;
        setTimeout(function(){
            _nd.return('yes2');
        },500);

    });
    this.preLoadTmpl(function(){
        
        this.raiseMgrEvent('_preLoadTmpl',this);
        //at this point we get this node's config and value of extraParamAjax and the template ajax call is in ready to call
    });
    this.postLoadTmpl(function(){
        //at this point we have made the template ajax call and template DOM is ready in this.dom,
    });
    this.addListeners('tabClick',['constants',function(constants){
        var that=this,eleWraper=this.dom.find('#tab_wraper');
        eleWraper.delegate('[data-Type="D_cell"]','click',function(e){
            that.raiseMgrEvent('__tabClick',this);
        });
        $('#main').append(this.dom);

    }]);
    this.addListeners('tabMove',['constants',function(constants){
        
    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);
