---
layout: post
title: Setup Git, Gitweb with git-http-backend / smart http on ubuntu 12.04
created: 1367563862
author: hagzag
permalink: /devops/setup-git-gitweb-git-http-backend-smart-http-ubuntu-1204
tags:
- DevOps
---
<p>Setting up git over http (Smart HTTP in perticular) has it&#39;s caveats I will try to emphesize them as I go along.</p>
<p>Final Goal is to run git over http using git-http-backend (a.k.a smart http) in apposed to using webdav which is also called the dumb-method, webdav was never designed to work with git for the reason that it cannot compress object whilst transporting data between the client and the server hosting git [ there is no real git client - git server so i am not referring to it a such].</p>
<p><strong><u>Versions used in this setup</u>:</strong></p>
<ul>
	<li>
		Ubutnu version <em>12.04-LTS</em></li>
	<li>
		Git version <em>1.7.9.5</em></li>
	<li>
		Apache2 version <em>2.2.22</em></li>
</ul>
<p><strong><u>1. Install prequirests</u>:</strong></p>
<pre>
 sudo apt-get install git apache2 gitweb
</pre>
<p><strong><u>2. Enable apache2 modules and reload apache</u>:</strong></p>
<pre>
 a2enmod env alias fcgid auth_digest
 service apache2 restart
</pre>
<p><u><strong>3. Create a &quot;site&quot; for git:</strong></u></p>
<p>let&#39;s start with a basic virtual host configuration pointing to gitweb:</p>
<p><em>vim /etc/apache2/sites-available/git</em></p>
<pre>
&lt;virtualhost *:80&gt;
 ServerName git.example.com
<span style="font-family: Arial, Verdana, sans-serif;">  </span>DocumentRoot /usr/share/gitweb
 ErrorLog ${APACHE_LOG_DIR}/git_error.log
 CustomLog ${APACHE_LOG_DIR}/git_access.log combined
&lt;/virtualhost&gt;
</pre>
<p><em>Enable CGI on the gitweb directory</em></p>
<pre>
&lt;Directory /usr/share/gitweb&gt;
<span style="font-family: Arial, Verdana, sans-serif;"> </span>Options FollowSymLinks +ExecCGI
<span style="font-family: Arial, Verdana, sans-serif;"> </span>AddHandler cgi-script .cgi
<span style="font-family: Arial, Verdana, sans-serif;"> </span>DirectoryIndex gitweb.cgi
&lt;/Directory&gt;
</pre>
<p><em>Enable git clone/push/fetch etc over http</em>:</p>
<pre>
 ScriptAliasMatch \
 &quot;(?x)^/(.*/(HEAD | \
  info/refs | \
   objects/(info/[^/]+ | \
   [0-9a-f]{2}/[0-9a-f]{38} | \
   pack/pack-[0-9a-f]{40}\.(pack|idx)) | \
   git-(upload|receive)-pack))$&quot; \
   /usr/lib/git-core/git-http-backend/$1

  SetEnv GIT_PROJECT_ROOT /var/git
  SetEnv GIT_HTTP_EXPORT_ALL
  SetEnv REMOTE_USER=$REDIRECT_REMOTE_USER
</pre>
<p><em>The env fcgid modules are exactly for this pupose.</em></p>
<p>&nbsp;</p>
<p><em><strong>Let&#39;s spice it up with good old ACL&#39;s</strong></em> [for as you know git doesen&#39;t deal with that stuff on it&#39;s own ...] - you can use BASIC/DIGEST</p>
<p>(I chose digest for it uses an&nbsp;<span style="color: rgb(0, 0, 0);">MD5 digest hash and not clear text like BASIC auth)</span></p>
<pre>
&lt;Location /&gt;
  AuthType Digest
  AuthName &quot;Shared Git Repo&quot;
  AuthUserFile /var/git/.htpasswd
  Require valid-user
&lt;/Location&gt;
</pre>
<p>Create /var/git/.htpasswd for my users:</p>
<pre>
 htdigest -c /var/git/.htpasswd &quot;Shared Git Repo&quot; hagzag</pre>
