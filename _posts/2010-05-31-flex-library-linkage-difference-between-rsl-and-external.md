---
layout: post
title: Flex Library Linkage – Difference between RSL and External
created: 1275297718
author: shair
permalink: /js/flex-library-linkage-–-difference-between-rsl-and-external
tags:
- JS
- RSL
- Linkage
- Library
- flex
- Flash Builder
- External
---
<p>After a few days of research on the subject of linkage, I decided to write a post at my blog on <a href="http://www.wannaknowflex.com/2010/05/flex-linkage-difference-between-rsl-and-external/">Flex Architecture</a>, And share it with you:</p>
<p>&nbsp;</p>
<p>So today I wanna talk about the different types of linkage options you have when linking an external library project or swc to your flex project / library.  As you know or may not know, you have 3 different linkage types in flex:</p>
<p>&nbsp;</p>
<ul>
    <li><strong>Merged Into Code</strong></li>
    <li><strong>External</strong></li>
    <li><strong>RSL</strong> (Runtime Shared Library)</li>
</ul>
<p>&nbsp;</p>
<p>So, what is the difference?</p>
<p>&nbsp;</p>
<p>I thought I would write a simple straight forward explanation:</p>
<p>&nbsp;</p>
<p>&nbsp;A library in it&rsquo;s deployment is a SWC.</p>
<p>&nbsp;</p>
<p>A SWC combines of a <strong>Library.swf </strong>with a xml of all the class definitions of the library, called: <strong>&ldquo;Catalog.xml</strong>&ldquo;</p>
<p>&nbsp;</p>
<p>When you link a library to a project or another library, you sometimes load the actual <strong>Library.swf</strong> depending on the linkage type, but you always load it&rsquo;s <strong>catalog.xml</strong> file into the main application&rsquo;s <strong>ApplicationDomain</strong>.</p>
<p>&nbsp;</p>
<p>&ldquo;<strong>ApplicationDomain</strong>&rdquo; is the storage of all the class definitions of an application, and all of the classes it is allow to refer in build and in runtime.</p>
<p>&nbsp;</p>
<p>So, here is a summery of the difference between the linkage types:</p>
<p>&nbsp;</p>
<p><strong>Merged into code:</strong> loads the library&rsquo;s catalog.xml to the ApplicationDomain and compiles it&rsquo;s library.swf into the main application swf.</p>
<p>&nbsp;</p>
<p><strong>RSL:</strong> loads the library&rsquo;s catalog.xml to the ApplicationDomain and loads only at the start of the runtime the swf into memory, so you could reach a class definition at runtime, and create an instance.</p>
<p>&nbsp;</p>
<p><strong>External:</strong> loads the library&rsquo;s catalog.xml to the ApplicationDomain and doesn&rsquo;t load the swf of the library at runtime, this option expects a preloading of the library swf into the ApplicationDomain.</p>
<p>&nbsp;</p>
<p>A good example for this can be found at the end of my blog post: <a href="http://www.wannaknowflex.com/2010/05/flex-linkage-difference-between-rsl-and-external/">Flex Linkage - Difference between RSL and External </a></p>
<p>&nbsp;</p>
<p>Feel free to ask questions or elaborate,</p>
<p>Shai</p>
