---
layout: post
title: problem with running spec in vim
created: 1344198190
author: avit
permalink: /ruby/problem-running-spec-vim
tags:
- Ruby
---
<p>I have been using Vim for almost a week now.</p>

<p>I am using the <a href="http://github.com/astrails/dotvim">dotvim</a> configuration by <a href="http://astrails.com">Astrails</a>.</p>

<p>All in all, the configuration is awesome and I completely love it, it’s the longest time period I have ever used Vim. Considering that the second place is about 5 minutes, that’s super impressive.</p>

<p>I only have one problem with it.</p>

<p>I took the spec running functions from <a href="https://github.com/garybernhardt">Gary Bernhardt</a> <a href="https://github.com/garybernhardt/dotfiles/">dotfiles</a>, I just remapped the keys differently.</p>

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
<span class='line-number'>29</span>
<span class='line-number'>30</span>
<span class='line-number'>31</span>
<span class='line-number'>32</span>
<span class='line-number'>33</span>
<span class='line-number'>34</span>
<span class='line-number'>35</span>
<span class='line-number'>36</span>
<span class='line-number'>37</span>
<span class='line-number'>38</span>
<span class='line-number'>39</span>
<span class='line-number'>40</span>
<span class='line-number'>41</span>
<span class='line-number'>42</span>
<span class='line-number'>43</span>
<span class='line-number'>44</span>
<span class='line-number'>45</span>
<span class='line-number'>46</span>
<span class='line-number'>47</span>
<span class='line-number'>48</span>
<span class='line-number'>49</span>
<span class='line-number'>50</span>
<span class='line-number'>51</span>
<span class='line-number'>52</span>
<span class='line-number'>53</span>
<span class='line-number'>54</span>
<span class='line-number'>55</span>
<span class='line-number'>56</span>
<span class='line-number'>57</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
</span><span class='line'>" RUNNING TESTS
</span><span class='line'>""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
</span><span class='line'>map <leader>' :call RunTestFile()<cr>
</span><span class='line'>map <leader>; :call RunNearestTest()<cr>
</span><span class='line'>
</span><span class='line'>function! RunTestFile(...)
</span><span class='line'>    if a:0
</span><span class='line'>        let command_suffix = a:1
</span><span class='line'>    else
</span><span class='line'>        let command_suffix = ""
</span><span class='line'>    endif
</span><span class='line'>
</span><span class='line'>    " Run the tests for the previously-marked file.
</span><span class='line'>    let in_test_file = match(expand("%"), '\(.feature\|_spec.rb\)$') != -1
</span><span class='line'>    if in_test_file
</span><span class='line'>        call SetTestFile()
</span><span class='line'>    elseif !exists("t:grb_test_file")
</span><span class='line'>        return
</span><span class='line'>    end
</span><span class='line'>    call RunTests(t:grb_test_file . command_suffix)
</span><span class='line'>endfunction
</span><span class='line'>
</span><span class='line'>function! RunNearestTest()
</span><span class='line'>    let spec_line_number = line('.')
</span><span class='line'>    call RunTestFile(":" . spec_line_number . " -b")
</span><span class='line'>endfunction
</span><span class='line'>
</span><span class='line'>function! SetTestFile()
</span><span class='line'>    " Set the spec file that tests will be run for.
</span><span class='line'>    let t:grb_test_file=@%
</span><span class='line'>endfunction
</span><span class='line'>
</span><span class='line'>function! RunTests(filename)
</span><span class='line'>    " Write the file and run tests for the given filename
</span><span class='line'>    :w
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    :silent !echo;echo;echo;echo;echo;echo;echo;echo;echo;echo
</span><span class='line'>    if match(a:filename, '\.feature$') != -1
</span><span class='line'>        exec ":!script/features " . a:filename
</span><span class='line'>    else
</span><span class='line'>        if filereadable("script/test")
</span><span class='line'>            exec ":!script/test " . a:filename
</span><span class='line'>        elseif filereadable("Gemfile")
</span><span class='line'>            exec ":!bundle exec rspec --color " . a:filename
</span><span class='line'>        else
</span><span class='line'>            exec ":!rspec --color " . a:filename
</span><span class='line'>        end
</span><span class='line'>    end
</span><span class='line'>endfunction
</span><span class='line'>""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
</span><span class='line'>" RUNNING TESTS
</span><span class='line'>""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""</span></code></pre></td></tr></table></div></figure>


<p>As you can see, I mapped <code>,;</code> to run line specs, and <code>,'</code> to run the entire spec file.</p>

<p>The problem is, that the terminal exists immediately after the result, does not wait for me to hit <code>Enter</code> or anything.</p>

<p>You can see the problem demo in this YouTube Video</p>

<iframe width="" height="" src="http://www.youtube.com/embed/gUB48XwNq0M " frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>


<p>I asked this question on StackOverflow <a href="http://stackoverflow.com/questions/11785035/vim-issue-with-running-specs-in-ruby-rspec/11785791#11785791">here</a></p>

<p>Someone suggested it might be a trailing character, but I checked and there’s nothing like that.</p>

<p>The same person suggested to map just <code>ls</code> like so:</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>nmap <leader>ls :!ls<cr></span></code></pre></td></tr></table></div></figure>


<p>But this command does not exit.</p>

<p>Another thing I tried is this
In a vim session I mapped a key like this</p>

<figure class='code'><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class=''><span class='line'>map <Leader>~ :!rspec %<cr></span></code></pre></td></tr></table></div></figure>


<p>When I used it, the terminal did not exit as well.</p>

<p>Vim Experts, what am I missing here?</p>

<p>Running specs all the time is something crucial to my workflow, I don’t want to hide vim very time, it breaks my flow.</p>

<p>Any help appreciated.</p>

<p>My entire vim configuration is here: <a href="http://www.github.com/kensodev/dotvim">link</a></p>
