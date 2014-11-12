---
layout: post
title: Subversion - serverside action - auto add property to file
created: 1226228564
author: hagzag
permalink: /devops/subversion-serverside-action-auto-add-property-file
tags:
- DevOps
- auto_set_svn_prop
- CRLF
---
<p> 	 	 	</p><p>Problem:</p> <p>I am at a clients location which develops on windows and the &quot;EOL&quot; end of line is what is called CRLF unlike unix/linux which is naturally the servers platform which uses LF only (<a href="http://svnbook.red-bean.com/en/1.1/ch07s02.html">more details about CRLF/LF here</a>).</p> <p>we had to solve two issues</p> <ol><li><p style="margin-bottom: 0in;">Set a property on the level of SVN 	to set a default EOL of CRLF to certain file types for example .bat 	and .properties</p></li><li><p>Set the property to all the files with those extensions which 	already exist in repository.</p></li></ol> <p>For issue <strong>#1</strong> a few methods could apply in the client side - but we wanted to solve this on server side after investigating this issue the solution was quite simple - with the help of our ALM team of course.</p> <p>Edit the file called svnserve which is located under $SVNROOT/conf/svnserve.conf and add the following lines:</p> <p>&nbsp;</p> <pre>
[miscellany]
enable-auto-props = yes 
[auto-props]
*.png = svn:mime-type=image/png
*.jpg = svn:mime-type=image/jpeg
*.bat = svn:eol-style=CRLF
*.txt = svn:eol-style=CRLF
*.properties = svn:eol-style=CRLF</pre><p>&nbsp;</p> <p>As you can see I added a few more extensions while I was at it.</p> <p><strong>Please note:</strong></p> <p>SVN usually &quot;guesses&quot; the type of file and has a classification called &quot;native&quot; the native classification tags the file in its native OS mode for example a .sh file will automatically receive an LF end of line although I guess there are a few extensions which SVN doesn't recognize the result would be a file which is broken up into two lines instead of the original line brakes the developer used whilst editing the file.</p> <p>for issue #2 this has two methods</p> <p>one: commit files manually + add&nbsp; <tt>svn:eol-style</tt>=CRLF to each file then commit it to SVN and of course from this revision onwards the file will have a CRLF eol&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> <p>second: and the more elegant way is two write a short script which will set a property to all files with .bat &amp; .properties extension and of course submit this to SVN.</p> <p>I used the following <a href="http://svn.collab.net/repos/svn/trunk/contrib/client-side/svn_apply_autoprops.py">script</a>:&nbsp; checkout the repository you wish to enforce the properties on in my case &quot;trunk&quot;</p> <pre>
[Myserver]$ mkdir trunk
[Myserver]$ svn co http://Myserver/svn/repos/trunk trunk
[Myserver]$ cd trunk
[Myserver]$ wget http://svn.collab.net/repos/svn/trunk/contrib/client-side/svn_apply_autoprops.py
[Myserver]$ chmod u+x svn_apply_autoprops.py</pre><p>now run the script - the script automatically runs on CWD &quot;.&quot;!</p> <pre>
[Myserver]$./svn_apply_autoprops.py
&nbsp;</pre><p><br />check a few of your files to see that properties were set to your specification - the specifiactaions are inherited from the $SVNROOT/conf/svnconf.conf file as stated earlier in this article.</p> <p>&nbsp;</p> <pre style="margin-bottom: 0.2in;">
[Myserver]$ svn pl svn pl base/javalib/antInstaller/LICENSE-ant.txt</pre><p>your output should be something like:</p> <p>Properties on 'base/javalib/antInstaller/LICENSE-ant.txt':<br />svn:eol-style</p> <p>you can do the same checkup with tortoise.</p> <p>Once you are sure all properties were made to your WC to your satisfaction you can commit your changes to repository (you will have to have &quot;rw&quot; perms to trunk in order to commit !)</p> <pre style="margin-bottom: 0.2in;">
[Myserver]$ svn commit http://myserver/svn/repos/trunk -m &quot;add properties to files / CRLF property&quot;</pre><p>update / checkout from a different machine / working copy and see if your changes were submitted successfully -</p> <p>&nbsp;</p> <p>Thats it, mission accomplished.</p> <p>Hope you find this useful.</p> <p style="margin-bottom: 0in;">&nbsp;</p>
