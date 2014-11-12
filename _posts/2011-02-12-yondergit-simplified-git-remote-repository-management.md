---
layout: post
title: 'YonderGit: Simplified Git Remote Repository Management'
created: 1297527857
author: shalom
permalink: /devops/yondergit-simplified-git-remote-repository-management
tags:
- DevOps
- git remote
---
<p><a href="http://jeetworks.org/yondergit">YonderGit</a> aims to simplify some of the common remote git management worflows.</p>
<p>&nbsp;</p>
<p>for example: lets say you have a local git repository and you want to start sharing your work with others through a remote git repository, you'll need ssh access and a user on the remote machine.</p>
<p>if you don't want to keep typing the remote password you can add your ssh public key to the authorized_keys of the remote user:</p>
<p><strong><em>cat ~/.ssh/id_rsa.pub | ssh remoteuser@remotehost 'cd; test -d .ssh || mkdir .ssh &amp;&amp; chmod 700 .ssh; cd .ssh; cat &gt;&gt; authorized_keys; chmod 600 authorized_keys'</em></strong></p>
<p><span style="font-size: smaller;">(without the authorized_keys YonderGit will ask for the remote password a few times, and when it was my first ssh login to the remotehost, before it's ip was added to my local known_hosts file, YonderGit failed.., so you may need to ssh login at least once before using YonderGit)</span></p>
<p>&nbsp;</p>
<p>You can use 'git remote -v' to see which remote repositories you already have.</p>
<p>make sure the remote folder you want as root of your git repos exists:</p>
<p><strong><em>ssh remoteuser@remotehost 'cd; test -d gitrepos || mkdir gitrepos'</em></strong></p>
<p>&nbsp;</p>
<p>run this command from the root of your local repository to create a remote repository and add it as remote to your local repository:</p>
<p><strong><em>ygit.py setup origin ssh://</em></strong><strong><em>remoteuser@remotehost</em></strong><strong><em>/~/gitrepos/testrep.git</em></strong></p>
<p>origin can be any name you choose, testrep.git also.</p>
<p>&nbsp;</p>
<p>now push you content to the remote repository with:</p>
<p><strong><em>git push origin master</em></strong></p>
<p>from now on you have to do 'git push origin master' and 'git pull origin master', to simplify those to 'git pull' and 'git push' you have to setup the default remote refs of your local master branch:</p>
<p><strong><em>git config branch.master.remote origin<br />
git config branch.master.merge refs/heads/master</em></strong></p>
<p>&nbsp;</p>
<p>now anyone with ssh access to remotehost can clone your repo and collaborate:</p>
<p><em><strong>git clone </strong></em><strong><em>remoteuser@remotehost</em></strong><em><strong>:/home/remoteuser/</strong></em><strong><em>gitrepos</em></strong><em><strong>/testrep.git</strong></em></p>
<p>&nbsp;</p>
<p>I think YonderGit is a nice tool that can help bring git to more people who don't have time to learn all the little git commands.</p>
<p>YonderGit: http://jeetworks.org/yondergit</p>
<p>&nbsp;</p>
