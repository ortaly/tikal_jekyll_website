---
layout: post
title: Rendering performance optimization
created: 1300231400
author: vladislavm
permalink: "/js/rendering-performance-optimization"
tags:
- JS
- Sprite
- rendering
- performance
- optimization
- movieclip
- Caching
- bitmap
---
<p>&nbsp;<span style="mso-spacerun:yes">&nbsp; </span><span style="font-family: Verdana; ">Most of us are familiar with CPU consuming problem in Flash applications. There are cases, when you have nothing to do with, but in few cases you can use well known solution &ndash; <b>cacheAsBitmap</b>. It prevents object re-rendering in case a shape and content are never changed.</span></p>
<p><span style="font-family: Verdana; "><br type="_moz" />
</span></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><span style="font-family: Verdana; ">&nbsp;&nbsp;There is a case when caching of <strong>Sprite </strong>object doesn't always solve the problem. What if your sprite contains different types of elements and all elements are static (no shape or position changes)? Does caching as bitmap of the Sprite will help to improve object rendering performance? The answer is yes, but there is a little nuance. </span></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><span style="font-family: Verdana; "><br type="_moz" />
</span></p>
<p class="MsoNormal" style="text-align:justify;direction:ltr;unicode-bidi:embed"><span style="font-family: Verdana; ">&nbsp; The case &ndash; you have some Sprite with a lot of (thousands of) elements and any scrolling over the sprite causes to browser to &quot;get in shock&quot;. Why so? Every movement of the object causes to flash to re-render the whole Sprite (including children elements) from the scratch. So you see as during the scrolling the CPU time jumps by tens of percents. </span></p>
<p class="MsoNormal" style="text-align:justify;direction:ltr;unicode-bidi:embed"><span style="font-family: Verdana; "><br type="_moz" />
</span></p>
<p class="MsoNormal" style="text-align:justify;direction:ltr;unicode-bidi:embed"><span style="font-family: Verdana; ">The solution is to cache the Sprite as bitmap, this suppose to stop re-rendering and to use cached bitmap - the snapshot of the sprite. Right? Wrong. If the Sprite contains <b>movieClip</b> objects, you have to cache as bitmap </span>the main Sprite and&nbsp;every movieClip object always, one-by-one. So the caching function may be as following:</p>
<p class="MsoNormal" style="text-align:justify;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<pre title="code" class="brush: java;">
			private function cacheYourSprite(mySprite:Sprite):void
			{
				for (var childsCounter:int=0; childsCounter &lt; mySprite.numChildren; childsCounter++)
				{
					if (mySprite.getChildAt(childsCounter) is MovieClip)
						(mySprite.getChildAt(childsCounter) as MovieClip).cacheAsBitmap = true;
				}
				
				mySprite.cacheAsBitmap = true;
			}
</pre>
<p>&nbsp;</p>
<p><span style="font-family: Verdana; ">Best Regards and Good Application Performance, </span></p>
<p><span style="font-family: Verdana; ">Vlad</span></p>
<p>&nbsp;</p>
