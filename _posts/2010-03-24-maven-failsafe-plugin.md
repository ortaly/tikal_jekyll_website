---
layout: post
title: maven failsafe plugin
created: 1269413056
author: ittayd
permalink: /devops/maven-failsafe-plugin
tags:
- DevOps
---
<p><span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif; line-height: normal; font-size: 13px; ">
<p style="line-height: 1.3em; font-size: 12px; color: rgb(0, 0, 0); "><font class="Apple-style-span" color="#666666" face="Tahoma, Verdana, Arial, Helvetica, sans-serif" size="4"><span class="Apple-style-span" style="font-size: 14px; line-height: 21px;"><font class="Apple-style-span" color="#000000" face="Verdana, Helvetica, Arial, sans-serif" size="3"><span class="Apple-style-span" style="font-size: 12px; line-height: 15px;"><br />
</span></font></span></font><span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "><a href="http://maven.apache.org/plugins/maven-failsafe-plugin/">http://maven.apache.org/plugins/maven-failsafe-plugin/</a></span></p>
</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>From the site:</p>
<p><span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "><span class="Apple-style-span" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif; line-height: normal; font-size: 13px; ">
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 12px; font-weight: normal; line-height: 1.3em; color: rgb(0, 0, 0); ">&quot;The Failsafe Plugin is designed to run integration tests while the Surefire Plugins is designed to run unit. The name (failsafe) was chosen both because it is a synonym of surefire and because it implies that when it fails, it does so in a safe way.&quot;</p>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Integration tests are different than unit tests in:</div>
<ul>
    <li>They execute after the package phase</li>
    <li>They consider setting up and tearing down of thirdparty services (e.g., database)</li>
</ul>
</span></span></p>
