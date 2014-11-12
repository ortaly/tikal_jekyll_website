---
layout: post
title: Building a UML editor in JavaScript - part 3
created: 1331316782
author: udib
permalink: building-a-uml-editor-in-javascript-part-3
tags:
- JS
- uml
- SVG
- HTML5
- CoffeeScript
---
<p>This is part 3 of a series exploring how to build a full-pledged UML editor in JavaScript.&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Getting real</span></h1>
<p>&nbsp;</p>
<p>In the earlier posts&nbsp;we&#39;ve <a href="http://www.tikalk.com/javascript/building-uml-editor-javascript-part-1">built a skeleton UML editor in JavaScript</a>, using Backbone.js &amp; d3.js, and then <a href="http://www.tikalk.com/javascript/building-uml-editor-javascript-part-2">converted it to CoffeeScript</a>, for better &amp; more readable code. There were however several short-comings in the skeleton that needed to be fixed:</p>
<ul>
	<li>
		Out of neglect, I didn&#39;t use <strong>Backbone Views</strong>, so the diagram wasn&#39;t updated on changes</li>
	<li>
		The UML diagram wasn&#39;t a <strong>real class-diagram</strong>, just a few class boxes</li>
	<li>
		I didn&#39;t <strong>deploy the app</strong> anywhere, so you had to download the app to use it</li>
</ul>
<p>&nbsp;</p>
<p>So, in this post I&#39;d like to fix these issues, which will also give me a chance to drill into the frameworks, &amp; explain them using real-life code. In order to deploy the app, I&#39;ll use a simple cloud service called <a href="http://www.stackmob.com">StackMob</a>, that makes deployment a breeze.</p>
<p>&nbsp;</p>
<p>You can play with the deployed app <a href="http://dev.model.udibauman.stackmobapp.com/">here</a>.</p>
<p>&nbsp;</p>
<p><a href="http://dev.model.udibauman.stackmobapp.com/"><img alt="" height="635" src="/files/model-screenshot.png" width="1024" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Getting real with Backbone Views</span></h1>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p>I was implemting the skeleton very quickly, &amp; somehow forgot to use Backbone Views for the widgets rendering the UML. This lead to unorganized code, &amp; also caused the diagram to not update on model changes. So, let&#39;s fix this.</p>
<p>&nbsp;</p>
<p>Backbone Views are objects controlling &amp; managing presentation elements - normally in the DOM. They are not to be confused with the Views in MVC, which are the actual presentation elements. This is part of the main motivation of JavaScript MVC frameworks of decoupling the data &amp; business-logic from the DOM. Backbone Models hold &amp; manage&nbsp;the data, &amp; Backbone Views manage the presentation of the data in the DOM.</p>
<p>&nbsp;</p>
<p>The usual responsibility of Backbone Views is to listen to model events &amp; reflect them in the presentation: create and remove DOM elements, render HTML, and handle user interaction. They are usually organized compositionally - meaning that a container View contains component Views (e.g., List contains Rows).</p>
<p>&nbsp;</p>
<p>So, let&#39;s add 2 Backbone Views: one for the whole Class-Diagram, and one for each Class within it. The 2 classes need to extend Backbone.View. They&#39;re basic structure looks like this:</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
class ClassView extends Backbone.View

  initialize: =&gt;
    @model.on &quot;change&quot;, @render
    @model.on &quot;destroy&quot;, @destroy
    
  render: =&gt;

  destroy: =&gt;


class ClassDiagramView extends Backbone.View
  class_views_by_name: {}
  
  initialize: =&gt;
    @render()
    current_diagram.on &quot;reset&quot;, @clear
    current_diagram.on &quot;add&quot;, @add_class

  render: =&gt;

  clear: =&gt;
  	view.destroy() for name, view of @class_views_by_name
  	@class_views_by_name = {}

  add_class: (model) =&gt;
  	class_view = new ClassView(model: model)
  	class_view.render()
  	@class_views_by_name[model.get &quot;name&quot;] = class_view

