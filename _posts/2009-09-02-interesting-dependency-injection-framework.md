---
layout: post
title: Interesting dependency injection framework
created: 1251895902
author: andrew
permalink: /net/interesting-dependency-injection-framework
tags:
- .NET
- DI IoC
- .Net Open Source
---
<p>&nbsp;For all of you tired of creating cumbersome ASP.Net providers and struggling with App.config, a lightweight yet powerful dependency injection for .Net: <a href="http://ninject.org">Ninject</a>. This is an example how the injection works with properties:</p>
<p>&nbsp;</p>
<p><span class="Apple-style-span" style="color: rgb(85, 85, 85); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; line-height: normal; "> </span></p>
<pre class="code" style="font-family: 'Courier New', 'Lucida Console', monospace; color: rgb(0, 0, 0); padding-top: 8px; padding-right: 8px; padding-bottom: 8px; padding-left: 8px; margin-top: 0px; margin-right: 10px; margin-bottom: 0px; margin-left: 10px; border-top-style: dashed; border-right-style: dashed; border-bottom-style: dashed; border-left-style: dashed; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-color: rgb(153, 153, 153); border-right-color: rgb(153, 153, 153); border-bottom-color: rgb(153, 153, 153); border-left-color: rgb(153, 153, 153); background-color: rgb(255, 255, 240); "><span class="keyword" style="color: rgb(0, 0, 255); ">class</span> Samurai {
  <span class="keyword" style="color: rgb(0, 0, 255); ">private</span> IWeapon _weapon;<br /><br />  [Inject]
  <span class="keyword" style="color: rgb(0, 0, 255); ">public</span> IWeapon Weapon {
    get { <span class="keyword" style="color: rgb(0, 0, 255); ">return</span> _weapon; }
    set { _weapon = <span class="keyword" style="color: rgb(0, 0, 255); ">value</span>; }
  }<br /><br />  <span class="keyword" style="color: rgb(0, 0, 255); ">public</span> <span class="keyword" style="color: rgb(0, 0, 255); ">void</span> Attack(<span class="keyword" style="color: rgb(0, 0, 255); ">string</span> target) {
    _weapon.Hit(target);
  }
}</pre>
<p>Hope you will enjoy it!</p>
