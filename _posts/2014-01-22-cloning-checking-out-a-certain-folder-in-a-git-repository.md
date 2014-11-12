---
layout: post
title: Cloning / checking out a certain folder in a GIT repository
created: 1390382633
author: gil
permalink: cloning-checking-out-a-certain-folder-in-a-git-repository
tags:
- DevOps
- git gitweb apache
---
<p>Moving from SVN to GIT comes with&nbsp;many advantages. One of the disadvantages I, personaly, have encountered is the fact that you cannot clone a single file or folder in a repository.</p>

<p>Googling to find a decent solution brought me to the following interesting set of commands that actually does that:</p>

<p>From you working copy folder, run:&nbsp;<strong>git clone &lt;repo-url&gt; --depth 1 --bare</strong></p>

<p>Now, checkout the subfolder into a new workspace: <strong>git --work-tree=/path/to/checkout checkout HEAD -- sub/directory</strong></p>

<p>&nbsp;</p>
