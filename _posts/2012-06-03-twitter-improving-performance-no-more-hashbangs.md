---
layout: post
title: 'Twitter Improving performance (no more Hashbangs #!)'
created: 1338743367
author: menny
permalink: /twitter-improving-performance-no-more-hashbangs
tags:
- .NET
---
<p>A couple of days ago twitter announced their new UI architecture regarding their JavaScript UI rendering. Up until now the UI rendering and logic was pushed to JS on the client side. This resulted in performance degradation on low end user machine (old cell phones).
<p>To improve this faultiness they moved the page rendering back to the server, and laid they architecture on the <a href="https://github.com/amdjs/amdjs-api/wiki/AMD">AMD modules</a> specification. Such that, every modules declares its dependencies and a loader is responsible for handling the loading of the dependencies and making sure everything is in place.<br />
<blockquote>
<p><i><a href="http://engineering.twitter.com/2012/05/improving-performance-on-twittercom.html">Modules let us separate the loading and the evaluation of our code. This means that we can bundle our code in the most efficient manner for delivery and leave the evaluation order up to the dependency loader. We can tune how we bundle our code, lazily load parts of it, download pieces in parallel, separate it into any number of files, and more — all without the author of the code having to know or care about this. Our JavaScript bundles are built programmatically by a tool, similar to the RequireJS optimizer, that crawls each file to build a dependency tree. This dependency tree lets us design how we bundle our code, and rather than downloading the kitchen sink every time, we only download the code we need — and then only execute that code when required by the application.</a></i></p>
</blockquote>
<p>But doesn’t this the old model of the web? and basically the JS just renders here and there small amount of data internally in the user page, same as the good old days before the JS wild wild west.
<p>While I understand the need and why they are doing it, I think that they could have come with a better solution. Like the first page rendered from the server and continue from there. It’s not clear from the blog post if that’s the way they are going. The other thing is the network bandwidth of loading many files async or lazy – what about that twitter?
<p>The good thing here, is that they are <a href="http://danwebb.net/2011/5/28/it-is-about-the-hashbangs">getting rid of the hashbangs</a>. </p>
