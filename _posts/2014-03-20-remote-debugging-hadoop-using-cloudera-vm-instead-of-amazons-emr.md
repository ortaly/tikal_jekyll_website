---
layout: post
title: Remote debugging Hadoop using Cloudera VM instead of Amazon’s EMR
created: 1395304805
author: menny
permalink: remote-debugging-hadoop-using-cloudera-vm-instead-of-amazons-emr
tags:
- .NET
- Hadoop
- cloudera
---
<h1 style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: bold; margin: 0px 0px 0.8125em; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(0, 0, 0); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">Abstract</h1>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">Enable you to debug the map-reduce process on your local machine by setting up Hadoop in a VM instead of debug through logs in amazon&rsquo;s EMR</p>

<h1 style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: bold; margin: 0px 0px 0.8125em; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(0, 0, 0); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">Instructions</h1>

<ol style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: decimal; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Download cloudera quick start VM follow the instructions <a href="http://www.cloudera.com/content/cloudera-content/cloudera-docs/DemoVMs/Cloudera-QuickStart-VM/cloudera_quickstart_vm.html" style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(25, 130, 209); text-decoration: none;">here</a> for pre requisite and<a href="http://www.cloudera.com/content/support/en/downloads/download-components/download-products.html?productID=F6mO278Rvo" style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(25, 130, 209); text-decoration: none;">download link</a>. You can choose the VM type (vmware, virtual box etc&rsquo;)</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Extract the file and start the VM
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">username: cloudera</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">password: cloudera</li>
	</ol>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">The VM should start with FF browser open
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">in the home page (or in the bookmarks) click the cloudera manager and wait for it to initialize</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">once the you have it running you can issue hadoop commands on the terminal</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">open a terminal and issue &ldquo;Hadoop fs &ndash;ls&rdquo; which should work but return nothing</li>
	</ol>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">make sure you have a connection between the host machine and the cloudera guest VM
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">issue an ifconfig command on the terminal to find your ip</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">try to ping your ip from the host</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">if that does not work you will have to configure the VMplayer/VB network settings
		<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-roman;">
			<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">in VB, go to network and select
			<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: lower-alpha;">
				<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Attached to: Bridge Adapter</li>
				<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Promiscuous Mode: Allow VMs</li>
			</ol>
			</li>
			<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Apply the new settings and wait for the network to work again</li>
			<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Issue another ifconfig command to find you new IP</li>
			<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Try to ping it again from the host</li>
		</ol>
		</li>
	</ol>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;"><b>On windows only</b>: DO not try to use &ldquo;Share Folder&rdquo; or restart the VM, this will cause couldera services to stop functioning because of IP conflicts!</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Transfer your hadoop jar to the VM along with the following files to the same folder
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Run.sh</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Input file to process by hadoop</li>
	</ol>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Issue the following command on terminal to move the input file to Hadoop
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Hadoop fs &ndash;put &lt;the location of your data file&gt; /user/cloudera/input</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Check that the file is there: Hadoop fs &ndash;ls /user/cloudera/input</li>
	</ol>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Make sure your Run.sh file has the write data
	<pre class="csharpcode" style="border: 0px; font-family: consolas, 'Courier New', courier, monospace; font-size: small; font-style: normal; font-weight: normal; margin: 0px 0px 1.625em; outline: 0px; padding: 0.75em 1.625em; vertical-align: baseline; background-color: rgb(255, 255, 255); font-variant: normal; line-height: 1.5; overflow: auto; color: rgb(0, 0, 0); background-position: initial initial; background-repeat: initial initial;">
export 
export HADOOP_OPTS=
echo $HADOOP_OPTS

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#remote debug option enabled</span>
export HADOOP_OPTS=<span class="str" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 96, 128);">&quot;-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005 -Dlocal=true&quot;</span>

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#remote debug option disabled</span>
<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#export HADOOP_OPTS=&quot;-Dlocal=true&quot;</span>

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#your jar file</span>
export JARP=&lt;the hadoop jar name you want to execute&gt;.jar

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#hadoop output</span>
export OUTPUT=/user/cloudera/out/ 

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">#delete the output dir if exists</span>
hadoop dfs -rm -r $OUTPUT 

<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">##########################regular run#############################</span>
hadoop jar $JARP &lt;jar parameters go here, including the output folder we set above&gt;
<span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">##################################################################</span>

</pre>
	</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Execute Hadoop: &ldquo;./run/sh&rdquo;</li>
	<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Now you see in the terminal that the debugger awaits a session so you&rsquo;ll need to connect using the host inteliJ session with your Hadoop jar code
	<ol style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 0px 2.5em; outline: 0px; padding: 0px; vertical-align: baseline; list-style: upper-alpha;">
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Open inteliJ on your host machine&nbsp;</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Open &ldquo;run/debug configurations&rdquo;
		<p style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline;">&nbsp;</p>
		</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Create a new remote configuration</li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;"><a href="http://www.onemenny.com/blog/wp-content/uploads/2014/03/image.png" style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(25, 130, 209); text-decoration: none;"><img alt="image" border="0" height="307" src="http://www.onemenny.com/blog/wp-content/uploads/2014/03/476x307ximage_thumb.png.pagespeed.ic.Ke3Kie9do5.jpg" style="border: 0px; max-width: 97.5%; display: inline;" title="image" width="476" /></a></li>
		<li style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline;">Start the debug session
		<p style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline;">i. Note that you may need to start the session twice if the command before the job execution in the run.sh file fails (you will see this data in the terminal that will state it is waiting for the debugger to attach)</p>
		</li>
	</ol>
	</li>
</ol>
