---
layout: post
title: Loading SWF from Flash CS5
created: 1293008397
author: yoav.moran
permalink: /js/loading-swf-flash-cs5
tags:
- JS
- Flex 4.1
- flex
- Flash skins
- Flash CS5
- Flash
---
<p><span style="border-collapse: separate; color: rgb(102, 102, 102); font-family: 'Times New Roman'; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;" class="Apple-style-span">
<div style="margin: 0px; padding: 0px; font-family: Tahoma,Verdana,Arial,Helvetica,sans-serif; font-size: 75%; font-weight: normal; line-height: 160%; background-color: rgb(255, 255, 255);">
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">During a work on a Flex 4.1 project, I tried to load a skins SWF file using the<span class="Apple-converted-space">&nbsp;</span><em>Loader<span class="Apple-converted-space">&nbsp;</span></em>class. I needed to use the inner UIMovieClips to embed in my Flex application.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">I created a new Flash CS5 project (<em>my_assets.swf</em>), and in it added a movie symbol (<em>my_movie</em>). Then I converted this symbol to Flex movie using Flash&rsquo;s &ldquo;<em>Convert Symbol to Flash Movie</em>&rdquo;.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">To load it in Flex, I used the following code:</span></p>
<p>&nbsp;</p>
<p><span style="font-size: larger;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);" class="Apple-style-span">private function loadIt():void {</span></span></p>
<p class="rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">var myLoader:Loader = new Loader();</span></span></p>
<p class="rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">var myUrlReq:URLRequest = new URLRequest(&quot;my_assets.swf&quot;);</span></span></p>
<p class="rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">myLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoaded);</span></span></p>
<p class="rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">myLoader.load(myUrlReq);</span></span></p>
<p><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">}</span></span></p>
<p><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">private function onLoaded(event:Event):void {</span></span></p>
<p class="rteleft rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">var myCls:Class = event.target.applicationDomain.getDefinition(&quot;my_movie&quot;) as Class</span></span></p>
<p class="rteleft rteindent1"><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">var myMovie:MovieClip = new myCls() as MovieClip;</span></span></p>
<p><span style="font-size: medium;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">}</span></span></p>
<div style="margin: 0px; padding: 0px; position: relative;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">&nbsp;</span></div>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">Alas, when trying to run this code, I got the following error:</span></p>
<p><strong><span style="margin: 0px; padding: 0px; color: rgb(255, 0, 0);">VerifyError: Error #1053: Illegal override of UIMovieClip in mx.flash.UIMovieClip.</span></strong></p>
<div style="margin: 0px; padding: 0px; position: relative;"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">&nbsp;</span></div>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">It took some time to figure out what may have caused the error. When compiling the project in Flex 4.0, no error occurred, so I assumed this may be related to the version of UIMovieClip generated in the swf. I&rsquo;ve looked everywhere trying to change its version to 4.1, but without success.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">I&rsquo;ve stumbled over the solution by mistake, after discovering the SWFLoader&rsquo;s loadForCompatibility property suddenly allows me to load that SWF in Flex 4.1 with no errors whatsoever.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">It seems that the versions are different between the Flash&rsquo;s and Flex&rsquo;s UIMovieClip, but there&rsquo;s no reason to try to create a matching version. The main problem is that the UIMovieClip definition that is loaded from the SWF file tries to override the existing UIMovieClip definition. This wouldn&rsquo;t have happened if the SWF was loaded in a sibling application domain and not in the current application domain.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">One of the usages of sibling application domains is to allow code compiled in different Flex versions to work together. This way different definitions of UIMoveClip can coincide together. You can read more about application domains<span class="Apple-converted-space">&nbsp;</span></span><a style="color: rgb(51, 51, 153); margin: 0px; padding: 0px; text-decoration: none;" href="http://dev.gameafrica.net/uploads/old_stuff/asdoc/html/WS2db454920e96a9e51e63e3d11c0bf619ab-7ffc.html"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">here</span></a><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">.</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 0);">So the solution is easy enough now &ndash; change the load command to add a loader context:</span></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;" class="MsoNormal"><span style="margin: 0px; padding: 0px; color: rgb(0, 0, 255);">myLoader.load(myUrlReq,<span class="Apple-converted-space">&nbsp;</span><strong>new LoaderContext(false, new ApplicationDomain())</strong>);</span></p>
</div>
</span></p>
