---
layout: post
title: Migrating Flex 3.x application to Flex 4.5 – Tip No. 3
created: 1310385045
author: sefi
permalink: /js/migrating-flex-3x-application-flex-45-–-tip-no-3
tags:
- JS
- swfobject.js
- migration
- html-wrapper
- Flex 4.5 SDK
- Flex 4.5
- flex 3 sdk
- flex 3
- flex
- flashvars
- flash vars
- flash variables
---
<p>The next few posts will be dedicated to common errors that arise from moving to Flex 4.5 SDK and Spark Theme.</p>
<p>&nbsp;</p>
<p>First, let me explain why those errors arise. When changing the compiler SDK to Flex 4.5 some errors arise and are easily fixed.<br />
When you change the theme to Spark Theme, some styles are no longer supported for mx components.</p>
<p>&nbsp;</p>
<p>If you plan a complete migration, you will replace those with Spark equivalents and all will be good.<br />
If, however, you only plan a partial migration, then you won&rsquo;t  necessarily replace all components but you will have to handle those  errors.</p>
<p>&nbsp;</p>
<p>The first one will be borderThickness and backgroundAlpha styles,  which are no longer available for some mx compoments under the spark  theme.<br />
Let&rsquo;s review an example (code was modified to protect customer code):</p>
<p>&nbsp;</p>
<div id="highlighter_140605" class="syntaxhighlighter  ">
<div class="lines">
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>1</code></td>
            <td class="content"><code class="plain">&lt;mx:TileList id=</code><code class="string">&quot;TL&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>2</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">width=</code><code class="string">&quot;200&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>3</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">backgroundAlpha=</code><code class="string">&quot;0&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>4</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">borderStyle=</code><code class="string">&quot;none&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>5</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">selectable=</code><code class="string">&quot;false&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>6</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">columnWidth=</code><code class="string">&quot;50&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>7</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">itemRenderer=</code><code class="string">&quot;CustomRenderer&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>8</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">click=</code><code class="string">&quot;TL_changeHandler(event)&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>9</code></td>
            <td class="content"><code class="plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
</div>
</div>
<p>&nbsp;</p>
<p>Tilelist does not support the backgroundAlpha style under the spark theme, so this code had to be modified.<br />
&nbsp;</p>
<p>I replaced the TileList with a DataGroup since I wanted the  backgroundAlpha=&rdquo;0&Prime; and borderStyle=&rdquo;none&rdquo; DataGroup fit like a glove. I  kept the itemRenderer and the click handler, and just added a layout  and I was done.</p>
<p>&nbsp;</p>
<p>Here is the outcome:</p>
<p>&nbsp;</p>
<div id="highlighter_706090" class="syntaxhighlighter  ">
<div class="lines">
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>01</code></td>
            <td class="content"><code class="plain">&lt;s:DataGroup id=</code><code class="string">&quot;TL&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>02</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">width=</code><code class="string">&quot;200&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>03</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">itemRenderer=</code><code class="string">&quot;CustomRenderer&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>04</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">click=</code><code class="string">&quot;completionCodesTL_changeHandler(event)&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>05</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&gt;</code></td>
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
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&lt;s:layout&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>08</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&lt;s:TileLayout</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>09</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">columnWidth=</code><code class="string">&quot;50&quot;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>10</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">/&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt1">
<table>
    <tbody>
        <tr>
            <td class="number"><code>11</code></td>
            <td class="content"><code class="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="plain">&lt;/s:layout&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
<div class="line alt2">
<table>
    <tbody>
        <tr>
            <td class="number"><code>12</code></td>
            <td class="content"><code class="plain">&lt;/s:DataGroup&gt;</code></td>
        </tr>
    </tbody>
</table>
</div>
</div>
</div>