</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Backbone Views are initialized in a method called initialize. We use it mainly to bind events to methods. The first view <i>ClassView</i> is initialized with a Backbone Model of a Class, and needs to listen to its <i>change</i> and <i>destroy</i> events. In the <i>render</i> method, we will draw a class box representing the model. The <i>destroy</i> method will remove the elements drawn.</p>
<p>&nbsp;</p>
<p>The second view <i>ClassDiagramView</i> manages several <i>ClassView</i> components, for each class in the diagram. It listens to events in the global <i>current_diagram</i> Backbone Collection. On <i>add</i> it creates a new <i>ClassView</i>, invokes its <i>render</i> method &amp; adds it to a dictionary of children components (<i>class_views_by_name</i>). On <i>reset</i> it invokes the <i>destroy</i> method of each child, &amp; then initializes the children dictionary.</p>
<p>&nbsp;</p>
<p>What&#39;s missing here is the actual code that renders and destroys the class diagram visualization. To understand this code, let&#39;s drill into the framework we&#39;re using for manipulating DOM &amp; SVG elements: <strong>d3.js</strong>.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Getting real with d3.js</span></h1>
<p>&nbsp;</p>
<p><a href="http://mbostock.github.com/d3/">d3.js</a> is a framework for binding data to presentation elements. It&#39;s actually not so easy to grasp, and even after writing the UML visualization I only partially understand it. Why use it then? Because it&#39;s very very powerful, and will save us lots of code.</p>
<p>&nbsp;</p>
<p>The basic usage idiom of d3.js is roughly this:</p>
<ul>
	<li>
		Select an element, using the <i>d3.select</i> method</li>
	<li>
		Assign it an array of data, using the <i>data</i> method</li>
	<li>
		If the data array has more items than the number of elements selected, the <i>enter</i> method will refer to a list of new elements per each unassigned data item</li>
	<li>
		For each of these items we can create new elements using the <i>append</i> method</li>
	<li>
		Finally, we can specify the attributes for each element created, using the <i>attr</i> method.</li>
