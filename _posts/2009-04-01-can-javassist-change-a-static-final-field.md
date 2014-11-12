---
layout: post
title: Can Javassist change a static final field?
created: 1238582695
author: keren
permalink: /java/can-javassist-change-static-final-field
tags:
- JAVA
- javassist jbossretro
---
<p><span class="postbody">Hi, <br />
I'm using ClassFile.renameClass as in jbossretro in order to replace instances of a class in a some.jar to my own class. <br />
This is what I wants to achieve: <br />
Some classes in the </span><span class="postbody">some.jar</span><span class="postbody"> are using class A: <br />
public class A { <br />
.... <br />
}<br />
I've created a new class AA: <br />
public class AA extends A{ <br />
....(overwrite some methods) <br />
} <br />
<br />
I want to replace the A instances with AA in the </span><span class="postbody">some.jar</span><span class="postbody">. <br />
In the </span><span class="postbody">some.jar</span><span class="postbody"> I have class B as follows: <br />
<br />
public class B { <br />
.... <br />
private final A a = ....; <br />
.... <br />
} <br />
But... <br />
I cannot replace the final fields. <br />
</span></p><p><span class="postbody">Hi, <br />
I'm using ClassFile.renameClass as in jbossretro in order to replace instances of a class in a some.jar to my own class. <br />
This is what I wants to achieve: <br />
Some classes in the </span><span class="postbody">some.jar</span><span class="postbody"> are using class A: <br />
public class A { <br />
.... <br />
}<br />
I've created a new class AA: <br />
public class AA extends A{ <br />
....(overwrite some methods) <br />
} <br />
<br />
I want to replace the A instances with AA in the </span><span class="postbody">some.jar</span><span class="postbody">. <br />
In the </span><span class="postbody">some.jar</span><span class="postbody"> I have class B as follows: <br />
<br />
public class B { <br />
.... <br />
private final A a = ....; <br />
.... <br />
} <br />
But... <br />
I cannot replace the final fields. <br />
I've looked at JBossRetro - it's a tool to set bytecode compiled with java 1.5 as it was compiled with java 1.4 - when they replacing the StringBuilder with JBossStringBuilder (their own implementation)- they have the same bug. final field referring to StringBuilder are not replaceable. </span></p>
<p><span class="postbody">Are you familiar with thoses frameworks? Is there a way to replace the final declaration - I'm working on the bytecode. <br />
10x, <br />
Keren</span></p>
<p>javassist - <span class="postbody"> <a href="http://www.jboss.org/community/docs/DOC-10738">www.jboss.org/javassist</a></span></p>
<p>jbossretro - <a href="http://www.jboss.org/community/docs/DOC-10738">www.jboss.org/community/docs/DOC-10738</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
