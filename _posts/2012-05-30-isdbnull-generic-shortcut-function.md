---
layout: post
title: IsDBNull generic shortcut function
created: 1338394544
author: avit
permalink: /isdbnull-generic-shortcut-function
tags:
- Ruby
- web
---
<img alt='question-mark' class='alignleft size-thumbnail wp-image-216' height='150' src='http://www.kensodev.com/wp-content/uploads/2009/08/question-mark-150x150.jpg' title='question-mark' width='150' />
<p>If you’re working with data from an SQL database or from any other database for that matter you probably know the exception cause by calling the reader<span>“columnName”</span></p>

<p>This exception is exceptionally annoying because you cannot predict when it is going to happen, it depends on data from the database and can throw the exception at any time.</p>

<p>So, while working on a code that’s not mine, as you know I’m a consultant so I work on other peoples code most of the time.<!--more--></p>

<p>The way they worked around the issue is like so:</p>

<p><span>csharp</span> browserTarget = String.Empty;</p>

<p>if (!currReader.IsDBNull(3)) browserTarget = currReader.GetString(3).Trim(); <span>/csharp</span></p>

<p>Now, can you imagine this on every column in the DB which includes 30 columns?</p>

<p>I had to figure out a way to make this generic and just pass it on to the other developers in the company.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/08/scrtch.jpg'><img alt='scrtch' border='0' height='244' src='http://www.kensodev.com/wp-content/uploads/2009/08/scrtch_thumb.jpg' style='display: inline; border: 0px;' title='scrtch' width='196' /></a>
<p>This is what I wrote for them</p>

<p>and this is how you call the function</p>

<p><span>csharp</span> public static class DbHelpers { public static objectType convertToGenericObject<objectType>(object readerColumn) { objectType returnValue;</p>

<pre><code>	if (!Convert.IsDBNull(readerColumn))
		returnValue = (objectType)readerColumn;
	else
		returnValue = default(objectType);
	return returnValue;
 }</code></pre>

<p>} <span>/csharp</span></p>
<strong><em>objectType</em></strong>
<p>This function won’t throw an exception even if the Db column is null.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/1HEyFD9zcBA" height="1" width="1"/>
