---
layout: post
title: '.NET Technologies Blueprint: Business Object Frameworks – Dependency Injection'
created: 1262685257
author: dror
permalink: /net/net-technologies-blueprint-business-object-frameworks-–-dependency-injection
tags:
- .NET
- blueprint
- business objects
- FrameWork
- Dependency Injection
---
<p>1. Traditional Object Oriented Programming encourages us to use classes for our business objects. Dependency Injection frameworks take us a few steps&nbsp; forward down these roads.&nbsp; Always use interface to create Business Objects models. This ensures implementation may be changed at later stage regardless of initial code. Ensures better decupling between software layers</p>
<p>&nbsp;</p>
<p><br />
2. Dependency Injection frameworks enables us to supply an external dependency to a software component <br />
&nbsp;&nbsp;&nbsp; - Better testability<br />
&nbsp;&nbsp;&nbsp; - Greater flexibility<br />
&nbsp;&nbsp;&nbsp; - Out of the box infrastructure for Dependency Injection pardigm<br />
&nbsp;&nbsp;&nbsp; - Enables us using various resources for actual implementation (ranging from other classes to external configuration files)<br />
&nbsp;&nbsp;&nbsp; - May be confusing at first, requires a more experienced programmer<br />
&nbsp;&nbsp;&nbsp; - Some frameworks tend to be over configurable (too much XMLs)</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>3. There are 4 types of Dependency Injection:<br />
&nbsp;&nbsp;&nbsp; - Constructor Injection, most common &ndash; enables &ldquo;injecting&rdquo; a different implementation into objects based on their interfaces<br />
&nbsp;&nbsp;&nbsp; - Property Injection &ndash; also called &ldquo;Setter injection&rdquo;&nbsp; - Attach dependency through setter properties<br />
&nbsp;&nbsp;&nbsp; - Method Injection &ndash; Inject implementations via methods (use interface based parameters)<br />
&nbsp;&nbsp;&nbsp; - Field Injection &ndash; Define member fields of interface-based type</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>4. Possible frameworks range from dedicated frameworks such as Ninject to a component inside a full-blown framework, such as Spring.NET and MS Unity</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>5. <strong>Ninject</strong> &ndash; Lightweight, fast tool, focuses only on Inversion of Control &amp; Dependency Injection<br />
&nbsp;&nbsp;&nbsp; Recommended when Dependency Injection is required, won&rsquo;t supply any other services<br />
&nbsp;&nbsp;&nbsp; - Lightweight, won&rsquo;t bloat your project with its code<br />
&nbsp;&nbsp;&nbsp; - Focuses only on Dependency Injection, thus very fast<br />
&nbsp;&nbsp;&nbsp; - Requires referencing Ninject.Core everywhere in your code to add [inject] attributes<br />
&nbsp;&nbsp;&nbsp; - Uses type binding in code (i.e. references and not configuration files) , thus, binding cannot be altered after the application is compiled.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>6. <strong>Unity</strong> Application Block &ndash; Part of MS Patterns &amp; Practices, a lightweight extensible Dependency Injector<br />
&nbsp;&nbsp;&nbsp; - Open source<br />
&nbsp;&nbsp;&nbsp; - Part of EntLib<br />
&nbsp;&nbsp;&nbsp; - Seems to rely too much on XML Configuration</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>7. <strong>Spring.NET</strong> - Inversion of Control &amp; Dependency Injection are only a part of the deal. Spring.NET covers many more areas, such as:</p>
<p>&nbsp;&nbsp;&nbsp; AOP, Unit Testing,&nbsp;&nbsp;&nbsp; Data Access (Spring.NHibernate), Web services and Web Extensions.</p>
<p>&nbsp;&nbsp;&nbsp; Heavy, everything included &ndash; use when you need more than just Dependency Injection<br />
&nbsp;&nbsp;&nbsp; - Familiar to Java Converts<br />
&nbsp;&nbsp;&nbsp; - Clean (if you are used to) Syntax for Wiring<br />
&nbsp;&nbsp;&nbsp; - Many out-of-the-box components<br />
&nbsp;&nbsp;&nbsp; - Wasn&rsquo;t invented at Microsoft<br />
&nbsp;&nbsp;&nbsp; - Can look like magic at the beginning<br />
&nbsp;&nbsp;&nbsp; - Now has MS burn compiler (MEF)<br />
&nbsp;&nbsp;&nbsp; -Configuration intensive &ndash; lots of XML</p>
