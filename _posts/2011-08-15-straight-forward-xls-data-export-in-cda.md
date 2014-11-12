---
layout: post
title: Straight-forward XLS data export in CDA
created: 1313435475
author: udid
permalink: /straight-forward-xls-data-export-cda
tags:
- Pentaho
- OSBI
- CDF
- CDE
- CDA
---
<p>In previous <a href="http://www.tikalk.com/incubator/blog/creating-bugzilla-dashboard-%E2%80%93-hands-cde-tutorial-%E2%80%93-fuse-day-3-session-summary">post</a> we have developed a dashboard with CDE, the dashboard needs a parameterized and secured data access layer to provide the data for the graphs, selectors and texts on the screen while encapsulating the data access complexity - the CDA.</p>
<p>&nbsp;</p>
<p>Once the dashboard is complete and users find valuable information or spot insightful patterns they would definitely want and ask you to provide data export functionality to the dashboard, which is easier done than said.</p>
<p>&nbsp;</p>
<p>All you need is a Text Component with this expression:</p>
<pre title="code" class="brush: jscript;">
function() {
  return &quot;&lt;a href='/pentaho/content/cda/doQuery?solution=mySolution&amp;path=%2FmyFolder&amp;file=myDashboard.cda&amp;dataAccessId=myQueryName&amp;outputType=xls&amp;parammyParam=&quot;+myParam+&quot;&amp;parammySecondParam=&quot;+mySecondParam+&quot;' target='_blank' title='Export to xls'&gt;&lt;img src='/pentaho/public/export.png'/&gt;Export&lt;/a&gt;&quot;;
} </pre>
<p>&nbsp;</p>
<p>This will create a link (image+text) which when clicked would open a new tab or window and would start a dowload for the data in xls format.</p>
<p>&nbsp;</p>
<p>You need to replace my variables with your cda name and path, and to pass the required parameters as paramXXX=YYY.</p>
<p>&nbsp;</p>
<p>CDA Documentation is available <a href="http://cda.webdetails.org/?q=content/documentation-web-api-reference">here</a></p>
