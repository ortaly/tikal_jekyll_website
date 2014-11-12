---
layout: post
title: Hudson - pinned plugins
created: 1283843606
author: hagzag
permalink: /devops/hudson-pinned-plugins
tags:
- DevOps
- Hudson
---
<p><img width="100" vspace="5" hspace="5" height="100" border="0" align="left" alt="hudson logo" src="/files/upload/29/banner-100.png" />If you wish to &quot;hang on&quot; to a certain plugin which shipps with hudson.war just unpin it in the Manage Hudson &gt;&gt; Manage Plugins page - this option is availabe sine <a href="http://www.hudson-ci.org/download/war/1.374/hudson.war">1.374 release</a> (and you can always grab the latest @: <a href="http://www.hudson-ci.org/latest/hudson.war">latest</a>)</p>
<p>&nbsp;</p>
<p>See full explanation below quoted from <a href="http://wiki.hudson-ci.org">hudson wiki</a>:</p>
<!--break-->
<p>The notion of <b>pinned plugins</b> applies to plugins that are  bundled with Hudson, such as the Subversion plugin.</p>
<p>Normally, when you upgrade/downgrade Hudson, its built-in plugins  overwrite whatever versions of the plugins you currently have in  $HUDSON_HOME. This ensures that you use the consistent version of those  plugins. However, this behavior also means that those plugins can be  never manually updated, as every time you start Hudson they'll be  replaced by the bundled versions.</p>
<p>So when you manually update those bundled plugins, Hudson will mark  those plugins as pinned to the particular version. Pinned plugins will  never be overwritten by the bundled plugins during Hudson boot up.  However, by definition, with pinned plugins you lose the benefit of  automatic upgrade when you upgrade Hudson.</p>
<p>So the plugin manager in Hudson allows you to explicitly unpin  plugins. On file system, Hudson creates an empty file called <tt>$HUDSON_HOME/plugins/plugin.hpi.pinned</tt>  to indicate the pinning. This file can be manually created/deleted to  control the pinning behavior.</p>
