---
layout: post
title: XML DB anyone?
created: 1236174512
author: zvika
permalink: /xml-db-anyone
---
<div dir="ltr">hi,<br /><br />for the application at flash networks, we need an xml
storage that is roll-backable, searchable and transactional...
berkley-xmldb was purposed as an option. have you used anything similar?<br />cheers,<br />
<br />Zvika<br /><br /><br />Adi:<br />===<br />I seriously think that you should consider turn to another solution.<br />For me, XML always comes as last option (or something very close to it).<br />The amount of code needed for manipulating XML in a safe way is unacceptable,<br />

the performance is not so good, and the year is 2009.<br /><br />Udi:<br />===<br />Maybe you can use an RDF database?<br /><br />Zvika:<br />====<br />thanks,<br />don&#39;t know much about it, will take a look...<br /><br /><br />Udi:<br />===<br />

zvika, what&#39;s the nature of the data? what do you mean by hierarchical?
is it a tree? directed graph? what do you mean by &quot;no properties&quot;?<br /><br />what&#39;s the size of the data? what&#39;s the expected read / update rates?<br />
what&#39;s the requirements for search? keyword search? form search?<br /><br />call if you can...<br /><br />Adi:<br />===<br />What are the sources of the persistent data (who/what are the clients)?<br />What transport layer is used for communication with the saver?<br />

<br />Ittay:<br />====<br />i don&#39;t know exactly what you meant by &#39;auto-versioned&#39; in your last email, but for rdf, you can check <a href="http://gvs.hpl.hp.com/application/about-gvs" target="_blank">http://gvs.hpl.hp.com/application/about-gvs</a><br />

<br />Adi:<br />===<br /><br />There&#39;s no need for aggregation<br />There&#39;s no need for semantics<br />There&#39;s no need for RDF<br /><br />RDF is an XML on steroids. <br /><br />Zvika:<br />====<br /><br />To Adi,<br />Q: What are the sources of the persistent data (who/what are the clients)?<br />

