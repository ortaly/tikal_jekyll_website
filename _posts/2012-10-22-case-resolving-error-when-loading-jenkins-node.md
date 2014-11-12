---
layout: post
title: 'Case resolving: error when loading jenkins node'
created: 1350905557
author: yorammi
permalink: /devops/case-resolving-error-when-loading-jenkins-node
tags:
- DevOps
- Mac
- jenkins
---
<p>&nbsp;<u><span class="s1"><b>Case description</b></span></u>:</p>
<p class="p1">While trying to load a new Mac jenkins node, we're getting the following exception:</p>
<p class="p2"><span style="color: rgb(153, 51, 0); "><em>The server doesn't support the password authentication</em></span></p>
<p class="p3">&nbsp;</p>
<p class="p1"><u><span class="s1"><b>Solution</b></span></u>:</p>
<p class="p1">- Run: <strong>sudo vi /etc/sshd_config</strong></p>
<p class="p1">- Enable this line (add it if needed):&nbsp;<strong>PasswordAuthentication yes</strong></p>
<p class="p1">- Restart the <strong>sshd</strong> service (<em>sudo SystemStarter start sshd</em>)</p>
<p class="p1">&nbsp;</p>
<p class="p1">&nbsp;</p>
<p class="p1">&nbsp;</p>
<p class="p1">&nbsp;</p>
<p>&nbsp;</p>
