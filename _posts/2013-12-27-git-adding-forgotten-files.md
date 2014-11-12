---
layout: post
title: Git - adding forgotten files
created: 1388130594
author: hagzag
permalink: git-adding-forgotten-files
tags:
- DevOps
---
<p>How many time have you commited somthing to git and forgot to add a file (or two ...), if this was perfoece / subverison / other,&nbsp;your screwed :) with git all you need to do is:</p>

<p><span style="white-space: pre-wrap; background-color: rgb(247, 247, 247); color: rgb(34, 34, 34); font-family: 'Courier 10 Pitch', Courier, monospace; font-size: 15px; line-height: 21px; font-style: italic;">git commit --amend &ndash;C HEAD</span></p>

<p>This instructs git too add any indexed files to the commit + the &#39;-C&#39; reuses your previous commit message - no need to re-type it !</p>

<p>Please note: this works nicely before you push to a remote, if you already pushed the &quot;missing&nbsp; files&quot; commit to your remote master you will have to pull &amp; merge which makes the 1 commit ( &quot;missing files&quot; commit) into 3 which kind of takes the point out of doing this ... so make sure you use this technique wisely.&nbsp;</p>

<p><span style="line-height: 1.6em;">Have I told you lately how git is awesome :)</span></p>
