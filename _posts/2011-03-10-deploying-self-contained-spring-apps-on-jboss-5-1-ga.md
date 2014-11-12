---
layout: post
title: Deploying self-contained Spring apps on JBoss 5.1.GA
created: 1299765620
author: zvika
permalink: /devops/deploying-self-contained-spring-apps-jboss-51ga
tags:
- DevOps
- Spring
---
<p><font class="Apple-style-span" face="Arial" size="2">Recently, I was in need to deploy Spring's sample Travel web application on JBoss 5.1. The process of making the deployment pass mainly consisted of solving mismatches between JBoss JPA and the web-application-contained Hibernate. I hope the following description of the steps will help others (diminishing bunch?) &nbsp;deploy Spring apps on JBoss 5.1.</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">1. Remove logj jar from your WEB-INF/lib</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">2. Remove xml-apis jar from your WEB-INF/lib</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">3. Rename your </font><span class="Apple-style-span" style="font-family: Arial; font-size: small; ">persistence.xml (mine was under&nbsp;</span><span class="Apple-style-span" style="font-family: Arial; font-size: small; ">WEB-INF/classes/META-INF/), for example, to jpa-persistence.xml</span></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">4. Modify hibernate configuration (mine was under WEB-INF/classes/META-INF/spring/data.xml),&nbsp;adding the following to your entityManagerFactory bean definition:&nbsp;</font><font class="Apple-style-span" face="Arial" size="2">&lt;property name=&quot;persistenceXmlLocation&quot; value=&quot;classpath:META-INF/jpa-persistence.xml&quot; /&gt;</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">5. Remove the following Hibernate implementation jars in server/common/lib:</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-annotations.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-commons-annotations.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-core.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-entitymanager.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-validator.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
<p><font class="Apple-style-span" face="Arial" size="2">6. Add Hibernate implementation jars of your preferred version to server/common/lib, instead. I used:</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-annotations-3.5.0-Final.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-commons-annotations-3.2.0.Final.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-core-3.5.0-Final.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-entitymanager-3.5.0-Final.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-jpa-2.0-api-1.0.0.Final.jar</font></p>
<p><font class="Apple-style-span" face="Arial" size="2"><span class="Apple-tab-span" style="white-space:pre">	</span>hibernate-validator-4.0.2.GA.jar</font></p>
<p>&nbsp;</p>
<p><font class="Apple-style-span" face="Arial" size="2"><br />
</font></p>
