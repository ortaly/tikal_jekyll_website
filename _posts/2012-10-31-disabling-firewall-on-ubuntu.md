---
layout: post
title: Disabling firewall on ubuntu
created: 1351669173
author: yorammi
permalink: /devops/disabling-firewall-ubuntu
tags:
- DevOps
- ubuntu
- firewall
---
<p>By default the firewall is turned 'on' on ubuntu server.</p>
<p>When you're inside a corporate network which is already under a corporate-firewall this service is not needed and even can cause problems accessing services that are on the ubuntu server (such as ssh, jenkins and more).</p>
<p>For disabling the firewall on the ubuntu server, run the following command:</p>
<p><strong>sudo ufw disable</strong></p>
<p>&nbsp;</p>
<p>In order to turn it on when required, run: sudo utw enable</p>
<p>&nbsp;</p>
