---
layout: post
title: NetBeans project for Play - fixing the source path
created: 1318776514
author: andrew
permalink: /netbeans-project-play-fixing-source-path
tags:
- JAVA
- frameworks
---
<p>If you used NetBeans with Play framework, you could notice one feature, missing from Eclipse counterpart. In NetBeans &quot;Navigate | Go to source&quot; does not show the internals of Play framework, while in Eclipse the sources are readily available. So I decided to fix the command which creates NetBeans project.</p>
<div id="fullpost">
<p>The commands of Play framework are located in <code>framework/pym/play/commands</code>, they are good old python scripts. The one responsible for <code>netbeansify</code> command is in file <code>netbeans.py</code>. Looking at the sources, I immediately spotted a useful shortcut: intstead of <code>play netbeansify</code> we can run <code>play nb</code>, I like that! :) Eclipse fans, consider switching, our command is shorter (just kidding, <code>eclipsify</code> has a shortcut, too)</p>
<p>Anyway, to fix the problem with &quot;navigate to sources&quot; I replaced the following lines:</p>
<pre title="code" class="brush: python;">
    if os.name == 'nt':
        replaceAll(os.path.join(nbproject, 'project.xml'), r'%PLAY_CLASSPATH%', ';'.join(classpath + ['nbproject\\classes']))
    else:
        replaceAll(os.path.join(nbproject, 'project.xml'), r'%PLAY_CLASSPATH%', ':'.join(classpath + ['nbproject/classes']))
</pre>
<p>&nbsp;</p>
<p>to these lines:</p>
<pre title="code" class="brush: python;">
    newClasspath = []
    playJar = 'framework%splay-%s.jar' % (os.sep, play_env['version'])
    [newClasspath.append(x) for x in classpath if not x.endswith(playJar)]
    replaceAll(os.path.join(nbproject, 'project.xml'), r'%PLAY_CLASSPATH%', ';'.join(newClasspath + ['nbproject%sclasses'%os.sep, '%s%sframework%ssrc'%(play_env[&quot;basedir&quot;], os.sep, os.sep)]))
</pre>
<p>&nbsp;</p>
<p>If you already have NetBeans project for your Play application, you need to generate it again, and reopen the project in NetBeans, to see the changes.</p>
<p><a href="https://play.lighthouseapp.com/projects/57987-play-framework/tickets/1164">I sent the fix</a> to the Play framework developers, hope they accept it and you will not need to patch the script very soon.</p>
<p>Crossposted to <a href="http://andskiba.blogspot.com/2011/10/netbeans-project-for-play-fixing-source.html">http://andskiba.blogspot.com</a></p>
