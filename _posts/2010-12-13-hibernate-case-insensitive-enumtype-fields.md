---
layout: post
title: 'Hibernate: Case insensitive EnumType fields?'
created: 1292235130
author: liorb
permalink: /java/hibernate-case-insensitive-enumtype-fields
tags:
- JAVA
- Hibernate
---
<p>I'm working on a legacy DB I have no control over, in my code I have an entity &quot;User&quot; which is mapped to a table in the DB, User has a User.role field, this filed is an Enum:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public enum UserRole{ ADMIN,SUPERADMIN.....}</pre>
<p><br />
User has the following mapping</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Column(name=&quot;user_role&quot;)
@Enumerated(EnumType.STRING)
private UserRole role;</pre>
<p><br />
the problem is that the DB is inconsistent, in the DB i might some times get user_type as one of the following:</p>
<p>&nbsp;</p>
<ol>
    <li>Admin</li>
    <li>admin</li>
    <li>ADMIN</li>
</ol>
<p><br />
for the first two cases I will get an exception since hibernate would not fine matching Enum<br />
<br />
Is  there a simple way to tell hibernate to ignore cases for this enum? I  know I can probably extned Hibernate's EnumType and modify it but I  was wondering if there's a simple solution.<br />
</p>
<p><br />
Thanks in advance,<br />
<br />
Lior</p>
