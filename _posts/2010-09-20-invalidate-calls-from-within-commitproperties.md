---
layout: post
title: Invalidate calls from within commitProperties
created: 1284960171
author: sefi
permalink: /js/invalidate-calls-within-commitproperties
tags:
- JS
---
<div>I have a situation, where I have 2 internal properties, with the relevant setter/getter functions (say _a + aChanged, _b and bChanged).</div>
<div>Each setter calls invalidateProperties if the value has changed.</div>
<div>&nbsp;</div>
<!--break-->
<div>Now, the problem is that during the commitProperties, when handling the change for property a, I have to update the value of property b.</div>
<div>There are a few ways to do that:</div>
<div>1. Change the private member _b, and&nbsp;synthetically raise the bChanged flag.</div>
<div>This feels like a hack, and implies that the order of changes handling in the commitProperties function is important, since now I have to handle bChanged after I handle aChanged.</div>
<div>&nbsp;</div>
<div>2. Call the setter for b with the new value and have it update on the next frame, since it's setter raises the invalidateProperties flag.</div>
<div>&nbsp;</div>
<div>3. Eliminate the dependency by replacing the 2 variables with a single one.</div>
<div>&nbsp;</div>
<div>2 seems like the better&nbsp;choice&nbsp;right? Wrong!!</div>
<div>Digging into the code, I saw that the UIComponent code for invalidateProperties simply sets the invalidatePropertiesFlag to true, the commitProperties code does nothing with it, and it also implements a public function called validateProperties, and here is the catch - it first calls commitProperties and ONLY THEN sets&nbsp;invalidatePropertiesFlag to false.</div>
<div>This means, that even if I call b setter and it in turn calls invalidateProperties (implicitly sets the&nbsp;invalidatePropertiesFlag to false), <b>I can't rely</b>&nbsp;on it being picked up next frame or any other time for that matter, since once the current commitProperties ends, the&nbsp;invalidatePropertiesFlag flag is set to false again.</div>
<div>&nbsp;</div>
<p>It really buffles me why Adobe decided to implement validateProperties like this, especially considering that had they implemented it to first set the flag value to false and only then call commitProperties, this whole thing would be avoided...</p>
<p>&nbsp;</p>
<p>I attached a simple example that shows this.</p>
