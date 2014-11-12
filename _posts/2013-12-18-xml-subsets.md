---
layout: post
title: XML Subsets
created: 1387376693
author: chaim.turkel
permalink: xml-subsets
tags:
- JAVA
---
<h1>
XML Subsets<o:p></o:p></h1>
<div class="MsoNormal">
Most applications today use XML for some form of data
saving. In testing we also need to validate XML files, find entries in the XML
via XPath and search for differences in the XML.<o:p></o:p></div>
<div class="MsoNormal">
A lot of these abilities can be found in the lib of XMLUnit
(<a href="http://xmlunit.sourceforge.net/">http://xmlunit.sourceforge.net/</a>)<o:p></o:p></div>
<div class="MsoNormal">
This lib knows how to compare XML files, and other actions
like:<o:p></o:p></div>
<div class="MsoListParagraphCxSpFirst" style="mso-list: l0 level1 lfo1; text-indent: -.25in;">
<!--[if !supportLists]--><span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;">·<span style="font-family: 'Times New Roman'; font-size: 7pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><!--[endif]--><span dir="LTR"></span>The differences between two
pieces of XML<o:p></o:p></div>
<div class="MsoListParagraphCxSpMiddle" style="mso-list: l0 level1 lfo1; text-indent: -.25in;">
<!--[if !supportLists]--><span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;">·<span style="font-family: 'Times New Roman'; font-size: 7pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><!--[endif]--><span dir="LTR"></span>The outcome of transforming
a piece of XML using XSLT<o:p></o:p></div>
<div class="MsoListParagraphCxSpMiddle" style="mso-list: l0 level1 lfo1; text-indent: -.25in;">
<!--[if !supportLists]--><span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;">·<span style="font-family: 'Times New Roman'; font-size: 7pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><!--[endif]--><span dir="LTR"></span>The evaluation of an XPath
expression on a piece of XML<o:p></o:p></div>
<div class="MsoListParagraphCxSpMiddle" style="mso-list: l0 level1 lfo1; text-indent: -.25in;">
<!--[if !supportLists]--><span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;">·<span style="font-family: 'Times New Roman'; font-size: 7pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><!--[endif]--><span dir="LTR"></span>The validity of a piece of
XML<o:p></o:p></div>
<div class="MsoListParagraphCxSpLast" style="mso-list: l0 level1 lfo1; text-indent: -.25in;">
<!--[if !supportLists]--><span style="font-family: Symbol; mso-bidi-font-family: Symbol; mso-fareast-font-family: Symbol;">·<span style="font-family: 'Times New Roman'; font-size: 7pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><!--[endif]--><span dir="LTR"></span>Individual nodes in a piece
of XML that are exposed by DOM Traversal<o:p></o:p></div>
<div class="MsoNormal">
One feature that I needed that it did not support is to
detect if one XML is a subset of another. For example<o:p></o:p></div>
<div class="MsoNormal">
I would like to check the following XML is a subset of the
next one.<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
test b</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&gt;<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
test a</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
test b</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;
</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
<span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
As you can guess a simple compare will fail since it will
compare the first node of b in both XML’s and since the elements are not same
it fails. What we need to do is to recursively search all nodes that have the
same name and check if they are the same and not to stop on the first. This
problem of course is not just on nodes but on attributes as well. If you need
this functionally then you can grab the code below:<o:p></o:p></div>
<div class="MsoNormal">
<br /></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> XmlSubsetHelper {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;">
equalNotNullPointers(Object a, Object b) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> ((a == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;"> &amp;&amp; b != </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">) || (a != </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;"> &amp;&amp; b == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<br /></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;">
isSubset(NamedNodeMap namedNodeMapA,</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NamedNodeMap
namedNodeMapB) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (!<i>equalNotNullPointers</i>(namedNodeMapA,
namedNodeMapB)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> ((namedNodeMapA == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;"> &amp;&amp;
namedNodeMapB == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">for</span></b><span style="font-family: Consolas; font-size: 10pt;"> (</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> i = 0; i &lt;
namedNodeMapA.getLength(); i++) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node
itemA = namedNodeMapA.item(i);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node
itemB = namedNodeMapB.getNamedItem(itemA.getNodeName());</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (itemB == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;">
(!itemA.getNodeValue().equals(itemB.getNodeValue())) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<br /></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<br /></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;"> isSubset(NodeList
childNodesA, NodeList childNodesB) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (!<i>equalNotNullPointers</i>(childNodesA,
childNodesB)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> ((childNodesA == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;"> &amp;&amp;
childNodesB == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">for</span></b><span style="font-family: Consolas; font-size: 10pt;"> (</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> a = 0; a &lt;
childNodesA.getLength(); a++) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;"> foundMatch = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node
itemA = childNodesA.item(a);</span><span style="font-family: Consolas;
