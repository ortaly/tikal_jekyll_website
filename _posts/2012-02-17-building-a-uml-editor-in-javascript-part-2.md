---
layout: post
title: Building a UML editor in JavaScript - part 2
created: 1329492582
author: udib
permalink: building-a-uml-editor-in-javascript-part-2
tags:
- JS
- CoffeeScript
---
<p>This is part 2 of a series exploring how to build a full-pledged UML editor in JavaScript.&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Switching to CoffeeScript</span></h1>
<p>&nbsp;</p>
<p>In the<a href="http://www.tikalk.com/javascript/building-uml-editor-javascript-part-1"> 1st post</a>&nbsp;I explained my assumption that there is no more need for server back-end for user-facing applications, which should just be client-side applications accessing cloud API&#39;s for resources &amp; services (whether our own or 3rd-party). I&#39;m targeting the Web as initial platform for the example application, so I chose to write the application in JavaScript. The person who did the most to revive &amp; evangalize JavaScript - Douglas Crockford - is also the one who pointed out the many weaknesses it has, due mainly to the very short time in which it was developed. These weaknesses cause you to use overly-complex &amp; error-prone syntax which is a real bummer for someone switching from Python.</p>
<p>&nbsp;</p>
<p>Things don&#39;t have to be this way though, &amp; luckily for us the guy behind Backbone.js - Jeremy Ashkenas - also developed CoffeeScript - a small language that compiles into JavaScript &amp; solves most of these problems.&nbsp;In the words of Jeremy: &nbsp;&quot;...&nbsp;[CoffeeScript] attempts to take the beautiful dynamic semantics of JavaScript - object literals, function expressions, prototypal inheritance - and express them in a clear, readable, minimal way&quot;.&nbsp;Here&#39;s an example Jeremy gave to illustrate that (this and the quote are taken from the chapter he wrote in Alex MacCaw&#39;s&nbsp;<a href="http://arcturo.github.com/library/coffeescript/">book on CoffeeScript</a>):</p>
<p>&nbsp;</p>
<p>JavaScript:</p>
<pre class="brush: jscript;" title="code">
var square = function(x) {
&nbsp;&nbsp;&nbsp;return x * x;
}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>CoffeeScript:</p>
<pre class="brush: jscript;" title="code">
square = (x) -&gt; x * x</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>So, in this post I&#39;ll show you how to convert a JavaScript application - the UML editor I&#39;m building - into CoffeeScript. Starting from the next post, the series name will therefore be: How to build a UML editor in CoffeeScript.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">The benefits of CoffeeScript</span></h1>
<p>&nbsp;</p>
<p>CoffeeScript is a language inspired by Ruby &amp; Python, which achieves 3 main goals:</p>
<ul>
	<li>
		Fix the inherent problems in JavaScript</li>
	<li>
		Add expressiveness to the language, without breaking it&#39;s semantics</li>
	<li>
		Clean the code and make it more readable</li>
</ul>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p>To name just a few problems of JavaScript that CoffeeScript solves:</p>
<ul>
	<li>
		Context of functions changes (&quot;this&quot;), e.g., when used as event-handlers/callbacks</li>
	<li>
		&quot;var&quot; is often forgotten, causing variables to leak to the global namespace</li>
	<li>
		The global namespace</li>
	<li>
		Using &quot;==&quot; instead of &quot;===&quot;, which can cause varoius JavaScript glitches</li>
	<li>
		Omitting the need for semi-colon, which also causes various glitches when forgotten</li>
</ul>
<p>&nbsp;</p>
<p>The improvements in expressiveness include:</p>
<ul>
	<li>
		list comprehension, e.g., squares = (x**x for x in arr)</li>
	<li>
		string formatting, e.g., s = &quot;Hello #{user.name}&quot;</li>
	<li>
		array &amp; object unpacking (in function calls &amp; assignments)</li>
</ul>
<p>&nbsp;</p>
<p>CoffeeScript borrows from Python the idiom of determining block scope by indentation, which cleans the code &amp; improves readability. It also cleans the code by:</p>
<ul>
	<li>
		simple syntax for creating classes, constructors, referring to super, extending other classes</li>
	<li>
		omitting the need for parens (&quot;()&quot;, and &quot;{}&quot;)</li>
	<li>
		simple syntax for instance variables &amp; static members (@ instead of this, :: instead of .prototype.)</li>
	<li>
		properly walking &amp; efficient &quot;for .. in ..&quot; loops</li>
	<li>
		existence checking on objects &amp; method calls (e.g., &quot;obj.do?()&quot; which will not be invoked if obj or do are undefined)</li>
	<li>
		do - immediate function execution, useful for creating closures</li>
	<li>
		no need for &quot;return&quot; - the last expression in a function is the return value</li>
