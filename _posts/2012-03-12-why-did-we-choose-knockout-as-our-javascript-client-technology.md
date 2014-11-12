---
layout: post
title: Why did we choose Knockout as our JavaScript client technology?
created: 1331581680
author: menny
permalink: /why-did-we-choose-knockout-our-javascript-client-technology
tags:
- .NET
---
<p>I wanted to title this post as “How did we choose our JavaScript Client Technology?” but the knockout spoiler deserves its place on the title. And I’m here to explain why. Note that this is not a detailed comparison and does have intuition mixed with decision making as should be.
<p>I was facing a customer with a great team of .Net developers specialties include Silverlight, WPF and no web orientation. The task of moving into a JavaScript framework was not easy:
<ul>
<li>JavaScript is <a href="http://www.crockford.com/javascript/javascript.html">the world’s most misunderstood programming language</a> out there
<ul>
<li>Understanding the interpreter
<li>Understanding the language
<li>Getting to know all major micro frameworks</li>
</ul>
<li>Lack of proper IDE and debug tools – for .Net engineers this is a great shock
<li>Unfamiliarity with the web architecture – JQuery, minification, CSS, HTML, browser tools etc’
<li>We had a time constraint to figure this all out</li>
</ul>
<p>After writing all the available micro frameworks on the board I could easily get most of them out of the way, and separate between various DOM frameworks, like prototype, DOJO, JQuery and alike and micro frameworks (see list below). We narrowed it down to the following list, depended on JQuery as our DOM library (don’t see any point explaining that). Here is the list:
<ul>
<li><a href="http://documentcloud.github.com/backbone/">Backbone</a>
<li><a href="http://knockoutjs.com/">Knockout</a>
<li><a href="http://emberjs.com/">Ember</a>
<li><a href="http://javascriptmvc.com/">JavaScript MVC</a>
<li><a href="http://batmanjs.org/">Batman</a>
<li><a href="https://github.com/kmalakoff/knockback">Knockback</a>
<li><a href="http://www.sencha.com/">ExtJS</a>
<li><a href="http://sproutcore.com/">Sprout Core</a></li>
</ul>
<p>Yes, there are many more out there (sammyJS, spine, YUI etc’ <a href="http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/?mid=57">and check out the following comparison</a>) but we figured out that we couldn’t go wrong with any of the above and probably achieve the same result with more or less same amount of effort.<br />
<blockquote>
<p>Switch (framework) {
<div style="padding-left: 10px">Case “<a href="http://batmanjs.org/">Batman</a>”:</div>
<div style="padding-left: 30px">Had hard time installing it on windows and using it right away. Seemed more Unix oriented. As I said before, the team consistent of .Net developers. </div>
<div style="padding-left: 30px">Return false;</div>
<div style="padding-left: 10px">Case “<a href="http://javascriptmvc.com/">JavaScript MVC</a>”:</div>
<div style="padding-left: 30px">Was cumbersome and need a stiff learning curve for some days to get started with the project. The project though is well organized.</div>
<div style="padding-left: 30px">Return false;</div>
<div style="padding-left: 10px">Case “<a href="http://documentcloud.github.com/backbone/">Backbone</a>”:</div>
<div style="padding-left: 10px">Case “<a href="http://knockoutjs.com/">Knockout</a>”:</div>
<div style="padding-left: 30px">Fair enough to handle, simple, well documented, popular</div>
<div style="padding-left: 30px"><b>Return</b> <b>true</b>;</div>
<div style="padding-left: 10px">Case “<a href="http://emberjs.com/">Ember</a>”:</div>
<div style="padding-left: 30px">360 degree framework, dedicated community, loved the template engine (Handlebars), not that complicated to get started. </div>
<div style="padding-left: 30px"><b>Return</b> <b>true</b>;</div>
<div style="padding-left: 10px">Case “<a href="http://www.sencha.com/">ExtJS</a>”:</div>
<div style="padding-left: 30px">Fully blown framework, great documentation, proprietary code, although they do have OS license that did not suite us.</div>
<div style="padding-left: 30px">Return false;</div>
<div style="padding-left: 10px">Case “<a href="https://github.com/kmalakoff/knockback">Knockback</a>”:</div>
<div style="padding-left: 30px">Poorly documented, seems to take the best of two worlds (knockout + backbone), not sure we need these two worlds in the first place.</div>
<div style="padding-left: 30px">Return false;</div>
<div style="padding-left: 10px">Case “<a href="http://sproutcore.com/">Sprout Core</a>”:</div>
<div style="padding-left: 30px">Heavy, ruby oriented, well structured – fully blown 360 framework </div>
<div style="padding-left: 30px">Return false;</div>
<p>} </p></blockquote>
<p>So we decided to give a dedicated test to Ember and knockout. We devided into two teams with the same task: building a module/widget application that communicate with REST services. Both teams got to the ending line with complete working applications.<br />
<h1>Why not Ember? </h1>
<p>The Ember documentation is still lacking. We had a hard time to figure out the default “html input fields” binding. The simplest thing took us a half day to figure it out since there is no proper documentation for that common task. The handlebars templating is just great, but it lakes a designer support, unlike its ancestor sprout core that comes with a dedicated server, this one had us wrapping all templates with script tags (same as knockout), and even without the script tags it still looked weird in the designer. Unlike knockout that had the binding in the tag attributes.
<p>Ember is still a young project, as young as JS micro frameworks can be, much of its documentation is copied from sprout core project. The project road map seems promising (ORM integration for ruby) and the community seems dedicated to complete the work – and still, it felt like we were missing something: the spirit of HTML 5. The spirit that keeps you lite, not oblige to any FW, not religious about your tools, feeling free like a bird in the great cause surrounding you. And that spirit exists when you add bits from here, take some bits from there and then compose a framework of your own. We/I felt this task was easier to accomplish with knockout that only gives us binding engine and seemed to be enough to tackle this job. The binding are so easy. They are non-obtrusive, easy to get along with if you are coming from XAML (after all this FW is written by MS employee), well documented all over the web and not just in knockout site and most important of all – Feels very light weight.
<p>I’ll just give a quick example, as a coworker of mine noted, working with bounded properties (getting and setting values):<br />
<table border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="89">
<p>Ember</p>
</td>
<td valign="top" width="248">
<p>myObject.get(“myPropName”)</p>
</td>
<td valign="top" width="302">
<p>myObject.set(“myPropName”, value)</p>
</td>
</tr>
<tr>
<td valign="top" width="89">
<p>Knockout</p>
</td>
<td valign="top" width="248">
<p>myObject.myProp()</p>
</td>
<td valign="top" width="302">
<p>myObject.myProp(value)</p>
</td>
</tr>
</tbody>
</table>
<p>You can see clearly that Java notation like of Ember vs the intuitive notation of knockout.
<p>I’m not sure if we will stick to knockout alone, or maybe trade our sole for something commercial, since after all we are building a LOB application that needs to scale to mobile, tablets, have annoying-not light-weight-controls like grids and so. But for now – knockout won our hearts with ease </p>
