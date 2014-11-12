---
layout: post
title: Hudson Jira plugin SSL configuration
created: 1288795849
author: shachar
permalink: /devops/hudson-jira-plugin-ssl-configuration
tags:
- DevOps
- Hudson Jira
---
<p><span style="color: #ff0000">sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target&nbsp;</span></p>
<p>&nbsp;</p>
<!--break-->
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>If you have encounteded the above error, it means that you too have realized that Hudons Jira plugin doesn't&nbsp;support https URLs out of the box, I found <a href="http://blogs.sun.com/andreas/entry/no_more_unable_to_find">this</a>&nbsp;useful post which helped configure Java security to trust the certificate imported from Jira host machine.</p>
<p>&nbsp;</p>
<p>In short, what I did is:</p>
<ol>
    <li>Compiled InstallCert.java</li>
    <li>Ran InstallCert &lt;Jira host&gt; and followed instructions/question prompted</li>
    <li>Replaced cacerts file under JAVA_HOME/jre/lib/security with jssecacerts file which was created in the directory where I ran step 2</li>
    <li>Restart Hudson</li>
</ol>
<p>&nbsp;</p>
<p>Notes:</p>
<ol>
    <li>Make sure you replace cacerts&nbsp;in the java installation used to run Hudson</li>
    <li>If you have previously configured java KeyStore, you'll to import the certificate using 'keytool' command which is a bit more tricky</li>
</ol>
