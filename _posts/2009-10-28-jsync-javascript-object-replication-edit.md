---
layout: post
title: 'jsync - javascript object replication  edit  '
created: 1256742770
author: ittayd
permalink: /java/jsync-javascript-object-replication-edit
tags:
- JAVA
- Scala
---
<pre>
http://github.com/mighdoll/jsync

Copy paste from the site:
The goal is to enable easy-to-use object replication between
loosely connected machines.  A browser and a server can share a pool
of objects.  If the browser program makes a local change to any object
in the pool, the change will propagate to the server.  And vice versa.

What this enables:
* Way simple persistence for javascript.  
    Change a few lines and your javascript objects can flow to the server
    and from there to MySQL or whatever.

* Rich models
    It's easy to communicate lots of different kinds of data and
    relationships, which is especially handy for complex models and
    rich clients.

* Observation api.  
    Use the observation api to do MVC/data binding style programming.  And 
    then support for network delivered changes comes for free.

</pre>
