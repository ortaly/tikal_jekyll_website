---
layout: post
title: Hudson 1.371 form save dosen't return to Job page
created: 1281940613
author: hagzag
permalink: /devops/hudson-1371-form-save-dosent-return-job-page
tags:
- DevOps
- Hudson
---
<p><img width="60" vspace="5" hspace="5" height="60" border="0" align="left" alt="" src="/files/upload/29/small_banner-100.png" />Version 1.371 of Hudson was released Aug 9 and introduced a weird &quot;side affect&quot;. A Job configuration form will save the data to the filesystem, but will not return to the Job page - <strong>this doesen't braek anything but is just annoying</strong>.</p>
<p>Early adapters feel free to go ahead and update to 1.372 (<a href="http://www.hudson-ci.org/download/war/1.372/hudson.war">download here</a>) which I tested and works like a charm + fixes this issue introduced in 1.371 release.</p>
<p>Hope you find this Useful.</p>
