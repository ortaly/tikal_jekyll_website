---
layout: post
title: 'programmatically downgrade eclipse plugin  '
created: 1276009243
author: keren
permalink: /java/programmatically-downgrade-eclipse-plugin
tags:
- JAVA
- SWT
- SWT RCP
---
<p>I&nbsp;want to change a plugin in RCP product, but to keep the old plugin alive.</p>
<p>A user can choose between plugin A or B using a configuration.</p>
<p>I&nbsp;thought about creating a new version for the plugin and switch between them according to a flag. The new version will be the default one.</p>
<p>The question is how can I&nbsp;'downgrade' the plugin in order to get back to the old one if requested?</p>