A: the persistent data is configuraion of network elements. this is an
NMS system. The clients are the network elements themselves, through a
translation layer that will know how to translate the generic xml
format to each device&#39;s format (csv, other xml jargon, jmx properties,
files, ...)<br />
<br />Q: What transport layer is used for communication with the saver?<br />A:
Untraditiopnally for NMS (or at least I would think), the EMS server
initiates communication with the network elements / applications via
jmx, ftp, webservice, and maybe some other protocols. the
afore-mentioned(!) translation layer should have the knowhow of these
protocols.<br />
<br />To Udi,<br /><br />Q: what&#39;s the nature of the data? what do you mean
by hierarchical? is it a tree? directed graph? what do you mean by &quot;no
properties&quot;?<br />A: nature of the data is NMS configuration.<br />data is
hierarchical in the sense that properties values may be lists or
tables. this is why I don&#39;t think the data format could be name-value
properties<br />
<br />Q: what&#39;s the size of the data? what&#39;s the expected read / update rates?<br />A: data is read-mostly<br /><br />Q: what&#39;s the requirements for search? keyword search? form search?<br />A:
search should be straight - no ambiguities - more than a search it can
be thought of as a reference method, allowing to r/w access certain
configuration data/nodes in a 1:1 fashion. this is why XPATH was
selected in the previous implementation and we&#39;re thinking about it
now, too<br />
<br />Thanks!<br /><br />Ittay:<br />====<br /><br />maybe use a standard format like CIM (<a href="http://en.wikipedia.org/wiki/Common_Information_Model_%28computing%29" target="_blank">http://en.wikipedia.org/wiki/Common_Information_Model_(computing)</a>)? oasis has some standard based on xml but i can&#39;t remember what it is right now (and i share Adi&#39;s distaste for xml...)<br />

since i think this sort of data tends to have many exceptions, so it is
hard to classify into a rigid (read: sql tables) format, i think rdf is
a good option.<br /><br />[regarding transport] why not snmp? (though jmx is very close)<br />
<br />it looks to me that this discussion reveals that it is not clear
how the system architecture will look like (specifically, how clients
will interact). if this is the case, then maybe it is a good idea to
suggest to the client to take a system architecture consultant that
knows the standards and pitfalls and can suggest a system architecture
model. from there, choosing the java implementation to realize the
model will be easier. i can recommend someone if you&#39;d like<br />
<br />ittay<br /><br />Adi:<br />===<br /><br />Yanai, isn&#39;t that an expertise of yours?<br /><br /><br />Ittay:<br />====<br />to
make sure my suggestion was understood, i was referring to architecture
from a sysadmin point of view, especially, protocols being used, no
relation to java.<br />
<br />Zvika:<br />====<br /><br />the interaction model with the backend apps
is well-known, either properties via jmx or http downloads of config
files. the interaction model with the front end clients is a little
more complicated due to the APP-EMS-CMS chain but is also known.<br />
What I am trying to find out is a: what syntax would support the
flexibility that is needed and b: what technology will provide features
such as versioning, search and update.<br />RDF
syntax was disregarded due to complexity and the fact that the
configuration should be human readable and editable, and xml is still
the leading choice.<br />
<br />Ittay:<br />====<br /><br />what kind of search are we looking at? is a
mapping to a filename sufficient (e.g.,, do you receive a node name and
provide a config file for it)? if so, git/hq can get you versioning.<br />see if this: <a href="http://en.wikipedia.org/wiki/CMDB" target="_blank">http://en.wikipedia.org/wiki/CMDB</a> kind of thing is suitable for you.<br />

<br />Zvika:<br />=====<br /><br />thanks!<br /><br />the search is, potentially,
attribute based, type-oriented. for example: retrieving all blade
centers who are running application X. or: retrieving all parameters of
a certain application. or: all applications running on a certain blade.
you get the idea. so filename is not sufficient here.<br />
<br />As much as the search is concerned, XPATH is a good enough fit. The
problem starts when trying to update data that doesn&#39;t yet exist.<br />for example, if I have a list of banned urls stored as:<br /><br />&lt;!-- .... --&gt;<br />
&lt;app&gt;<br />  &lt;config&gt;<br />    &lt;lists&gt;<br />      &lt;blackList&gt;<br />        &lt;url&gt;<a href="http://www.ratemypoo.com/" target="_blank">http://www.ratemypoo.com</a>&lt;<div dir="ltr">/url&gt;<br />        &lt;url&gt;<a href="http://www.rotten.com/" target="_blank">http://www.rotten.com</a>&lt;/url&gt;<br />

      &lt;/...&gt;<br />    &lt;/...&gt;<br />  &lt;/...&gt;<br />&lt;/...&gt;<br />and now I want to add a url. piece of cake:<br />select by xpath app/config/blacklist, add &lt;url&gt; element.<br />but what if the &lt;blacklist&gt; doesn&#39;t yet exist? or the &lt;lists&gt; element?<br />

<br /><br />regarding versioning, we got away with a smaller requirement,
only to create snapshot of the entire configuration. So file system is
still a viable option, but without git or similar (hq?), which will
require integration that&#39;ll occupy more time than we have (the 1st
phase is due within a month or so and is very very very very very very
very very very very very very very tight. I would add some more &quot;very&quot;s
but I don&#39;t have the time for it now. THAT TIGHT! :)<br />
<br />also,<br />The wiki link on CMDB looks interesting, but I didn&#39;t find
any relevant opensource implementations... it would probably be an
overkill, but it&#39;s all good to know.<br /><br />Adi:<br />===<br /><br />Why won&#39;t you help me with my dynamic type system?<br />
It can be the first usecase... :)<br /><br />Ittay:<br />====<br /><br />i think it&#39;s fairly simple to write a function that recursively uses shorter xpaths to add missing nodes.<br />but
i think that using standards will be better since it will make
accepting the software easier in large organizations. see below for a
cmdb implementation i found and also search for itil.<br />
<br />then this whole discussion is futile. create an xml file, write the
pseudo database functions around it and maybe the next version will do
things right.<br /><br />a search in google gave this which looks interesting<br /><a href="http://www.onecmdb.org/wiki/index.php/Main_Page" target="_blank">http://www.onecmdb.org/wiki/index.php/Main_Page</a><br />
<br />what about using java-xml binding? then you read the file to objects, manipulate the objects and stream them back.<br /><br />Zvika:<br />====<br />definitely
an option, although it might raise some issues as the xml need to be
customized so that it is stable enough not to rock the xpath boat when
new attributes or even elements are added to the system. which one
would you go for?  I am thinking of jaxb2 if we take that path.<br />
<br />oneCMDB looks interesting indeed,<br />I&#39;m trying to figure out
whether it has APIs or it is only a product-project (in which case
modifiable but not in our timeframes)<br /><br />cheers,</div></div>
