---
layout: post
title: Tobago And Richfaces Won't live toghther
created: 1237458061
permalink: tobago-and-richfaces-wont-live-toghther
tags:
- JAVA
- JSF Tobago Richfaces
---
<p>Recently i've tried to integrate<em> MyFaces Tobago</em> component library into an application i'm working on.</p><p>This application environment configuration is :</p><p>- JSF implementaion: myfaces-impl</p><p>-Component Libraries: <em>Richfaces </em>, <em>MyFaces Tomahawk</em></p>
<!--break-->
<p>after a short research came with the conclusion that Tobago component library won't live in this configuration ,due to the fact that</p><p>JSF only supports one renderkit (renderkitId) per page (f:view). Because Tobago has it's own renderkitId you cannot use any non-Tobago components that need a renderer.</p><p><em>RichFaces</em> components uses their own renderers.</p><p>That lead us to this sad conclusion , Nop, they won't live together <img alt="" src="/community/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/whatchutalkingabout_smile.gif" /></p><p>&nbsp;</p>
