---
layout: post
title: Memory management in flex applications
created: 1338394544
author: avit
permalink: /memory-management-flex-applications
tags:
- Ruby
- web
---
<span>Lately there is <span>alot</span> of buzz about Flex application performance, keeping your memory low and just in general, keeping everything managed under your fingers and not just counting on the flex framework to manage your memory.</span><a href='http://www.kensodev.com/tag/flex/' title='Flex'>Flex</a><span>First thing we need to understand is that any application we will build in our careers will be using some amount of memory, and because memory is not infinite, we should keep our applications memory as low as possible.</span>
<p>I always say the best way to describe memory management is to “be smart” meaning - always have memory in mind, never let it go and by doing this your application will keep lean and thin all the time.</p>
<span>By taking up too much memory you can get into alot of trouble - you can make your users hate the application because it is running slowly and making their computer run slowly. Also, the application can simply crash.</span><span>I hear from programmers in my consulting that computers are getting more and more memory and you can see laptops coming with 4G of memory out of the box and so on, but actually we are also seeing a movement towards mobile devices such as mobile phones etc. these mobile devices do no allow us to use too much memory because it's limited resource.</span><h2><span>Memory leaks</span></h2><span>Memory leaks is a big issue in flex programming and it's generally speaking divided into 2 parts, first when our application is using memory in parts we didn't want it to use and the other part is when we didn't handle the cleaning part efficiently enough.</span><a href='http://www.kensodev.com/tag/flash/' title='Flash'>Flash</a><h3>Event Listeners</h3>
<p>Event listeners are by-far the most mis-used, mis-understood part of flex applications. I have seen people/developers using those without even understanding what is actually happening behind the scenes and when (and if) those are cleaned up in memory.</p>

<p>I will try to explain. Let’s take this peace of code:</p>
<div class='highlight'><pre><code class='actionscript'><span class='c1'>//objectX</span>
<span class='nx'>objectY</span><span class='p'>.</span><span class='nx'>addEventListener</span><span class='p'>(</span><span class='nx'>some_event</span><span class='o'>,</span> <span class='nx'>some_function</span><span class='p'>)</span>
</code></pre>
</div>
<p>We have two objects (ObjectX, ObjectY) - Object Y has a reference to a function in objectX just by passing the function. Now, if your application has a reference to objectY, object X will not get cleaned because it has a reference to a function.</p>

<p>There is actually something called weak event listeners, by default the event listeners are “strong” meaning every event listener is a function, if you specify the event listener is “weak” then the event listener does not count as a reference. <h3>Static Variables</h3> Static variables are never cleaned in the entire session of a flex application, meaning if you set the variable’s value with an object, this object will never get cleaned.</p>

<p>If you want to make sure the object is cleaned you should null out the variable.</p>
<div class='highlight'><pre><code class='actionscript'><span class='c1'>// static variable</span>
<span class='kd'>public</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>_foo</span><span class='o'>:</span><span class='nx'>Foo</span><span class='o'>;</span>
<span class='c1'>//setting the value</span>
<span class='nx'>_foo</span> <span class='o'>=</span> <span class='k'>new</span> <span class='nx'>Foo</span><span class='p'>();</span>
<span class='c1'>//clean</span>
<span class='nx'>_foo</span> <span class='o'>=</span> <span class='kc'>null</span><span class='o'>;</span>
</code></pre>
</div><h3>Dictionaries</h3>
<p>Dictionaries are another big problem and source of misunderstanding in flex applications.</p>

<p>Dictionaries are key-value collections, meaning you have a collection that is built in the form of a key and a value attached to it.</p>

<p>You can use objects as your key and your value, for example let’s say we have two objects (ObjectX, ObjectY), you add an entry to the dictionary where ObjectX is the key and ObjectY is the value.</p>

<p>By default the values in dictionaries are “strong” and you can specify a “weak” key, by doing this, you can actually make sure that if nothing else has a reference to ObjectX, it will get cleaned by the garbage collection. BUT, ObjectY will not get cleaned even though the key for it got cleaned from the dictionary.</p>

<p>There are many questions on this issue from flex experts to adobe, those questions generally start with a WHYYYYYY????</p>

<p>I would also like to understand why, but this is the situation and we have to deal with it. In the Flex-Show podcast Aaron says that if you iterate through the values of the dictionary, then all values that don’t have a key (it was cleaned remember?) gets cleaned immediately.</p>

<p>I never encountered this behavior, but Aaron knows what he is talking about, so I trust him :) (Thanks Aaron). <h2>Conclusion</h2> I think those are the main three issues in flex applications. There are a few more, but if you handle those three you should be fine and your application will actually be pretty lean (at least in memory management).</p>

<p>** this post was inspired by Aaron’s talk on the podcast, I enjoyed it so much I decided to make a post on the issue.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/B1qRSubXxto" height="1" width="1"/>
