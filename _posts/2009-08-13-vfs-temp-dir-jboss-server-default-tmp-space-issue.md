---
layout: post
title: 'VFS temp dir: jboss/server/default/tmp space issue'
created: 1250143262
permalink: vfs-temp-dir-jboss-server-default-tmp-space-issue
tags:
- DevOps
---
<p>After multiple re -deployments of several EARs (each is about 10 MB), this directory occupied almost 15GB (!) . We experienced this issue on all our development machines after an upgrade to Jboss5.</p>
<p>&nbsp;</p>
<p>Not only it is occupying space but also taking ages to load while scanning this directory.</p>
<p>Has anyone faced this issue?</p>
