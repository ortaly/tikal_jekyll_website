---
layout: post
title: Strange flex bug - caching screens
created: 1338394544
author: avit
permalink: /strange-flex-bug-caching-screens
tags:
- Ruby
- web
---
<p>Hello All,</p>

<p>Thanks again for visiting my blog, “From inspiration to realization”. The blog covers lots of  information about <a href='http://www.kensodev.com' title='Web Development'>Web Development</a>: <a href='http://www.kensodev.com/category/ruby-on-rails/' title='Ruby On Rails'>Ruby on Rails</a>, <a href='http://www.kensodev.com/category/java/' title='Java'>Java</a>, <a href='http://www.kensodev.com/category/flex/' title='Flex'>Flex</a> and etc.</p>

<p>The past week has been very frustrating for me. As you know (or not) I work quite a bit with flex development and AIR.</p>

<p>The environment for developing these applications is <a href='http://www.adobe.com/products/flex/' target='_blank'>Adobe Flex Builder 3</a>, I never had any problems with this peace of software, but this last week has been just horrible.</p>

<p>I will explain my problem.</p>

<p>As you know (again or not…) I’m not a designer and I don’t wanna be one, so… I got all of the designs from the designer of the project via PSD, cut all of the “assets” to use in my flex application and started off with building each screen.</p>

<p>As always, I wrote some CSS (yeah.. Flex has css, same as HTML), build an swf file for holding all of the assets (swc), and started dragging in controls.</p>

<p>All pretty basic so far, but…</p>

<p>Sometimes (well, all the time) the flex just refused to build with the recent changes, After the first time I build an swf from the flex IDE, no change I made to the application actually “kicked in”.</p>
<strong>Action-Script
</strong>
<p>The application just would not update. <div style='border: 1px solid gray; padding: 4px; font-size: 8pt; margin: 20px 0px 10px; overflow: auto; width: 97.5%; cursor: text; max-height: 200px; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4;'>
<div style='padding: 0px; font-size: 8pt; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4;'>
<pre style='padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: white;'><span style='color: #606060;'>   1:</span> <span style='color: #0000ff;'>private</span> <span style='color: #0000ff;'>function</span> initScreen():<span style='color: #0000ff;'>void</span></pre>
<pre style='padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4;'><span style='color: #606060;'>   2:</span> {</pre>
<pre style='padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: white;'><span style='color: #606060;'>   3:</span>     screenMainText.htmlText=<span style='color: #006080;'>"Please Choose which of the Questionnaires below you would like to compile for your Survey"</span>;</pre>
<pre style='padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4;'><span style='color: #606060;'>   4:</span>     backButton.label = <span style='color: #006080;'>"Back to control panel"</span>;</pre>
<pre style='padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; border-style: none; line-height: 12pt; font-family: consolas,&apos;Courier New&apos;,courier,monospace; background-color: white;'><span style='color: #606060;'>   5:</span> }</pre>
</div>
</div> What did I do to see the updated?</p>

<p>I copied all of the code from the mxml file, deleted this file, created a new file, pasted in the copied code and WALLA, the updates “kicked in”</p>

<p>Strangely though even a project cleaning would not help</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/03/flex-issue.jpg'><img alt='flex_issue' border='0' height='148' src='http://www.kensodev.com/wp-content/uploads/2009/03/flex-issue-thumb.jpg' style='border-width: 0px;' width='244' /></a>
<p>I emailed Adobe, but got no response so far, I will update here and tweet on the solution I hope they provide.</p>

<p>** I tried importing another project to the flex builder, but the error did not exist in another project, only in this specific project.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/Vi3k2XA00ug" height="1" width="1"/>
