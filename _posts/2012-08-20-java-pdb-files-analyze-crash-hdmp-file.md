---
layout: post
title: java .pdb files, analyze crash hdmp file
created: 1345491155
permalink: java-pdb-files-analyze-crash-hdmp-file
tags:
- JAVA
- windbg
- crash dump
- .pdb
- .hdmp
---
<p>Hi,</p>
<p>Long time.. :) first, hope all are well.</p>
<p>&nbsp;</p>
<p>I am trying to analyze .hdmp file (windows crash dump)&nbsp;that contains a java crash.</p>
<p>I am seeing the stack dump crash and all the dlls/modules but not the java ones such as (jvm,nio,etc..).</p>
<p>When I use windbg or Visual Studio it shouts about missing java symbols/.pdb files which do not exist in the jdk/jre.</p>
<p>&nbsp;</p>
<p>I saw on the internet some answer about getting a debug jdk version which i can't find..</p>
<p>&nbsp;</p>
<p>Anyone knows how can i get java .pdb files?&nbsp;or to analyze this file in other way without these?</p>
<p>&nbsp;</p>
<p>I suspect NIO is the cause for this crash and i would like to be able to read the missing stack lines, to know which class/function is calling it.</p>
<p>&nbsp;</p>
<p>analyze -V is here: <strong>http://stackoverflow.com/questions/12265573/looking-for-java-pdb-files-analyze-a-crash-hdmp-file</strong></p>
<p>Cheers.</p>
