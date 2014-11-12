---
layout: post
title: Parsley dependency injection memory leak
created: 1273441637
permalink: parsley-dependency-injection-memory-leak
tags:
- JS
- Spicefactory
- parsley
- memory leak
- getObject
---
<p>In short:<br />
When using Parsley's Context for dependency injection, You should call destroyObject() on each getObject() call, otherwise you may have a memory leak.<br />
&nbsp;<br />
Long story:<br />
Lately I was dealing with some memory leaks issues in one of our client's systems which use Parsley for dependency injection via its Context .<br />
Turns out that calling Context.getObject(id) internally creates references to the objects used for creating the injected object.<br />
These references are not released, and may cause a memory leak.<br />
The profiler (FB4) looks something like this (namespaces ommited for client's privacy sake):</p>
<p>&nbsp;</p>
<p><img height="73" alt="" width="675" src="/files/upload/7/Parsley%20Context.JPG" /></p>
<p>&nbsp;</p>
<p>&nbsp;As you can see, DefaultContext has a lifecycleManager property of type DefaultObjectLifecycleManager, which owns a dependentInstances dictionary which is used for storing the objects which the instantiated object depends on (such as objects used for its constructor or properties).<br />
These are added&nbsp;when&nbsp;you call&nbsp;context.getObject().<br />
In order for these references to be released, you should explicitly call destroyObject on this manager after you are done with it.<br />
A typical code for doing so may look like this :</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
myDIObject = context.getObject(DIobject_id);
if (myDIObject) {
				
// Do something with the created object
//.
//.

//destroying the object's references in Parsley
var definition:ObjectDefinition = DefaultContext(context).registry.getDefinition(DIobject_id);

DefaultContext(context).lifecycleManager.destroyObject(myDIObject,definition,context);
}</pre>
<p><br />
&nbsp;</p>
<p>&nbsp;</p>
<p align="left" style="margin-bottom: 0cm; line-height: 160%"><font face="Times New Roman, serif"><font color="#666666"><font face="Courier New, serif"><font size="2">and the memory leak is gone :)</font></font></font></font></p>
