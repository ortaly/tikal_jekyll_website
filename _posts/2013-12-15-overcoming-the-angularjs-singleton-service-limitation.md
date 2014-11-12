---
layout: post
title: Overcoming the AngularJS singleton service limitation
created: 1387139609
author: sefi
permalink: overcoming-the-angularjs-singleton-service-limitation
tags:
- JS
- AngularJS
- Javascript
- AngularJS Service
- service
- Singleton
---
<p>As a general rule, Angular services are singletons.<br />
But every once in a while, you need a service that is a new instance every time it is injected.</p>

<p>This can be accomplished by returning a factory function instead of an object:</p>

<p>angular.module(&#39;myApp.Services&#39;)<br />
.factory(&#39;mySrv&#39;, [&#39;&#39;, function() {<br />
&nbsp; &nbsp;<br />
&nbsp; &nbsp;function serviceFactory(conf) {<br />
&nbsp;&nbsp; &nbsp;// logic...<br />
&nbsp; &nbsp; &nbsp; &nbsp; return serviceInstance;<br />
&nbsp; &nbsp;}</p>

<p>&nbsp; &nbsp;return serviceFactory;</p>

<p>}]);</p>

<p>This basically means, that each time the service is injected, what is actually being injected is the factory function.&nbsp;<br />
This allows for calling var instance = mySrv(conf) and getting a new instance.<br />
The $resource service is implemented like this.</p>

<p>Great! Now we get a new instance each time the service is injected! Yeepee! :)</p>

<p>BUT! (there&#39;s always a &#39;but&#39;, isn&#39;t there?)<br />
what if you want to get a new instance SOME OF THE TIME?<br />
What I mean is, that based on some configuration and business logic, you want to be able to decide if you want to return a new instance or reinject an existing one.&nbsp;</p>

<p>This is an extension of the previous example.</p>

<p>angular.module(&#39;myApp.Services&#39;)<br />
.factory(&#39;mySrv&#39;, [&#39;&#39;, function() {</p>

<p>&nbsp; &nbsp; function serviceFactory(instanceName) {<br />
&nbsp;&nbsp; &nbsp;//do some tests and recover or throw error<br />
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br />
&nbsp; &nbsp; &nbsp; &nbsp; return getInstance(instanceName);<br />
&nbsp; &nbsp; }</p>

<p>&nbsp; &nbsp; function getInstance(instanceName) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; if (!instancesMap.hasOwnProperty(instanceName)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; createServiceInstance(instanceName);<br />
&nbsp; &nbsp; &nbsp; &nbsp; }</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; return instancesMap[instanceName];<br />
&nbsp; &nbsp; }</p>

<p>&nbsp; &nbsp; function destroyInstance(instanceName) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; if (instancesMap.hasOwnProperty(instanceName)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; delete instancesMap[instanceName];<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; }</p>

<p>&nbsp; &nbsp; function createServiceInstance(instanceName) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; var service = {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; //this is important since without it you might get memory leaks.<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; destroyInstance: function(instanceName) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; destroyInstance(instanceName);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; },<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;//add service api here ...</p>

<p><br />
&nbsp; &nbsp; &nbsp; &nbsp; };</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; instancesMap[instanceName] = service;<br />
&nbsp; &nbsp; }</p>

<p>&nbsp; &nbsp; return serviceFactory;<br />
&nbsp; &nbsp;&nbsp;<br />
}]);</p>

<p>This is a naive implementation just to make a point, but it will allow us to use it as a singleton (if we only use a single instance name) or any number of instances as it fits the business logic. All that needs to be done is pass a configuration object instead of the instanceName and do some business logic with it in the getInstance function to determine if it should return a new instance or an instance previously stored in the instancesMap.</p>
