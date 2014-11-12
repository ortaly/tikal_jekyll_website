---
layout: post
title: Java2Dart Date
created: 1354887479
author: oren.kleks
permalink: /java/java2dart-date
tags:
- JAVA
- Java DART Calendar DST Date
---
<p>&nbsp;<b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;"><a href="http://stackoverflow.com/questions/428918/how-can-i-increment-a-date-by-one-day-in-java">A common pitfall</a> when working with dates in software is the DST (Daylight saving time).</span></b></p>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">For example the following code just adds 24hrs:</span><br />
</b></p>
<pre title="code" class="brush: java;">
	for (int i = 0; i &lt; 365; i++) {
			date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
			System.out.println(date);
		}</pre>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The result will show confusing behavior when DST occurs.</span></b></p>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"> </b></p>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;"><br />
&hellip;</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Wed Mar 28 00:00:00 IST 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Thu Mar 29 00:00:00 IST 2012</span></b><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><u><br />
<em><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Fri Mar 30 </span></em></u></b><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><u><em><span style="font-size: 15px; font-family: Arial; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">00</span></em></u></b><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><u><em><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">:00:00 IST 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Sat Mar 31 </span><span style="font-size: 15px; font-family: Arial; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">01</span><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">:00:00 IDT 2012</span></em></u></b><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Sun Apr 01 01:00:00 IDT 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">&hellip;</span><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The right way to increment a single day in java is:</span><br />
</b></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
Calendar c = Calendar.getInstance();
for (int i = 0; i &lt; 365; i++) {
        c.add(Calendat.DATE,1);</pre>
<pre title="code" class="brush: java;">
 	System.out.println(c.getTime());
}
</pre>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"> <span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The result will be when DST occurs:</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Thu Mar 29 00:00:00 IST 2012</span><u><em><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Fri Mar 30 00:00:00 IST 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Sat Mar 31 00:00:00 IDT 2012</span></em></u><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Sun Apr 01 00:00:00 IDT 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Mon Apr 02 00:00:00 IDT 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Tue Apr 03 00:00:00 IDT 2012</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Wed Apr 04 00:00:00 IDT 2012</span><br />
<br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Now its time to see how Google dart is doing this : </span></b></p>
<pre title="code" class="brush: java;">

  Date date = new  Date(2012,  1,  1,  0,  0,  0,       0);
  for (int i = 0; i &lt; 365 ; i++){
  date. add(const new Duration(days:1));
   print(date);
  }</pre>
<p><b id="internal-source-marker_0.5118415981996804" style="font-weight: normal;"><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The result when DST occurs:</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">2012-03-29 00:00:00.000</span><u><em><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">2012-03-30 00:00:00.000</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">2012-03-31 01:00:00.000</span></em></u><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">2012-04-01 01:00:00.000</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">2012-04-02 01:00:00.000</span><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Opps...</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">It seems that DART still a long road ahead, in order to support proper scheduling.</span></b></p>
<p>&nbsp;</p>
