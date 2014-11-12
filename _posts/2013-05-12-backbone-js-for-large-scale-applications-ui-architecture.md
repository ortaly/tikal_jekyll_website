---
layout: post
title: Backbone.js for large scale applications – UI Architecture
created: 1368353969
author: orenf
permalink: /js/backbonejs-large-scale-applications-–-ui-architecture
tags:
- JS
- Javascript
- backbone.js
- architecture
---
<p><span style="color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;">In my early days as a developer, even before Backbone.js was released, I was eager to learn about good conventions and best practices for organizing code and workflows.</span><br style="margin: 0px; padding: 0px; color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;" />
	<span style="color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;">I knew that somewhere, someone managed to recognize a good pattern that will scale in maintainable code, reusable pieces of code and a good &amp; solid &ldquo;framework&rdquo; to place this code.</span><br style="margin: 0px; padding: 0px; color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;" />
	<span style="color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;">Overtime, I read few articles &amp; watched several talks about software architecture that are relevant to front end development. In this post i&rsquo;m covering the best tips and the overall front end architecture concept behind my latest project&nbsp;</span><a href="http://echotu.be/" style="margin: 0px; padding: 0px; color: rgb(0, 133, 216); border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(204, 204, 204); text-decoration: none; -webkit-transition: color 0.2s ease-out, background-color 0.2s ease-out; transition: color 0.2s ease-out, background-color 0.2s ease-out; font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;" target="_blank" title="Echoes Media Center - Alternative UI &amp; UX for youtube">Echoes Media Center</a><span style="color: rgb(68, 68, 68); font-family: 'Droid Sans', Georgia, 'Times New Roman', serif; font-size: 13.63636302947998px; line-height: 20.909090042114258px;">&nbsp;along with Backbone.js methodology.</span></p>
