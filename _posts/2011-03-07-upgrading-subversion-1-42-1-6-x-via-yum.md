---
layout: post
title: Upgrading subversion 1.42 => 1.6.x via yum
created: 1299477044
author: hagzag
permalink: /devops/upgrading-subversion-142-16x-yum
tags:
- DevOps
- subversion
- Centos
---
<p>Well, the only rpm repository out there offering subversion above 1.4.x was / is <a href="http://apt.sw.be/">rpmforge</a> (aka DAG).</p>
<p>In order to add rpmforge to your RedHat / CentOs repository one has to update their yum repositories by installing the rpmforge-release package which you can also find @: <a href="http://packages.sw.be/rpmforge-release/">http://packages.sw.be/rpmforge-release/</a></p>
<p>&nbsp;</p>
<p>The problem I encountered was, I had a Centos 5.5 x86_64 with subversion &amp; mod_dav_svn 1.4.2, after updating to the latest rpmforge-release, I expected a&nbsp;</p>
<pre class="brush: java;" title="code">
yum update subversion mod_dav_svn</pre>
<p>to do the trick for me well no ...</p>
<p>So after banging my head on my keyboard after trying to manually downloading the rpms (which are there by the way!), and still faling on dependencies.</p>
<p>&nbsp;</p>
<p>Reading all I could online in order to solve this issue I stunbledupon:</p>
<blockquote>
<p>&nbsp;</p>
<p class="line874">The default RPMforge repository does not replace any  CentOS base packages. In the past it used to, but those packages are now  in a separate repository (rpmforge-extras) which is disabled by  default.</p>
You can find a complete listing of the RPMforge package packages at <a class="http" href="http://packages.sw.be/">http://packages.sw.be/</a></blockquote>
<p class="line862">&nbsp;</p>
<p>Now considering the fact I am running CentOs 5.x I presumed following the CentOs 6.x shouldnt apply there. But I chose to give it a try anyway. I observed the yum.repos.d/rpmforge-mirrorlist file and spotted &quot;rpmforge-extras&quot; which is a repository I was somehow skipping ...</p>
<p>So I edited the /etc/yum.repos.d/rpmforge.repo file and addedd the following snippet:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
[rpmforge-extras]

name = rpmforge-extras
baseurl = http://apt.sw.be/redhat/el5/en/$basearch/extras
enabled = 1
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1
priority=1</pre>
<p>&nbsp;</p>
<p>Ran yum update and&nbsp;</p>
<pre class="brush: java;" title="code">
yum update subversion</pre>
<p>and still no luck ..., the fuzzy thing was that even whilst running:</p>
<pre class="brush: java;" title="code">
yum list available | grep subversion</pre>
<p>came up with nothing ...</p>
<p>&nbsp;</p>
<p>I set my mind on performing this upgrade wven if I need to compile it from source (but I prefereed not to) so the last resort before compiling was to remove subversion completely and try my luck - which was exattly what did the trick:</p>
<pre class="brush: java;" title="code">
rpm -e subversion</pre>
<p>and</p>
<pre class="brush: java;" title="code">
rpm -e mod_dav_svn</pre>
<p>removed my subversoin 1.4.2 pack</p>
<p>then executed:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
yum install subversion mod_dav_svn</pre>
<p>and walla I got subversion-1.6.15 - amazing and completely voodoo if you ask me :)</p>
<p>&nbsp;</p>
<p>Hope you find this useful.</p>
