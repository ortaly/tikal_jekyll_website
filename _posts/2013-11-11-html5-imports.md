---
layout: post
title: HTML5 "imports"
created: 1384204445
author: orenf
permalink: html5-imports
tags:
- JS
- HTML5
- web-components
---
<p>Behold - the shiny &quot;feature&quot; of html5 - &quot;import&quot; for including web &quot;packages&quot; with a simple link. This is the equivalnce of &quot;include&quot; in many other languages with one powerful rule - you can include a resource which can import several assets - css, js and html templates.</p>

<p>Take &quot;bootstrap&quot; for example. Bootstrap includes few files that should be loaded: css files, js file and perhaps other (for custom themes etc..).</p>

<p>With &quot;import&quot; feature, it can be done easily with a simple line:</p>

<pre class="prettyprint" style="font-family: 'Source Code Pro', monospace; font-size: 13px; margin-right: auto; margin-left: auto; padding: 1em; color: white; background-color: rgb(68, 68, 68); border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; line-height: 16px;">
<code style="font-family: 'Source Code Pro', monospace; font-size: 1em;"><span class="tag" style="color: rgb(137, 189, 255);">&lt;link</span><span class="pln"> </span><span class="atn" style="color: rgb(189, 183, 107);">rel</span><span class="pun">=</span><span class="atv" style="color: rgb(101, 176, 66);">&quot;import&quot;</span><span class="pln"> </span><span class="atn" style="color: rgb(189, 183, 107);">href</span><span class="pun">=</span><span class="atv" style="color: rgb(101, 176, 66);">&quot;bootstrap.html&quot;</span><span class="tag" style="color: rgb(137, 189, 255);">&gt;</span></code></pre>

<p>checkout the full article at html5rocks for more info.</p>
