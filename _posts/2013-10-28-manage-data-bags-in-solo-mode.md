---
layout: post
title: Manage Data Bags in Solo Mode
created: 1382945525
author: hagzag
permalink: manage-data-bags-in-solo-mode
tags:
- Chef
- opscode chef
- DevOps
- data bags
---
<p>For the past ~6 monthes or so I have been working solely with&nbsp;chef-solo. There are quite a few helpers for solo out there such as:</p>

<ol>
	<li>soloist &ndash;&nbsp;<a href="https://github.com/mkocher/soloist">https://github.com/mkocher/soloist</a></li>
	<li>knife-solo &ndash;&nbsp;<a href="https://github.com/matschaffer/knife-solo">https://github.com/matschaffer/knife-solo</a>&nbsp;&amp; a few more.</li>
</ol>

<p>What kept annoying me for some time is I couldn&rsquo;t manage databas with knife whilst working in solo mode &hellip; ARRRRRRGH!!!</p>

<p>It looked somthing like:</p>

<pre>
[oper@sandbox chef_repo]$ knife data bag create admins ERROR: The object you are looking for could not be found Response: &lt;!DOCTYPE HTML PUBLIC &quot;-//IETF//DTD HTML 2.0//EN&quot;&gt; &lt;html&gt;&lt;head&gt; &lt;title&gt;404 Not Found&lt;/title&gt; &lt;/head&gt;&lt;body&gt; &lt;h1&gt;Not Found&lt;/h1&gt; &lt;p&gt;The requested URL /data was not found on this server.&lt;/p&gt; &lt;hr&gt; &lt;address&gt;Apache/2.2.15 (CentOS) Server at : Port 80&lt;/address&gt; &lt;/body&gt;&lt;/html&gt;</pre>

<p>Then came&nbsp;<a href="https://github.com/thbishop/knife-solo_data_bag">knife-solo_data_bag</a>&nbsp;I am quite embaressed to say ;) I haven&rsquo;t found this sooner.</p>

<p>Now with a totally bogus knife.rb file I can generate / edit / manager databags with knife-solo &amp; knife-solo_data_bag.</p>

<p>Again, hope you find this useful, I know I do ;)</p>

<p>HP</p>
