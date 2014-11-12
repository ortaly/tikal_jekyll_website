---
layout: post
title: Git export (like SVN export)
created: 1338394544
author: avit
permalink: /git-export-svn-export
tags:
- Ruby
- web
---
<p>I have been working with git for a while now on my <a href='http://www.kensodev.com/2011/09/16/kill-all-resque-workers-with-a-single-command/' title='Ruby on Rails'>Ruby on Rails</a> projects and client side (css, Html and <a href='http://www.kensodev.com/tag/javascript/' title='JavaScript'>JavaScript</a>) projects. I haven’t moved completely in <a href='http://www.kensodev.com/category/flex/' title='Flex'>flex</a> projects and other projects, but I do plan to in the near future, mainly because of the reason that you can integrate <a href='http://www.kensodev.com/tag/git/' title='GIT'>GIT</a> into flash builder 4. But, that is not the point.</p>

<p>This week I was working with a company on a client side project. I had to email them the files every time and the .git folders inside the project were heavy and unnecessary.</p>

<p>If you worked with SVN, you probably know the export command, after searching for a bit in git help I found how you can do it in git with ease.</p>
<strong>How to do?</strong>
<p>This is the command you should use:</p>
<div class='highlight'><pre><code class='bash'>git checkout-index -a -f --prefix<span class='o'>=</span>/path/to/your/folder/
</code></pre>
</div>
<p>The ending forward slash is very important! Do not forget to use it please.</p>

<p>A screenshot of my shell:</p>
<a href='http://www.kensodev.com/2010/06/09/git-export-like-svn-export/screen-shot-2010-06-09-at-7-13-54-pm/' rel='attachment wp-att-468'><img alt='' class='aligncenter size-medium wp-image-468' height='182' src='http://www.kensodev.com/wp-content/uploads/2010/06/Screen-shot-2010-06-09-at-7.13.54-PM-300x182.png' title='Git export to folder (shell)' width='300' /></a>
<p>Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/TmSqN1EiTc8" height="1" width="1"/>
