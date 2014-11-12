---
layout: post
title: fetching partial entity data with hibernate
created: 1244467914
author: shalom
permalink: /java/fetching-partial-entity-data-hibernate
tags:
- JAVA
- Hibernate
---
<p>Hi<br />
<br />
we have a spring/hibernate -&gt; swing application<br />
the communication is soap with axis, the hibernate entities are mapped to soap objects and travel from the server to the client and back.<br />
<br />
we have some entities that we don't want to select all the fields every time, in some cases we need only partial data of the entity. <br />
for example a Profile entity with id,name ,description and many other primitive and non primitive fields, <br />
the UI people do not want to deal with a Profile object when they need only part of the data, they want for example a ProfileIdentifier object that has the profile id,name and description.<br />
<br />
ProfileIdentifier<br />
&nbsp;&nbsp;&nbsp; id<br />
&nbsp;&nbsp;&nbsp; name<br />
&nbsp;&nbsp;&nbsp; desc<br />
<br />
so we can do it with inheritance <br />
class Profile extends ProfileIdentifier</p>
<p>or with a ProfileIdentifier component or value type, </p>
<p>i want to be able to fetch a list of ProfileIdentifier objects and not the Profile objects.</p>
<p><br />
what is the prefered way to do it?<br />
is there a way to select only ProfileIdentifier with inheritance or as a component?<br />
or to select a partial Profile, only the fields in ProfileIdentifier and convert the result to ProfileIdentifier?</p>
<p>&nbsp;</p>
