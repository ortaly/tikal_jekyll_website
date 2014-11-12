---
layout: post
title: 27th of April Site Downtime
created: 1272398164
author: hagzag
permalink: /devops/27th-april-site-downtime
tags:
- DevOps
- Drupal
- php
---
<p>Hi All,</p>
<p>Well there is not much to say on tikalk.com's downtime except we have encountered another configuration issue which has been <strong>forced upon us</strong> by our hosting provider.</p>
<p>&nbsp;</p>
<p>After talking to them twice 30 minuets each call, and making sure no configuration changes were made by bluehost which might influence our site's uptime I have encountered a configuration issue which truly should not have an impact.</p>
<p><a href="http://www.drupal.org">Druapl's</a> settings.php file located under sites/default directory includes the database URL and credentails.</p>
<p>For some reason until the 26th of April it was working with:</p>
<pre class="brush: php;" title="code">
$db_url = 'mysql://username:password@localhost/databasename';

</pre>
<p>Whilst as of today (this morning to be accurate) it expects:</p>
<p>&nbsp;</p>
<pre class="brush: php;" title="code">
$db_url = 'mysqli://username:password@localhost/databasename';
</pre>
<p>Why weren't we formally informed by bluehost ? beats me...</p>
<p>The only way I picked up this path was by examining another blue host account I&nbsp;manage their, and I found that mysqli is being used ...</p>
<p>&nbsp;</p>
