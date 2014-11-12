---
layout: post
title: Adding UTF8 support to JBoss, Hibernate, mysql and Apache  mod_jk
created: 1234174390
author: admin
permalink: /devops/adding-utf8-support-jboss-hibernate-mysql-and-apache-mod-jk
tags:
- DevOps
- Hibernate
- jboss
- UTF8
- mysql and Apache  mod_jk
---
<p>Recently I had to convert a system to be fully UTF8 compliant accross all tiers. Folowing are the instructions needed to make your system do the same and support multiple languages. I tested our system with 4 different languages including Hebrew, German, Arabic and Russian.</p>
<p>&nbsp;</p>
<p>This file is a standard JPA file: /META-INF/persistence.xml</p>
<pre>
&lt;property name=&quot;hibernate.connection.useUnicode&quot; value=&quot;true&quot;/&gt;
&lt;property name=&quot;hibernate.connection.characterEncoding&quot; value=&quot;UTF-8&quot; /&gt;

</pre>
<p>This file is relevant to anyone using seam: page.xhtml</p>
<pre>
&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot;&gt;&lt;/meta&gt;
</pre>
<p><br />
	This is a custom MYSQL file that must be executed before you attempt inserting UTF8 charecters using mysql client&nbsp;:utfsupport.sql</p>
<pre>
SET NAMES &#39;utf8&#39;;
ALTER DATABASE xpr_cms DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
SHOW CREATE DATABASE xpr_cms;
</pre>
<p>This is standard JBoss configuration file&nbsp;: /jboss/default/deploy/jboss-web.deployer/server.xml Add the following property to each Connector component</p>
<pre>
URIEncoding=&quot;UTF-8&quot;
</pre>
<p>Add the following property to each AJP Connector component to correctly work with mod_jk</p>
<pre>
URIEncoding=&quot;UTF-8&quot; useBodyEncodingForURI=&quot;true&quot;
</pre>
<p>In case you have any <b>regular expression validations</b> on Hibernate entity fields,( such as <strong>@Pattern(regex = RegularExpressions.REGEX_NAME</strong>) for instance, they must be disabled. If anyone has a solution to this issue, please contact me.</p>
<p>Questions welcomed,</p>
<p>Shlomo.</p>
