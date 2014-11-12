---
layout: post
title: Cross Domain jQuery AJAX Calls with YQL
created: 1338536384
author: yossi
permalink: /cross-domain-jquery-ajax-calls-yql
tags:
- Ruby
---
<p><span style="font-size: medium; "><font color="#808080" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">Recently&nbsp;i had to make client side&nbsp;</span></font><span style="background-color: rgb(255, 255, 255); "><span class="J-JK9eJ-PJVNOc" style="background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; ">ajax</span></span><font color="#808080" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">&nbsp;call to&nbsp;</span></font>fetch<font color="#808080" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">&nbsp;data for domain other then my on and got this&nbsp;</span></font><font color="#808080" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">ugly&nbsp;error:</span></font></span></p>
<p>&nbsp;</p>
<p style="line-height: 21px; "><span style="font-size: medium; "><span style="color: rgb(128, 128, 128); ">&quot;Origin .... is not allowed by Access-Control-Allow-Origin.&quot;</span></span></p>
<p style="font-family: arial; font-size: small; "><span style="font-size: medium; "><font color="#808080" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">It is because&nbsp;</span></font><font color="#808080" face="Verdana, Arial, sans-serif">web browsers do not allow web pages to make cross-domain Ajax calls for security&nbsp;reasons.</font></span></p>
<p style="font-family: arial; font-size: small; "><span style="font-size: medium; "><font color="#666666" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">I came&nbsp;across&nbsp;this cool&nbsp;</span></font></span><a href="https://github.com/padolsey/jQuery-Plugins" target="_blank" style="font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; "><span style="font-size: medium; ">post</span></a><span style="font-size: medium; "><font color="#666666" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">&nbsp;&nbsp;that has cool&nbsp;</span></font><font color="#666666" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">approach&nbsp;to this situation, just add this&nbsp;</span></font><span style="background-color: rgb(255, 255, 255); "><span class="J-JK9eJ-PJVNOc" style="font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; line-height: 21px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; ">jquery</span></span><font color="#666666" face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><span style="line-height: 21px; ">&nbsp;</span></font></span><a href="https://github.com/padolsey/jQuery-Plugins/blob/master/cross-domain-ajax/jquery.xdomainajax.js" target="_blank" style="font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 21px; "><span style="font-size: medium; ">code</span></a></p>
<p style="line-height: 21px; "><span style="font-size: medium; ">to your project and start&nbsp;<span style="background-color: rgb(255, 255, 255); "><span class="J-JK9eJ-PJVNOc" style="background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; ">ajaxing</span></span>&nbsp;like that:</span></p>
<p style="line-height: 21px; ">&nbsp;</p>
<p><span style="color: rgb(105, 70, 0); font-size: 13px; line-height: 1.333; ">$.</span><span class="me1" style="color: rgb(105, 70, 0); font-size: 13px; line-height: 1.333; ">ajax</span><span class="br0" style="font-size: 13px; line-height: 1.333; color: rgb(0, 0, 79); ">(</span><span class="br0" style="font-size: 13px; line-height: 1.333; color: rgb(0, 0, 79); ">{</span></p>
<pre class="javascript" style="font-size: 13px; width: auto; clear: none; overflow-x: visible; overflow-y: visible; line-height: 1.333; "><font color="#694600">    url</font><span class="sy0" style="color: rgb(0, 0, 79); ">:</span><font color="#694600"> </font><span class="st0" style="color: rgb(237, 119, 34); ">'http://.....'</span><span class="sy0" style="color: rgb(0, 0, 79); ">,<br /></span><font color="#694600">    type</font><span class="sy0" style="color: rgb(0, 0, 79); ">:</span><font color="#694600"> </font><span class="st0" style="color: rgb(237, 119, 34); ">'GET'</span><span class="sy0" style="color: rgb(0, 0, 79); ">, </span><font color="#694600"><br />    success</font><span class="sy0" style="color: rgb(0, 0, 79); ">:</span><font color="#694600"> </font><span class="kw2" style="color: rgb(170, 32, 99); ">function</span><span class="br0" style="color: rgb(0, 0, 79); ">(</span><font color="#694600">res</font><span class="br0" style="color: rgb(0, 0, 79); ">)</span><font color="#694600"> </font><span class="br0" style="color: rgb(0, 0, 79); ">{ </span><font color="#694600">         </font><span class="kw2" style="color: rgb(170, 32, 99); "><br />    var</span><font color="#694600"> data </font><span class="sy0" style="color: rgb(0, 0, 79); ">=</span><font color="#694600"> $</font><span class="br0" style="color: rgb(0, 0, 79); ">(</span><font color="#694600">res.</font><span class="me1" style="color: rgb(105, 70, 0); ">responseText</span><span class="br0" style="color: rgb(0, 0, 79); ">)</span><font color="#694600">.</font><span class="me1" style="color: rgb(105, 70, 0); ">text</span><span class="br0" style="color: rgb(0, 0, 79); ">(</span><span class="br0" style="color: rgb(0, 0, 79); ">)</span><span class="sy0" style="color: rgb(0, 0, 79); ">;</span><font color="#694600"><br />    //some code here..      </font><span class="br0" style="color: rgb(0, 0, 79); "><br />}&nbsp;</span>
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
