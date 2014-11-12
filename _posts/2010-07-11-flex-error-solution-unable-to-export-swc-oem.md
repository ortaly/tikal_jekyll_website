---
layout: post
title: Flex Error Solution - Unable to export SWC oem
created: 1278865799
author: shair
permalink: /js/flex-error-solution-unable-export-swc-oem
tags:
- JS
- oem
- flex
- error
---
<p>I've encountered a strange error:</p>
<p>&quot;unable to export SWC oem&quot;</p>
<p>&nbsp;</p>
<p>Than I've found that it's a problem in the .flexLibProperties's  tags.</p>
<p>&nbsp;</p>
<p>The solution is to do the following steps:</p>
<p>&nbsp;</p>
<ol>
    <li>Open flexLibProperties (you can open using ctrl+shift+r)</li>
    <li>Delete all the &lt;resourceEntry&gt; tags under &lt;includeResources&gt;</li>
    <li>Go to properties-&gt;build-path-&gt;assets and select all</li>
    <li>Recompile your project</li>
</ol>
<p>&nbsp;</p>
<p>That should do it...</p>
<p>&nbsp;</p>
<p>For more articles you can visit my<a href="http://www.wannaknowflex.com/" target="_blank"> blog on flex</a>.</p>
<p>&nbsp;</p>
<p>Shai</p>
