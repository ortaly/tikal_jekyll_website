---
layout: post
title: Copy object properties to another object - Flex
created: 1338394544
author: avit
permalink: /copy-object-properties-another-object-flex
tags:
- Ruby
- web
---
<p>In a project I am working on with <a href='http://www.kensodev.com/tag/flex/' title='Flex'>Flex</a> and <a href='http://www.kensodev.com/tag/as3/' title='AS3'>AS3</a> I needed to copy all of the object’s properties and accessors to another object. Because I didn’t want to hard code the properties for various reasons, I needed to write a function that will “crawl” the object properties and accessors and copy then to the new object.</p>

<p>I created a static function that does exactly that:</p>
<div class='highlight'><pre><code class='actionscript'>		<span class='cm'>/**</span>
<span class='cm'>		 * copies a source object to a destination object</span>
<span class='cm'>		 * @param sourceObject the source object</span>
<span class='cm'>		 * @param destinationObject the destination object</span>
<span class='cm'>		 *</span>
<span class='cm'>		 */</span>
		<span class='kd'>public</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>copyObject</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='o'>:</span><span class='nb'>Object</span><span class='o'>,</span> <span class='nx'>destinationObject</span><span class='o'>:</span><span class='nb'>Object</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='c1'>// check if the objects are not null</span>
			<span class='k'>if</span><span class='p'>((</span><span class='nx'>sourceObject</span><span class='p'>)</span> <span class='o'>&</span><span class='nx'>amp</span><span class='o'>;&</span><span class='nx'>amp</span><span class='o'>;</span> <span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>))</span> <span class='p'>{</span>
				<span class='k'>try</span>
				<span class='p'>{</span>
					<span class='c1'>//retrive information about the source object via XML</span>
					<span class='k'>var</span> <span class='nx'>sourceInfo</span><span class='o'>:</span><span class='nb'>XML</span> <span class='o'>=</span> <span class='nx'>describeType</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>);</span>
					<span class='k'>var</span> <span class='nx'>objectProperty</span><span class='o'>:</span><span class='nb'>XML</span><span class='o'>;</span>
					<span class='k'>var</span> <span class='nx'>propertyName</span><span class='o'>:</span><span class='nb'>String</span><span class='o'>;</span>

					<span class='c1'>// loop through the properties</span>
					<span class='k'>for</span> <span class='k'>each</span><span class='p'>(</span><span class='nx'>objectProperty</span> <span class='k'>in</span> <span class='nx'>sourceInfo</span><span class='p'>.</span><span class='nx'>variable</span><span class='p'>)</span>
					<span class='p'>{</span>
						<span class='nx'>propertyName</span> <span class='o'>=</span> <span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='o'>;</span>
						<span class='k'>if</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>!=</span> <span class='kc'>null</span><span class='p'>)</span>
						<span class='p'>{</span>
							<span class='k'>if</span><span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>.</span><span class='nx'>hasOwnProperty</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>))</span> <span class='p'>{</span>
								<span class='nx'>destinationObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>=</span> <span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>];</span>
							<span class='p'>}</span>
						<span class='p'>}</span>
					<span class='p'>}</span>
					<span class='c1'>//loop through the accessors</span>
					<span class='k'>for</span> <span class='k'>each</span><span class='p'>(</span><span class='nx'>objectProperty</span> <span class='k'>in</span> <span class='nx'>sourceInfo</span><span class='p'>.</span><span class='nx'>accessor</span><span class='p'>)</span> <span class='p'>{</span>
						<span class='k'>if</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>access</span> <span class='o'>==</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>readwrite</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>)</span> <span class='p'>{</span>
							<span class='nx'>propertyName</span> <span class='o'>=</span> <span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='o'>;</span>
							<span class='k'>if</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>!=</span> <span class='kc'>null</span><span class='p'>)</span>
							<span class='p'>{</span>
								<span class='k'>if</span><span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>.</span><span class='nx'>hasOwnProperty</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>))</span> <span class='p'>{</span>
									<span class='nx'>destinationObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>=</span> <span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>];</span>
								<span class='p'>}</span>
							<span class='p'>}</span>
						<span class='p'>}</span>
					<span class='p'>}</span>
				<span class='p'>}</span>
				<span class='k'>catch</span> <span class='p'>(</span><span class='nx'>err</span><span class='o'>:*</span><span class='p'>)</span> <span class='p'>{</span>
					<span class='o'>;</span>
				<span class='p'>}</span>
			<span class='p'>}</span>
</code></pre>
</div>
<p>This function will copy everything. You can simply add an “allowedProperties” definition and make the function only copy definitions and properites which exist in your allowed definition.</p>

