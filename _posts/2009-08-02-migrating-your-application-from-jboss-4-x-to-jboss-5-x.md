---
layout: post
title: Migrating your application from JBoss 4.x to JBoss 5.x
created: 1249198317
author: elad
permalink: /java/migrating-your-application-jboss-4x-jboss-5x
tags:
- JAVA
- Persistence.xml
- JSP 2.0
- JBoss 5.x
- JBoss 5
- ear
---
<ul>
    <li>When migrating your application from JBoss 4.x to JBoss 5.x, some problems might occur.</li>
    <li>Below is a list of some of these possible problems. Each problem is associated with its possible reason and solution.</li>
    <li>This list was partially taken from JBoss migration tips posted here:</li>
    <li><a href="http://labs.jboss.com/community/wiki/MigrationfromJBoss4.pdf"><cite><span dir="ltr">labs.jboss.com/community/wiki/MigrationfromJBoss4.pdf</span></cite></a></li>
    <li>&nbsp;</li>
    <li>1)&nbsp;&nbsp;&nbsp;&nbsp; <strong>EAR can't be deployed</strong></li>
    <li><u>Reason</u></li>
    <li>The ejb-jar-Attributes are more seriously validated against the dtd.</li>
    <li>&nbsp;</li>
    <li><u>Solution</u></li>
    <li>Replace the current header of the ejb-jar.xml:</li>
    <li>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;&lt;!DOCTYPE ejb-jar PUBLIC &quot;-//Sun</li>
    <li>Microsystems, Inc.//DTD Enterprise JavaBeans 2.0//EN&quot; &quot;http://java.sun.com/dtd/ejbjar_2_0.dtd&quot;&gt;&lt;ejb-jar&gt;</li>
    <li>&nbsp;</li>
    <li>2)&nbsp;&nbsp;&nbsp;&nbsp; <strong>Persistence.xml fails to deploy</strong></li>
    <li><u>Reason</u></li>
    <li>This file is strictly validated by JBoss 5 (unlike the validation done in JBoss 4)</li>
    <li>&nbsp;</li>
    <li><u>Solution</u></li>
    <li>Make sure the header of persistence.xml is :</li>
    <li>&lt;persistence xmlns=&quot;http://java.sun.com/xml/ns/persistence&quot; xmlns:xsi=&quot;http://www.w3.org/2001/</li>
    <li>XMLSchema-instance&quot; xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/</li>
    <li>ns/persistence/persistence_1_0.xsd&quot; version=&quot;1.0&quot;&gt;</li>
    <li>&nbsp;</li>
    <li>3)&nbsp;&nbsp;&nbsp;&nbsp; <strong>JSP's are not compiled anymore</strong></li>
    <li><u>Reason</u></li>
    <li>According to JSP 2.0 specification this code is illegal:</li>
    <li>&lt;mytags:tag value=&quot;&lt;%= &quot;hi!&quot; %&gt;&quot; /&gt;</li>
    <li>&nbsp;</li>
    <li>Instead the correct sentence would be:</li>
    <li>&lt;mytags:tag value='&lt;%= &quot;hi!&quot; %&gt;' /&gt;&lt;mytags:tag value=&quot;&lt;%= \&quot;hi!\&quot; %&gt;&quot; /&gt;&lt;mytags:tag</li>
    <li>value='&lt;%= \&quot;name\&quot; %&gt;' /&gt;</li>
    <li>&nbsp;</li>
    <li><u>Solution</u></li>
    <li>Change all tags to a pattern like &lt;mytags:tag value='&lt;%= &quot;hi!&quot; %&gt;' /&gt; to be compatible with</li>
    <li>the current spec.</li>
    <li>&nbsp;</li>
    <li>4)&nbsp;&nbsp;&nbsp;&nbsp; <strong>JSP's are reaching the 65k-boundary</strong></li>
    <li><u>Reason</u></li>
    <li>Tomcat encodes all of its variables, making the code very large.</li>
    <li>&nbsp;</li>
    <li><u>Solution</u></li>
    <li>Alter jboss-5.0.0.GA/server/default/deployers/jbossweb.deployer/web.xml</li>
    <li>In section</li>
    <li>&lt;servlet&gt; &lt;servlet-name&gt;jsp&lt;/servlet-name&gt; &lt;servletclass&gt;org.apache.jasper.servlet.JspServlet&lt;/servlet-class&gt;</li>
    <li>add&lt;init-param&gt; &lt;param-name&gt;genStrAsCharArray&lt;/param-name&gt; &lt;paramvalue&gt;true&lt;/param-value&gt; &lt;/init-param&gt;</li>
</ul>
