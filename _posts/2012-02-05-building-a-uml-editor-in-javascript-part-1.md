---
layout: post
title: Building a UML editor in JavaScript - part 1
created: 1328477270
author: udib
permalink: building-a-uml-editor-in-javascript-part-1
tags:
- JS
- backbone.js
- bootstrap
- d3.js
- frameworks
- HTML5
- uml
---
<p>This is part 1 of a series exploring how to build a full-pledged UML editor in pure JavaScript.&nbsp;</p>
<p>&nbsp;</p>
<!-- ^ Position is not set to relative / absolute here because of Mozilla -->
<h1>
	<span style="color: #990000;font-size: 116%;font-family: SansSerif, sans-serif; ">Why JavaScript</span></h1>
<p><span style="color: #111111;">I really love Python &amp; its wonderful frameworks - they brought me pure joy &amp; satisfaction for the past 6 years.</span></p>
<p><span style="color: #111111;">However, I&#39;m forced to acknowledge that <a href="http://www.youtube.com/watch?v=mYQZSDOWwww">the times they are a-changin</a>: logic moves back to the client-side, leaving the server-side to do almost nothing (just data access, usually). Further more, the server side turned into a series of disporate API&#39;s, which the client consumes, provided by different vendors - so now even the data access moves to the client, which talks directly with datastore providers.</span></p>
<p>&nbsp;</p>
<p><span style="color: #111111;">The lingua-franca of the client-side, available anywhere there&#39;s a browser, is JavaScript. And, when I needed to write some very scalable server-side service, I also found JavaScript (node.js) doing a really great job even there.</span></p>
<p><span style="color: #111111;">With HTML5, there&#39;s no limitation to the abilities of JavaScript on the client-side.</span></p>
<p>&nbsp;</p>
<p><span style="color: #111111;">In addition, the platform of computing is going thru an even larger change: mobile devices talking with cloud back-ends. I don&#39;t know whether the mobile-specific platforms will remain the mobile client-side technology, or the open-stack of the Web will arrive to the client. Time will tell.</span></p>
<p>&nbsp;</p>
<h1>
	<span style="color: #990000;font-size: 116%;font-family: SansSerif, sans-serif; ">The application</span></h1>
<p><span style="color: #111111;">So, in this series I will develop an application in pure JavaScript, for Web &amp; Mobile platforms.&nbsp;</span></p>
<p><span style="color: #111111;">I do design very often, but don&#39;t have a UML editor that works for me: either they&#39;re not cloud-based &amp; don&#39;t support collaboration, or they&#39;re too unusable, or just costing too much money.</span></p>
<p><span style="color: #111111;">So, I&#39;ll try to develop in this series a simple UML editor, which is</span></p>
<ul>
	<li>
		Cloud-based</li>
	<li>
		Supports real-time collaboration</li>
	<li>
		Works well on tablet &amp; mobile</li>
	<li>
		Free &amp; open-source</li>
