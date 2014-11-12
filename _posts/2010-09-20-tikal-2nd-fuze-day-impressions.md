---
layout: post
title: ' Tikal 2nd Fuze day – impressions'
created: 1284979807
author: sefi
permalink: /js/tikal-2nd-fuze-day-–-impressions
tags:
- JS
- fuze day
- flex
---
<p>&nbsp;</p>
<p class="MsoNormal" dir="LTR" style="margin-right:0cm;text-align:left;text-indent:
0cm;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p>&nbsp;The main goals of this Fuse day were:</p>
<ol>
    <li><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Implement Time Tracker application with Flex, with the same Look &amp; Feel as the other teams.<o:p></o:p></span></li>
    <li><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Successfully communicate with the server over REST.<o:p></o:p></span></li>
    <li><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Streamline development with GIT source control.<o:p></o:p></span></li>
    <li><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Have a working example that can serve as code base for future Flex group meetings, Flex 4 learning platform etc.<o:p></o:p></span></li>
</ol>
<p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-align:left;
text-indent:0cm;line-height:15.75pt;direction:ltr;unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#666666">&nbsp;<o:p></o:p></span></p>
<p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-align:left;
text-indent:0cm;line-height:15.75pt;direction:ltr;unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#666666">During the&nbsp;day a substantial amount of time went to GIT administration, mainly due to lack of familiarity with&nbsp;working with it. The group divided the tasks, so that Lior was in charge of server communication, Yoav handled the MVC framework logic (we decided on going with Cairngorm for its simplicity) and Oren and Sefi got busy with implementing the GUI logic. <br />
&nbsp;<o:p></o:p></span></p>
<p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-align:left;
text-indent:0cm;line-height:15.75pt;direction:ltr;unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#666666">By the end of the day we had a complete UI and working communication with REST server, but used only the GET API.<o:p></o:p></span></p>
<p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-align:left;
text-indent:0cm;line-height:15.75pt;direction:ltr;unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#666666">&nbsp;<o:p></o:p></span></p>
<p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-align:left;
text-indent:0cm;line-height:15.75pt;direction:ltr;unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#666666">Some points to consider for the next Fuse day:<o:p></o:p></span></p>
<ol>
    <li><b><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Administration</span></b><span style="font-size:9.0pt;
    font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">: We should have as many computers as people, and all of them should already be installed with whatever we need to start working straight away, be it FlashBuilder, MVC framework binaries, working GIT environment etc.<o:p></o:p></span></li>
    <li><b><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">API</span></b><span style="font-size:9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;
    mso-fareast-font-family:&quot;Times New Roman&quot;;color:#666666">: server API should be completed a few days ahead of the Fuse day. We should have mock API at the very least. Server group should strive to make as little modifications to the API once we start working. Naturally, there will always be unexpected problems.<o:p></o:p></span></li>
    <li><b><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Design</span></b><span style="font-size:9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;
    mso-fareast-font-family:&quot;Times New Roman&quot;;color:#666666">: We should come to the Fuse day with a finite UI design we all agree upon, and each of us knows which part he is responsible for. This includes interaction between the different components, what events are thrown etc.<o:p></o:p></span></li>
    <li><b><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Basic classes</span></b><span style="font-size:9.0pt;font-family:
    &quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#666666">: Fuse day should start with us having at least a basic set of VOs so we won't have to rewrite code later on.<o:p></o:p></span></li>
    <li><b><span style="font-size:
    9.0pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
    color:#666666">Communication</span></b><span style="font-size:9.0pt;font-family:
    &quot;Tahoma&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#666666">: We should stop working, say every 2 hours, for a few minutes and communicate with each other. Each one can provide an overview of what was accomplished, what is required, are there blockers etc.&nbsp;This will allow a better allocation of time to the important tasks.<o:p></o:p></span></li>
</ol>
