---
layout: post
title: Thoughts About Pre-Compiled Javascript Languages
created: 1383560535
author: orenf
permalink: /js/thought-about-pre-compiled-javascript-languages
tags:
- JS
- Javascript
- CoffeeScript
- typescript
- DART
---
<p>At an internal discussion in Tikal&#39;s Javascript Group, I asked for an opinion about developing javascript with a precompiled javascript language such as - typescript, coffeescript, etc.</p>

<p>One of the go-to reasons for going with such a solution (typescript) is the fact that it enforces such classical class-based-language conventions and syntactic sugar as well as it feels natural.&nbsp;</p>

<p><span style="line-height: 1.6em;">In m</span><span style="line-height: 1.6em;">y personal opinion, compiled to javascript languages are still - not in common use - and is hard to find developers with experience in it. Debugging such source languages (aside from few) as still not straight forward. Some pre compiled languages don&#39;t support any standard and aim to imitate some other non-async languages. </span></p>

<p><span style="line-height: 1.6em;">Still - javascript, the language - is the defacto nowadays and most common language talked over the web despite few attempts to make some wrappers around it. Also, as Douglas Crockford stated before - there&#39;s a reason for javascript taking over the web than java - it&#39;s lightweight ans easy to follow. If I would have to choose a pre compiled language - I would have go with the </span><a href="https://code.google.com/p/traceur-compiler/" style="line-height: 1.6em;">Traceur</a><span style="line-height: 1.6em;"> Compiler - which supports compiling standard ECMAscript 6 code - the future of javascript - to today&#39;s javascript. </span></p>

<p><span style="line-height: 1.6em;">Here are some of the pros and cons some of our engineers have had in mind regarding developing with such precompiled javascript languages.</span></p>

<h2><a href="https://www.dartlang.org/">Dart</a></h2>

<h3>pros</h3>

<p>&quot;If customer want a strongly typed language with JS fallback best choice the Dart (dartlang.org)&quot;</p>

<h2><a href="http://coffeescript.org/">Coffeescript</a></h2>

<h3>pros</h3>

<p>&quot;I can speak in the favor of CoffeeScript. Basically, it&#39;s not that different than coding in JS. I see it more as a personal preference, and not as a tool that promotes the generation of higher quality code. That statement can go either way. CS doesn&#39;t makes you treat your code as class-based object oriented code any more than JS, however, it does have a cleaner syntax with no boilerplate to define prototypal inheritance, if you choose to use it. One of the nicer features of the language IMHO, is the functional-query styled expressions it allows you to use. These mostly revolve around list comprehensions and object destructuring. Using these features is not that different than using a lot of underscore&#39;s utility functions in regular JS, and maintaining your code in a functional fashion, but it&#39;s certainly easier to use write, read and remember. I still find myself combining underscore functions with CS &quot;native&quot; expressions to deal with complex data processing. I think that the main draw point towards CS for me, is that it requires a lot less &quot;mental syntax parsing&quot; in comparison to JS. I don&#39;t have to watch out where I might missed a comma, parentheses, or curly braces, and my code is structured as its idented. Basically, for me it leads to a lot less pitfalls which I tend to come across no matter how many times I saw them before with JS, and my code is just written more fluently. The language does have some annoying pitfalls which may lead to frustration, like any other language that is new for you as a programmer. One that I&#39;ve come across recently - 1. obj = {} obj.selection = item for item in collection when item? 2. obj = selection: item for item in collection when item? 3. obj = selection: item for item in collection when item? The first two produce a similar object, with &#39;selection&#39; being just one of the items. The third&#39;s &#39;selection&#39; is an array with all the possible matches. I couldn&#39;t make any sense of it. I guess that my final thought on this is- don&#39;t commit to CS unless most of your team mates won&#39;t enjoy it.&quot;</p>

<h3>cons</h3>

