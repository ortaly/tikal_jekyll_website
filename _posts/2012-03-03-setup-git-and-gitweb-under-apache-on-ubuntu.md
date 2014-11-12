---
layout: post
title: Setup git and gitweb under Apache on Ubuntu
created: 1330815238
author: liya
permalink: "/setup-git-and-gitweb-under-apache-ubuntu"
tags:
- DevOps
- alm git gitweb apache
---
<p><span style="font-size: medium;"><span style="color: rgb(0, 0, 0);">Once you have installed git (gitweb included) and apache, here is the simple setup you need to do:</span></span></p>
<div style="margin-bottom: 0in"><span style="font-size: medium;"><span style="color: rgb(0, 0, 0);">&nbsp;</span></span></div>
<p>&nbsp;</p>
<p><span style="font-size: medium;"> </span></p>
<p><span style="color: rgb(0, 0, 0);"><u>for git:</u></span></p>
<p>&nbsp;</p>
<ol>
    <li>
    <p><span style="font-size: medium;"><span style="color: rgb(0, 0, 0);">Create a git repository (under 	/var/git):</span></span></p>
    </li>
</ol>
<p>&nbsp;</p>
<pre title="code" class="brush: ruby;">
git init /var/git/myproject</pre>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp; <span style="font-size: medium;"><span style="color: rgb(0, 0, 0);">    if you want to use this repository 	as your central repository, you will probably want to do it as:</span></span></p>
<pre title="code" class="brush: ruby;">
git init --bare &ndash;shared /var/git/myproject </pre>
<div style="margin-bottom: 0in;"><font color="#000000"><font size="2" style="font-size: 10pt;"><span style="font-style: normal;"><span style="font-weight: normal;"><br />
</span></span></font></font></div>
<p><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">&nbsp;&nbsp; </span></span></font><span style="font-size: small;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">--bare 	option will create your repository without working copy and  	</span></span></font><code><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">--shared 	</span></span></font></code><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">option 	will set the permissions on everything in the repository to 	group-writable.</span></span></font></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<ol type="1" start="2">
    <li>
    <p><span style="font-size: medium;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">git 	under Apache &ndash; put the following configuration in 	</span><u><span style="font-weight: normal;">/etc/apache2/sites-available/default</span></u></span></font></span><font color="#000000"><font size="3"><span style="font-style: normal;"><span style="font-weight: normal;"><br />
    </span></span></font></font></p>
    </li>
</ol>
<div style="margin-bottom: 0in">&nbsp;</div>
<pre title="code" class="brush: ruby;">
&lt;VirtualHost *:80&gt;
  DocumentRoot /var/git

  &lt;Directory &quot;/var/git&quot;&gt;
    Allow from All
    Options +ExecCGI
    AllowOverride All
  &lt;/Directory&gt;

  SetEnv GIT_PROJECT_ROOT /var/git
  SetEnv GIT_HTTP_EXPORT_ALL
  ScriptAlias /git/ /usr/lib/git-core/git-http-backend/

&lt;/VirtualHost&gt;</pre>
<div style="margin-bottom: 0in">&nbsp;</div>
<p>&nbsp;</p>
<p><span style="font-size: medium;"> </span></p>
<p><font color="#000000"><span style="font-style: normal;"><u><span style="font-weight: normal;">for gitweb:</span></u></span></font></p>
<p>&nbsp;</p>
<ol>
    <li>
    <p><span style="font-size: medium;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">gitweb 	configuration: </span></span></font><font color="#000000"><span style="font-style: normal;"><u><span style="font-weight: normal;">/etc/gitweb.conf</span></u></span></font></span><font color="#000000"><span style="font-style: normal"><span style="font-weight: normal"><br />
    </span></span></font></p>
    <pre title="code" class="brush: ruby;">
# path to git projects (&lt;project&gt;.git)
$projectroot = &quot;/var/git&quot;;

# directory to use for temp files
$git_temp = &quot;/tmp&quot;;

# target of the home link on top of all pages
#$home_link = $my_uri || &quot;/&quot;;

# html text to include at home page
$home_text = &quot;indextext.html&quot;;

# file with project list; by default, simply scan the projectroot dir.
$projects_list = $projectroot;

# stylesheet to use
$stylesheet = &quot;/gitweb/gitweb.css&quot;;

# logo to use
$logo = &quot;/gitweb/git-logo.png&quot;;

# the 'favicon'
$favicon = &quot;/gitweb/git-favicon.png&quot;;</pre>
    <p><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;"><br />
    </span></span></font>&nbsp;</p>
    </li>
</ol>
<ol start="2">
    <li>
    <p><span style="font-size: medium;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">gitweb 	under Apache - put the following configuration in 	</span></span></font><font color="#000000"><span style="font-style: normal;"><u><span style="font-weight: normal;">/etc/apache2/conf.d/gitweb</span></u></span></font><font color="#000000"><font style="font-size: 10pt;"><span style="font-style: normal;"><span style="font-weight: normal;">:</span></span></font></font></span><font color="#000000"><font size="2" style="font-size: 10pt"><span style="font-style: normal"><span style="font-weight: normal"><br />
    </span></span></font></font></p>
    <pre title="code" class="brush: ruby;">
    Alias /gitweb /usr/share/gitweb

    &lt;Directory /usr/share/gitweb&gt;
       Options FollowSymLinks +ExecCGI
       AddHandler cgi-script .cgi
    &lt;/Directory&gt;</pre>
    </li>
</ol>
<div style="margin-bottom: 0in">&nbsp;</div>
<div style="margin-bottom: 0in"><span style="font-size: medium;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">Now restart apache:</span></span></font></span></div>
<pre title="code" class="brush: ruby;">
service apache2 restart</pre>
<div style="margin-bottom: 0in"><font color="#000000"><font size="2" style="font-size: 10pt"><span style="font-style: normal"><span style="font-weight: normal"><br />
</span></span></font></font></div>
<div style="margin-bottom: 0in">&nbsp;</div>
<div style="margin-bottom: 0in"><span style="font-size: medium;"><font color="#000000"><span style="font-style: normal;"><span style="font-weight: normal;">and you are ready to go!</span></span></font></span></div>
<p>&nbsp;</p>
