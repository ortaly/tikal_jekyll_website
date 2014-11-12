---
layout: post
title: (Yet Another) Wicket Misadventure...
created: 1248268545
author: adi
permalink: /java/yet-another-wicket-misadventure
tags:
- JAVA
---
<p>What, in Grimm's name, can be the cause for Wicket to change its output?</p>
<p>&nbsp;</p>
<p><u><strong>Example:</strong></u></p>
<p>&nbsp;&nbsp;&nbsp; Yesterday, the HTML output was:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;table&gt;&lt;thead&gt;&lt;/thead&gt;<span style="color: rgb(51, 102, 255);">&lt;tbodies&gt;&lt;/tbodies&gt;</span><span style="color: rgb(255, 102, 0);">&lt;tfoot&gt;&lt;/tfoot&gt;</span></p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp; Today, the HTML output is:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;table&gt;&lt;thead&gt;&lt;/thead&gt;<span style="color: rgb(255, 102, 0);">&lt;tfoot&gt;&lt;/tfoot&gt;</span><span style="color: rgb(51, 102, 255);">&lt;tbodies&gt;&lt;/tbodies&gt;</span></p>
<p>&nbsp;</p>
<p>What? When? Why?</p>
<p>&nbsp;</p>
<p>(Hints: Built with almighty maven, same wicket version, other dependencies might be different due to new 3rd party libs)</p>
<p>&nbsp;</p>
<p>Please help... we're slicing wrists here...</p>