</ul>
<p>&nbsp;</p>
<p>Programmers familiar with Python &amp; Ruby will find it easy to learn &amp; use CoffeeScript. Although there are subtle things to be aware of, such as not having negative list indices (e.g., list[-1] for accessing the last element), which breaks the semantics of JavaScript.</p>
<p>&nbsp;</p>
<p>It&#39;s important to note that the code CoffeeScript compiles to isn&#39;t slower than hand-written code. Also, the generated code passes the inspection of JSLint - the code quality inspection tool we mentioned in the 1st post, written by Douglass Crockford. Indeed, CoffeeScript adds a necessary compilation step to JavaScript, but in practice we anyway do that for minifying the code.</p>
<p>&nbsp;</p>
<p>To learn more on CoffeeScript:</p>
<ul>
	<li>
		Read the book by Alex MacCaw (online version is free): <a href="http://arcturo.github.com/library/coffeescript/">The little book on CoffeeScript</a></li>
	<li>
		Watch this <a href="http://www.futureinsights.com/profiles/blogs/coffeescript">great introduction video</a> by Sam Stephenson (author of prototype.js)</li>
	<li>
		Attend one of the talks by Adi Baron, head of the JavaScript group in Tikal (<a href="http://www.meetup.com/saylambda/events/44902392/">21/Feb</a> &amp; <a href="http://www.tikalk.com/events/tce-event-html5-js-journey-front-end-back-end">27/Feb</a>)</li>
</ul>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Transforming a JavaScript project to CoffeeScript</span></h1>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">First of all, I&#39;m going to change the directory structure, to make it more similar to the Django project directory structure, which I&#39;m used to <img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/teeth_smile.gif" />. I&#39;ll move the static resources to a static folder, which will include the output of the CoffeeScript compilation. The references to the the static files in our HTML file need to be updated, to reflect the new directory structure (WebStorm does this refactoring transparently). I&#39;ll add a folder for the 1st module of the application, which I&#39;ll call model_app. Inside it, I&#39;ll add 3 CoffeeScript source files, corresponding to the 3 JavaScript source files in the application:</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; "><img alt="" height="633" src="/files/dir.png" width="670" /></p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">Next, in order to transform the existing JavaScript files, I&#39;ll start with an automatic translation tool: <a href="http://Js2Coffee.org">Js2Coffee.org</a>:</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; "><img alt="" height="670" src="/files/js2coffee.png" width="721" /></p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">The CoffeeScript code the tool generates is a straight-forward translation, which won&#39;t utilize all the expressive power of CoffeeScript, mainly because it merely reflects the idioms of JavaScript, translated to CoffeeScript. So, after the automatic translation, we&#39;ll need to go over the code &amp; add the improved idioms of CoffeeScript, such as:</p>
<ul>
	<li>
		String formatting</li>
	<li>
		List comprehensions</li>
	<li>
		Using &quot;do&quot; when creating closures</li>
	<li>
		Using the &quot;extends&quot; keyword, instead of an &quot;extend&quot; method (such as the one in Backbone.js)</li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Another thing we&#39;ll need to do, is to fix any improper use of the global namespace we had in the JavaScript implementation. CoffeeScript prevents this by wrapping any code with a function. The common best-practice in JavaScript is to define a single container in the global namespace, in which you place all of your &quot;global&quot; resources. CoffeeScript enables you to do this by using the &quot;exports&quot; command. So, in our models source file, we would like to expose the classes &amp; models like this:</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
exports = this
exports.Class = Class
exports.current_diagram = new ClassDiagram&nbsp;</pre>
<p>&nbsp;</p>
<p>&quot;this&quot; will refer to the global namespace, which in our case is the browser &quot;window&quot;.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>So, the initial CoffeeScript source files look like this:</p>
<p>&nbsp;</p>
<h2>
	<strong>models.coffee:</strong></h2>
