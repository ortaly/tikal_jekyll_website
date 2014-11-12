---
layout: post
title: 'Jenkins, Jclouds & EC2 KickStart walk-through '
created: 1344814035
author: hagzag
permalink: /jenkins-jclouds-ec2-kickstart-walk-through
tags:
- DevOps
- jenkins-jcolouds-plugin
- jclouds
- AWS
- Amazon EC2
- jenkins
---
<p>As part of an experiment of utlizing EC2 instances during build, I wanted to share with you how easy it was to get Jenkins and EC2 to work togehter without needing to create custom AMI's [which is usually the most daughnting task], you might ask yourself why not use the <a href="https://wiki.jenkins-ci.org/display/JENKINS/Amazon+EC2+Plugin">Jenkins EC2 plugin</a>&nbsp;the short answer is it does much more than the EC2 plugin the long answer - continue reading&nbsp;<img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" alt="" /></p>
<p>The breeze of configuring a Jenkins slave, thanks to the great guys @ jclouds [ <a href="https://wiki.jenkins-ci.org/display/JENKINS/JClouds+Plugin">see jclouds plugin page on Jenkins-ci</a> ], what was missing <img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/thumbs_down.gif" alt="" />&nbsp;was some documentation on how to actually configure the diffrent options of the plugin and how to make your job play nicely on the newley created instance.</p>
<p>So I hope the following recipie will shed some light on how to go about and configuring your build to run on EC2 via Jenkins &amp; Jclouds.</p>
<p>&nbsp;</p>
<p><u><strong>What you need</strong></u>:</p>
<ol>
    <li>Jenkins [quite obvious - tested with 1.477 (latest at time of composing this post)]</li>
    <li>Jenkins Jclouds plugin [ tested with&nbsp;version 2.2.2 ]</li>
    <li>Access to an EC2 account - I used the FreeTier for this tutorial [? <a href="http://aws.amazon.com/free/">what is Amazon free tier</a> ?]</li>
</ol>
<p>I presume you have Jenkins installed !</p>
<p>Adding the plugin is easy as going to http://yourjeknins/pluginManager/available and search for the Jclouds plugin [ <a href="https://wiki.jenkins-ci.org/display/JENKINS/UI+Enhancements#UIEnhancements-UpdateManager%28INPROGRESS%29">if you are using 1.475 and up you have a search box</a> ], install and reload jenkins [ <a href="http://blog.cloudbees.com/2011/12/installing-plugins-to-jenkins-without.html">again you might not need to in versions grater than 1.4x</a> ].</p>
<p>&nbsp;</p>
<p><strong>Three steps in this walk through</strong></p>
<ol>
    <li>Add a cloud &amp; Configuring plugins</li>
    <li>Adding templetes [ or not ... ]</li>
    <li>Configuring a job to use jclouds</li>
