---
layout: post
title: Add new website IIS 7 (Vista)
created: 1338394544
author: avit
permalink: /add-new-website-iis-7-vista
tags:
- Ruby
- web
---
<p>Hello all,</p>

<p>For all of us programmers or web developers working with websites, you know the need to open more then one website (by default) on your development machine.</p>

<p>Sometime you need all a website to stand on its own and not be a sub directory or a virtual directory (like: <a href='http://localhost/your_webiste'>http://localhost/your_webiste</a>).</p>

<p>Why, well let’s say your using URL rewriting, then you need to use parent path’s like so:</p>
<div class='highlight'><pre><code class='html'><span class='nt'><img</span> <span class='na'>alt=</span><span class='s'>""</span> <span class='na'>src=</span><span class='s'>"/assets/images/avi.png"</span> <span class='nt'>/></span>
</code></pre>
</div>
<p>If you try to do this while using a VD you will get errors and your images won’t be displayed, you have to use a standalone website for this.</p>

<p>So, let me tell you how to do it with IIS 7 (I’m working with vista, it’s the same for IIS 7 on any other machine).</p>

<p>For all of you guys with XP out there, you cannot do this, so please other upgrade to vista or windows 7 (:-))</p>

<p>I have my own method of how to do this, that make me remember the web address easily.</p>

<p>It goes like this: if I’m working on my website (<a href='http://www.kensodev.com'>http://www.kensodev.com</a>) the local version of it will be (<a href='http://local.kensodev.com'>http://local.kensodev.com</a> –> link not working).</p>

<p>ok ok I’m getting there :-)</p>
<strong>How to add a new website IIS 7 on Vista?</strong>
<p>First, open IIS manager on vista (Start—>Administrative Tools—>IIS Manager)</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1927.png'><img alt='2009-04-30_1927' border='0' height='183' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1927-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1927' width='244' /></a>
<p>On the left you will see the “sites” folder, right click on it and select “add website”, you will get this dialog.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1933.png'><img alt='2009-04-30_1933' border='0' height='236' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1933-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1933' width='244' /></a>
<p>Fill the text boxes just as I did, give it your own names of course and select the local folder where the files are located.</p>

<p>This is just about it for IIS, don’t try to navigate to the website yet, you will get an error.</p>

<p>Next step: Please open up notepad (with admin privileges), hit file—>Open (select <em>.</em>) and navigate to the folder  C:\Windows\System32\drivers\etc</p>

<p>You will see these files:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1936.png'><img alt='2009-04-30_1936' border='0' height='193' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1936-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1936' width='244' /></a>
<p>Click the “hosts” file and open it, If you didn’t define any website you will only see “localhost”</p>

<p>Now, we will add a record at the end of this file.</p>

<p>Type 127.0.0.1 and hit the TAB button on your keyboard, then type the name that you gave your website. In this case “local.kensodev.com” no need to type http:// or www.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1938.png'><img alt='2009-04-30_1938' border='0' height='184' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1938-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1938' width='244' /></a>
<p>That’s it.</p>

<p>Now, lets open up a browser an navigate to the website.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1942.png'><img alt='2009-04-30_1942' border='0' height='163' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1942-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1942' width='244' /></a>
<p>Just to check that the browser isn’t routed to a remote website lets ping to it using the command line.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1943.png'><img alt='2009-04-30_1943' border='0' height='125' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-1943-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_1943' width='244' /></a>
<p>And that’s the end, you have another website on your IIS, and you can browse to it.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/HQ4OsLPJH8M" height="1" width="1"/>
