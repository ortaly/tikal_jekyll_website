---
layout: post
title: 'musqldump (on slave) with --single-transaction option (for InnoDB) '
created: 1262590848
permalink: musqldump-on-slave-with-single-transaction-option-for-innodb
tags:
- DevOps
- MySQL
---
<p>&nbsp;I got the following question from one of our customers.</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&rdquo;I have a question regarding mysqldump.</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">I am using the following scenario:</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">Replication: one master and one slave, default engine is InnoDB.</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">If I execute musqldump (on slave) with --single-transaction option (for InnoDB) do I have to stop the replication on slave or it does not metter?</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; "><span style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; ">&nbsp;</span>Thank you.&rdquo;</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<p class="MsoNormal" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; width: 600px; ">&nbsp;</p>
<p class="MsoNormal"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2">When using --single-transaction the SQL statements are wrapped by START TRANSACTION and COMMIT.<span style="mso-spacerun:yes">&nbsp;</span>In this case when all tables are Innodb there is no actual need to stop the replication.</span></p>
<p class="MsoNormal"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2">Please note the following regarding --single-transaction<o:p></o:p></span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;
mso-bidi-theme-font:minor-latin;color:#1F497D;mso-themecolor:dark2"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi;color:#1F497D;mso-themecolor:dark2">You have to make sure that all of the tables you dump are innodb<o:p></o:p></span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;
mso-bidi-theme-font:minor-latin;color:#1F497D;mso-themecolor:dark2"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi;color:#1F497D;mso-themecolor:dark2">It recommended to combine --quick with --single-transaction for large tables<o:p></o:p></span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;
mso-bidi-theme-font:minor-latin;color:#1F497D;mso-themecolor:dark2"><span style="mso-list:Ignore">3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi;color:#1F497D;mso-themecolor:dark2">You cannot combine <span style="mso-spacerun:yes">&nbsp;</span>--single-transaction --lock-tables because LOCK TABLE STATEMENT implicitly commit and open a new transaction <o:p></o:p></span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;
mso-bidi-theme-font:minor-latin;color:#1F497D;mso-themecolor:dark2"><span style="mso-list:Ignore">4.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi;color:#1F497D;mso-themecolor:dark2">No other connection should use the following statements: ALTER TABLE, CREATE TABLE, DROP TABLE, RENAME TABLE, TRUNCATE TABLE <o:p></o:p></span></p>
<p class="MsoListParagraph"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal"><strong><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2">With all that said I think that the all point of backing up from slave is to avoid suck dilemmas and just STOP the SQL thread and backup in a sterile&nbsp;</span></strong><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2"><span class="Apple-style-span" style="font-weight: bold; ">environment</span>.</span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;color:#1F497D;mso-themecolor:dark2"><o:p></o:p></span></p>
