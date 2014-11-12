---
layout: post
title: Remove the "All view" in Hudson + view enhancement plugins
created: 1283328584
author: hagzag
permalink: /devops/remove-all-view-hudson-view-enhancement-plugins
tags:
- DevOps
- Hudson
---
<p>I had tow motivations of getting rid of the All view</p>
<ol>
    <li>The <em><strong>All view</strong></em> is quite annoying don't you think? After using Hudson for a while you have tens/hundreds of jobs lined up in a huge list - who needs that right.</li>
    <li>I wanted a &quot;<em><strong>hidden jobs section</strong></em>&quot; - Jobs no one but myself (and who ever needs access to it) can see.</li>
</ol>
<p>&nbsp;</p>
<p>In order to get rid of it (the <em><strong>All view</strong>)<strong> </strong></em>simply:</p>
<ol>
    <li>Create a new view call it &quot;xyz&quot; and add what ever you want to it - and there are quite a few plugins you can adopt for see examples <a href="#vep">below</a>,</li>
    <li>Navigate to hudson &gt;&gt; configure hudson (http://[hudson_url]/hudson/configure) and chenge the default view to your &quot;xyz&quot; view.</li>
    <li>Select the <em><strong>All view</strong></em> in Hudson's home page and you should be able to delete it.</li>
</ol>
<p>&nbsp;</p>
<p><a name="vep">View Enhancement plugins</a>:</p>
<ul>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Sectioned+View+Plugin">Sectioned   View Plugin</a>                                                                   <span class="smalltext">&mdash; This plugin provides a new view implementation that  can be divided into sections. Each section can display different  information about the selected jobs.  An extension point is also  provided to define new types of sections.</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Nested+View+Plugin">Nested  View Plugin</a>                                                                   <span class="smalltext">&mdash; View type to allow grouping job views into multiple  levels instead of one big list of tabs.</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Status+View+Plugin">Status  View Plugin</a>                                                                   <span class="smalltext">&mdash; View type to show jobs filtered by the status of the  last completed build.</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Last+Success+Description+Column+Plugin">Last   Success Description Column Plugin</a>                                                                   <span class="smalltext">&mdash; Column showing the last success description that can  be configured in views (works with the <a href="http://wiki.hudson-ci.org/display/HUDSON/Description+Setter+Plugin">Description  setter plugin</a> )</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Last+Success+Version+Column+Plugin">Last  Success Version Column Plugin</a>&nbsp;                                                                  <span class="smalltext">&mdash; </span>Adds a column showing last successful version that can be configured  in views.</li>
</ul>
<p><span class="smalltext"> </span></p>
<ul>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Last+Failure+Version+Column+Plugin">Last  Failure Version Column Plugin</a>                                                                  <span class="smalltext">&mdash;&nbsp;</span>Adds a column showing last failed version that can be configured in  views.</li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Cron+Column+Plugin">Cron  Column Plugin</a>                                                                   <span class="smalltext">&mdash; View column showing the cron trigger expressions  that can be configured on a job. </span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Maven+Info+Plugin">Maven  Info Plugin</a>                                                                   <span class="smalltext">&mdash; Adds columns configurable in views to show info  about Maven jobs.</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/View+Job+Filters">View  Job Filters</a>                                                                   <span class="smalltext">&mdash; Manage multiple views and hundreds of jobs much more  easily.  This plug-in provides more ways to include/exclude jobs from a  view, including filtering by SCM path, and by any job or build status  type, as well as &quot;chaining&quot; of filters and negating filters.</span></li>
    <li><a href="http://wiki.hudson-ci.org/display/HUDSON/Job+Type+Column+Plugin">Job  Type Column Plugin</a>                                                                   <span class="smalltext">&mdash; Adds column showing job type that can be configured  in views. <br />
    </span></li>
</ul>
<p><span class="smalltext">I'm sure there are others ...</span></p>
<p>&nbsp;</p>
<p>Hope you find this useful I know I did <img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" alt="" /></p>