</ul>
<p>&nbsp;</p>
<p>Mock-up of the application:</p>
<p>&nbsp;<img alt="" height="570" src="/files/mock1(2).jpg" width="858" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="color: #111111;">Regarding the application name:&nbsp;</span><span style="color: #111111;">the main consideration for a name should obviously be SEO - how easy it will be to find it in Google.</span><span style="color: rgb(17, 17, 17); ">&nbsp;So, given this imperative consideration,</span><span style="color: rgb(17, 17, 17); ">&nbsp;I came up with the name: </span><strong><span style="color: rgb(17, 17, 17); ">model&nbsp;<img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" /></span></strong></p>
<p>&nbsp;</p>
<p><span style="color: #111111;">It&#39;s going to be pure client-side app - all static files downloaded from CDN to the client</span> <span style="color: #111111;">The app will consume remote 3rd-party API&#39;s, for example, a remote storage for persistence.</span> <span style="color: #111111;">Using a tool such as PhoneGap, I&#39;ll try to make it usable also as a Mobile app.</span> <span style="color: #111111;">Of course a pure MVC will be enforced: clear separations between data, business logic &amp; presentation</span>&nbsp;.</p>
<p>&nbsp;</p>
<p><a href="http://gopollgo.com/if-you-were-given-the-task-of-writing-a-uml-editor-which-languages-would-you-use" style="line-height: 28px; ">If you were given the task of writing a UML editor, which languages would you use?</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	<span style="color: #990000;font-size: 116%;font-family: SansSerif, sans-serif; ">Initial survey</span></h1>
<p>&nbsp;</p>
<p><span style="color: #111111;">Before starting out I&#39;ve sent a couple of colleagues a survey, asking them about their activities &amp; needs in respect to UML.&nbsp;</span><span style="color: rgb(17, 17, 17); ">The idea is to try understand who will be the 1st users of the editor (except for myself) &amp; how to make it useful for them.</span></p>
<p><span style="color: #111111;">You can see (&amp; fill out) the survey <a href="https://docs.google.com/spreadsheet/viewform?formkey=dGdoS1V0czFPb1MtNTdCTFF2UlBqUEE6MQ">here</a>.</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>I received some 7 responses, from which I&#39;ve learnt that:<br />
	&nbsp;</p>
<ul>
	<li>
		&nbsp;Usage<span style="color: rgb(17, 17, 17); ">:</span>&nbsp;<span style="color: rgb(17, 17, 17); ">A third of the responders use it often (every week).&nbsp;</span><span style="color: rgb(17, 17, 17); ">A third uses it once a month or few.&nbsp;</span><span style="color: rgb(17, 17, 17); ">Another third don&#39;t use UML at all.</span></li>
	<li>
		&nbsp;Tools<span style="color: rgb(17, 17, 17); ">:</span>&nbsp;<span style="color: #111111;">Half of the users use desktop tools (</span><span style="color: #111111;">StarUML, Sparx, OpenOffice, Violet).&nbsp;</span><span style="color: #111111;">Another hald uses online tools (</span><span style="color: #111111;">WebSequenceDiagrams, Google Docs).&nbsp;</span><span style="color: rgb(17, 17, 17); ">Many said they also use paper &amp; whiteboard.</span></li>
	<li>
		&nbsp;Diagram types<span style="color: rgb(17, 17, 17); ">:</span>&nbsp;<span style="color: #111111;">Most use&nbsp;</span><span style="color: #111111;">Class diagram,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Sequence diagram &amp;</span>&nbsp;<span style="color: rgb(17, 17, 17); ">Use-case.&nbsp;</span><span style="color: #111111;">Also:</span><span style="color: #111111;">&nbsp;Activity,&nbsp;</span><span style="color: rgb(17, 17, 17); ">State,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Relationship,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Work-flow.</span></li>
	<li>
		&nbsp;Activities<span style="color: #111111;">:</span>&nbsp;<span style="color: #111111;">Almost everyone:</span><span style="color: #111111;">&nbsp;Embed diagrams in design documents,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Present them in design reviews,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Collaborate on them with others.&nbsp;</span><span style="color: #111111;">Also:</span><span style="color: #111111;">&nbsp;Save them in the repository,&nbsp;</span><span style="color: rgb(17, 17, 17); ">Revise them when design changes.&nbsp;</span></li>
	<li>
		&nbsp;Problems &amp; needs<span style="color: #111111;">:</span>&nbsp;<span style="color: #111111;">People expressed the need for online editor.&nbsp;</span><span style="color: #111111;">Another requested feature is reverse engineering from existing source repository</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</li>
</ul>
<h2>
	&nbsp;</h2>
<h2>
	<font color="#990000" face="SansSerif, sans-serif"><span style="font-size: 21px;">Decisions</span></font></h2>
<p>&nbsp;</p>
<h2>
	<span style="color: #111111;font-family: SansSerif, sans-serif; ">Possible frameworks &amp;&nbsp;technologies</span></h2>
