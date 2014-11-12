---
layout: post
title: Is there a way to see what the values of the arguments that are sent into a
  method in Java? (source or bytecode)
created: 1248345460
author: keren
permalink: /java/there-way-see-what-values-arguments-are-sent-method-java-source-or-bytecode
tags:
- JAVA
- java bytecode
---
<p>I'm trying to print out the strings sent to the UI.</p>
<p>I'm using javassist/BCEL to examine the bytecode and to look for specific UI method (i.e. label.setText)</p>
<p>Then I'm trying figure out what are the strings that are being sent to those methods.</p>
<p>If the string is explicitly sent to that method(i.e. label.setText(&quot;hello&quot;)) I'm 'catching' the LDC declaration just before the method call and I'm done.</p>
<p>However, I'm not able to handle with complicated scenarios such as label.setText(bean.getName())</p>
<p>I need to come up with some kind of logic that will enable me to dig up the 'call hierarchy' in order to figure out the declaration of the string</p>
<p>I'm open to another alternatives if you have one...</p>
