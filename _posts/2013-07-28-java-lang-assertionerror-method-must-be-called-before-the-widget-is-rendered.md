---
layout: post
title: 'java.lang.AssertionError: Method must be called before the widget is rendered'
created: 1374995431
author: olga
permalink: /javalangassertionerror-method-must-be-called-widget-rendered
tags:
- JAVA
- Sencha GXT
---
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;"><span style="font-size:16px;"><span style="font-family:courier new,courier,monospace;"><font color="#000000">&ldquo;Method must be called before the widget is rendered.</font></span></span></p>
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;">&nbsp;</p>
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;"><span style="font-family:courier new,courier,monospace;"><span style="font-size:16px;">AccordionLayoutContainer.onInsert(AccordionLayoutContainer.java:305)&quot;</span></span></p>
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;">&nbsp;</p>
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;"><span style="font-family: Arial, sans-serif; font-size: 12pt;"><font color="#000000">&nbsp;there can be many reasons for this error, but the major one is an attempt to add to AccordionLayoutContainer a widget which is already rendered once.</font></span></p>
<p style="font-family: arial, sans-serif; font-size: 13px; margin: 0in 0in 0pt;"><span style="font-family: Arial, sans-serif; font-size: 12pt;"><font color="#000000">It is helpful to &quot;clone&quot; the widget manually plus adding the new one to the AccordionLayoutContainer.</font></span></p>
