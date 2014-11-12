---
layout: post
title: project lombok - spice up your java
created: 1249345484
author: ittayd
permalink: /java/project-lombok-spice-your-java
tags:
- JAVA
---
<p>project lombok allows you to annotate classes and so have boiler plate code generated on the fly when they are compiled by eclipse or javac. the source file isn't changed, the methods are in the generated .class file. so you can annotate a class as @Data and it will have all getters, setters, a toString, hashCode and equals methods. Or you can annotate a field as @Setter or @Getter etc.</p>
<p>&nbsp;</p>
<p>see the video at the site: http://projectlombok.org/index.html</p>
<p>&nbsp;</p>
<p>to technically understand how this is done, read:</p>
<p>http://java.sun.com/javase/6/docs/technotes/tools/solaris/javac.html#processing</p>
<p>&nbsp;</p>
<p>i think this mechanism can be used to create many useful a-la lisp macros for making classes a bit more DSL.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
