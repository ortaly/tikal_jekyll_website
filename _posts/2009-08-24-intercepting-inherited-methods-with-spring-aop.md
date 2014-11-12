---
layout: post
title: intercepting inherited methods with spring aop
created: 1251139765
author: shalom
permalink: /java/intercepting-inherited-methods-spring-aop
tags:
- JAVA
- spring aop inherited methods
- Spring
---
<p>Hi</p>
<p>i have a UserDao interface that extends BaseDao and the implementation class is UserDaoHibernate defined as a spring bean.</p>
<p>I'm trying to intercept all kind of delete methods, some are declared in BaseDao, deleteById for example , and some are declared in UserDao, deleteByLogin for example.</p>
<p>using spring aop i can't figure out the pointcut to use:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;aop:aspect id=&quot;deleteUserAspect&quot; ref=&quot;deleteUserHandler&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;aop:around method=&quot;handleDeleteUser&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pointcut=&quot;execution(* com.dao.UserDao.delete*(..))&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/aop:aspect&gt;</p>
<p>with this, spring aop will only intercept methods declared in UserDao but not in BaseDao.</p>
<p>I tried intercepting the class UserDaoHibernate with proxy-target-class=&quot;true&quot; but its the same behavior because UserDaoHibernate extends BaseDaoHibernate and only methods declared in UserDaoHibernate are intercepted:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;aop:aspect id=&quot;deleteUserAspect1&quot; ref=&quot;deleteUserHandler&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;aop:around method=&quot;handleDeleteUser&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pointcut=&quot;execution(* com.orm.hibernate.dao.UserDaoHibernate.delete*(..))&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/aop:aspect&gt;</p>
<p>&nbsp;</p>
<p>any ideas on how to do that?<br />
<br />
&nbsp;</p>
