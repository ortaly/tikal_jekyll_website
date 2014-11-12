---
layout: post
title: Transition events
created: 1405937513
author: ziv
permalink: transition-events
tags:
- JS
---
<p>Nothing is more eye compelling then a nice animation don&rsquo;t you think?<br />
Up until few years ago most of web page animation where done by Flash or JavaScript libraries like jQuery.<br />
Today we all know that using CSS3 we can add transition and event keyframe animations.</p>

<p>When I first started to work with transition I didn&rsquo;t expect to find any problem (ye ye as long as I&rsquo;m not using IE 8/9), However event transition are in satisfactory and cause problems.</p>

<p>W3C transition expose only one event transitionend and each browser support this event with a slight name change: transitionend , oTransitionEnd , webkitTransitionEnd</p>

<h1>Simple transaction</h1>

<p>If you apply a principle like &ldquo;separation of concerns&rdquo; when implementing both JavaScript&nbsp;and CSS3 you will end up writing something like this</p>

<blockquote>
<p>function disableTillDoneAnimation(){<br />
&nbsp; &nbsp;$(&#39;#exit&#39;).attr(&quot;disabled&quot;, &quot;disabled&quot;);<br />
&nbsp; &nbsp;$(&#39;#enter&#39;).attr(&quot;disabled&quot;, &quot;disabled&quot;);<br />
&nbsp; &nbsp;$(&#39;.box&#39;).one(&#39;transitionend &#39;,function(){<br />
&nbsp; &nbsp; &nbsp;//do some real work<br />
&nbsp; &nbsp; &nbsp;$(&#39;#exit&#39;).removeAttr(&quot;disabled&quot;); &nbsp; &nbsp;<br />
&nbsp; &nbsp; &nbsp;$(&#39;#enter&#39;).removeAttr(&quot;disabled&quot;); &nbsp; &nbsp;<br />
&nbsp; &nbsp;});<br />
&nbsp;}<br />
$(function(){<br />
&nbsp; $(&#39;#exit&#39;).click(function(){<br />
&nbsp; &nbsp; $(&#39;.box&#39;).addClass(&#39;exitAnimation&#39;); &nbsp; &nbsp;<br />
&nbsp; &nbsp; disableTillDoneAnimation();<br />
&nbsp; });<br />
&nbsp; $(&#39;#enter&#39;).click(function(){<br />
&nbsp; &nbsp; $(&#39;.box&#39;).removeClass(&#39;exitAnimation&#39;);<br />
&nbsp; &nbsp; disableTillDoneAnimation();<br />
&nbsp; });<br />
});</p>
</blockquote>

<p>Where the css is</p>

<blockquote>
<p>.animationContainer{<br />
&nbsp; width:400px;<br />
&nbsp; height:100px;<br />
&nbsp; overflow:hidden;<br />
&nbsp; position:absolute;<br />
}<br />
.box{<br />
&nbsp; width:50px;<br />
&nbsp; height:50px;<br />
&nbsp; position:relative;<br />
&nbsp; /* vendor prefixes excluded for brevity */<br />
&nbsp; transition: left 2s ;<br />
&nbsp; left:0%;<br />
}<br />
.exitAnimation{&nbsp;&nbsp;<br />
&nbsp; &nbsp; left:100%;<br />
}</p>
</blockquote>

<p>&nbsp;</p>

<p>I used the &ldquo;one&rdquo; and not the &ldquo;on&rdquo; method so that the listener will be removed after the event is fired preventing getting called more than once.</p>

<h1>The problem</h1>

<p>So what is wrong with one event? Way do you need more?&nbsp;<br />
The problem is that it does not always get fired.</p>

<p>How is it possible that I add a transaction class and still the event doesn&#39;t get fired.&nbsp;<br />
The answer is written in the event documentation:</p>

<p><a href="https://developer.mozilla.org/en-US/docs/Web/Events/transitionend">&ldquo;<strong><span style="background-color:#FFFF00;">In the case where a transition is removed before completion, such as if the transition-property is removed, then the event will not fire</span></strong>&rdquo;</a><br />
Meaning unless you know by advance that the change you are making to the DOM element will cause a transition you can&rsquo;t rely on this event.</p>

<p>This mean that if the toggled class does not cause an animation due to user clicking the button twice in a row or the &ldquo;other&rdquo; programmer who created the css didn&rsquo;t think about the animation you end up waiting for an event that will never happen.</p>

<h1>IE solution</h1>

<p>For me this is unacceptable. So I started looking for a way to always receive transitionend.<br />
To my amazement IE had a solution. IE &gt; 10 gives you <a href="http://msdn.microsoft.com/en-us/library/ie/dn632683(v=vs.85).aspx">transitionstart </a>event that is called when the transition start.</p>

<p>With this ability we can change the code to</p>

<blockquote>
<p>&nbsp;function disableTillDoneAnimation() {<br />
&nbsp; $(&#39;.box&#39;).one(&#39;transitionstart &#39;, function() {<br />
&nbsp; &nbsp; $(&#39;#exit&#39;).attr(&quot;disabled&quot;, &quot;disabled&quot;);<br />
&nbsp; &nbsp; $(&#39;#enter&#39;).attr(&quot;disabled&quot;, &quot;disabled&quot;);<br />
&nbsp; });<br />
&nbsp; $(&#39;.box&#39;).one(&#39;transitionend &#39;, function() {<br />
&nbsp; &nbsp; //do some real work<br />
&nbsp; &nbsp; $(&#39;#exit&#39;).removeAttr(&quot;disabled&quot;);<br />
&nbsp; &nbsp; $(&#39;#enter&#39;).removeAttr(&quot;disabled&quot;);<br />
&nbsp; });<br />
}</p>
</blockquote>

<h1>Chrome &amp; Firefox solution</h1>

<p>How can we solve this in other browsers?&nbsp;<br />
No build in solution is given so I have come up with 2 workaround and would love to hear more suggestion from anyone else.</p>

<p><span style="line-height: 1.6em;">Transition is performed on absolute values (number, percentage, color, length, etc&hellip;) and not on intermediate transition values (auto, block, etc &hellip;)</span></p>

<p>So why not calculate by ourselves the difference between the current element style and the style after transition.</p>

<h2>Option 1</h2>

<p><br />
1.&nbsp;&nbsp; &nbsp;We calculate the current element style using getComputedStyle.<br />
2.&nbsp;&nbsp; &nbsp;We add the class responsible for the animation<br />
3.&nbsp;&nbsp; &nbsp;getComputedStyle return the current used values of the elements so we must wait for a few mill-second more than the transition-delay to let the animation take effect.&nbsp;<br />
4.&nbsp;&nbsp; &nbsp;We recalculate the element style.<br />
5.&nbsp;&nbsp; &nbsp;If there is a difference between the start and current style the animation has started and we can trigger our own custom transitionstart event.</p>

<blockquote>
<p>$(function(){<br />
&nbsp; $(&#39;#exit&#39;).click(function(){<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; var $box = $(&#39;.box&#39;);<br />
&nbsp; &nbsp; //step 1<br />
&nbsp; &nbsp; var baseStyle = getElementStyles($box[0]);<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; disableTillDoneAnimation();<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; //step 2<br />
&nbsp; &nbsp; $box.addClass(&#39;exitAnimation&#39;);<br />
&nbsp; &nbsp; var delay = &nbsp;$box.css(&#39;transition-delay&#39;);<br />
&nbsp; &nbsp; delay = parseFloat(delay);<br />
&nbsp; &nbsp; //step 3<br />
&nbsp; &nbsp; setTimeout(function(){<br />
&nbsp; &nbsp; &nbsp; //step 4<br />
&nbsp; &nbsp; &nbsp; var animatedStyle = getElementStyles($box[0]);<br />
&nbsp; &nbsp; &nbsp; //step 5<br />
&nbsp; &nbsp; &nbsp; if (!$.isEmptyObject(styleDifference(baseStyle,animatedStyle))){<br />
&nbsp; &nbsp; &nbsp; $box.trigger(&quot;transitionstart&quot;);<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; },delay * 1000 + 100);<br />
&nbsp; });<br />
});</p>

<p>//Method taken from jQuery ui<br />
function getElementStyles( elem ) {<br />
&nbsp;&nbsp; &nbsp;var key, len,<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;style = elem.ownerDocument.defaultView ?<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;elem.currentStyle,<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;styles = {};</p>

<p>&nbsp;&nbsp; &nbsp;if ( style &amp;&amp; style.length &amp;&amp; style[ 0 ] &amp;&amp; style[ style[ 0 ] ] ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;len = style.length;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while ( len-- ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;key = style[ len ];<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if ( typeof style[ key ] === &quot;string&quot; ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;styles[ $.camelCase( key ) ] = style[ key ];<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;}&nbsp;</p>

<p>&nbsp;&nbsp; &nbsp;return styles;<br />
}</p>

<p>//Method taken from jQuery ui<br />
function styleDifference( oldStyle, newStyle ) {<br />
&nbsp;&nbsp; &nbsp;var diff = {}, name, value;<br />
&nbsp;&nbsp; &nbsp;var shorthandStyles = {border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1,&nbsp;<br />
&nbsp;&nbsp; &nbsp; &nbsp;borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1&nbsp;&nbsp; &nbsp;}</p>

<p>&nbsp;&nbsp; &nbsp;for ( name in newStyle ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;value = newStyle[ name ];<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if ( oldStyle[ name ] !== value ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if ( !shorthandStyles[ name ] ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;diff[ name ] = value;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;}</p>

<p>&nbsp;&nbsp; &nbsp;return diff;<br />
}</p>
</blockquote>

<h2>Option 2</h2>

<p>1.&nbsp;&nbsp; &nbsp;We add the class responsible for animation.<br />
2.&nbsp;&nbsp; &nbsp;We change the element display to none<br />
3.&nbsp;&nbsp; &nbsp;We request the current computed style causing the browser to recalculate the element location while display is none thus skipping the animation.<br />
4.&nbsp;&nbsp; &nbsp;We return the element back to its original state by removing the class responsible for animation and changing the display property back.<br />
5.&nbsp;&nbsp; &nbsp;We again request the current computed style causing the browser to relies that everything is back to normal<br />
6.&nbsp;&nbsp; &nbsp;If the 2 calculated styles are different we can fire the transitionstart event.<br />
7.&nbsp;&nbsp; &nbsp;We add the animation class this time we let the browser to the real work.</p>

<blockquote>
<p>$(function(){<br />
&nbsp; $(&#39;#exit&#39;).click(function(){<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; var $box = $(&#39;.box&#39;);<br />
&nbsp; &nbsp; var currDisplayStyle = $box.css(&#39;display&#39;);<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; //step 1<br />
&nbsp; &nbsp; $(&#39;.box&#39;).addClass(&#39;exitAnimation&#39;);<br />
&nbsp; &nbsp; //step 2<br />
&nbsp; &nbsp; $box.css(&#39;display&#39;,&#39;none&#39;);<br />
&nbsp; &nbsp; //step 3<br />
&nbsp; &nbsp; var animatedStyle = getElementStyles($box[0]);<br />
&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; //step 4<br />
&nbsp; &nbsp; $box.removeClass(&#39;exitAnimation&#39;);<br />
&nbsp; &nbsp; $box.css(&#39;display&#39;,currDisplayStyle);<br />
&nbsp; &nbsp; //step 5<br />
&nbsp; &nbsp; var baseStyle = getElementStyles($box[0]);<br />
&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; disableTillDoneAnimation();<br />
&nbsp; &nbsp; //step 6<br />
&nbsp; &nbsp; if (!$.isEmptyObject(styleDifference(baseStyle,animatedStyle))){<br />
&nbsp; &nbsp; &nbsp; $box.trigger(&quot;transitionstart&quot;);<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; //step 7<br />
&nbsp; &nbsp; $box.addClass(&#39;exitAnimation&#39;);</p>

<p>&nbsp; });<br />
});</p>
</blockquote>

<h1>Summary</h1>

<p>What is still missing? transitioncancel.<br />
The code is great but if something will cancel the transition after it started and before it end we will not get the transitionend event.<br />
For this I have no solution other than monitoring the animation to make sure we still see changes between each interval.</p>

<p>&nbsp;</p>
