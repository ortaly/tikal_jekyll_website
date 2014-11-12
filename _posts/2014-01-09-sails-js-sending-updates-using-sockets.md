---
layout: post
title: Sails.js sending updates using sockets.
created: 1389264543
author: aviy
permalink: sails-js-sending-updates-using-sockets
tags:
- Incubator
---
<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">I was looking a way to sends updates without&nbsp;publishCreate/publishUpdate&nbsp;from the controller.</div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">it took me a while to find a solution and i have found this solution:&nbsp;<a href="https://gist.github.com/mikermcneil/6598661" style="color: rgb(17, 85, 204);" target="_blank">https://gist.github.<wbr />com/mikermcneil/6598661</a></div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">if you want real eaxmple that works i used it as follow:</div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">sails.io.sockets.emit(&quot;message&quot;,{id:o.id,model:&quot;order&quot;,verb:&quot;update&quot;,<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;data:{<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;id:o.id,<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; status: o.status<br />
&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}})</div>

<div style="direction: ltr; color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">I think it can be useful for you too.</div>
