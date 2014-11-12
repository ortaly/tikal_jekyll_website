---
layout: post
title: Solving Cyclic Dependency
created: 1289920402
author: zvika
permalink: /devops/solving-cyclic-dependency
tags:
- DevOps
---
<p>hi,<br />
<br />
I have the following condition, which creates a cyclic dependency error  which I'd very much like to solve with as little code duplication as  possible...<br />
<br />
Every module creates a test-jar. all the modules consume common's test  jar (which contains test base classes, test annotations, etc.)<br />
<br />
The parent reactor defines all modules as sons. Also, it defines the  dependency for common-jar in it's dependencies, so that all child  modules could inherit that dependencies. This propogates down to all child modules, including common. Hence, a cyclic dependency is creates betwen parent -&gt; common -&gt; parent<br />
<br />
<br />
it looks like this:<br />
<br />
Reactor:<br />
&nbsp;&nbsp; modules: common, svc, web, ...<br />
&nbsp;&nbsp; dependencies: common-test (scope: test, classifier: tests)<br />
<br />
Common:<br />
&nbsp;&nbsp; parent: Reactor</p>
<p>&nbsp;&nbsp; dependencies: common-test(inherited), ...<br />
<br />
Web, Svc, ...<br />
<br />
any ideas welcome!<br />
thanks,<br />
Zvika</p>
