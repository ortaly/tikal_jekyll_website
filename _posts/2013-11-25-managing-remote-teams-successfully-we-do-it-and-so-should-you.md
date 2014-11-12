---
layout: post
title: Managing remote teams successfully. We do it and so should you
created: 1385414022
author: avit
permalink: /managing-remote-teams-successfully-we-do-it-and-so-should-you
tags:
- Ruby
---
<p>Remote work has never been more in-the-news, wherever I go on the internet, I see people talking about doing Remote work and how beneficial it is for people.</p>

<p>37Signals recently wrote a book about it, while I generally dislike their style, I think they hit a nerve here.</p>

<h2>History</h2>

<p>When I started my company (Kenso) 4 years ago, I knew that remote work will be a huge part of the work environment, and I was explaining it to my clients.</p>

<p>Back then, remote work was even less popular and wide-spread than it is today, so it was hard at times, but the system we developed in the company proved itself useful to clients and after a week or two every single client that was having doubts was completely sold.</p>

<p>When the company joined the Tikal family, I was really happy that this remote work system caught on here as well and kept developing and providing really excellent service to clients all over the world.</p>

<h2>Present times</h2>

<p>Here at Tikal we are working with remote clients and remote teams (which typically come together).</p>

<p>Let&#39;s take one of our US clients for example, the Tikal working with the client consists of 3 engineers (2 women b.t.w) working out of Israel. The client also has other remote employees from all over the world and the Tikal team needs to work in synergy inside this situation.</p>

<h2>How it&#39;s done?</h2>

<p>The way we do it is pretty simple and straightforward, however I have not seen a post that covers everything in detail yet, so let&#39;s dive in to the tools and the other nitty gritty details.</p>

<h2>The system</h2>

<p>The system we developed and refined here consists of a few categories details below.</p>

<h3>Birds eye view</h3>

<p>The client and the company (Tikal) both have birds eye view of the project and how it&#39;s running at any given moment without asking anyone.</p>

<p>You know the status of the tasks, the builds, the hours spent, everything is just one click away.</p>

<h3>Automation</h3>

<p>Every task you do more then once is automated, whether it&#39;s through the chat robot (details in the post), CI or anything else, but it has to be automated.</p>

<p>Any task has to be simple enough that any person with an internet connection and access to the project can do it at any time</p>

<h3>Control</h3>

<p>Really not much to say here, the client must have control on what&#39;s happening to the project at any given time.</p>

<h3>Tooling</h3>

<p>Both virtual tooling and physical tooling are crucial for the system to work, as you can see detailed in the post</p>

<h2>Virtual Tools</h2>

<h3>Chatroom</h3>

<p>Perhaps the most crucial part of the remote work is the chatroom, we use 37Signal&#39;s <a href="http://basecampnow.com">Basecamp</a> in order to communicate with the team.</p>

<p>Every team member (from the client side and from the Tikal side) has an account and is online whenever he/she is actively working.</p>

<p>Meaning, the entire communication between the team happens asynchronously, you can leave a message to someone but you can&#39;t rely on them to reply right away, they might be focused on a bug or a feature and not always pay attention.</p>

<h4>Flint</h4>

<p><a href="http://f.cl.ly/items/0S3G3k0o0W2Q2S1z1m23/flint_screenshot.jpg" target="_blank"><img alt="Flint" src="http://f.cl.ly/items/0S3G3k0o0W2Q2S1z1m23/flint_screenshot.jpg" style="max-width:100%;" /></a></p>

<p>We <strong>don&#39;t</strong> use the web version of Basecamp, because for one you have to open up a browser, you have to dedicate a tab and if you close it it&#39;s gone (and it might take you some time to notice).</p>

<p>Instead we use Flint, which is an awesome Mac app (<a href="https://itunes.apple.com/us/app/flint/id459122418">Purchase link</a>), and an iPhone app (<a href="https://itunes.apple.com/us/app/flint-for-ios/id698724032">Purchase link</a>)/</p>

<p>The best thing about Flint is that you can define notifications and keywords.</p>

