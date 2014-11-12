---
layout: post
title: 'Case resolving: ubuntu cannot reach internet'
created: 1351668196
author: yorammi
permalink: /devops/case-resolving-ubuntu-cannot-reach-internet
tags:
- DevOps
- ubuntu network
---
<p><u><strong>Case description</strong></u>:&nbsp;</p>
<p>Ubuntu server cannot reach the internet - getting &quot;<span style="background-color: rgb(245, 245, 245); color: rgb(24, 24, 24); font-family: verdana, arial, helvetica, sans-serif; font-size: 13px; line-height: normal; ">Network is unreachable</span>&quot; error for any action that requires internet access.</p>
<p>&nbsp;</p>
<p><u><strong>Problem &amp;&nbsp;</strong></u><u><strong>solution</strong></u>:&nbsp;</p>
<p>in the /etc/network/interfaces file there were 2 missing lines in the eth0 configuration - the 'network' and the 'gateway' lines.</p>
<p>For example (the 2 missing lines in <strong>bold</strong>):</p>
<p>auto eth0﻿</p>
<p>iface eth0 inet static</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; address 192.168.x.11</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; netmask 255.255.255.0</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; <strong>network 192.168.x.0</strong></p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; broadcast 192.168.x.255</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; <strong>gateway 192.168.x.1</strong></p>
<p>&nbsp;</p>
<p>After editing the file (e.g. sudo vi /etc/network/interfaces), you should restart the network service (<span style="color: rgb(0, 0, 0); font-family: verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; font-size: 13px; line-height: normal; ">sudo /etc/init.d/networking restart)</span></p>
<p>&nbsp;</p>
