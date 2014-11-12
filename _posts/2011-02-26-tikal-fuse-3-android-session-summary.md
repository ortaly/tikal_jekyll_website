---
layout: post
title: 'Tikal Fuse #3 - Android session summary'
created: 1298700288
author: ittayd
permalink: /incubator/tikal-fuse-3-android-session-summary
tags:
- Incubator
- android fuse
---
<p>For Tikal's 3rd fuse day, we wanted to experience developing for the Android. The session was lead by Igor Zelmanovich and had 12 people.</p>
<p>&nbsp;</p>
<p>Our goal was to create an application that will show feeds from Tikal's community site.</p>
<p>&nbsp;</p>
<p>We divided the application into several functionalities and smaller teams tackeled each. The functionalities were:</p>
<ul>
    <li>Settings - allows selecting which groups to pull feeds from</li>
    <li>Main GUI - 2 screens:&nbsp;The first shows the list of registered groups, and on selecting one leads to a second that shows feeds from that group which can be opened in the browser</li>
    <li>RSS parser to read the feeds</li>
    <li>Splash screen</li>
</ul>
<p>&nbsp;</p>
<p>The application's source code can be found here:<a href="http://git.tikalk.com/fuse-3/android-application/trees/master/com.tikalk.community">&nbsp;http://git.tikalk.com/fuse-3/android-application/trees/master/com.tikalk.community</a></p>
<p>&nbsp;</p>
<h2>Work</h2>
<p>We first set up the git repository for the project. As with previous occasions, people had trouble connecting to the repository, mainly due to problems setting the ssh keys required.</p>
<p>&nbsp;</p>
<p>We then setup an IDE&nbsp;environment. People used either Eclipse or IDEA.</p>
<p>&nbsp;</p>
<p>We then continued to try and learn how the GUI&nbsp;framework worked. This was the most tricky part, since it's a framework that is different from the ones we're used to and is influenced by the need to conserve memory which made the design a bit unusual.</p>
<p>&nbsp;</p>
<p>At the end of the day we integrated all components and had a working application!</p>
<p>&nbsp;</p>
<h2>High Level Description</h2>
<p>The Android GUI&nbsp;framework is centered around the concept of Activity. Each user interaction is mapped to an activity. Essentially, a GUI&nbsp;screen. Each activity creates the GUI by creating objects that represent the widgets. In order to separate logic from design, the GUI can also be defined in an XML file and then &quot;Inflated&quot;&nbsp;to create objects. The XML&nbsp;file is referenced through the R class, which is auto-generated. This is simple as calling setContentView(R.layout.main)&nbsp;in the first line of the activity. It is possible to get individual widgets (e.g., to see if a checkbox is checked), by using findViewById with an id that is assigned in the XML&nbsp;and automatically added to the R class. Again, simple as findViewById(R.id.mycheckbox)</p>
<p>&nbsp;</p>
<p>Interactions happen by registering listeners.</p>
<p>&nbsp;</p>
<p>Switching between activities is done by creating an Intent object and then calling startActivity. The activity to start is passed as class argument or string id. The latter allows to start activities provided by the system. For example, to start a brower, create an Intent with Intent.ACTION_VIEW and pass it a URI (in general this allows to start also other activities, based on what the URI means)</p>
<p>&nbsp;</p>
<p>Google has buildin supprt for different types of activities. We used the ListActivity as base class for our 2 screens. This activity makes it easy to create screens that show lists (duh) by creating an adapter over the data list. </p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Key Impressions</h2>
<ul>
    <li>IDE&nbsp;Support - While all IDEs provide support, Eclipse's killer feature is the ability to show how the screen will look like. The flow is also natural:&nbsp;code then hit run/debug, which deployes the application to an emulator.</li>
    <li>API&nbsp;- Android's API&nbsp;looks clunky in some aspects, at least for newbies. For example, passing objects between screens is awkward.</li>
    <li>Few utility libraries - We couldn't find a library that provides RSS read and had to create one of our own</li>
    <li>The concept of the 'R' resources class is nice, since it allows a safe way of referencing resources, with intellisense. We wish it was possible to navigate from a resource id to the source xml file - great for learning how android.R.layout layouts look like</li>
    <li>Some classes were removed from the stock java package.&nbsp; One problem is that these show up as verification errors at runtime, and not at compile time.</li>
</ul>
<p>&nbsp;</p>
