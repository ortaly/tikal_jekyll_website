---
layout: post
title: Making Nokogiri install again on Mountain Lion
created: 1344862401
author: avit
permalink: /ruby/making-nokogiri-install-again-mountain-lion
tags:
- Ruby
---
<p>As probably any geek out there, I upgraded my OS to Apple Mountain Lion.</p>

<p>The upgrade created a lot of problems for me, I basically had to reinstall almost everything, from MySql to homebrew.</p>

<p>I am not sure if everyone experienced the same thing, but that was the case for me.</p>

<p>One of the problems I encountered was that I could not install Nokogiri anymore on my machine, bundler would not install it and complain about dependencies not being installed (specifically <code>libxml</code>)</p>

<p>To fix it, you need to reinstall Ruby using RVM with livxml properly linked.</p>

<p>First, install <code>libxml</code> and <code>libxslt</code> through homebrew, like so:</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>brew install libxml2 libxslt
</span><span class='line'>brew link libxml2 libxslt</span></code></pre></td></tr></table></div></figure>


<p>If that doesn’t work you probably need to install <code>libiconv</code> like so:</p>

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
</pre></td><td class='code'><pre><code class=''><span class='line'>cd   
</span><span class='line'>mkdir temp
</span><span class='line'>cd temp
</span><span class='line'>ls
</span><span class='line'>wget http://ftp.gnu.org/pub/gnu/libiconv/libiconv-1.13.1.tar.gz
</span><span class='line'>tar xvfz libiconv-1.13.1.tar.gz
</span><span class='line'>cd libiconv-1.13.1
</span><span class='line'>./configure --prefix=/usr/local/Cellar/libiconv/1.13.1
</span><span class='line'>make
</span><span class='line'>sudo make install</span></code></pre></td></tr></table></div></figure>


<p>And then install <code>libxml</code> and <code>libxslt</code> again</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>brew install libxml2 libxslt
</span><span class='line'>brew link libxml2 libxslt</span></code></pre></td></tr></table></div></figure>


<p>Once that’s done without errors, reinstall Ruby.</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>rvm reinstall ruby-1.9.3-p194</span></code></pre></td></tr></table></div></figure>


<p>RVM will figure out those libraries location and properly install Ruby with those linked up.</p>

<p>Enjoy!</p>
