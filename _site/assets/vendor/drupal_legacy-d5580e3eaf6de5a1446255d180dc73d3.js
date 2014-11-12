/**
 * sasson javascript core
 *
 */

var Drupal = {};
Drupal.behaviors = {};
Drupal.sasson = {};

(function($) {

  /**
   * This script will watch files for changes and
   * automatically refresh the browser when a file is modified.
   */
  Drupal.sasson.watch = function(url, instant) {

    var request;
    var dateModified;

    // Check the last time the file was modified
    request = $.ajax({
      type: "HEAD",
      url: url,
      success: function () {
        dateModified = request.getResponseHeader("Last-Modified");
        interval = setInterval(check,1000);
      }
    });

    var updateStyle = function(filename) {
      var headElm = $("head > *:contains('" + filename + ".css')");
      if (headElm.length > 0) {
        // If it's in an @import rule
        headElm.html(headElm.html().replace(filename + '.css?', filename + '.css?s'));
      } else {
        // If it's in a <link> tag
        headElm = $('head > link[href*="' + filename + '.css"]');
        headElm.attr('href', headElm.attr('href').replace(filename + '.css?', filename + '.css?s'));
      }
    };

    // Check every second if the timestamp was modified
    var check = function() {
      request = $.ajax({
        type: "HEAD",
        url: url,
        success: function () {
          if (dateModified != (dateModified = request.getResponseHeader("Last-Modified"))) {
            var filename = url.split('/');
            filename = filename[filename.length - 1].split('.');
            var fileExt = filename[1];
            filename = filename[0];
            if (instant && fileExt == 'css') {
              // css file - update head
              updateStyle(filename);
            } else if (instant && (fileExt == 'scss' || fileExt == 'sass')) {
              // SASS/SCSS file - trigger sass compilation with an ajax call and update head
              $.ajax({
                url: "",
                success: function () {
                  updateStyle(filename);
                }
              });
            } else {
              // Reload the page
              location.reload();
            }
          }
        }
      });
    };
  };

  Drupal.behaviors.sasson = {
    attach: function(context) {

      $('html').removeClass('no-js');

    }
  };

  Drupal.behaviors.showOverlay = {
    attach: function(context) {

      $('body.show-overlay').each(function() {
        var body = $(this);
        var overlay = $('<div id="overlay"><img src="'+ Drupal.settings.sasson['overlay_url'] +'"/></div>');
        var overlayToggle = $('<div class="toggle-overlay" ><div>' + Drupal.t('Overlay') + '</div></div>');
        body.append(overlay);
        body.append(overlayToggle);
        $("#overlay").css({ opacity: Drupal.settings.sasson['overlay_opacity'] });
        $('.toggle-overlay').click(function() {
          $('body').toggleClass('show-overlay');
          $('#overlay').toggle();
          $(this).toggleClass("off");
        });
        $("#overlay").draggable();
      });

    }
  };

  Drupal.behaviors.showGrid = {
    attach: function(context) {

      $('body.show-grid').each(function() {
        var body = $(this);
        var gridToggle = $('<div class="toggle-grid" ><div>' + Drupal.t('Grid') + '</div></div>');
        body.append(gridToggle);
        $('.toggle-grid').click(function() {
          $('body').toggleClass('show-grid');
          $(this).toggleClass("off");
        });
      });

    }
  };

})(jQuery);