</ol>
<p><u><strong>Step 1: Add a cloud</strong></u></p>
<p>Once the plugin is installed go to Jenkins &gt; Manage Jenkins (http://yourjenkins/configure) and &quot;Add a new cloud&quot;</p>
<p><img src="/files/upload/29/Add_A_Cloud.png" alt="Add a cloud" width="151" height="64" vspace="5" hspace="5" border="0" align="left" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Screen shot #1</strong> :: Adding a cloud <br />
Please note if you already have other &quot;cloud provider plugins&quot; you will have more than &quot;Cloud (JClouds)&quot; option.</p>
<p>&nbsp;</p>
<p><strong>Configuring the plugin</strong>:</p>
<p>See the screenshot below (i'll <span style="font-size: 13.63636302947998px; ">elaborate</span> on it stright after it)</p>
<p><img src="/files/upload/29/Jenkins_conf_jclouds_full2.png" alt="jcloud_jenkis_conf" width="550" height="629" vspace="5" hspace="5" border="0" align="left" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Screen shot #2</strong> :: Plugin basic configuration</p>
<ul>
    <li><strong>Profile:</strong> call it whatever you like this is how you will choose instances when tieing jobs to this cloud [will show exmple later on in thie post]</li>
    <li><strong>Provider Name</strong><strong>:</strong> aws-ec2, please note there is a very long list of providers which I will be testing but it'q quite impressive [<a href="http://www.jclouds.org/documentation/reference/supported-providers/">? see full list here ?</a>&nbsp;another reason to use this plugin over the EC2 plugin :)]</li>
    <li><strong>End Point URL:</strong> N/A for ec2 [ I used the same plugin for OpenStack which requires the api url to <span style="font-size: small; ">connect</span> to ]</li>
    <li><strong>Max. No. of Instances: </strong><u>this is a tricky one</u>&nbsp;how many instances of this cloud may you have meaning can you have 10 jobs using the same cloud - limit this to the number of instances you want utlized of this cloud provider [ you can also limit it per credential !]</li>
    <li><strong>Retention Time:&nbsp;</strong><span style="color: rgb(0, 0, 0); font-family: Helvetica, Arial, sans-serif; font-size: 13.600000381469727px; line-height: 17.333332061767578px; ">How long, in minutes, to wait for a slave to remain idle before disconnecting and terminating it [pretty striaght forward].</span></li>
    <li><strong>Identity:&nbsp;</strong>get it from: https://portal.aws.amazon.com/gp/aws/securityCredentials whilst loged in</li>
    <li><strong>Credential:</strong> also can be found @:&nbsp;https://portal.aws.amazon.com/gp/aws/securityCredentials</li>
</ul>
<p>&nbsp;</p>
<p><strong>RSA private Key and Public key: </strong>the plugin can generate one for you&nbsp;<img src="/files/upload/29/Generate_key.png" alt="Generate key Pair" width="147" height="38" border="0" />&nbsp;after creation you will be able to see it your account [ considering your account credentials are correct ]:</p>
<p><img src="/files/upload/29/KeyParis.png" alt="key pairs" width="603" height="134" vspace="5" hspace="5" border="0" align="left" /></p>
<p>&nbsp;</p>
<p><strong>Screen shot #4 </strong>:: EC2 keypairs</p>
<p>&nbsp;</p>
<p><u><strong>Step 2 : Adding Templates [ Or not ]:</strong></u></p>
<p>Just under the plugin configuration you will find a button</p>
<p>&nbsp;<img src="/files/upload/29/Cloud_Instance_tmpl.png" alt="Cloud_Instance_tmpl" width="373" height="54" vspace="0" hspace="0" border="0" /></p>
<p><strong>Screen shot #5 </strong>:: Cloud instance template</p>
<p>You have two options here:</p>
<ol>
    <li>Use an actual ready made AMI [?&nbsp;<a href="https://aws.amazon.com/amis/">Amazon Machine Images</a>&nbsp;?]</li>
    <li>Let Jclouds locate AMI's according to a regexp&nbsp;</li>
</ol>
<p><img src="/files/upload/29/select_image_id.png" alt="Specify image ID" width="346" height="82" /></p>
<p><strong>Screen shot #6 </strong>:: specify existing AMI [ and regsion e.g:   &quot;us-east-01/ami-xxxx&quot; ]</p>
<p>and</p>
<p><img src="/files/upload/29/Specify_OsnVer.png" alt="specify OS" width="308" height="87" /></p>
<p><strong>Screen shot #7</strong> :: specify AMI regexp</p>
<p>I prefere the second [ at lease that is what I needed in order to test this plugin with EC2 ... ]</p>
<p>The specify image field requires you to have the certain image in your EC2 region and thus whilst specifying an AMI you will need to tell the plugin the regions/aminame for example i used: &quot;us-east-1a/ami-079e5d6e&quot; [ in order to locate and AMI you can go to:&nbsp;<a href="https://console.aws.amazon.com/ec2/home?region=us-east-1&amp;#s=Images">https://console.aws.amazon.com/ec2/home?region=us-east-1&amp;#s=Images</a>&nbsp;and search by keyword ].</p>
<p>&nbsp;</p>
<p>to summarize the &quot;adding templates section&quot; it could look as simplae as this:</p>
<p><img src="/files/upload/29/Cloud_inst_tmpl.png" alt="Cloud instance template full" width="540" height="511" /></p>
<p><strong>Screen shot #8</strong> :: Cloud instance template configuration</p>
<p>The name and label are quite confusing here [ if you have one I wouldn't worry about this ! ].</p>
<p><strong>Name: </strong>ec2tmpl1 if you recall the section above with keypairs you could see the reference of the plugin to <strong>ec2tmpl1 </strong>in the keypair name.</p>
<p><strong>label: </strong>Jenkins works with labels so the node will recive this label and the Name mentioned above will be what Jenkins calls &quot;Labels&quot; see:</p>
<p>&nbsp;</p>
<p><img src="/files/upload/29/manage_nodes.png" alt="Manage Nodes" width="503" height="255" vspace="5" hspace="5" border="0" /><br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
&nbsp;</p>
<p><strong>Screen shot #9 </strong>:: Jenkins - manage nodes screen</p>
<p>The reason this is so confusing is that the Name was given to a &quot;node&quot; which represents a cloud whilst the label is provided to an instance which was started in the cloud.&nbsp;</p>
<ul>
    <li><strong>Hardware ID:</strong> see I chose <strong>t1.micro</strong> if you want your experiment to be free you can use only the micro instances [?<a href="http://aws.amazon.com/free/"> see the free tier link on EC2</a> ?]</li>
</ul>
<p>There are a few more advanced usages which I will probably utlize in a later time for exmaple the init script [ firing up Chef for example ] the coolest thing about this plugin is that it ties it to Jenkins, installs JAVA straight from Oracle etc etc ... so in a matter of seconds you have an instance in the cloud.</p>
<p>&nbsp;</p>
<p><u><strong>Step 3: Configure your job to use Jclouds</strong></u></p>
<p>This one is the easiest, in job configuration page you now (after installing the plugin) have an option:</p>
<p><img src="/files/upload/29/Job4Jclouds.png" alt="Job on Jclouds" width="555" height="146" vspace="5" hspace="5" border="0" align="left" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Screen shot #10</strong> :: Job configuration page &quot;tie to node&quot;</p>
<p>Executing this build will fireup an instance, execute the build and stop [ if you look at screeshot #9 you see I<u><strong> used stop on terminate - uncheck this if you wish to terminate the instance instead of just stopping it</strong></u> ] the instance:</p>
<p><img src="/files/upload/29/Consolelog_0.png" alt="Console" width="527" height="202" vspace="5" hspace="5" border="0" /></p>
<p><strong>Screen shot #11</strong> :: Job Console&nbsp;</p>
<p>&nbsp;</p>
<p>In your EC2 dashboard you now can see:</p>
<p><img src="/files/upload/29/EC2_Status.png" alt="Ec2 Status" width="683" height="56" vspace="5" hspace="5" border="0" /></p>
<p><strong>&nbsp;Screen shot #12</strong> :: Instance status on EC2</p>
<p>&nbsp;</p>
<p>Hope this was informative and easy to use.</p>
<p>Here are some resources you can reference on certain topics discussed in this post:</p>
<ol>
    <li><a href="http://aws.amazon.com/free/">what is Amazon free tier</a></li>
    <li><a href="https://wiki.jenkins-ci.org/display/JENKINS/JClouds+Plugin">Jenkins Jclouds plugin wiki on jenkins-ci</a></li>
    <li>Jclouds &quot;providers list&quot;  <a href="http://www.jclouds.org/documentation/reference/supported-providers/"> full list</a></li>
    <li><a href="https://aws.amazon.com/amis/">Amazon Machine Images</a></li>
    <li>Jenkins latest enhancements [<a href="https://wiki.jenkins-ci.org/display/JENKINS/UI+Enhancements#UIEnhancements-UpdateManager%28INPROGRESS%29">ui</a> &amp; <a href="http://blog.cloudbees.com/2011/12/installing-plugins-to-jenkins-without.html">plugin management</a> ]</li>
</ol>
<p>I will be updating this with more advanced usages as time premits and as needs mature.</p>
<p>Enjoy</p>
<p>Haggai Philip Zagury</p>
