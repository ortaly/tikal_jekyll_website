---
layout: post
title: Architecture of a resource management server based on Erlang's OTP Design –
  building an application server
created: 1323164227
permalink: architecture-of-a-resource-management-server-based-on-erlangs-otp-design-building-an-application-server
tags:
- JAVA
- Supervisor
- Resource Management
- OTP Design
- Java J2EE
- HTTP
- Design & Architecture
- Application Server
- Application Frameworks
---
<div>In this post I will describe an interesting architecture of one of the projects that I once wrote&nbsp;which has&nbsp;a lot in</div>
<div>common with Erlang's&nbsp;<a href="http://www.erlang.org/doc/design_principles/des_princ.html">OTP Design Principles</a>.</div>
<div><b><br />
<font size="3"><u>Introduction</u></font></b></div>
<div>&nbsp;</div>
<div>A common approach to expose a service to the web is to run it under an application/web server like Tomcat/Jboss/other And if there are lots of different services that share a common behavior (such as <a href="http://en.wikipedia.org/wiki/Rate_limiting">rate limiting</a>, statistics and more..), it could be a monster server that gathers lots of services or we could have multiple application servers running on different ports which have of course, some common jars but also some duplicate code. <a href="http://www.erlang.org/doc/design_principles/des_princ.html">OTP Design Principles</a> can be viewed as an umbrella of services and features &ndash; a resource management server that can update and upgrade services, verify that the system is healthy and working well, provide statistics about any service/worker, etc..</div>
<div>The update/add/delete approach - What would you do if you wanted to update the data in these services during runtime on production systems? Would you cache the old data while the script creates a new one and replace it? Or would you look up inside the data and change specific records? Every service behaves differently and has its own data so you'll need to implement an update mechanism for every service. OTP design overcomes these problems using the replacement approach, simply by loading a new JVM replacer process that holds the new data version&nbsp;instance&nbsp;or even might load a new code version as well.</div>
<div>Keep alive/healthy and working properly &ndash;&nbsp;What if a service is damaged and runs into a loop that&nbsp;exhausts&nbsp;the machine or even worse has a bad code that crashes the whole JVM with all the other services that are in that JVM.&nbsp;With OTP design&nbsp;you can monitor all of the processes and verify not only that the service is available but also verify that it works well. In addition, every service is on a different JVM so if one crashes, it won&rsquo;t crash the whole system and a new replacer will be&nbsp;launched.</div>
<div>Language selection flexibility - what if you want to write a service in Ruby?&nbsp;OTP design&nbsp;Architecture enables this privilege, writing the service/worker can be done in any language.</div>
<div>Development effort/time &ndash; OTP helps you to focus only on the business logic. When writing a new worker you don't have to be concerned about exposing the web service, etc...</div>
<p>&nbsp;</p>
<p><b><font size="3"><u>High level design</u></font></b></p>
<div>&nbsp;</div>
<div>This design is based on <a href="http://en.wikipedia.org/wiki/Separation_of_concerns">separation of concerns</a>:</div>
<ol type="1" start="1">
    <li>Workers      &ndash; every worker acts as a service, for example: a lucene based service that      returns certain results is based on its index. The worker receives its      jobs, process them and return the results to the<b>&nbsp;</b>Client-Server      Supervisor.</li>
    <li>Supervisors      can be divided to 2 kinds:&nbsp;
    <ol type="a" start="1">
        <li>Client-Server Supervisor&ndash; Handles the client requests/responses/continuations,       delivers its unique job to every worker and provides&nbsp;a       variety&nbsp;of services such as statistics,&nbsp; <a href="http://en.wikipedia.org/wiki/Rate_limiting">rate&nbsp;limiting</a>,       asynch and synch requests handling, priority jobs, health check/status,       etc... &nbsp;</li>
        <li>Workers Supervisor executer &ndash; verifies that every       worker works well and is responsible to replace workers as needed. It can       have another role which is to download new versions&nbsp;(data or code)       and replace these workers in runtime.</li>
    </ol>
    </li>
