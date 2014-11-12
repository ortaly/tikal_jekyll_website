---
layout: post
title: Eclipse – Jenkins
created: 1388328506
author: chaim.turkel
permalink: eclipse-jenkins
tags:
- JAVA
- Java
- jenkins
- eclipse
---
<h1>Eclipse &ndash; Jenkins<o:p></o:p></h1>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">Of course my assumption is that you are practicing continuous integration. If not you should begin with it right away. For more information see <a href="http://en.wikipedia.org/wiki/Continuous_integration">http://en.wikipedia.org/wiki/Continuous_integration</a>.<o:p></o:p></div>

<div class="MsoNormal">One of the problems with Jenkins is that you need to always open the browser to check what the status of the build is. One of the rules for CI is never commit on a broken build (some even say on a running build), so you need to know the status of the build in a simple an easy way.<o:p></o:p></div>

<div class="MsoNormal">Another issue, is once the build is broken you need to click multiple times until you can get the information that you need to fix the build.<o:p></o:p></div>

<div class="MsoNormal">Well all this changes with the plugin for eclipse. You can download the plugin from <a href="http://marketplace.eclipse.org/content/hudsonjenkins-mylyn-builds-connector#.UsAyivQW1VA">http://marketplace.eclipse.org/content/hudsonjenkins-mylyn-builds-connector#.UsAyivQW1VA</a>, or just search the market place for Jenkins.<o:p></o:p></div>

<div class="MsoNormal">This plugin will display the builds that you choose within your eclipse:<o:p></o:p></div>

<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-x9Wc-XwAtVI/UsA1DZ0AdsI/AAAAAAAAJko/2-jd3yW2AW8/s1600/one.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-x9Wc-XwAtVI/UsA1DZ0AdsI/AAAAAAAAJko/2-jd3yW2AW8/s1600/one.png" /></a></div>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;">&nbsp;</div>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal"><!--[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1026" type="#_x0000_t75"
 style='width:468pt;height:78.75pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><o:p></o:p></div>

<div class="MsoNormal">The interval for the status checking should be changed since the default is 15 minutes.<o:p></o:p></div>

<div class="MsoNormal">A double click on the build will display the tests run, where you can choose to see the console output<o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-Et9EZrulLww/UsA1JO87Y2I/AAAAAAAAJk0/gA59ddYMSHo/s1600/two.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-Et9EZrulLww/UsA1JO87Y2I/AAAAAAAAJk0/gA59ddYMSHo/s1600/two.png" /></a></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal"><!--[if gte vml 1]><v:shape
 id="Picture_x0020_2" o:spid="_x0000_i1025" type="#_x0000_t75" style='width:468pt;
 height:175.5pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image003.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><o:p></o:p></div>

<div class="MsoNormal">On the junit view, you can click on any test, and it will open the code for that test. You can filter the view to see only failed tests or all of them.<o:p></o:p></div>

<div class="MsoNormal">A right click on the build will bring you the option to view old build or even to run a new build.<o:p></o:p></div>

<div class="MsoNormal">Eclipse even support instant notifications that pop up when a build finished.<o:p></o:p></div>

<div class="MsoNormal">Once you install this plugin you will never need to open the Jenkins in your web browser again<o:p></o:p></div>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>
