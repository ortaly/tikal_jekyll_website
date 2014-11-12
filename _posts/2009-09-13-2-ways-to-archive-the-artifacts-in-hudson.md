---
layout: post
title: '2 ways to archive the artifacts in Hudson '
created: 1252828192
author: liya
permalink: /devops/2-ways-archive-artifacts-hudson
tags:
- DevOps
- Hudson
- Continuous Integration
---
<p>I &quot;discovered&quot; 2 ways to archive the artifacts in Hudson:</p>
<p>&nbsp;</p>
<p>1. If you need to publish specific files - use wildcards like 'module/target/**/*.zip'</p>
<p>In the file system the artifacts will be copied with the full path starting from the workspace folder, but in the GUI you will see your files only.</p>
<p>&nbsp;</p>
<p>2. If you need to publish a directory structure - use use wildcards like 'mypublish/**/*'</p>
<p>You will see the full mypublish folder in the GUI with the ability to enter into its sub directories</p>