</ol>
<p>&nbsp;</p>
<div>Diagram #1 demonstrates the communication between these modules and not the flow sequence which will be demonstrated in the PowerPoint below:</div>
<div><a href="/files/1(3).png">Diagram #1 link - image</a></div>
<p><span style="border-collapse: separate; color: rgb(0, 0, 0); font-family: Tahoma; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; font-size: medium;"><br />
</span></p>
<p>&nbsp;</p>
<p><img height="622" width="752" src="/files/1(3).png" alt="" /></p>
<p class="rtecenter">Diagram 1 &ndash; High level architecture</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div><b><font size="3"><u>Jobs request handling - Client-Server supervisor &amp; its Workers</u></font></b></div>
<div>&nbsp;</div>
<div><b>Workers</b></div>
<div>Every worker has a generic&nbsp;behavior (GenericWorker): sign up to its supervisors, create periodically HTTP requests, receive jobs to execute, notify about failures, return the jobs results, work in multi threading mode, stop existing request processing etc..</div>
<div>When writing a new service, the developer mainly focuses on the&nbsp;business&nbsp;logic and usually doesn&rsquo;t have to worry about the generic behavior.</div>
<div>The worker's HTTP request contains the results of the previous job in its body. The next job to process will be delivered to the worker in its HTTP response.</div>
<div>&nbsp;</div>
<div><b><span>Client-Server Supervisor</span></b>&nbsp;has 3 different Handlers: the first handles with the workers, second with the client requests and the third handler deals with status/statistics of all the queues/worker/services including with a detailed information about all the workers.<br />
The main functionality of the Client-Server is to map all kinds of client service requests to the appropriate service/worker. This server is stateless and holds all queues in memory, there are 2 queues per service &ndash; first is the clientQ that contains all waiting client requests and second is the workerQ which contains all the workers that are waiting to receive jobs for this service. All communications between the client to server and workers to server are based on standard HTTP protocol.</div>
<div>Flow description - when a client request arrives to&nbsp;Client-Server Supervisor, a continuation for this request is initialized. If this service currently has available workers waiting in workersQ&nbsp; then a new &ldquo;good&rdquo; worker will be taken from the queue and the job will be created. Otherwise if there are currently no available workers in the queue (they are all working on previous jobs), then this request will be added to the clientQ and when a worker comes back with its previous request, the server will first send its results to the previous client and then the worker will take the second job from the client, you can see the below PowerPoint that demonstrate the request flow.</div>
<div>&nbsp;</div>
<div><b>Workers Supervisor executer&nbsp;</b>main&nbsp;role is to be responsible for the resource management: amount of workers, starting/stopping workers, checking if they work well and replacing them when necessary, downloading the latest data/code versions for each service/worker, prepare a new version and replace the old worker, reverting to an old version and keeping X amount of latest good versions, (Versions can be data or code, referring as update and upgrade a service).</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<p>&nbsp;</p>
<div style="width: 680px; text-align: left;"><object height="592" width="680" id="onlinePlayer446019" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">
<param value="http://www.slideboom.com/player/player.swf?id_resource=446019" name="movie" />
<param value="always" name="allowScriptAccess" />
<param value="high" name="quality" />
<param value="#ffffff" name="bgcolor" />
<param value="true" name="allowFullScreen" />
<param value="" name="flashVars" /> <embed height="592" width="680" flashvars="" allowfullscreen="true" bgcolor="#ffffff" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="onlinePlayer446019" src="http://www.slideboom.com/player/player.swf?id_resource=446019"></embed> </object></div>
<div style="width: 680px; text-align: left;">&nbsp;</div>
<div style="width: 680px; text-align: left;"><font size="3"><b>disadvantages / problems in this approach:</b></font></div>
<div><span>1.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Lots of connections can be created in the server - every worker creates multiple connections with the Client-Server supervisor. in order to avoid creation of so many connections you can use enable keep alive and to reuse connections. In addition you might need to configure the tcp configuration in the machine (<a href="http://publib.boulder.ibm.com/infocenter/cmgmt/v8r3m0/index.jsp?topic=/com.ibm.eclient.doc/trs40019.htm">http://publib.boulder.ibm.com/infocenter/cmgmt/v8r3m0/index.jsp?topic=/com.ibm.eclient.doc/trs40019.htm</a>, <a href="http://smallvoid.com/article/winnt-tcpip-max-limit.html">http://smallvoid.com/article/winnt-tcpip-max-limit.html</a>).</div>
<div><span>2.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>This design is delicate regarding timings/clock:&nbsp;timeouts on the server side (continuation) VS client side read/connect timeouts.</div>
<div>The design that a worker is arriving to the Client-Server supervisor and hangs there until he receives a job is problematic because (for example):</div>
<div>let&rsquo;s say you set 20 seconds read timeout at the <b>worker's client</b> <b>side</b> and a <b>client</b> request arrived after 19 seconds,&nbsp;the worker hanged in Client-Server for 19 seconds. in this situation the server will have 1 second to write the job to this worker. Without dealing with this kind of edge scenarios you can lose requests. One way to deal with this issue is to release a worker if there is not enough time to deliver the job and In the other hand I wouldn&rsquo;t recommend to have endless(0) readTimeout or connectionTimeout.</div>
<div><span>3.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>It takes time to build such an application server that will work well regarding resource management but once that you wrote the supervisors, the development of new services/workers is very easy and fast.</div>
<div><span>4.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Latency - the latency is harmed a bit because every bit is being written and read twice. on the server, we read the inputstream, write to the workers outputstream. in the workers side we read it again and when we have results we write it again to the server, the latency is being increased only by few Ms depends on the jobs content length.</div>
<div><span>5.<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Separating the supervisor has advantages but also some disadvantages. Dealing with edge communication scenarios where supervisor needs to make decisions.</div>
<div>&nbsp;</div>
<div><b><font size="3">What are the benefits of this approach?</font></b></div>
<div>&nbsp;</div>
<ol type="1" start="1">
    <li>Development time decreases - provides a faster way to develop      a new service. There is no point in wrapping every new service with a      web/application server and implementing all of the above benefits for      every service. The initiative is to make a thin service/worker (just the      service core itself).&nbsp;</li>
    <li>Every      registered worker automatically receives sub-services from the      client-server supervisor.</li>
    <li>Ability      to make data and code updates, done by the supervisor &ndash; workers can be      replaced with newer versions.</li>
    <li><a href="http://en.wikipedia.org/wiki/Rate_limiting">Rate limiting</a>      and&nbsp;<span>resource management operations are      given for free for all the services/workers.</span></li>
    <li>Watch      over the workers/<span>services&nbsp;and verify      that they are up and working well.</span></li>
    <li>Information      is exposed by API such as: last failed job time, number of good jobs done,      total of failed jobs done, how many client requests are waiting in queue      at a certain moment.&nbsp;</li>
    <li>Priority      queue mechanism &ndash; a distinction in client queue requests between normal      and higher priority requests which is done by the client-server supervisor.</li>
    <li>Load/kill      workers based on statistics &ndash; based on daily statistics the supervisor can      pre-decide when to load more workers.&nbsp;</li>
    <li>Development language selection flexibility.</li>
    <li>Minimize the risk if a crash occurs &ndash; worker sign up only once and don&rsquo;t need to be restarted      if one of its supervisor was restarted.</li>
</ol>
<p>&nbsp;</p>
