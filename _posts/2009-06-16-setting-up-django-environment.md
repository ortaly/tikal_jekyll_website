---
layout: post
title: Setting up Django Environment
created: 1245147561
permalink: setting-up-django-environment
tags:
- JAVA
- Django Web Frameworks Environment
---
<p style="margin-left: 0.25in; text-indent: -0.25in;"><span style="">1.<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span dir="ltr"><strong>Installing Python</strong> - The core Django framework works with any Python version from 2.3 to 2.6 (If you&rsquo;re on Linux or Mac OS X, you probably have Python already installed),which can be download <a href="http://www.python.org/download/">here</a>.Check it by typing&nbsp; </span><em><span class="pre"><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;">python</span></span> </em>at a command prompt, you should see something like:<o:p></o:p></p>
<pre style="margin-left: 0.25in;" id="cn11">
Python 2.4.1 (#2, Mar 31 2005, 00:05:10)
[GCC 3.3 20030304 (Apple Computer, Inc. build 1666)] on darwin
Type &quot;help&quot;, &quot;copyright&quot;, &quot;credits&quot; or &quot;license&quot; for more information.
&gt;&gt;&gt;<o:p></o:p></pre>
<pre style="margin-left: 0.25in;">
Note that! on windows set the python installation dir in the path environment variable<o:p></o:p></pre>
<p style="margin-left: 0.25in; text-indent: -0.25in;"><span class="pre"><span style="">2.<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span dir="ltr"><strong>Installing Django - </strong>Download Django tar.gz installation file from <a href="http://www.djangoproject.com/download/">here</a>, extract it.and run the command </span><span class="pre"><i><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;">python</span></i></span><tt><i><span style="font-size: 10pt;"> </span></i></tt><span class="pre"><i><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;">setup.py</span></i></span><tt><i><span style="font-size: 10pt;"> </span></i></tt><span class="pre"><i><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;">install.</span></i></span><span class="pre"><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;">Check your installation by typing those lines in a python shell:</span><o:p></o:p></span></p>
<pre><span style="">&nbsp; </span><span style="">&nbsp;&nbsp;&nbsp;</span>&gt;&gt;&gt; import django<o:p></o:p></pre>
<pre><span style="">&nbsp;&nbsp;&nbsp;&nbsp; </span>&gt;&gt;&gt; django.VERSION<o:p></o:p></pre>
<p><span style="">&nbsp;&nbsp;&nbsp; </span>You should see something like: (1, 0, 2, 'final', 0)</p>
<p class="MsoNormal" style="margin-left: 0.25in; text-indent: -0.25in;"><span style="">3.<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span dir="ltr"><b>Setting up a Database -<span style="">&nbsp; </span></b>Setting up the database is a two-step process:</span></p>
<p class="MsoNormal" style="margin-left: 0.25in;"><span style="font-family: Symbol;">&middot;</span><span style="">&nbsp; </span>First, you&rsquo;ll need to install and configure the database server itself. This process is beyond the scope of this article.<o:p></o:p></p>
<p class="MsoNormal" style="margin-left: 0.25in;"><span style="font-family: Symbol;">&middot;</span><span style="">&nbsp; </span>Second, you&rsquo;ll need to install the Python library for your particular database backend. This is a third-party bit of code that allows Python to interface with the database. We outline the specific, per-database requirements in the following sections.<o:p></o:p></p>
<p class="cn" style="margin-left: 0.25in;">Django supports four database engines:<o:p></o:p></p>
<p class="MsoNormal" style="margin-left: 0.75in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span dir="ltr">PostgreSQL &ndash; <span style="">&nbsp;</span>install python library from : <a href="http://www.djangoproject.com/r/python-pgsql/">Linux</a> , <a href="http://www.djangoproject.com/r/python-pgsql/windows/">Windows</a></span></p>
<p class="MsoNormal" style="margin-left: 0.75in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span dir="ltr">SQLite 3 <span style="">&nbsp;</span>- install python library from <a href="http://www.djangoproject.com/r/python-sqlite/">here</a></span></p>
<p class="MsoNormal" style="margin-left: 0.75in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span dir="ltr">MySQL (4.0 or above) - install python library from <a href="http://www.djangoproject.com/r/python-mysql/">here</a></span></p>
<p class="MsoNormal" style="margin-left: 0.75in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant: normal; font-weight: normal; font-size: 7pt; line-height: normal; font-size-adjust: none; font-stretch: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span dir="ltr">Oracle (9i and higher ) - install python library from <a href="http://cx-oracle.sourceforge.net/">here</a><b><o:p></o:p></b></span></p>
<p class="MsoNormal" style=""><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="">Once you&rsquo;ve installed Python, Django and (optionally) your database server/library, you can take the first step in developing a Django application by creating a <em>project</em>.</p>
<p class="MsoNormal" style="">&nbsp;</p>
<p class="MsoNormal" style="">- More Explanation and information&nbsp; about&nbsp; Django framework you can find <a href="http://www.djangobook.com/en/2.0/chapter01/">here</a></p>
<p class="MsoNormal" style="">&nbsp;</p>
<p class="MsoNormal" style="">Enjoy...<b><o:p></o:p></b></p>
<p>&nbsp;</p>
