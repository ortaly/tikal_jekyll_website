---
layout: post
title: ubuntu ssl vpn
created: 1329231105
author: chaim.turkel
permalink: /java/blog/ubuntu-ssl-vpn
tags:
- JAVA
- ubuntu
- ssl
---
<p>I don&#39;t know how many people use a ssl vpn to connect to work over ubuntu.</p>
<p>All i can say is that it is not fun.</p>
<p>The latest version of ubuntu has removed java from its repository, and this has caused a lot of problems.</p>
<p>&nbsp;</p>
<p>After working at it for a few hours i managed to fix it, i hope my experience will help others.</p>
<p>&nbsp;</p>
<p>First step, check how may versions of java you have on your machine:</p>
<p>update-java-alternatives -l</p>
<p>&nbsp;</p>
<p>If you have more that one row, you are not in a good state.</p>
<p>(if for some reason you need more than one version you can use the following command to choose the default:</p>
<p>sudo update-alternatives --config java)</p>
<p>&nbsp;</p>
<p>I have three rows. So the first thing i did was to remove as much as possible.</p>
<p>Try some of the following statements to see if it removes your versions:</p>
<p>sudo apt-get remove openjdk-6-jre default-jre default-jre-headless</p>
<p>sudo apt-get remove sun-java6-jre sun-java6-plugin sun-java6-fonts</p>
<p>&nbsp;</p>
<p>if this does not work try using the synaptic package manager to remove all java components.</p>
<p>Once this is finished, you want to reinstall one version only:</p>
<p>sudo apt-get install sun-java6-jre sun-java6-plugin sun-java6-fonts</p>
<p>&nbsp;</p>
<p>if you are using maven or other development tools don&#39;t forget:</p>
<p>sudo apt-get install sun-java6-jdk</p>
<p>&nbsp;</p>
<p>Chaim Turkel</p>
