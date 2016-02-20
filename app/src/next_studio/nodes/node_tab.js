/*
*THE APP_MD IS DRAWN AS PER $TAB
*/
nx.node('$tab',['constants',function(constants){
    this.dom=$('<div nx-id="tab"><div node_wraper_id="tab_wraper"><div data-Type="D_cell">1</div><div data-Type="D_cell">2</div></div></div>');
    this.template='';
    this.class=['impl_class1','impl_class2'];
    //this.tab_wraper='<div id="tab_wraper"></div>';
    this.extraParamAjax(function(){
       this.return();
    });
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
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
        $('body').append(this.dom);

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
nx.node('$textField',['constants',function(constants){
    this.dom=$('<input type="text"/>');
    this.template='';
    this.extraParamAjax(function(){
       this.return();

    });
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
        
        //at this point we get this node's config and value of extraParamAjax and the template ajax call is in ready to call
    });
    this.postLoadTmpl(function(){
        //at this point we have made the template ajax call and template DOM is ready in this.dom,
    });
    this.addListeners('focus',['constants',function(constants){
       
    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);

nx.node('nodeTemplate',['constants',function(constants){
    this.dom=$('<div id="login"><div node_wraper_id="logi_wraper"><div node="TAB"></div><div node="TEXT"></div></div></div>');
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
    this.preLoadChildTmpl(function(){
        this.raiseMgrEvent('_preLoadChildTmpl',this);
        //at this point we get this node's config and value of extraParamAjax and the template ajax call is in ready to call
    }); 
    this.nodeDataReady(function(){
        this.return(this.config.raiseMgrEvent('_nodeDataReady',this));
        //at this point we get this node's config and value of extraParamAjax and the template ajax call is in ready to call
    });  
    this.postLoadTmpl(function(){
        //at this point we have made the template ajax call and template DOM is ready in this.dom,
    });
    this.build(function(){
        return{ 
        'TAB':'$tab',
        'TEXT':'$textField'
        }
    });
    this.implChildListeners('TAB','tabClick',['constants',function(data,constants){
       console.log(data);
        this.raiseMgrEvent('_tabClick',this);

    }]);
    this.implChildListeners('TEXT','focus',['constants',function(data,constants){
       console.log(data);
        this.raiseMgrEvent('_focus',this);

    }]);
    this.addListeners('login',['constants',function(constants){
       
    

    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);

nx.node('$main',['constants',function(constants){
    this.dom=$('<div id="login"><div node_wraper_id="logi_wraper"><div node="TAB"></div><div node="TEXT"></div></div></div>');
    this.template='';
    this.class=['impl_class1','impl_class2'];
   this.addListeners('lockScreen',['constants',function(constants){
       
    

    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);

nx.node('login',['constants',function(constants){
    this.template='login';
    this.preLoadTmpl(function(){
        this.return(this.config);
        //this.raiseMgrEvent('_preLoadTmpl',this);
        
    });
    this.preLoadChildTmpl(function(){
        this.raiseMgrEvent('_preLoadChildTmpl',this.dom);
    }); 
    this.nodeDataReady(function(){
        this.return();
    });  
    this.postLoadTmpl(function(){
        
    });
    this.build(function(){
        return{ 
        'USER_NAME':'$textField',
        'PASSWORD':'$textField'
        }
    });
    this.implChildListeners('USER_NAME','click',['constants',function(data,constants){
        this.raiseMgrEvent('__click',this);

    }]);
    this.implChildListeners('PASSWORD','focus',['constants',function(data,constants){
        this.raiseMgrEvent('__focus',this);

    }]);
    this.addListeners('login',['constants',function(constants){
       
    

    }]);
    this.entry(['constants',function(_glEntry,constants){
        // this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
      //  this.raiseMgrEvent('_exit',this);
    }]);
}]);