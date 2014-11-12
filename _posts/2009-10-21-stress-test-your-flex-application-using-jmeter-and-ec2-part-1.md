---
layout: post
title: Stress test your Flex application using Jmeter and EC2 - Part 1
created: 1256160953
author: sefi
permalink: /js/stress-test-your-flex-application-using-jmeter-and-ec2-part-1
tags:
- JS
- Stress test
- JMeter
- flex
- elastic cloud
- cloud computing
- AMI
- Amazon EC2
---
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">A while back, a client needed to stress test his application.<br />
Since I had some experience with <a title="JMeter" target="_blank" href="http://jakarta.apache.org/jmeter/"><span style="color: blue;">JMeter</span></a> before, and was eager to try out Amazon&rsquo;s <a title="EC2" target="_blank" href="http://aws.amazon.com/ec2/"><span style="color: blue;">EC2</span></a> (Elastic Compute Cloud), this was the setup I offered.<br />
Turns out it worked remarkably well.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;"><br />
Detailed explanation and utility files/scripts follows&hellip; <br />
In part 1 we'll discuss Jmeter configuration in detail. <br />
In part 2 we'll go over the configuration procedure of EC2, and how to run the test on a distributed environment.<br />
</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="rteindent1"><i><span style="font-size: 12pt;">* Note: the information below was gathered from a myriad of blogs, forums and hectic googling. Unfortunately, I don&rsquo;t remember what information I got where, so apologies if you read this and think I reaped you off &ndash; please contact me and I&rsquo;ll add the proper credit.</span></i></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<div style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">And now, on with the show!</span></div>
<div style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</div>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 13.5pt;">So, you want to run a Jmeter scenario on cloud computing&hellip;.</span></b></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">First, lets create a Jmeter scenario:</span></b></div>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Download      Jmeter from <u><span style="color: navy;"><a href="http://jakarta.apache.org/jmeter/"><span style="color: blue;">http://jakarta.apache.org/jmeter/</span></a>      </span></u>and unzip it (say <u><span style="color: navy;"><a href="http://flexblackbelt.wordpress.com/jmeter"><span style="color: blue;">c:\jmeter</span></a></span></u>).</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Edit      jmeter executable and modify HEAP variable to whatever you like (-Xms1024m      -Xmx1024m)</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Run      Jmeter by running c:\jmeter\bin\jmeter and you&rsquo;ll see the Jmeter gui with      the basic scenario tree &ndash; TestPlan and Workbench.</span><br />
    &nbsp;</li>
</ol>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">We need to setup Jmeter to be able to record a scenario.</span></b></div>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">We&rsquo;ll use a proxy to record a test plan. </span></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Note, that Jmeter does not support HTTPS. </span><span style="font-size: 12pt;">Since HTTPS is secure, the proxy is unable to decrypt the traffic and record the request parameters or cookies.</span></p>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select &ldquo;test plan&rdquo; on the tree</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Right click on the &ldquo;test plan&rdquo; and add a      new thread group: add -&gt; thread group</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select the thread group</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Right click &ldquo;add -&gt; config element      -&gt; Http Request Defaults&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Protocol &ndash; enter &ldquo;HTTP&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Server name &ndash; enter the host name</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Path &ndash; leave blank</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Port number &ndash; enter &ldquo;80&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Right click on workbench and add the Http      proxy: add -&gt; non-test elements -&gt; Http Proxy Server</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Port field &ndash; Enter &ldquo;9090&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Target Controller &ndash; click on the drop down      and select &ldquo;test plan &gt; thread group&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Click the &ldquo;add&rdquo; button in &ldquo;Patterns to      include&rdquo;. This will create a blank entry.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Enter &ldquo;.*&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">right click the proxy server &rarr; add &rarr; timer      &rarr; gaussian random timer.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">In the constant field enter ${T} and in      the deviation enter a number in millisecs (i.e. 500).</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Click the &ldquo;start&rdquo; button at the bottom</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Start Internet Explorer, but do not close      Jmeter.</span><br />
    &nbsp;</li>
