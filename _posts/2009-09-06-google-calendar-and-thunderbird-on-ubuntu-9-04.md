---
layout: post
title: Google Calendar & Thunderbird on Ubuntu 9.04
created: 1252235291
author: hagzag
permalink: /devops/google-calendar-thunderbird-ubuntu-904
tags:
- DevOps
- Thunderbird
- lightning
- Google-Provider
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<title></title>
<meta name="GENERATOR" content="OpenOffice.org 3.0  (Linux)"> 	<style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
	-->
	</style></meta>
</meta>
</p>
<p>Google Calendar / Google Apps integration with Thunderbird, seems to be a simple task to accomplish don't you think?</p>
<p>This is the second or third time this has happened to me therefore I thought I'd share this with you guys!</p>
<p>Well, I had an experience with one of my colleges today having to install Thunderbird + Lightning + Google Provider on Ubutnu 9.04 and I tell you it wasn't that straight forward.</p>
<p>&nbsp;</p>
<p>The recipe is supposed to be quite simple if you want an external calendar in your Thunderbird you need lightning, if you want to integrate a Gmail calendar with your Thunderbird you need Google Provider.</p>
<p>In fact, what happens is if you install Google-provider &amp; lightning from apt-get (or Synaptic), you cannot sync your calendar with Thunderbird and you keep getting errors like &quot;Your calendar is in read only mode&quot; etc etc, which sends you to your calendar settings - but the answers are probably not there!.</p>
<p>A second option is going to Thuderbird add-ons downloading both Extensions and installing them which also fails, for the same reason.</p>
<p>This is all caused because you probably installed Thuderbird by <strong>apt-get install Thunderbird</strong> and I haven't figured out the difference yet, but as a fact apt-get interferes in the way Thunderbird (and firefox too) are installing / enabling the plug-ins and I am pretty sure this is the cause of this problem.</p>
<p>&nbsp;</p>
<p>So what worked for me:</p>
<p>&nbsp;</p>
<ol>
    <li>
    <p style="margin-bottom: 0in;"><strong>Install lightning from 	Synaptic</strong>- at this stage Synaptic automatically adds 	Google-Provider and Calendar-Timezone package - install them all!, 	for you cannot install lightning without them, then Mark the 	Google-Provider extension for &quot;complete removal&quot; (it 	shouldn't, but make sure this doesn't remove the lightning 	extension).</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;"><strong>Install Google Provider 	from Thunderbird's add-ons</strong> - in Thunderbird go to tools &gt; 	add-ons &gt; &quot;Get Extensions&quot; which should open a browser 	look for Google and download the 	provider_for_google_calendar-0.5.2-sb+tb.xpi file - in the add-ons 	screen in your Thunderbird install the xpi file</p>
    </li>
    <li>
    <p><strong>Disable the Timezone Definitions for Mozilla Calendar</strong> 	- this seems to cause an issue with the timezone settings and 	results in sync failure with your Google calendar.</p>
    </li>
</ol>
<p>&nbsp;</p>
<p>Once you have completed the step above restart Thunderbird.</p>
<p>Add the Calendar of type Google Calendar, restart Thunderbird.</p>
<p>&nbsp;</p>
<p>Once you login Thunderbird should be displaying your calendar correctly.</p>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
