---
layout: post
title: Sorting complex tables with AngularJS and Bootstrap
created: 1400490742
author: shavit
permalink: sorting-complex-tables-with-angularjs-and-bootstrap
tags:
- JS
- AngularJS
- bootstrap
- Underscore
- Sorting mechanism
- DIrective
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; line-height: 1.15; white-space: pre-wrap;">In this short article I will attempt to present an approach for enabling a table-like sorting mechanism for custom tables. &nbsp;Custom tables &nbsp;(as I see them) are tables that have extra UX behaviour, such as collapsible areas for showing and hiding additional data.</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><a href="http://plnkr.co/edit/4qb5yYv4nFOMhN6vvn2p?p=preview" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">See a working example on plunker</span></a></p>

<p>&nbsp;</p>

<p><a href="http://angular-ui.github.io/ng-grid/" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">ngGrid</span></a><span style="background-color: transparent; line-height: 1.6em; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;"> is a wonderful directive which enables sorting behaviour for regular tables. There are several additional tools out there, but none of them support custom (or complex) tables (or bootstrap grid-system based tables).</span></p>

<p><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; line-height: 1.15; white-space: pre-wrap;">The approach I am offering is flexible and uses the AngularJS bidirectional binding behaviour and ngRepeat.</span></p>

<p><span style="background-color: transparent; line-height: 1.6em; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;">Before I explain how it works, note that in my example I use Bootstrap for achieving the table formation, I am not using any &lt;table&gt; tags at all. If you don&rsquo;t use Bootstrap in your project you&rsquo;ll have to arrange your table formation manually with CSS. &nbsp;Additionally I am using </span><a href="http://underscorejs.org/" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">underscore</span></a><span style="background-color: transparent; line-height: 1.6em; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;"> for the sorting logic and </span><a href="http://fortawesome.github.io/Font-Awesome/" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Font Awesome</span></a><span style="background-color: transparent; line-height: 1.6em; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;"> for the icons.</span></p>

<p><strong style="line-height: 1.6em;"><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">So here it goes:</span></strong></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">Normally when you want to create a table-like component which shows any type of item data &nbsp;you would use ngRepeat and you pass it an array or collection of objects. &nbsp;When the array is being changed by the user, the ngRepeat directive watches the changes and reflects them to the DOM.</span></p>

<p><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">In my example you&rsquo;ll find a directive which uses this behaviour and expects to receive two objects:</span></p>

<p><span style="background-color: transparent; white-space: pre-wrap; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; line-height: 1.15;">1. The same array that was sent to the ngRepeat.</span><br />
<span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; line-height: 1.15; white-space: pre-wrap;">2. A configuration object which holds data regarding the headers and data types of the columns.</span></p>

<p><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;">The basic approach is to sort the array of objects given to the ngRepeat </span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">in the directive itself</span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;">, according to the column being clicked. The bidirectional behaviour of the isolated scope in the directive affects the array and the ngRepeat that listen to it&rsquo;s changes re-rendering the DOM elements.</span></p>

<p><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;">You probably ask yourselves by now, why not using the </span><a href="https://docs.angularjs.org/api/ng/filter/orderBy" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">orderBy filter</span></a><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;"> ?</span><br />
<span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.6em;">Well, it just not flexible enough. When you want to attach the sorting behaviour to the headers, enable reverse sorting &nbsp;and reuse it all over your app, it becomes quite challenging.</span></p>

<p>&nbsp;</p>

<p><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">What else can you do</span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap;">:</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-c3dc22ad-13a2-ed7f-48b7-1f24b0dcea4f"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">You can call methods that exist in the directive from the controller, by using: </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">$scope.sortColumnsMediator.sharedLogic[the method]</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">, </span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-c3dc22ad-13a2-ed7f-48b7-1f24b0dcea4f"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">there are two methods available in the directive:</span></span></p>

<ol>
	<li><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">scope.sortColumnsMediator.sharedLogic.isEnableSorting(true/false) - To enable or disable the sorting behaviour.</span></li>
	<li><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">scope.sortColumnsMediator.sharedLogic.sort() To manually (programmatically) sort the according the last sort.</span></li>
</ol>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-c3dc22ad-13a2-ed7f-48b7-1f24b0dcea4f"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Comments are available in the example.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-c3dc22ad-13a2-ed7f-48b7-1f24b0dcea4f"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Hope this helps,</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-c3dc22ad-13a2-ed7f-48b7-1f24b0dcea4f"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Shavit.</span></span></p>

<div>&nbsp;</div>
