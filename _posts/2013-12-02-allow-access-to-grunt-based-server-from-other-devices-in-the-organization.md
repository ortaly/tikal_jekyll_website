---
layout: post
title: Allow access to grunt based server from other devices in the organization
created: 1385989741
author: oren
permalink: /allow-access-grunt-based-server-other-devices-organization
tags:
- JS
- grunt
- yeoman
- AngularJS
---
<p>I created develpment environment through <a href="https://github.com/yeoman/generator-angular">yeoman generator</a> in order to start develop our product.</p>

<p>During the development I tried to access to the server (grunt server on my pc) from another device (IPAD) in order to examine some features.</p>

<p>I typed the IP of my PC but the device could not access, after little checking, I saw that even on my PC I can&#39;t access through the IP, only the localhost ip - &#39;127.0.0.1&#39; was working</p>

<p><strong>To allow access via IP,&nbsp;you must change in the &#39;Gruntfile.js&#39; the&nbsp;value of &#39;hostname&#39; from &#39;localhost&#39; to &#39;0.0.0.0&#39;.</strong></p>

<pre style="margin-top: 0px; margin-bottom: 0px; padding: 10px; font-size: 0.9333em; line-height: 1.5em; font-family: Consolas, 'Lucida Console', 'DejaVu Sans Mono', Monaco, 'Courier New', monospace; background-color: rgb(0, 0, 0); color: rgb(248, 248, 248); border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
options: {
        port: <span style="color: rgb(51, 135, 204);">9000</span>,
        <span style="color: rgb(174, 174, 174); font-style: italic;">// Change this to &#39;0.0.0.0&#39; to access the server from outside.</span>
        hostname: <span style="color: rgb(101, 176, 66);">&#39;localhost&#39;</span>,
        livereload: <span style="color: rgb(51, 135, 204);">35729</span>
      },</pre>
