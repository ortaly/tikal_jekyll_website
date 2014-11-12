---
layout: post
title: Groovy DSL Tricks
created: 1276861222
author: ittayd
permalink: /java/groovy-dsl-tricks
tags:
- JAVA
- Groovy
---
<p>I&rsquo;ve recently needed to support creating a Groovy DSL that can be called from Java, to allow scripting of some server activities.<span style="mso-spacerun:yes">&nbsp; </span>The aim was to load a file, script.groovy, and run it so that it uses the server&rsquo;s API.</p>
<p>&nbsp;</p>
<p class="MsoNormal">Researching the subject, most articles discuss how to create nicer looking syntax when working from within Groovy. Things like being able to write 5.euro. But in our scenario there were other goals:</p>
<ul style="margin-top:0cm" type="disc">
    <li>Efficiency: on the one      hand being able to change the script while the server is running. On the      other, not paying the parsing &amp; compilation overhead for each call</li>
    <li>Cleanliness: because the      script provides lean customization for the server, we didn&rsquo;t want it to be      cluttered with &ldquo;mechanical issues&rdquo; like import statements, requiring to      use &lsquo;use&rsquo; or mixin statements etc.</li>
    <li>Extensability: easily add      methods to the DSL as well as allow the script to be broken to small parts</li>
</ul>
<p>&nbsp;</p>
<p class="MsoNormal">Here I will describe some of the techniques I&rsquo;ve used to achieve these goals</p>
<h1>DSL Class</h1>
<p class="MsoNormal">When creating a DSL, there are functions/methods that form the DSL. A question is where to define them. All the articles I could find suggested either</p>
<ul style="margin-top:0cm" type="disc">
    <li>Using the builder      mechanism - where a method just creates a node with that name in the      builder, and the structure created is post processed</li>
    <li>Putting methods in the      meta class</li>
