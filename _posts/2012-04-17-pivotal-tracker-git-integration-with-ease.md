---
layout: post
title: Pivotal Tracker Git integration with ease
created: 1334663203
author: avit
permalink: /pivotal-tracker-git-integration-ease
tags:
- Ruby
- web
---
<p>This post makes 2 assumptions</p>
<ol>
<li>You are working with Git</li>
<li>You are working with <a href="http://pivotaltracker.com" target="_blank">Pivotal Tracker</a></li>
</ol>
<p>At <a href="http://www.gogobot.com" target="_blank">Gogobot</a>, we work with Pivotal Tracker (for various reasons).</p>
<p>Pivotal Tracker has very good Git integration, when you commit (and push), the commits can show up as comments to the story.</p>
<p>Another very good thing is that you can change the status of a story just by a commit, you can finish, deliver or anything else you might want.</p>
<p>Usually, you need to add the story id (#12123123) to the commit message yourself, obviously, I never remember to do that.</p>
<p>So, the link in the bottom is a gem that integrates git with Pivotal Tracker very easily and effortlessly.</p>
<p><a href="https://github.com/highgroove/git_tracker">highgroove/git_tracker</a>.</p>
<p>It has a very good README so keep on reading there.</p>
