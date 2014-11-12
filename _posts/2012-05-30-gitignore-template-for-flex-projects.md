---
layout: post
title: gitignore template for flex projects
created: 1338394544
author: avit
permalink: /gitignore-template-flex-projects
tags:
- Ruby
- web
---
<p>Hi All,</p>
<p>Well, me being an enthusiastic <a href="http://www.kensodev.com/about-avi-tzurel/" target="_blank" title="Flex developer">flex developer</a> is no secret, nor me being a GIT fan-boy.</p>
<p>I thought it will be helpful to post my template for the gitignore files in all repositories containing flex projects.</p>
<p>This is how it looks like:</p>
<div class="highlight">
<pre><code class="bash">.DS_Store .actionScriptProperties .flexProperties .project .settings/* bin-debug/* </code></pre>
</div>
<p><span>/shell</span></p>
<p>The reason I&rsquo;m ignoring all the settings files and the properties files is because all of these are environment specific, often not all developers on the team use the same settings and properties and that can break the entire working process.</p>
<p><img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/JqtK5hEH8cc" height="1" width="1" alt="" /></p>
