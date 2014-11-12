---
layout: post
title: Your first JEE6 project with EJB Light , JPA 2.0, and JSF 2.0 on JBossAS 6
created: 1268333719
author: yanai
permalink: /java/your-first-jee6-project-ejb-light-jpa-20-and-jsf-20-jbossas-6
tags:
- JAVA
- JEE6 EJB3.1 JPA2.0 JSF2.0
---
<p>
<meta content="text/html; charset=utf-8" http-equiv="CONTENT-TYPE">
<meta content="OpenOffice.org 3.1  (Linux)" name="GENERATOR"> 	<style type="text/css">
	<!--
		<a href="http://twitter.com/page">@page</a> { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style>                                </meta>
</meta>
</p>
<p><font face="Times New Roman, serif"><font size="3">As part of Tikal Fuse Day we (the Java group) decided to get our feet wet with JEE6. Instead of develop a whole application ourselves from scratch, we wanted to &ldquo;learn by example&rdquo; by taking an example, understand its code, build and run it on GlassFish and JBoss AS. </font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">We searched for a full stack application, yet small, which includes JPA 2.0 , EJB 3.1 with JSF 2.0. There are quite a few samples out there, including the ones distributed with </font></font><strong><a href="https://glassfish-samples.dev.java.net/files/documents/4742/146034/javaee6-samples-1.0-b03-installer.jar"><font face="Times New Roman, serif"><font size="3">GlassFish</font></font></a><font face="Times New Roman, serif"><font size="3"> </font></font></strong><font face="Times New Roman, serif"><font size="3">and</font><em><font size="3"> </font></em></font><a href="http://docs.jboss.org/weld/reference/1.0.1-Final/en-US/html/weldexamples.html"><font face="Times New Roman, serif"><font size="3"><b>WELD</b></font></font></a><font face="Times New Roman, serif"><font size="3"> downloads. Nevertheless, to get the whole picture, we wanted a &ldquo;full stack&rdquo; application with including all layers above integrated within it. The only application we found was<span><span> </span></span></font></font><a href="http://weblogs.java.net/blog/2009/07/24/jsf-20-jpa-glassfish-and-mysql"><font face="Times New Roman, serif"><font size="3"><b>the pet catalog application</b></font></font></a><font face="Times New Roman, serif"><font size="3"><span><span>.</span></span></font></font><font face="Times New Roman, serif"><font size="3"><i><b> </b></i></font></font></p>
<p>&nbsp;</p>
<p><img width="472" height="541" alt="Pet Catalog page " src="/files/upload/27/petcatjsf2.jpg" /></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>Its a simple application, yet covers all the three building blocks above &ndash; just what we looked for...but...</span></span></font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">...If you read the post instruction, you will see they are oriented to Net-Beans, Ant , MySQL and GlassFish. Not our &ldquo;cup of tea&rdquo;. I like my application to be Maven based- decouple its build life cycle from any IDE, and I would like it be run on other application servers like JBoss...</font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">So our goals were as follows:</font></font></p>
<ol>
    <li>
    <p>&ldquo;<font face="Times New Roman, serif"><font size="3">Mavenize&rdquo; the 	project.</font></font></p>
    </li>
    <li>
    <p><font face="Times New Roman, serif"><font size="3">Run it within 	GlassFish</font></font></p>
    </li>
    <li>
    <p><font face="Times New Roman, serif"><font size="3">Run it within JBoss</font></font></p>
    </li>
</ol>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">You can &ldquo;git clone&rdquo; the project from <a href="http://github.com/Tikal-Fuse/jee6-pet-catalog-sample"><strong>Tikal-Fuse at github</strong></a><i><b>. </b></i></font></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">Here are the steps we did to build and run the project on GlassFish and JBoss:</font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">1. &ldquo;Mavenize&rdquo; the project.</font></font></p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>First step was writing a <a href="http://github.com/Tikal-Fuse/jee6-pet-catalog-sample/raw/master/pom.xml"><strong>pom.xml file</strong></a> which will build and package the application to a standard JEE6 war (we'll create a JEE6 &ldquo;web profile&rdquo; EJB based application). . Have a look at <a href="http://github.com/Tikal-Fuse/jee6-pet-catalog-sample/raw/master/pom.xml"><strong>pom.xml file</strong></a>. Note how simple and concise it is : There is only one dependency javaee-web-api artifact that encapsulates the whole JEE6 specs api:</span></span></font></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class=" xhtml;">
&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;javax&lt;/groupId&gt;
        &lt;artifactId&gt;javaee-web-api&lt;/artifactId&gt;
        &lt;scope&gt;provided&lt;/scope&gt;
        &lt;version&gt;6.0&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>Since these api are provided by the container, there is no need to package it with our war &ndash; keep our war small without any jar in the WEB-INF/lib directory  -  we declare the dependency with &ldquo;provided&rdquo; scope on our pom.xml file. Last , we moved the sources according to </span></span></font></font><a href="http://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html"><font face="Times New Roman, serif"><font size="3"><b>Maven defaults directory structure</b></font></font></a><font face="Times New Roman, serif"><font size="3"><span><span>. </span></span></font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>Y</span></span>ou can check out the whole re-factored project from <a href="http://github.com/Tikal-Fuse/jee6-pet-catalog-sample"><strong>Tikal-Fuse at github</strong></a><i><b>.</b></i><i><span> </span></i><span><span>If you look at the code you will see how concise it is, and how simple is the JEE6 compare to previous specs and even to other application frameworks. For example you can see there is no needed interface for the SLSB, and the faces-config file is almost empty without navigation any rules and managed beans declared within it. The view layer uses facelets and xhtml as the view layer etc. In addition, our application is a war application rather than ear file.</span></span></font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">All you have to do now is invoke &ldquo;mvn install&rdquo;. If everything goes well, you will have a &ldquo;petcatalog.war&rdquo; directory (we chose to use exploded war rather than a file)  in the &ldquo;target&rdquo; directory. </font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">2. <span><span>Run it within GlassFish</span></span></font></font></p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>After </span></span></font></font><a href="http://download.java.net/glassfish/v3/release/glassfish-v3-web.zip"><font face="Times New Roman, serif"><font size="3"><b>downloading GlassFish</b></font></font></a><font face="Times New Roman, serif"><font size="3"><span><span>, copy our war to the &ldquo;autodeploy&rdquo; directory and run by invoking &ldquo;asadmin start-domain&rdquo; from the Glassfish &ldquo;bin&rdquo; directory, and make sure the war is deployed succulency by looking at GlassFish log.</span></span></font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3"><span><span>Next step is to create a schema in MySQL called &ldquo;petcatalog&rdquo; , and copy MySQL driver to Glassfish. Then you need to define a MySQL data-source in Glassfish, and a JNDI entry, &ldquo;</span></span></font></font><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span>jdbc/petcatalog&rdquo;. All these is explained at the following link </span></span></font></font></font><font face="Times New Roman, serif"><font size="3"><span><span><a href="http://www.albeesonline.com/blog/2008/08/06/creating-and-configuring-a-mysql-datasource-in-glassfish-application-server/"><strong>here</strong></a>.</span></span></font></font></p>
<p>&nbsp;</p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">Now we need to populate our database with data. Use &ldquo;catalog/src/main/resources/catalog.sql&rdquo; to create &ldquo;item&rdquo; table and fill some data within it. Run the following command</font></font></font></p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">mysql petcatalog -uYOUR_USERNAME -pYOUR_PASSWD &lt; 'catalog/src/main/resources/catalog.sql'</font></font></font></p>
<p>&nbsp;</p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span>Now you can run the application and open your browser at </span></span></font></font></font><a href="http://localhost:8080/petcatalog">http://localhost:8080/petcatalog</a><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span>.</span></span></font></font></font></p>
<p>&nbsp;</p>
<p><font face="Times New Roman, serif"><font size="3">3. Run it within JBoss</font></font></p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">First you have to download JBoss 6. At the time of writing  JBoss 6 is in development phase, and the current milestone is M2. You can download it from <a href="http://sourceforge.net/projects/jboss/files/JBoss/JBoss-6.0.0.M2/jboss-6.0.0.M2.zip/download"><i><b>here</b></i></a>.</font></font></font></p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">The only change in the application is the JNDI name of our data-source. You will need to change the persistence.xml file in our petcatalog.war directory. Open &ldquo;target/petcatalog.war/WEB-INF/classes/META-INF/persistence.xml&rdquo; and change it as follows (only the jbdi name has been changed)</font></font></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class=" xhtml;">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;persistence version=&quot;2.0&quot; xmlns=&quot;http://java.sun.com/xml/ns/persistence&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd&quot;&gt;
      &lt;persistence-unit name=&quot;catalogPU&quot; transaction-type=&quot;JTA&quot;&gt;
          &lt;jta-data-source&gt;jdbc/petcatalog&lt;/jta-data-source&gt;
          &lt;properties/&gt;
      &lt;/persistence-unit&gt;
&lt;/persistence&gt;</pre>
<p>&nbsp;</p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span>Copy your petcatalog.war directory to &ldquo;server/default/deploy&quot; directory of JBoss. As you did in GlassFish, you will need to copy the mysql driver and define a data-source to it in JBoss: Copy </span></span></font></font></font><a href="http://repo1.maven.org/maven2/mysql/mysql-connector-java/3.1.14/mysql-connector-java-3.1.14.jar"><font face="Times New Roman, serif"><font size="3"><b>the MySQL drive jar</b></font></font></a><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span> to &ldquo;common/lib&rdquo; directory, and define the the data-source by creating the following mysql-ds.xml in &ldquo;server/default/deploy&quot; directory:</span></span></font></font></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class=" xhtml;">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;datasources&gt;
  &lt;local-tx-datasource&gt;
    &lt;jndi-name&gt;jdbc/petcatalog&lt;/jndi-name&gt;
    &lt;connection-url&gt;jdbc:mysql://localhost:3306/petcatalog&lt;/connection-url&gt;
    &lt;driver-class&gt;com.mysql.jdbc.Driver&lt;/driver-class&gt;
    &lt;user-name&gt;USERNAME&lt;/user-name&gt;
    &lt;password&gt;PASSWD&lt;/password&gt;
    &lt;metadata&gt;
       &lt;type-mapping&gt;mySQL&lt;/type-mapping&gt;
    &lt;/metadata&gt;
  &lt;/local-tx-datasource&gt;
&lt;/datasources&gt;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3"><span><span>Run JBoss by invoing &ldquo;bin/run.sh&rdquo; and browse again to </span></span></font></font></font><a href="http://localhost:8080/petcatalog">http://localhost:8080/petcatalog</a></p>
<p>&nbsp;</p>
<h1>&nbsp;</h1>
<h1><u><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">Conclusion</font></font></font></u></h1>
<p><font face="Times New Roman, serif"><font size="3"><font color="#1a1a1a"><span><span>Vuala! <a href="http://github.com/Tikal-Fuse/jee6-pet-catalog-sample"><strong>You have a runnable JEE6 application</strong></a> which includes MySQL, JPA2, EJB3.1 and JSF 2.0 , built up with Maven to a small war file, which can easily be deployed to both GlassFish and JBoss (and actually to any JEE6 compliance server) with very minor deployment change.</span></span></font></font></font></p>
<p>&nbsp;</p>
<p><font color="#1a1a1a"><font face="Times New Roman, serif"><font size="3">I hope the example and instructions above helped you kick off your own JEE6 application.</font></font></font></p>
<p>&nbsp;</p>
<p>A short description of Java Fuse day can be seen here:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><embed width="450" height="359" allowfullscreen="true" allowscriptaccess="always" type="application/x-shockwave-flash" src="http://blip.tv/play/grVLgc2VRgA"></embed></p>
