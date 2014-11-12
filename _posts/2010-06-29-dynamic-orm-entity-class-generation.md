---
layout: post
title: Dynamic ORM entity class generation
created: 1277810591
author: admin
permalink: /devops/forums/dynamic-orm-entity-class-generation
tags:
- DevOps
- CGLIB
- Javaassist
- ASM
- bytecode
- Hibernate
---
<p>Hi,</p>
<p>For a client I need to support the following using either Hibernate or some other variant maybe using CGLIB or ASM or freemaker:</p>
<p>The system should support update of the database schema and Hibernate mapping at runtime. Meaning, if I have a Hibernate entity &quot;Animal&quot; with properties A and B I should support the addition and deletion of properties during runtime. e.g. after the transformation the Entity can have property A deleted and property C added. This means of course that :</p>
<p>1-The Entity *Class* itself should be re-generated in memory on the fly with **JPA annotations** for each field. I started testing using CGLIB and one other option is FreeMaker for generating a java source file and then compiling it at runtime.</p>
<p>Recommendations are highly regarded.</p>
<p>2-After that I need somehow to unload the existing &quot;Animal&quot; instances, stop all pending transactions which reference those classes and then</p>
<p>3-Use the newly generated &quot;Animal&quot; Class, load it into the correct ClassLoader and then generate matching RDBMS schema using &quot;ddl2hbm&quot;.</p>
<p>4- I guess should also re-initialize the hibernate session factory which is loaded with wrong Class definitions.</p>
<p>there is also a need to be able to generate ORM entities completely from scratch: meaning, I don&#39;t even know the name of the table and the types and number of the fields.</p>
<p>Dynamic update of the database schema and in-memory hibernate mapping is not straightforward to develop. Which mechanism would I use for blocking access to the system until a database schema update has been performed?<br />
	How would you approach this issue? would you use CGLIB/ASM/Javaassist? some other API that you know is working for some other Client?<br />
	I am not sure I want the Bytecode rout, see for instance: http://code.google.com/p/google-guice/source/browse/trunk/src/com/google/inject/internal/BytecodeGen.java</p>
<p>Please reply only if you have a knowledgeable answer :)</p>
