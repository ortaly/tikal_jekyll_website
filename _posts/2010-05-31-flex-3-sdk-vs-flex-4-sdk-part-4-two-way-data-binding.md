---
layout: post
title: Flex 3 SDK Vs. Flex 4 SDK – Part 4 – Two-way data binding
created: 1275253670
author: sefi
permalink: /js/flex-3-sdk-vs-flex-4-sdk-–-part-4-–-two-way-data-binding
tags:
- JS
- two-way
- Flex 4 SDK
- flex 3 sdk
- data binding
- comparison
- binding
- bidirectional
---
<p>In previous posts in the series we discussed namespaces, an introduction to the new Spark components architecture and the new mxml tags introduced with Flex 4.<br />
This post is all about data binding, and two-way data binding new to Flex 4 specifically.</p>
<p>Basically, data binding is like taking a piece of string and tying each end to an object, so that when the data in one object is modified, the modified data also applies to the other object. The benefits are obvious &ndash; an easy way to pass data between different layers of the application or an easy way to catch an event with a single handler and have that handler update more than one object are a few examples.</p>
<p>As the string analogy above implies, data binding requires source and target objects. But it also needs something that triggers the copy from the source to the target, and that is called the triggering event. This is achieved by the source object dispatching the triggering event when the source property changes.</p>
<p>In Flex 3 two-way data binding was possible, but was also a bit of a hassle. Flex 4 provides some ways which are a bit easier to use, which are:</p>
<p>1. inline declaration, using the @{bindable property} syntax.</p>
<div id="highlighter_239880" class="syntaxhighlighter  java">
<div class="bar                      ">
<div class="toolbar"><a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#viewSource" title="view source" style="width: 16px; height: 16px;" class="item viewSource">view source</a>
<div class="item copyToClipboard"><embed width="16" height="16" src="http://s1.wp.com/wp-content/plugins/syntaxhighlighter/syntaxhighlighter/scripts/clipboard.swf?m=1253219630g" menu="false" flashvars="highlighterId=highlighter_239880" wmode="transparent" allowscriptaccess="always" title="copy to clipboard" type="application/x-shockwave-flash" id="highlighter_239880_clipboard"></embed></div>
<a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#printSource" title="print" style="width: 16px; height: 16px;" class="item printSource">print</a><a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#about" title="?" style="width: 16px; height: 16px;" class="item about">?</a></div>
</div>
<div class="lines">
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>01</code></td>
            <td class="content"><code class="java comments">//Flex 3</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>02</code></td>
            <td class="content"><code class="java plain">&lt;mx:Application xmlns:mx=</code><code class="java string">&quot;<a href="http://www.adobe.com/2006/mxml">http://www.adobe.com/2006/mxml</a>&quot;</code><code class="java plain">&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>03</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;</code><code class="java plain">&lt;mx:TextInput id=</code><code class="java string">&quot;t1&quot;</code> <code class="java plain">text=</code><code class="java string">&quot;{t2.text}&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>04</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;</code><code class="java plain">&lt;mx:TextInput id=</code><code class="java string">&quot;t2&quot;</code> <code class="java plain">text=</code><code class="java string">&quot;{t1.text}&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>05</code></td>
            <td class="content"><code class="java plain">&lt;/mx:Application&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>06</code></td>
            <td class="content">&nbsp;</td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>07</code></td>
            <td class="content"><code class="java comments">//Flex 4</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>08</code></td>
            <td class="content"><code class="java plain">&lt;s:Application xmlns:mx=</code><code class="java string">&quot;<a href="http://www.adobe.com/2006/mxml">http://www.adobe.com/2006/mxml</a>&quot;</code><code class="java plain">&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>09</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;</code><code class="java plain">&lt;s:TextInput id=</code><code class="java string">&quot;t1&quot;</code> <code class="java plain">text=</code><code class="java string">&quot;@{t2.text}&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>10</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;</code><code class="java plain">&lt;s:TextInput id=</code><code class="java string">&quot;t2&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>11</code></td>
            <td class="content"><code class="java plain">&lt;/s:Application&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
</div>
</div>
<p>2. &lt;fx:Binding&gt; tag.</p>
<div id="highlighter_856117" class="syntaxhighlighter  java">
<div class="bar                ">
<div class="toolbar"><a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#viewSource" title="view source" style="width: 16px; height: 16px;" class="item viewSource">view source</a>
<div class="item copyToClipboard"><embed width="16" height="16" src="http://s1.wp.com/wp-content/plugins/syntaxhighlighter/syntaxhighlighter/scripts/clipboard.swf?m=1253219630g" menu="false" flashvars="highlighterId=highlighter_856117" wmode="transparent" allowscriptaccess="always" title="copy to clipboard" type="application/x-shockwave-flash" id="highlighter_856117_clipboard"></embed></div>
<a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#printSource" title="print" style="width: 16px; height: 16px;" class="item printSource">print</a><a href="http://flexblackbelt.wordpress.com/2010/05/30/flex-3-sdk-vs-flex-4-sdk-part-4-two-way-data-binding/#about" title="?" style="width: 16px; height: 16px;" class="item about">?</a></div>
</div>
<div class="lines">
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>1</code></td>
            <td class="content"><code class="java comments">//Flex 3</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>2</code></td>
            <td class="content"><code class="java plain">&lt;mx:Binding source=</code><code class="java string">&quot;a.property&quot;</code> <code class="java plain">destination=</code><code class="java string">&quot;b.property&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>3</code></td>
            <td class="content"><code class="java plain">&lt;mx:Binding source=</code><code class="java string">&quot;b.property&quot;</code> <code class="java plain">destination=</code><code class="java string">&quot;a.property&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>4</code></td>
            <td class="content">&nbsp;</td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>5</code></td>
            <td class="content"><code class="java comments">//Flex 4</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>6</code></td>
            <td class="content"><code class="java plain">&lt;fx:Binding source=</code><code class="java string">&quot;a.property&quot;</code> <code class="java plain">destination=</code><code class="java string">&quot;b.property&quot;</code> <code class="java plain">twoWay=</code><code class="java string">&quot;true&quot;</code><code class="java plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
</div>
</div>
<p>Note, that two-way data binding is not supported for:<br />
1. Style properties<br />
2. Effect properties<br />
3. The request property of the HttpService, RemoteObject, and WebService classes<br />
4. The arguments property of the RemoteObject class.</p>
<p>You can find more information about data binding <a target="_blank" href="http://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7fe7.html">here</a>.</p>
