---
layout: post
title: generating classpath file with maven
created: 1287315488
author: ittayd
permalink: /devops/generating-classpath-file-maven
tags:
- DevOps
- maven dependency
---
<div class="post-text">
<p>I'd like to generate a classpath file from pom.xml  dependencies. I need it so during tests I have the classpath of all  dependencies (that are later packaged into a bundle)</p>
<p><code>maven-dependency-plugin</code> does not suit me for two reasons:</p>
<ul>
    <li>it generates paths to files in the repository, so to use other modules they first need to run <code>install</code> phase for them (I'd like to have paths like <code>/some/root/othermodule/target/classes</code>)</li>
    <li>it doesn't include the artifact's own path (<code>target/classes</code>), which means I need to add it later in code, which is awkward</li>
</ul>
<p>So I'm looking for another plugin (or how to properly run <code>maven-dependency-plugin</code>)</p>
</div>
