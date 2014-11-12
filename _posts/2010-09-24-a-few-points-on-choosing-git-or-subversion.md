---
layout: post
title: A few points on choosing Git or Subversion
created: 1285337533
author: ittayd
permalink: /devops/few-points-choosing-git-or-subversion
tags:
- DevOps
- git subversion
- scm
---
<p class="MsoNormal">In this post I try to give a few criteria to help choosing between Subversion and Git:</p>
<ul type="disc" style="margin-top: 0cm;">
    <li style="" class="MsoNormal"><b>Complexity </b>&ndash; Subversion      is built for simplicity. This means it is simple to understand and the      simple actions such as checkout, update, commit are easy. However, it also      means the advanced actions like merge, cherry picking, splitting or      merging commits and rebase (linearly adding work from one branch on top of      another) are trickier.<br />
    <ul type="circle" style="margin-top: 0cm;">
        <li style="" class="MsoNormal">If you intend to have a       very simple use of SCM, Subversion is better. If on the other hand you       plan on a complex branch model or other advanced uses, Git is better.</li>
    </ul>
    </li>
    <li style="" class="MsoNormal"><b>Toolchain Support &ndash; </b>Subversion      has better support for viewers, servers, IDE integration and works better      on Windows.<br />
    <ul type="circle" style="margin-top: 0cm;">
        <li style="" class="MsoNormal">If developers are averse       to working on the command line, Subversion is better.</li>
    </ul>
    </li>
    <li style="" class="MsoNormal"><b>Multisite </b>&ndash; amongst      other things, Git is very good at cloning and updating repositories (in      fact, each developer will have its own repository copy). When working in      different areas, each can have a local &ldquo;main&rdquo; repository and synchronize      between them<br />
    <ul type="circle" style="margin-top: 0cm;">
        <li style="" class="MsoNormal">If development is across several       sites, Git is better.</li>
    </ul>
    </li>
    <li style="" class="MsoNormal"><b>Offline work </b>&ndash; In Git,      each developer has a copy of the entire repository. This means the      developer has all the features of a VCS even when working without a      connection to the main repository.<br />
    <ul type="circle" style="margin-top: 0cm;">
        <li style="" class="MsoNormal">If developers work       offline (e.g., travel to clients a lot), then Git is better</li>
    </ul>
    </li>
    <li style="" class="MsoNormal"><b>Backup &ndash; </b>In      Subversion, to commit temporary work a developer needs to maintain a      branch.<span style="">&nbsp; </span>Which means work is      cumbersome and therefore developers avoid it. This means a developer can      have a week&rsquo;s worth of work on his computer with no backup. In Git, each      developer can have a clone of the main repository on the server and push      changes there. It is then easy to backup all these repositories (they are just      folders)</li>
</ul>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b>Summary: </b>Subversion will keep simple scenarios easy. Git on the other hand offers better support for complex usages, multisite and offline work at the cost of making works a (bit) more complex</p>
<p class="MsoNormal">&nbsp;</p>
<p>What are your thoughts on factors that influence the choice of Git or Subversion?</p>
