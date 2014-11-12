---
layout: post
title: Enumeration on a property - Flex 3
created: 1338394544
author: avit
permalink: /enumeration-property-flex-3
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/wp-content/uploads/2010/04/fx-icon.png' rel='attachment wp-att-409'><img alt='' class='alignleft size-thumbnail wp-image-409' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/04/fx-icon-150x150.png' title='Flex 3' width='150' /></a><!--more-->
<p>lack of documentation often lead to situation when the developer consuming your component doesn’t know what are the values you expect of him to set.</p>

<p>Well, there’s a solution for this, Flex introduced the “Inspectable” metadata tag, you can simply set this tag above your setter and the developer will get full intellisense and be able to know what you meant.</p>

<p>In this simple application, I create a custom mxml component based on Canvas, I create a property called myString and created an “Inspectable” metatag.</p>

<p>like so:</p>

<p><span>actionscript3</span> <span>Bindable</span> private var <em>myString:String;</em></p>

<p><span>Inspectable (enumeration="stringValue1,stringValue2,stringValue3")</span> public function set myString(val:String):void { <em>myString = val; } <span>/actionscript3</span></em></p>

<p>So far, it’s as simple as it can get, now, check out a screenshot of my flex builder when setting this property from outside <p style='text-align: center;'><a href='http://www.kensodev.com/wp-content/uploads/2010/04/Screen-shot-2010-04-07-at-11.20.01-AM.png' rel='attachment wp-att-384 facebox'><img alt='' class='aligncenter size-medium wp-image-384' height='137' src='http://www.kensodev.com/wp-content/uploads/2010/04/Screen-shot-2010-04-07-at-11.20.01-AM-300x137.png' title='Flex enum on peoprty' width='300' /></a></p> And that’s it, that’s how simple it is to create enumeration and ease the life on your fellow developers.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/XjeBj6C1AUE" height="1" width="1"/>
