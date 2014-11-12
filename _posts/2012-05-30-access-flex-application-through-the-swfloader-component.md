---
layout: post
title: Access flex application through the SWFLoader component
created: 1338394544
author: avit
permalink: /access-flex-application-through-swfloader-component
tags:
- Ruby
- web
---
<p>As you know, I’m a <a href='http://www.kensodev.com/about-avi-tzurel/' target='_blank'>web developer</a> and I love learning new stuff and blogging about it here. My blog post for today is about access flex application through the SWFLoader component.</p>

<p>Often you load flex applications through another flex application using the SWFLoader component. It’s not that common knowledge that you can actually access all of that application exactly the same way you are accessing your own application. <h3>What does that mean?</h3> It means you can access that application components, get the children and get a good knowledge on how this application is build. You can also access it’s component and dispatch events. <h3>OK, how?</h3> Let’s start doing it. We will create a simple application, put a SWFLoader on stage and create a listener for the complete event. Lets’s also add 2 global variables - one for SystemManager, another for IUIComponent (I will explain later).</p>

<p>This is what the application code should look like:</p>

<p><span>actionscript3</span> <?xml version="1.0" encoding="utf-8"?> <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" minWidth="955" minHeight="600"> <mx:Script> <<span>CDATA<span>import mx.core.IUIComponent; import mx.managers.SystemManager;</span></span></p>

<pre><code>		private var _systemManager:SystemManager;
		private var _innerApplication:IUIComponent;

		protected function loader_completeHandler(event:Event):void
		{
			_systemManager = SystemManager(loader.content);
		}
	]]&gt;
&lt;/mx:Script&gt;

&lt;mx:SWFLoader id=&quot;loader&quot; source=&quot;VistaRemix.swf&quot; width=&quot;800&quot; height=&quot;600&quot; autoLoad=&quot;true&quot; complete=&quot;loader_completeHandler(event)&quot;/&gt;</code></pre>

<p></mx:Application> <span>/actionscript3</span></p>

<p>As you can probably see, we are assigning a value to <em>systemManager when the loader (SWFLoader) finished loading. This enables us to work with that application system Manager and access properties.</em></p>

<p>Continuing…</p>

<p>We will add 2 Event listeners inside that function:</p>

<p><span>actionscript3</span> <em>systemManager.addEventListener(FlexEvent.APPLICATION</em>COMPLETE, sysManage_ApplicationComplete_Handler); <em>systemManager.addEventListener(FlexEvent.UPDATE</em>COMPLETE, sysManage_UpdateComplete_Handler); <span>/actionscript3</span></p>

<p>Now that we have those in place, let’s add the closure functions:</p>

<p><span>actionscript3</span> private function sysManage_UpdateComplete_Handler(event:FlexEvent):void { <em>innerApplication =</em>systemManager.application; }</p>

<pre><code>		private function sysManage_ApplicationComplete_Handler(event:FlexEvent):void
		{
			_innerApplication = _systemManager.application;
		}</code></pre>

<p><span>/actionscript3</span></p>

<p>Great! Now <em>innerApplication is actually an application. You can get it’s children, get properties, get components, dispatch events and more.</em></p>

<p>This comes in very handy when you want control over an application and you don’t have the source. You can create a clone of that application and create your own GUI for it. It’s an amazing feature!</p>

<p>This here is a screenshot of debugging mode. Check out the debugger watch section, these are all methods you can use on that variable, you can of course use much more.</p>
<a href='http://www.kensodev.com/2010/05/30/access-flex-application-through-the-swfloader-component/screen-shot-2010-05-30-at-7-23-21-pm/' rel='attachment wp-att-464'><img alt='Debug view of the application in Flash builder 4' class='aligncenter size-medium wp-image-464' height='179' src='http://www.kensodev.com/wp-content/uploads/2010/05/Screen-shot-2010-05-30-at-7.23.21-PM-e1275236766248-300x179.png' title='Debug view of the application in Flash builder 4' width='300' /></a>
<p>Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/Bmt3BjqGpw4" height="1" width="1"/>
