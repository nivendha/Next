nx.node('$tab',['constants',function(constants){
    this.template='sliderTab';
    this.postLoadTmpl(function(){
    });
    this.addListeners('tabClick',['constants',function(constants){
    
    }]);
    this.addListeners('tabMove',['constants',function(constants){
        
    }]);
}]);

nx.node('$nav',['constants',function(constants){
    this.template='navBar';
    this.extraParamAjax(function(){
       this.return();
    });
    this.preLoadTmpl(function(){
        this.return(this.config.raiseMgrEvent('_preLoadTmpl',this));
    });
    this.postLoadTmpl(function(){
    });
    this.addListeners('menuClick',['constants',function(constants){
        var that=this;
        this.elem.find('.morph-main-menu-button-wrapper, .morph-main-menu-activator').on('touchstart click', function(e) {
            e.preventDefault();
            if(that.elem.find('.morph-main-wrapper').hasClass('morph-main-wrapper-active'))
            {       
                /* hide morph slide */
                that.elem.find('.morph-main-wrapper').removeClass('morph-main-wrapper-active');
                /* hide morph background */
                that.elem.find('.morph-main-background').removeClass('morph-main-background-active');
                /* hide background overlay */
                that.elem.find('.morph-background-overlay').removeClass('morph-background-overlay-active');
                /* hide expanded menu button */
                that.elem.find('.morph-main-menu-button-wrapper').removeClass('morph-menu-active');
                
                /* when menu de-activated, animate main menu items */
                that.elem.find('.morph-menu-wrapper').removeClass('morph-menu-wrapper-active');
                
                /* hide search field close button */
                that.elem.find('.morph-search-close-wrapper').removeClass('morph-search-close-wrapper-active');
                /* hide search field */
                that.elem.find('.morph-search-wrapper').removeClass('morph-search-wrapper-active');
                that.elem.find('.morph-search-wrapper #searchform #s').blur();
                /* show search button */
                that.elem.find('.morph-search-button').removeClass('morph-search-button-hidden');
                
                /* hide secondary menu */
                that.elem.find('.morph-secondary-menu-wrapper').removeClass('morph-secondary-menu-wrapper-active');
                /* secondary menu button inactive state */
                that.elem.find('.morph-secondary-menu-button').removeClass('morph-secondary-menu-button-active');
            } else {        
                /* show morph slide */
                that.elem.find('.morph-main-wrapper').addClass('morph-main-wrapper-active');
                /* show morph background */
                that.elem.find('.morph-main-background').addClass('morph-main-background-active');
                /* show background overlay */
                that.elem.find('.morph-background-overlay').addClass('morph-background-overlay-active');
                /* hide expanded menu button */
                that.elem.find('.morph-main-menu-button-wrapper').addClass('morph-menu-active');
                
                /* when menu activated, animate main menu items */
                that.elem.find('.morph-menu-wrapper').addClass('morph-menu-wrapper-active');
            }
        });
        this.elem.find('.morph-secondary-menu-button svg').on('touchstart click', function(e) {
        e.preventDefault();
        if(that.elem.find('.morph-secondary-menu-wrapper').hasClass('morph-secondary-menu-wrapper-active'))
        {       
            /* hide secondary menu */
            that.elem.find('.morph-secondary-menu-wrapper').removeClass('morph-secondary-menu-wrapper-active');
            /* secondary menu button inactive state */
            that.elem.find('.morph-secondary-menu-button').removeClass('morph-secondary-menu-button-active');
        } else {        
            /* show secondary menu */
            that.elem.find('.morph-secondary-menu-wrapper').addClass('morph-secondary-menu-wrapper-active');
            /* secondary menu button active state */
            that.elem.find('.morph-secondary-menu-button').addClass('morph-secondary-menu-button-active');
            
            /* hide search field close button */
            that.elem.find('.morph-search-close-wrapper').removeClass('morph-search-close-wrapper-active');
            /* hide search field */
            that.elem.find('.morph-search-wrapper').removeClass('morph-search-wrapper-active');
            that.elem.find('.morph-search-wrapper #searchform #s').blur();
            /* show search button */
            that.elem.find('.morph-search-button').removeClass('morph-search-button-hidden');
        }
        });
        that.elem.find('.morph-background-overlay').on('touchstart click', function(e) {
        /* hide morph slide */
        that.elem.find('.morph-main-wrapper').removeClass('morph-main-wrapper-active');
        /* hide morph background */
        that.elem.find('.morph-main-background').removeClass('morph-main-background-active');
        /* hide background overlay */
        that.elem.find('.morph-background-overlay').removeClass('morph-background-overlay-active');
        /* hide expanded menu button */
        that.elem.find('.morph-main-menu-button-wrapper').removeClass('morph-menu-active');
    
        /* hide secondary menu */
        that.elem.find('.morph-secondary-menu-wrapper').removeClass('morph-secondary-menu-wrapper-active');
        /* secondary menu button inactive state */
        that.elem.find('.morph-secondary-menu-button').removeClass('morph-secondary-menu-button-active');
        
        /* hide search field close button */
        that.elem.find('.morph-search-close-wrapper').removeClass('morph-search-close-wrapper-active');
        /* hide search field */
        that.elem.find('.morph-search-wrapper').removeClass('morph-search-wrapper-active');
        that.elem.find('.morph-search-wrapper #searchform #s').blur();
        /* show search button */
        that.elem.find('.morph-search-button').removeClass('morph-search-button-hidden');
        
        /* when menu de-activated, animate main menu items */
        that.elem.find('.morph-menu-wrapper').removeClass('morph-menu-wrapper-active');     
        });
        that.elem.find('.morph-by-bonfire ul li ul').before($('<span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><polygon id="arrow-24-icon" points="206.422,462 134.559,390.477 268.395,256 134.559,121.521 206.422,50 411.441,256 "/></svg></span>'));
        that.elem.find(".menu > li > span, .sub-menu > li > span").on('touchstart click', function(e) {
                if (false == $(this).next().is(':visible')) {
                    $(this).parent().siblings().find(".sub-menu").slideUp(300);
                    $(this).siblings().find(".sub-menu").slideUp(300);
                    $(this).parent().siblings().find("span").removeClass("morph-submenu-active");
                }
                $(this).next().slideToggle(300);
                $(this).toggleClass("morph-submenu-active");
            });
        that.elem.find(".menu > li > span").on('touchstart click', function(e) {
                if($(".sub-menu > li > span").hasClass('morph-submenu-active'))
                    {
                        $(".sub-menu > li > span").removeClass("morph-submenu-active");
                    }
            });
        that.elem.find(".morph-main-menu-button-wrapper, .morph-main-menu-activator, .morph-background-overlay").on('touchstart click', function(e) {
                if($(".menu > li > span, .sub-menu > li > span").hasClass('morph-submenu-active'))
                    {
                        $(".menu > li").find(".sub-menu").slideUp(300);
                        $(".menu > li > span, .sub-menu > li > span").removeClass("morph-submenu-active");
                    }
            });
    }]);
    this.addListeners('searchClick',['constants',function(constants){
    var that=this;
        that.elem.find('.morph-search-button').on('touchstart click', function(e) {
        if(that.elem.find('.morph-search-wrapper').hasClass('morph-search-wrapper-active'))
        {
            /* hide search field close button */
            that.elem.find('.morph-search-close-wrapper').removeClass('morph-search-close-wrapper-active');
            /* hide search field */
            that.elem.find('.morph-search-wrapper').removeClass('morph-search-wrapper-active');
            that.elem.find('.morph-search-wrapper #searchform #s').blur();
            /* show search button */
            that.elem.find('.morph-search-button').removeClass('morph-search-button-hidden');
            
        } else {
            /* show search field close button */
            that.elem.find('.morph-search-close-wrapper').addClass('morph-search-close-wrapper-active');
            /* show search field */
            that.elem.find('.morph-search-wrapper').addClass('morph-search-wrapper-active');
            /* focus search field */
            that.elem.find('.morph-search-wrapper #searchform #s').focus();
            /* hide search button */
            that.elem.find('.morph-search-button').addClass('morph-search-button-hidden');
            
            /* hide secondary menu */
            that.elem.find('.morph-secondary-menu-wrapper').removeClass('morph-secondary-menu-wrapper-active');
            /* secondary menu button inactive state */
            that.elem.find('.morph-secondary-menu-button').removeClass('morph-secondary-menu-button-active');
        }
        });
        that.elem.find('.morph-search-close-wrapper').on('touchstart click', function(e) {
         /* hide search field close button */
                that.elem.find('.morph-search-close-wrapper').removeClass('morph-search-close-wrapper-active');
                /* hide search field */
                that.elem.find('.morph-search-wrapper').removeClass('morph-search-wrapper-active');
                that.elem.find('.morph-search-wrapper #searchform #s').blur();
                /* show search button */
                that.elem.find('.morph-search-button').removeClass('morph-search-button-hidden');       
        });
    }]);
    this.entry(['constants',function(_glEntry,constants){
         this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
        this.raiseMgrEvent('_exit',this);
    }]);
}]);

nx.node('header',['constants',function(constants){
    this.dom=$('<div id="header"><div node_wraper_id="headerwraper"><div node="menuNavBar"></div><div node="mainTabBar"></div></div></div>');
    this.preLoadTmpl(function(){
        this.return(this.config);
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
        'mainTabBar':'$tab',
        'menuNavBar':'$nav'
        }
    });
    this.implChildListeners('menuNavBar','click',['constants',function(data,constants){
        this.raiseMgrEvent('__click',this);

    }]);
    this.implChildListeners('mainTabBar','tabClick',['constants',function(data,constants){
        this.raiseMgrEvent('__tabClick',this);

    }]);
    this.addListeners('headerEvent',['constants',function(constants){
       
    

    }]);
    this.entry(['constants',function(_glEntry,constants){
        // this.raiseMgrEvent('_entry',this);
    }]);
    this.exit(['constants',function(_glExit,constants){
      //  this.raiseMgrEvent('_exit',this);
    }]);
}]);