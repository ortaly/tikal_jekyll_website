---
layout: post
title: 'OpenStack: Improve Keystone''s Default Logging'
created: 1351592418
author: gil
permalink: /devops/blog/some-info-about-keystone-openstack-logging
tags:
- DevOps
- Cloud OpenStack Keystone  logfile
---
<p>OpenStack consists of many services that their logging mechanism aren&#39;t described as good as it should on the net.<br />
	I have faced an error while running the command &quot;glance details&quot;. It was something to do with keystone but the error message wasn&#39;t informative enough so I opened keystone logs to find out that the files ar, well, empty.&nbsp;</p>
<p>I tried to google some information with no success. Therefore I had to figure it out myself. OpenStack documentation says something about using syslog or logging into files but it is not as clear as it should be.</p>
<p>Using trial and error I have found that changing the &quot;use_syslog&quot; parameter in <span style="font-family: 'courier new', courier, monospace;">/etc/keystone/keystone.conf</span>&nbsp; from False to True outputs all logs to &nbsp;syslog . I usually prefer working with log files therefore I tried to figure out how to do that.</p>
<p>In the keystone configuration file (/etc/keystone/keystone.conf), there&#39;s the following line:</p>
<p><span style="font-family:courier new,courier,monospace;">#log_config = /etc/keystone/logging.conf</span></p>
<p>Uncommenting it will start logging messages into a log file that is under <span style="font-family:courier new,courier,monospace;">/var/log/keystone</span> folder but how can we know what log level does it use?</p>
<p>The answer to the above question lies in the <span style="font-family:courier new,courier,monospace;">logging.conf</span> file. Looking inside this file doesn&#39;t help a lot without looking into &nbsp;<em><strong><span style="font-family:courier new,courier,monospace;">config.py</span></strong></em>&nbsp; in keystone&#39;s source tree, with some trial and error of course.&nbsp;</p>
<p>This&nbsp;<span style="font-family: 'courier new', courier, monospace;">logging.conf</span>&nbsp;basically consists of three formatters and three handlers. Formatters are being used for the amount of details that&#39;ll be used in each line in the log file and the handlers will determine where the logs will be written to. Confusing? indeed. In the keystone.conf file we saw that you can choose whether to write logs to file or to the system&#39;s syslog. Why do we need it in the logging.conf as well?</p>
<p>From&nbsp;<em><strong><span style="font-family: 'courier new', courier, monospace;">config.py</span></strong></em>&nbsp;code , I found that the syslog (production) and stdout (devel) are an end of life configurations and even if you&#39;ll decide to use them in the logging.conf file, you&#39;ll not see any log messages in syslog or the standard output.</p>
<p>Conclusion, use only the file handler as the root logger. Meaning, in the below section, set the handlers parameter to file:</p>
<pre class="rteindent1">
[logger_root]
level=DEBUG
handlers=file</pre>
<p>For&nbsp;<strong>verbosity</strong>, you need to set the parameters of the following section in the&nbsp;<span style="font-family: 'courier new', courier, monospace;">logging.conf</span>:</p>
<pre class="rteindent1">
[handler_file]
class=FileHandler
level=DEBUG
formatter=normal_with_name
args=(&#39;/var/log/keystone/keystone.log&#39;, &#39;a&#39;)</pre>
<p>The <strong>class</strong> parameter is an internal parameter. Leave it intact.</p>
<p>The <strong>level</strong> parameter is the most important parameter of this section, defining the log level. You can use any log level from DEBUG to CRITIACL (all upper case).</p>
<p>&nbsp;</p>
<p>The <strong>args</strong> parameter defines the log file path and the log file access (&#39;r&#39; read only, &#39;w&#39; read/write and &#39;a&#39; append)</p>
<div>
	The <strong>formatter</strong> parameter describes the amount of details in a log line and it &nbsp;can take on of the below values:</div>
<pre class="rteindent1">
<strong>normal</strong> - %(asctime)s %(levelname)s %(message)s:
              time, log level, log message

<strong>normal_with_name</strong> - (%(name)s): %(asctime)s %(levelname)s %(message)s
              name, time, log level, log message
                             
<strong>debug</strong> - (%(name)s): %(asctime)s %(levelname)s %(module)s %(funcName)s %(message)s
              name, time, log level, module name, function name, log message</pre>
<p>I have no idea what is the difference between name and module name but I&#39;m not sure it is that important.</p>
<p>Hope that the above will shed some additional light on keystone&#39;s logging.</p>
<p>&nbsp;</p>
