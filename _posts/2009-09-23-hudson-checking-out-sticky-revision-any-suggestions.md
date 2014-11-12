---
layout: post
title: Hudson Checking out "sticky revision" - any suggestions?
created: 1253725357
author: hagzag
permalink: /devops/hudson-checking-out-sticky-revision-any-suggestions
tags:
- DevOps
- Continuous Integration
- Hudson
---
<p>I am facing a simple Hudson Master-Slave configuration task which must of worked in half a dozen installation's of Hudson, where master server machine is Linux and Slave Machine is Windows 2003.</p>
<p>Agent initializes seamlessly as a windows service (one of the cool features of Hudson by the way - since release 1.321).</p>
<p>&nbsp;</p>
<p>I configure a simple &quot;free-style&quot; project which has an svn location it is supposed to checkout from http://... /svn/repos/trunk</p>
<p>The issue is if I checkout the same url and run svn info I get revision # 45943 although when Hudson checked out the project it states &quot;Checked out revision 45902&quot;</p>
<p>I am running on 1.321 version of Hudson, I have reconfigured the Job, cleaned up the workspace on the remote slave and the Master machine - and it still seems to poll an old revision from svn and idea why this could happen?</p>
<p>&nbsp;</p>
<p>Thanks Guys,</p>
