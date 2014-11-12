---
layout: post
title: Add power of SASS to ASP.NET application
created: 1381059838
author: igorz
permalink: /net/add-power-sass-aspnet-application
tags:
- .NET
- ASP.NET
- css
- Sass
- Visual Studio
---
<p>I always wanted to find a way to develop CSS in a way I write C# or JavaScript. The main problem in CSS as a language for me were complexity of refactoring and code reuse.<br />
<br />
There were projects such SASS and LESS, but there was no way to adopt them into .NET/Visual Studio environment easily.<br />
<br />
About month ago I met amazing product -&nbsp;<a href="http://www.mindscapehq.com/products/web-workbench">Mindscape Web Workbench&nbsp;</a>. It is a Visual Studio plug in, allows you to write SASS, LESS and Coffee Script with Visual Studio and therefore use power of those technologies in ASP.NET project.<br />
<br />
I actually use only SASS. LESS is an alternative to SASS and Coffee Script is a &quot;competitor&quot; of TypeScript which I already use in my projects. I use free edition, and it is more then enough for me.</p>

<h4>How it works for me:</h4>

<div>1. First step after installing Mindscape Web Workbench - convert existing CSS files into SASS.</div>

<div>Since any CSS is compatible with SASS, the procedure is simple changing of extension of files from &#39;css&#39; to &#39;scss&#39;.</div>

<div>Renamed file will get nice purple icon, moreover, now it can be opened with SASS editor, supporting SASS syntax.</div>

<div>&nbsp;</div>

<div><a href="http://1.bp.blogspot.com/-dTLKucyzUyY/UlEr7TAWvdI/AAAAAAAAXCk/cdyN94PqBGo/s1600/2013-10-06_12h22_03.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/-dTLKucyzUyY/UlEr7TAWvdI/AAAAAAAAXCk/cdyN94PqBGo/s640/2013-10-06_12h22_03.png" /></a></div>

<div>&nbsp;</div>

<div>2. Second step - set up Web Workbench settings. Right click on project node in Solution Explorer and select &#39;Web Workbench Settings...&#39; from menu. It will open settings page, where you can select which files will be compiled and where to place compiled output.&nbsp;</div>

<div>Next time you save changes of *.scss file, it will be compiled and you will see produced output according to settings.</div>

<div>&nbsp;</div>

<div><a href="http://4.bp.blogspot.com/-f1dej_3LnG4/UlEtr9UJILI/AAAAAAAAXCw/4np-sEggbiM/s1600/2013-10-06_12h29_58.png" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/-f1dej_3LnG4/UlEtr9UJILI/AAAAAAAAXCw/4np-sEggbiM/s640/2013-10-06_12h29_58.png" /></a></div>

<div>&nbsp;</div>

<div>3. Start using SASS. You can immediately use SASS with existing code. SASS documentation is available&nbsp;<a href="http://sass-lang.com/docs.html">here</a>. For example, I extracted colors into variables and wrote mixin:</div>

<div>&nbsp;</div>

<div><a href="http://3.bp.blogspot.com/-_yS5PMvce0k/UlExoETVEmI/AAAAAAAAXC8/QvZjLrKoJvA/s1600/2013-10-06_12h47_05.png" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/-_yS5PMvce0k/UlExoETVEmI/AAAAAAAAXC8/QvZjLrKoJvA/s640/2013-10-06_12h47_05.png" /></a></div>

<div>&nbsp;</div>

<div>&nbsp;</div>

<div>By all that I can really &quot;program&quot; my CSS using variables, &nbsp;functions (mixins), scoping (nesting), etc.</div>

<h4>Next Step - work with Compass framework:</h4>

<div>There is a cool CSS framework based on SASS -&nbsp;<a href="http://compass-style.org/">Compass</a>.&nbsp;I did not work with it yet, but they say you may easily get it into with Web Workbench. Right click on project node in Solution Explorer - you will fine &quot;Setup Compass Project&quot; menu. I did play with it, but it seems to be worthy to learn.</div>
