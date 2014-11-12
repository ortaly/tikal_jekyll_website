---
layout: post
title: Using Xvfb to run headless cucumber/selenium tests with Hudson
created: 1278392313
author: hagzag
permalink: /devops/using-xvfb-run-headless-cucumberselenium-tests-hudson
tags:
- DevOps
- Hudson
- selenium
- cucumber
---
<p>Needed to run Sellenium tests myself on Linux (RHEL5 &amp; 4) didn't have this article to help me then see:</p>
<p>http://markgandolfo.com/2010/07/01/hudson-ci-server-running-cucumber-in-headless-mode-xvfb</p>
<p>&nbsp;</p>
<p>RHEL4 useers please note:</p>
<ol>
    <li>you will need&nbsp;<strong>xorg-x11-Xvfb</strong> and not <strong>xorg-x11-server-Xvfb</strong> as stated in the above article.</li>
    <li>if you need Firefox (well who doesen't <img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" alt="" />) make sure you install it - it isn't installed by default on RHEL!.</li>
</ol>
<p>Hope you find this useful (I know I do ...)</p>
