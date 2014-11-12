---
layout: post
title: How can you give quality service to your clients
created: 1338394544
author: avit
permalink: /how-can-you-give-quality-service-your-clients
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/client-support-crossword/' rel='attachment wp-att-350'><img alt='' class='alignleft size-thumbnail wp-image-350' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/02/iStock_000009671781XSmall-150x150.jpg' title='Client support crossword' width='150' /></a>
<p>As a freelancer, all of the client’s communication and service is up to you, you need to provide them with the best platform to work on, with you, along side with the existing team inside the company (in-case you are working with them).</p>

<p>So, because I believe I have that kind of platform I thought I’d share (as I always do) with you, how I work with my clients, although there are tools and services in this post, it’s not about them, it’s about how you can use them, seeing the customer’s needs in the center of your concerns.</p>
<!--more-->
<p>I as a <a href='http://www.kensodev.com/about-avi-tzurel/' title='Avi Tzurel'>freelancer</a> very often work as a team leader inside a company, sometimes as the architect and sometimes as the development director, sometimes both and I even love working as a lead developer.</p>

<p>So, my service must be customizable around who I am at the moment and what does the client expect of me to be.</p>

<p>Let us begin… <h2>SVN - Source control system</h2> First, whether the company is working with a source control or not, I always bring my source control system with me, I work with SVN (or GIT). I use <a href='http://www.beanstalkapp.com' target='_blank'>beanstalk</a>, you can read about it in a previous post I wrote <a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/' target='_blank'>here</a>.</p>

<p>You probably ask yourself the same question everyone is asking me, why not use a regular SVN server hosted in a farm or something, well, my answer is always the same, beanstalk are giving me an all around solution for my needs for example: <h2><strong>TimeLine</strong></h2> All of the team commits can be seen inside a time line very similar to facebook, to me as the leader or the architect it’s very easy to know in the morning what has been accomplished yesterday and by who.</p>

<p><span>caption id=”attachment_351” align=”aligncenter” width=”300” caption=”Beanstalk svn timeline”</span><a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/screen-shot-2010-02-19-at-2-31-46-pm/' rel='attachment wp-att-351'><img alt='' class='size-medium wp-image-351' height='175' src='http://www.kensodev.com/wp-content/uploads/2010/02/Screen-shot-2010-02-19-at-2.31.46-PM-300x175.png' title='beanstalk svn timeline' width='300' /></a><span>/caption</span></p>

<p>As you can see, I can see very clearly who are the team members on this specific project, what are the change-sets they are responsible for and the file that have been changed during the work Yesterday or last month for that matter.</p>

<p>Also, I can use webhooks to do whatever I want, I can use email notifications for every commit (very useful) and many other more very useful features. <h2>Project management system</h2> I work with <a href='http://www.basecamphq.com'>basecamp</a> to manage all of the project aspects.</p>

<p>What do I manage: <ul>
	<li>deadlines</li>
	<li>to-do's</li>
	<li>messages</li>
	<li>chat</li>
	<li>files</li>
	<li>source</li>
</ul> I’ll explain the source line :-)</p>

<p>Every commit from beanstalk posts a message on the board at basecamp dashboard, meaning I can comment (beanstalk added a feature similar to that recently) on a team member commit and give him feedback on it.</p>

<p>Everything is kept inside the “project” context, I’ll five you an example, because at beanstalk you can see the source changes, very easily I can review the code in the web browser, that means when a team member writes bad code or code I expect to be cleaner or even if he didn’t comment his code enough ( I have clear rules on that) i simple message him the second I see it and he gets an email about it.</p>

<p>Another use I have for this feature is commenting out new features in the system, If I (or another team member) added a new code to the system, I usually post a comment to the commit and say what I added and what are the usage for it, this clarifies the usage for the team and there are no questions.</p>

<p>If the team is not clear how they can use a feature I added they go to the message and there they will see example source code and comments about that feature.</p>

<p><span>caption id=”attachment_353” align=”aligncenter” width=”300” caption=”Basecamp project dashboard”</span><a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/screen-shot-2010-02-19-at-2-43-32-pm/' rel='attachment wp-att-353'><img alt='' class='size-medium wp-image-353' height='180' src='http://www.kensodev.com/wp-content/uploads/2010/02/Screen-shot-2010-02-19-at-2.43.32-PM-300x180.png' title='basecamp dashboard' width='300' /></a><span>/caption</span></p>

