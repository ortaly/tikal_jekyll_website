---
layout: post
title: Add A Remote In-Process REPL to your Scala Project
created: 1260102660
author: ittayd
permalink: /java/add-remote-process-repl-your-scala-project
tags:
- JAVA
- Scala
---
<p>http://gracelessfailures.com/adding-a-remote-in-process-repl-to-your-scala</p>
<p>&nbsp;</p>
<p>The above post will show you how to create a Scala REPL (read-eval-print-loop) to your application so it can be connected from remote for query and analysis. Of course, in order for this to be effective, there should be some hooks in the application to connect to subsystems from the REPL (e.g., a shared application context)</p>
<p>&nbsp;</p>
<p>Note that because Scala can use Java object transparently, this can be helpful even for Java applications (but to use the REPL you'd still need to know Scala). Also, it is probably possible to do such stuff with Java (read line, compile, execute), but probably a lot more work (see http://www.beanshell.org/manual/remotemode.html for beanshell based repl)</p>