<p>&quot;I had some experience a while ago when I spent about 3 month at one of Tikal&#39;s clients. The team that I have joined wrote it&#39;s client side UI with coffee script. It took me a short while to get adjusted. I guess my main setback was getting to know all the dark corners and common pitfalls coffee script has: Just to mark two examples: 1. Each method in coffee script always returns a value so the programmer should return null if no value is expected 2. Coffee script relays on correct spacing, you miss a space and the code doesn&#39;t compile Other than that it was quite natural. I haven&#39;t had any experience in developing a web-application using coffee script with an MVC framework. I&#39;m currently developing using Ember.js and finding good sample is hard as it is, finding the same range of samples in coffee script may be a mush harder task. To sum up: * Using a pre-compiled language may look nicer but it requires an overhead of compiling * Debugging may become more complicated * Developers should abide with the chosen tool which may make them less productive at the beginning * Finding decent samples may be harder and sometimes throwing a sample javascript code into an automatic translator won&#39;t cut it.&quot;</p>

<h2><a href="http://www.gwtproject.org/">GWT</a></h2>

<h3>pros</h3>

<p>&quot;I am not sure if you (or the client) did consider GWT. GWT is mature enough, and you have good examples on the web. The main advantage of GWT today is the strong typing, and the ability to develop with Java and use eclipse. finding java programer is not that hard.. i want to add some warnning: GWT is a technology that consider to be in risk, but for now it is a live (see here http://gwtcreate.com/). i think that in long run if and when DART will take place it will kill GWT. From what i know is that DART has new approch of optional type, which doesn&#39;t enforce you to use types. if GWT it is somthing that you consider i can elaborate more.&quot;</p>

<h3>cons</h3>

<p>&quot;Several points that I can shade light on: * GWT &quot;swallows&quot; up any routing your server may receive so IT IS IMPOSSIBLE to use normal MVC based routing * Due the lack of routing support (at least with Ember) we must define, configure and maintain any MVC relationships we need for our Ember application * Debugging GWT requires at least one full time Java developer with GWT experience * GWT has the tendency to mess up other frameworks DOM timing sequence making it very difficult to tame any MVC framework that gets in the way.&quot;</p>

<h2><a href="http://www.typescriptlang.org/">Typescript</a></h2>

<h3>pros</h3>

<p>&quot;we have been using TypeScript internal in the .Net group and also using it on a personal project. none of the problems you mentioned exists in typescript. in any point at the project you can &#39;transfer&#39; yourself back to JS or even mix the two. the syntax is VERY EASY to catch and the compiler is just a cool breeze to work with (but we do use Visual Studio and not the node.js extension) it works well with require.js modules and all the rest is just pure JS but with type safe and lambdas all around (many other features)&quot;</p>

<h2>Plain Javascript</h2>

<h3>pros</h3>

<p>&quot;I wouldn&#39;t touch GWT with a 2 meter stick! In the last year and a half I have seen 3 projects written in GWT that their owners were desperate to get rid of but couldn&#39;t because it meant re-writing thousands of lines. From my experience with CoffeeScript the indentation issues are a NIGHTMARE. Other issues that Dror mentioned are also unpleasant (weird loop definitions, unexpected value returns and so on) - not my cup of coffee (lame, i know...). Perhaps typescript is the solution (Never used it...) though I don&#39;t really agree that Javascript should be treated as a classical class based language - After all its naturally a lambda language and should be treated as such.&quot;</p>

<p>&quot;Personally, I strongly favor javascript. I think you still need to know the ins and outs of javascript even if you use one of the other languages. I also think that there is something to be said for think in javascript and not in some foreign paradigm. Bottom line, if I&#39;m going to invest the time in learning something new I&#39;d rather focus on something where I fell that I&#39;ll get more bang for buck.&quot;</p>

<p>&quot;A lot of cool features and syntax sugar is supposed to be coming out with ES6 support such as classes, modules, arrow functions and more which will kinda take the sting out of compiled languages such a as CS.</p>

<p>An interesting talk by (the) Brendan Eich earlier this year (@ Fluent 2013):http://www.youtube.com/watch?v=qrf9ONmtXbM<br />
Some features are already supported by leading browsers : http://kangax.github.io/es5-compat-table/es6/ - I hope this table gets &quot;geener&quot; soon&quot;</p>

<p>&quot;stick with javascript because:<br />
1. javascript isn&#39;t so bad at all.<br />
2. i don&#39;t like the generated code.<br />
3. i don&#39;t trust MS/Jeremy Ashkenas to keep up with the industry.&nbsp;<br />
4. i don&#39;t like the additional effort required for build/testing/debugging.&quot;</p>
