---
layout: post
title: Polymer - how to create a youtube video list
created: 1389269031
author: orenf
permalink: /polymer-how-create-youtube-video-list
tags:
- JS
- Javascript
- Fuseday
- polymer
---
<p>During the last fuseday at Tikal, the javascript group focused on yet another javascript stack:</p>

<ul>
	<li>sailsjs for server side</li>
	<li>Polymer for client side</li>
	<li>mongodb for database</li>
	<li>monogohq for cloud mongo database</li>
	<li>grunt for automation tasks (build, concat, etc..)</li>
	<li>nodejitsu for deploying</li>
</ul>

<h2>Polymer - intro</h2>

<p>Polymer is an open source project by Google, which aims to follow future standard of web components and use them in browsers today. All in all, it provides good and solid polyfills for some of the standards that define web components:</p>

<ul>
	<li>Templates</li>
	<li>HTML imports</li>
	<li>Custom elements</li>
	<li>Shadow DOM</li>
</ul>

<p>So, once browser vendors implements these standards, Polymer will use the native implementation.</p>

<h2>Fuseday and Polymer</h2>

<p>The project for December 2013 fuseday was to creat a youtube application which has 2 main modules:</p>

<ol>
	<li>Screen - a page where a youtube video is played</li>
	<li>Remote - a page to search for youtube videos and select and control one video to be played in the Screen</li>
</ol>

<p>So, eventually, one would open the application in 2 clients: TV for Screen, mobile device for Remote. I had the challange of working with Polymer and implement the Remote module with it.</p>

<h2>Polymer - mantra</h2>

<p>Polymer follows one mantra: <a href="http://html5-demos.appspot.com/static/cds2013/index.html#31">Everything is an element</a>. It tries to elimintate js boilerplate code by embracing back html standards - and for anyone who&#39;ve been using angular&#39;s directives - it will look much simliar in concept.</p>

<p>All i needed for the Remote module was a simple module that will display a list of youtube items, searching youtube and controls for the currently played video.</p>

<p>So, basically, my custom element should be in its simplest form like so:</p>

<blockquote>
<p>&lt;youtube-list&gt;&lt;/youtube-list&gt;</p>
</blockquote>

<p>and for using it:</p>

<blockquote>
<p>&lt;!DOCTYPE html&gt;<br />
&lt;html&gt;<br />
&lt;head&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;script src=&quot;platform/platform.js&quot;&gt;&lt;/script&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;link rel=&quot;import&quot; href=&quot;my-polymers/youtube-list.html&quot;&gt;<br />
&lt;/head&gt;<br />
&lt;body&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;youtube-list&gt;&lt;/youtube-list&gt;<br />
&lt;/body&gt;<br />
&lt;/html&gt;</p>
</blockquote>

<p>Polymer provides both basic platform elements and ui widgets. For starters, I chose to focus on the platform elements and create the youtube list module.</p>

<h2>Polymer - platform elements</h2>

<p>The platform elements aims to provide &quot;tools&quot; for various use cases: let it be ui widgets, modules and in general: any custom elements or procedures you can think of. The &quot;youtube-list&quot; module requires few polymer elements:</p>

<ul>
	<li>polymer.html - for creating polymer elements</li>
	<li>polymer-ajax - for using ajax</li>
</ul>

<p>Now, For creating the new module &quot;youtube-list&quot;, we start with this snippet:</p>

<blockquote>
<p>&lt;polymer-element name=&quot;youtube-list&quot; attributes=&quot;&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;style type=&quot;text/css&quot;&gt;&lt;/style&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;template&gt;&lt;/template&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;script type=&quot;text/javascript&quot;&gt;&lt;/script&gt;<br />
&lt;/polymer-element&gt;</p>
</blockquote>

<p>This code actually creates an incapsulated code which runs within the &quot;youtube-list&quot; module context. &quot;style&quot; tag can be used for any custom style of this module - and will be implemented to the inside contents of this element.</p>

<p>&quot;template&quot; is the html markup that this module is created with. inside this tag we&#39;ll use the &quot;polymer-ajax&quot; element. &quot;script&quot; is the js script that will define the js polymer object and will hold the logics and behaviour of this module.</p>

<p>&quot;attributes&quot; may be a space seperated string of attributes that is exposed outside of this element (think of &quot;input&quot; attributes: &quot;type&quot;, &quot;value&quot;) - which will be defined as: attributes=&quot;type value&quot;</p>

<h2>template</h2>

<p>The &quot;template&quot; tag is part of the html5 standards and may consists html markup code with the commonly used templating syntax of mustasch/angularjs - {{ title_value }} - which is also used for data binding.</p>

<p>The evaluation of the expressions is done towards the polymer&#39;s element local public (defined with &quot;this&quot; inside the Polymer definition in the script tag) variables and attributes variables as well.</p>

<p>The &#39;template&#39; tag may be nested and used. Its most common use is using it in a &quot;repeat&quot; expression.</p>

<p>Much like angularjs directive &quot;ng-repeat&quot;, you would use the repeat like so:</p>

<blockquote>
<p>&lt;template id=&quot;yt-list&quot; repeat=&quot;{{item in items}}&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;h2 videoid=&quot;{{item.id.videoId}}&quot;&gt;{{item.snippet.title}}&lt;/h2&gt;<br />
&nbsp;&nbsp; &nbsp;...<br />
&nbsp;&nbsp; &nbsp;...<br />
&lt;/template&gt;</p>
</blockquote>

