---
layout: post
title: Highlights for NHibernate Performance
created: 1387093883
author: shmulik
permalink: highlights-for-nhibernate-performance
tags:
- .NET
---
<p dir="ltr"><span style="color:#000080;"><span style="line-height: 1.6em;">Working with nHibernate can be very convenient and easy to use, but there are some issues to pay attention to.</span></span></p>

<p dir="ltr"><span style="color:#000080;">Some of the biggest time-waste on every running scenario are related to nHibernate.</span></p>

<p dir="ltr"><span style="color:#000080;">With good implementation, you can magnificently improve your services performance.</span></p>

<p dir="ltr"><span style="color:#000080;"><span style="line-height: 1.6em;">Here are some implementation issues you can easily change in order to improve nHibernate performance:</span></span></p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><span style="font-size:18px;"><strong>1. </strong>&nbsp;&nbsp;</span>&nbsp;Remove unnecessary &quot;<span style="color:#FF0000;"><strong>lazy=false</strong></span>&quot; attributes in the mapping.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; It&#39;s making nHibernate (and Sql) to work hard since nHibernate is picking up all the associations stated in the mapping and place them into cache, while most of the time there is no use &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;of the data coming back.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;If you need &ndash; try to add &quot;Fetch&quot; in the code</p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/1.bmp" style="line-height: 1.6em;" /></p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><span style="font-size:18px;">2. &nbsp;</span>&nbsp;&nbsp;Remove unnecessary objects from the criteria.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; It&#39;s making nHibernate to work hard for preparing the objects, even if you are not using the data.</p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/2.bmp" style="width: 501px; height: 192px;" /></p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><span style="font-size:18px;">3. &nbsp;</span>&nbsp;&nbsp;Pay attention to objects that have &quot;<span style="color:#FF0000;"><strong>type=json</strong></span>&quot; in their mapping.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; If they have no &quot;<strong>Equals</strong>&quot; method in the class, it can cause nHibernate to update the data for every time you are using the objects, even if nothing was changed.</p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/3.bmp" /></p>

<p dir="ltr"><span style="font-size:18px;">4. &nbsp;</span>&nbsp;&nbsp;Pay attention to mapping casting.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; For example:</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; nHibernate automatically convert string properties to <strong>nvarchar(4000)</strong></p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; If you have a column in &quot;<span style="color:#FF0000;"><strong>varchar</strong></span>&quot; type, use &quot;<span style="color:#FF0000;">type=AnsiString</span>&quot; in the mapping.</p>

<p dir="ltr">&nbsp; &nbsp; &nbsp; &nbsp; It will save lots of casting time from SQL.</p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/4.bmp" /></p>

<p dir="ltr"><strong>Before:&nbsp;</strong></p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/5(1).bmp" /></p>

<p dir="ltr">&nbsp;</p>

<p dir="ltr"><strong>After </strong>adding the <span style="color:#FF0000;">AnsiString</span> property &ndash; The SQL is <span style="font-size:14px;"><strong>5 times</strong></span> faster than before<strong>:</strong></p>

<p dir="ltr"><img alt="" src="/sites/default/files/images/6(1).bmp" /></p>

<p dir="ltr"><strong>Shmulik Willinger</strong><br />
Application Software Engineer</p>