<pre class="brush: jscript;" title="code">
class DiagramElement extends Backbone.Model
  defaults:
    x: 0
    y: 0
    width: 40
    height: 100

class Class extends DiagramElement
  defaults:
    name: &quot;&quot;
    super_classes: []
    public_methods: []
    private_methods: []

  get_all_members: =&gt;
    result = []
    name = @get(&quot;name&quot;)
    if @get(&quot;super_classes&quot;).length &gt; 0
      name += &quot; : &quot;
      name += @get(&quot;super_classes&quot;).join(&quot;,&quot;)
    result.push name
    _.each @get(&quot;public_methods&quot;), (n) -&gt;
      result.push n

    _.each @get(&quot;private_methods&quot;), (n) -&gt;
      result.push n

    result

class ClassDiagram extends Backbone.Collection
  model: Class
  source: &quot;&quot;
  get_classes: =&gt;
    (model.get &#39;name&#39; for model in @models)

exports = this
exports.Class = Class
exports.current_diagram = new ClassDiagram</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	controllers.coffee:</h2>
<pre class="brush: jscript;" title="code">
create_parser = -&gt;
  previous_source = &quot;&quot;
  current_class = &quot;&quot;
  current_super_classes = []
  members_map =
    &quot;+&quot;: []
    &quot;-&quot;: []

  add_class = -&gt;
    cls = new Class(
      name: current_class
      super_classes: _.clone(current_super_classes)
      public_methods: _.clone(members_map[&quot;+&quot;])
      private_methods: _.clone(members_map[&quot;-&quot;])
    )
    existing_class = current_diagram.find((c) -&gt;
        c.get(&quot;name&quot;) is cls.name
    )
    if existing_class
      existing_class.set cls
    else
      current_diagram.add cls
    current_class = &quot;&quot;
    current_super_classes = []
    members_map[&quot;+&quot;] = []
    members_map[&quot;-&quot;] = []

  -&gt;
    source = $(&quot;#source_input&quot;).val()
    unless source is previous_source
      previous_source = source
      lines = source.split(&quot;\n&quot;)
      _.each lines, (line) -&gt;
        return  if line.trim().length is 0
        first_char = line.charAt(0)
        if members_map[first_char]
          members_map[first_char].push line.substr(1)
        else
          add_class()  unless current_class is &quot;&quot;
          if line.indexOf(&quot;:&quot;) &gt;= 0
            parts = line.split(&quot;:&quot;)
            current_class = parts[0].trim()
            current_super_classes = parts[1].trim().split(&quot;,&quot;)
          else
            current_class = line

      add_class()

$ -&gt;
  drawer = new ClassDiagramDrawer
  drawer.init()
  parse = create_parser()
  $(&quot;a[data-toggle=\&quot;tab\&quot;]&quot;).on &quot;shown&quot;, (e) -&gt;
    parse()

  current_diagram.on &quot;add&quot;, drawer.draw_class, drawer</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	views.coffee:</h2>
<pre class="brush: jscript;" title="code">
class ClassDiagramDrawer
  svg: null
  current_offset: 0
  default_class_width: 150
  default_member_height: 20
  default_member_spacing: 20
  class_containers: {}
  init: -&gt;
    w = 675
    h = 360
    pack = d3.layout.pack().size([ w - 4, h - 4 ]).value((d) -&gt;
        d.size
    )
    @svg = d3.select(&quot;#chart&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, w).attr(&quot;height&quot;, h).attr(&quot;class&quot;, &quot;pack&quot;).append(&quot;g&quot;).attr(&quot;transform&quot;, &quot;translate(2, 2)&quot;)

  draw_class: (model) -&gt;
    data = model.get_all_members()
    x = @current_offset
    y = 50
    margin = 10
    g = @svg.append(&quot;g&quot;).attr(&quot;x&quot;, x).attr(&quot;y&quot;, y)
    @class_containers[model.get(&quot;name&quot;)] = g
    g.append(&quot;rect&quot;).attr(&quot;x&quot;, x).attr(&quot;y&quot;, y).attr(&quot;width&quot;, @default_class_width).attr &quot;height&quot;, data.length * @default_member_height
    that = this
    g.selectAll(&quot;text&quot;).data(data).enter().append(&quot;text&quot;).attr(&quot;x&quot;, x + margin).attr(&quot;y&quot;, (d, i) -&gt;
        y + margin + i * that.default_member_height
    ).attr(&quot;dy&quot;, &quot;.35em&quot;).text String
    g.append(&quot;line&quot;).attr(&quot;x1&quot;, x).attr(&quot;y1&quot;, y + @default_member_height).attr(&quot;x2&quot;, x + @default_class_width).attr &quot;y2&quot;, y + @default_member_height
    @current_offset += @default_class_width + @default_member_spacing

exports = this
exports.ClassDiagramDrawer = ClassDiagramDrawer</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Compiling the code</span></h1>
<p>&nbsp;</p>
<p>First of all we need to install CoffeeScript, which provides the <strong>coffee</strong> executable for compiling the source files. The installation is done using npm - the Node.js package manager, so you&#39;ll need to install the latest version of Node.js &amp; npm. You can find&nbsp;<a href="http://coffeescript.org/#installation">more info</a>&nbsp;in the CoffeeScript web site.</p>
<p>&nbsp;</p>
<p>Once you have CoffeeScript installed, the command for compiling our source folder to the static folder is:<br />
	<strong>coffee --compile --output static/js model_app</strong></p>
<p>&nbsp;</p>
<p>Note that although our code depends on 3rd-party libraries, they aren&#39;t required for the compilation, which is straight-forward lexical compilation.&nbsp;</p>
<p>&nbsp;</p>
<p>We don&#39;t want to manuallly compile the source files each time we make a change, so luckily the coffee executable comes with another option &quot;-w&quot; for watching the source folder for changes, &amp; compiling any file whenever it changes.&nbsp;CoffeeScript also comes with a build tool, similar to make &amp; rake, called <em><strong>cake</strong></em>. To use it, you need to create a file named Cakefile, in which you define your build &amp; managament tasks. Let&#39;s add a Cakefile with 2 tasks for now: build &amp; watch:</p>
<p>&nbsp;</p>
<h2>
	Cakefile:</h2>
<pre class="brush: jscript;" title="code">
fs = require &#39;fs&#39;

{print} = require &#39;util&#39;
{spawn} = require &#39;child_process&#39;


build = (callback) -&gt;
  coffee = spawn &#39;coffee&#39;, [&#39;-c&#39;, &#39;-o&#39;, &#39;static/js&#39;, &#39;model_app&#39;]
  coffee.stderr.on &#39;data&#39;, (data) -&gt;
    process.stderr.write data.toString()
  coffee.stdout.on &#39;data&#39;, (data) -&gt;
    process.stdout.write data.toString()
  coffee.on &#39;exit&#39;, (code) -&gt;
    callback?() if code is 0


task &#39;build&#39;, &#39;Build model_app&#39;, -&gt;
  build()


watch = (callback) -&gt;
  coffee = spawn &#39;coffee&#39;, [&#39;-w&#39;, &#39;-c&#39;, &#39;-o&#39;, &#39;static/js&#39;, &#39;model_app&#39;]
  coffee.stderr.on &#39;data&#39;, (data) -&gt;
    process.stderr.write data.toString()
  coffee.stdout.on &#39;data&#39;, (data) -&gt;
    process.stdout.write data.toString()
  coffee.on &#39;exit&#39;, (code) -&gt;
    callback?() if code is 0


task &#39;watch&#39;, &#39;Watch model_app and compile when it changes&#39;, -&gt;
  watch()
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>To compile the code, whenever it changes, run this command:</p>
<p><strong>cake watch</strong></p>
<p>&nbsp;</p>
<p><img alt="" height="488" src="/files/cake.png" width="585" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Note that there are more structured ways to make the build, for example using <a href="https://github.com/sstephenson/stitch">Stitch</a> &amp; <a href="https://github.com/maccman/hem">Hem</a>, which use the best-practices of Node.js library packaging, &amp; also bundle the output javascript together into a single file. They also enable you to include the build process in the request/response cycle, so that there&#39;s no need for build, but this requires us to have a server back-end, which is something we&#39;re trying to avoid..</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Next..</span></h1>
<p>&nbsp;</p>
<p>Now that the source code is shorter &amp; cleaner, I can&#39;t wait for the next post to start adding functionality to the application, such as graphical relations &amp; persistence. I also noticed that in the hurry of writing the previous post, I completely forgot to use Backbone.js Views, e.g., for the diagram widget. Next time.</p>
<p>&nbsp;</p>
