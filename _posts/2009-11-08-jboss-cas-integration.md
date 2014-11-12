---
layout: post
title: 'JBoss CAS integration '
created: 1257683101
permalink: jboss-cas-integration
tags:
- JAVA
- CAS Security SSO
---
<p>&nbsp;At my customer we have a legacy application that used to authenticate to JBoss 4.2.3 via the web container security module in web xml over form based authentication. In our EJBs we restrict the access to method using permissions.</p>
<p>Now we need to throw away the web based authentication and start using a CAS server (external).</p>
<p class="MsoNormal">When we disabled the security constrain in the web.xml we get error from EJBs (as expected) but we do not know how to inject the&nbsp;<span class="Apple-style-span" style="font-size: 12px; line-height: 19px; ">principals&nbsp;</span>and workaround the authentication.</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><u>The questions are:</u></p>
<ol style="margin-top:0in" start="1" type="1">
    <li class="MsoNormal" style="mso-list:l0 level1 lfo1;tab-stops:list .5in">Do we      have somewhere a documented procedure/example to integrate CAS and JBoss (in      the jboss site I found only stuff about JBoss portal which is irrelevant.</li>
    <li class="MsoNormal" style="mso-list:l0 level1 lfo1;tab-stops:list .5in">Do we      have an example on how we can inject principal in a programmatic manner</li>
</ol>
<p class="MsoNormal">Thanks</p>
