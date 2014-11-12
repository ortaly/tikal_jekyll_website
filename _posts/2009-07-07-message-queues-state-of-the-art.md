---
layout: post
title: 'Message Queues: state of the art'
created: 1246945191
permalink: message-queues-state-of-the-art
tags:
- JAVA
- STOMP
- RabbitMQ
- Message Queues
- AMQP
- ActiveMQ
---
<p>A client asked my about issues related to setting up SSL and ActiveMQ and my immediate response was that there should be no problem. Indeed, I found several posts (<a href="http://wiki.ndgf.org/display/ndgfwiki/Standalone+Apache+ActiveMQ+with+SSL+support">wiki.ndgf.org/display/ndgfwiki/Standalone+Apache+ActiveMQ+with+SSL+support</a>),listing the steps needed to setup up such a system.</p>
<p>&nbsp;</p>
<p>Afterwards in the process of researching, I found that there are new protocols (st least for me) named STOPM (<a href="http://stomp.codehaus.org/">stomp.codehaus.org/</a>) and AMQP (<em>Advanced Message Queue Protocol</em> ) supported only by several vendors but are the standard these days.</p>
<p>&nbsp;</p>
<p>In one of my previous posts I mentioned Lshift (<a href="http://www.lshift.net/blog/">www.lshift.net/blog/</a>), the company that developed RabbitMQ, which was written in Erlang and is supposed to be an extremely fast MQ server.</p>
<p>&nbsp;</p>
<p>An interesting post comparing many vendors (including RabbitMQ and ActiveMQ) and their respective supported protocols can be found here:</p>
<p><a href="http://wiki.secondlife.com/wiki/Message_Queue_Evaluation_Notes">wiki.secondlife.com/wiki/Message_Queue_Evaluation_Notes</a></p>
<p>&nbsp;</p>
<p>Others are welcomed to contribute based on their experience,</p>
<p>&nbsp;</p>
