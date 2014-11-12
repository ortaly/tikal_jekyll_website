---
layout: post
title: 'programmatically control ssh '
created: 1267693089
author: ittayd
permalink: /devops/programmatically-control-ssh
tags:
- DevOps
- ssh
---
<p>&nbsp;Sometimes, during nightly build, packaging or deployment there's a need to retrieve remote files or control a remote machine. Doing this through ssh is tricky. A common tool to use is 'expect', but it is unixy and requires knowing Tcl.</p>
<p>&nbsp;</p>
<p>The enchanter tool (<span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "><a href="http://code.google.com/p/enchanter/">http://code.google.com/p/enchanter/</a>) can be used instead. From the site:</span></p>
<p><span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal; font-size: 13px; ">
<p style="max-width: 65em; ">Enchanter is a small library that helps you script SSH sessions in a manner similar to&nbsp;<a href="http://expect.nist.gov/" rel="nofollow" style="color: rgb(0, 0, 204); ">Expect</a>. It comes in multiple flavors that support different scripting languages including&nbsp;<a href="http://www.jython.org/" rel="nofollow" style="color: rgb(0, 0, 204); ">Python</a>,&nbsp;<a href="http://jruby.codehaus.org/" rel="nofollow" style="color: rgb(0, 0, 204); ">Ruby</a>&nbsp;and&nbsp;<a href="http://beanshell.org/" rel="nofollow" style="color: rgb(0, 0, 204); ">BeanShell</a>. This tool requires Java 5 or greater.</p>
<div>&nbsp;</div>
</span></p>
