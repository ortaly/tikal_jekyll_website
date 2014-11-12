---
layout: post
title: YUI Calendar page to the selected date (multi calendar)
created: 1338394544
author: avit
permalink: /yui-calendar-page-selected-date-multi-calendar
tags:
- Ruby
- web
---
<p>I have been working with YUI calendar for a couple of weeks now on a project. I found that it is highly customizable although the documentation are not always clear and you have to dig around the internet to find your answers.</p>

<p>So, I am here to help.</p>

<p>In this new website I have a multi-calendar where you can page forwards and backwards through the dates. The calendar is also showing and hiding according to a user click (see photo).</p>
<a href='http://www.kensodev.com/2010/06/22/yui-calendar-page-to-the-selected-date-multi-calendar/yui_calenda_popup/' rel='attachment wp-att-497'><img alt='' class='aligncenter size-full wp-image-497' height='204' src='http://www.kensodev.com/wp-content/uploads/2010/06/yui_calenda_popup.png' title='YUI Calendar popup' width='330' /></a>
<p>The problem was (for me anyway) that when the user clicked the calendar’s button and the calendar showed the last paging position.</p>

<p>Let’s say I selected a date, or even better a date interval (from Feb 2nd to Feb 10th) and then paged to see other months available dates, closed the calendar and re-opened it, it seemed as if the selection cleared and the paging position kept.</p>

<p>My client’s request was “if the client selected a date and paged, always take him back to his selection when the calendar is shown”</p>

<p>Well, this is the way to do it.</p>

<p><span>js</span> var dates = cal1.getSelectedDates();</p>

<p>if(dates.length > 0) { var l = dates<span>0</span>;</p>

<p>cal1.cfg.setProperty("pagedate", l); cal1.render(); } <span>/js</span></p>
<strong>What did we do here?</strong>
<p>First, we checked if there are selected dates in the calendar. If there were, we got the lowest date (the first date of the interval). Then we set a property on the calendar called “pagedate” with this lowest date and WHALLLA, it works! Now, every time you open the calendar it pages to the selected dates section, no matter if you paged forward before hiding the calendar.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/zc1q6sK7BSE" height="1" width="1"/>
