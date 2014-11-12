---
layout: post
title: Make your life easier with this Flash Builder 4 plugin (sourcemate)
created: 1338394544
author: avit
permalink: /make-your-life-easier-flash-builder-4-plugin-sourcemate
tags:
- Ruby
- web
---
<a href='http://www.flickr.com/photos/51960246@N07/5047608197/' title='Screen shot 2010-10-03 at 8.02.59 PM by KensoDev, on Flickr'><img alt='Screen shot 2010-10-03 at 8.02.59 PM' class='alignleft' height='142' src='http://farm5.static.flickr.com/4139/5047608197_836751ec0d.jpg' width='256' /></a>
<p>I have been working with flex for about 4 years now and moved to Flash Builder 4 about six months ago. The one thing I have really missed in programming flex is the proper IDE that makes your life easier, making simple tasks simple for the programmer.</p>

<p>For instance, I always wanted to write private vars (with shortcuts) and then make getters and setter with a click of a button, with no real need for typing them all.</p>

<p>Typing is a waste of time for programmers. Don’t get me wrong, we all have to type code, after all this is how we make a living, but writing the complete method template other than just a shortcut and then a click on a button is something that at the end of the day takes the toll from your project.</p>

<p>So, let’s take some scenarios that I encountered in my life as a Flex programmer and team leader. <h2>Code generation</h2> This is one of the things that I have been looking at deeply upon when I was about to buy sourcemate plugin, the plugin promised and kept it’s promise to make your life simpler by being able to define what they call snippets.</p>

<p>Those snippets have a set that comes predefined, you can also define as many snippets as you want.</p>

<p>One killer feature is being able to share snippets with others, this is just a terrific feature. It allows the team to write the same code, or at least code with the same signature, all methods look the same, all vars look the same and more.</p>

<p>A sample template:</p>
<div class='highlight'><pre><code class='actionscript'><span class='k'>for</span> <span class='p'>(</span><span class='k'>var</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>index</span><span class='p'>}</span><span class='o'>:</span><span class='nb'>int</span> <span class='o'>=</span> <span class='mi'>0</span><span class='o'>;</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>index</span><span class='p'>}</span> <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>array</span><span class='p'>}.</span><span class='nx'>length</span><span class='o'>;</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>index</span><span class='p'>}</span><span class='o'>++</span><span class='p'>)</span>
<span class='p'>{</span>
<span class='nx'>$</span><span class='p'>{</span><span class='nx'>indent</span><span class='p'>}</span><span class='k'>var</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>element</span><span class='o'>:</span><span class='nx'>varName</span><span class='p'>}</span><span class='o'>:</span><span class='nx'>$</span><span class='p'>{</span><span class='nx'>type</span><span class='p'>}</span> <span class='o'>=</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>array</span><span class='p'>}[</span><span class='nx'>$</span><span class='p'>{</span><span class='nx'>index</span><span class='p'>}]</span> <span class='nx'>as</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>type</span><span class='p'>};</span>
<span class='nx'>$</span><span class='p'>{</span><span class='nx'>indent</span><span class='p'>}</span><span class='nx'>$</span><span class='p'>{</span><span class='nx'>cursor</span><span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>this template’s shortcut is ‘for’ and then a CMD+SPACE <a href='http://www.flickr.com/photos/51960246@N07/5046665676/' title='Screen shot 2010-10-03 at 8.29.10 AM by KensoDev, on Flickr'><img alt='Screen shot 2010-10-03 at 8.29.10 AM' height='98' src='http://farm5.static.flickr.com/4126/5046665676_a23dfafdbf.jpg' width='366' /></a></p>

<p>As you can probably see, this is a peace of code you have probably written dozens of time, it usually takes you much more than just couple of seconds.</p>

<p>You can navigate your way inside the template with the TAB key on you keyboard, clicking the TAB on the keyboard will take you on this path (in this template): <ol>
	<li>define the array param (rename)</li>
	<li>define the element type (rename)</li>
</ol> So, you can customize the template, generally speaking, making this code fit your array and your element type takes about 5 seconds, this is a huge improvement in times, you can shave quite some time from your work day. <h3>Customized snippet</h3> Now, let’s see how we can customize a snippet to fit our own code.</p>

<p>In a project I am currently working on there’s a class (ViewHelper) that has a base class (BaseViewHelper).</p>

<p>This base class has a model property, in the class you are writing, you want to make a getter that will be called myModel, and this will return a casted instance of the model property</p>

<p>Generally, it looks like this:</p>
<div class='highlight'><pre><code class='actionscript'>		<span class='kd'>public</span> <span class='kd'>function</span> <span class='kd'>get</span> <span class='nx'>myModel</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>CurrentConfiguration</span>
		<span class='p'>{</span>
			<span class='k'>return</span> <span class='nx'>CurrentConfiguration</span><span class='p'>(</span><span class='k'>this</span><span class='p'>.</span><span class='nx'>model</span><span class='p'>);</span>
		<span class='p'>}</span>
</code></pre>
</div>
<p>Just take a look at this code, as you can see there’s a template here. Llet’s check what the template is: <ul>
	<li>decide if the method is public/private/protected</li>
	<li>set the type of the getter</li>
</ul> This is what the template looks like now:</p>
<div class='highlight'><pre><code class='actionscript'><span class='nx'>$</span><span class='p'>{</span><span class='nx'>visibility</span><span class='o'>:</span><span class='nx'>link</span><span class='p'>(</span><span class='kd'>public</span><span class='o'>,</span><span class='kd'>protected</span><span class='o'>,</span><span class='kd'>private</span><span class='p'>)}</span> <span class='kd'>function</span> <span class='kd'>get</span> <span class='nx'>myModel</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>$</span><span class='p'>{</span><span class='nx'>modelName</span><span class='p'>}</span>
<span class='p'>{</span>
<span class='nx'>$</span><span class='p'>{</span><span class='nx'>indent</span><span class='p'>}</span><span class='k'>return</span> <span class='nx'>$</span><span class='p'>{</span><span class='nx'>modelName</span><span class='p'>}(</span><span class='k'>this</span><span class='p'>.</span><span class='nx'>model</span><span class='p'>);</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>Now, when I want to put this in my class all I have to type is myModel and then CTRL+SPACE, set the type, select the visibility and I’ll have a myModel getter inside my class. <h2>Refactoring</h2> The next best thing this plugin gives you is refactoring.</p>

<p>After reading uncle Bob’s book (<a href='http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882' target='_blank'>Clean Code</a>) I am crazy about refactoring, it makes my code so much simpler, also when getting into other programmers code, I refactor it, break a method into several smaller, more single responsibility methods and then, just then I start working on what I have to do.</p>

<p>The great thing about refactoring with sourcemate is that the function created is created with all of the params (variables) that it needs in order to work, the refactoring also detects if the function should return a value or just be void.</p>

<p>These are the options for refactoring, I don’t think it needs much more explanations then thus:</p>
<a href='http://www.flickr.com/photos/51960246@N07/5046071659/' title='Screen shot 2010-10-03 at 8.46.34 AM by KensoDev, on Flickr'><img alt='Screen shot 2010-10-03 at 8.46.34 AM' height='115' src='http://farm5.static.flickr.com/4147/5046071659_9f01aef95b_z.jpg' width='640' /></a><h2>More</h2>
<p>This plugin gives you so much more than what I have written about, it has many more great features like generating ASDoc comments, generating documentation for the project and many more.</p>

<p>This plugin is by far the best thing that have happened to my Flex development experience since Flex builder 3 came out :-)</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/jkUC6JDnLQU" height="1" width="1"/>
