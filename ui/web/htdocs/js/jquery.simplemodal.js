/*
 * SimpleModal 1.1.1 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://plugins.jquery.com/project/SimpleModal
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2007 Eric Martin - http://ericmmartin.com
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Revision: $Id: jquery.simplemodal.js 93 2008-01-15 16:14:20Z emartin24 $
 *
 */
(function($){$.modal=function(data,options){return $.modal.impl.init(data,options);};$.modal.close=function(){$.modal.impl.close(true);};$.fn.modal=function(options){return $.modal.impl.init(this,options);};$.modal.defaults={overlay:50,overlayId:'modalOverlay',overlayCss:{},containerId:'modalContainer',containerCss:{},close:true,closeTitle:'Close',closeClass:'modalClose',persist:false,onOpen:null,onShow:null,onClose:null};$.modal.impl={opts:null,dialog:{},init:function(data,options){if(this.dialog.data){return false;}this.opts=$.extend({},$.modal.defaults,options);if(typeof data=='object'){data=data instanceof jQuery?data:$(data);if(data.parent().parent().size()>0){this.dialog.parentNode=data.parent();if(!this.opts.persist){this.dialog.original=data.clone(true);}}}else if(typeof data=='string'||typeof data=='number'){data=$('<div>').html(data);}else{if(console){console.log('SimpleModal Error: Unsupported data type: '+typeof data);}return false;}this.dialog.data=data.addClass('modalData');data=null;this.create();this.open();if($.isFunction(this.opts.onShow)){this.opts.onShow.apply(this,[this.dialog]);}return this;},create:function(){this.dialog.overlay=$('<div>').attr('id',this.opts.overlayId).addClass('modalOverlay').css($.extend(this.opts.overlayCss,{opacity:this.opts.overlay/100,height:'100%',width:'100%',position:'fixed',left:0,top:0,zIndex:3000})).hide().appendTo('body');this.dialog.container=$('<div>').attr('id',this.opts.containerId).addClass('modalContainer').css($.extend(this.opts.containerCss,{position:'fixed',zIndex:3100})).append(this.opts.close?'<a class="modalCloseImg '+this.opts.closeClass
+'" title="'+this.opts.closeTitle+'"></a>':'').hide().appendTo('body');if($.browser.msie&&($.browser.version<7)){this.fixIE();}this.dialog.container.append(this.dialog.data.hide());},bindEvents:function(){var modal=this;$('.'+this.opts.closeClass).click(function(e){e.preventDefault();modal.close();});},unbindEvents:function(){$('.'+this.opts.closeClass).unbind('click');},fixIE:function(){var wHeight=$(document.body).height()+'px';var wWidth=$(document.body).width()+'px';this.dialog.overlay.css({position:'absolute',height:wHeight,width:wWidth});this.dialog.container.css({position:'absolute'});this.dialog.iframe=$('<iframe src="javascript:false;">').css($.extend(this.opts.iframeCss,{opacity:0,position:'absolute',height:wHeight,width:wWidth,zIndex:1000,width:'100%',top:0,left:0})).hide().appendTo('body');},open:function(){if(this.dialog.iframe){this.dialog.iframe.show();}if($.isFunction(this.opts.onOpen)){this.opts.onOpen.apply(this,[this.dialog]);}else{this.dialog.overlay.show();this.dialog.container.show();this.dialog.data.show();}this.bindEvents();},close:function(external){if(!this.dialog.data){return false;}if($.isFunction(this.opts.onClose)&&!external){this.opts.onClose.apply(this,[this.dialog]);}else{if(this.dialog.parentNode){if(this.opts.persist){this.dialog.data.hide().appendTo(this.dialog.parentNode);}else{this.dialog.data.remove();this.dialog.original.appendTo(this.dialog.parentNode);}}else{this.dialog.data.remove();}this.dialog.container.remove();this.dialog.overlay.remove();if(this.dialog.iframe){this.dialog.iframe.remove();}this.dialog={};}this.unbindEvents();}};})(jQuery);


function modal_warning(header, warning) {
    m = $("<div class='header'>"+header+"</div><p class='message'>"+warning+"</p><p class='closeModal'>click to close</p>").modal({
		        containerId: 'warning-modal',
                        close: 'true',
  			overlayCss: {
    			backgroundColor: '#000000',
    			cursor: 'wait'
  			},
		      });
    $('#warning-modal').click(function() { m.close();} );  
}