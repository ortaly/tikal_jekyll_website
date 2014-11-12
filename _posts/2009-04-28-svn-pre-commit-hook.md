---
layout: post
title: svn pre-commit hook
created: 1240915337
author: liya
permalink: /devops/svn-pre-commit-hook
tags:
- DevOps
- subversion
---
<p>It was one of those tasks that you think &quot;i'll finish with it in a couple of hours&quot;, but i found myself dealing with it for more than 2 days...</p>
<p>A customer asked me to help him with a pre-commit hook that will check the existence of the svn:needs-lock property and the commit message - very simple.<br />
We have the message check in our pre-commit hook, and I found a few examples on the net for the svn:needs-lock property check, but all examples just didn't work!<br />
At the end i used svn contrib check-mime-type.pl, and, although i couldn't find the real differences between my previous tries written as bash script or in perl and this one, it worked. </p>
<p>The final hook is attached.</p>