// Console.log wrapper to avoid errors when firebug is not present
// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if (this.console) {
    console.log(Array.prototype.slice.call(arguments));
  }
};
;
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);;
/*!

    Copyright (c) 2011 Peter van der Spek

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    
 */(function(a){function m(){if(!d){d=!0;for(var c in b)a(c).each(function(){var d,e;d=a(this),e=d.data("jqae"),(e.containerWidth!=d.width()||e.containerHeight!=d.height())&&f(d,b[c])});d=!1}}function l(a){b[a]&&(delete b[a],b.length||c&&(window.clearInterval(c),c=undefined))}function k(a,d){b[a]=d,c||(c=window.setInterval(function(){m()},200))}function j(){return this.nodeType===3}function i(b){if(b.contents().length){var c=b.contents(),d=c.eq(c.length-1);if(d.filter(j).length){var e=d.get(0).nodeValue;e=a.trim(e);if(e==""){d.remove();return!0}return!1}while(i(d));if(d.contents().length)return!1;d.remove();return!0}return!1}function h(a){if(a.contents().length){var b=a.contents(),c=b.eq(b.length-1);return c.filter(j).length?c:h(c)}a.append("");var b=a.contents();return b.eq(b.length-1)}function g(b){var c=h(b);if(c.length){var d=c.get(0).nodeValue,e=d.lastIndexOf(" ");e>-1?(d=a.trim(d.substring(0,e)),c.get(0).nodeValue=d):c.get(0).nodeValue="";return!0}return!1}function f(b,c){var d=b.data("jqae");d||(d={});var e=d.wrapperElement;e||(e=b.wrapInner("<div/>").find(">div"),e.css({margin:0,padding:0,border:0}));var f=e.data("jqae");f||(f={});var j=f.originalContent;j?e=f.originalContent.clone(!0).data("jqae",{originalContent:j}).replaceAll(e):e.data("jqae",{originalContent:e.clone(!0)}),b.data("jqae",{wrapperElement:e,containerWidth:b.width(),containerHeight:b.height()});var k=b.height(),l=(parseInt(b.css("padding-top"),10)||0)+(parseInt(b.css("border-top-width"),10)||0)-(e.offset().top-b.offset().top),m=!1,n=e;c.selector&&(n=a(e.find(c.selector).get().reverse())),n.each(function(){var b=a(this),d=b.text(),f=!1;if(e.innerHeight()-b.innerHeight()>k+l)b.remove();else{i(b);if(b.contents().length){m&&(h(b).get(0).nodeValue+=c.ellipsis,m=!1);while(e.innerHeight()>k+l){f=g(b);if(!f){m=!0,b.remove();break}i(b);if(b.contents().length)h(b).get(0).nodeValue+=c.ellipsis;else{m=!0,b.remove();break}}c.setTitle=="onEllipsis"&&f||c.setTitle=="always"?b.attr("title",d):c.setTitle!="never"&&b.removeAttr("title")}}})}var b={},c,d=!1,e={ellipsis:"...",setTitle:"never",live:!1};a.fn.ellipsis=function(b,c){var d,g;d=a(this),typeof b!="string"&&(c=b,b=undefined),g=a.extend({},e,c),g.selector=b,d.each(function(){var b=a(this);f(b,g)}),g.live?k(d.selector,g):l(d.selector);return this}})(jQuery);
/*
 * ##### Sasson - advanced drupal theming. #####
 *
 * Tikal scripts.
 *
 */

