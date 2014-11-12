---
layout: post
title: Google Analytics for Flex - Support for Flex 4.5
created: 1316095794
permalink: google-analytics-for-flex-support-for-flex-4-5
tags:
- JS
- Google Analytics
- gaforflash
- Flex 4.5
---
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">
<p>While trying to use <a href="http://code.google.com/apis/analytics/docs/tracking/flashTrackingIntro.html">Google Analytics Tracking for Adobe Flash</a>&nbsp;it turned out that it does not support Flex 4.5.</p>
It throws the following exception:
<div style="text-align: left; line-height: normal; unicode-bidi: embed; direction: ltr">ReferenceError: Error #1065: Variable Application is not defined.</div>
<div style="text-align: left; line-height: normal; unicode-bidi: embed; direction: ltr"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at global/flash.utils::getDefinitionByName()</span></div>
<div style="text-align: left; line-height: normal; unicode-bidi: embed; direction: ltr"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at com.google.analytics.components::FlexTracker()[/buRRRn/projects/GAforFlash/GA_AS3/build/tmp/com/google/analytics/components/FlexTracker.as:102]</span></div>
</div>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">Looking at the project's <a href="http://code.google.com/p/gaforflash/issues/list">issue tracker</a>, we found the <a href="http://code.google.com/p/gaforflash/issues/detail?id=88">unresolved bug (88)</a> with this same exception.</div>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">Looking at the code, the solution was quite simple &ndash; The original FlexTracker was looking for the mx.core::Application class in order to get a reference to the Application instance:</div>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
 var appclass:Object = getDefinitionByName( &quot;mx.core::Application&quot; );
 _app = appclass.application;
</pre>
<p>&nbsp;</p>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">Now, Flex 4.5 no longer uses this class of course; it is now using FlexGlobals.topLevelApplication for getting a reference to the Application instance.</div>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">Wrapping the code with a try/catch with supporting Flex 4.5 resulted with the following code which resolved the issue:</div>
<pre class="brush: jscript;" title="code">
var appclass:Object;
try{//Flex 3
    	appclass = getDefinitionByName( &quot;mx.core::Application&quot; );
	_app = appclass.application;
}
catch (e:Error)
{//Flex 4.5
      appclass = getDefinitionByName( &quot;mx.core::FlexGlobals&quot; );
      _app = appclass.topLevelApplication;
}

</pre>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">&nbsp;</div>
</div>
<div style="text-align: left; margin: 0in 0in 10pt; unicode-bidi: embed; direction: ltr">&nbsp;</div>
