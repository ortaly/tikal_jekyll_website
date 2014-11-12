---
layout: post
title: Javascript as an assembly language
created: 1311233639
author: ittayd
permalink: /js/javascript-assembly-language
tags:
- JS
---
<p>It is interesting to note that Javascript is becoming more and more an <a href="http://www.hanselman.com/blog/JavaScriptIsAssemblyLanguageForTheWebSematicMarkupIsDeadCleanVsMachinecodedHTML.aspx">assembly language for the web</a>. Javascript is used more and more as either the direct &quot;VM&quot; for new languages (e.g., coffeescript) , or an additional backend. See <a href="https://github.com/jashkenas/coffee-script/wiki/List-of-languages-that-compile-to-JS">here a detailed list</a></p>
<p>&nbsp;</p>
<p>The newes addition is <a href="https://github.com/clojure/clojurescript">ClojureScript</a>, a dialect of clojure that compiles to Javascript. Here is the <a href="https://github.com/clojure/clojurescript/wiki/Rationale">rationale</a> behind it. Rich Hickey, creator of clojure is behind it.</p>
<p>&nbsp;</p>
<p>I&nbsp;find two interesting issues here:</p>
<ul>
    <li>Does it mean that knowledge of Javascript will not be a requirement any more for developing for the web (in the same way that nobody needs to know JVM's bytecode instructions to develop in Java)?</li>
    <li>It looks like this adds a requirement to compile after each change to the code. This takes away one of the benefits of dynamic languages.</li>
</ul>
