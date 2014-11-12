---
layout: post
title: Keep your mxml files neat with View Helpers
created: 1338394544
author: avit
permalink: /keep-your-mxml-files-neat-view-helpers
tags:
- Ruby
- web
---
<p>I have been working with<a href='http://www.kensodev.com/category/flex/' title='flex'> flex</a> and consulting about flex development for quite some time now. I guess about 3 years of consulting and 4 years of hands-on development.</p>

<p>I have seen flex applications written in many ways: mxml files, as files, namespaces and more. I guess there is no “right” way to do so, or at least not just one “right” way.</p>

<p>These past few months, I have started working with mxml files in a way I think is very convenient. It keeps my mxml file very lean and clean, all of the view code is in a separate action-script file which inherits from a base class. <p style='text-align: center;'>I want to show you this, first. This is the sample project, this is what it looks like in flash builder:
<a href='http://www.flickr.com/photos/51960246@N07/4907663294/' title='Screen shot 2010-08-19 at 5.26.08 PM by KensoDev, on Flickr'><img alt='Screen shot 2010-08-19 at 5.26.08 PM' class='aligncenter' height='349' src='http://farm5.static.flickr.com/4142/4907663294_69ebd7233a.jpg' width='385' /></a></p> As you can see, there is the main application, an mxml component, the BaseViewHelper class and that is just about it.</p>

