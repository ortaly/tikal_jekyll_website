---
layout: post
title: Upgrade Git Jenkins plugin to 2.2.7
created: 1413290331
author: liya
permalink: upgrade-git-jenkins-plugin-to-2-2-7
tags:
- DevOps
- git jenkins
---
<p>We have a job in Jenkins that clones git repo using HTTP, and one of the steps runs git command for the same repository.</p>

<p>After upgrading Git Jenkins plugin to latest 2.2.7, the command line step fails with error:</p>

<p><em>fatal: could not read Username for &#39;http://xxx&#39;: No such device or address</em></p>

<p>When trying to run the same command from command line, git actually asks for usename.</p>

<p>On Linux you can use the &#39;cache&#39; authentication helper that is bundled with Git 1.7.9 and higher. From the Git documentation:</p>

<p class="rteindent1">This command caches credentials in memory for use by future git programs. The stored credentials never touch the disk, and are forgotten after a configurable timeout. The cache is accessible over a Unix domain socket, restricted to the current user by filesystem permissions.</p>

<p>Run the command below to enable credential caching. After enabling credential caching any time you enter your password it will be cached for 1 hour (3600 seconds):</p>

<div class="container" title="Hint: double-click to select code">
<div class="line number1 index0 alt2"><code class="java plain">git config --global credential.helper </code><code class="java string">&#39;cache --timeout 3600&#39;</code></div>
</div>

<p>&nbsp;</p>

<p>&nbsp;</p>
