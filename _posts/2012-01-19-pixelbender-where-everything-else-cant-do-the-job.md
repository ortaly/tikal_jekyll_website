---
layout: post
title: PixelBender - where everything else can't do the job
created: 1326969622
author: Meir
permalink: pixelbender-where-everything-else-cant-do-the-job
tags:
- JS
- shaders
- pixelbender
- graphics
- flex
- filters
---
<p>This is the first part of a series of posts about PixelBender and how it can take flex graphics rendering to the next stage. The posts are based on a lecture that I gave in <strong>Tikal's flex experts monthly meeting</strong>.</p>
<p>&nbsp;</p>
<p>I ran across PixelBender when looking for a solution for an &quot;exotic&quot; problem - how to paint only specific parts of a component, based on their transparency, in a different color.</p>
<p>&nbsp;</p>
<p>The first try was using shaders, next I tried blending and blend shaders and then even masking and clipping, yet, nothing did the job. Just when I was about to quit, a weird google query led me to PixelBender. At first sight it looked like a complicated, not trivial and problematic technology to use but after spending a few more hours learning it, I found how powerful it is and how easy it is to create cool effects.</p>
<p>&nbsp;</p>
<p>If you are still skeptic and think I overlooked color transforms, try to think about a filter that need a condition or a discreet segmentation of the color space. For example, if pixel[alpha] &lt; 0.5 set color to RED, otherwise BLUE. This can never be achieved by multiplication. Most of this kind of effects can be achieved by writing a few (usually under 10) lines of codes for a PixelBender kernel.</p>
<p>&nbsp;</p>
<p>Following the lecture I realized that hard core flex developers, even if they are world class champions in flex life cycle and MVCS frameworks, are not always familiar with the fine details of graphics and colors. This is why the fist part of the series will deal with colors and layout the foundation for the next posts to come.</p>
<p>&nbsp;</p>
<h2>Colors and color components</h2>
<p>&nbsp;</p>
<p>Each pixel on the screen has a color value. Color value can be specified in a few different methods (or models). The most common one is RGB, or if you want to specify transparency, RGBA. Other mthods include CMYK and the cylindrical HSV and HSL represantation. HSL and HSV are interesting and make lots fo sense but are less common. RGB(A) is the common represantation, used by CSS, flex and most of the UI systems.</p>
<p>&nbsp;</p>
<p>&nbsp;I will focus on RGB representation. RGB stands for Red Green and Blue. Each component is in the range 0-255 (0-FF in hex). A few quick examples:</p>
<p>&nbsp;</p>
<p>Full green: 0x0000FF</p>
<p>Full red: 0xFF0000</p>
<p>Full yellow: 0xFFFF00 (mix red and green equally).</p>
<p>Dim red: 0x880000</p>
<p>&nbsp;</p>
<p>All greys are achieved by mixing the same ammount from each component:</p>
<p>Mid grey: 0x888888</p>
<p>Full bright grey (a.k.a white): 0xFFFFFF</p>
<p>Darkest grey (a.k.a black): 0x000000</p>
<p>&nbsp;</p>
<p>Flex accepts these colors both in the form 0xRRGGBB and #RRGGBB. The 0xRRGGBB notation fits both in as3 expressions and in property (i.e. style) assigments inside mxml while the #RRGGBB fits only in mxml tags. The as3 type to specify colors is uint (unsigned int).</p>
<p>&nbsp;</p>
<p>Before we go on to practical examples and some fun, a word about the A (alpha). Flex is consistant in taking color and alpha separately. This is why all colors in flex are uint (0xRRGGBB) and the transparency is specified by the alpha style property. Alpha is in the range 0-1 &nbsp;when 0 is transparent and 1 is fully opaque.</p>
<p>&nbsp;</p>
<p>To createa a red group that has no transparency (fully opaque), do this:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: xhtml;">
	&lt;s:Group width=&quot;100&quot; height=&quot;100&quot; opaqueBackground=&quot;0xFF0000&quot;/&gt;
</pre>
<p>&nbsp;</p>
<p>Note that flex components use the opaqueBackground property to specify the components background color.</p>
<p>&nbsp;</p>
<p>Before you try this code, there is one more thing to remember, flex groups size is just a &quot;framework&quot;, the group's background works only on the occupied borders, so, to make this group's background visible, you should add something inside it, for example:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
&lt;s:Group width=&quot;100&quot; height=&quot;100&quot; right=&quot;50&quot; bottom=&quot;50&quot; opaqueBackground=&quot;0xFF0000&quot;&gt;
	&lt;s:Rect width=&quot;100&quot; height=&quot;100&quot;/&gt;
&lt;/s:Group&gt;
</pre>
<p>&nbsp;</p>
<p>The rect does the job.</p>
<p>&nbsp;</p>
<p>And here is the result:</p>
<p>&nbsp;</p>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="550" height="400" id="movie_name" align="middle">
<param name="movie" value="http://meirtikalk.cixx6.com/ColorsDemo/SimpleBox.swf" />     <!--[if !IE]>-->     <object type="application/x-shockwave-flash" data="http://meirtikalk.cixx6.com/ColorsDemo/SimpleBox.swf" width="550" height="400">
<param name="movie" value="http://meirtikalk.cixx6.com/ColorsDemo/SimpleBox.swf" />     <!--<![endif]-->         <a href="http://www.adobe.com/go/getflash">             <img alt="Get Adobe Flash player" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" />              <!--[if !IE]>-->     <!--![endif]__comment__end__--></a></object>     <!--<![endif]--> </object><!--![endif]__comment__end__-->
