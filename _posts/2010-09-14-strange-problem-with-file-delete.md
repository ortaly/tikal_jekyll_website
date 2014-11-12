---
layout: post
title: Strange problem with File.delete
created: 1284452612
permalink: strange-problem-with-file-delete
tags:
- JAVA
- Java 6 File delete
---
<p>I&nbsp;have a strangest problem.&nbsp; (running on Windows)</p>
<p>I have a class, which receives java.io.File as a parameter and stores reference in class attribute. The file is meant to be an XML file and class processes the file with XML parser.</p>
<p>At the end of the process i have a code that deletes the file. If all works well, the file is deleted.</p>
<p>However, if exception occurs, delete fails, returning false. I checked and rechecked - all access to file InputStream has finally statement, which suppose to close the streams. Yet, the file remains.</p>
<p>I debugged the code and when the program is about to delete the file - indeed even deletetion from file explorer fails with message from OS that file is locked.</p>
<p>&nbsp;</p>
<p>Any suggestions?</p>
<p>&nbsp;</p>
<p>Thanks</p>
