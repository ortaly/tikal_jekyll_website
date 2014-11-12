---
layout: post
title: Eclipse 3.5 on Ubuntu 9.10
created: 1257151174
author: itai
permalink: /devops/eclipse-35-ubuntu-910
tags:
- DevOps
- Eclipse 3.5 Ubuntu 9.10
---
<p>If you upgrade to Ubuntu 9.10 and then eclipse buttons stop work.</p>
<p>&nbsp;</p>
<p>There is some bug in eclipse regardes to SWT on GTK</p>
<p>&nbsp;</p>
<p>https://bugs.eclipse.org/bugs/show_bug.cgi?id=287307 this bug is fix in eclipse 3.6 M2</p>
<p>&nbsp;</p>
<p>There is workaround to set System enviorment in the shell you start eclipse from.</p>
<p>&nbsp;</p>
<p>export GDK_NATIVE_WINDOWS=1</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
