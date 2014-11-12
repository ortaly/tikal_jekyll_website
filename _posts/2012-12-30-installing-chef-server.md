---
layout: post
title: Installing Chef Server
created: 1356857354
author: hagzag
permalink: /devops/installing-chef-server
tags:
- DevOps
- ubuntu
- opscode chef
- CM
- Chef
- centos 6
- centos 5
---
<p>Following the Fuse day (#6) and the very poor documentation and the amount of bugs found in the Chef Solo cookbooks for the Chef OSS server, I put together a set of script which will attempt to clear all the clutter around installing a Cehf OSS server.</p>
<p>&nbsp;</p>
<p>There is a <a href="https://github.com/tikalk/chef-server-install">Git repository on git hub</a> which will install Chef Server on CentOS 5.8 &amp; 6 and I will be adding support for Ubuntu in the near future (its in the works), there is no magic here just a fair amount of trial and error which led me to automate it - it just was too much time to do manually over and over again ...</p>
<p>&nbsp;</p>
<p>During my attempt I was planning on using Chef-Solo to do the work based on <a href="http://wiki.opscode.com/display/chef/Installing+Chef+Server+using+Chef+Solo">this wiki page</a>&nbsp;but there were so many bugs in it which led me to user rble repository.</p>
<p>&nbsp;</p>
<p>So what this script does ?</p>
<ol>
    <li>It requires you to be root</li>
    <li>It will add the required repositories</li>
    <li>Install ruby via rvm (my personal preference)</li>
    <li>Install chef server via rpm</li>
</ol>
<p>see: <a href="https://github.com/tikalk/chef-server-install">https://github.com/tikalk/chef-server-install</a></p>
<p>&nbsp;</p>
<p>Enjoy, and I would like to here your feedback.</p>
<p>&nbsp;</p>
<p>For the brave guys who do not want to read and just do it ... (it takes ~30 minuets depending on your internet connection)</p>
<p>&nbsp;</p>
<div class="rteindent1"><strong><em>git clone </em></strong><b><i>https://github.com/tikalk/chef-server-install.git</i></b></div>
<div class="rteindent1"><strong><em>cd ./chef-server-install &amp;&amp; setup.sh all</em></strong></div>
<blockquote class="rteindent1"></blockquote>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1"><strong>&nbsp;</strong></p>
