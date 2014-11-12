---
layout: post
title: Fuseday 2013 - My experience with NodeJS, SailsJS and a bit of Mongo
created: 1389793536
author: idan.fridman
permalink: /fuseday-2013-my-experience-nodejs-sailsjs-and-bit-mongo
tags:
- JS
- sails.js node.js
---
<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">Based on my experience on&nbsp;the fuse day:</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">First of all I want to mention that I had minimal knowledge of Java script or any of its technology. I am Java server side and therefore I chose this fuse day to have some entry point into JS technologies.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">I took small task. I had to create a mechanism which implementing User&#39;s Favorite.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">The service we implemented smelled like a&nbsp;backend&nbsp;service which drove me to use NodeJS.&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">The documentation&nbsp;and the installation of Node is very easy and straight forward. In one hour (for someone who has basic knowledge) we managed to install and run&nbsp;nodeJS.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">Upon node we installed Sailsjs&nbsp;which cut through our way with many Node configurations. We store the information on Mongo.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;It was amazing that after 2-3 hours(again with minimal knowledge) we manage to have&nbsp;running Node service upon it SailsJS&nbsp;which able to receive&nbsp;client requests and perform CRUD operations&nbsp;on Mongo.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">The documentation&nbsp;of Sailsjs is very neat. I still cant tell(yet) how much you &quot;earn&quot; using Sailsjs&nbsp;than using using pure nodejs but things got faster.</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">Some snippet from&nbsp;Sailsjs&nbsp;configuration:</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">1 .<span style="color: rgb(102, 102, 102); font-family: 'Lucida Grande', sans-serif; font-size: 14px; line-height: 21px;">Add the&nbsp;mongo&nbsp;config to the config/adapters.js&nbsp;file:</span></div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">(We just need to set &nbsp;adapter: &#39;Mongo&#39; and we are good to go)</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">
<div>/**</div>

<div>&nbsp;* User</div>

<div>&nbsp;*</div>

<div>&nbsp;* @module&nbsp;&nbsp; &nbsp; &nbsp;:: Model</div>

<div>&nbsp;* @description&nbsp;:: A short summary of how this model works and what it represents.</div>

<div>*/</div>

<div>&nbsp;</div>

<div>module.exports = {</div>

<div>&nbsp;</div>

<div>&nbsp; &nbsp;&nbsp;adapter: &#39;mongo&#39;,</div>

<div>&nbsp;</div>

<div>&nbsp; &nbsp;&nbsp;attributes<span style="white-space: pre-wrap;"> </span>:&nbsp;{</div>

<div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;videolist: &#39;array&#39;,</div>

<div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;user: &#39;string&#39;</div>

<div>&nbsp; &nbsp; }</div>

<div>}</div>
</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">An example of how&nbsp;accepting&nbsp;a user request, extracting his&nbsp;id and adding his favorites to Mongo:</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">*Assume&nbsp;we extract the video list from the request. But here, it&#39;s hard coded just for the example simplicity&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">
<div>&nbsp; &nbsp;create: function (req, res) {</div>

<div>&nbsp; &nbsp;console.log(&quot;print&nbsp;req:&quot;,&nbsp;req);</div>

<div>&nbsp;&nbsp;</div>

<div>&nbsp; User.create({</div>

<div>&nbsp;&nbsp;userid: req.userId,</div>

<div>//</div>

<div>&nbsp;&nbsp;videolist: [&quot;hobbit&quot;,&quot;soccer&quot;,&quot;node busters&quot;]</div>

<div>&nbsp; }).done(function(err, user)&nbsp;</div>
</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">The technology is fun. The code is short and efficient.&nbsp;</div>
