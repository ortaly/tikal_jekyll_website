---
layout: post
title: Synchronization issues with DTOs
created: 1342028621
author: sefi
permalink: /synchronization-issues-dtos
tags:
- JAVA
---
<p>&nbsp;when using gwt rpc with gwtp, you create a action and result pair and a handler.</p>
<p>Usually you pass dtos back and forth between the client and the server.&nbsp;</p>
<p>For the call to work , the dtos should implement a few things :</p>
<p>1. It should implement the serializable interface (and all members should also implement it)&nbsp;</p>
<p>2. It should have an empty c'tor.&nbsp;</p>
<p>3. Generics are not supported.&nbsp;</p>
<p>4. Only concrete classes (ArrayList as opposed to List)&nbsp;</p>
<p>&nbsp;</p>
<p>If this is implemented, the rpc round trip should be successful.&nbsp;</p>
<p>&nbsp;</p>
<p>Sefi</p>
<p>&nbsp;</p>