<p>&nbsp;</p>
<p>I made a check-list of frameworks &amp; technologies that I&#39;d like to use in this app:</p>
<ul>
	<li>
		<strong>CoffeeScript</strong> - a high-level language that compiles into JavaScript, &amp;&nbsp;abstracts some of the difficult &amp; bad parts of the language</li>
	<li>
		<strong>BrowserID</strong> - an email-based authentication mechanism by Mozilla</li>
	<li>
		<strong>RemoteStorage</strong> - a mechanism to store data from JavaScript on remote providers</li>
	<li>
		<strong>Datastore providers</strong>:<span style="color: #111111;font-family: SansSerif, sans-serif; ">&nbsp;<a href="http://www.iriscouch.com/">IrisCouch</a></span></li>
	<li>
		<strong>Backbone.js</strong> - a popular MVC framework for javascript</li>
	<li>
		<strong>Backbone.dualStorage</strong> - for Backbone storage on both local (HTML5) &amp; remote storage</li>
	<li>
		<strong>Backbone.boilerplate</strong> - template utilities for Backbone</li>
	<li>
		<strong>Underscore.js</strong> - clean&nbsp;&amp;&nbsp;feature-rich JavaScript framework</li>
	<li>
		<strong><span style="color: #111111;font-family: SansSerif, sans-serif; ">d3.js</span></strong><span style="color: #111111;font-family: SansSerif, sans-serif; "> - data-driven visualization framework</span></li>
	<li>
		<strong>Bootstrap2</strong> - HTML5 template</li>
	<li>
		<strong>Uijet</strong> - UI&nbsp;widgets framework</li>
	<li>
		<a href="http://faye.jcoglan.com/"><strong>Faye</strong></a><strong> &amp; </strong><a href="http://learnboost.github.com/kue/"><strong>Kue</strong></a>- for real-time collaboration</li>
	<li>
		<strong>Selenium2</strong>&nbsp;- unit-tests framework for JavaScript * Sauce Labs - hosted service for cross-browser testing using Selenium</li>
	<li>
		<strong>PhoneGap</strong> - framework for generatubg mobile editions of a Web app</li>
	<li>
		<a href="http://code.google.com/speed/pss/"><strong>Google Page Speed</strong></a>- for optimizing loading &amp;&nbsp;performance</li>
	<li>
		<strong>Google Analytics</strong> -&nbsp;<span style="color: rgb(17, 17, 17); font-family: SansSerif, sans-serif; ">Provide the analytics on a client-side app</span></li>
	<li>
		<span style="color: rgb(17, 17, 17); font-family: SansSerif, sans-serif; "><strong>CloudBees</strong> - Continuous&nbsp;<span style="color: rgb(17, 17, 17); font-family: SansSerif, sans-serif; ">Integration &amp; Testing</span></span></li>
	<li>
		<p>??? - Hosting &amp; continuous deployment</p>
	</li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	<span style="color: rgb(17, 17, 17); font-family: SansSerif, sans-serif; ">Code hosting &amp; IDE</span></h2>
<p>&nbsp;</p>
<p><strong>BitBucket - source hosting</strong><br />
	Since I prefer mercurial, I usually host my projects on BitBucket. The source code can be found in: <span style="color: #111111;font-family: SansSerif, sans-serif; "><a href="https://bitbucket.org/dibau/model">https://bitbucket.org/dibau/model</a></span></p>
<p>&nbsp;</p>
<p><strong>WebStorm - IDE</strong><br />
	<span style="color: #111111;"><span style="color: #111111;">This full-pledged JavaScript IDE is based on JetBrains&#39; Java IDE: IntelliJ IDEA.&nbsp;</span></span></p>
