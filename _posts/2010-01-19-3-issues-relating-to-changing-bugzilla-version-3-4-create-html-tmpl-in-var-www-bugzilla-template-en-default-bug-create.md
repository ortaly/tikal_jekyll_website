---
layout: post
title: 3 issues relating to changing bugzilla version 3.4 create.html.tmpl in /var/www/bugzilla/template/en/default/bug/create
created: 1263910556
permalink: 3-issues-relating-to-changing-bugzilla-version-3-4-create-html-tmpl-in-var-www-bugzilla-template-en-default-bug-create
tags:
- DevOps
- template
- layout
- cutsomization
---
<p>Hi,</p>
<p>I wonder if one of you can help me.</p>
<p>Issue #1: Result - Success</p>
<p>================</p>
<p>Lately I was successful in directly modifying file create.html.tmpl in /var/www/bugzilla/template/en/default/bug/create so that the bug description text box contains by default the paragraphs headline that should be included.</p>
<p>&nbsp;</p>
<p>This is how I (somewhat primitively) did it:</p>
<p>&nbsp;</p>
<p><em>... </em></p>
<p><em>&nbsp; &lt;tr&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;th&gt;Summary:&lt;/th&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;td colspan=&quot;3&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;input name=&quot;short_desc&quot; size=&quot;70&quot; value=&quot;[% short_desc FILTER html %]&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxlength=&quot;255&quot; spellcheck=&quot;true&quot;&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/td&gt;<br />
&nbsp; &lt;/tr&gt;<br />
<br />
&nbsp; &lt;tr&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;th&gt;Description:&lt;/th&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;td colspan=&quot;3&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% defaultcontent = BLOCK %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% IF cloned_bug_id %]<br />
+++ This [% terms.bug %] was initially created as a clone of [% terms.Bug %] #[% cloned_bug_id %] +++<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% END %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [%-# We are within a BLOCK. The comment will be correctly HTML-escaped<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # by global/textarea.html.tmpl. So we must not escape the comment here. %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% comment FILTER none %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [%- END %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% INCLUDE global/textarea.html.tmpl<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 'comment'<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 'comment'<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; minrows&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 10<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxrows&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 25<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cols&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = constants.COMMENT_COLS<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; defaultcontent = &quot;General\n=======\n\n\nReproduction\n============\n\n\nExpected Result\n===============\n\n\nActual Result\n=============\n\n&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; %]<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;br&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/td&gt;</em><br />
....</p>
<p>Issue #2: Result - Success then failure</p>
<p>=======================</p>
<p>&nbsp;</p>
<p>Excited with my success, I proceeded to creating a list of default CCs of my QA team, to be emailed each time a new bug is submitted, and only then.</p>
<p>This was a combination of changing email preferences in bugzilla UI and adding the following to the now infamous create.html.tmpl:</p>
<p>&nbsp;</p>
<p>...</p>
<p>&nbsp; <em>&lt;tr&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;th&gt;CC:&lt;/th&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;td colspan=&quot;2&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [% INCLUDE global/userselect.html.tmpl<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name =&gt; cc<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; value =&gt; &quot;h.m@kenshoo.com,a.t@kenshoo.com,rd.g@kenshoo.com,a.b@kenshoo.com,m.r@kenshoo.com,a.m@kenshoo.com,a.b@kenshoo.com&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; size =&gt; 30<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; multiple =&gt; 10<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; %]<br />
&nbsp;&nbsp;&nbsp; &lt;/td&gt;<br />
&nbsp; &lt;/tr&gt;</em><br />
...</p>
<p>Of course, I went through all my team's bugzilla accounts and only checked 'CC' in the following options:</p>
<p>-                 I'm added to or removed from this capacity</p>
<p>-                 A new bug is created</p>
<p>-                 The CC field changes</p>
<p>&nbsp;</p>
<p>This worked for a while (the list of CC's actually appeared in the form) but then, with no warning, stopped working, meaning the QA team does not get a mail notification when someone submits a new bug.</p>
<p>&nbsp;</p>
<p>Any idea what went wrong or how I can achieve this purpose in a more sophhisticated method?</p>
<p>&nbsp;</p>
<p>Issue #3: Result - Lost in the dark</p>
<p>=====================</p>
<p>As you probably know, user defined fields only appear in the left column of the create bug page, with their order determined by 'Priority' number.</p>
<p>My team leader asked me a seemingly simple request: Can you put a new customized field, say, &quot;Browser Version&quot; so that it appears after last field in the right hand side of the page, to which more attention is devoted, as it contains important fields such as &quot;Severity&quot;, &quot;Priority&quot;.</p>
<p>Till now I was not successful in changing the template to achieve this.</p>
<p>Any magical Ideas how to do this? Can someone even send me a modified template I can learn from?</p>
<p>&nbsp;</p>
<p>Thank you very much in advance,</p>
<p>&nbsp;</p>
<p>Dekel Granit</p>
<p>&nbsp;</p>
