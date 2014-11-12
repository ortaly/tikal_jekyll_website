---
layout: post
title: 'Advanced JavaScript '
created: 1249388297
permalink: advanced-javascript
tags:
- Incubator
---
<p><br />
Recently I had the chance to see how deep the rabbit-hole goes when it comes to JavaScript.<br />
Since my project should not involve any JavaScript thirdparties. I had to be creative <br />
and sometimes yeah you're not going to believe it, I even had to google about it.<br />
When we are talking about JavaScript the pain is even bigger because we have to be able to write <br />
a cross browser code. In that point almost any average sane developer will pull out his best colorful <br />
nose hairs. <br />
I'm not going to cover the entire JavaScript language - this is not the case, I'm not writing a book.<br />
I'm just going to put on the table some areas which are not trivial to the common JavaScript developer.<br />
<br />
<u><strong>Agenda:</strong></u></p>
<ul>
    <li>
    <p>&nbsp;&nbsp; Intro</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Data Object</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Function Constructor</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Namespaces &amp; Closure</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Prototype</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Custom Event</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; AOP</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Listener override</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; CSS</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Native AJAX</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Canvas</p>
    </li>
    <li>
    <p>&nbsp;&nbsp; Misc</p>
    </li>
</ul>
<p>&nbsp;</p>
<p><u><strong>Intro:</strong></u><br />
JavaScript is a simple scripting language and yet complex and powerful language for nontrivial tasks.<br />
JavaScript was originally developed by Brendan Eich of Netscape under the name Mocha, <br />
later changed to LiveScript, and finally renamed to JavaScript. <br />
Although Java and JavaScript has syntatic resemblance and they both provides executable content <br />
in web browsers, JavaScript is not Java. The similarity of names is purely a marketing ploy by Netscape and Sun.<br />
<br />
ECMAScript is a scripting language, standardized by Ecma International. It supported in many applications, <br />
especially web browsers, where it is commonly called JavaScript. <br />
Dialects sometimes include extensions to the language, or to the standard library and related APIs such as the W3C-specified DOM. <br />
This means that applications written in one dialect may be incompatible with another, <br />
unless they are written to use only a common subset of supported features and APIs.</p>
<p><br />
Dialects of ECMAScript:</p>
<ul>
    <li>
    <p>&nbsp; Google Chrome, the V8 engine &nbsp;&nbsp;&nbsp; JavaScript &nbsp;&nbsp;&nbsp;</p>
    </li>
    <li>
    <p>&nbsp; Mozilla Firefox, the Gecko layout engine, SpiderMonkey, and Rhino 6 - JavaScript 1.8</p>
    </li>
    <li>
    <p>&nbsp; Internet Explorer, the Trident layout engine - JScript 5.7 &nbsp;&nbsp;&nbsp;</p>
    </li>
    <li>
    <p>&nbsp; Opera - ECMAScript with some JavaScript 1.5 and JScript extensions</p>
    </li>
    <li>
    <p>&nbsp; KHTML layout engine, KDE's Konqueror, and Apple's Safari7 - JavaScript 1.5 1 &nbsp;&nbsp;&nbsp;</p>
    </li>
    <li>
    <p>&nbsp; Appweb Web Server, Samba 4 - Ejscript 0.9.5</p>
    </li>
    <li>
    <p>&nbsp; Microsoft .NET Framework - JScript .NET 8.0 &nbsp;&nbsp;&nbsp;</p>
    </li>
    <li>
    <p>&nbsp; Adobe Flash and Adobe Flex - ActionScript 3 &nbsp;&nbsp;&nbsp;</p>
    </li>
    <li>
    <p>&nbsp; Adobe Acrobat - JavaScript 1.5 1</p>
    </li>
    <li>
    <p>&nbsp; OpenLaszlo Platform - JavaScript 1.4 1</p>
    </li>
    <li>
    <p>&nbsp; CriScript, JScript for game platforms - CriScript 0.9.0</p>
    </li>
    <li>
    <p>&nbsp;</p>
    </li>
