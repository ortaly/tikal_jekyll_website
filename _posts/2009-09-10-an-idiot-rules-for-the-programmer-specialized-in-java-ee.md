---
layout: post
title: An idiot rules for the programmer specialized in java/ee
created: 1252592719
author: peterk
permalink: /java/idiot-rules-programmer-specialized-javaee
tags:
- JAVA
- java application design
- Databases
- Application Frameworks
---
<p>Hello,</p>
<p>&nbsp;</p>
<p>I would like to share my bad and good experience in application's design and planning.</p>
<p>&nbsp;</p>
<p>1) </p>
<p>Remember, if you work with WEB/EJB container's objects, never make assumptions.</p>
<p>This stuff always tends to behave against your common sense.</p>
<p>As example:</p>
<p><span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_1">Servlet</span> is stateless , never assume you able save a state in it, even static variable of the <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_2">servlet</span> is not appropriate for the purpose!</p>
<p><span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_3">Servlet</span> managed by WEB container and god knows when it reloaded and why, so never &lt;EVER&gt; attempt to save state in the <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_4">servlet</span>.</p>
<p>As alternative use the <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_5">ServletContext</span> - this one for sharing purposes by spec.</p>
<p>Read spec when you make assumptions for other container objects. They behave against common java rules :), because they are MANAGED.</p>
<p>2)</p>
<p>&nbsp;</p>
<p>Having a collection as a state accumulator in you class, always be cautious form the beginning!!! </p>
<p>Collection , when it used to save a state is dangerous!</p>
<p>Why?</p>
<p>Because , if more than 2 callers access the state and modify it, you have to assume concurrency!</p>
<p>If you even suspect that concurrent access to state is present , be prepared!</p>
<p>Never leave this work to the last moment. You have to establish right concurrent access as a rule!</p>
<p>Use Lock(java 5), use synchronized(java 2), use Semaphore (java 5), use <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_6">CopyOnWriteList</span>(java 5), use Synchronized collections.</p>
<p>But for the god's sake use one of them!!!!</p>
<p>Otherwise you will got <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_7">ConcurrentModificationException</span> in production - nastiest thing , worse is only OutOfMemory!</p>
<p>&nbsp;</p>
<p>3)</p>
<p>&nbsp;</p>
<p>Avoid entirely an inheritance tree and complex sub classing and interfaces unless you absolutely sure you have to extend this class.</p>
<p>If you write a simple Calculator, be sure you DO NOT OVERDESIGN IT! </p>
<p>Nobody needs that complex hierarchy, where 5 classes extend each other and nobody really needs first 4 in the tree!!! </p>
<p>Unless you plan work in this company for years and extend this shit by your own hands. </p>
<p>Never use closures, callbacks unless you absolutely sure you have to do that.</p>
<p>This makes your job secure, but nobody able to read that garbage!</p>
<p>Less static variables you have - more secure you are.</p>
<p>Be simple, be stupid - this is a way to meet others!</p>
<p>&nbsp;</p>
<p>4)</p>
<p>&nbsp;</p>
<p>When you access DB or other shared resource, make this in order! Make this German!</p>
<p>Your method may lock DB objects one by one: lock A, lock B, lock C.</p>
<p>Always preserve this order whenever you lock something, changing the order is DEADLOCK risk.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>5)</p>
<p>Choose easy and fast transport, not always <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_9">WebService</span> is perfect. :)&nbsp; Not always HTTP is a best choice. Choose fastest and most reliable protocol</p>
<p>for your real (R E A L) needs. Less data you pass by wire, better for you.</p>
<p>&nbsp;</p>
<p>6)</p>
<p>&nbsp;</p>
<p>Use those frameworks which you know. A bit. At least some internals. Avoid frameworks if it's a black box. Choose this one, whose forums are active and whose releases are frequent. As rule - less TURD(not mistake) party you use - more stable you are.</p>
<p>&nbsp;</p>
<p>7)</p>
<p>&nbsp;</p>
<p>All books I've read about exceptions are perfect, but the shortest rule is: </p>
<p>make custom exception checked if your write for other people, if you write an library, if you wanna to declare the possible problem for the external user.</p>
<p>Your checked exception is a contract between you and unknown user. Or between you and an external level.</p>
<p>&nbsp;</p>
<p>Make it <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_10">RuntimeException</span>, if your consider this exception fatal and unrecoverable.</p>
<p>Also use <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: red; text-decoration: underline; cursor: pointer;" id="gtbmisp_11">RuntimeException</span> whenever you have a doubt have some hesitation.</p>
<p>Better explode earlier than later in production! If your instead hide exceptions like this:</p>
<p>&nbsp;</p>
<p>try{...}catch(Exception e){/**Do nothing**/}, you are sucker!&nbsp; And watch your back, people will hunt you!</p>
<p>&nbsp;</p>
<p>8)</p>
<p>&nbsp;</p>
<p>If it works - do not touch it! This is the first rule if you work on legacy code!!! </p>
<p>Do not touch a working code!</p>
<p>Do not make your clever assumptions. Those who designed this</p>
<p>stupid application are already retired or dead and you have thank them for the bunch of bugs and for the paid <span style="border: 0pt none ; margin: 0pt; padding: 0pt; background: transparent none repeat scroll 0% 0%; font-family: serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 100%; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; position: static; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: left; text-indent: 0pt; text-transform: none; color: green; text-decoration: underline; cursor: pointer;" id="gtbmisp_12">hours</span> you got.</p>
<p>Respect their work - do not touch it!</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>9)</p>
<p>And last and most comprehensive rule:</p>
<p>Discuss your work with others&nbsp; - this make you look friendly and allows you fix some problems at the very beginning.</p>
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
<p>&nbsp;</p>