<p><span style="color: #111111;">The main advantage of using it is the amazing intelligence it has in understanding code, detecting errors &amp; enabling refactoring</span></p>
<p><span style="color: #111111;">I prefer it on any other IDE on this sole ground: especially with dynamic languages, it&#39;s crucial to have an editor that understands your code, &amp; can validate it intelligently</span></p>
<p>&nbsp;</p>
<p><span style="color: #111111;">WebStorm supports debugging of JavaScript ran on the browser from the IDE &amp; comes with many plugins, such as CSS-X-Fire which enables you to update CSS attributes in your browser &amp; automatically update them in your source files.&nbsp;</span><span style="color: #111111;">For example, WebStorm can infer the type of function parameters (which aren&#39;t typed of course) &amp; detect when a call passes parameters of a different type!</span><font color="#111111"><span style="font-size: 15px;"><b> </b></span></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	<font color="#111111" face="SansSerif, sans-serif">Debug &amp; inspection</font></h2>
<p>&nbsp;</p>
<p><strong>Browsers debug console</strong><br />
	<span style="color: #111111;">All modern browser have an interactive console, crucial for debugging &amp; exploratory development</span></p>
<p>&nbsp;</p>
<p><strong>JSFiddle</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<p><span style="color: #111111;">An online tool to experiment with JavaScript &amp; share it with others</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
<p>&nbsp;</p>
<p><strong>JSLint</strong></p>
<p><span style="color: #111111;">This tool by Douglas Corkford (the main guru &amp; reviver of modern JavaScript) to validate the quality &amp; correctness of your JavaScript code</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	<font color="#111111" face="SansSerif, sans-serif">Templates</font></h2>
<p>&nbsp;</p>
<p><span style="color: #111111;">The project can be started with several templates:</span></p>
<p>&nbsp;</p>
<p><strong>Boilerplate</strong><br />
	&nbsp;<span style="color: #111111;">Many nice features for HTML5 support.&nbsp;</span><span style="color: #111111;">Comes with Google Analytics code &amp; also script to install Chrome Frame</span><br />
	<strong>Initializr</strong><br />
	<span style="color: #111111;">Service that let&#39;s you customize the template, which is based on Boilerplate.&nbsp;</span><span style="color: rgb(17, 17, 17); ">Customizing it is a bit annoying - because there are incompatibilities between possible elements, &amp; it takes time to succeed resolving the conflicts.&nbsp;<span style="color: #111111;">Uses the Modernizr framework for detecting &amp; leveraging HTML5 &amp; CSS3</span></span><br />
	<strong>Bootstrap2</strong><br />
	<span style="color: #111111;">Best practices template by Twitter.&nbsp;</span><span style="color: #111111;">Includes both resources &amp; widgets.</span> &nbsp; &nbsp; &nbsp;</p>
<p style="line-height: 21px; "><span style="color: rgb(17, 17, 17); ">All of these templates support the infra to make the app responsive - adapt to different devices (Computer, Tablet, Mobile, TV)</span></p>
<p style="line-height: 21px; ">&nbsp;</p>
<p><span style="color: #111111;">I decided to start with <strong>Bootstrap2</strong>.&nbsp;</span><span style="color: rgb(17, 17, 17); ">We&#39;d also take stuff from Initializr/Biolerplate, such as:&nbsp;</span><span style="color: #111111;">Chrome Frame &amp; Google Analytics</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	&nbsp;</h2>
<h2>
	<span style="color: #990000;font-size: 116%;font-family: SansSerif, sans-serif; ">Design &amp; code</span></h2>
<p>&nbsp;</p>
<p>The initial version of the product is very simple - it let&#39;s you describe classes in text, and draws the corresponding class diagram. Here&#39;s the back-of-the-envelope design:<br />
	<img alt="" height="737" src="/files/quick-design.png" width="1277" /><br />
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<h4>
	<span style="color: #111111;">Main page (app.html)</span></h4>
<p>The application has 1 main page, using Bootstrap2 as templae. The code is straight-forward:</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
  &lt;body&gt;

    &lt;div class=&quot;navbar navbar-fixed-top&quot;&gt;
      &lt;div class=&quot;navbar-inner&quot;&gt;
        &lt;div class=&quot;container-fluid&quot;&gt;
          &lt;a class=&quot;btn btn-navbar&quot; data-toggle=&quot;collapse&quot; data-target=&quot;.nav-collapse&quot;&gt;
            &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;icon-bar&quot;&gt;&lt;/span&gt;
          &lt;/a&gt;
          &lt;a class=&quot;brand&quot; href=&quot;#&quot;&gt;Model&lt;/a&gt;
          &lt;div class=&quot;nav-collapse&quot;&gt;
            &lt;ul class=&quot;nav&quot;&gt;
              &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#about&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#contact&quot;&gt;Contact&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p class=&quot;navbar-text pull-right&quot;&gt;Logged in as &lt;a href=&quot;#&quot;&gt;username&lt;/a&gt;&lt;/p&gt;
          &lt;/div&gt;&lt;!--/.nav-collapse --&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;container-fluid&quot;&gt;
      &lt;div class=&quot;row-fluid&quot;&gt;
        &lt;div class=&quot;span3&quot;&gt;
          &lt;div class=&quot;well sidebar-nav&quot;&gt;
            &lt;ul class=&quot;nav nav-list&quot;&gt;
              &lt;li class=&quot;nav-header&quot;&gt;Project 1&lt;/li&gt;
              &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;#&quot;&gt;Class Diagram 1&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 2&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 3&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 4&lt;/a&gt;&lt;/li&gt;
              &lt;li class=&quot;nav-header&quot;&gt;Project 2&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 1&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 2&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 3&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 4&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 5&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 6&lt;/a&gt;&lt;/li&gt;
              &lt;li class=&quot;nav-header&quot;&gt;Project 3&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 1&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 2&lt;/a&gt;&lt;/li&gt;
              &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Diagram 3&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;&lt;!--/.well --&gt;
        &lt;/div&gt;&lt;!--/span--&gt;
        &lt;div class=&quot;span9&quot;&gt;
          &lt;div class=&quot;hero-unit&quot;&gt;
            &lt;h2&gt;Class Diagram 1&lt;/h2&gt;
            &lt;p&gt;This is the diagram description.&lt;/p&gt;
          &lt;/div&gt;

            &lt;ul id=&quot;tab&quot; class=&quot;nav nav-tabs&quot;&gt;
                &lt;li class=&quot;active&quot;&gt;&lt;a href=&quot;#diagram&quot; data-toggle=&quot;tab&quot;&gt;Diagram&lt;/a&gt;&lt;/li&gt;
                &lt;li class=&quot;&quot;&gt;&lt;a href=&quot;#source&quot; data-toggle=&quot;tab&quot;&gt;Source&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
            &lt;div id=&quot;myTabContent&quot; class=&quot;tab-content&quot;&gt;
                &lt;div class=&quot;tab-pane fade active in&quot; id=&quot;diagram&quot;&gt;
                    &lt;div id=&quot;chart&quot; style=&quot;width: 675px; height: 360px;&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class=&quot;tab-pane fade&quot; id=&quot;source&quot;&gt;
                    &lt;div&gt;
                        &lt;textarea id=&quot;source_input&quot; rows=&quot;20&quot; style=&quot;width: 675px; height: 341px;&quot;&gt;&lt;/textarea&gt;
                        &lt;p class=&quot;muted&quot; style=&quot;float: right;&quot;&gt;
                            For example:&lt;br/&gt;&lt;br/&gt;
                            Class1 : BaseClass1&lt;br/&gt;
                            +method1&lt;br/&gt;
                            +method2&lt;br/&gt;
                            -method3&lt;br/&gt;
                            &lt;br/&gt;
                            Class2 : BaseClass2&lt;br/&gt;
                            +method1&lt;br/&gt;
                            +method2&lt;br/&gt;
                            -method3&lt;br/&gt;
                        &lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

        &lt;/div&gt;&lt;!--/span--&gt;
      &lt;/div&gt;&lt;!--/row--&gt;

      &lt;hr&gt;

      &lt;footer&gt;
        &lt;p&gt;(cc) Model UML editor 2012&lt;/p&gt;
      &lt;/footer&gt;

    &lt;/div&gt;&lt;!--/.fluid-container--&gt;
</pre>
<p>&nbsp; &nbsp;</p>
<h4>
	<span style="color: #111111;">JavaScript models (model-models.js)</span></h4>
<p>The 1st interesting place is the JavaScript in which the Backbone.js models are defined. There&#39;s a simple base class (DiagramElement), a class that extend it (Class) for representing classes, &amp; a collection of classes (ClassDiagram).</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
var DiagramElement = Backbone.Model.extend({
    defaults: {
        &quot;x&quot;: 0,
        &quot;y&quot;: 0,
        &quot;width&quot;: 40,
        &quot;height&quot;: 100
    }
});

var Class = DiagramElement.extend({
    defaults: {
        &quot;name&quot;: &quot;&quot;,
        &quot;super_classes&quot;: [],
        &quot;public_methods&quot;: [],
        &quot;private_methods&quot;: []
    },
    get_all_members: function () {
        var result = [];
        var name = this.get(&#39;name&#39;);
        if (this.get(&#39;super_classes&#39;).length &gt; 0) {
            name += &quot; : &quot;;
            name += this.get(&#39;super_classes&#39;).join(&quot;,&quot;)
        }
        result.push(name);
        _.each(this.get(&#39;public_methods&#39;), function(n) { result.push(n); });
        _.each(this.get(&#39;private_methods&#39;), function(n) { result.push(n); });
        return result;
    }
});


var ClassDiagram = Backbone.Collection.extend({
    model: Class,
    source: &quot;&quot;,
    get_classes: function() {
        var result = [];
        _.each(this.models, function(model) {
            result.push(model.get(&quot;name&quot;));
        });
        return result;
    }
});

var current_diagram = new ClassDiagram();
</pre>
<p>&nbsp; &nbsp;</p>
<h4>
	<span style="color: #111111;">JavaScript controllers (model-controllers.js)</span></h4>
<p>The contoller file contains the parser of the text in which you describe classes. The parser goes over the text &amp; creates Backbone models out of it. Then the controller creates the Drawer, that renders the class diagram, &amp; binds it to the <strong>add</strong> event of the diagram (triggered whenever a new Class is added to the collection).</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
var SourceParser = {

    parse: function() {
        var previous_source = &quot;&quot;,
            current_class = &quot;&quot;,
            current_super_classes = [];

        var members_map = {
            &quot;+&quot;: [],
            &quot;-&quot;: []
        };

        var add_class = function() {
            var cls = new Class({
                &quot;name&quot;: current_class,
                &quot;super_classes&quot;: _.clone(current_super_classes),
                &quot;public_methods&quot;: _.clone(members_map[&quot;+&quot;]),
                &quot;private_methods&quot;: _.clone(members_map[&quot;-&quot;])
            });
            var existing_class = current_diagram.find(function(c) { return c.get(&#39;name&#39;) == cls.name});
            if (existing_class) {
                existing_class.set(cls);
            }
            else {
                current_diagram.add(cls);
            }
            current_class = &quot;&quot;;
            current_super_classes = [];
            members_map[&quot;+&quot;] = [];
            members_map[&quot;-&quot;] = [];
        };

        return function() {
            var source = $(&quot;#source_input&quot;).val();
            if (source != previous_source) {
                previous_source = source;
                var lines = source.split(&quot;\n&quot;);
                _.each(lines, function(line) {
                    if (line.trim().length == 0) return;
                    var first_char = line.charAt(0);
                    if (members_map[first_char]) {
                        members_map[first_char].push(line.substr(1));
                    }
                    else {
                        if (current_class != &quot;&quot;) {
                            add_class();
                        }
                        if (line.indexOf(&quot;:&quot;) &gt;= 0) {
                            var parts = line.split(&quot;:&quot;);
                            current_class = parts[0].trim();
                            current_super_classes = parts[1].trim().split(&quot;,&quot;);
                        }
                        else {
                            current_class = line;
                        }
                    }
                });
                add_class();
            }
        }
    }


};


$(function () {
    drawer.init();

    var parse = SourceParser.parse();

    $(&#39;a[data-toggle=&quot;tab&quot;]&#39;).on(&#39;shown&#39;, function (e) {
        parse();
    });

    current_diagram.on(&quot;add&quot;, drawer.draw_class, drawer);
});
</pre>
<p>&nbsp; &nbsp;</p>
<h4>
	<span style="color: #111111;">JavaScript widgets (model-widgets.js)</span></h4>
<p>The final source file defines the ClassDiagramDrawer, which uses the d3.js library to tramsform the Backbone models into SVG elements. d3.js is a very powerful library, which we&#39;ll explore more deeply in following posts. The main idea is to associate a data array with DOM elements, &amp; create DOM elements for new data.</p>
<p>&nbsp;</p>
<pre class="brush: jscript;" title="code">
var ClassDiagramDrawer = {
    svg: null,
    current_offset: 0,
    default_class_width: 150,
    default_member_height: 20,
    default_member_spacing: 20,
    class_containers: {},

    init: function() {
        var w = 675,
            h = 360;

        var pack = d3.layout.pack()
            .size([w - 4, h - 4])
            .value(function (d) {
                return d.size;
            });

        this.svg = d3.select(&quot;#chart&quot;).append(&quot;svg&quot;)
            .attr(&quot;width&quot;, w)
            .attr(&quot;height&quot;, h)
            .attr(&quot;class&quot;, &quot;pack&quot;)
            .append(&quot;g&quot;)
            .attr(&quot;transform&quot;, &quot;translate(2, 2)&quot;);        
    },
    
    draw_class: function(model) {
        var data = model.get_all_members(),
            x = this.current_offset,
            y = 50,
            margin = 10;

        var g = this.svg.append(&#39;g&#39;)
            .attr(&quot;x&quot;, x)
            .attr(&quot;y&quot;, y);
        this.class_containers[model.get(&#39;name&#39;)] = g;

        g.append(&#39;rect&#39;)
            .attr(&quot;x&quot;, x)
            .attr(&quot;y&quot;, y)
            .attr(&quot;width&quot;, this.default_class_width)
            .attr(&quot;height&quot;, data.length * this.default_member_height);

        var that = this;
        g.selectAll(&quot;text&quot;)
             .data(data)
           .enter().append(&quot;text&quot;)
             .attr(&quot;x&quot;, x + margin)
             .attr(&quot;y&quot;, function(d, i) { return y + margin + i * that.default_member_height; })
             .attr(&quot;dy&quot;, &quot;.35em&quot;) // vertical-align: middle
             .text(String);

        g.append(&quot;line&quot;)
            .attr(&quot;x1&quot;, x)
            .attr(&quot;y1&quot;, y + this.default_member_height)
            .attr(&quot;x2&quot;, x + this.default_class_width)
            .attr(&quot;y2&quot;, y + this.default_member_height);

        this.current_offset += this.default_class_width + this.default_member_spacing;
    }

};

var drawer = ClassDiagramDrawer;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>
	&nbsp;</h3>
<h2>
	<span style="color: rgb(153, 0, 0); font-size: 21px; font-family: SansSerif, sans-serif; ">Screenshots</span></h2>
<h3>
	&nbsp;</h3>
<p>&nbsp;</p>
<p>Finally, here&#39;s how the 1st version looks like:</p>
<p>&nbsp;</p>
<p><img alt="" height="800" src="/files/screenshot1.png" width="1156" /></p>
<p><img alt="" height="800" src="/files/screenshot2(1).png" width="1261" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	<span style="color: #990000;font-size: 116%;font-family: SansSerif, sans-serif; ">Next..</span></h2>
<p>In the next parts, I&#39;ll try to make a real application out of this prototype, &amp; alsp adopt better frameworks &amp; technologies, such as CoffeeScript.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
