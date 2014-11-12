---
layout: post
title: Where is my my.cnf file?
created: 1263974614
permalink: where-is-my-my-cnf-file
tags:
- JS
- mysql my.cnf
---
<p>One of the most common questions I get is related to the location of the my.cnf file (or my.ini).</p>
<p>The question comes in few variants:</p>
<ol>
    <li>&nbsp;I am setting the option xyz in my.cnf but it does not seem to work?</li>
    <li>&nbsp;I can set the option xyz using. /mysql --zyx=abc but when I am placing it in my.cnf it does not take any effect?</li>
    <li>&nbsp;I have my.cnf in /etc and on in&nbsp;/usr/local/mysql/etc/&nbsp;&nbsp;which one should I use?</li>
    <li>&nbsp;Where the f@&amp;% is my my.cnf file !?!?</li>
</ol>
<p>In MySQL the answer for the above questions are a little confusing.</p>
<!--break-->
<p>The reason for that is that MySQL server use more than one my.cnf file.&nbsp;Because MySQL server uses more&nbsp;than one my.cnf it needs precedence. You should remember the following rules regarding configuration files&nbsp;(a.k.a. options files). &nbsp;</p>
<ol>
    <li>&nbsp;The last option found is the &ldquo;winner&rdquo;</li>
    <li>&nbsp;&nbsp;Command line option is always the &ldquo;winner&rdquo; (i.e. the strongest)</li>
    <li>&nbsp;&nbsp;Windows use both my.ini and my.cnf (in that order).</li>
</ol>
<p>&nbsp;</p>
<p>The user manual specifies the precedence of options file and their location for Windows and Linux MySQL installations <a href="http://dev.mysql.com/doc/refman/5.1/en/option-files.html">here</a>. You can consult your mysql help to figure out the precedence of configuration files and the order of read. <br />
Execute the MySQL server (or any other mysql utility) using the --verbose --help option&nbsp; &nbsp;</p>
<p>&nbsp;</p>
<pre>
c:\&gt;mysqld-nt.exe --verbose --help
Ver 5.0.87-community-nt-log for Win32 on ia32 (MySQL Community Edition (GPL))
Copyright (C) 2000 MySQL AB, by Monty and others
Starts the MySQL database serverUsage: mysqld-nt.exe 
[OPTIONS]<o:p></o:p>NT and Win32 specific options:
 --install&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Install the default
--install-manual&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Install the default service started
&nbsp;...
Default options are read from the following files in thegiven order:
C:\WINNT\my.ini C:\WINNT\my.cnf C:\my.ini C:\my.cnf 
C:\Program Files\MySQL\MySQL Server 5.0\my.ini 
C:\Program Files\MySQL\MySQL Server 5.0\my.cnf
...</pre>
<pre><o:p></o:p></pre>
<p>&nbsp;</p>
<p>But in some cases this will not reflect the actual files used! Why?<br />
Because the server maybe started with one of the options --defaults-extra-file or<br />
&nbsp;--defaults-file or maybe someone added options directly to the mysqld startup script.</p>
<ol>
    <li>In case you would like to add more files you can use the<strong> --defaults-extra-file</strong> option. &nbsp;</li>
    <li>In case you would like to point only to a specific file you can use the <strong>--defaults-file</strong> option.&nbsp;</li>
</ol>
<p>&nbsp;</p>
<p>For example you can see in the image below that when installing MySQL as a service in windows the installation uses the --defaults-file option&nbsp;&nbsp;&nbsp;</p>
<p><img height="470" alt="Windows Service" width="412" align="middle" src="/files/upload/13/mysql-service.png" />&nbsp;&lt;</p>
<p>In my Linux I used &ldquo;ps aux | grep mysqld&rdquo; to see how the mysqld is executed from the startup script and got the following output</p>
<p>&nbsp;</p>
<pre>
mysql    21250 0.1 2.9 536588 59840 pts/0    Sl   14:21   0:00
/opt/mysql/bin/mysqld --basedir=/opt/mysql/ --datadir=/opt/mysql//data
--user=mysql --log-error=/opt/mysql//data/error.log --pid-file=/opt/mysql//data/haimr.com.pid
--socket=/tmp/mysql.sock --port=3306</pre>
<p>&nbsp;</p>
<p>You may see that the port option is served directly at the service script so you should change the script if you want to change to port.</p>
<p>&nbsp;</p>
<p>But wait that&rsquo;s not all; in order to see witch variables are overridden by the files above</p>
<p>MySQL offers the --print-defaults option witch list out all the options in the order they read for example if you had a my.cnf under your user directory (a.k.a~/my.cnf ) in Linux with the following entry<br />
&nbsp;</p>
<pre>
[mysql]
user=haim
prompt=\u&gt;</pre>
<pre><p>&nbsp;<br />*prompt = \u will print the user at the mysql prompt</p><p>And under /etc/my.cnf</p><pre style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px; padding-top: 0px"><pre>

<pre style="padding-right: 0px; padding-left: 0px; padding-bottom: 0px; margin: 0px; padding-top: 0px"><pre>
[mysql]
user=root </pre>
</pre>
</pre>
<p>When executing mysql &ndash;print-defaults you will get the following output</p>
</pre>
#./mysql --print-defaults
./mysql would have been started with the following arguments:
--user=root  --port=3306 --socket=/tmp/mysql.sock --no-auto-rehash --user= haim --prompt=\u&gt;
./mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 5.1.31-log MySQL Community Server (GPL)&rlm;
Type 'help;' or '\h' for help. Type '\c' to clear the buffer.
haim&gt;
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">You can see that haim was used as the user.</p>
<p class="MsoNormal"><strong>Tip:</strong> you may use --defaults-file and &ndash;print-defaults together.</p>
<p class="MsoNormal"><u>Watch out for pitfalls</u></p>
<ol>
    <li><span><span><span style="font: 7pt &quot;Times New Roman&quot;; font-size-adjust: none; font-stretch: normal">&nbsp;</span></span></span>Windows use both my.ini and my.cnf</li>
    <li><span><span><span style="font: 7pt &quot;Times New Roman&quot;; font-size-adjust: none; font-stretch: normal">&nbsp;</span></span></span>Make sure you --print-defaults with the actual configuration of your running server <br />
    watch out for windows services and startup scripts</li>
    <li>Options files are used by mysqld but also by mysql client and other clients</li>
</ol>
</pre>
<p>&nbsp;</p>
