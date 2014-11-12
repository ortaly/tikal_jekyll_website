---
layout: post
title: Solution MySQL ERROR 1045 Access denied for 'user'@'localhost' - breaks OpenStack
created: 1340636377
author: ori.tzoran
permalink: /devops/solution-mysql-error-1045-access-denied-userlocalhost-breaks-openstack
tags:
- DevOps
- MySQL access denied localhost 1045
---
<p>I was working on an OpenStack Essex installation on 2 desktops. Shortly after I&nbsp;finished setting up the controller in an all-in-one configuration, and while working on the nova-compute node, openstack crashed. The first thing i noticed was an AppArmor popup informing <span style="font-family: 'Courier New'; ">glance-registry</span> has crashed unexpectedly. Further inspection revealed that the '<span style="font-family: 'Courier New'; ">glance-registry</span>' daemon is starting and crashing in an andless loop. All other OpenStack services were inoperational and the nova log files in  <span style="font-family: 'Courier New'; ">/var/log/upstart/nova-*</span> were huge.&nbsp;&nbsp;</p>
<p>&nbsp;</p>
<p>Greping <span style="font-size: medium; "><span style="font-family: 'Courier New'; ">/var/log/glance/registry.log</span></span><span style="font-family: Arial; ">&nbsp;</span>for 'error' i found this (on the controller):</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">2012-06-16  12:57:42 1356&nbsp;&nbsp;&nbsp; ERROR [glance.registry.db.api] Error configuring  registry database with supplied sql_connection 'mysql://glance:openstack@10.0.0.40/glance'. Got error: </span></p>
<p class="rteindent1"><span style="background-color: rgb(255, 255, 0); "><span style="font-family: 'Courier New'; ">(OperationalError) (1045, &quot;Access denied for user 'glance'@'ostk-controller1' (using password: YES)&quot;)</span></span><span style="font-family: 'Courier New'; "> None None</span></p>
<p>This suggested something is wrong with mysql. Testing access from the commandline produced the same error:</p>
<p class="rteindent1">﻿<span style="font-family: 'Courier New'; ">$ mysql -uglance -popenstack</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">ERROR 1045 (28000): Access denied for user 'glance'@'localhost' (using password: YES)</span></p>
<p>&nbsp;</p>
<p>Wondering what change prvoked this ERROR 1045, i spent hours googling around. There're plenty of ERROR 1045 descriptions, but none of them explained the problem or helped me resolve it - which is the reason for this post.&nbsp;</p>
<p>&nbsp;</p>
<h1>The Problem</h1>
<p>The logfile of mysqld,&nbsp;<strong><span style="font-size: medium; "><span style="font-family: 'Courier New'; ">/var/log/upstart/mysql.log</span></span></strong>,&nbsp; reported yet another error:&nbsp;</p>
<p class="rteindent1">﻿<span style="font-family: 'Courier New'; ">120618 14:07:31 [Note] /usr/sbin/mysqld: ready for connections.</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Version: '5.5.24-0ubuntu0.12.04.1' &nbsp;socket: '/var/run/mysqld/mysqld.sock' &nbsp;port: 3306 &nbsp;(Ubuntu)</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">mysqld is alive</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Checking for tables which need an upgrade, are corrupt or were</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">not closed cleanly.</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">120618 14:07:36 <span style="background-color: rgb(255, 255, 0); ">[ERROR] Cannot find or open table nova/projects</span> from</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">the internal data dictionary of InnoDB though the .frm file for the </span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; "> table exists.&nbsp;Maybe you have deleted and recreated InnoDB data</span></p>
<p class="rteindent1">&nbsp;</p>
<p>This looked like a DB corruption. Assuming healing it will solve the problem I wasted a few hours on that, in vain. Finally it turned this is a harmless alert that has nothing to do with the Access Denied issue (but is probably a nova bug).</p>
<p>&nbsp;</p>
<p>Some posts on the subject suggested that the socket permissions prevented local access. In my installation:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; "># ll /var/run/mysqld/mysqld.sock<br />
srwxrwxrwx 1 mysql mysql 0 Jun 18 17:34 /var/run/mysqld/mysqld.sock</span></p>
<p>Which is ok.&nbsp;</p>
<p>&nbsp;</p>
<p>Back to mysql's user accounts.</p>
<p>User 'glance' was properly defined in mysql, as well as 'keystone' and 'nova'. Permissions and grants looked ok - and let's recall openstack worked (!). Connecting from any remote host (same command as above, with <span style="font-family: 'Courier New'; ">--host</span> of course) worked fine. The glance daemons&nbsp;<span style="font-family: 'Courier New'; ">glance-api</span> and <span style="font-family: 'Courier New'; ">glance-registry</span>&nbsp; weren't the only services imapcted by error 1045: <span style="font-family: 'Courier New'; ">keystone</span> and <span style="font-family: 'Courier New'; ">nova</span> had the same issue, and their respective log files (under <span style="font-family: 'Courier New'; ">/var/log/upstart</span>) had thousands of lines of the&nbsp;<span style="font-family: 'Courier New'; "><em>OperationalError</em></span> quoted above (which is due to the fact openstack's upstart jobs have a very &quot;slim&quot; logic).</p>
<p>All that suggested that there was something special about 'localhost' access to mysql.&nbsp;</p>
<p>&nbsp;</p>
<p>I use '<a href="https://help.ubuntu.com/10.04/serverguide/etckeeper.html">etckeeper</a>' to keep a log and trace of what's getting installed and modified. Comparing log timestamps and git changes, I concluded that the mess was caused by a simple modification to <span style="font-family: 'Courier New'; ">/etc/hosts</span>: the yellow line below, which is a step in the installation procedure, created the havoc:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">﻿127.0.0.1<span class="Apple-tab-span" style="white-space: pre; ">	</span>localhost <span class="Apple-tab-span" style="white-space: pre; ">	</span></span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">127.0.1.1<span class="Apple-tab-span" style="white-space: pre; ">	</span>ostk-controller1</span></p>
<p class="rteindent1"><span style="background-color: rgb(255, 255, 0); "><strong><span style="font-family: 'Courier New'; ">10.0.0.40 <span class="Apple-tab-span" style="white-space: pre; ">	</span>ostk-controller1</span></strong></span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">10.0.0.41 <span class="Apple-tab-span" style="white-space: pre; ">	</span>ostk-nova1</span></p>
<p class="rteindent1">&nbsp;</p>
<h1>A Poor Workaround</h1>
<p>Putting this yellow line in comment provided a poor workaround: it solved mysql <span style="font-family: Arial; ">ERROR 1045, but the controller must have its hostname resolved in&nbsp;</span><span style="font-family: 'Courier New'; ">/etc/hosts</span> so we're not satisfied.</p>
<p>&nbsp;</p>
<p>Further reading suggested that the error has something to do with the way mysql interprets '<strong>%</strong>' in statements such as:&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">GRANT USAGE ON *.* TO 'glance'@'%' IDENTIFIED BY PASSWORD('openstack');</span></p>
<p>Is it possible that '%' stands for &quot;all hosts&nbsp;<strong>except</strong>&nbsp;localhost&quot;? i read this more than once (see <em>References</em> below) but could hardly belive. Interestingly, the MySQL documentation isn't clear about this question and that's the reason, i guess, there's so much confusion and so many posts related to ERROR 1045.</p>
<p>It's worth noting that the hint to the final answer was found in a post with the title &quot;<em>Any way to make anyhost '%' include localhost</em>&quot;...</p>
<p>&nbsp;</p>
<h1>Understanding MySQL Access</h1>
<p>I've set up a separate VM to explore that, and here are my findings.</p>
<p>After installing mysql-server (latest for Precise is 5.5.24), the <strong>USER</strong> <strong>table</strong> and <strong>GRANTS</strong> get the default settings listed below (for clarity&nbsp;i've cut the right side of the output so it doesn't look exactly as on screen):</p>
<p><font face="Courier New">[14:57:22]root@mysqltests[~]<br />
# <strong>mysql -u root -p</strong><br />
. . .<br />
Server version: 5.5.24-0ubuntu0.12.04.1 (Ubuntu)<br />
. . .</font></p>
<p><font face="Courier New">mysql&gt; <strong>SELECT user,host,password FROM mysql.user;</strong><br />
+------------------+------------+-------------------------+<br />
| user &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | host &nbsp; &nbsp; &nbsp; | password &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|<br />
+------------------+------------+-------------------------+<br />
| root &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | localhost &nbsp;| *77B48D6366D102139D3719 |<br />
| root &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | mysqltests | *77B48D6366D102139D3719 |<br />
| root &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 127.0.0.1 &nbsp;| *77B48D6366D102139D3719 |<br />
| root &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | ::1 &nbsp; &nbsp; &nbsp; &nbsp;| *77B48D6366D102139D3719 |<br />
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| localhost &nbsp;| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |<br />
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| mysqltests | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |<br />
| debian-sys-maint | localhost &nbsp;| *04D30B480932109EFD77E1 |<br />
+------------------+------------+-------------------------+<br />
7 rows in set (0.00 sec)</font></p>
<p><font face="Courier New">mysql&gt; <strong>show grants;</strong><br />
+---------------------------------------------------------+<br />
| Grants for root@localhost &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |<br />
+---------------------------------------------------------+<br />
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' &nbsp; &nbsp; &nbsp; |</font></p>
<p><font face="Courier New">| &nbsp; &nbsp; &nbsp; IDENTIFIED BY PASSWORD '*77B48D6366D102139D3719' &nbsp;|</font></p>
<p><font face="Courier New">| &nbsp; &nbsp; &nbsp; WITH GRANT OPTION &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |<br />
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT &nbsp; |</font></p>
<p><font face="Courier New">| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; OPTION &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|<br />
+---------------------------------------------------------+<br />
2 rows in set (0.00 sec)</font></p>
<p>&nbsp;</p>
<h2>The <em>mysql.user</em> Table</h2>
<p>At first glance, we have 2 users (root and debian-sys-maint). That's wrong, because mysql's &quot;user&quot; is a 'user'@'host' pair association. So we have 7 in total: 'root' is defined (with the same password) for any combination of 'localhost' (the first 4 lines), then we have 2 strange lines with <strong>empty</strong> username, and finally the debian backdoor 'debian-sys-maint'.&nbsp;</p>
<p>&nbsp;</p>
<h2>The grants</h2>
<p>The 'show grants' above shows only grants for 'root'. But if we run the next staement, we see what access is provided to any user connecting from 'localhost':</p>
<p class="rteindent1"><font face="Courier New">mysql&gt; <strong>show grants for ''@'localhost';</strong><br />
+--------------------------------------+<br />
| Grants for @localhost &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|<br />
+--------------------------------------+<br />
| GRANT USAGE ON *.* TO ''@'localhost' |<br />
+--------------------------------------+<br />
</font></p>
<p>Which (indirectly) explains why running this command (as Linux user 'ori')&nbsp;doesn't require a password:&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">[16:16:57]ori@mysqltests[~]</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">$ <strong>mysqladmin ping</strong><br />
mysqld is alive<br type="_moz" />
</span></p>
<p>&nbsp;</p>
<p>Where this one fails:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">[16:14:59]ori@mysqltests[~]<br />
$ <strong>mysqladmin -uroot ping</strong><br />
mysqladmin: connect to server at 'localhost' failed<br />
error: 'Access denied for user 'root'@'localhost' (using password: NO)'</span></p>
<p>&nbsp;</p>
<p>Honestly, in the beginning i thought there's some balck magic here related to the user ('ori', in this case) defined during ubuntu installation, or a special Linux group memebership, or some apparmor profile or god-knows what else.&nbsp;</p>
<p>&nbsp;</p>
<p>But there's no black magic after all, and it's all inside mysql:</p>
<p>The first thing to bear in mind is that the empty USER field '' is a wildcard, same as '%' for host.&nbsp;</p>
<p>The second is that mysql prefers the explicit match over the wildcard. For example, user 'root' can match either [1] the explicit 'root'@localhost' row or [2] the wildcard ''@'localhost' row. Since there's an explicit entry for [1] in the table mysql.user, it'll be used. This in turn requires a password so when i try to connect as 'root' without a password i'm rejected.</p>
<p>When i connect as 'ori' - which <u>isn't</u>&nbsp;even a mysql user, there's only one possible match -&nbsp;''@'localhost' and this line in the table doesn't have a password.</p>
<p>This nicely explains why the above mysqladmin command works for 'ori' and fails for 'root'.&nbsp;</p>
<p>&nbsp;</p>
<p>To sum it up: mysql controls access (or connection request) based on&nbsp;the USER table. Which user, from which host and whether a password is required.&nbsp;</p>
<p>Once connected, the GRANTS determine what the user is allowed to do. When connected as 'ori' i'm limited to &quot;USAGE&quot; (e.g. check if server is up, what version and the like of inoffensive commands).&nbsp;</p>
<p>&nbsp;</p>
<p>So far so good - but why 'glance'@'localhost' is denied access on the OpenStack controller?</p>
<p>When the static IP address of the conroller <u>wasn't</u> in <span style="font-family: 'Courier New'; ">/etc/hosts</span> (or after it was commented-out), there was only one match for 'glance' = 'glance'@'%'</p>
<p>This, in turn, comes from the connection string (in&nbsp;<span style="font-family: 'Courier New'; ">/etc/glance/glance-registry.conf</span>) which is:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">sql_connection = mysql://glance:openstack@10.0.0.40/glance</span></p>
<p>It specifies user, password and host.</p>
<p>The line I've added for&nbsp;10.0.0.40 in /etc/hosts, told mysql&nbsp;(indirectly) that host 'ostk-controller1' is actually 'localhsot'. From now on, there are 2 possible matches for 'glance', and the one picked by mysql is ''@'localhost'. This row, however, doesn't require a password - which the&nbsp;sql_connection string provide.</p>
<p><strong>And that's why all OpenStack services couldn't connect to mysql.</strong></p>
<p>&nbsp;</p>
<p>Check against the USER table below, this was taken from ostk-controller (not the test VM):</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">mysql&gt; <strong>SELECT user,host,password FROM mysql.user;</strong><br />
+------------------+------------------+-------------------------+<br />
| user </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| host &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | password </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-family: 'Courier New'; ">&nbsp;|</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">+------------------+------------------+-------------------------+<br />
| root </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| localhost &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">| root </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| ostk-controller1 | *3A4A03AC22526F6B591010 |</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">| root </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| 127.0.0.1 &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">| root &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | ::1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |<br />
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| localhost &nbsp; &nbsp; &nbsp; &nbsp;| </span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">|</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| ostk-controller1 | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |<br />
| debian-sys-maint | localhost &nbsp; &nbsp; &nbsp; &nbsp;| *F714636CE8A7836873F7C8 |<br />
| nova &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | % &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |<br />
| glance &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | % &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |<br />
| keystone &nbsp; &nbsp; &nbsp; &nbsp; | % &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| *3A4A03AC22526F6B591010 |<br />
+------------------+------------------+-------------------------+<br />
10 rows in set (0.00 sec)</span><br />
&nbsp;</p>
<h1>Solution for ERROR 1045</h1>
<p>After understanding why, let's improve on the poor workaround.</p>
<p>I'd like to credit <a href="http://lists.mysql.com/mysql/160174">an answer by Paul DuBois from 2004</a> for this solution(it's worth noting that the subject was &quot;<em>Re: Any way to make anyhost '%' include localhost</em>&quot;).</p>
<p>&nbsp;</p>
<p>Borrowing from there, here's the remedy:</p>
<p><strong>in MySQL</strong>:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">mysql -uroot -p</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">DELETE FROM mysql.user  WHERE Host='localhost' AND User='';</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">DELETE FROM mysql.user  WHERE Host='ostk-controller1' AND User='';</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">FLUSH PRIVILEGES;<br type="_moz" />
</span></p>
<p>&nbsp;</p>
<p><strong>in /etc/hosts</strong>:</p>
<p class="rteindent1"><strong>Replace</strong> the line</p>
<p class="rteindent2"><strike><span style="font-family: 'Courier New'; ">127.0.1.1</span>&nbsp; &nbsp;<span style="font-family: 'Courier New'; ">ostk-controller1</span></strike></p>
<p class="rteindent1"><strong>by this one</strong>:</p>
<p class="rteindent2" style="line-height: 21px; "><span style="font-family: 'Courier New'; ">10.0.0.40&nbsp;	ostk-controller1</span></p>
<p class="rteindent1">Quoting from <a href="http://www.debian.org/doc/manuals/debian-reference/ch05.en.html#_the_hostname_resolution">Debian's reference manual</a>:</p>
<p class="rteindent2">For a system with a permanent IP address, that permanent IP address should be used here instead of 127.0.1.1</p>
<p class="rteindent1">&nbsp;</p>
<p>finally restart networking and&nbsp;mysqld - or simply reboot.</p>
<p>&nbsp;</p>
<h1>A Second Solution</h1>
<p>Months after going through the above study, i found out why some OpenStack installations <strong>don't</strong> hit this issue; The keystone installation instructions (from Ubuntu, for Essex, <a href="http://www.ubuntu.com/content/configuring-keystone-openstack-essex">can be found here</a>) create each OSTK user in mysql <strong>twice</strong>, as in:&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">mysql&gt; CREATE DATABASE keystone;<br />
<strong>CREATE USER &lsquo;keystone&rsquo;@&rsquo;localhost&rsquo;</strong> IDENTIFIED BY &lsquo;Secret_pass&rsquo;;<br />
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone&rsquo;@&rsquo;localhost&rsquo;<br />
WITH GRANT OPTION;<br />
<strong>CREATE USER &lsquo;keystone&rsquo;@&rsquo;%&rsquo;</strong> IDENTIFIED BY &lsquo;Secret_pass&rsquo;;	<br />
GRANT ALL PRIVILEGES ON keystone.* TO &lsquo;keystone&rsquo;@&rsquo;%&rsquo;<br />
IDENTIFIED BY &lsquo;Secret_pass&rsquo;;	<br />
FLUSH PRIVILEGES;</span><br />
&nbsp;</p>
<p>Sure enough this will avoid Error 1045 but isn't as elegant as the 1st one.&nbsp;</p>
<h1>Additinal Conclusions</h1>
<p>Add to OpenStack install instructions: delete the default rows relative to anonymous access from localhost in the table mysql.user.&nbsp;</p>
<p>&nbsp;</p>
<h1>References</h1>
<ol>
    <li><a href="http://dev.mysql.com/doc/refman/5.5/en/account-management-sql.html">Account Management Statements in MySQL 5.5 doc</a></li>
    <li><a href="http://dba.stackexchange.com/questions/10852/mysql-error-access-denied-for-user-alocalhost-using-password-yes">Thread in stackexchange on MySQL error: Access denied for user 'a'@'localhost' (using password: YES)</a></li>
    <li><a href="http://lists.mysql.com/mysql/160174">Thread in mysql ML on Any way to make anyhost '%' include localhost&quot;</a></li>
</ol>
<p>&nbsp;</p>
