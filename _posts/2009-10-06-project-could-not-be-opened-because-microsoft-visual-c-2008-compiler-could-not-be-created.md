---
layout: post
title: Project could not be opened because Microsoft Visual C# 2008 compiler could
  not be created
created: 1254806825
permalink: project-could-not-be-opened-because-microsoft-visual-c-2008-compiler-could-not-be-created
tags:
- .NET
- Visual Studio
---
<p>&nbsp;If you get an error message as appears in the post's title, you will probably get a recommendation &quot;try to instal Visual Studio&quot;. So don't.</p>
<p>&nbsp;</p>
<p>I found several techniques that may help solve this problem.&nbsp;Before you try anything (especially messing the registry), try the following command line:</p>
<p>&nbsp;</p>
<p><strong>devenv&nbsp;/ResetSkipPkgs</strong></p>
<p>&nbsp;</p>
<p>At least for now my problem is solved.</p>