</ol>
<p style="margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><i><span style="font-size: 12pt;">As a general tip, it is a good idea to set the homepage for your browser to a blank page. This way, it reduces the number of unwanted pages Jmeter records during the session. It is a good idea to try the proxy with different sites and get comfortable with&nbsp;different filtering patterns. Also, close all programs like messenger, pidgin etc. that use the same proxy settings as IE, as that will add junk to the scenario.<br />
<br />
</span></i></p>
<ol type="1" start="18">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">From the tool bar, click &ldquo;tools -&gt;      internet options&rdquo;. This should bring up the options.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select the &ldquo;connection&rdquo; tab</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Click &ldquo;lan settings&rdquo; button near the      bottom.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">On the connections tab, check &ldquo;Use a proxy      server for your LAN&rdquo;. The address and port fields should be enabled now.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Address &ndash; enter &ldquo;Localhost&rdquo; or the IP      address of your system</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Port &ndash; enter &ldquo;9090&rdquo;.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Click &ldquo;ok&rdquo; button</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Click &ldquo;ok&rdquo; button again. This should      return you to the browser<br />
    <br />
    </span></li>
</ol>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">You&rsquo;re done with Jmeter and IE setup &ndash; Woohoo!<br />
</span></b></div>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">Now, we&rsquo;ll record the scenario:</span></b></div>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">In the &ldquo;Address&rdquo; bar at the top, enter the      url to record and hit the &ldquo;enter&rdquo; key.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Do the actions you want to be recorded.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Close internet explorer and bring up the      Jmeter window.<br />
    <br />
    </span></li>
</ol>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">You&rsquo;re done with the recording phase! Aren&rsquo;t you happy? <br />
</span></b></p>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">Let&rsquo;s review the test plan</span></b></div>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">To be able to see statistics on the scenario, we&rsquo;ll add some reports.</span></p>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select &ldquo;thread group&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Right click &ldquo;add -&gt; listener -&gt;      aggregate report&rdquo; to add an aggregate listener. The aggregate listener      will show some basic statistics.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select the aggregate report</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">You can configure a filename to specify      where to dump the report data, filter only errors, successes, all or none,      and configure what data is displayed.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select &ldquo;thread group&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Right click &ldquo;add -&gt; listener -&gt; summary      report&rdquo; to add a summary listener. </span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">You can set the same settings as you did      for the aggregate report.<br />
    <br />
    </span></li>
</ol>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="rteindent1"><b><i><span style="font-size: 12pt;">Note</span></i></b><i><span style="font-size: 12pt;">: Some HTTP POST requests chain multiple argument sets with &lsquo;\n&rsquo;. Jmeter misunderstands this and does not play the scenario properly. In this case, you will have to&nbsp;<b>manually</b> edit the resulting scenario JMX file and split those into separate requests.<br />
<br />
</span></i></p>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">Ready&hellip;. Set&hellip;. GO!</span></b></div>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">To run the scenario, select &ldquo;thread group&rdquo;</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Number of threads &ndash; the number of &ldquo;virtual      users&rdquo; Jmeter will emulate. There will be a thread running the scenario      for each virtual user.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Ramp up Period &ndash; the time to wait before      starting a new virtual user.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Loop count &ndash; the number of times to      repeat.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Run &rarr; Start to start running.<br />
    </span></li>
</ol>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">While the test is running, in the upper right-hand corner, there should be a green square.<br />
When the test is done, the box should be gray.<br />
</span></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="rteindent1">&nbsp;</p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="rteindent1"><b><i><span style="font-size: 12pt;">Note: </span></i></b><i><span style="font-size: 12pt;">To launch scenario in a distributed configuration, start each jmeter server as jmeter- server,<br />
and run the managing instance as: jmeter -n -t &lt;scenario.jmx&gt; -l &lt;log.jtl&gt; -RserverInstance1,serverInstance2&hellip; &amp;</span></i></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="MsoNormal">&nbsp;</p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;" class="MsoNormal"><b><span style="font-size: 12pt; font-family: &quot;Garamond&quot;,&quot;serif&quot;;">What&rsquo;s next in <a href="http://www.tikalk.com/flex/stress-test-your-flex-application-using-jmeter-and-ec2-part-2">Part 2</a>: Setting up Amazon EC2.</span></b><span style="font-size: 12pt; font-family: &quot;Times New Roman&quot;,&quot;serif&quot;;"><o:p></o:p></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
