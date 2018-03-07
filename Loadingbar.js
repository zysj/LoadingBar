

!function(factory,global,$){
    
    if(!$ || typeof $ != 'function')return;
    if(typeof exports == 'object' && typeof module !== 'undefined')return module.exports = factory();
    if(typeof define == 'function' && typeof define.amd == 'object')define(factory);

    return factory(global);


}(function(global){

    var defaults = LoadingBar.prototype.defaults = {
        el:null,
        onError:null,
        onProgress:null,
        onSuccess:null
    }

    function LoadingBar(option){
        if(this instanceof LoadingBar !== true){
            return new LoadingBar(option);
        }

        this.option = $.extend({},defaults,option);
        this.$el = this.option.el || $('[loading-bar]');
        this.isEnd = false;
        this.progress = 0;
        this.init();
    }

    LoadingBar.prototype.init = function(){
        this.initEvent();
    }

    LoadingBar.prototype.initEvent = function(){
        var that = this;
        var option = this.option;
        this.$el.on('loadingbar:error',function(e,data){
            option.onError && option.onError.call(that,data,that.isEnd);
        });

        this.$el.on('loadingbar:success',function(e,data){
            option.onSuccess && option.onSuccess.call(that,data,that.isEnd);
        });

        this.$el.on('loadingbar:progress',function(e,data){
            option.onProgress && option.onProgress.call(that,data,that.isEnd);
        });
        
        this.$el.on('webkitTransitionEnd otransitionend oTransitionEnd transitionend',function(e){
            that.progress == 100 && that.$el.css({'display':'none'});
        });
    }

    LoadingBar.prototype.start = function(){
        this.progress = 0;
        this.$el.css({'width':this.progress,'dispaly':'block'});
    }

    LoadingBar.prototype.toProgress = function(num){
        this.progress = num;
        this.$el.css({'width':num+'%'});
        this.$el.trigger({
            type:'loadingbar:progress',
            data:{
                num:num
            }
        })
    }

    LoadingBar.prototype.end = function(){
        this.progress = 100;
        this.$el.css({'width':this.progress+'%'});
    }
    LoadingBar.prototype.success = function(data){
        this.end();
        this.$el.trigger({
            type:'loadingbar:success',
            data:data
        })
    }

    LoadingBar.prototype.error = function(data){
        this.end();
        this.$el.trigger({
            type:'loadingbar:error',
            data:data
        })
    }


    return global.LoadingBar = LoadingBar;
},window,window.jQuery)