(function($) {

  /*------------------------------------------  General --------------------------------------------*/
  
  //Menu target
  Drupal.behaviors.externalMenu = {
	  attach: function (context, settings) { 
		 $("a[href^='http']").each(function(){ $(this).attr('target','_blank'); });
	  }
  }; 

  // Ellipsis
  Drupal.behaviors.tikalEllipsis = {
     attach: function (context, settings) {
		$('.view-our-team .about').each(function(){	$(this).ellipsis();	});
		$('.user-profile-filed-about').each(function(){	$(this).ellipsis(); });
		$('#block-views-offering-domains .views-field-title').each(function(){ $(this).ellipsis(); });
		$('.highlight .line').each(function(){ $(this).ellipsis(); });
	}
  };

  // Show Captcha
  Drupal.behaviors.tikalShowCaptcha= {
     attach: function (context, settings) {
		var is_empty = false, captcha_hide;
		$('form').each(function(){
			var form = $(this);
			$('.form-text, textarea',form).focus(function(){
						clearInterval(captcha_hide);
						$('.captcha',form).slideDown("slow");
						is_empty = false;
			});
			$('.form-text, textarea',form).focusout(function(){
					if($('.form-text[value!=""]',form).length == 0 && $('textarea[value!=""]',form).length == 0)
						is_empty = true;
					else{
						is_empty = true;
									$('.form-text[value!=""]',form).each(function(){
										if($(this).val() != $(this).attr('placeholder'))
											is_empty = false;
									});
								}
					if( is_empty){
						captcha_hide = setInterval(function(){ $('.captcha',form).slideUp("slow");},500);
					}
			});
		});
     }
  };

  // Placeholder for IE7 and IE8
  Drupal.behaviors.tikalPlaceholder= {
     attach: function (context, settings) {
		$('input[placeholder]').each(function(){  
			var input = $(this);        
			$(input).val(input.attr('placeholder'));       
			$(input).focus(function(){
				if (input.val() == input.attr('placeholder'))
					input.val('');
			});
			$(input).blur(function(){
				if (input.val() == '' || input.val() == input.attr('placeholder'))
					input.val(input.attr('placeholder'));
			});
		});
		$('.form-submit').click(function(){  
			var input = $(this);        
			if(input.attr('placeholder') == input.val()) input.val() = '';
		});
     }
  };


  // Menu Scroll To
  Drupal.behaviors.tikalScrollTo = {
     attach: function (context, settings) {
	$("#sidebar-first ul.menu li").click(function (e) {
	  if(!($("body").hasClass("node-type-offering") || $("body").hasClass("node-type-job"))){
	  	e.preventDefault();
	  }	
	  var href = $(this).find('a').attr('href');
	  path = href.substring(href.indexOf('#'));
	  $(window).scrollTo(path, 800);
	});
	$(".comments-link-in-page").click(function (e) {
	  e.preventDefault();
	  var href = $(this).attr('href');
	  path = href.substring(href.indexOf('#'));
	  $(window).scrollTo(path, 800);
	});

	var fixScrollTo = 0;
	$("#sidebar-second ul.menu li").click(function (e) {
	  if(!($("body").hasClass("node-type-offering") || $("body").hasClass("node-type-job"))){
	  	e.preventDefault();
	  }	
	  var href = $(this).find('a').attr('href');
	  path = '.' + href.substring(href.indexOf('#') + 1);
	  fixScrollTo =  $(path).offset().top + (-60);
	  $(window).scrollTo(fixScrollTo , 800);
	});
   }
  };

  /*------------------------------------------  Articles --------------------------------------------*/

  //Load more articles
  Drupal.behaviors.tikalLoadMore= {
     attach: function (context, settings) {
		if($('.view-article .pager-current').hasClass('first')){
			$(".view-article .pager").css({"display" : 'none'});
			var pagerNext ="<a class='load-more' href='" + $(".view-article .pager-next a").attr('href') + "'> Load more </a>";
			$(".view-article .item-list").html(pagerNext);
			$(".view-article .item-list").ellipsis();
		}
	}
  };

  // Facebook Comments Count
  Drupal.behaviors.facebookCommentsCount = {
	  attach: function (context, settings) {
		var count_comments;
		////--- node Comments-Count ---/////
		//function nodeCommentsCount()
		function nodeCommentsCount() {
			$.ajax({ url: 'http://graph.facebook.com/'+ window.location, dataType: 'jsonp', success: function(data) {
					//console.log(data);
					count_comments = data.comments;//data.shares;
					if(count_comments >= 0 || count_comments < 0){
						$('.comments-link-in-page .count').html(Number($('.comments-link-in-page .count').attr('drupalCount')) + Number(count_comments));
					}
				}
			});
		}
		//load page
		if($('body').hasClass('node-type-article')){
			$('.comments-link-in-page .count').attr('drupalCount' ,$('.comments-link-in-page .count').html());
			nodeCommentsCount();
			//timer
			window.setInterval(nodeCommentsCount, 30000);
		}	
		////--- viewRows Comments-Count ---/////	
		var node_url = '';
		var all_rows = $('.view-id-article .views-row');
 		for (i = 0; i < all_rows.length; i++) {
			node_url = 'http://' + window.location.hostname + $(all_rows[i]).find('.views-field-title a').attr('href');	
			$.ajax({ url: 'http://graph.facebook.com/'+ node_url, dataType: 'jsonp', success: function(data) {
				//console.log(data);
				count_comments = data.comments;//data.shares;
				if(count_comments >= 0 || count_comments < 0)
					insertCount(data.id,count_comments);
			}});
		}
		// insertCount
		function insertCount(node_url,count){
			node_url = node_url.replace(window.location.protocol+'//'+window.location.hostname,"");	
			row = $('.view-id-article .views-row a.comments').filter('[href="'+node_url+'#comments"]');
			//console.log(row);
			$(row).find('.count-comment').html(Number($(row).find('.count-comment').html()) + Number(count));
		}
	  }
  };

  /*------------------------------------------  Events --------------------------------------------*/

  //ajax Load more events
  Drupal.behaviors.tikalLoadMoreEvents= {
     attach: function (context, settings) {
     	var ofsetEvents = 0;
     	var startEvents = 3;
     	var addEvents = 3; 
     	var countEvents = 0;
     
     	$.getJSON('events/0/' + startEvents , function(data) {
		  		$("#events-from-meetup").append(data.moreEvents);
				ofsetEvents = data.ofset; countEvents = data.count;
		});
		$("#load-more-events").click(function(){
			if(countEvents <= ofsetEvents + addEvents){
				addEvents  = countEvents - ofsetEvents; $("#load-more-events").remove();
			}
		    $.getJSON('events/' + ofsetEvents + '/'+ addEvents, function(data) {
		  		$("#events-from-meetup").append(data.moreEvents);
				ofsetEvents = data.ofset; countEvents = data.count; 
                                //console.log(data);
		    });
  		});
  		$("html").bind("ajaxStart", function(){
			$(this).css({"cursor" : "wait"}); }).bind("ajaxStop", function(){ $(this).css({"cursor" : "auto"});
		});
		$("#load-more-events").bind("ajaxStart", function(){
			$(this).css({"cursor" : "wait"}); }).bind("ajaxStop", function(){ $(this).css({"cursor" : "pointer"});
		});
 	}
  };

  // Slide down More Upcoming Events
  Drupal.behaviors.tikalMoreUpcomingEvents = {
     attach: function (context, settings) {
		$(".event-more-upcoming-events").click(function () {
			 if ($(".more-events").is(":hidden")) $(".more-events").slideDown(800);
			 else $(".more-events").slideUp(800); 
		});
    }
  };

  // Display events upcoming or past
  Drupal.behaviors.tikalDisplayEventsUpcomingOrPast = {
     attach: function (context, settings) {
		if($(".button-upcoming").hasClass("active")) $(".events-upcoming").css({"display" : 'block'});
		else $(".events-past").css({"display" : 'block'});
		$(".switch-events").click(function () {
		 	if ($(this).hasClass("button-upcoming")){ 
			 	$(this).addClass("active"); $(".events-upcoming").css({"display" : 'block'});
			 	$(".button-past").removeClass("active"); $(".events-past").css({"display" : 'none'});
			 }
			 else{
				$(this).addClass("active"); $(".events-past").css({"display" : 'block'});
			 	$(".button-upcoming").removeClass("active"); $(".events-upcoming").css({"display" : 'none'});
			 }
		});
     }
  };

  /*-------------------------------  Slide down / carousel -----------------------------------*/

  // Slide down  our-values
  Drupal.behaviors.tikalOpenMenu = {
     attach: function (context, settings) {
		$("#our-core-values .field-first, #our-values .field-first, .views-field-field-fields-in-our-core-values .field-first, .views-field-field-our-values .field-first").click(function () {
			if ($(this).next().is(":hidden")){ $(this).next().slideDown("slow");}
			else{ $(this).next().slideUp("slow");}}
		);
    }
  };

  // Scroll items
  Drupal.behaviors.tikalScrollItems = {
   attach: function (context, settings) { 
		var jumpItems = 2;
		var countItems = 1;
		var numItems= $(".carousel-vertical .views-row").length;

		if($("body").hasClass("node-type-job")){
				jumpItems = 3;	
		}
		if(numItems > jumpItems)
			$(".carousel-vertical .jcarousel-next").addClass("jcarousel-has-next");
	
		$(".carousel-vertical .jcarousel-next").click(function (){	
			if(jumpItems + countItems < numItems) {
				countItems += jumpItems;
				$(".view-content-limit").scrollTo(".views-row-" + countItems,800);
				if(!$(".carousel-vertical .jcarousel-prev").hasClass("jcarousel-has-prev"))
			 		$(".carousel-vertical .jcarousel-prev").addClass("jcarousel-has-prev");
			}
			else{
				countItems = numItems;
				$(".view-content-limit").scrollTo(".views-row-" + numItems,800);
			}
			if(countItems == numItems){
				$(this).removeClass("jcarousel-has-next");
			}	
		});
		$(".carousel-vertical .jcarousel-prev").click(function (){	
			if(countItems - jumpItems < numItems && countItems - jumpItems > 0) {
				countItems -= jumpItems;
				$(".view-content-limit").scrollTo(".views-row-" + countItems,800);
				if(!$(".carousel-vertical .jcarousel-next").hasClass("jcarousel-has-next"))
			 		$(".carousel-vertical .jcarousel-next").addClass("jcarousel-has-next");
			}
			else{
				countItems = 1;
				$(".view-content-limit").scrollTo(".views-row-" + countItems,800);
			}
			if(countItems == 1){
				$(this).removeClass("jcarousel-has-prev");
			}		
		});
  }
  };

})(jQuery);

;
