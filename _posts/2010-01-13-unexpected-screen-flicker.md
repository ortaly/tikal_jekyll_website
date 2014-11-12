---
layout: post
title: Unexpected screen flicker
created: 1263396324
author: oren
permalink: /js/unexpected-screen-flicker
tags:
- JS
- style
- slow first time
- performance
- Flickering
---
<p>&nbsp;</p>
<div>Are you experiencing unexpected screen flicker?</div>
<div>Does your component takes a long time to show up on the first time?</div>
<div>&nbsp;</div>
<div>These may be caused by setting a newly created style declaration at runtime, most probably made by third party component you use <span><br />
</span>(we used <a href="http://www.tink.ws/blog/files/flex/PositionedTabNavigatorExample.html#app=e2ef&amp;c8fd-selectedIndex=0">PositionedTabNavigator)<span> </span></a>.</div>
<div>&nbsp;</div>
<div>A common practice for component developers is to specify default styles as follows:</div>
<div>&nbsp;</div>
<div><span>//The component try to get its style</span><span>.</span></div>
<div><b><span>var</span></b><span> style:CSSStyleDeclaration = StyleManager.getStyleDeclaration( </span><b><span>&quot;</span></b><b><span>MyStyle</span></b><b><span>&quot;</span></b><span> );</span></div>
<div>&nbsp;</div>
<div><span>//If not exist, create new style declaration and set it.</span></div>
<div><b><span>if</span></b><span>( !style )</span></div>
<div><span>{</span><span>&nbsp; //You should avoid getting here !!</span></div>
<div><span>style = </span><b><span>new</span></b><span> CSSStyleDeclaration();</span></div>
<div><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; StyleManager.setStyleDeclaration( </span><b><span>&quot;</span></b><b><span>MyStyle</span></b><b><span>&quot;</span></b><span>, style, </span><b><span>true</span></b><span> );</span></div>
<div><span>}</span></div>
<div><b>&nbsp;</b></div>
<div><span>//Set the styles.</span></div>
<div><b><span>if</span></b><span>( style.defaultFactory == </span><b><span>null</span></b><span> )</span></div>
<div><span>{</span></div>
<div><span>style.defaultFactory = </span><b><span>function</span></b><span>():</span><b><span>void</span></b></div>
<div><span>&nbsp;&nbsp; {</span></div>
<div><span>&nbsp;&nbsp; </span><b><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this</span></b><span>.position = </span><b><span>&quot;top&quot;</span></b><span>;&nbsp; </span></div>
<div><span>};</span></div>
<div><span>}</span></div>
<div>&nbsp;</div>
<div>Adobe <a href="http://livedocs.adobe.com/flex/3/html/help.html?content=styles_07.html">docs </a>mention that setStyleDeclaration is computationally expensive and you can prevent Flash Player from applying or clearing the new styles immediately by setting the update parameter to false.</div>
<div>However, when you pass false for the update parameter, the Player stores the selector but does not apply the style, so it might solve your flickering issue, but the style won't be applied.</div>
<div>&nbsp;</div>
<div>In order to both avoid the flicker and get the default style, all you need to do is avoid its creation by specifying the style selector in advance. For example, in your css file add an empty selector:</div>
<div>
<div><b><span>MyStyle</span></b><span> {}</span></div>
<div>&nbsp;</div>
<div>By using an empty style selector, the default style selector will take effect, without creating a new one.</div>
<div>&nbsp;</div>
<div>Any style declared by you in the selector will override the default:</div>
<div>&nbsp;</div>
<div><b><span>MyStyle</span></b><span> {</span></div>
<div>position:bottom;</div>
<div><span>}</span></div>
&nbsp;</div>
<div><span>I'd like to mention that <a href="http://tikalk.tikalknowledge.com/users/ilan">Ilan </a>is a partner in this post.</span></div>
