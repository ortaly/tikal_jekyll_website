---
layout: post
title: NHibernate 2.1.0 released today
created: 1248036392
author: andrew
permalink: /net/nhibernate-210-released-today
tags:
- .NET
- Hibernate
- .Net Open Source
---
<p>&nbsp;NHibernate 2.1.0 released.</p>
<p>&nbsp;</p>
<p>Among numerous bug fixes, it includes an important feature: GroupBy projection.</p>
<p>&nbsp;</p>
<p>Projections are similar to the expressions in SELECT statement of SQL. So if we have the following statement:</p>
<p>&nbsp;</p>
<p>SELECT AVERAGE(SALARY) FROM EMPLOYEES GROUP BY JOB_TITLE</p>
<p>&nbsp;</p>
<p>We will use a projection to calculate an average salary for every job title.</p>
<p>&nbsp;</p>
<p>The framework can be downloaded from&nbsp;<a href="http://sourceforge.net/projects/nhibernate/files/NHibernate/NHibernate-2.0.1.GA-bin.zip/download">http://sourceforge.net/projects/nhibernate/files/NHibernate/NHibernate-2.0.1.GA-bin.zip/download</a></p>
