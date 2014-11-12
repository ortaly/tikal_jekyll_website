---
layout: post
title: Add a parameter (or even more then one) to Flex event listener
created: 1338394544
author: avit
permalink: /add-parameter-or-even-more-then-one-flex-event-listener
tags:
- Ruby
- web
---
<p>Hi All,</p>

<p>Well, sometimes you find yourself needing a work around to a default framework or language behavior.</p>

<p>I found myself needing exactly that on an application I’m building. No matter what I did I couldn’t find a “normal” way of doing what I did.</p>

<p>This is actually a pretty efficient way of creating your own event listener.</p>

<p>We will talk about the button and we’ll add an event listener.</p>

<p>By default the code looks like this:</p>
<div class='highlight'><pre><code class='actionscript'> <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;?</span><span class='nx'>xml</span> <span class='nx'>version</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mf'>1.0</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>encoding</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>utf</span><span class='o'>-</span><span class='mi'>8</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;?&</span><span class='nx'>gt</span><span class='o'>;</span>
 <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span> <span class='nx'>xmlns</span><span class='o'>:</span><span class='nx'>mx</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>http</span><span class='o'>://</span><span class='nx'>www</span><span class='p'>.</span><span class='nx'>adobe</span><span class='p'>.</span><span class='nx'>com</span><span class='sr'>/2006/m</span><span class='nx'>xml</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>layout</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>absolute</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>creationComplete</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>initApp</span><span class='p'>()</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>gt</span><span class='o'>;</span>
     <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
         <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;!</span><span class='p'>[</span><span class='nx'>CDATA</span><span class='p'>[</span>
             <span class='kd'>import</span> <span class='nx'>mx</span><span class='p'>.</span><span class='nx'>controls</span><span class='p'>.</span><span class='nx'>Alert</span><span class='o'>;</span>

             <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>initApp</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>void</span>
             <span class='p'>{</span>
                 <span class='nx'>cmdDoAction</span><span class='p'>.</span><span class='nx'>addEventListener</span><span class='p'>(</span><span class='nb'>MouseEvent</span><span class='p'>.</span><span class='nx'>CLICK</span><span class='o'>,</span> <span class='nx'>showAlert</span><span class='p'>);</span>
             <span class='p'>}</span>
             <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>showAlert</span><span class='p'>(</span><span class='nx'>e</span><span class='o'>:</span><span class='nb'>MouseEvent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
             <span class='p'>{</span>
                 <span class='c1'>//do something here</span>
                 <span class='nx'>Alert</span><span class='p'>.</span><span class='nx'>show</span><span class='p'>(</span><span class='nx'>txtInputText</span><span class='p'>.</span><span class='nx'>text</span><span class='p'>);</span>
             <span class='p'>}</span>
         <span class='p'>]]</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
     <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
     <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Button</span> <span class='nx'>x</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>y</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>55</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>label</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>Do</span> <span class='nx'>Action</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>cmdDoAction</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;/&</span><span class='nx'>gt</span><span class='o'>;</span>
     <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>TextInput</span> <span class='nx'>x</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>y</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>txtInputText</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;/&</span><span class='nx'>gt</span><span class='o'>;</span>
 <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
</code></pre>
</div>
<p>As you can see, the function listening to the click event can only accept one parameter passed to it. This parameter is the event the function is listening to.</p>

<p>Now, what if I want to do another thing: I want to pass the function another parameter. This parameter can be anything - it can be hard coded or it can come from a runtime result of the code.</p>

<p>In the same way, you can add more then 1 parameter of course.</p>

<p>Let us see our code now:</p>
<div class='highlight'><pre><code class='actionscript'><span class='o'>&</span><span class='nx'>lt</span><span class='o'>;?</span><span class='nx'>xml</span> <span class='nx'>version</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mf'>1.0</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>encoding</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>utf</span><span class='o'>-</span><span class='mi'>8</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;?&</span><span class='nx'>gt</span><span class='o'>;</span>
<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span> <span class='nx'>xmlns</span><span class='o'>:</span><span class='nx'>mx</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>http</span><span class='o'>://</span><span class='nx'>www</span><span class='p'>.</span><span class='nx'>adobe</span><span class='p'>.</span><span class='nx'>com</span><span class='sr'>/2006/m</span><span class='nx'>xml</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>layout</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>absolute</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>creationComplete</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>initApp</span><span class='p'>()</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>gt</span><span class='o'>;</span>
    <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
        <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;!</span><span class='p'>[</span><span class='nx'>CDATA</span><span class='p'>[</span>
            <span class='kd'>import</span> <span class='nx'>mx</span><span class='p'>.</span><span class='nx'>controls</span><span class='p'>.</span><span class='nx'>Alert</span><span class='o'>;</span>

            <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>initApp</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>void</span>
            <span class='p'>{</span>
                <span class='nx'>cmdDoAction</span><span class='p'>.</span><span class='nx'>addEventListener</span><span class='p'>(</span><span class='nb'>MouseEvent</span><span class='p'>.</span><span class='nx'>CLICK</span><span class='o'>,</span> <span class='kd'>function</span> <span class='p'>(</span><span class='nx'>e</span><span class='o'>:</span><span class='nb'>MouseEvent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
                <span class='p'>{</span>
                    <span class='nx'>showAlert</span><span class='p'>(</span><span class='nx'>txtInputText</span><span class='p'>.</span><span class='nx'>text</span><span class='o'>,</span> <span class='nx'>e</span><span class='p'>);</span>
                <span class='p'>});</span>
            <span class='p'>}</span>
            <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>showAlert</span><span class='p'>(</span><span class='nx'>s</span><span class='o'>:</span><span class='nb'>String</span><span class='o'>,</span> <span class='nx'>e</span><span class='o'>:</span><span class='nb'>MouseEvent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
            <span class='p'>{</span>
                <span class='c1'>//do something here</span>
                <span class='nx'>Alert</span><span class='p'>.</span><span class='nx'>show</span><span class='p'>(</span><span class='nx'>s</span><span class='o'>,</span> <span class='nx'>e</span><span class='p'>.</span><span class='nx'>target</span><span class='p'>.</span><span class='nx'>toString</span><span class='p'>());</span>
            <span class='p'>}</span>
        <span class='p'>]]</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
    <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
    <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Button</span> <span class='nx'>x</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>y</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>55</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>label</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>Do</span> <span class='nx'>Action</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>cmdDoAction</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;/&</span><span class='nx'>gt</span><span class='o'>;</span>
    <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>TextInput</span> <span class='nx'>x</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>y</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>10</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>txtInputText</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;/&</span><span class='nx'>gt</span><span class='o'>;</span>
<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
</code></pre>
</div>
<p>Now, didn’t I make you happy?</p>

<p>Good luck and happy coding!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/9qtszem3zJQ" height="1" width="1"/>