<p>Now, let’s have a look at the BaseViewHelper class. <em>note: this is a stripped down version of the class, it has many additions in my project, like a way to add validations, clean and dirty modes for the model and more, this is just to see the way I work, you can add your own additions to it.</em></p>
<div class='highlight'><pre><code class='actionscript'><span class='kd'>package</span> <span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span><span class='p'>.</span><span class='nx'>core</span>
<span class='p'>{</span>
	<span class='kd'>import</span> <span class='nx'>mx</span><span class='p'>.</span><span class='nx'>core</span><span class='p'>.</span><span class='nx'>UIComponent</span><span class='o'>;</span>

	<span class='kd'>public</span> <span class='kd'>class</span> <span class='nx'>BaseViewHelper</span>
	<span class='p'>{</span>
		<span class='kd'>private</span> <span class='k'>var</span> <span class='nx'>_view</span><span class='o'>:</span><span class='nx'>UIComponent</span><span class='o'>;</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='nx'>BaseViewHelper</span><span class='p'>()</span>
		<span class='p'>{</span>

		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='nx'>init</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>

		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='kd'>set</span> <span class='nx'>view</span><span class='p'>(</span><span class='nx'>v</span><span class='o'>:</span><span class='nx'>UIComponent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='nx'>_view</span> <span class='o'>=</span> <span class='nx'>v</span><span class='o'>;</span>
		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='kd'>get</span> <span class='nx'>view</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>UIComponent</span>
		<span class='p'>{</span>
			<span class='k'>return</span> <span class='nx'>_view</span><span class='o'>;</span>
		<span class='p'>}</span>
	<span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>As you can see, I kept it very simple. It has a view getter and setter to set the view it handles, and an init function (for creation complete events).</p>

<p>Now, let’s see an mxml component and how does the helper fits, but first let’s see a view helper which inherits from the BaseViewHelper class.</p>
<div class='highlight'><pre><code class='actionscript'><span class='kd'>package</span> <span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span><span class='p'>.</span><span class='nx'>views</span><span class='p'>.</span><span class='nx'>helpers</span>
<span class='p'>{</span>
	<span class='kd'>import</span> <span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span><span class='p'>.</span><span class='nx'>core</span><span class='p'>.</span><span class='nx'>BaseViewHelper</span><span class='o'>;</span>
	<span class='kd'>import</span> <span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span><span class='p'>.</span><span class='nx'>views</span><span class='p'>.</span><span class='nx'>MyViewComponent</span><span class='o'>;</span>

	<span class='kd'>public</span> <span class='kd'>class</span> <span class='nx'>MyViewComponentHelper</span> <span class='kd'>extends</span> <span class='nx'>BaseViewHelper</span>
	<span class='p'>{</span>
		<span class='kd'>public</span> <span class='kd'>function</span> <span class='nx'>MyViewComponentHelper</span><span class='p'>()</span>
		<span class='p'>{</span>
			<span class='kd'>super</span><span class='p'>();</span>
		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='kd'>get</span> <span class='nx'>myView</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>MyViewComponent</span>
		<span class='p'>{</span>
			<span class='k'>return</span> <span class='nx'>MyViewComponent</span><span class='p'>(</span><span class='k'>this</span><span class='p'>.</span><span class='nx'>view</span><span class='p'>);</span>
		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>override</span> <span class='kd'>function</span> <span class='nx'>init</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='c1'>//TODO Auto-generated method stub</span>
			<span class='kd'>super</span><span class='p'>.</span><span class='nx'>init</span><span class='p'>();</span>
		<span class='p'>}</span>

		<span class='kd'>public</span> <span class='kd'>function</span> <span class='nx'>myButton_clickHandler</span><span class='p'>(</span><span class='nx'>event</span><span class='o'>:</span><span class='nb'>MouseEvent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='c1'>// TODO Auto-generated method stub</span>
		<span class='p'>}</span>
	<span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>This is a helper file for the MyViewComponent. Now, here’s the source code for implementing the helper inside each View component</p>
<div class='highlight'><pre><code class='actionscript'><span class='o'>&</span><span class='nx'>lt</span><span class='o'>;?</span><span class='nx'>xml</span> <span class='nx'>version</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mf'>1.0</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>encoding</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>utf</span><span class='o'>-</span><span class='mi'>8</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;?&</span><span class='nx'>gt</span><span class='o'>;</span>
<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Canvas</span> <span class='nx'>xmlns</span><span class='o'>:</span><span class='nx'>mx</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>http</span><span class='o'>://</span><span class='nx'>www</span><span class='p'>.</span><span class='nx'>adobe</span><span class='p'>.</span><span class='nx'>com</span><span class='sr'>/2006/m</span><span class='nx'>xml</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
		   <span class='nx'>width</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>400</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
		   <span class='nx'>height</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>300</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
		   <span class='nx'>creationComplete</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>helper</span><span class='p'>.</span><span class='nx'>init</span><span class='p'>()</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
		   <span class='nx'>xmlns</span><span class='o'>:</span><span class='nx'>helper</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span><span class='p'>.</span><span class='nx'>views</span><span class='p'>.</span><span class='nx'>helpers</span><span class='p'>.</span><span class='o'>*&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>gt</span><span class='o'>;</span>

	<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
		<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;!</span><span class='p'>[</span><span class='nx'>CDATA</span><span class='p'>[</span>

		<span class='p'>]]</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
	<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>

	<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>helper</span><span class='o'>:</span><span class='nx'>MyViewComponentHelper</span> <span class='nx'>view</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>{</span><span class='k'>this</span><span class='p'>}</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>helper</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='o'>/&</span><span class='nx'>gt</span><span class='o'>;</span>

	<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Button</span> <span class='nx'>id</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>myButton</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>click</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>helper</span><span class='p'>.</span><span class='nx'>myButton_clickHandler</span><span class='p'>(</span><span class='nx'>event</span><span class='p'>)</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>

<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Canvas</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
</code></pre>
</div>
<p>As you can see, the file is very clean, it has only data relevant to understand the structure of the component (which is all you need in mxml), all of the logic files “seats” behind the scenes.</p>

<p>There is a naming conventions for views and view helpers its view_name view_nameHelper This way, when you navigate your way through the code, you can always see what you are looking for with ease like so: <p style='text-align: center;'><a href='http://www.flickr.com/photos/51960246@N07/4907684584/' title='Screen shot 2010-08-19 at 5.36.53 PM by KensoDev, on Flickr'><img alt='Screen shot 2010-08-19 at 5.36.53 PM' class='aligncenter' height='399' src='http://farm5.static.flickr.com/4137/4907684584_169980e5f0.jpg' width='500' /></a></p> I hope you take inspiration with this way, I assure you I did, it’s a very useful way to manage large projects with many views and view helpers.</p>

<p>The source code of the example project is on <a href='http://github.com/KensoDev/view-helper-example' target='_blank'>git</a>.</p>
<hr />
<p>update:</p>

<p>After a discussion with <a href='http://www.twitter.com/douglasknudsen'>@douglasknudsen</a> I want to make things clear, this is not the ViewHelper implementation of cairngorm Mvc framework, it’s something you should (or can) write on your own just to make things organized and clean.</p>

<p>I am using it regardless to the MVC framework I am using which is RobotLegs B.T.W</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/OoeW_ACvh2Q" height="1" width="1"/>
