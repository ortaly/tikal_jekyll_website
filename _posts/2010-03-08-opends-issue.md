---
layout: post
title: OpenDS issue
created: 1268030341
permalink: opends-issue
tags:
- DevOps
- security
- OpenDS
- ldap
---
<p>HI,<br />
For a client I am using the following configuration:<br />
1-An OpenDS server version 2.2<br />
2-An OpenLDAP client (the Novel libraries)<br />
<br />
Both are very easy to use.<br />
<br />
There is a need to query the LDAP server for information such as password expiration time, number of failed logins etc. This information is readily available by using a command line interface which is provided by OpenDS : https://docs.opends.org/wiki/Diff.jsp?page=HowToManageUserAccounts&amp;r1=20&amp;r2=17<br />
<br />
For instance to get the failure time one would invoke:</p>
<p>&nbsp;</p>
<p>&lt;code&gt;<br />
manage-account get-authentication-failures-times \<br />
--targetDN &quot;uid=kvaughan,ou=People,dc=example,dc=com&quot; \<br />
--hostname localhost --port 1389 \<br />
--bindDN &quot;cn=Directory Manager&quot; --bindPassword password</p>
<p>&nbsp;</p>
<p>&lt;/code&gt;<br />
The command line interface is of course using OpenDS Java libs, I looked at the code and it would be a nightmare to refactor. <br />
<br />
I tried invoking the corresponding &quot;main&quot; function of the ManageAccount class (matches the above command line) and it works however it is very problematic since first the main function returns void and though I can capture the output from the main and parse it, it is not an ideal solution. A second issue is that the command line interface is interactive and requires a response while being processed. <br />
<br />
has anyone had any experience with this? I need someone who really dealt with it, not just installed OpenDS and went to drink coffee ... <br />
<br />
Thanks, <br />
<br />
&nbsp;</p>