<p><em>&nbsp; Change &quot;hagzag&quot; with your username ...</em></p>
<p>&nbsp;</p>
<p><u><strong>4. Create a &quot;shared&quot;, bare repository + set directory permissions to the apache2 user &amp; group</strong></u></p>
<p class="rteindent1"><u>Side note</u>&nbsp;about shared &amp; bare:<br />
	<strong>Shared</strong>: Instead of using default umask git repo will be created with 775 perms<br />
	<strong>Bare</strong>: instead of creating GIT_DIR in .git (defult git init behaviour), it will be created in the repository direcotry]</p>
<pre>
 cd /var/git &amp;&amp; git init --bare --shared myproj.git
 chown -R www-data.www-data /var/git
</pre>
<p><strong><u>5. Configure Git Web, /etc/gitweb.conf</u></strong></p>
<pre>
 cp /etc/gitweb.conf /etc/gitweb.conf.orig
 echo -e &#39;$projectroot = &quot;/var/git&quot;;&#39; &gt; /etc/gitweb.conf
 echo &#39;$git_temp = &quot;/tmp&quot;;&#39; &gt;&gt; /tmp/gitweb.conf
</pre>
<p><u><strong>6. Enable site (apache2):</strong></u></p>
<pre>
 a2ensite git</pre>
<p>Which yields:</p>
<pre>
Enabling site git.
To activate the new configuration, you need to run:
  service apache2 reload
</pre>
<p><u><strong>7. Test your new git repository</strong></u></p>
<p>Clone the repo via http:</p>
<pre>
 git clone http://git.example.com/myproj.git
 Cloning into &#39;myproj&#39;...
 Username for &#39;http://git.example.com&#39;: hagzag
 Password for &#39;http://hagzag@git.example.com&#39;: 
 warning: You appear to have cloned an empty repository.</pre>
<p>... and yes I know it&#39;s empty (i created it :)).</p>
<p><br />
	<em><strong>Create &amp; Add a file</strong></em>:</p>
<pre>
 cd myproj/
 echo &quot;some text&quot; &gt; somefile.txt
 git add .

</pre>
<p><em><strong>Commit a file:</strong></em></p>
<pre>
git commit -m &quot;initial commit&quot;
 [master (root-commit) 3a0e708] initial commit
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 somefile.txt

</pre>
<p><em><strong>Push it</strong></em>:</p>
<pre>
git push origin master
 Username for &#39;http://git.example.com&#39;: <em><strong>hagzag</strong></em>
 Password for &#39;http://hagzag@git.example.com&#39;: <em><strong>*****</strong></em>
 Counting objects: 3, done.
 Writing objects: 100% (3/3), 225 bytes, done.
 Total 3 (delta 0), reused 0 (delta 0)
 To http://git.example.com/proj2.git
 * [new branch]      master -&gt; master

</pre>
<p>See it on gitweb:<br />
	<img a="" alt="gitweb demo" src="/files/u1/gitweb-hagzag.png" /></p>
<p>&nbsp;</p>
<p><u><strong>Pitfalls / Caveats:</strong></u></p>
<ol>
	<li>
		<em><strong>Git directory ownership</strong></em> should be the same user running the httpd / apache2 daemon - if not you will get an error like so:G<br />
		<pre>
error: unpack failed: unpack-objects abnormal exit
To http://git.example.com/proj2.git
 ! [remote rejected] master -&gt; master (n/a (unpacker error))
error: failed to push some refs to &#39;http://git.example.com/proj2.git&#39;
  At this point I went back to the server and ran:           </pre>
	</li>
	<li>
		<em><strong>fcgid module in apache</strong></em> - if it&#39;s missing all the above will not work [same goes for <em><strong>env</strong></em> too but it&#39;s enabled by default !]</li>
</ol>
<p><strong>References:</strong></p>
<ul>
	<li>
		<a href="https://www.kernel.org/pub/software/scm/git/docs/git-http-backend.html">Git http backend <em>man page</em></a>,</li>
	<li>
		<a href="https://www.kernel.org/pub/software/scm/git/docs/git-init.html">git init man page</a> [bare/shared],</li>
	<li>
		<a href="http://httpd.apache.org/docs/2.2/programs/htdigest.html">htdigest</a>,</li>
	<li>
		<a href="https://www.kernel.org/pub/software/scm/git/docs/gitweb.html">gitweb man page</a></li>
</ul>