<p>During the day, you don&#39;t want to get notified on every line in the chatroom, that will be too distracting, instead you can define keywords (for example you name), and only then you get notified.</p>

<p>This way, someone can &quot;poke&quot; you when they need you specific attention.</p>

<p><a href="https://github-camo.global.ssl.fastly.net/e648cf7264d46777d31f7fb67d969367dd5bf5f3/687474703a2f2f662e636c2e6c792f6974656d732f3345337432753271324131453039327a304133362f496d616765253230323031332e31312e3234253230313025334130372533413231253230414d2e706e67" target="_blank"><img alt="image" src="https://github-camo.global.ssl.fastly.net/e648cf7264d46777d31f7fb67d969367dd5bf5f3/687474703a2f2f662e636c2e6c792f6974656d732f3345337432753271324131453039327a304133362f496d616765253230323031332e31312e3234253230313025334130372533413231253230414d2e706e67" style="max-width:100%;" /></a></p>

<p>Flint is running in the background, so you are always online when you work, and you are confident that when someone needs you, they will find you and you can resolve the issue they have.</p>

<h4>CI</h4>

<p>Whenever you have lots of people working on a project (especially in different timezones), having a CI will really help you control what&#39;s going on in your project.</p>

<p>We probably use every CI solution out there (clients sometimes demand working with an existing CI) so we really have experience in setting it up, notifications, build types, deploy types and more.</p>

<p>The CI has built in triggers, whenever a code is pushed to master (we never push to master more on that coming up), the CI runs all of the relevant tests and triggers a notification to the chatroom (more on that coming up as well).</p>

<p>Our CI tasks usually include</p>

<ul>
	<li>Deploy to production</li>
	<li>Deploy to staging</li>
	<li>Unit tests</li>
	<li>Integration tests</li>
	<li>Javascript tests</li>
	<li>Branch tests (when you want to test a PR)</li>
	<li>Deploy to dev servers</li>
</ul>

<p>Automated triggers usually are</p>

<ul>
	<li>Deploy master to staging twice a day on fixed times We usually have <a href="http://www.utest.com/">uTest</a> cycles twice a day, so this way we know they have the latest master to test.</li>
	<li>Run specs on master change</li>
	<li>Run specs on chatroom trigger (using <a href="http://hubot.github.com/">hubot</a>)</li>
	<li>Run deploy on chatroom trigger (using hubot)</li>
</ul>

<h4>Hubot</h4>

<p>In the above section I have mentioned hubot, we use our own version of hubot on every project. Hubot is usually idle in the chatroom and can respond to two kinds of triggers</p>

<ul>
	<li>Listen</li>
	<li>Command</li>
</ul>

<p>Listen means, then whenever a keyword appears in the chatroom, hubot will do something. Command means you can tell hubot to do something.</p>

<p>Listen sample code:</p>

<pre>
<code>
    images = [
      "http://s3.amazonaws.com/kym-assets/photos/images/original/000/114/151/14185212UtNF3Va6.gif?1302832919",
      "http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/110/885/boss.jpg",
      "http://verydemotivational.files.wordpress.com/2011/06/demotivational-posters-like-a-boss.jpg",
      "http://assets.head-fi.org/b/b3/b3ba6b88_funny-facebook-fails-like-a-boss3.jpg",
      "http://img.anongallery.org/img/6/0/like-a-boss.jpg",
      ]

    module.exports = (robot) -&gt;
      robot.hear /like a boss/i, (msg) -&gt;
        msg.send msg.random images

</code></pre>

<p>Command sample code:</p>

<pre>
<code>
    module.exports = (robot) -&gt;
      robot.respond /PING$/i, (msg) -&gt;
        msg.send "PONG"

      robot.respond /ECHO (.*)$/i, (msg) -&gt;
        msg.send msg.match[1]

      robot.respond /TIME$/i, (msg) -&gt;
        msg.send "Server time is: #{new Date()}"

      robot.respond /DIE$/i, (msg) -&gt;
        msg.send "Goodbye, cruel world."
        process.exit 0

