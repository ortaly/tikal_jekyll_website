---
layout: post
title: Modifing Table's COL node - error
created: 1237450907
permalink: modifing-tables-col-node-error
tags:
- JAVA
---
<p>Hi all,</p> <div>I got into this issue and I just wonder if you can verify it and what is your workarround?</div><div>Here is a simple Table</div><div>&nbsp;</div> <div class="rteindent1">&lt;Table&gt; &nbsp;</div><div class="rteindent1">&lt;col width=&quot;10&quot;/&gt; &nbsp;</div><div class="rteindent1">&lt;col width=&quot;20&quot;/&gt;</div><div class="rteindent1">&nbsp;&lt;tr&gt; &nbsp;&nbsp;</div><div class="rteindent1">&nbsp;&nbsp;&nbsp; &lt;td&gt;test1&lt;/td&gt; &nbsp;&nbsp;</div><div class="rteindent1">&nbsp;&nbsp;&nbsp; &lt;td&gt;test2&lt;/td&gt;</div><div class="rteindent1">&lt;/tr&gt;</div><div class="rteindent1">&lt;/table&gt;</div><div>&nbsp;</div><div>When I'm trying to modify the COL elements via DOM API it gives me the error (insertBefore, removeChild etc.)</div><div>The Only thig I could think of was changing its properties' values.</div><p>Thank you.</p>
