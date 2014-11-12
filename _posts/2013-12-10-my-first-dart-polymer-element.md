---
layout: post
title: My First Dart Polymer Element
created: 1386659686
author: oren.kleks
permalink: my-first-dart-polymer-element
tags:
- JS
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Let&rsquo;s get started with building the first Dart Polymer element.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The component is responsible for calculating squared value of a number.</span></span></p>

<p><br />
<br />
<span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><img height="205px;" src="https://lh6.googleusercontent.com/0JqGFW2uRDj54snH3b7038UlpMQD-4HEcQPzQUIvkPgFNPBO1fksyPSJvqClDXCujmbo7UwujdfOaaeQ1SSZvSWCyT57edvfMIRkev4cEQjQGP6fAXql-ZEL5A" width="346px;" /></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The element&rsquo;s code is of course pretty simple:</span></span></p>

<div class="Java" lang="Java">
<p>&nbsp;</p>
</div>

<div lang="Java">
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">void calculate(Event e, var detail, Element target) {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;String data = (target as InputElement).value;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;value = int.parse(data);</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;square = value * value;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;if(value == null){</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;summary = &quot;No text entered&quot;;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;}</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;summary = value.toString() + &quot; squared = &quot; + square.toString();</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;}</span></span></p>
</div>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">This function is binded throw the square element :</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;polymer-element name=&quot;square-calculator&quot; &gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;template&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&lt;div&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;Enter number: &lt;input type=&quot;number&quot; on-change=&quot;</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">{{calculate}}</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&quot; &nbsp;&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;/div&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;button&gt;Calculate&lt;/button&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;div&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;{{summary}}</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;/div&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;/template&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;script type=&quot;application/dart&quot; src=&quot;squareCalculater.dart&quot;&gt;&lt;/script&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;/polymer-element&gt;</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Then the component can be added to the html file:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;html&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;head&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;meta charset=&quot;utf-8&quot;&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;title&gt;Sample app&lt;/title&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;link rel=&quot;stylesheet&quot; href=&quot;squarecalc.css&quot;&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;!-- import the click-counter --&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;link rel=&quot;import&quot; href=&quot;squareelement.html&quot;&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;script type=&quot;application/dart&quot;&gt;export &#39;package:polymer/init.dart&#39;;&lt;/script&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;script src=&quot;packages/browser/dart.js&quot;&gt;&lt;/script&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;/head&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;body&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;h1&gt;Calculate Square Value&lt;/h1&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;p&gt;Let&#39;s calc!&lt;/p&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;div id=&quot;calc_id&quot;&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size: 16px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;square-calculator &gt;&lt;/square-calculator&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;/div&gt;</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;/body&gt;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;/html&gt;</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">You can view the code in </span><a href="https://drive.google.com/folderview?id=0B1oMZQt3rUSNUi1aMktCZXBoSVU&amp;usp=sharing" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">this link</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">.</span></span></p>

<p><span id="docs-internal-guid--ae349bf-db56-a79b-255a-cf7d5af32c85"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">If you want to download the Javascript artifacts &nbsp;</span><a href="https://drive.google.com/folderview?id=0B1oMZQt3rUSNQ2RsTks2S2Y0ODA&amp;usp=sharing" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">click here</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">. </span></span></p>
