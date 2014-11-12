---
layout: post
title: Mono's Gendarme
created: 1299758139
author: igorz
permalink: /net/monos-gendarme
tags:
- .NET
- .Net Open Source
- Gendarme
- IZWebFileManager
- Mono
- tools
---
<p><a href="http://www.mono-project.com/Gendarme">Gendarme</a> is a  extensible rule-based tool to find problems in .NET applications and  libraries. Gendarme inspects programs and libraries that contain code in  ECMA CIL format (Mono and .NET) and looks for common problems with the  code, problems that compiler do not typically check or have not  historically checked.<br />
<br />
I ran this tool against my <a href="http://www.izwebfilemanager.com/">IZWebFileManager</a>. The result was 1213 potential defects using 254 rules!:<br />
</p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" href="https://lh5.googleusercontent.com/-vCrAEZEBJFo/TXi5M8rBUTI/AAAAAAAALG8/CoS5kBbL3GA/s1600/2011-03-10+13h35_01.png"><img height="507" border="0" width="640" src="https://lh5.googleusercontent.com/-vCrAEZEBJFo/TXi5M8rBUTI/AAAAAAAALG8/CoS5kBbL3GA/s640/2011-03-10+13h35_01.png" alt="" /></a></div>
<br />
<br />
<p>Seems I have a lot of work here.</p>
