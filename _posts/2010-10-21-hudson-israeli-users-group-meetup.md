---
layout: post
title: Hudson Israeli Users Group meetup
created: 1287637428
author: ittayd
permalink: /devops/hudson-israeli-users-group-meetup
tags:
- DevOps
- Hudson
---
<p>Yesterday we had a meetup of israeli Hudson users with Kohsuke Kawaguchi<span class="screen-name screen-name-kohsukekawa pill"><br />
</span></p>
<p>&nbsp;</p>
<p>Kohsuke gave a presentation about current status of Hudson and future roadmap and it followed by Q&amp;A&nbsp;session.</p>
<p>&nbsp;</p>
<p>Most questions involvend trying to &quot;push the limits&quot;&nbsp;of Hudson:</p>
<ul>
    <li>Release management - Using hudson to manage different types of builds for QA and release while maintaining CI:&nbsp;In this aspect, having the ability to use the same jobs for testing and release builds, being able to split a multi-module product to separate small &amp;&nbsp;quick builds while still having a coherent overall view</li>
    <li>Deplyoment - Deploying artifacts to test servers:&nbsp;This mainly requires advanced workflows that are currently tricky to do in Hudson</li>
    <li>&quot;Management&quot; view - Giving developers and managers a simpler view of jobs:&nbsp;Grouping jobs into a coherent product build, being able to generate and send reports, project oriented dashboard</li>
</ul>
<p>&nbsp;</p>
<p>Some other requests/questions were:</p>
<ul>
    <li>Being able to put configurations into SCM&nbsp;so that any change is automatically committed. This also allows to have a staging and production instances of Hudson share configuration so changes can be tested before pushing them to production.</li>
    <li>Give the option for bisecting the change log of a failed build to find the exact commit that broke the build:&nbsp;This may create confusion since it means going back in the SCM&nbsp;history to build which means newer builds have older source.</li>
    <li>Working on different branches and being able to trigger jobs for them. This means that builds do not correlate with a sequence of changes (build 1 from branch A, build 2 from branch B)</li>
    <li>Maven 3 support:&nbsp;Someone already working on it</li>
    <li>Being able to script the checkout of sources to get custom logic while still have Hudson track the change log</li>
</ul>
<p>&nbsp;</p>
<p>The presentation and some photos are attached</p>
<p>&nbsp;</p>
<p>Update:&nbsp;Kohsuke's post is here:&nbsp;http://goo.gl/fb/wNC17</p>
<p>&nbsp;</p>
