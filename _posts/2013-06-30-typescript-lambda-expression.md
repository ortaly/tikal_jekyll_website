---
layout: post
title: TypeScript lambda expression
created: 1372603211
author: igorz
permalink: typescript-lambda-expression
tags:
- .NET
- typescript
- Javascript
---
<p>In my opinion, <a href="http://www.typescriptlang.org/">TypeScript </a>is the best solution for MS/.NET oriented development.<br />
	<br />
	At first - it is very similar to C#, that makes .NET developer&#39;s life easy.<br />
	<br />
	At second - TypeScript is a superset of JavaScript, and you can mix &quot;pure&quot; JavaScript code with &quot;typed&quot; TypeScript. It is very important in case you have a lot of JavaScript in your project and want to take advantage of modern web technologies. I have an <a href="http://igorzelmanovich.blogspot.fr/2013/01/converting-existing-javascript-code-to.html">example </a>- my <a href="http://www.izwebfilemanager.com/">IZWebFileManager </a>project<br />
	<br />
	At third (but not less important) - it has <b>Lambda expression</b><br />
	<br />
	I am using JQuery AJAX, and used to write such code:<br />
	&nbsp;</p>
<div class="separator" style="clear: both; text-align: center;">
	&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;">
	<a href="http://2.bp.blogspot.com/-L390gtx0YA4/UdA8UFgqxKI/AAAAAAAAWSs/K7BKjlhp4y0/s544/2013-06-30_17h10_06.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-L390gtx0YA4/UdA8UFgqxKI/AAAAAAAAWSs/K7BKjlhp4y0/s1600/2013-06-30_17h10_06.png" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
	&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;">
	&nbsp;</div>
<p>It is simple closure, that I use to keep reference to the instance that I work with from ajax callback.<br />
	This pattern became routine and very annoying.<br />
	<br />
	But TypeScript bring the solution:<br />
	&nbsp;</p>
<div class="separator" style="clear: both; text-align: center;">
	<a href="http://1.bp.blogspot.com/-vpyqBxZK-DU/UdA8sCsfN9I/AAAAAAAAWS0/0UYwWBoI59g/s692/2013-06-30_17h11_43.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-vpyqBxZK-DU/UdA8sCsfN9I/AAAAAAAAWS0/0UYwWBoI59g/s1600/2013-06-30_17h11_43.png" /></a></div>
<br />
<p>It is much simple, no need to care of what <i>&#39;this&#39;</i> is anymore. It just does all this&nbsp;annoying routine&nbsp;behind the scene. There is compiled JavaScript output:<br />
	<br />
	&nbsp;</p>
<div class="separator" style="clear: both; text-align: center;">
	<a href="http://4.bp.blogspot.com/-jwx1dkVRkpk/UdA-3HVB_AI/AAAAAAAAWTE/b-SNPVeiy4A/s536/2013-06-30_17h21_03.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-jwx1dkVRkpk/UdA-3HVB_AI/AAAAAAAAWTE/b-SNPVeiy4A/s1600/2013-06-30_17h21_03.png" /></a></div>
<br />
<p>It worth to move to TypeScript just because it is a great feature</p>
