---
layout: post
title: 'SVN log poor performance because of the "big" revisions '
created: 1276623525
author: liya
permalink: /devops/svn-log-poor-performance-because-big-revisions
tags:
- DevOps
- svn
---
<p>We have experienced a very poor performance of the svn log command on the new repository that had only a few revisions.</p>
<p>It took <strong>more than a minute</strong><strong>(!)</strong> to get history that had only one revision - the initial import.</p>
<p>While blaming the server configuration and network security, we didn't find anything unusual that could affect the svn performance so much.</p>
<p>&nbsp;</p>
<p>The reason was much simpler - initial import of the full project tree had more than 32,000 files, and it turned out to be too much for one revision.</p>
<p>Breaking the initial import into several commits solved the problem completely.</p>
<p>If you have a big project to import, instead of running</p>
<p><em>svn import myproject  file:///opt/opencm/svnroot/trunk/myproject -m &quot;Initial import&quot; <br />
</em></p>
<p>&nbsp;</p>
<p>write a short script to import smaller parts, like:</p>
<p><em>cd myproject</em></p>
<p><em>svn import agent file:///opt/opencm/svnroot/trunk/myproject/agent -m  &quot;Initial import&quot; <br />
</em></p>
<p><em>svn import server file:///opt/opencm/svnroot/trunk/myproject/server  -m  &quot;Initial import&quot; <br />
</em></p>
<p><em>cd utils</em></p>
<p><em>svn import xxx file:///opt/opencm/svnroot/trunk/myproject/utils/xxx  -m  &quot;Initial import&quot; <br />
</em></p>
<p><em>svn import yyy file:///opt/opencm/svnroot/trunk/myproject/utils/yyy   -m  &quot;Initial import&quot; <br />
</em></p>
<p><em>...</em></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
