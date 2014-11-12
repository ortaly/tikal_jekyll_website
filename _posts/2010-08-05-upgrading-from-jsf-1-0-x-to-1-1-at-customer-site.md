---
layout: post
title: Upgrading from JSF 1.0.x to 1.1 at customer site
created: 1281040561
author: lior.kanfi
permalink: /java/upgrading-jsf-10x-11-customer-site
tags:
- JAVA
- myfaces jboss4
---
<p>I wanted to share a small case resolution I had to resolve at customer site, I think the main conclusion from the issue was before starting to troubleshooting, read
<meta http-equiv="content-type" content="text/html; charset=utf-8">carefully your exception stack trace.  </meta>
</p>
<p>&nbsp;</p>
<!--break-->
<p><strong>Case details at glance</strong></p>
<p>- Customer had two myfaces web applications deployed under JBoss 4.0.5 with in a ear.</p>
<p>- The customer wanted to upgrade one of the web application from old myfaces 1.0.x version to 1.1.x</p>
<p>- The customer wanted to from JDK5 to JDK6.</p>
<p>&nbsp;</p>
<p><strong>Case exception</strong></p>
<p>- The upgrade from myfaces 1.0.x to 1.1.x was
<meta http-equiv="content-type" content="text/html; charset=utf-8">successful under JDK5    </meta>
</p>
<p>- Under JDK6 after using the login method, an error page with following exception was displayed:</p>
<pre class="brush: java;" title="code">

ERROR [UIComponentTag] Faces context not found. 
javax.faces.webapp.UIComponentTag.setupResponseWriter(UIComponentTag.java:615)
 javax.faces.webapp.UIComponentTag.doStartTag(UIComponentTag.java:217)
 org.apache.myfaces.taglib.core.ViewTag.doStartTag(ViewTag.java:71)
 org.apache.jsp.pages.Home_jsp._jspService(org.apache.jsp.pages.Home_jsp:98)
 org.apache.jasper.runtime.HttpJspBase.service(HttpJspBase.java:97)
 javax.servlet.http.HttpServlet.service(HttpServlet.java:810)
 org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:322)
 org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:314)
 org.apache.jasper.servlet.JspServlet.service(JspServlet.java:264)
 javax.servlet.http.HttpServlet.service(HttpServlet.java:810)

</pre>
<p><strong>Case resolution options</strong></p>
<p>The above exception imply a JSF initialization error , several causes might be</p>
<p>- Duplication of JSF jars which result classloading issue</p>
<p>- JSF Misconfiguration</p>
<p>&nbsp;</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<p>Most of the recommendation after googling about the issue is to find JSF duplication jars, or examine the web.xml <span style="font-family: Courier New;">&lt;servlet-mapping&gt;</span> misconfiguration</p>
<p>My first step was to examine the jars duplication and found out I have  3 JSF's jars, 1 under jbossweb-tomcat.sar , and 2 under each war file.</p>
<p>removing the jsf-lib jars under jbossweb-tomcat.sar, a necessary step to eliminate jsf's issues, but the step didn't helped me to resolve the exception.</p>
<p>&nbsp;</p>
<p>My second step was to examine the web.xml and try to figure out misconfiguration, the <span style="font-family: Courier New;">FacesServlet &lt;servlet-mapping&gt;</span> configuration was OK, it was mapping *.jsf request correctly.</p>
<p>&nbsp;</p>
<p>That's left me with no other options, I started to look back into the Exception details, and found out the request wasn't handled by the <span style="font-family: Courier New;">FacesServlet</span>, which explain for sure, why <span style="font-family: Courier New;">FacesContext</span> is not initialized.</p>
<p>I went back to the web.xml and examined it carefully, and found the issue, a unkown to me,&nbsp;</p>
<p><span style="font-family: Courier New;">DefaultServletOverride</span></p>
<p>servlet was configured to catch all request.</p>
<pre class="brush: xhtml;" title="code">
 &lt;!-- definition for the default servlet --&gt;
        &lt;servlet&gt;
            &lt;servlet-name&gt;DefaultServletOverride&lt;/servlet-name&gt;
        &lt;servlet-class&gt;org.apache.catalina.servlets.DefaultServlet&lt;/servlet-class&gt;
        &lt;init-param&gt;
                &lt;param-name&gt;listings&lt;/param-name&gt;
                &lt;param-value&gt;false&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
        &lt;/servlet&gt;

        &lt;!-- Add a mapping for our new default servlet --&gt;
        &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;DefaultServletOverride&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/&lt;/url-pattern&gt;
        &lt;/servlet-mapping&gt;</pre>
<p>&nbsp;</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<p>Removing the above configuration, resolved the issue.</p>
<p>&nbsp;</p>
<p>I think the main lesson I learned, as always, don't hurry to google  around using the info you collected at first insight, take a deep  breath and read the exception details carefully.&nbsp;</p>
