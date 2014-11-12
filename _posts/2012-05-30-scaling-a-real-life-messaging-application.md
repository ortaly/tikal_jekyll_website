---
layout: post
title: Scaling a real life messaging application
created: 1338394544
author: avit
permalink: /scaling-real-life-messaging-application
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2009/11/03/scaling-a-real-life-messaging-application/istock_000009154776xsmall/' rel='attachment wp-att-259'><img alt='server farm' class='alignleft size-thumbnail wp-image-259' height='150' src='http://www.kensodev.com/wp-content/uploads/2009/11/iStock_000009154776XSmall-150x150.jpg' title='server farm' width='150' /></a>
<p>Well, this was exactly the case with a client of mine, the client is a forex company, they had 2K concurrent users and they are currently in the process of redesigning the client application and plan to grow up to 20K concurrent users.</p>

<p>This is a classic job for me, it’s what I do. It’s a different company with different needs, so, in this post I will give you the solution I gave the company without revealing details about the company of course<!--more--> <h3>What do you need to deal with?</h3> <a href='http://www.kensodev.com/2009/11/03/scaling-a-real-life-messaging-application/planning_the_software_needs-2/' rel='attachment wp-att-261'><img alt='planning the software needs' class='alignnone size-full wp-image-261' height='366' src='http://www.kensodev.com/wp-content/uploads/2009/11/planning_the_software_needs1.jpg' title='planning the software needs' width='550' /></a></p>

<p>As always, I started with a pen and a paper, sitting down with the company’s CTO, understanding the need of the software from the hardware.</p>

<p>This is a most important stage for me, learning to listen to the guys that hired you for the consulting is not always easy but let me tell you this, they know their product better then you, even if the design is not the best, even if it has flaws they know it better then you will ever do in the short time you are there for consulting.</p>

<p>OK, after that being said, let’s continue…</p>

<p>So, the software needs are like so: <ul>
	<li>messaging from server to client</li>
	<li>latency is out of the question</li>
	<li>custom load balancing based on decision (20% load is OK or 80%???)</li>
	<li>amount of messages --> 2-4 messages a second per client</li>
</ul> As you probably understand, these demands are huge for a 20K concurrent users application. I accepted the challenge and went to designing the solution. <h3>planning</h3> This application is based on high volumes, the volumes can vary at times. because this is a forex based application there are times that the messaging is dead. Meaning there is not much movement and there is time that the application should supply 2-4 messages a second to each client.</p>

<p>And another surprise: The data is personal so you can’t use a shared cached object. Delightful.</p>

<p>Let’s attack it each section at a time, shall we? <h4>Messaging from client to server (push)</h4> I chose to use MSMQ based application. Basically you push messages into a queue of messages, the messages are then pulled from the queue by the appropriate application or in our case (as you will see next) appropriate server. <h4>Custom load balancing based on decision</h4> Well, this is a tricky one, usually what you do in the client application is hard-code a server URI inside your code, this means if you want to make proper scaling you should create different versions of the application for each server right? WRONG!</p>

<p>The solution is like so…</p>

<p>Inside the server cluster there will be a “decision server”, this server will manage all the other servers in the cluster. Each time a user is trying to connect, the application first tries to connect to that “decision server”, this server looks at it’s DB (you built) and sees the load on each server, the server then decides based on the allowed load which server he should lead you to and simply gives you the URI, the application takes this URI returned as a string and connects.</p>

<p>No Worries, I will explain more, but this is exciting ain’t it?? :-) <h4>Amount of messages --> 2-4 messages a second per client</h4> Well, we will see about that in a second. <h3>The solution (Explained)</h3> <a href='http://www.kensodev.com/2009/11/03/scaling-a-real-life-messaging-application/messaging_server_for_blog/' rel='attachment wp-att-262'><img alt='messaging diagram' class='aligncenter size-medium wp-image-262' height='258' src='http://www.kensodev.com/wp-content/uploads/2009/11/messaging_server_for_blog-300x258.png' title='messaging diagram' width='300' /></a></p>

<p>So, let’s explain this for you. <h4>The decision server</h4> The decision server is just an HTTP service connected to an SQL server (can be express), this SQL server holds the servers it has in the cluster and a connection count.</p>

<p>The connection count is calculated to decide on the load, this is just simple math and based on experience with the system, the system can learn and the system admin can teach it.</p>

<p>If the server failed after 2000 connection then this is 100% load, the admin sets the system for 40%, that or whatever other number he wants.</p>

<p>Hmm… Interesting right?</p>

<p>Right, this is a custom service and so simple it’s unbelivable. Now, you are probably wondering that this is one server handling all the load right?</p>

<p>Well, no, this server is kicked into action only the first time a user connects to the system per sessio. After the decision server returned the URI to the users, the user will never get to that server again unless he disconnects and tries to connect again. <h4>The messaging server</h4> The messaging server is based on WebOrb.net excellent messaging application, this application can conect to a queue of messages, whether the queue is local or remote.</p>

<p>This is actually a pretty intuitive ready solution for you, you don’t have to custom program anthing, the WebOrb application is pretty solid and handlers a large amount of connections per server <h4>The client</h4> The client application is stupid, it has no logic to select the server, it connects to the server (decision) and gets a URI, after that URI is in the application it holds it in cache or as a static variable so it won’t have to go back to the service for it. <h4>Single point of failure?</h4> As you noticed (or not) there is a single point of failure in the system right?</p>

<p>Well yes, there is. The decision server is a single point of failure, if it fails to load or fails to return a URI the system won’t work.</p>

<p>To overcome this issue I simply added another server as a fallback, if you connect them with a load balance soltion you get also load control but that’s (at least for my solution) is an over kill. <h3>Testing</h3> When testing this cluster / server / client solution we got amazing results, the servers are at 20% load, the scaling is horizontal and you can connect another server any time you want, thus creating another place for your users to connect to and instantly enabling more connections to your service. <h3>Conclusion</h3> This was a very good project for me, I succeeded with my mission and I hope you took some info from what I did.</p>

<p>Feel free to comment.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/gdJUKiClRqk" height="1" width="1"/>
