nx.node('$chat',['constants',function(constants){
    this.template='chatMenu';
    this.innerWraper='';
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
    });
    this.postLoadTmpl(function(){
        console.log('postload for tab');
    });
    this.addListeners('nx.tab.tabClick',['constants',function(constants){
    console.log('hi 1');
   //     this.raiseMgrEvent('__tabClick');
    }]);
    this.addListeners('nx.tab.tabMove',['constants',function(constants){
        this.raiseMgrEvent('__tabClick');
    }]);
}]);

nx.node('$header',['constants',function(constants){
    this.template='header';
    this.innerWraper='';
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
    });
    this.postLoadTmpl(function(){
        console.log('postload for tab');
    });
    this.addListeners('nx.tab.tabClick',['constants',function(constants){
    console.log('hi 1');
   //     this.raiseMgrEvent('__tabClick');
    }]);
    this.addListeners('nx.tab.tabMove',['constants',function(constants){
        this.raiseMgrEvent('__tabClick');
    }]);
}]);

nx.node('$navLeft',['constants',function(constants){
    this.template='navBarLeft';
    this.innerWraper='';
    this.extraParamAjax(function(){
       this.return();
    });
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
    });
    this.postLoadTmpl(function(){
        console.log('postload for nav left');
           var navscroll = this.elem.find('.page-sidebar .sidebar-scrollarea');
            var nav = this.elem.find('.side-nav> .nav');
            var navCurrent = nav.find('li.current');
            var navLi = nav.find('li');
            var navLink = nav.find('a');
            var navSub = nav.find('li>ul.sub');

            //put hasSub class
            navSub.closest('li').addClass('hasSub');

            //put notExpand class
            if(!navSub.prev('a').hasClass('notExpand')) {
                navSub.prev('a').addClass('notExpand');
            }

          
                if(!$('side-Nav').hasClass('show-arrows')) {
                    $('side-Nav').addClass('show-arrows');
                }
                if(!navSub.prev('a').find('i.sideNav-arrow').length) {
                    navSub.prev('a').prepend('<i class="'+ "l-arrows-right" + ' sideNav-arrow"></i>');
                }
             var that=this;
             navLink.on("click", function(e){
                 that.publishEvent('nx.navLeft.menuClick');
             });
    });
    this.addListeners('nx.navLeft.menuClick',['constants',function(constants){
         var nav = this.elem.find('.side-nav> .nav');
        //DO CODE FROM HERE ,U SHOULD CONFIG raiseMgrEvent TO FIRE FOR MNGR IN SINGLE NODE AND IF PARENT IS THERE AND
        //IT HAS EVENT EXTEDNDD FIRE IT INSTEAD
        //THEN IN ITS RAIE FIRE MGS EVENT
        this.raiseMgrEvent('__nx.navLeft.menuClick');
          var navLink = nav.find('a');
           var navLi = nav.find('li');
                var _this = $(this);
                if(_this.hasClass('notExpand')) {
                    e.preventDefault();   
                    //check if menu is collapsed
                    if (!$('.page-sidebar').hasClass('collapse-sidebar')) {
                       //check if is 3lv menu
                        if ($(this).closest('li').closest('ul').hasClass('show')) {
                            //expand ul and change class to expand
                            _this.next('ul').slideDown(200, 'linear');
                            _this.next('ul').addClass('show');
                            _this.addClass('expand').removeClass('notExpand');
                            navLi.removeClass('highlight-menu');
                            _this.closest('li.hasSub').addClass('highlight-menu');
                            _this.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90'); 
                        } else {
                            //close all expanded subs
                            navexpand = nav.find('li.hasSub .expand');
                            navexpand.next('ul').removeClass('show');
                            navexpand.next('ul').slideUp(200, 'linear'); 
                            navexpand.addClass('notExpand').removeClass('expand');            
                            navexpand.find('.sideNav-arrow').removeClass('rotateM180').addClass('rotate0');            
                            //expand ul and change class to expand
                            _this.next('ul').slideDown(200, 'linear');
                            _this.next('ul').addClass('show');
                            _this.addClass('expand').removeClass('notExpand');
                            navLi.removeClass('highlight-menu');
                            _this.closest('li.hasSub').addClass('highlight-menu');
                            _this.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90'); 
                        }
                    }                                    
                } else if (_this.hasClass('expand')) {
                    e.preventDefault();
                    //collapse ul and change class to notExpand
                    _this.next('ul').removeClass('show');
                    _this.next('ul').slideUp(200, 'linear' );
                    _this.addClass('notExpand').removeClass('expand');
                    _this.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
                    navLi.removeClass('highlight-menu');
                }
       
      
    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);

nx.node('applicationWrapper',['constants',function(constants){
    this.dom=$('<div id="app_wraper"><div node_wraper_id="app_wraper"><div node="NAVLEFT"></div><div node="CHAT"></div></div></div>');
    this.template='';
    this.innerWraper='';
    this.class=['impl_class1','impl_class2'];
    //this.tab_wraper='<div id="tab_wraper"></div>';
    this.extraParamAjax(function(getFbDataCall){
        getFbDataCall.getData({
            url:'/getFbuser',
            scope:this
        },function(data){
            this.return(data);
        },function(data){
            this.return();
        });

    });
    this.preLoadTmpl(function(){
        
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
        //at this point we get this node's config and value of extraParamAjax and the template ajax call is in ready to call
    });
    this.preLoadChildTmpl(function(){
        if(this.extraParams.proPic!=undefined && this.extraParams.fullname!=undefined){
        this.dom.find('[ data-item-type="userimg"]').attr('src',this.extraParams.proPic);
        this.dom.find('[ data-item-type="username"]').html(this.extraParams.fullname);
        }
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
        'CHAT':'$chat',
        'NAVLEFT':'$navLeft'
        }
    });
    this.implChildListeners('NAVLEFT','nx.navLeft.menuClick',['constants',function(data,constants){
       console.log(data);
      this.raiseMgrEvent('__nx.navLeft.menuClick');
    }]);
     this.extendEntry('NAVLEFT',['constants',function(data,constants){
       console.log(data);
    }]);
      this.extendPreloadTmpl('NAVLEFT',['constants',function(data,constants){
       console.log(data);
    }]);
      this.extendPostloadTmpl('NAVLEFT',['constants',function(data,constants){
       console.log(data);
    }]);
    this.extendExit('NAVLEFT',['constants',function(data,constants){
       console.log(data);
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