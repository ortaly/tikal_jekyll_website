---
layout: post
title: Knockout v2.3.0 released; v3.0.0 beta available
created: 1373519804
author: menny
permalink: knockout-v2-3-0-released-v3-0-0-beta-available
tags:
- JS
- knockout
---
<div class="entry-content">
	<p>Version <a href="http://knockoutjs.com/downloads/knockout-2.3.0.js">2.3.0 final</a> or <a href="http://knockoutjs.com/downloads/knockout-3.0.0beta.js">3.0.0 beta</a> are ready.</p>
	<p>Check Steven Sanderson&rsquo;s blog for more <a href="http://blog.stevensanderson.com/2013/07/09/knockout-v2-3-0-released-v3-0-0-beta-available/">info</a>. Version 3 reveals lots of node integration here is a recap:</p>
	<blockquote>
		<ul>
			<li>
				<code>ko.observable</code>, <code>ko.computed</code>and other non-DOM-related parts of KO can now run on the server in Node.js. <a href="https://npmjs.org/package/knockout">NPM package available</a>.</li>
			<li>
				The <a href="http://knockoutjs.com/documentation/options-binding.html">options binding</a> has been rebuilt and made much smarter:
				<ul>
					<li>
						It now inserts and removes <code>&lt;options&gt;</code>nodes incrementally (rather than recreating them all) as your underlying array changes, leading to much better performance on older browsers.</li>
					<li>
						A new <code>optionsAfterRender</code>callback lets you add custom code to modify <code>&lt;options&gt;</code>nodes as they are added to the document, in case you need this to interoperate with third-party DOM libraries</li>
				</ul>
			</li>
			<li>
				The <a href="http://knockoutjs.com/documentation/template-binding.html#note_5_dynamically_choosing_which_template_is_used">template binding now allows use of an observable template name</a>. This gives you an extra way of switching templates dynamically at runtime.</li>
			<li>
				The <a href="http://knockoutjs.com/documentation/css-binding.html">css binding</a> now allows use of any legal CSS class name. Previously it didn&rsquo;t allow dots or slashes in class names.</li>
			<li>
				<code>ko.unwrap</code>is the new, shorter name for <code>ko.utils.unwrapObservable</code>. Don&rsquo;t worry &ndash; the old name still works too!</li>
		</ul>
	</blockquote>
	<blockquote>
		<p>Bugfixes and compatibilty/perf improvements include:</p>
		<ul>
			<li>
				KO will now warn you with an error if you try to apply bindings to the same element more than once (this was always an error; we just didn&rsquo;t report it before)</li>
			<li>
				The <a href="http://knockoutjs.com/documentation/hasfocus-binding.html">hasfocus</a> and <a href="http://knockoutjs.com/documentation/options-binding.html">options</a> bindings now work around additional edge-case browser quirks, e.g., during page load when running in an iframe in IE9 in compatibility mode (seriously!). This gives you a more consistent developer experience.</li>
			<li>
				Observable arrays have better handling of unexpected parameters (for example, when initialized with non-array values).</li>
			<li>
				The <code>template</code>binding now has more predictable handling of <a href="https://github.com/knockout/knockout/pull/814">malformed HTML markup</a></li>
			<li>
				<a href="http://knockoutjs.com/documentation/json-data.html">ko.toJS</a> now usefully handles <code>String</code>/<code>Number</code>/<code>Boolean</code>object-type properties (as opposed to string/number/bool primitives, which have always worked)</li>
			<li>
				<code>ko.computed</code>now recovers from exceptions thrown during your evaluation callback. Previously, an evaluator exception would stop all future updates for that <code>ko.computed</code>.</li>
			<li>
				Better whitespace handling in string-based templates (e.g., you can now put spaces around the equals character in <code>data-bind = '…'</code>, if you care about that kind of thing).</li>
			<li>
				General perf improvements (e.g., we avoid evaluating <code>scrollTop</code>when not absolutely necessary, as it triggers a rendering reflow).</li>
			<li>
				More than 20 bugfixes for minor issues</li>
		</ul>
	</blockquote>
</div>
<p>&nbsp;</p>
