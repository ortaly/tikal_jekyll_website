---
layout: post
title: project specific settings using zshell and dotfiles
created: 1344161388
author: avit
permalink: /ruby/project-specific-settings-using-zshell-and-dotfiles
tags:
- Ruby
---
<p>I have been working with ZHell pretty much since the first day that I have been using a Mac.</p>

<p>The use I make of to grew with time and definitely the biggest switch was that I moved to using dotfiles for settings in a single location.</p>

<p>I forked <a href="http://zachholman.com/">Zach Holman</a> dot files <a href="http://github.com/kensodev/dotfiles">here</a>, and I have been adjusting and customizing it ever since.</p>

<p>I am using Ruby/Rails for my everyday work, both for consulting and open source projects, the one thing that I see people do and I don’t like is committing configuration files with password and sensitive information into source control.</p>

<p>When I can, I try to avoid it, so I developed a very easy way to manage my per-project environment variable without going through a huge file.</p>

<p>All of my zsh files are located in a single folder in my dotfiles.</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
<span class='line-number'>3</span>
<span class='line-number'>4</span>
<span class='line-number'>5</span>
<span class='line-number'>6</span>
<span class='line-number'>7</span>
<span class='line-number'>8</span>
<span class='line-number'>9</span>
<span class='line-number'>10</span>
<span class='line-number'>11</span>
<span class='line-number'>12</span>
<span class='line-number'>13</span>
<span class='line-number'>14</span>
<span class='line-number'>15</span>
<span class='line-number'>16</span>
<span class='line-number'>17</span>
<span class='line-number'>18</span>
<span class='line-number'>19</span>
<span class='line-number'>20</span>
<span class='line-number'>21</span>
<span class='line-number'>22</span>
<span class='line-number'>23</span>
<span class='line-number'>24</span>
<span class='line-number'>25</span>
<span class='line-number'>26</span>
<span class='line-number'>27</span>
<span class='line-number'>28</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>├── aliases.zsh
</span><span class='line'>├── completion.zsh
</span><span class='line'>├── config.zsh
</span><span class='line'>├── functions
</span><span class='line'>│   ├── _boom
</span><span class='line'>│   ├── _brew
</span><span class='line'>│   ├── _c
</span><span class='line'>│   ├── _git-rm
</span><span class='line'>│   ├── _h
</span><span class='line'>│   ├── _rake
</span><span class='line'>│   ├── c
</span><span class='line'>│   ├── gf
</span><span class='line'>│   ├── gitdays
</span><span class='line'>│   ├── h
</span><span class='line'>│   ├── last_modified
</span><span class='line'>│   ├── newtab
</span><span class='line'>│   ├── savepath
</span><span class='line'>│   ├── smartextract
</span><span class='line'>│   ├── start_project
</span><span class='line'>│   ├── verbose_completion
</span><span class='line'>│   └── zgitinit
</span><span class='line'>├── hidden_aliases.zsh
</span><span class='line'>├── projects
</span><span class='line'>│   ├── boto_project.zsh
</span><span class='line'>│   └── octopus_project.zsh
</span><span class='line'>├── prompt.zsh
</span><span class='line'>├── window.zsh
</span><span class='line'>└── zshrc.symlink</span></code></pre></td></tr></table></div></figure>


<p>As you can see, there’s a special folder there called <code>projects</code>, in which I put a lll of my project specific setting like tokens, passwords and other things.</p>

<p>For example, here’s what a project file might look like:</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
</pre></td><td class='code'><pre><code class='bash'><span class='line'><span class="nb">export </span><span class="nv">OCTOPUS_POSTGRES_USER</span><span class="o">=</span>postgres
</span><span class='line'><span class="nb">export </span><span class="nv">OCTOPUS_POSTGRES_PASSWORD</span><span class="o">=</span>some_password
</span></code></pre></td></tr></table></div></figure>


<p>One thing that is very easy to forget, is that if you open source your dot files (and you should) don’t forget to ignore those files and don’t commit them.</p>
