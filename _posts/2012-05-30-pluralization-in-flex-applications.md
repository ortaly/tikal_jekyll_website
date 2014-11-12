---
layout: post
title: Pluralization in flex application(s)
created: 1338394544
author: avit
permalink: /pluralization-flex-applications
tags:
- Ruby
- web
---
<img alt='SingularPluralSort.pdf.00' class='alignleft' height='240' src='http://farm5.static.flickr.com/4071/5123639196_e8dff2d0c2_m.jpg' width='185' />
<p>As you may know (or not) I am a Flex developer, I am also a Ruby On Rails developer.</p>

<p>As a Ruby On Rails developer I often find myself hoping just a fraction of the stuff Ruby On Rails has would come to Flex or someone will port parts of it to Action Script 3.</p>

<p>This week I had a bug reported by a client that the alerts he received from the systems are inconsistent to the amount of items he is selecting.</p>

<p>For instance, he has a grid showing modules, and he can delete the selected item/s, when he clicks delete he gets the standard confirm message “are you sure you want to delete the selected module”, this message is the same when more then a single module is selected.</p>

<p>This is across the entire system and not only in this single module.</p>

<p>So, I sat down, scratched my head for a little while and then remembered that Ruby On Rails has something like that - out of the box and it’s called Pluralization (Inflector).</p>

