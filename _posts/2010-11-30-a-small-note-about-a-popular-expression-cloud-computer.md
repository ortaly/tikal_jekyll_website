---
layout: post
title: A small note about a popular expression "Cloud Computer".
created: 1291117495
author: olga
permalink: /java/small-note-about-popular-expression-cloud-computer
tags:
- JAVA
- Cloud Computer
---
<p class="rteleft">Today, there are no people who haven&rsquo;t heard about this popular expression, which came instead of a previous &ldquo;3D&rdquo; and &quot;Digital&quot; popular sentences.<br />
<br />
<em><strong>So, what does it mean?</strong></em><br />
Actually, not so much. It&rsquo;s a regular ability of remote server to process the stream of information.<br />
<br />
The only difference from regular server is the ability to connect several other servers to help itself (in case of&nbsp; lack of resources).<br />
As a result, big number of people can receive service from the server.<br />
<br />
One of the examples is a popular on-line game which is able to process simultaneously requests from 10 players that are placed in one virtual room.<br />
If 11-th player joins the game, a new server gets up and runs an additional room (a clone of the existing one) for him, as a result, he can&rsquo;t&nbsp; see anyone in the room.<br />
<br />
Nowadays, there are many ways to synchronize data between all the servers, but we are not speaking about this.<br />
<br />
<strong><u>One of fundamental goals of Cloud Computing</u></strong> today is to try to teach a programs to detect a critical moment of&nbsp; lack of resources and automatically send request to run an additional servers, deploy a program to them and synchronize with them. <br />
At the moment of decrease of amount of work, the central server must automatically stop excessive servers.<br />
Therefore, companies can save a lot of money, by paying only for really necessary servers. <br />
<br />
<em><strong>One of the official definitions:</strong></em><br />
Cloud computing - a model for enabling convenient, on-demand network acccess to a <br />
shared pool of configurable computing resources that can be rapidly deployed and/or <br />
released with minimal management effort or service provider interaction.<br />
<br />
<em><strong>Google's view on the topic:</strong></em><br />
&quot;Not too long ago, many of us worried about losing our documents, photos and files if something bad happened to our computers, like a virus or a hardware malfunction. Today, our data is migrating beyond the boundaries of our personal computers. Instead, we&rsquo;re moving our data online into &ldquo;the cloud&rdquo;. If you upload your photos, store critical files online and use a web-based email service like Gmail or Yahoo! Mail, an 18-wheel truck could run over your laptop and all your data would still safely reside on the web, accessible from any Internet-connected computer, anywhere in the world.&quot;</p>
<p><a href="http://www.20thingsilearned.com/cloud-computing/2">www.20thingsilearned.com/cloud-computing/2</a><br />
<br />
<em><strong>Other definitions we can be found here:</strong></em><br />
Twenty-One Experts Define Cloud Computing</p>
<p><a href="http://cloudcomputing.sys-con.com/node/612375?page=0,1">cloudcomputing.sys-con.com/node/612375</a></p>
<p>&nbsp;</p>
<p><br />
<em><strong>What kind of clouds are there?</strong></em><br />
&nbsp;<br />
In fact, there are only 4 types of clouds:<br />
&nbsp;&nbsp; <em><u>Private </u></em>&ndash; enterprises create private clouds for exclusive use.<br />
&nbsp;&nbsp; <em><u>Public </u></em>&ndash; a company buys services from an external vender, such as Amazon. Usually it will be small amount of servers (until 20). <br />
&nbsp;&nbsp; <em><u>Hybrid </u></em>&ndash; a company has its own cloud, but if it is not enough, it takes services from an external venders. <br />
&nbsp;&nbsp; <u><em>Community cloud</em></u> -a community cloud may be established where several organizations have similar requirements and seek to share infrastructure so as to realize some of the benefits of cloud computing. With the costs spread over fewer users than a public cloud (but more than a single tenant) this option is more expensive but may offer a higher level of privacy, security and/or policy compliance. Examples of community cloud include Google's &quot;Gov Cloud&quot;.</p>
<p>&nbsp;</p>
<p><br />
<em><strong>Why do so many companies want to move to cloud?</strong></em><br />
<br />
I see a few main reasons. Money is one of them.<br />
&nbsp;&nbsp;&nbsp; 1. Why should you buy a program, which you are going to use only several times, if you can run it on-line on the cloud and pay only for the time you used it.<br />
&nbsp;<br />
&nbsp;&nbsp;&nbsp;&nbsp; 2. The second reason is the company doesn&rsquo;t want to give a program to its clients. It&rsquo;s one thing if a program is deployed in your server, and you can dictate your conditions and it&rsquo;s another thing when a program is deployed in the client&rsquo;s server. <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp; 3. Scalability.<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp; 4. Access to Resources on-demand. <br />
For example, company may provide their employees access to their working place via the cloud and thus save money on office lease.<br />
<br />
<em><strong>What do we pay for?</strong></em><br />
It depends on the service provider. Let&rsquo;s take Amazon as an example.&nbsp; <br />
On Amazon, we pay for memory storage (30 cents per 1G per month) and for a running server (2$ per hour).<br />
<br />
Pay attention, that we also pay for memory storage on stopped (from our point of view) servers, which have our code.&nbsp; Additionally we pay for memory storage occupied by snapshots.<br />
<br />
In addition, we can buy deferent PaaS (Platform as a service) services, for example, a data base server which is fully controlled by Amazon. <br />
<br />
<em><strong>How long does it take to run a server?</strong></em><br />
It takes less than 10 minutes.&nbsp; I watched the server being run, it took less than a minute. <br />
<br />
<em><strong>Cloud Service Types:</strong></em><br />
<u><em>Software as Service</em></u>&nbsp; (SaaS):&nbsp; applications delivered as a service to end-users over the Internet. Example: Google, Sales Force.<br />
<br />
<u><em>Platform as Service</em></u> (PaaS): App development &amp; deployment platform delivered as <br />
a service. It is closer to the developer/user. Example: Google App Engine, force.com<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
<u><em>Infrastructure as Service</em></u> (IaaS): Server, storage and network hardware and <br />
associated software delivered as a service. It is closer to the SysAdmin. Example: amazon, Google App Engine.<br />
<br />
<em><strong>Achievements:</strong></em><br />
Notice a number of achievements.<br />
&nbsp; - Microsoft has already built a possibility of running and testing an application in Visual Studio without deploying, which significantly reduces the time of developing.<br />
<br />
&nbsp; - In case of a problem with an email server of a client, google can redirect all the requests to its email server until the client&rsquo;s server is repaired.<br />
<br />
<br />
&nbsp; - HP has learned on hardware level to detect the problems with a server and send the alerts to the main controller which will switch the problem server to another one, isolating the bad servers. <br />
<br />
<em><strong>Links:</strong></em><br />
<a href="http://www.20thingsilearned.com/cloud-computing/2">www.20thingsilearned.com/cloud-computing/2</a><br />
Asure get started: <a href="http://www.microsoft.com/windowsazure/getstarted/">www.microsoft.com/windowsazure/getstarted/</a><br />
OWASP App Sec 2010 - Securely Architecting Your Application for the Cloud:&nbsp;<a href="http://www.slideshare.net/astamos/owasp-app-sec-2010-securely-architecting-your-application-for-the-cloud">www.slideshare.net/astamos/owasp-app-sec-2010-securely-architecting-your-application-for-the-cloud</a> <br />
Digital Ecosystems in the Clouds: Towards Community Cloud Computing: <a href="http://arxiv.org/PS_cache/arxiv/pdf/0903/0903.0694v2.pdf">arxiv.org/PS_cache/arxiv/pdf/0903/0903.0694v2.pdf</a></p>
<p>Cloud on Amazon : <a href="http://aws.amazon.com/">aws.amazon.com/</a><br />
<br />
&nbsp;</p>
