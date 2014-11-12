---
layout: post
title: User Management /Authentication
created: 1282033225
permalink: user-management-authentication
tags:
- JAVA
---
<p>many of us often encounter the need to have a user management/authentication services.</p>
<p>if you're lucky, the users data is stored in an <a href="http://en.wikipedia.org/wiki/LDAP">LDAP</a> (unfortunately it's usually <a href="http://he.wikipedia.org/wiki/Active_Directory">Active Directory</a>).</p>
<p>if not, don't try to re-implement an <a href="http://en.wikipedia.org/wiki/LDAP">LDAP</a>. don't settle for short term vision. managing users/groups/passwords/policies is a major task that tends to grow during projects lifetime and eventually you spend a lot of time writing code that you shouldn't have.</p>
<p>instead, use&nbsp;<a href="http://www.opends.org/">OpenDS</a> - a fully functional open source <a href="http://en.wikipedia.org/wiki/LDAP">LDAP</a> server from Sun.</p>
<p>it has all the features you need and a lot more, it's easy to manage(has a nice GUI), easy to extend schema, supports high availability and replication, costs nothing,&nbsp; and most important - you have your user data store up and running in minutes...</p>
<p>now in order to query and authenticate users use your favorite LDAP&nbsp;framework, I suggest novell's LDAP library.</p>
<p><br />
&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
