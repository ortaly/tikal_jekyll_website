---
layout: post
title: How to create a remote branch in git
created: 1288550597
author: shalom
permalink: /devops/how-create-remote-branch-git
tags:
- DevOps
- git branch
---
<p>Git branching model and capabilities is certainly one of git's powers, but like many things in git I often find my self in a situation where I know what I want to do and I kind of know which git commands I will probably want to use but exactly how to do it sometimes remains a mystery. And like most things in git you can do a task in many different ways.</p>
<p>lets take this simple use case and I will show here my way of doing it:</p>
<p>You have a repository with a master branch and you want to create a new branch based on master, you want to push the new branch to your remote repository and have other people collaborate with it. you want your git push/pull command to be short without having to specify your local branch and remote refs.</p>
<p>&nbsp;</p>
<p>I find 'git branch -av&quot; to be very helpfull when working with branches, it show you what your repository looks like and which branch you are currently on. I have a shortcut for it that I created with:</p>
<pre class="brush: python;" title="code">
git config --global alias.bav &quot;branch -av&quot;</pre>
<p>And this is the output of my `git bav` which says I'm on the master branch:</p>
<p>&nbsp;</p>
<p>* master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; remotes/origin/master 5583f06 init<br />
&nbsp;</p>
<p>now create a remote branch called 'exp' based on master:</p>
<pre title="code" class="brush: python;">
git push origin master:refs/heads/exp</pre>
<p>&nbsp;</p>
<p>`git bav` will show us that we now have a remote branch called 'exp' but still no local branch to work on:</p>
<p>&nbsp;</p>
<p>* master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; remotes/origin/exp&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; remotes/origin/master 5583f06 init<br />
&nbsp;</p>
<p>You will also see this new branch in your remote repository UI, we use gitorious.</p>
<p>run `git fetch origin` once to make sure everything is up to date.</p>
<p>&nbsp;</p>
<p>And now create a local branch to track the remote branch exp:</p>
<pre title="code" class="brush: python;">
git branch --track exp origin/exp
git checkout exp
</pre>
<p>This can be combined into one command as:</p>
<pre title="code" class="brush: python;">
git checkout --track -b exp origin/exp</pre>
<p>&nbsp;</p>
<p>`git bav` output now shows that we're on the local branch exp:</p>
<p>&nbsp;</p>
<p>* exp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; remotes/origin/exp&nbsp;&nbsp;&nbsp; 5583f06 init<br />
&nbsp; remotes/origin/master 5583f06 init<br />
&nbsp;</p>
<p>Actually thats it, you can now push and pull with simple `git push` and `git pull` commands.</p>
<p>&nbsp;</p>
<p>a collaborator to your work can now clone the repository, or if they already have a local clone they can just run `git fetch` to synch the local repository with the remote. They will now have to create their local branch to work on with this simple command:</p>
<pre title="code" class="brush: python;">
git checkout -b exp origin/exp</pre>
<p>which creates a local branch named 'exp' that tracks the remote origin/exp and switches to it. they now can also push and pull with simple `git push` and `git pull` commands.</p>
<p>&nbsp;</p>
<p>I find it better to name local branches as the remote names, if you wish to use different names for your local branches then some of the commands syntax may be different. I usually don't see a reason for that.</p>
<p>&nbsp;</p>
<p>(just to mention: I used git version 1.7.1)</p>
<p>&nbsp;</p>
<p>You can try and check the <a href="http://github.com/webmat/git_remote_branch">git_remote_branch</a> tool, I didn't, I usually like to walk the hard way. but I maybe will review it when I have a few minutes.</p>
<p>&nbsp;</p>
<p>Enjoy.</p>
