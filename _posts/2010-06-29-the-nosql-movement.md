---
layout: post
title: The NoSQL Movement
created: 1277813826
author: adi
permalink: /incubator/nosql-movement
tags:
- Incubator
---
<p><span style="font-size: small;">Depending on the circles you travel in, you might have heard people talking about ditching their relational database management systems (RDBMS) and moving on to working with a different class of data stores&hellip; something they call &ldquo;NoSQL&rdquo;. The first time I&rsquo;ve heard of it was a few years ago (I don&rsquo;t remember exactly when or how) and, although it seemed like a relevant and an interesting concept, it wasn&rsquo;t interesting enough for me to free some time to dig deeper. It all changed five months ago after I &ldquo;bumped&rdquo; into an unexpected and a very interesting opinion (more about that shortly). So, if until that moment I was asking myself questions like &ldquo;When should I start using a NoSQL data store?&rdquo; and &ldquo;What NoSQL product should I choose?&rdquo; from that moment on the questions were &ldquo;What is NoSQL?&rdquo; and &ldquo;What&rsquo;s the reason for this movement?&rdquo; and &ldquo;Do NoSQL data stores fit my needs better than the way traditional SQL ones do?&rdquo; etc. </span></p>
<p><span style="font-size: small;"><br />
This post is a summary of some of the knowledge I gained through the process of&nbsp; &ldquo;digging deeper&rdquo; into the world of relational and non-relational data-stores. So if you are confused and wondering about what this NoSQL movement is all about (exactly where I was until not-so-long ago) or if this concept is all news to you and you&rsquo;re only begin curious, or even if you master this world and just looking for a victim to criticize, then I hope this post will help you fulfill your needs&hellip; We start with the original NoSQL.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: small;"><br />
<br />
</span></p>
<h2><span style="font-size: small;">The original NoSQL</span></h2>
<p><span style="font-size: small;">Back in the 90&rsquo;s, Carlo Strozzi (a member of the Italian Linux society) decided to implement his own breed of a relational database management system. The requirements were for a simple, lightweight, reliable, not heavily featured, and relational database. Strozzi also wanted his database to have a special &ldquo;shell-level approach&rdquo;, a one that follows the philosophy described in an article titled &ldquo;The UNIX Shell As a Fourth Generation Language&rdquo; [Evan Schaffer and Mike Wolf, 1991]. Here&rsquo;s a peek:</span></p>
<p class="rteindent1"><span style="font-size: small;"><br />
</span><span style="color: rgb(128, 128, 128);"><span style="font-size: small;"><em>&quot;UNIX provides hundreds of programs that can be piped together to easily perform almost any function imaginable. Nothing comes close to providing the functions that come standard with UNIX&hellip;&quot;<br />
&quot;The shell, extended with a few relational operators, is the fourth generation language most appropriate to the UNIX environment.</em></span></span><em>&quot;<br />
</em></p>
<p class="rteindent1">&nbsp;</p>
<p><span style="font-size: small;"><br />
That&rsquo;s exactly what the final product was (and, in fact, still is) all about &ndash; a RDBMS accessible through common Unix shell utilities (ls, mv, cp, cat, head, more, less, etc.) instead of using traditional SQL&hellip; It was named &ldquo;NoSQL&rdquo;. When asked about the relation between his NoSQL and the new NoSQL movement Strozzi replied with this:<br />
</span></p>
<p>&nbsp;</p>
<p class="rteindent1"><span style="color: rgb(128, 128, 128);"><em><span style="font-size: small;">NoSQL has been around for more than a decade now and it has nothing to do with the newborn NoSQL Movement, which has been receiving much hype lately. While the former is a well-defined software package, is a relational database to all effects and just does intentionally not use SQL as a query language, the newcomer is mostly a concept (and by no means a novel one either), which departs from the relational model altogether and it should therefore have been called more appropriately &quot;NoREL&quot;, or something to that effect.</span><br />
</em></span></p>
<p class="rteindent1">&nbsp;</p>
<p><span style="font-size: small;"><br />
If you remember, on the first paragraph I wrote about &ldquo;an unexpected and a very interesting opinion&rdquo; I ran into&hellip; well, this is it! This short quote from a man I never heard of until that moment made me go back to the roots of relational/non-relational databases and learn about the role they play in modern enterprise applications. <br />
For me, the most significant part of this quote is &ldquo;&hellip; mostly a concept (and by no means a novel one either)&rdquo;, particularly &ldquo;mostly a concept&rdquo;. Concepts are problematic because:<br />
</span></p>
<p>&nbsp;</p>
<p class="rteindent1"><span style="font-size: small;"> - They are open for subjective interpretations.</span></p>
<p class="rteindent1"><span style="font-size: small;"> - There&rsquo;s nothing that stops a concept from begin changed over time (end users aren&rsquo;t guaranteed to have the initial features-set or backward compatibility as the product evolves).</span></p>
<p class="rteindent1"><span style="font-size: small;"> - If you&rsquo;re disappointed with one implementation of the &ldquo;concept&rdquo; there&rsquo;s no promise you&rsquo;ll get a replacement. Even if you do get one, there&rsquo;s no standard (like, for example, SQL) to ease your migration pain. </span><span style="font-size: small;"> <br />
</span></p>
<p class="rteindent1">&nbsp;</p>
<p><span style="font-size: small;"> There are other arguments supporting the problematic nature of concepts, but I think these three are enough for you to at least acknowledge that building your product around a NoSQL database involves uncertain risks. That&rsquo;s a very big deal! Especially when the only thing that is common for most popular NoSQL products is that they have nothing in common. </span></p>
<p>&nbsp;<span style="font-size: small;"><br />
But still, you can&rsquo;t argue with success, right? So what&rsquo;s missing? We&rsquo;ll get to this in a moment&hellip; Lets try to understand first what Strozzi meant by saying &ldquo;&hellip;by no means a novel one&hellip;&rdquo;<br />
</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2><span style="font-size: small;">The CAP Theorem</span></h2>
<p><span style="font-size: small;">Ten years ago [July 2000], Eric Brewer, a professor at the computers science division of Berkeley CA, said (in what became known as Brewer's Conjecture) that as applications become more web-based we should stop worrying about data consistency, because if we want high availability in these new distributed applications, then guaranteed consistency of data is something we cannot have.</span></p>
<p><span style="font-size: small;"><br />
Brewer described three core systemic requirements and the special relationship between them when applied in a distributed system: Consistency, Availability and Partition tolerance (CAP).<br />
</span></p>
<p>&nbsp;</p>
<p class="rteindent1"><strong><u><span style="font-size: small;">Consistency</span></u></strong><span style="font-size: small;"> &ndash; Means that after data is written to the database, following read operations will always return the latest version of the written data. Database systems without strong consistency, where written data won&rsquo;t necessarily be available for consequent read operations, are said to support eventual-consistency (or weak consistency).<br />
<u><strong>Availability</strong></u> &ndash; Means you can always expect the database to be responsive whenever you need it. This is usually accomplished when a large numbers of physical servers act as a single database (through sharing &ndash; splitting the data between various database nodes, or replication &ndash; storing multiple copies of each piece of data on different nodes).<br />
<u><strong>Partition tolerance</strong></u> &ndash; Means that the database remains operational when parts of it are completely inaccessible (like when the network link between a number of database nodes is interrupted). One way to achieve Partition tolerance involves some sort of a mechanism whereby writes destined for unreachable nodes are sent to nodes that are still accessible. Later, when the failed nodes come back, they receive the writes they missed.</span></p>
<p class="rteindent1">&nbsp;</p>
<p><span style="font-size: small;"><br />
So, web based applications do not guarantee data consistency&hellip; A dramatic statement&hellip; But can it really be true? The answer is Yes! Two years later, in 2002, Nancy Lynch and Seth Gilbert of MIT formally proved Brewer to be correct, laying the groundwork for the rise of a new type of data-stores. To understand what this new type offers or how it differs from the existing one lets first review the significant characteristics of a RDMBS.</span></p>
<p><span style="font-size: small;"><br />
Historically speaking, databases almost always have tried to implement the relational model and be fully ACID-compliant. It was common to think that if a database&rsquo;s transactions weren&rsquo;t ACID, or if the database wasn&rsquo;t relational, then it wasn&rsquo;t a &ldquo;real&rdquo; database. So what are &ldquo;relational&rdquo; and &ldquo;ACID&rdquo;?<br />
</span></p>
<p>&nbsp;</p>
<h2><span style="font-size: small;">The &lsquo;R&rsquo; in RDBMS<br />
</span></h2>
<p><span style="font-size: small;">What is it? Amazingly, many of the people working with relational databases fail to answer this question right, saying that &ldquo;relational&rdquo; describes the way in which tables are related to each other via keys. This is actually wrong! The theory behind the &ldquo;relational model&rdquo; (developed by Edgar F. Codd) describes &ldquo;relation&rdquo; as &ldquo;a data structure, which consists of a heading and an unordered set of tuples which share the same type&rdquo; [Wikipedia]. In other words &ndash; &ldquo;relation&rdquo; is what we usually call &ldquo;table&rdquo; (this is the SQL term). This is an important thing to realize since one of the differences between relational and non-relational databases is, well, the &ldquo;relational&rdquo; part, which is the way the data is structured. <br />
</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p class="rtecenter"><span style="font-size: small;"><img style="width: 686px; height: 291px;" alt="" src="/files/image001.png" /></span></p>
<p class="rtecenter"><span style="color: rgb(128, 128, 128);"><span style="font-size: small;">A relation (based on a wikipedia image)</span></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2><span style="font-size: small;">What is ACID?<br />
</span></h2>
<p><span style="font-size: small;">[Daniel Bartholomew, Linux Journal] ACID is the classic measure of determining whether your database is good. A transaction in a database is a single logical operation. An example would be inserting an address or updating a phone number in an employee database. Every database provides methods to do operations like those, but ACID formalizes the process.<br />
</span></p>
<p>&nbsp;</p>
<p class="rteindent1"><u><strong><span style="font-size: small;">Atomicity</span></strong></u><span style="font-size: small;"> means that the transaction either succeeds or fails. If the transaction fails, it should fail completely, and the database should be left in the state it was in before the transaction started.<br />
<u><strong>Consistency</strong></u> means that the database is in a known good state both before and after the transaction.<br />
<u><strong>Isolation</strong></u> means that transactions are independent of one another, and if two transactions are trying to modify the same data, one of them must wait for the other to finish before it can begin.<br />
<u><strong>Durability</strong></u> means that once the transaction has completed, the changes made by the transaction will persist, even if there is a system failure. A transaction log of some sort usually is used for this purpose. In MariaDB and MySQL, this is called the binary log.</span></p>
<p class="rteindent1">&nbsp;</p>
<p><span style="font-size: small;"><br />
So, now that we know what a &ldquo;real&rdquo; database should act like, let&rsquo;s find out the &ldquo;opposite for real&rdquo;&hellip; What is the opposite of ACID?&nbsp; </span></p>
<p>&nbsp;</p>
<p><span style="font-size: small;">The answer is BASE &ndash; <em>Basically Available, Soft-state, Eventual consistency</em>. [Daniel Bartholomew, Linux Journal] BASE is a retronymn coined by Dan Pritchett in an article in the ACM Queue magazine for describing a database that does not implement the full ACID model, with the main difference being that it is eventually consistent. The idea is that if you give up some consistency, you can gain more availability and greatly improve the scalability of your database.</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