<p>It goes something like this:</p>
<div class='highlight'><pre><code class='ruby'><span class='o'>&</span><span class='n'>lt</span><span class='p'>;</span><span class='o'>%=</span> <span class='n'>pluralize</span><span class='p'>(</span><span class='n'>messages</span><span class='o'>.</span><span class='n'>length</span><span class='p'>,</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='n'>module</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;)</span> <span class='o'>%&</span><span class='n'>gt</span><span class='p'>;</span>
</code></pre>
</div>
<p>I googled for a bit and found that <a href='http://flexonrails.net/' target='_blank'>http://flexonrails.net/</a> had an as3 version of that, I rewrote it a bit, exposed only one function outside and this is the outcome (complete code):</p>
<div class='highlight'><pre><code class='actionscript'><span class='kd'>package</span> <span class='nx'>com</span><span class='p'>.</span><span class='nx'>kensodev</span>
<span class='p'>{</span>
	<span class='kd'>public</span> <span class='kd'>class</span> <span class='nx'>PluralizationHelper</span>
	<span class='p'>{</span>
		<span class='kd'>public</span> <span class='kd'>function</span> <span class='nx'>PluralizationHelper</span><span class='p'>()</span>
		<span class='p'>{</span>
		<span class='p'>}</span>

		<span class='kd'>static</span><span class='o'>:</span><span class='p'>{</span>
			<span class='nx'>PluralizationHelper</span><span class='p'>.</span><span class='nx'>initPluralization</span><span class='p'>();</span>
		<span class='p'>}</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>pluralWords</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='o'>=</span>
			<span class='p'>[</span>
				<span class='p'>[</span><span class='sr'>/$/</span><span class='o'>,</span> <span class='s1'>'s'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/s$/i</span><span class='o'>,</span> <span class='s1'>'s'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(ax|test)is$/i</span><span class='o'>,</span> <span class='s1'>'$1es'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(octop|vir)us$/i</span><span class='o'>,</span> <span class='s1'>'$1i'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(alias|status)$/i</span><span class='o'>,</span> <span class='s1'>'$1es'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(bu)s$/i</span><span class='o'>,</span> <span class='s1'>'$1ses'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(buffal|tomat)o$/i</span><span class='o'>,</span> <span class='s1'>'$1oes'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([ti])um$/i</span><span class='o'>,</span> <span class='s1'>'$1a'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/sis$/i</span><span class='o'>,</span> <span class='s1'>'ses'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(?:([^f])fe|([lr])f)$/i</span><span class='o'>,</span> <span class='s1'>'$1$2ves'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(hive)$/i</span><span class='o'>,</span> <span class='s1'>'$1s'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([^aeiouy]|qu)y$/i</span><span class='o'>,</span> <span class='s1'>'$1ies'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(x|ch|ss|sh)$/i</span><span class='o'>,</span> <span class='s1'>'$1es'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(matr|vert|ind)ix|ex$/i</span><span class='o'>,</span> <span class='s1'>'$1ices'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([m|l])ouse$/i</span><span class='o'>,</span> <span class='s1'>'$1ice'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/^(ox)$/i</span><span class='o'>,</span> <span class='s1'>'$1en'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(quiz)$/i</span><span class='o'>,</span> <span class='s1'>'$1zes'</span><span class='p'>]</span>
			<span class='p'>];</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>singularWords</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='o'>=</span>
			<span class='p'>[</span>
				<span class='p'>[</span><span class='sr'>/s$/i</span><span class='o'>,</span> <span class='s1'>''</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(n)ews$/i</span><span class='o'>,</span> <span class='s1'>'$1ews'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([ti])a$/i</span><span class='o'>,</span> <span class='s1'>'$1um'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i</span><span class='o'>,</span> <span class='s1'>'$1$2sis'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(^analy)ses$/i</span><span class='o'>,</span> <span class='s1'>'$1sis'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([^f])ves$/i</span><span class='o'>,</span> <span class='s1'>'$1fe'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(hive)s$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(tive)s$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([lr])ves$/i</span><span class='o'>,</span> <span class='s1'>'$1f'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([^aeiouy]|qu)ies$/i</span><span class='o'>,</span> <span class='s1'>'$1y'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(s)eries$/i</span><span class='o'>,</span> <span class='s1'>'$1eries'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(m)ovies$/i</span><span class='o'>,</span> <span class='s1'>'$1ovie'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(x|ch|ss|sh)es$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/([m|l])ice$/i</span><span class='o'>,</span> <span class='s1'>'$1ouse'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(bus)es$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(o)es$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(shoe)s$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(cris|ax|test)es$/i</span><span class='o'>,</span> <span class='s1'>'$1is'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(octop|vir)i$/i</span><span class='o'>,</span> <span class='s1'>'$1us'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(alias|status)es$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/^(ox)en/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(vert|ind)ices$/i</span><span class='o'>,</span> <span class='s1'>'$1ex'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(matr)ices$/i</span><span class='o'>,</span> <span class='s1'>'$1ix'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='sr'>/(quiz)zes$/i</span><span class='o'>,</span> <span class='s1'>'$1'</span><span class='p'>]</span>
			<span class='p'>];</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>irregularWords</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='o'>=</span>
			<span class='p'>[</span>
				<span class='p'>[</span><span class='s1'>'person'</span><span class='o'>,</span> <span class='s1'>'people'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='s1'>'man'</span><span class='o'>,</span> <span class='s1'>'men'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='s1'>'child'</span><span class='o'>,</span> <span class='s1'>'children'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='s1'>'sex'</span><span class='o'>,</span> <span class='s1'>'sexes'</span><span class='p'>]</span><span class='o'>,</span>
				<span class='p'>[</span><span class='s1'>'move'</span><span class='o'>,</span> <span class='s1'>'moves'</span><span class='p'>]</span>
			<span class='p'>];</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>uncountableWords</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='o'>=</span>
			<span class='p'>[</span>
				<span class='s1'>'equipment'</span><span class='o'>,</span> <span class='s1'>'information'</span><span class='o'>,</span> <span class='s1'>'rice'</span><span class='o'>,</span> <span class='s1'>'money'</span><span class='o'>,</span> <span class='s1'>'species'</span><span class='o'>,</span> <span class='s1'>'series'</span><span class='o'>,</span> <span class='s1'>'fish'</span><span class='o'>,</span> <span class='s1'>'sheep'</span>
			<span class='p'>];</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>makePlural</span> <span class='p'>(</span><span class='nx'>singular</span> <span class='o'>:</span> <span class='nb'>String</span><span class='p'>)</span> <span class='o'>:</span> <span class='nb'>String</span>
		<span class='p'>{</span>
			<span class='k'>if</span> <span class='p'>(</span><span class='nx'>uncountableWords</span><span class='p'>.</span><span class='nx'>indexOf</span><span class='p'>(</span><span class='nx'>singular</span><span class='p'>)</span> <span class='o'>!=</span> <span class='o'>-</span><span class='mi'>1</span><span class='p'>)</span>
				<span class='k'>return</span> <span class='nx'>singular</span><span class='o'>;</span>

			<span class='k'>var</span> <span class='nx'>plural</span> <span class='o'>:</span> <span class='nb'>String</span> <span class='o'>=</span> <span class='k'>new</span> <span class='nb'>String</span><span class='p'>();</span>
			<span class='k'>for</span> <span class='k'>each</span> <span class='p'>(</span><span class='k'>var</span> <span class='nx'>item</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='k'>in</span> <span class='nx'>pluralWords</span><span class='p'>)</span>
			<span class='p'>{</span>
				<span class='k'>var</span> <span class='nx'>p</span> <span class='o'>:</span> <span class='nb'>String</span> <span class='o'>=</span> <span class='nx'>singular</span><span class='p'>.</span><span class='nx'>replace</span><span class='p'>(</span><span class='nx'>item</span><span class='p'>[</span><span class='mi'>0</span><span class='p'>]</span><span class='o'>,</span> <span class='nx'>item</span><span class='p'>[</span><span class='mi'>1</span><span class='p'>]);</span>
				<span class='k'>if</span> <span class='p'>(</span><span class='nx'>p</span> <span class='o'>!=</span> <span class='nx'>singular</span><span class='p'>)</span>
					<span class='nx'>plural</span> <span class='o'>=</span> <span class='nx'>p</span><span class='o'>;</span>
			<span class='p'>}</span>
			<span class='k'>return</span> <span class='nx'>plural</span><span class='o'>;</span>
		<span class='p'>}</span>

		<span class='kd'>private</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>makeSingular</span> <span class='p'>(</span><span class='nx'>plural</span> <span class='o'>:</span> <span class='nb'>String</span><span class='p'>)</span> <span class='o'>:</span> <span class='nb'>String</span>
		<span class='p'>{</span>

			<span class='k'>if</span> <span class='p'>(</span><span class='nx'>uncountableWords</span><span class='p'>.</span><span class='nx'>indexOf</span><span class='p'>(</span><span class='nx'>plural</span><span class='p'>)</span> <span class='o'>!=</span> <span class='o'>-</span><span class='mi'>1</span><span class='p'>)</span>
				<span class='k'>return</span> <span class='nx'>plural</span><span class='o'>;</span>

			<span class='k'>var</span> <span class='nx'>singular</span> <span class='o'>:</span> <span class='nb'>String</span> <span class='o'>=</span> <span class='k'>new</span> <span class='nb'>String</span><span class='p'>();</span>
			<span class='k'>for</span> <span class='k'>each</span> <span class='p'>(</span><span class='k'>var</span> <span class='nx'>item</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='k'>in</span> <span class='nx'>singularWords</span><span class='p'>)</span>
			<span class='p'>{</span>
				<span class='k'>var</span> <span class='nx'>s</span> <span class='o'>:</span> <span class='nb'>String</span> <span class='o'>=</span> <span class='nx'>plural</span><span class='p'>.</span><span class='nx'>replace</span><span class='p'>(</span><span class='nx'>item</span><span class='p'>[</span><span class='mi'>0</span><span class='p'>]</span><span class='o'>,</span> <span class='nx'>item</span><span class='p'>[</span><span class='mi'>1</span><span class='p'>]);</span>
				<span class='k'>if</span> <span class='p'>(</span><span class='nx'>s</span> <span class='o'>!=</span> <span class='nx'>plural</span><span class='p'>)</span>
					<span class='nx'>singular</span> <span class='o'>=</span> <span class='nx'>s</span><span class='o'>;</span>
			<span class='p'>}</span>
			<span class='k'>if</span><span class='p'>(</span><span class='nx'>singular</span> <span class='o'>==</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>)</span>
				<span class='k'>return</span> <span class='nx'>plural</span>
			<span class='k'>else</span>
				<span class='k'>return</span> <span class='nx'>singular</span><span class='o'>;</span>
		<span class='p'>}</span>

		<span class='p'>[</span><span class='nx'>Bindable</span><span class='p'>(</span><span class='nx'>event</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>pluralizationChangedEvent</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>)]</span>
		<span class='kd'>public</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>pluiralize</span><span class='p'>(</span><span class='nx'>count</span><span class='o'>:</span><span class='nb'>int</span><span class='o'>,</span> <span class='nx'>word</span><span class='o'>:</span><span class='nb'>String</span><span class='p'>)</span><span class='o'>:</span><span class='nb'>String</span>
		<span class='p'>{</span>
			<span class='k'>if</span><span class='p'>(</span><span class='nx'>count</span> <span class='o'>==</span> <span class='mi'>1</span><span class='p'>)</span>
				<span class='k'>return</span> <span class='nx'>makeSingular</span><span class='p'>(</span> <span class='nx'>word</span> <span class='p'>);</span>

			<span class='k'>return</span> <span class='nx'>makePlural</span><span class='p'>(</span> <span class='nx'>word</span> <span class='p'>);</span>
		<span class='p'>}</span>

		<span class='kd'>static</span> <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>initPluralization</span><span class='p'>()</span> <span class='o'>:</span> <span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='k'>for</span> <span class='k'>each</span> <span class='p'>(</span><span class='k'>var</span> <span class='nx'>arr</span> <span class='o'>:</span> <span class='nb'>Array</span> <span class='k'>in</span> <span class='nx'>irregularWords</span><span class='p'>)</span>
			<span class='p'>{</span>
				<span class='nx'>pluralWords</span><span class='p'>[</span><span class='nx'>pluralWords</span><span class='p'>.</span><span class='nx'>length</span><span class='p'>]</span> <span class='o'>=</span> <span class='p'>[</span><span class='nx'>arr</span><span class='p'>[</span><span class='mi'>0</span><span class='p'>]</span><span class='o'>,</span> <span class='nx'>arr</span><span class='p'>[</span><span class='mi'>1</span><span class='p'>]];</span>
				<span class='nx'>singularWords</span><span class='p'>[</span><span class='nx'>singularWords</span><span class='p'>.</span><span class='nx'>length</span><span class='p'>]</span> <span class='o'>=</span> <span class='p'>[</span><span class='nx'>arr</span><span class='p'>[</span><span class='mi'>1</span><span class='p'>]</span><span class='o'>,</span> <span class='nx'>arr</span><span class='p'>[</span><span class='mi'>0</span><span class='p'>]];</span>
			<span class='p'>}</span>
		<span class='p'>}</span>
	<span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>You activate the pluralization like this:</p>
<div class='highlight'><pre><code class='actionscript'><span class='nx'>PluralizationHelper</span><span class='p'>.</span><span class='nx'>pluralize</span><span class='p'>(</span><span class='nx'>count</span><span class='o'>,</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>module</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>);</span>
</code></pre>
</div>
<p>This will return the correct string.</p>

<p>You can also find the source on github <a href='http://github.com/KensoDev/Flex-Generic-Helpers' target='_blank'> http://github.com/KensoDev/Flex-Generic-Helpers</a></p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/4xTvg2t2bLU" height="1" width="1"/>
