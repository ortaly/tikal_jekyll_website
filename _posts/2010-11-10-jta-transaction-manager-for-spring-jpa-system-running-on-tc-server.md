---
layout: post
title: JTA transaction manager for Spring + JPA System running on tc-server
created: 1289379579
permalink: jta-transaction-manager-for-spring-jpa-system-running-on-tc-server
tags:
- JAVA
- Java J2EE
- JTA transaction manager
---
<div style="margin: 0in 0in 10pt">We are setting up a new project with JPA 2.0 based on Hibernate 3.5.1 and Spring 3.0.5.&nbsp;<br />
<span style="line-height: 115%; font-family: 'Tahoma','sans-serif'; color: #666666; font-size: 9pt; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: HE">As application server we are&nbsp;using tc-server 6.0 which is a flavor tomcat 6.0.</span><br />
We&nbsp;would lilke&nbsp;to integrate an open source (LGPL or similar licensing) JTA transaction manager in to the system.<br />
<br />
I&nbsp;am finding it hard to figure out a suitable JTA transaction manager.</div>
<div style="margin: 0in 0in 10pt">1. <a href="http://jotm.ow2.org/xwiki/bin/view/Main/WebHome">JOTM</a> looks like it has no support since Spring 3.<br />
2. <a href="http://www.atomikos.com/">Atomikos&nbsp; </a>have only version 3.6.4 in the maven repository. <br />
It looks like it has some problem and I cannot find any older/newer version (I am not sure about its licensing as well&hellip;) &nbsp;</div>
<div style="margin: 0in 0in 10pt">Can anyone recommend JTA transaction manager for me?<br />
Does XA is included within such packages or do I need XA support as well?</div>
<p>Haim</p>