<p>In the screen shot above you can see a project dashboard. This is for a specific project, you as the owner of the account have a dashboard for all the project you are running in the system.</p>

<p>With the morning coffee, you can review what you have to do urgently and what can wait another day, making choices based on data is always better then choices based on your memory or anything else for that matter. <h2>Backup</h2> If I could create a shouting voice in this title I would, your client’s code, data, files and everything you have at your possession is very important you your client, so you should provide a descent backup service for him.</p>

<p>The client must know, no data is being lost, no matter if your laptop caught fire, stolen, broken or any other natural or synthetic disaster that can be caused in our daily crazy life on this world :-)</p>

<p>I my self have a double backup.</p>

<p>I use a free software called syncback to backup all of the data to an external HD.</p>

<p>Also, I use a remote backup using Mozy.com.</p>

<p>So, every night, my computer backs up twice, once to a close location (HD) and one to a remote location (Cloud service).</p>

<p>Of course, using SVN is having sort of a backup for the code, but I so another backup just in case, of course for all the other stuff that are not code like images, documents or anything else. <h2>Sync</h2> Keeping in sync with your client is very important, I’m talking from the files point of view right now. I use dropbox on my computer and have dropbox installed for every team member, this way if we have a design document or a mockup or anything else, the file is being updated for everyone at the same time.</p>

<p>So, every time you talk to your team or a member of your team, you are talking about the same thing, you actually look at the same file exactly, so if a team member has a comment he can write it down and everyone will see it the next time they open the file.</p>

<p>This is a very helpful feature dropbox has and I love using it.</p>

<p><span>caption id=”attachment_354” align=”aligncenter” width=”300” caption=”Dropbox shared folder”</span><a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/screen-shot-2010-02-19-at-2-57-06-pm/' rel='attachment wp-att-354'><img alt='' class='size-medium wp-image-354' height='198' src='http://www.kensodev.com/wp-content/uploads/2010/02/Screen-shot-2010-02-19-at-2.57.06-PM-300x198.png' title='Dropbox share folder on a mac' width='300' /></a><span>/caption</span> <h2>Time tracking</h2> I almost entirely work on an hourly basis with my clients, so I have to use a reliable system to track my time.</p>

<p>When working on an hourly basis you must be very careful not to work on a client X project on client’s Y dime.</p>

<p>For that, I use <a href='http://www.toggl.com' target='_blank'>toggl.com</a>, this service is another cloud service to track your time, the clear advantage of that service is that it has a desktop based widget, you begin to track time, if for some reason you left your computer during that time, the widget will inform you on that error when you get back.</p>

<p>That way, a client only pays for time you actually worked, he is more comfortable with working this way.</p>

<p>You can also set custom rates for each client, you can export reports in PDF format and more, the client has a public report, meaning he can see at real time what you are working on and how much time you spent on this mission.</p>

<p><span>caption id=”attachment_355” align=”aligncenter” width=”300” caption=”Toggl client report”</span><a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/client_report/' rel='attachment wp-att-355'><img alt='' class='size-medium wp-image-355' height='228' src='http://www.kensodev.com/wp-content/uploads/2010/02/client_report-300x228.png' title='Client report' width='300' /></a><span>/caption</span></p>

<p>If you use the paid account those reports are available to the client, also you can brand it with your logo so when the client’s print it out it will look nice as well. <h2>iPhone</h2> I recently bought an iPhone, so here are some thoughts on how I use it to give a quality service.</p>

<p>Mail –> always available, whether I’m traveling or I’m out of my home office.</p>

<p>ToDo–> always synced</p>

<p>Calendatr -> synced</p>

<p>Dropbox -> synced</p>

<p>Many many more features such as to do lists (app store) and many more, I used blackberry and Nokia E71 before, I must say I really feel I am more productive when using the iPhone and more in touch with everything when I travel around.</p>

<p><span>caption id=”attachment_356” align=”aligncenter” width=”220” caption=”iPhone”</span><a href='http://www.kensodev.com/2010/02/19/how-can-you-give-quality-service-to-your-clients/apple-iphone/' rel='attachment wp-att-356'><img alt='' class='size-medium wp-image-356' height='300' src='http://www.kensodev.com/wp-content/uploads/2010/02/apple-iphone-220x300.jpg' title='apple iphone' width='220' /></a><span>/caption</span></p>

<p>That’s it for now :-)</p>

<p>part-2 coming soon…</p>

<p>I’d love to see your comments</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/54Pu0Ood9wg" height="1" width="1"/>
