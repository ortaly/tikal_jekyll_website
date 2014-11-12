---
layout: post
title: maven-assembly-plugin doesn't see dependencies
created: 1244710917
permalink: maven-assembly-plugin-doesnt-see-dependencies
tags:
- DevOps
- maven assembly plugin
---
<p>Starting from version 2.2-beta-3 maven assembly plugin doesn't see dependencies</p>
<p>&nbsp;</p>
<pre class="brush: xml;">
<dependencySets>
        <dependencySet>
            <includes>
                <include>mysql:mysql-connector-java</include>
            </includes>
        </dependencySet>
    </dependencySets>
</pre>
<p>[WARNING] The following patterns were never triggered in this artifact inclusion filter:<br />
o&nbsp; 'mysql:mysql-connector-java'</p>
<p>&nbsp;</p>
<p>In the version 2.2-beta-2 it works</p>
