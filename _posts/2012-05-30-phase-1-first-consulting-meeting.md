---
layout: post
title: Phase 1 - first consulting meeting.
created: 1338394544
author: avit
permalink: /phase-1-first-consulting-meeting
tags:
- Ruby
- web
---
<p>Hey all,</p>

<p>This is the second post in the upcoming long posts series. I thought it would be a great idea to post about my experiences as an independent consultant for companies. The posts will not be about personal experiences but instead about the knowledge I’m getting and passing thoughts. Whether its in the shape of a meeting, researching or sample applications</p>

<p>If you want to learn more about the series, please head <a href='http://www.kensodev.com/2009/07/15/this-is-the-beginning/' target='_blank'>here</a> and read.</p>

<p> </p>

<p>Okay, so this is the post about the first meeting.</p>
<img align='left' alt='BXP28324' border='0' height='240' src='http://www.kensodev.com/wp-content/uploads/2009/07/BXP28324.jpg' style='display: inline; margin-left: 0px; margin-right: 0px; border: 0px;' title='BXP28324' width='217' />
<p>However, this meeting was different, the client had many questions, he wasn’t sure what he wanted and how he wanted to do it. Because the client is a start-up company that deals with a lot of money and has somewhere between 20-30K users, there is no rush in their behalf (unbelievable I know), they want it done in the best possible way.</p>

<p>So, I had no preparations as to what they want. I knew the general idea though. They have an Html client and they want to transfer to flex. That’s pretty much all I knew.</p>

<p> </p>

<p> </p>

<p>When I got there, we started talking. The first question that popped into the room was what communication method they should use. Should they use AMF/xmlSocket/Http service or what….</p>

<p>So, lets break it down. Each method has pro’s and con’s. Flex has the advantage of not limiting you into a single method, you can use a couple or more methods of server side communication in a single flex application. You will need a very good team of developers and a superman project manager, but it is totally not an impossible mission, it can and it has been done before.</p>

<p>So, lets dig further in… Before stepping into the pro’s and con’s lets handle what they want to achieve (again, without compromising any data or even the company name).</p>

<p>They have users, the users are divided into groups, each group can contain X amount of users (x is a variable not a constant :-)) Above the group is an organization, an organization can have X amount of groups.</p>

<p>The data in the group is personal and cannot be compromised to other groups or users. the same goes with users of course. No data should leak between users, groups or organizations.</p>

<p>The calculated data is group specific. Meaning each group has their financial data, the calculations are based on their data and their data only.</p>

<p>Calculations, ok we are getting there… Question by me: Does the user/Group/Organization need to do an action in order for the data to be calculated? Answer: No. The calculations are done periodically (1 time per second in average) and need to be sent to the client without him even knowing about it, the data should be updated on his screen.</p>
<img align='right' alt='scratching_head' border='0' height='84' src='http://www.kensodev.com/wp-content/uploads/2009/07/scratching_head.jpg' style='display: inline; margin-left: 0px; margin-right: 0px; border: 0px;' title='scratching_head' width='100' />
<p>Lets move forward please, lunch is almost here… :-)</p>

<p>Question: What about other data on the screen, any other data needs this amount of crazy updating or should everything else be pretty standard? Answer: The rest of the screen, containing somewhere between 10-20 parts should not be updated in these time periods. The other data is sometimes the result of a user action or a group action.</p>

<p>Question: Should an action from a group be alerted to all the users inside it? Answer: Yes. Sometimes the group did something that caused the users to loose/gain money so they should be alerted about it.</p>

<p>Lunch :-)</p>

<p>Client: The final thing we want to accomplish is the ability to reach every user/group/organization separately and send them admin messages about everything from a version update to a hosting change.</p>

<p>Okay.</p>

<p>Great, I have my data and asked my questions (I gave you a brief version of course). Now lets start talking.</p>

<p>1st - 1s calculated data. Method of implementation.</p>

<p>Server - 1 Calculating server based on SQL server 2005/2008 (we will not get into the configuration) a caching solution (sometimes the data is the same as before, why should the server sweat if the data has not changed). 2 - Messaging server connecting to that Calculation server. 3 - Windows service using an XMLsocket connection based on clientIP, groupID, organizationID, when the data for an entity of those that has changed you simply push the data to them. If the data has not changed you send out nothing. The GUI at the client will not change and the NET traffic will not overflow.</p>

<p>This way you keep it simple. You calculate the data on server 1, you send the data using server 2, connection to server 1 using a windows service which you can monitor performance.</p>

<p>Pro’s: Very rapid communication, no overflowing the servers with requests, if the data has not changed nothing happens. Just for a reference, the client implemented the same feature in their current application using a 1 second JavaScript timer and a service.</p>

<p>Can you guess what happened? (Hint: Guess who crashed first: the server or the client)</p>

<p>Con’s: Scale up in this solution is not always easy and it isn’t done just in software. You need some hardware changing too. Though in the beasts they have over there, they have time to worry about that.</p>

<p>2nd communication - Client or group does something and data should change in the GUI. For this solution I think the <a href='http://www.themidnightcoders.com/products/weborb-for-net/overview.html' target='_blank'>webOrb.net</a> would be perfect, you get out of the box push in HTTP while the data changed and you don’t have to write any custom code for it.</p>

<p>The <a href='http://www.themidnightcoders.com/products/weborb-for-net/overview.html' target='_blank'>WebOrb.net</a> is a solution that lets you use AMF3 or AMF0 or RTMP communication with a Flex client. It is very robust, easily configured and even has a built in monitoring solution.</p>

<p>Pro’s: The weborb solution is hosted on top of IIS6/7 so you can configure it with the flexibility of your choice. you can write custom code, use the classes you already have in an asp.net application or generate a new application from scratch using the code generation solution. Scale up is very easy, using a load balancer and 2 servers you multiply the users that can use the system at once. Clouding: you can pass this service into the cloud at AmazonEc2 or at any other clouding service and get out of the box scale up when needed.</p>

<p>Con’s: The push is not always in a heart beat, mainly when you are talking about 20-30K users. As always in a 3rd party solution, you can’t actually do ANYTHING you want.</p>

<p>3rd Method: Admin Messages Since the messages are not meant to be urgent, (urgent messaging will be sent on the socket already connected) the most efficient thing to do is by using FileSystem on the server for every group, user, organization and have the flex client check it once every 24 hours using an http request to the file it is using. That way, the solution is not using any database in real time and will not slow down the db which is well needed on other crucial actions.</p>

<p>That’s it… That wasn’t all of the meeting, but that’s enough to chew on for this post. On the next post I will continue with the questions and answers that came up on the same meeting at this client.</p>

<p>Some of the subjects that we will discuss on the next post:</p>

<ol>
<li>Handling disconnect</li>

<li>Multilanguage</li>

<li>Skins</li>

<li>Group work</li>

<li>SVN</li>

<li>Flex builder versions</li>

<li>Graphic’s team brief</li>

<li>Graphic artist–developer–project manager. Why? How? When? Who???</li>
</ol>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/E2eDpm2S-UM" height="1" width="1"/>
