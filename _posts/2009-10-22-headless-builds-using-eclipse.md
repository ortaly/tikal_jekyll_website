---
layout: post
title: headless builds using eclipse
created: 1256202879
author: ittayd
permalink: /devops/headless-builds-using-eclipse
tags:
- DevOps
- headless eclipse build
---
<p>if eclipse knows how to build your code, why do you need another tool to maintain the build?</p>
<p>&nbsp;</p>
<p><a href="http://code.google.com/p/headlesseclipse/" class="moz-txt-link-freetext">http://code.google.com/p/headlesseclipse/</a> provides a way of reusing the configuration of eclipse projects and dependencies for a headless build. that way, dependencies are defined only in the eclipse projects (rather than ant/maven). </p>
<p>&nbsp;</p>
<p>See usage here: http://code.google.com/p/headlesseclipse/wiki/Documentation</p>
<p>And what it does here: http://code.google.com/p/headlesseclipse/wiki/HowItWorks</p>
<p>&nbsp;</p>
<p>Note that it doesn't take care of downloading 3rd party libraries as Ivy or Maven do. </p>
<p>&nbsp;</p>