</code></pre>

<p>Our hubot is constantly getting updates and new tasks, we do that to automate everything we need and to expose engineering tasks to the client.</p>

<p>For example, client can deploy to production, staging, run tests, reports and do anything else they want, and if they don&#39;t have it, it&#39;s usually just a few lines of code away.</p>

<h4>Project Monitor</h4>

<p><a href="https://github-camo.global.ssl.fastly.net/b7da071cd900f9b06d5d484ba78362fab9071db6/687474703a2f2f662e636c2e6c792f6974656d732f3330333330773364333331613157314c305532502f496d616765253230323031332e31312e3234253230313025334133372533413434253230414d2e706e67" target="_blank"><img alt="image" src="https://github-camo.global.ssl.fastly.net/b7da071cd900f9b06d5d484ba78362fab9071db6/687474703a2f2f662e636c2e6c792f6974656d732f3330333330773364333331613157314c305532502f496d616765253230323031332e31312e3234253230313025334133372533413434253230414d2e706e67" style="max-width:100%;" /></a></p>

<p>We use Pivotal&#39;s <a href="https://github.com/pivotal/projectmonitor">project_monitor</a> In order to expose the status of the project to the client on one hand and also to expose the status of all projects to the managers here in Tikal on the other.</p>

<p>This way, the client always knows the status of the builds, and we know the status of every project running right now.</p>

<h4>Pivotal Tracker</h4>

<p><a href="https://github-camo.global.ssl.fastly.net/67d1d2ce2c3b9c342e92ba722ed50891f8a5c7df/687474703a2f2f662e636c2e6c792f6974656d732f3036316130763064307a334533423179324a32412f496d616765253230323031332e31312e3234253230313025334134322533413137253230414d2e706e67" target="_blank"><img alt="Pivotal Tracker" src="https://github-camo.global.ssl.fastly.net/67d1d2ce2c3b9c342e92ba722ed50891f8a5c7df/687474703a2f2f662e636c2e6c792f6974656d732f3036316130763064307a334533423179324a32412f496d616765253230323031332e31312e3234253230313025334134322533413137253230414d2e706e67" style="max-width:100%;" /></a></p>

<p>Pivotal Tracker is probably the most used tool in the company, we use it to communicate, plan, comment, reject, accept and any other project related task you can think of.</p>

<p>Really, I think a lot of people use Pivotal Tracker, the secret IMHO lies in <strong>HOW</strong> you use it.</p>

<p>For example, if you see code that needs to be refactored, open up a pivotal task and put it in the icebox, when you get around to it, just work on that story.</p>

<p>Also, another secret that a lot of people know but very few actually do, is to be as descriptive and communicative as you possibly can, write great story descriptions and great comments and you&#39;ll see that with time, this communication comes natural and when you see a story you can easily jump into the discussion.</p>

<h4>Google</h4>

<p>We use two Google products as part of the flow</p>

<ul>
	<li>Hangouts</li>
	<li>Talk</li>
</ul>

<p>I think the usage is pretty obvious but one thing that is important to clarify is that we use Google Talk ONLY if the conversation is not relevant to the other team members, if it is, we use the chatroom.</p>

<h4>Skype</h4>

<p>Facetime and pair programming (for voice only)</p>

<h4>Remote pair programming</h4>

<p><a href="https://github-camo.global.ssl.fastly.net/29338a71a6820ac95cf155b0e532e3338de9a6b8/687474703a2f2f662e636c2e6c792f6974656d732f337a30523350324f316f314b326a3267333431562f496d616765253230323031332e31312e3234253230313025334135302533413536253230414d2e706e67" target="_blank"><img alt="Tmux session" src="https://github-camo.global.ssl.fastly.net/29338a71a6820ac95cf155b0e532e3338de9a6b8/687474703a2f2f662e636c2e6c792f6974656d732f337a30523350324f316f314b326a3267333431562f496d616765253230323031332e31312e3234253230313025334135302533413536253230414d2e706e67" style="max-width:100%;" /></a></p>

