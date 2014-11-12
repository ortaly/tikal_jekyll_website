---
layout: post
title: Project (unused) References are removed by the compiler.
created: 1341765480
author: menny
permalink: /project-unused-references-are-removed-compiler
tags:
- .NET
---
<p>Have you ever wondered what happens when you add that extra DLL as reference to your project and never use it? Or maybe, you did use it in the past but now you deleted the code and forgot to remove the DLL for some reason.
<p>The good news is that the compiler takes care of that and outputs just the DLL’s that are in use. Take a look at the following example:
<ul>
<li>I have a console application that has no extra references. And as you can see in the architecture explorer, only mscorelib is used. </li>
</ul>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image002.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="clip_image002" border="0" alt="clip_image002" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image002_thumb.png" width="409" height="374"></a></p>
<p> </p>
<ul>
<li>Now I’m adding an extra reference to a “Third Party”’ DLL, but I’m not using it on code. The compiler still ignores it and only reference (again) mscorelib.</li>
</ul>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image004.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="clip_image004" border="0" alt="clip_image004" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image004_thumb.png" width="413" height="376"></a></p>
<p> </p>
<ul>
<li>Finally, I am using that “Third Party” DLL and the compiler reference it as well. </li>
</ul>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image006.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="clip_image006" border="0" alt="clip_image006" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image006_thumb.png" width="410" height="393"></a></p>
<p>So rest assure about your extra reference, of course it’s not always “architectural wise” to keep them or easing the eye to view them, but in the end, they are removed by the compiler.</p>
