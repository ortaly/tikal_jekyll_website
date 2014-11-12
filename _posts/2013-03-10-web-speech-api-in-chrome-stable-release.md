---
layout: post
title: Web Speech API in Chrome stable release
created: 1362916447
author: assafg
permalink: /js/web-speech-api-chrome-stable-release
tags:
- JS
- html5 javascript
---
<p>As I&#39;m not a regular reader of release notes so I tend to miss out on cool feature releases. One recent feature release that I accidently stumled into is the support for web speech API that was added to a recent <a href="http://googlechromereleases.blogspot.co.il/2013/02/stable-channel-update_21.html">chrome release</a>. This is yet another feature that will boost the capabilities of web applications.</p>
<p>Implementing it in a web page is extremely easy:</p>
<p>&nbsp;</p>
<pre class="code" style="color: black; background-color: rgb(240, 246, 255); font-size: 14px; overflow: auto; margin-top: 0px; padding: 0px 1em;">
<code class="html-code" style="color: rgb(255, 69, 0); background-image: inherit; background-attachment: inherit; background-origin: inherit; background-clip: inherit; background-color: inherit; background-size: inherit;">&lt;script type=&quot;text/javascript&quot;&gt;
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
      if (event.results.length &gt; 0) {
        q.value = event.results[0][0].transcript;
        q.form.submit();
      }
    }
  &lt;/script&gt;

  &lt;form action=&quot;http://www.example.com/search&quot;&gt;
    &lt;input type=&quot;search&quot; id=&quot;q&quot; name=&quot;q&quot; size=60&gt;
    &lt;input type=&quot;button&quot; value=&quot;Click to Speak&quot; onclick=&quot;recognition.start()&quot;&gt;
  &lt;/form&gt;</code></pre>
<p>&nbsp;</p>
<p>There are quite a few practical implementations such as dictating emails, blog posts, tweets, controlling UI via voice commands and more.</p>
<p>Here is the official <a href="https://www.google.com/intl/en/chrome/demos/speech.html">demo</a> (requires latest Chrome...). More examples and guides can be found in the <a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html">official API document</a>, and on <a href="http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API">html5rocks.com</a></p>
<p>&nbsp;</p>
