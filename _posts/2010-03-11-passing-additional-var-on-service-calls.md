---
layout: post
title: Passing Additional Var On Service Calls
created: 1268311676
author: shair
permalink: /js/passing-additional-var-service-calls
tags:
- JS
- service
- remoteObject
- httpService
- flex
---
<p>&nbsp;</p>
<p>Hey Guys,</p>
<p>If you want to preserve data which is request specifc, I have an example for you:</p>
<p>&nbsp;</p>
<p>Lets say your using pureMVC and you have a user window, and you make a request by notification and you want to remember who made that call (like the mediator name or something).</p>
<p>&nbsp;</p>
<p>One way is to add the data to the asyncToken, so</p>
<p>&nbsp;</p>
<p>var token:AsyncToken = service.getUsers;</p>
<p>toke.preservedData = {bla:bla}</p>
<p>&nbsp;</p>
<p>And after the result comes,&nbsp; you extract it from the ResultEvent like:</p>
<p>trace( event.token.preservedData );</p>
<p>&nbsp;</p>
<p>~~~~~~~~~~~~~~~~</p>
<p>&nbsp;</p>
<p>There is another way...</p>
<p>&nbsp;</p>
<p>If you want to keep things more strictly typed, you can you a custom Responder:</p>
<p>&nbsp;</p>
<p>So on the proxy, when you make the service call, you create a new instanse of a custom Responder, which holds additional parameters. and the code will look like this:</p>
<p>&nbsp;</p>
<p>=============</p>
<p>&nbsp;</p>
<p>&nbsp;UserProxy.as</p>
<p>=============</p>
<p>&nbsp;</p>
<p>public class UserProxy extends Proxy {</p>
<p>&nbsp;</p>
<p>public function getUsers(preservedData:Object):void{</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // 'service' is some remoteObject you define</p>
<p>&nbsp;</p>
<p class="rteindent1">var token:AsyncToken = service.getUsers();</p>
<p>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; token.addResponder(new CustomResponder(handleUsersRecieved, handleServiceFault, preservedData));</p>
<p>}</p>
<p><br />
private function handleUsersRecieved(event : ResultEvent, preservedData : Object):void {</p>
<p><br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; data = new UserVO(event.result.user);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; sendDataResponse(data,note);<br />
}<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
private function handleServiceFault(event : FaultEvent, preservedData : Object):void{<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Handle Fault<br />
}</p>
<p>&nbsp;</p>
<p>]</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>=============</p>
<p>&nbsp;</p>
<p>CustomResponder.as</p>
<p>=============</p>
<p>&nbsp;</p>
<p>public class CustomResponder implements IResponder {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; private var _resultFunction:Function;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; private var _faultFunction:Function;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; private var _preservedData:Object;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; public function CustomResponder(resultFunction : Function, faultFunction : Function, preservedData : Object) {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; _resultFunction = resultFunction;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; _faultFunction = faultFunction;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; _preservedData= preservedData;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />
<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; public function result(event:Object):void {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; _resultFunction.call(null, event, _preservedData);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; public function fault(event:Object):void&nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; _faultFunction.call(null, event, _preservedData);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; }</p>
<p>&nbsp;</p>