</ul>
<p>Note: The following items will include examples which most of them cross platform solutions.<br />
<br />
<u><strong>Data Object:</strong></u><br />
Before we are going to dive deep inside JS, lets learn a thing or two.<br />
in JS  Data object can be achived in several ways:<br />
We can use JS Object like a map.</p>
<div style="border: 1px solid gray; padding: 5px; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var foo = new Object();<br />
foo['foo'] = 'foo';<br />
<br />
Or we can use an Array object:<br />
var foo = new Array();<br />
foo['foo'] = 'foo';<br />
foo[0] = 'foo';<br />
<br />
for (var item in foo) {<br />
&nbsp;&nbsp;&nbsp; alert(foo[item]);<br />
}</div>
<p><br />
Just keep in mind that when you are using key values as numbers<br />
it get mixed with the strings keys.<br />
We can use a structure like in the followi:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var foo = {<br />
&nbsp;&nbsp;&nbsp; foo:'foo',<br />
&nbsp;&nbsp;&nbsp; fooArray: [1, 2, 3]<br />
};<br />
alert(foo.foo + &quot; - &quot; + foo.fooArray[0]);</div>
<p><br />
we can also instantiate a function and use it as a Class:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">function Foo(foo) {<br />
&nbsp;&nbsp;&nbsp; this.foo = foo;<br />
&nbsp;&nbsp;&nbsp; this.fooFun = function(){/* code in here */};<br />
}<br />
var fooInstance = new Foo('foo');<br />
alert(fooInstance.foo);</div>
<p><br />
In this example we can see how can we use part of the above examples to our advantage.</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">function Foo(x, y) {<br />
&nbsp;&nbsp;&nbsp; this.x = x;<br />
&nbsp;&nbsp;&nbsp; this.y = y<br />
<br />
&nbsp;&nbsp;&nbsp; this.calc = function() {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return { sum:(this.x + this.y), <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;mult:(this.x * this.y),<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;sub:(this.x - this.y) }<br />
&nbsp;&nbsp;&nbsp; }<br />
}<br />
<br />
var fooInstance = new Foo(5, 6);<br />
alert(fooInstance.calc().sum);<br />
fooInstance.x = 7;<br />
alert(fooInstance.calc().sum);</div>
<p><br />
<br />
<u><strong>Function Constructor</strong></u>:<br />
Lets say there is a situation where we have an existing application <br />
and we need to modify one of its functions to our needs, what can we do?<br />
First option is to override the function by writing another one with the same name, the last<br />
function counts. The problem is there are some cases where this workaround will not do. <br />
Another option is actually manipulating the function code. How can we achieve that?<br />
Before we will answer that question lets take a look at the following example:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">alert(Foo);</div>
<p><br />
The result of the above code is a popup window and the string representation of 'Foo' function is being displayed within.<br />
I like this :) it means that we can pass a function as an argument extract its <br />
content and even manipulate it. First lets take a look at the following example:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">function foo1(x) {<br />
&nbsp;&nbsp;&nbsp; this.x = x;<br />
}<br />
function foo2(func) {<br />
&nbsp;&nbsp;&nbsp; this.x = 6;<br />
&nbsp;&nbsp;&nbsp; var x1 = new func(x);<br />
&nbsp;&nbsp;&nbsp; alert(x1.x);<br />
}<br />
foo2(foo1);</div>
<p><br />
In the above example we can see some of JS power.<br />
Now, lets get back to the former example and by using JS Function (with a capital 'F')<br />
Lets say you need to create a simple function which popups an alert<br />
using 'Function', we can do the following:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var foo = new Function(&quot;value&quot;, &quot;alert(value)&quot;);<br />
foo('s');</div>
<p><br />
You can see that the first argument &quot;value&quot; is the function's parameter, the next argument<br />
is the function's body. 'Foo' is now an anonymous function.<br />
Now, lets get back to our previous example ('Foo' function) and add to its result a divide member, as followed:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 500px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">&nbsp;function Foo(x, y) {<br />
&nbsp;&nbsp;&nbsp; this.x = x;<br />
&nbsp;&nbsp;&nbsp; this.y = y<br />
<br />
&nbsp;&nbsp;&nbsp; this.calc = function() {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return { sum:(this.x + this.y), <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;mult:(this.x * this.y),<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;sub:(this.x - this.y) }<br />
&nbsp;&nbsp;&nbsp; }<br />
}<br />
<br />
function manipulator(func, from, to) {<br />
&nbsp;&nbsp;&nbsp; var prepare = func.toString();<br />
&nbsp;&nbsp;&nbsp; var prepare = prepare.replace(from, to);<br />
&nbsp;&nbsp;&nbsp; try {&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; var prepareArgs = prepare.substring(0, prepare.indexOf(&quot;{&quot;)+1);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; prepareArgs = prepareArgs.substring(prepareArgs.indexOf(&quot;(&quot;)+1, prepareArgs.indexOf(&quot;)&quot;));<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; prepareArgs = prepareArgs.split(&quot;,&quot;);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; prepare = prepare.substring(prepare.indexOf(&quot;{&quot;)+1, prepare.lastIndexOf(&quot;}&quot;));<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return new Function(prepareArgs, prepare);<br />
&nbsp;&nbsp;&nbsp; } catch (e) {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; alert(&quot;Name: &quot; + e.name + &quot;\nDescription: &quot; + e.description);<br />
&nbsp;&nbsp;&nbsp; }<br />
}<br />
<br />
var Foo = manipulator(Foo, &quot;sub:(this.x - this.y)&quot;, &quot;sub:(this.x - this.y), divide:(this.x / this.y)&quot;);<br />
var foo = new Foo(5, 5);<br />
alert(foo.calc().divide);</div>
<p><br />
<br />
<u><strong>Namespaces &amp; Closure:</strong></u><br />
When I see the common use of JS I can see bunch of global functions mixed with global variables.<br />
In the good scenario we can find this whole bunch included in a resource file common.js or main.js. <br />
A better way is putting your code in a sub global areas by using Namespaces.</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var tikal = {};<br />
tikal.foo = function(){};</div>
<p><br />
Lets aim a little higher, In the next example we can see how we can use closures to create a private<br />
namespace and expose its public methods to the public namespace. If you'll run the next example, <br />
you'll see that foo will be set to value 666.</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var com = {tikal:{}};<br />
<br />
(function() {<br />
&nbsp;&nbsp;&nbsp; var foo = 1;<br />
&nbsp;&nbsp;&nbsp; function getFoo(){return foo};<br />
&nbsp;&nbsp;&nbsp; function setFoo(pFoo){foo = pFoo};<br />
<br />
&nbsp;&nbsp;&nbsp; var ns = com.tikal;<br />
&nbsp;&nbsp;&nbsp; ns.getFoo = getFoo;<br />
&nbsp;&nbsp;&nbsp; ns.setFoo = setFoo;<br />
<br />
})(); // end annonymous function definition and invoke it.<br />
<br />
com.tikal.setFoo(666);<br />
alert(com.tikal.getFoo());</div>
<p><br />
The same code can be written as follow:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var com = {tikal:{}};<br />
com.tikal = function() {<br />
&nbsp;&nbsp;&nbsp; var _foo = 1;<br />
<br />
&nbsp;&nbsp;&nbsp; return {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; getFoo: function() {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return foo;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; },<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; setFoo: function(pFoo) {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; foo = pFoo;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp; }<br />
}();<br />
<br />
com.tikal.setFoo(666);<br />
alert(com.tikal.getFoo());</div>
<p><br />
As you can see no instance should be created the public functions are staticly being called <br />
and the private variables maintain their state. But what if we need to instantiate a Class and call <br />
repeatedly its methods, we can then do the follow:</p>
<div style="border: 1px solid gray; padding: 5px; overflow: auto; width: 300px; color: gray; background-color: rgb(239, 239, 239); font-family: 'Courier New';">var animals = (function() {<br />
&nbsp;&nbsp;&nbsp; // private area<br />
&nbsp;&nbsp;&nbsp; function Dog(name) {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; this.name = name;<br />
&nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp; Dog.prototype.bark = function() { return &quot;Woof! &quot; + this.name };<br />
<br />
&nbsp;&nbsp;&nbsp; // public area<br />
&nbsp;&nbsp;&nbsp; return {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Dog: Dog<br />
&nbsp;&nbsp;&nbsp; }<br />
})();<br />
<br />
<br />
// We can also use prototype in here: animals.Dog.prototype.bark = function() { document.write(&quot;Woof! &quot; + this.name) };<br />
var fido = new animals1.Dog(&quot;fido&quot;);<br />
fido.bark() <br />
<br />
var rover = new animals1.Dog(&quot;rover&quot;);<br />
rover.bark();</div>
<p><br />
<br />
<strong>To be continued...</strong></p>
<ul>
    <li>
    <p>&nbsp; Prototype</p>
    </li>
    <li>
    <p>&nbsp; Custom Event</p>
    </li>
    <li>
    <p>&nbsp; AOP</p>
    </li>
    <li>
    <p>&nbsp; Listener override</p>
    </li>
    <li>
    <p>&nbsp; CSS</p>
    </li>
    <li>
    <p>&nbsp; Native AJAX</p>
    </li>
    <li>
    <p>&nbsp; Canvas</p>
    </li>
    <li>
    <p>&nbsp; Misc</p>
    </li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
