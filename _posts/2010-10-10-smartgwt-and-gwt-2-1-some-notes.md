---
layout: post
title: SmartGWT and GWT 2.1 some notes
created: 1286715202
author: aviy
permalink: /java/smartgwt-and-gwt-21-some-notes
tags:
- JAVA
- gwt
- CellWidgets
---
<p>There are several libraries for GWT; SmartGWT is one of the riches and powerful (<a href="http://www.smartclient.com/smartgwt/showcase/">showcase</a> )</p>
<p>With all the advantages of SmartGWT there is one fundamental problem, which should be consider before using it, and this is the fact that the core of SmartGWT is actually JavaScript (SmartClient) library wrapped with a thin layer of GWT.<br />
In fact&nbsp; almost all the code is written in <a href="http://code.google.com/intl/iw-IL/webtoolkit/doc/latest/DevGuideCodingBasicsJSNI.html">JSNI</a> (JavaScript Native Interface). This approach: Affects GWT compiler optimization, create difficulties to extend components, impossible to debug it. And finally once you decided to use SmartGWT it is better not to mix it wit regular GWT (<a href="http://forums.smartclient.com/showthread.php?t=8159#aMix">Can i mix SmartGWT with GWT?</a>)</p>
<p>&nbsp;</p>
<p>Although I used their visual components I prefer using the GWT core components. Specially the new version 2.1 M3 which include <a href="http://code.google.com/intl/iw/webtoolkit/doc/latest/ReleaseNotes.html#CellWidgets">Data Presentation Widgets</a> (CellWidgets) that enables you among other create &ldquo;real&rdquo; tables with headers footers pagers (e.g. <a href="http://gwt-bikeshed.appspot.com/Expenses.html">gwt-bikeshed</a> , <a href="http://gwt.google.com/samples/Showcase/Showcase.html#!CwCellTable">CwCellTable-Showcase</a>,).</p>
<p>&nbsp;</p>
<p>Note: there is <a href="http://www.sencha.com/products/gwt/">ExtGWT</a> library that seems to me better since it is all written in java no extrenal JavaScript.</p>
<p>&nbsp;</p>
<p>I have put number of links which discuss the SmartGWT and other GWT libraries :<br />
http://stackoverflow.com/questions/867451/best-gwt-widget-library<br />
http://thompsonng.blogspot.com/2009/04/smartgwt-vs-gxt.html<br />
http://stackoverflow.com/questions/2038392/gwt-vs-smartgwt-extjs<br />
http://stackoverflow.com/questions/2685056/smartclient-or-smartgwt</p>
