---
layout: post
title: Set button width to text width in flex
created: 1338394544
author: avit
permalink: /set-button-width-text-width-flex
tags:
- Ruby
- web
---
<p>Well, I have been working on a very interesting project recently, really stretching <a href='http://www.kensodev.com/tag/flex/' title='Flex'>flex</a> to the limits :-) I needed to set buttons, linkButtons, Labels and more components width to the width of the text inside them. Usually, <a href='http://www.kensodev.com/category/flex/' title='Flex'>flex</a> does it for you, but the width was hardcoded in compile time and I needed to change the text and the width in runtime and resize the component according to that.</p>

<p>I have written a nifty helper function for that.</p>

<p>Here it is:</p>
<div class='highlight'><pre><code class='actionscript'><span class='cm'>/**</span>
<span class='cm'>* This function will accept the text and the UI component and set the width to the width of the text</span>
<span class='cm'>* @param text the text or label of the component</span>
<span class='cm'>* @param container the container casted to a UIComponent</span>
<span class='cm'>*</span>
<span class='cm'>*/</span>
<span class='kd'>public</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>measureTextWidthAndResizeComponent</span><span class='p'>(</span><span class='nx'>text</span><span class='o'>:</span><span class='nb'>String</span><span class='o'>,</span> <span class='nx'>container</span><span class='o'>:</span><span class='nx'>UIComponent</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
<span class='p'>{</span>
	<span class='k'>var</span> <span class='nx'>_measuredWidth</span><span class='o'>:</span><span class='nb'>Number</span> <span class='o'>=</span> <span class='mi'>0</span><span class='o'>;</span>
	<span class='k'>var</span>  <span class='nx'>_paddingLeft</span><span class='o'>:</span><span class='nb'>uint</span> <span class='o'>=</span> <span class='mi'>0</span><span class='o'>;</span>
	<span class='k'>var</span> <span class='nx'>_paddingRight</span><span class='o'>:</span><span class='nb'>uint</span> <span class='o'>=</span> <span class='mi'>0</span><span class='o'>;</span>
	<span class='k'>var</span> <span class='nx'>_horizontalGap</span><span class='o'>:</span><span class='nb'>uint</span> <span class='o'>=</span> <span class='mi'>0</span><span class='o'>;</span>
	<span class='k'>var</span> <span class='nx'>_addedToWidth</span><span class='o'>:</span><span class='nb'>int</span><span class='o'>;</span>

	<span class='k'>if</span><span class='p'>(</span><span class='nx'>text</span> <span class='o'>==</span> <span class='kc'>null</span><span class='p'>)</span>
		<span class='k'>return</span><span class='o'>;</span>

	<span class='k'>if</span><span class='p'>(</span><span class='nx'>text</span><span class='p'>.</span><span class='nx'>length</span> <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;=</span> <span class='mi'>1</span><span class='p'>)</span>
		<span class='k'>return</span><span class='o'>;</span>

	<span class='nx'>_paddingLeft</span> <span class='o'>=</span> <span class='nx'>container</span><span class='p'>.</span><span class='nx'>getStyle</span><span class='p'>(</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>paddingLeft</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>);</span>
	<span class='nx'>_paddingRight</span> <span class='o'>=</span> <span class='nx'>container</span><span class='p'>.</span><span class='nx'>getStyle</span><span class='p'>(</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>paddingRight</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>);</span>
	<span class='nx'>_horizontalGap</span> <span class='o'>=</span> <span class='nx'>container</span><span class='p'>.</span><span class='nx'>getStyle</span><span class='p'>(</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>horizontalGap</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>);</span>

	<span class='nx'>_addedToWidth</span> <span class='o'>=</span> <span class='nb'>int</span><span class='p'>(</span><span class='nx'>_horizontalGap</span> <span class='o'>+</span> <span class='nx'>_paddingLeft</span> <span class='o'>+</span> <span class='nx'>_paddingRight</span><span class='p'>);</span>

	<span class='k'>var</span> <span class='nx'>lineMetrics</span><span class='o'>:</span><span class='nb'>TextLineMetrics</span> <span class='o'>=</span> <span class='nx'>container</span><span class='p'>.</span><span class='nx'>measureText</span><span class='p'>(</span><span class='nx'>text</span><span class='p'>);</span>

	<span class='nx'>_measuredWidth</span> <span class='o'>=</span> <span class='p'>(</span><span class='nx'>lineMetrics</span><span class='p'>.</span><span class='nx'>width</span> <span class='o'>+</span> <span class='nx'>_addedToWidth</span><span class='p'>);</span>
	<span class='nx'>container</span><span class='p'>.</span><span class='nx'>width</span> <span class='o'>=</span> <span class='nx'>_measuredWidth</span><span class='o'>;</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>That’s it, enjoy!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/RNqvzB7H9Z0" height="1" width="1"/>