</ul>
<p>&nbsp;</p>
<p class="MsoNormal">The former approach requires post processing and limits what can be written in the script, the latter means <span style="mso-spacerun:yes">&nbsp;</span>one need to load the script through a wrapper that will put the methods in the meta class before running the script. It is also tricky to do this from Java/Scala.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The approach I used is to use an undocumented feature of how Groovy loads scripts.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Before going into details, here is how Groovy loads scripts: it reads the script file and then compiles the code to create a JVM class that extends from class Script. It then creates an instance of the class and calls the #run method.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The feature I used is that Groovy allows to create a class so that it extends a custom class. Then that class can contain all our DSL methods (and variables).</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">def</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">create<b>(</b>root<b>:</b></span><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">String<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">parentClass<b>:</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">Class<b>[</b>_<b>])</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">=</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">{</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">config</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">CompilerConfiguration<b>()</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">config<b>.</b>setScriptBaseClass<b>(</b>parentClass<b>.</b>getCanonicalName<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">pcl</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">=</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">GroovyClassLoader<b>(</b>parentClass<b>.</b>getClassLoader<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">config<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#00007F">false</span></b><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">)</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">GroovyScriptEngine<b>(</b>root<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">pcl<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">}</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">dsl</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">=</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">create<b>(</b>root<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">classOf<b>[</b>DslClass<b>]).</b>createScript<b>(</b>name</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">+</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#7F007F">&quot;.groovy&quot;</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">,</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">binding<b>).</b>asInstanceOf<b>[</b>DslClass<b>]</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
9.0pt;font-family:&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;
color:#007F00">// dsl.afterLoad // if there's some method to call before running <o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">dsl<b>.</b>run</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:9.0pt;line-height:115%;font-family:
&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;color:#007F00">// dsl.afterRun // if there's some post processing</span></p>
<p class="MsoNormal"><span style="font-size:9.0pt;line-height:115%;font-family:
&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;color:#007F00"><o:p></o:p></span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">(The methods #afterLoad and #afterRun seen above should be defined in DslClass)</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">There&rsquo;s another alternative: if the bindings of the script contain a Closure, that closure is treated as a method in the script. One can create a subclass of Closure, overriding the methods #call or #call(Object[]).</p>
<p class="MsoNormal">&nbsp;</p>
<h1>Performance</h1>
<p class="MsoNormal">Unfortunately, GroovyScriptEngine takes some time to create, therefore it is best to cache instances based on the root path and parent class.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Another thing is that in the #create method above we can set a target folder for the compiled files so they are not just in-memory. This is done with:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">config<b>.</b>setTargetDirectory<b>(</b></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">File<b>(</b>root<b>,</b></span><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#7F007F">&quot;target&quot;</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">).</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">getPath<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<h1>Modularity</h1>
<p class="MsoNormal">When using scripts for non-trivial code it is nice to allow to separate them. This can be done in Groovy, but only if the separated scripts are treated as full fledged classes. So in root.groovy one can call &lsquo;import another&rsquo;, and have class &lsquo;another&rsquo; created from another.groovy. Then create an instance with &lsquo;new another()&rsquo; <span style="mso-spacerun:yes">&nbsp;</span>and use its methods. This is fine of course, but not very DSLy.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">What I wanted is for loading of other scripts to behave as the loading of the &ldquo;root&rdquo; script: run some code. Another thing was to allow them to modify the original script, to call methods, set variables etc.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The approach is simple. In the DSL, add a #load(name: String) method that creates a script using GroovyScriptEngine, passing it the root in the binding and runs it. In the loaded script, it can use &lsquo;root&rsquo; to call DSL methods, set variables and create new methods.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">def</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">load<b>(</b>path<b>:</b></span><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">String<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">=</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">{</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">binding</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">Binding<b>(</b>getBinding<b>.</b>getVariables<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">binding<b>.</b>setVariable<b>(</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#7F007F">&quot;root&quot;</span><b><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">,</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#B00040">this</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">)</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">gse<b>.</b>run<b>(</b>path</span><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">+</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">&ldquo;.groovy&rdquo;<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">binding<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:115%;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><span style="mso-spacerun:yes">&nbsp;</span></span><b><span style="font-size:10.0pt;
line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">}</span></b></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;
line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black"><o:p></o:p></span></b></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">(where &lsquo;gse&rsquo; is a lazy val that creates a new GroovyScriptEngine, or better yet, gets one from a cache)</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Use as:</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
9.0pt;font-family:&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;
color:#007F00">// in root.groovy<o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">load<b>(</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#7F007F">&quot;subdir/another&quot;</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">)</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
9.0pt;font-family:&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;
color:#007F00">// in subdir/another.groovy<o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">root<b>.</b>someMethod<b>()</b></span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">root<b>.</b>newVariable</span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#007F7F">1</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">def</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">newMethod<b>()</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">{</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:9.0pt;font-family:&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;
color:#007F00">// blah blah<o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">}</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">root<b>.</b>newMethod</span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">this</span></b><b><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">.&amp;</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">newMethod</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<h1>Enhanced Objects</h1>
<p class="MsoNormal">One of the issues I&rsquo;ve encountered was that I wanted to add some methods to existing classes to make it easy to use them in the script. The best way is using DefaultGroovyMethods to mixin a class that adds them. My specific use case, was using XML DOM objects as &lsquo;dom.someTag.text()&rsquo;</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The code:</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">Array<b>(</b>classOf<b>[</b>Node<b>],</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">classOf<b>[</b>NodeList<b>],</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">classOf<b>[</b>NamedNodeMap<b>]</b></span><span style="font-size:9.0pt;font-family:&quot;Comic Sans MS&quot;;mso-bidi-font-family:&quot;Comic Sans MS&quot;;
color:#007F00">/*, classOf[DOMCategory.NodesHolder]*/</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">).</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:black">foreach</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">{</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">cls</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">=&gt;</span></b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">DefaultGroovyMethods<b>.</b>mixin<b>(</b>cls<b>,</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">classOf<b>[</b>DOMCategory<b>])</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:115%;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><span style="mso-spacerun:yes">&nbsp;</span></span><b><span style="font-size:10.0pt;
line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black">}</span></b></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;
line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:black"><o:p></o:p></span></b></p>
<p class="MsoNormal">This code needs to be run once.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">You can see that I&rsquo;m using DOMCategory. Which begs the question of why not use the Groovy &lsquo;use&rsquo; mechanism. This can be done with:</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">closure</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">new</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">Closure<b>(</b>gse<b>)</b></span><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">{</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">override</span></b><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">def</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">call<b>()</b></span><span style="font-size:10.0pt;
font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">{</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:#00007F">val</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">script</span><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">=</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">GroovyJobRunner<b>.</b>gse<b>(</b>root<b>).</b>createScript<b>(</b>params<b>.</b>jobName</span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">+</span></b><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:#7F007F">&quot;.groovy&quot;</span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">,</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">binding<b>).</b>asInstanc<b>-</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">returning<b>(</b>script<b>.</b>run<b>){</b>script<b>.</b>afterRun<b>}</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">}</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span></span><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">}</span></b><span style="font-size:10.0pt;font-family:
&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Verdana;
color:gray"><span style="mso-spacerun:yes">&nbsp;&nbsp; </span></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black">GroovyCategorySupport<b>.</b>use<b>(</b>classOf<b>[</b>DOMCategory<b>],</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"> </span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black">closure<b>)</b></span><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:gray"><o:p></o:p></span></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">This is of course more cumbersome, and also requires calling GroovyCategorySupport#use before every closure invocation. So I&rsquo;m not sure how useful it is.</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p>&nbsp;</p>