<p>The polymer-ajax element is declared inside the main template tag for this module as so:</p>

<blockquote>
<p>&lt;polymer-ajax id=&quot;ajax&quot; url=&quot;/search/list&quot;&nbsp;<br />
&nbsp; &nbsp; params=&#39;&#39;<br />
&nbsp; &nbsp; handleAs=&quot;json&quot;<br />
&nbsp; &nbsp; on-polymer-response=&quot;{{handleResponse}}&quot;&gt;<br />
&lt;/polymer-ajax&gt;</p>
</blockquote>

<p>In the next section we&#39;ll see what the &quot;id&quot; attribute is used for, and how easy it is to use the polymer-ajax with js code. The &#39;handleResponse&#39; is a function which is defined in the script tag.</p>

<h2>script</h2>

<p>The &quot;script&quot; tag holds the logics of the custom element that we&#39;ve created. Its important to note that it is not required if your custom element doesn&#39;t have any js logics - otherwise - it&#39;s a must.</p>

<p>For declaring and interacting with the new custom element &quot;youtube-list&quot;, we need to declare this element using the Polymer function:</p>

<blockquote>
<p>Polymer(&#39;youtube-list&#39;, {<br />
&nbsp;&nbsp; &nbsp;ready: function() {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.nowPlaying = &#39;choose something below...&#39;;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.items = [{<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;snippet: {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;title: &#39;loading...&#39;,<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;description: &#39;&#39;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}];<br />
&nbsp;&nbsp; &nbsp;}<br />
});</p>
</blockquote>

<p>The &#39;ready&#39; function runs once Polymer has been initialized. Then, on any change to local, public properties attached to &quot;this&quot; context, the relevant expressions which have been defined in the template tag will be evaluated and rendered to the DOM of this element.</p>

<p>Lets inspect the &quot;script&quot; more and focus on the &#39;handleResponse&#39; method that is defined in the polymer-ajax element. This method id defined as a method of the &#39;youtube-list&#39; polymer element:</p>

<blockquote>
<p>handleResponse: function(ev, res){<br />
&nbsp;&nbsp; &nbsp;this.items = res.response.items;<br />
&nbsp;&nbsp; &nbsp;this.loading = &#39;&#39;;<br />
}</p>
</blockquote>

<p>Notice that all it has to do in order to update the dom with the new items is updating the &quot;this.items&quot; property. The rest is being taking care of by Polymer&#39;s data binding - so the new items that were retreived from the ajax call will be rendered accrodingly.</p>

<p>One of the many features that I like in Polymer is that it saved a reference to an element with an id attribute. Lets see how we use it here. For searching youtube videos, a form is defined in the template:</p>

<blockquote>
<p>&lt;form id=&quot;search&quot;&gt; &nbsp;<br />
&nbsp;&nbsp; &nbsp;&lt;div class=&quot;&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;input id=&quot;query&quot; class=&quot;search&quot; type=&quot;search&quot; placeholder=&quot;search youtube...&quot;&gt;&lt;/input&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;div class=&quot;label success&quot;&gt;{{loading}}&lt;/div&gt;<br />
&nbsp;&nbsp; &nbsp;&lt;/div&gt;<br />
&lt;/form&gt;</p>
</blockquote>

<p>First, a submit event handler is defined on Polymer&#39;s &#39;ready&#39; function.</p>

<p>Notice how I can easily refer to the search form by quering the &quot;this.$&quot; property. Also, the callback function sends the input&#39;s value to the &#39;query&#39; method. Eventualy, the query method refers to the &#39;ajax&#39; element using the &#39;this.$ajax&#39; and runs the &#39;go&#39; method. The &#39;go&#39; method is a built in method that comes with polymer-ajax. </p>

<blockquote>
<p>ready: function(){<br />
....<br />
&nbsp;&nbsp; &nbsp;var that = this;<br />
&nbsp;&nbsp; &nbsp;this.$.search.addEventListener(&#39;submit&#39;, function(ev){<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;that.query(that.$.query.value);<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;ev.preventDefault();<br />
&nbsp;&nbsp; &nbsp;});<br />
},<br />
..<br />
..</p>

<p>query: function(q){<br />
&nbsp; var that = this;<br />
&nbsp; this.loading = &quot;finding your query now...&quot;;<br />
&nbsp; var params = {<br />
&nbsp; &nbsp;&nbsp; &nbsp;alt: &quot;json&quot;,<br />
&nbsp; &nbsp;&nbsp; &nbsp;q: q<br />
&nbsp; };<br />
&nbsp; this.$.ajax.params = JSON.stringify(params);<br />
&nbsp; this.$.ajax.go();<br />
}</p>
</blockquote>

<h2>Summary</h2>

<p>Polymer was fun to experiment with.</p>

<p>Coming from angularjs background felt just like home with its native templating engine. One of the nicest things in using polymers is seeing the actual elements in the source of the html inside the devtools.</p>

<p>I also like the way devtools seperates the various ingridients of the custom polymer to its own files in the &quot;sources&quot; tab of devtools. Polymer is an interesting concept and has lots of gems to play with - both ui elements (tabs, navigation, cards, lists, menu etc..) and platform elements (ajax, animation ,localstorage etc..).</p>

<p>Polymer truly promotes and takes the javascript module methodology to a high level in web development while exposing the future platform of html5 web components standards.</p>

<p>The project of fuseday is <a href="https://github.com/tikalk/youtube-remote-js/blob/master/assets/polymers/youtube-list.html">open source</a> and the full code is on github.</p>
