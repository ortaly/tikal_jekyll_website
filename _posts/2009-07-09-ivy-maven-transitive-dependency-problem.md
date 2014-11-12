---
layout: post
title: Ivy-Maven transitive dependency problem
created: 1247134992
author: liya
permalink: /devops/ivy-maven-transitive-dependency-problem
tags:
- DevOps
- Ant
---
<p>I have multiple modules project built partially with Maven (pure Java modules) and partially with ANT with IVY dependencies management (mixed Java and other technologies modules).<br />
I have an IVY module that depends on another IVY module, which depends on Maven module.<br />
('IVY module X' &lt;- 'IVY module Y' &lt;- 'Maven module Z')</p>
<p>When Y is coming from maven repository (Nexus) , X doesn't get the transitive dependency Z as I would expect expect.</p>
<p>I couldn't find anything on the net, so the workaround for now is to define Z as another dependency of X...</p>
<p>Have anyone dealt with this problem?</p>
