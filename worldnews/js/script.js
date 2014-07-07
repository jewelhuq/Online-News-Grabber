(function(f){function p(a,b,c){var h=c.relative?a.position().top:a.offset().top,d=c.relative?a.position().left:a.offset().left,i=c.position[0];h-=b.outerHeight()-c.offset[0];d+=a.outerWidth()+c.offset[1];if(/iPad/i.test(navigator.userAgent))h-=f(window).scrollTop();var j=b.outerHeight()+a.outerHeight();if(i=="center")h+=j/2;if(i=="bottom")h+=j;i=c.position[1];a=b.outerWidth()+a.outerWidth();if(i=="center")d-=a/2;if(i=="left")d-=a;return{top:h,left:d}}function u(a,b){var c=this,h=a.add(c),d,i=0,j=
0,m=a.attr("title"),q=a.attr("data-tooltip"),r=o[b.effect],l,s=a.is(":input"),v=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),k=b.events[t]||b.events[s?v?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';k=k.split(/,\s*/);if(k.length!=2)throw"Tooltip: bad events configuration for "+t;a.bind(k[0],function(e){clearTimeout(i);if(b.predelay)j=setTimeout(function(){c.show(e)},b.predelay);else c.show(e)}).bind(k[1],function(e){clearTimeout(j);if(b.delay)i=
setTimeout(function(){c.hide(e)},b.delay);else c.hide(e)});if(m&&b.cancelDefault){a.removeAttr("title");a.data("title",m)}f.extend(c,{show:function(e){if(!d){if(q)d=f(q);else if(b.tip)d=f(b.tip).eq(0);else if(m)d=f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else{d=a.next();d.length||(d=a.parent().next())}if(!d.length)throw"Cannot find tooltip for "+a;}if(c.isShown())return c;d.stop(true,true);var g=p(a,d,b);b.tip&&d.html(a.data("title"));e=e||f.Event();e.type="onBeforeShow";
h.trigger(e,[g]);if(e.isDefaultPrevented())return c;g=p(a,d,b);d.css({position:"absolute",top:g.top,left:g.left});l=true;r[0].call(c,function(){e.type="onShow";l="full";h.trigger(e)});g=b.events.tooltip.split(/,\s*/);if(!d.data("__set")){d.bind(g[0],function(){clearTimeout(i);clearTimeout(j)});g[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&d.bind(g[1],function(n){n.relatedTarget!=a[0]&&a.trigger(k[1].split(" ")[0])});d.data("__set",true)}return c},hide:function(e){if(!d||!c.isShown())return c;
e=e||f.Event();e.type="onBeforeHide";h.trigger(e);if(!e.isDefaultPrevented()){l=false;o[b.effect][1].call(c,function(){e.type="onHide";h.trigger(e)});return c}},isShown:function(e){return e?l=="full":l},getConf:function(){return b},getTip:function(){return d},getTrigger:function(){return a}});f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(e,g){f.isFunction(b[g])&&f(c).bind(g,b[g]);c[g]=function(n){n&&f(c).bind(g,n);return c}})}f.tools=f.tools||{version:"1.2.5"};f.tools.tooltip=
{conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,c){o[a]=[b,c]}};var o={toggle:[function(a){var b=this.getConf(),c=this.getTip();b=b.opacity;b<1&&c.css({opacity:b});c.show();a.call()},function(a){this.getTip().hide();
a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,a)}]};f.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=f.extend(true,{},f.tools.tooltip.conf,a);if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){b=new u(f(this),a);f(this).data("tooltip",b)});return a.api?b:this}})(jQuery);

