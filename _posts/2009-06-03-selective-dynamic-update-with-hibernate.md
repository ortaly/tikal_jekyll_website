---
layout: post
title: Selective/dynamic update with hibernate
created: 1244071686
author: shalom
permalink: "/java/selectivedynamic-update-hibernate"
tags:
- JAVA
- Hibernate
---
<p>Hi</p>
<p>we have a User entity with a password field, and two use cases:</p>
<p>1) update the user entity but not the password field, the entity is sent from the UI and has null in the password field.</p>
<p>2) update the user entity including the password,again the entity is sent from the UI.</p>
<p>&nbsp;</p>
<p>in both use cases it is assumed that the entity is not attached to the hibernate session.</p>
<p>&nbsp;</p>
<p>so using just saveOrUpdate in the first use case will set null to the password field in the DB(I'm ignoring the DB constraints for now),</p>
<p>and my understanding is that hibernate merge is not the solution.</p>
<p>my question is how to implement it without having to do two round trips to the DB and without having to write HQL statements.</p>
<p>&nbsp;</p>
<p>my thoughts where to use the Seppuku pattern:</p>
<p>have two entity classes mapped to the same table</p>
<p>User</p>
<p>UserWP extends User</p>
<p>where in User the password fields will be update=false and use this entity in the first use case.</p>
<p>in UserWP the password field is update=true and use that for the second use case,actually the rest of the application only knows about User and the the UserDao method updateWithPassword converts User to UserWP and saves it.</p>
<p>&nbsp;</p>
<p>is there a more elegant,maybe dynamic, solution?</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