</ul>
<p>So, for example the following code will create an SVG element under the element with id &quot;chart&quot;, set its <i>width</i>, <i>height</i> &amp; <i>class</i> attributes, and return it to the instance variable called <i>svg</i>:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">

    @svg = d3.select(&quot;#chart&quot;)
      .append(&quot;svg&quot;)
      .attr(&quot;width&quot;, w)
      .attr(&quot;height&quot;, h)
      .attr(&quot;class&quot;, &quot;pack&quot;)
      
</pre>
<p>&nbsp;</p>
<p>In this example, we didn&#39;t have a data array, and simply created a DOM element. We&#39;ll see soon some examples of using data array as well.</p>
<p>&nbsp;</p>
<p>Let&#39;s review the full <i>render</i> method of the <i>ClassDiagramView</i> class, which simply creates the SVG container in which the class diagram will be rendered (using the <i>ClassView</i> components):</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">

  render: =&gt;
    w = 675
    h = 360
    pack = d3.layout.pack()
      .size([ w - 4, h - 4 ])
      .value((d) -&gt; d.size)
    @svg = d3.select(&quot;#chart&quot;)
      .append(&quot;svg&quot;)
      .attr(&quot;width&quot;, w)
      .attr(&quot;height&quot;, h)
      .attr(&quot;class&quot;, &quot;pack&quot;)

    @svg.append(&quot;defs&quot;)
      .selectAll(&quot;marker&quot;)
      .data([&quot;inheritance-arrow&quot;])
      .enter()
      .append(&quot;marker&quot;)
      .attr(&quot;id&quot;, String)
      .attr(&quot;viewBox&quot;, &quot;0 -5 10 10&quot;)
      .attr(&quot;refX&quot;, 10)
      .attr(&quot;refY&quot;, -0.5)
      .attr(&quot;markerWidth&quot;, 10)
      .attr(&quot;markerHeight&quot;, 10)
      .attr(&quot;orient&quot;, &quot;auto&quot;)
      .append(&quot;svg:path&quot;)
      .attr(&quot;d&quot;, &quot;M0,-5L10,0L0,5&quot;)

    @svg = @svg.selectAll(&quot;g&quot;)
      .data([&quot;root&quot;]).enter()
      .append(&quot;g&quot;)
      .attr(&quot;transform&quot;, &quot;translate(2, 2)&quot;)
      
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>After creating the SVG dom element, we start appending to it sub-elements in the SVG language. What is this language?</p>
<p>&nbsp;</p>
<p><a href="http://www.w3schools.com/svg/default.asp">SVG </a>(Scalable Vector Graphics) is a veteran graphic language, specified by the W3C, that enables defining rich &amp; complex graphics using declarative language, similar to HTML. The nice thing is that this language integrates very well inside the DOM, and can embed &amp; be manipulated by JavaScript and CSS just like HTML. It is designed to be both powerful in terms of graphics, but also offer a simple programming model, with concepts such as <i>defs</i>, <i>g</i>, <i>use</i> which enable abstractions and reuse of elements.</p>
<p>&nbsp;</p>
<p>Although SVG exists for more than 10 years, it is considered a part of HTML5, and is supported by all modern browsers. HTML5 contains another graphics element called Canvas, whose programming model is not declarative - you need to write the JavaScript code that renders the graphics, and not just add DOM-like elements as in SVG. When you &quot;Inspect Element&quot; on an SVG, you can see it&#39;s DOM-like elements, &amp; manipulate them, which is something you can&#39;t do in Canvas. Being declarative &amp; inherent part of the DOM is very powerful, but ecause of this, Canvas is considered more suited for visualizations that contain many many elements.</p>
<p>&nbsp;</p>
<p>I will try to drill in more into SVG in later posts.</p>
<p>&nbsp;</p>
<p>Let&#39;s review now the full <strong>views.cofee</strong> file, with the render methods that basically generate the SVG elements for the class boxes and inheritance arrows:</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">


class ClassView extends Backbone.View

  initialize: =&gt;
    @model.on &quot;change&quot;, @render
    @model.on &quot;destroy&quot;, @destroy

  set_context: (context) =&gt;
    @svg = context.svg
    @offset = context.offset
    @default_class_width = context.default_class_width
    @default_member_height = context.default_member_height
    @default_member_spacing = context.default_member_spacing
    @class_views_by_name = context.class_views_by_name

  get_offset: (level) =&gt;
    if not @offset[level]
      @offset[level] = 0
    @offset[level]

  set_offset: (level, offset) =&gt;
    @offset[level] = offset

  render: =&gt;
    data = @model.get_all_members()
    if data.length &lt; 2
      data.push(&quot; &quot;)
      data.push(&quot; &quot;)
    level = @model.get_inheritance_depth()
    y = level * 120 + 20
    x = @get_offset(level)
    h = data.length * @default_member_height
    w = @default_class_width
    margin = 10
    @el = @svg.append(&quot;g&quot;)
      .attr(&quot;x&quot;, x)
      .attr(&quot;y&quot;, y)

    @el.append(&quot;rect&quot;)
      .attr(&quot;x&quot;, x)
      .attr(&quot;y&quot;, y)
      .attr(&quot;rx&quot;, 5)
      .attr(&quot;ry&quot;, 5)
      .attr(&quot;width&quot;, w)
      .attr(&quot;height&quot;, h)
    @el.selectAll(&quot;text&quot;)
      .data(data)
      .enter()
      .append(&quot;text&quot;)
      .attr(&quot;x&quot;, x + margin)
      .attr(&quot;y&quot;, (d, i) =&gt; y + margin + i * @default_member_height)
      .attr(&quot;dy&quot;, &quot;.35em&quot;)
      .text String
    @el.append(&quot;line&quot;)
      .attr(&quot;x1&quot;, x)
      .attr(&quot;y1&quot;, y + @default_member_height)
      .attr(&quot;x2&quot;, x + @default_class_width)
      .attr(&quot;y2&quot;, y + @default_member_height)
    @set_offset level, x + @default_class_width + @default_member_spacing

    @top_connect_point =
        x: x + w/2
        y: y

    @bottom_connect_point =
        x: x + w/2
        y: y + h

    if @model.has_super()
      for sc in @model.get &quot;super_classes&quot;
        super_view = @class_views_by_name[sc]
        points = []
        points[0] = x: @top_connect_point.x, y: @top_connect_point.y
        points[1] = x: super_view.bottom_connect_point.x, y: super_view.bottom_connect_point.y
        path_d = &quot;M&quot; + points[0].x + &quot;,&quot; + points[0].y
        path_d += &quot; C&quot; + points[0].x + &quot;,&quot; + (points[0].y-50)
        path_d += &quot; &quot; + points[1].x + &quot;,&quot; + (points[1].y+50)
        path_d += &quot; &quot; + points[1].x + &quot;,&quot; + points[1].y
        # TODO use d3.js helper functions
        @el.append(&quot;path&quot;)
          .attr(&quot;d&quot;, path_d)
          .attr(&quot;stroke&quot;, &quot;black&quot;)
          .attr(&quot;stroke-width&quot;, &quot;0.75px&quot;)
          .attr(&quot;fill&quot;, &quot;none&quot;)
          .attr(&quot;marker-end&quot;, &quot;url(#inheritance-arrow)&quot;)

    return @

  destroy: =&gt;
    @svg[0][0].removeChild(@el[0][0])


class ClassDiagramView extends Backbone.View
  svg: null
  class_views_by_name: {}
  current_offset: {}
  default_class_width: 150
  default_member_height: 20
  default_member_spacing: 20

  initialize: =&gt;
    @render()
    current_diagram.on &quot;reset&quot;, @clear
    current_diagram.on &quot;add&quot;, @add_class

  render: =&gt;
    w = 675
    h = 360
    pack = d3.layout.pack()
      .size([ w - 4, h - 4 ])
      .value((d) -&gt; d.size)
    @svg = d3.select(&quot;#chart&quot;)
      .append(&quot;svg&quot;)
      .attr(&quot;width&quot;, w)
      .attr(&quot;height&quot;, h)
      .attr(&quot;class&quot;, &quot;pack&quot;)

    @svg.append(&quot;defs&quot;)
      .selectAll(&quot;marker&quot;)
      .data([&quot;inheritance-arrow&quot;])
      .enter()
      .append(&quot;marker&quot;)
      .attr(&quot;id&quot;, String)
      .attr(&quot;viewBox&quot;, &quot;0 -5 10 10&quot;)
      .attr(&quot;refX&quot;, 10)
      .attr(&quot;refY&quot;, -0.5)
      .attr(&quot;markerWidth&quot;, 10)
      .attr(&quot;markerHeight&quot;, 10)
      .attr(&quot;orient&quot;, &quot;auto&quot;)
      .append(&quot;svg:path&quot;)
      .attr(&quot;d&quot;, &quot;M0,-5L10,0L0,5&quot;)

    @svg = @svg.selectAll(&quot;g&quot;)
      .data([&quot;root&quot;]).enter()
      .append(&quot;g&quot;)
      .attr(&quot;transform&quot;, &quot;translate(2, 2)&quot;)

  clear: =&gt;
    view.destroy() for name, view of @class_views_by_name
    @class_views_by_name = {}
    @current_offset = {}

  add_class: (model) =&gt;
    class_view = new ClassView(model: model)
    class_view.set_context
      svg:                    @svg
      offset:                 @current_offset
      default_class_width:    @default_class_width
      default_member_height:  @default_member_height
      default_member_spacing: @default_member_spacing
      class_views_by_name:    @class_views_by_name
    class_view.render()
    @current_offset = class_view.offset
    @class_views_by_name[model.get &quot;name&quot;] = class_view

view = new ClassDiagramView


</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>You&#39;ll notice that in order for the visualization to work, I added some methods also to the <i>Class</i> model, such as: <i>get_inheritance_depth()</i> which is used to set the <i>y</i> position of each class box. The implementation of these methods is quite straight forward, so here&#39;s the full code of the <strong>models.cofee</strong> file:</p>
<p>&nbsp;</p>
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

  has_super: =&gt;
    @get(&quot;super_classes&quot;).length &gt; 0

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

  get_super_classes: =&gt;
    return (@collection.find_by_name(name) for name in @get(&quot;super_classes&quot;))

  get_inheritance_depth: =&gt;
    if @get(&quot;super_classes&quot;).length &gt; 0
      supers_depth = (s.get_inheritance_depth() for s in @get_super_classes())
      supers_max = Math.max supers_depth...
      return supers_max + 1
    0

class ClassDiagram extends Backbone.Collection
  model: Class
  source: &quot;&quot;
  get_classes: =&gt;
    (model.get &#39;name&#39; for model in @models)

  find_by_name: (name) =&gt;
    # TODO use the Backbone.Collection find method
    for m in @models
      if m.get(&quot;name&quot;) is name
        return m
    null

exports = this
exports.Class = Class
exports.current_diagram = new ClassDiagram


</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Deploying the app</span></h1>
<p>&nbsp;</p>
<p>The final thing we want to fix is the fact that our app wasn&#39;t deployed anywhere for you to try it. My initial idea was just to throw the static files unto some CDN&#39;ed cloud storage service, such as Amazon S3. However, since I&#39;m using version control, I wished for some better cloud service, that integrates with my VCS. I considered using Heroku, which is very easy to use, integrates great with version control systems, and even supports Node.js and CoffeeScript. But I chose not to use it, because it is intended for Client-Server web apps, and my app is client-side only.</p>
<p>&nbsp;</p>
<p>So, I decided to try a simple PaaS service called StackMob, intended primarily to serve Mobile apps, but also supporting HTML5 apps, and even Backbone. It seems to be inspired by Heroku, and offers also integration with version control, namely GitHub.</p>
<p>&nbsp;</p>
<p>My initial version control system was Mercurial, hosted in the BitBucket service, but since StackMob (&amp; many other services) integrate so well with GitHub, I decided to migrate the repository to Git &amp; GitHub. You can find it now in: <a href="https://github.com/dibaunaumh/model">https://github.com/dibaunaumh/model</a>.</p>
<p>&nbsp;</p>
<p>The steps for using StackMob are:</p>
<ol>
	<li>
		Sign up to the service</li>
	<li>
		Enter an application name</li>
	<li>
		Choose HTML5 platform</li>
	<li>
		Click &quot;Manage HTML5&quot; in the side menu</li>
	<li>
		Click on the button &quot;Link StackMob with GitHub&quot;:
		<p><img alt="" height="866" src="/files/link_github.png" width="1097" /></p>
	</li>
	<li>
		Authorize StackMob in GitHub</li>
	<li>
		Choose your repository in GitHub</li>
	<li>
		You&#39;ll get a screen saying that your app is now deployed, using the latest commit in GitHub.</li>
	<li>
		You&#39;ll find in the middle of this page a token and instructions on how to setup a hook in GitHub, so that each push to GitHub will update your app.</li>
</ol>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>And that&#39;s it. We now have our app deployed in: <a href="http://dev.model.udibauman.stackmobapp.com/">http://dev.model.udibauman.stackmobapp.com/</a></p>
<p>&nbsp;</p>
<h1 style="margin-top: 10px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; top: 0px; position: relative; left: 0px; font-size: 16px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(128, 128, 128); font-weight: bold; text-decoration: none; width: 600px; overflow-x: hidden; overflow-y: hidden; clear: left; ">
	<span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(153, 0, 0); font-size: 19px; font-family: SansSerif, sans-serif; ">Next..</span></h1>
<p>&nbsp;</p>
<p>In the next post we&#39;ll use other services of StackMob, mainly as Persistence layer of our UML models - StackMob offers a simple integration to Backbone.js, that enable you to persist your Backbone models to their storage backend. That will be quite interesting, because persistence was so far the main reason for having a Server back-end for Client-centric Web apps, and using a 3rd-party Data store service (such as StackMob or <a href="http://www.iriscouch.com/">IrisCouch</a>) means we don&#39;t need to write &amp; maintain&nbsp;any backend.&nbsp;</p>
<p>&nbsp;</p>