<p>Like so:</p>
<div class='highlight'><pre><code class='actionscript'><span class='kd'>private</span> <span class='kd'>static</span> <span class='k'>var</span> <span class='nx'>allowedProperties</span><span class='o'>:</span><span class='nb'>String</span> <span class='o'>=</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>height</span><span class='o'>,</span><span class='nx'>width</span><span class='o'>,</span><span class='nx'>visible</span><span class='o'>,</span><span class='nx'>styleName</span><span class='o'>,</span><span class='nx'>x</span><span class='o'>,</span><span class='nx'>y</span><span class='o'>,</span><span class='nx'>alpha</span><span class='o'>,</span><span class='nx'>visible</span><span class='o'>,</span><span class='nx'>source</span><span class='o'>,</span><span class='nx'>dataProvider</span><span class='o'>,</span><span class='nx'>styleDecleration</span><span class='o'>,</span><span class='nx'>text</span><span class='o'>,</span><span class='nx'>label</span><span class='o'>,</span><span class='nx'>horizontalScrollPolicy</span><span class='o'>,</span><span class='nx'>labelField</span><span class='o'>,&</span><span class='nx'>quot</span><span class='o'>;;</span>

		<span class='kd'>public</span> <span class='kd'>static</span> <span class='kd'>function</span> <span class='nx'>copyDisplayObjectData</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='o'>:</span><span class='nb'>Object</span><span class='o'>,</span> <span class='nx'>destinationObject</span><span class='o'>:</span><span class='nb'>Object</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span>
		<span class='p'>{</span>
			<span class='k'>if</span><span class='p'>((</span><span class='nx'>sourceObject</span><span class='p'>)</span> <span class='o'>&</span><span class='nx'>amp</span><span class='o'>;&</span><span class='nx'>amp</span><span class='o'>;</span> <span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>))</span> <span class='p'>{</span>
				<span class='k'>try</span>
				<span class='p'>{</span>
					<span class='k'>var</span> <span class='nx'>sourceInfo</span><span class='o'>:</span><span class='nb'>XML</span> <span class='o'>=</span> <span class='nx'>describeType</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>);</span>
					<span class='k'>var</span> <span class='nx'>objectProperty</span><span class='o'>:</span><span class='nb'>XML</span><span class='o'>;</span>
					<span class='k'>var</span> <span class='nx'>propertyName</span><span class='o'>:</span><span class='nb'>String</span><span class='o'>;</span>
					<span class='err'>�</span>
					<span class='k'>for</span> <span class='k'>each</span><span class='p'>(</span><span class='nx'>objectProperty</span> <span class='k'>in</span> <span class='nx'>sourceInfo</span><span class='p'>.</span><span class='nx'>variable</span><span class='p'>)</span>
					<span class='p'>{</span>
						<span class='nx'>propertyName</span> <span class='o'>=</span> <span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='o'>;</span>
						<span class='k'>if</span><span class='p'>(</span><span class='nx'>allowedProperties</span><span class='p'>.</span><span class='nx'>indexOf</span><span class='p'>(</span><span class='nx'>propertyName</span><span class='p'>)</span> <span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span> <span class='o'>-</span><span class='mi'>1</span><span class='p'>)</span>
						<span class='p'>{</span>
							<span class='k'>if</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>!=</span> <span class='kc'>null</span><span class='p'>)</span>
							<span class='p'>{</span>
								<span class='k'>if</span><span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>.</span><span class='nx'>hasOwnProperty</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>))</span> <span class='p'>{</span>
									<span class='nx'>destinationObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>=</span> <span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>];</span>
								<span class='p'>}</span>
							<span class='p'>}</span>

						<span class='p'>}</span>
					<span class='p'>}</span>
					<span class='err'>�</span>
					<span class='k'>for</span> <span class='k'>each</span><span class='p'>(</span><span class='nx'>objectProperty</span> <span class='k'>in</span> <span class='nx'>sourceInfo</span><span class='p'>.</span><span class='nx'>accessor</span><span class='p'>)</span> <span class='p'>{</span>
						<span class='k'>if</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>access</span> <span class='o'>==</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>readwrite</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>)</span> <span class='p'>{</span>
							<span class='nx'>propertyName</span> <span class='o'>=</span> <span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='o'>;</span>
							<span class='k'>if</span><span class='p'>(</span><span class='nx'>allowedProperties</span><span class='p'>.</span><span class='nx'>indexOf</span><span class='p'>(</span><span class='nx'>propertyName</span><span class='p'>)</span> <span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span> <span class='o'>-</span><span class='mi'>1</span><span class='p'>)</span>
							<span class='p'>{</span>
								<span class='k'>if</span><span class='p'>(</span><span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>!=</span> <span class='kc'>null</span><span class='p'>)</span>
								<span class='p'>{</span>
									<span class='k'>if</span><span class='p'>(</span><span class='nx'>destinationObject</span><span class='p'>.</span><span class='nx'>hasOwnProperty</span><span class='p'>(</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>))</span> <span class='p'>{</span>
										<span class='nx'>destinationObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>]</span> <span class='o'>=</span> <span class='nx'>sourceObject</span><span class='p'>[</span><span class='nx'>objectProperty</span><span class='p'>.</span><span class='err'>@</span><span class='nx'>name</span><span class='p'>];</span>
									<span class='p'>}</span>
								<span class='p'>}</span>
							<span class='p'>}</span>
						<span class='p'>}</span>
					<span class='p'>}</span>
				<span class='p'>}</span>
				<span class='k'>catch</span> <span class='p'>(</span><span class='nx'>err</span><span class='o'>:*</span><span class='p'>)</span> <span class='p'>{</span>
					<span class='o'>;</span>
				<span class='p'>}</span>
			<span class='p'>}</span>
		<span class='p'>}</span>
</code></pre>
</div>
<p>That’s it, tricky but absolutely can be done :-)</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/yLzB-SFWS0Y" height="1" width="1"/>