<p>I ABSOLUTELY love pair programming, I think that people really miss out on a great thing if they don&#39;t do it. Remote or not, do it and do it NOW.</p>

<p>Pair programming in remote <strong>usually</strong> really sucks, and the solutions people use are really awful.</p>

<p>I hate screen sharing, it&#39;s broken by design.</p>

<p>The way we do remote pair programming is using <a href="http://tmux.sourceforge.net/">Tmux</a> and SSH into the machines.</p>

<p>Tmux is basically a terminal multiplexer, it &quot;sits&quot; on top of your terminal and acts as a window manager on steroids.</p>

<p>SSH into the machine means that you don&#39;t have to share screen and everything works really fast and really awesome.</p>

<p>Also, as you can see in the image, every part of the project is exposed to both sides.</p>

<ul>
	<li>Vim</li>
	<li>Rails Console</li>
	<li>Pipe for running tests</li>
	<li>Spork session</li>
	<li>Rails server</li>
	<li>Guard</li>
	<li>Foreman</li>
</ul>

<p>You can also open new tabs, for example SSH <strong>together</strong> into staging and see something happening in real time.</p>

<p>Both sides have full control and can <em>drive</em> in any given moment, it&#39;s just like typing in Vim on your own machine, it works really well.</p>

<p>Tip: having a dotfiles repository really helps here. this way when you ssh into someone else&#39;s machine you already have all the shortcuts and the muscle memory to just work without issues.</p>

<h3>Real world tools</h3>

<p>So far, I explained about the virtual tools, but real world tools are essential for this all to work.</p>

<h4>Home office or isolated work area</h4>

<p><a href="https://github-camo.global.ssl.fastly.net/969ccb494938045b1b8c58f6df0451f78e01856e/687474703a2f2f662e636c2e6c792f6974656d732f324a306632433270313030733055304c316b31702f496d616765253230323031332e31312e3234253230313125334130322533413239253230414d2e706e67" target="_blank"><img alt="home office" src="https://github-camo.global.ssl.fastly.net/969ccb494938045b1b8c58f6df0451f78e01856e/687474703a2f2f662e636c2e6c792f6974656d732f324a306632433270313030733055304c316b31702f496d616765253230323031332e31312e3234253230313125334130322533413239253230414d2e706e67" style="max-width:100%;" /></a></p>

<p>Working on your dining table is out of the question, it&#39;s too distracting.</p>

<p>In order for remote work to really have the benefits is to have a home office or an isolated work environment.</p>

<p>This way, you can sit and work without distractions or noise.</p>

<p>If also helps to get into the zone. I am writing this post from my standing desk at my home office, while fully clothed to work after showering and getting ready to work like any other normal person in the world, I just work 20 meters from my living room.</p>

<p>Working from your bed in your PJ&#39;s is not what remote work is about, it should be professional and not a game.</p>

<p>I think that most companies that have remote work forbidden have this in mind, employees working in PJ&#39;s while half asleep, or working out of bed, this is not remote work it&#39;s slacking off.</p>

<p>Don&#39;t get me wrong here, working out of a coffee shop for a few hours while working remotely is perfectly fine, do whatever you want to be productive, just be professional.</p>

<h4>Internet, headphones, microphone</h4>

<p>Decent internet connection, really good microphone and headphones are a must.</p>

<p>If I need to talk to you, I need it in good quality without you breaking off, I need you to hear me the first time I say something and be responsive.</p>

<p>It should be just like I am talking to you in person only we can be 5000 miles away.</p>

<p>For example, I have 2 routers, 2 ISP&#39;s and 2 lines, I am never offline for more then 2 minutes.</p>

<p>If one of my routers fail, I just replace it, if one ISP fails, I just have another one already predefined in the router for a fallback.</p>

<p>I also have a backup computer already predefined to work, this might be an overkill for a lot of situation but it&#39;s definitely good use for an older generation Macbook.</p>

<h3>Putting it all together</h3>

<p>When you put it all together you can see that this system is bound to work, if you follow the rules, tools (physical and virtual) remote work is the best thing that can happen to you.</p>
