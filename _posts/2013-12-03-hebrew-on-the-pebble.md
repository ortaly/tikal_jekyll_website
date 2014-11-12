---
layout: post
title: Hebrew on the Pebble
created: 1386075120
author: chaim.turkel
permalink: hebrew-on-the-pebble
tags:
- Incubator
- pebble
- hebrew
---
<div class="separator" style="clear: both; text-align: center;">&nbsp;</div>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-F2NeKs6DoFA/Up3SZEncxjI/AAAAAAAAJTA/2d-CcsqumOw/s1600/hebrew_clock.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="http://3.bp.blogspot.com/-F2NeKs6DoFA/Up3SZEncxjI/AAAAAAAAJTA/2d-CcsqumOw/s320/hebrew_clock.png" width="227" /></a></div>

<h1>&nbsp;</h1>

<h1>Hebrew on the Pebble<o:p></o:p></h1>

<div class="MsoNormal">There are many new smart watches out in the market. My personal one is the pebble. In my opinion a watch is an extension of the phone, and not a replacement, &nbsp;&nbsp;and the pebble does just that.<o:p></o:p></div>

<div class="MsoNormal">The main disadvantage of the pebble is the SDK environment. There is no simple way to create a pebble application in windows. The workaround for this is a cloud environment that is very nice, you can find it at: <a href="https://cloudpebble.net/ide/">https://cloudpebble.net/ide/</a><span class="MsoHyperlink">. </span>In the cloud IDE you upload your resources and write your code. From the cloud you can also compile the application and download it for installation from your phone.<o:p></o:p></div>

<div class="MsoNormal">This article will not go into the details of the pebble development. In a broad overview, the pebble GUI is made out of multiple layers that you can create. Each layer can have its own callback so that you can update each layer on a timer that suits you, and only update that layer. There are many API&rsquo;s for writing text or graphics on each layer so that you can display almost any idea you have.<o:p></o:p></div>

<div class="MsoNormal">For a more comprehensive description please see: <a href="http://smittytone.wordpress.com/2013/09/10/how-to-program-the-pebble-smartwatch-part-1/">http://smittytone.wordpress.com/2013/09/10/how-to-program-the-pebble-smartwatch-part-1/</a>.<o:p></o:p></div>

<h2>Language<o:p></o:p></h2>

<div class="MsoNormal">The main feature that is lacking in my option is the support for multiple languages. Pebble supports only English, and does not support other languages. I am not sure for the reason behind this, it might be since the main market is in the US or the limited memory that the pebble has, or both.<o:p></o:p></div>

<div class="MsoNormal">For a review in Hebrew about the watch see: <a href="http://www.geektime.co.il/pebble-smartwatch-review/">http://www.geektime.co.il/pebble-smartwatch-review/</a>.<o:p></o:p></div>

<div class="MsoNormal">The pebble supports two types of applications. Once is a watch face and the other is a watch app. The watch face displays the time in different types of formats and visualizations (a list of watches can be found at <a href="http://www.mypebblefaces.com/">http://www.mypebblefaces.com</a>). The watch app is a richer application that usually also interacts with your phone. <o:p></o:p></div>

<div class="MsoNormal">If you want to create your own watch face but do not know or want to program, there is a great site that lets you customize your own watch app: <a href="http://www.watchface-generator.de/">http://www.watchface-generator.de/</a>.<o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<h2>Fonts<o:p></o:p></h2>

<div class="MsoNormal">This blog will deal only with the watch face, and in a future post we will write about watch apps.<o:p></o:p></div>

<div class="MsoNormal">What the pebble does support is the usage of True Type Fonts (TTF - <a href="http://en.wikipedia.org/wiki/TrueType">http://en.wikipedia.org/wiki/TrueType</a>). The pebble itself comes with some basic fonts and sizes built into the rom (<a href="https://developer.getpebble.com/blog/2013/07/24/Using-Pebble-System-Fonts/">https://developer.getpebble.com/blog/2013/07/24/Using-Pebble-System-Fonts/</a>). You also have the option to add your own custom fonts at the cost of rom location in your app (<a href="http://developer.getpebble.com/sdkref/group___fonts.html">http://developer.getpebble.com/sdkref/group___fonts.html</a>).<o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<h2>Solution<o:p></o:p></h2>

<div class="MsoNormal">Once I found this, the rest is as they say history. All I had to do is to use a Hebrew Font, say David, and decide on the font size that I want. I could then display any graphics that I wanted to, and when adding text I needed to use the TTF that I added to my watch. The only disadvantage is that since the pebble does not support RTL you need to write works backwards for it to display correctly.<o:p></o:p></div>

<div class="MsoNormal">The pebble has computing capabilities as well, so with a build in math lib, you can easily create a conversion from Gregorian dates to Jewish dates. &nbsp;Do in addition to a Hebrew clock, you also get the current Hebrew date, and day of the week.<o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">A copy of the watch face I created can be found at:<o:p></o:p></div>

<div class="MsoNormal"><a href="http://www.mypebblefaces.com/apps/8724/7069/">http://www.mypebblefaces.com/apps/8724/7069/</a><o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-F2NeKs6DoFA/Up3SZEncxjI/AAAAAAAAJS8/f5lcKPVZ3bE/s1600/hebrew_clock.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="200" src="http://1.bp.blogspot.com/-F2NeKs6DoFA/Up3SZEncxjI/AAAAAAAAJS8/f5lcKPVZ3bE/s200/hebrew_clock.png" width="141" /></a></div>

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
</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1027" type="#_x0000_t75"
 style='width:98.25pt;height:138pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">For the more adventurist people that want to see the code for the pebble have a look at:<o:p></o:p></div>

<div class="MsoNormal"><a href="https://github.com/chaimt/aleph-analog">https://github.com/chaimt/aleph-analog</a><o:p></o:p></div>

<h2>More Hebrew watches<o:p></o:p></h2>

<div class="MsoNormal">Another nice watch that displays in Hebrew words the time can be found at:<o:p></o:p></div>

<div class="MsoNormal"><a href="http://www.mypebblefaces.com/apps/2884/2827/">http://www.mypebblefaces.com/apps/2884/2827/</a><o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="separator" style="clear: both; text-align: center;">&nbsp;</div>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-uGP12zVh904/Up3SfLCIENI/AAAAAAAAJTE/hleQ2SoR6e0/s1600/hebrew_text_clock.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="200" src="http://3.bp.blogspot.com/-uGP12zVh904/Up3SfLCIENI/AAAAAAAAJTE/hleQ2SoR6e0/s200/hebrew_text_clock.png" width="141" /></a></div>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>

<div class="MsoNormal">A watch that knows how to display the moon phase can be found at:<o:p></o:p></div>

<p>&nbsp;</p>

<div class="MsoNormal"><a href="http://www.mypebblefaces.com/apps/3300/3549/">http://www.mypebblefaces.com/apps/3300/3549/</a><span class="MsoHyperlink"><o:p></o:p></span></div>

<div>&nbsp;</div>

<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-qffJtr4FzCs/Up3SfKBqfMI/AAAAAAAAJTQ/ocjlYkysQeE/s1600/moon_clock.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="200" src="http://2.bp.blogspot.com/-qffJtr4FzCs/Up3SfKBqfMI/AAAAAAAAJTQ/ocjlYkysQeE/s200/moon_clock.png" width="144" /></a></div>

<div>&nbsp;</div>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>