function playVid(vidId, noBlackout) {
	if (_vidPane==null) {
	    _vidPane=document.getElementById('vidPane');
        if (!_vidPane) {
	        var tbody = document.getElementsByTagName("body")[0];
            tnode = document.createElement('div');
            tnode.id='vidPane';
            tnode.className='vidFrame';
            tbody.appendChild(tnode);
            _vidPane=document.getElementById('vidPane');
            _vidPane.style.position='absolute';
            _vidPane.style.display='none';
            _vidPane.style.zIndex='100';
            _vidPane.style.backgroundColor='#fff';
            _vidPane.style.width='435px';
            _vidPane.style.height='372px';
            _vidPane.style.fontFamily='verdana';
            _vidPane.style.fontSize='11px';
        }

        _blackout=document.getElementById('blackout');

        if (!_blackout) {
	        tnode = document.createElement('div');
            tnode.id='blackout';
            tbody.appendChild(tnode);
            _blackout=document.getElementById('blackout');
            _blackout.style.position='absolute';
            _blackout.style.display='none';
            _blackout.style.left='0px';
            _blackout.style.top='0px';
            _blackout.style.backgroundColor='#000';
            _blackout.style.opacity='.9';
            _blackout.style.filter='alpha(opacity=90)';
            _blackout.style.zIndex='50';
		}

        _vidPane.style.top='75px';
        _vidPane.style.left='75px';
	}

	if (vidId==null) { 
        _vidPane.style.display='none';
        _vidPane.innerHTML='';
        _blackout.style.display='none';
    } else {
		vidId=vidId.href;

        if (!noBlackout) {
	        _blackout.style.width='100%';
            _blackout.style.height=(document.body.offsetHeight<screen.height) ? screen.height+'px' : document.body.offsetHeight+20+'px'; 
            _blackout.style.display='block';
        } else {
            _blackout.style.display='none';
        }
        
		var vidInfo = vidId.split('/');
              
        var vidstring ='<center><embed style="margin-top: 5px;"';  
        vidstring+=' enableJavascript="false" allowScriptAccess="never"';
        vidstring+=' allownetworking="internal" type="application/x-shockwave-flash"';
        vidstring+=' wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" ';

        if (vidInfo[2].indexOf('youtube.com')>=0) {
        	vidInfo=vidId.match(/v=.+$/);
           	vidInfo=String(vidInfo).replace(/v=/g,'');
           	vidstring+=' src="http://www.youtube.com/v/'+vidInfo+'?fs=1&autoplay=1" ';
           	vidstring+=' height="350" width="425" allowfullscreen="true"></embed></center>';
        } else if (vidInfo[2].indexOf('metacafe.com')>0) {
          	vidInfo=vidId.match(/watch.+$/);
          	vidInfo=String(vidInfo).replace(/watch./,'');
           	vidInfo=String(vidInfo).replace(/.$/,'');
           	vidstring+=' flashVars="playerVars=autoPlay=yes" ';
           	vidstring+=' src="http://www.metacafe.com/fplayer/'+vidInfo+'.swf" ';
           	vidstring+=' width="400" height="345" allowfullscreen="true">';  
           	vidstring+='</embed></center>';
		} else if (vidInfo[2].indexOf('dailymotion.com')>=0) {
           	vidInfo=vidId.match(/video.+$/);
			vidInfo2=vidId.match(/_.+$/);
            vidInfo=String(vidInfo).replace(/video./,'');
            vidInfo=String(vidInfo).replace(vidInfo2,'');
			vidstring+=' src="http://www.dailymotion.com/swf/video/'+vidInfo+'?&autoPlay=1&start=" flashVars="autoStart=1" ';
           	vidstring+=' allowFullScreen="true" height="350" width="425">';
           	vidstring+='</embed></center>';
        } else if (vidInfo[2].indexOf('video.yahoo.com')>=0) {
           	vidInfo=vidId.match(/watch.+$/);
          	vidInfo=String(vidInfo).replace(/watch./,'');
		 	var vidtemp = new Array();
		  	vidtemp = vidInfo.split('/');
		  	vidstring+=' src="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf" ';
           	vidstring+=' allowFullScreen="true" height="350" width="425" flashVars="id='+vidtemp[1]+'&vid='+vidtemp[0]+'&lang=en-us&intl=us&autoPlay=1">';
           	vidstring+='</embed></center>';
        } else if (vidInfo[2].indexOf('vimeo.com')>=0) {
           	vidInfo=vidId.match(/[0-9].+$/);
           	vidstring+=' src="http://vimeo.com/moogaloop.swf?clip_id='+vidInfo+'&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=1&amp;color=00ADEF&amp;fullscreen=1&amp;autoplay=1&amp;loop=0" ';
           	vidstring+=' height="350" width="425" allowfullscreen="true"></embed></center>';
        } else {
           	vidstring += '></embed><BR><BR><BR>Unsupported Video Source.</center>';
        }
            
		vidstring+= '<div style="background:#fff;text-align:right;padding:10px 5px 10px 5px"><A HREF="'+vidId+'" target="_blank"><strong>VIDEO LINK</strong></A> &nbsp;|&nbsp; <A style="color=#555" HREF="#" onClick="return(playVid())"><strong>CLOSE X</strong></A><div>';  
        _vidPane.innerHTML=vidstring;
            
		var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop)
	      	scrollTop = document.documentElement.scrollTop;
        else if (document.body)
	        scrollTop = document.body.scrollTop
            
		_vidPane.style.top=scrollTop+100+'px';
		_vidPane.style.left=((document.body.clientWidth/2)-200)+'px';
        _vidPane.style.display='block'; 
	}
	return(false);
}

function moveHandler(e){
	if (e == null) { e = window.event }
    	if ( _dragOK ){
        	_savedTarget.style.left=e.clientX-_dragXoffset+'px';
            _savedTarget.style.top=e.clientY-_dragYoffset+'px';
            return false;
        }
}
      
function cleanup(e) {
	document.onmousemove=null;
    document.onmouseup=null;
  	_savedTarget.style.cursor=_orgCursor;
    _dragOK=false;
}
      
function dragHandler(e){
    var cursorType='-moz-grabbing';
    if (e == null) { e = window.event; cursorType='move';}
	    var target = e.target != null ? e.target : e.srcElement;
        if (target.className=="vidFrame") {
			_orgCursor=target.style.cursor;
			_savedTarget=target;
			target.style.cursor=cursorType;
			_dragOK=true;
			_dragXoffset=e.clientX-parseInt(_savedTarget.style.left);
			_dragYoffset=e.clientY-parseInt(_savedTarget.style.top);
			document.onmousemove=moveHandler;
			document.onmouseup=cleanup;
			return false;
		}
}

document.onmousedown=dragHandler;

var _savedTarget=null;
var _orgCursor=null;
var _dragOK=false;
var _dragXoffset=0;
var _dragYoffset=0;
var _vidPane = null;
var _blackout= null;