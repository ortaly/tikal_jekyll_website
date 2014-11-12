---
layout: post
title: Auto generating AS3 VO classes from WSDL
created: 1276604529
author: yoav.moran
permalink: /js/auto-generating-as3-vo-classes-wsdl
tags:
- JS
- wsdl
- VO
- auto-generate
---
<p>Currently I use Eclipse to generate VO&nbsp;classes from the WSDL.</p>
<p>The problem with that is that I can't override the classes and add more properties and functions as I need.</p>
<p>A possible solution is to use a custom code generator that will generate the classes on my conditions. Then I can define a class to extend my classes and not the model's classes, or set all base classes to extend EventDispatcher, etc.</p>
<p>Moreover - then I won't be influenced by the changes done in Flex builder during the versions (the Flex builder generates completely different code than the Flash builder 4).</p>
<p>1. Is there any other way to add my own functions and properties to the VOs?</p>
<p>2. What code generation software do you recommend?</p>
