---
layout: post
title: Why test for the existence of children before creating them in createChildren
created: 1249771367
permalink: why-test-for-the-existence-of-children-before-creating-them-in-createchildren
tags:
- JS
- createChildren
---
<p>Testing for&nbsp;the existence of the children before creating them in createChildren is a <a href="http://livedocs.adobe.com/flex/201/html/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Book_Parts&amp;file=ascomponents_advanced_148_11.html">documented </a>best practice.</p>
<p>The more common reason for this is, like documented,&nbsp;allowing a subclass&nbsp;to create a different&nbsp;child.<br />
The Panel is a good example of this, allowing to create a different header by replacing it's protected titleBar.</p>
<p>&nbsp;</p>
<p>However, even if your'e not planning on allowing creating a different child, there's another good reason for you to still do so.</p>
<p>CreateChildren is a function called on the attachment phase of a component (attached by addChild).</p>
<p>Attachment obviously occurs on the first time your component is being added to the display list, but its important to realize that youre createChildren code might run more than once during the lifetime of your component (mentioned <a href="http://www.mail-archive.com/flexcoders@yahoogroups.com/msg36798.html">here </a>as well). For example, when your component is re-attached (removed and added again).</p>
<p>&nbsp;</p>
<p>Children of MXML components, which are created using <font size="2"><font size="2">createComponentFromDescriptor</font>() will not get re-created since&nbsp;the function&nbsp;checks for existence (using <font size="2">hasChildMatchingDescriptor).</font></font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
