---
layout: post
title: Stress test your Flex application using Jmeter and EC2 - Part 2
created: 1256191825
author: sefi
permalink: /js/stress-test-your-flex-application-using-jmeter-and-ec2-part-2
tags:
- JS
- Stress test
- JMeter
- flex
- elastic cloud
- cloud computing
- AMI
- Amazon EC2
---
<p>In <a href="http://www.tikalk.com/flex/stress-test-your-flex-application-using-jmeter-and-ec2-part-1">part 1</a> we discussed Jmeter configuration.</p>
<p>In this part, we'll go over EC2 configuration</p>
<p>&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">We&rsquo;ll be using Amazon&rsquo;s cloud computing service (aka EC2/S3). </span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">I&rsquo;ll be assuming you already have an account with Amazon. If you don&rsquo;t, create one, and save the cert-XXX.pem and pk-XXX.pem key files.</span></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">What we&rsquo;d like to achieve, is a machine image (AMI) stored on S3 service, which will have Jmeter already installed. That will let us create instances of that image when needed.</span></p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">Setup your local machine</span></b></div>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Download EC2 tools from here: <u><span style="color: navy;"><a href="http://developer.amazonwebservices.com/connect/entry.jspa?externalID=351"><span style="color: blue;">http://developer.amazonwebservices.com/connect/entry.jspa?externalID=351</span></a></span></u>.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Extract ec2-api-tools.zip to some      directory. I&rsquo;ve installed them at /root/.ec2</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Create a &lsquo;keys&rsquo; directory under /root/.ec2</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Install JRE&gt;=1.5</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Export/set the following environment      variables; JAVA_HOME, EC2_HOME, EC2_PRIVATE_KEY, EC2_CERT, PATH. You could      simply add these to your .bashrc file:</span></li>
</ol>
<p class="rteindent1" style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">export JAVA_HOME=/usr<br />
export EC2_HOME=/root/.ec2/ec2-api-tools<br />
export EC2_PRIVATE_KEY=/root/.ec2/keys/pk-XXX.pem<br />
export EC2_CERT=/root/.ec2/keys/cert-XXX.pem<br />
export PATH=$EC2_HOME/bin:$PATH </span></p>
<p class="rteindent1" style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<div><span style="font-size: 12pt;"><strong>Your local machine is ready! Happy happy joy joy!!!</strong><br />
</span></div>
<div><span style="font-size: 12pt;"> Now, you can start using EC2 commands.</span></div>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</div>
<div style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">Creating an AMI</span></b></div>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">The easiest way to create an AMI is to use an existing public one and install what you need over it. </span></p>
<ol type="1" start="1">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Select an AMI<br />
    The first step is to locate an AMI that contains the packages and services      that you require. This can be one of your own AMIs or one of the public AMIs      provided by Amazon&nbsp;EC2. Use <b>ec2-describe-images </b>to get a list      of available AMIs, then select one of the listed AMIs and note its AMI ID,      e.g. ami-4b709422 (Ubuntu 8.10 64bit). </span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Generate a Keypair<br />
    This step is only required if you&rsquo;ve selected one of the public AMIs      provided by Amazon&nbsp;EC2 (which we do). A public/private keypair must      be created to ensure that you, and only you, have access to the instances      that you launch. <b>ec2-create-keypair key1 &ndash; </b>the result will be      something like:</span></li>
</ol>
<p style="margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 10pt;">KEYPAIR key1 1f:51:ae:28:bf:89:e9:d8:1f:25:5d:37:2d:7d:b8:ca:9f:f5:f1:6f </span></p>
<p style="margin: 0cm 0cm 0.0001pt 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 10pt;">-----BEGIN RSA PRIVATE KEY-----</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 10pt;">MIIEoQIBAAKCAQBuLFg5ujHrtm1jnutSuoO8Xe56LlT+HM8v/xkaa39EstM3/aFxTHgElQiJLChp</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 10pt;">HungXQ29VTc8rc1bW0lkdi23OH5eqkMHGhvEwqa0HWASUMll4o3o/IX+0f2UcPoKCOVUR+jx71Sg</span><span style="font-size: 10pt;"><br />
...<br />
</span><span style="font-size: 10pt;">P8TTvW/6bdPi23ExzxZn7KOdrfclYRph1LHMpAONv/x2xALIf91UB+v5ohy1oDoasL0gij1houRe</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 10pt;">2ERKKdwz0ZL9SWq6VTdhr/5G994CK72fy5WhyERbDjUIdHaK3M849JJuf8cSrvSb4g==</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 10pt;">-----END RSA PRIVATE KEY-----</span></p>
<p style="margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">The resulting private key must be saved in a local file for later use. Create a file named key1</span><span style="font-size: 10pt;">-keypair </span><span style="font-size: 12pt;">in /root/.ec2/keys and paste into it all lines starting with the line</span></p>
<p style="margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">&ldquo;</span><span style="font-size: 10pt;">-----BEGIN&nbsp;PRIVATE&nbsp;KEY-----</span><span style="font-size: 12pt;">&ldquo;<br />
and ending with the line </span></p>
<p style="margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">&ldquo;</span><span style="font-size: 10pt;">-----END&nbsp;PRIVATE&nbsp;KEY-----</span><span style="font-size: 12pt;">&ldquo;.<br />
Confirm that the file contents looks exactly as shown below.</span></p>
<p style="margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">&mdash;&ndash;BEGIN RSA PRIVATE KEY&mdash;&ndash;<br />
MIIEoQIBAAKCAQBuLFg5ujHrtm1jnutSuoO8Xe56LlT+HM8v/xkaa39EstM3/aFxTHgElQiJLChp<br />
HungXQ29VTc8rc1bW0lkdi23OH5eqkMHGhvEwqa0HWASUMll4o3o/IX+0f2UcPoKCOVUR+jx71Sg<br />
&hellip;<br />
P8TTvW/6bdPi23ExzxZn7KOdrfclYRph1LHMpAONv/x2xALIf91UB+v5ohy1oDoasL0gij1houRe<br />
2ERKKdwz0ZL9SWq6VTdhr/5G994CK72fy5WhyERbDjUIdHaK3M849JJuf8cSrvSb4g==<br />
&mdash;&ndash;END RSA PRIVATE KEY&mdash;&ndash;</span></p>
<p style="margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Make sure that only the owner can read &amp; write to that file. i.e.<br />
<b><i>chmod 600 /root/.ec2/keys/key1-keypair</i></b> </span></p>
<ol type="1" start="3">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Launch      an instance of the AMI you selected above:<br />
    </span><span style="font-size: 10pt;">ec2-run-instances </span><span style="font-size: 12pt;">ami-4b709422</span><span style="font-size: 10pt;"> -k key1 -n 1-1 -t m1.large</span><span style="font-size: 12pt;"><br />
    </span><span style="font-size: 12pt;">the result      will be something like</span><span style="font-size: 12pt;"><br />
    </span><span style="font-size: 10pt;">INSTANCE </span><b><span style="font-size: 12pt;">i-10a64379</span></b><span style="font-size: 10pt;"> ami-5bae4b32&nbsp;&nbsp; EC2&nbsp;&nbsp;&nbsp;      pending&nbsp;&nbsp; key1</span></li>
</ol>
<p style="margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">The instance ID in the second field of the output is a unique identifier for the instance and can be used subsequently to manipulate your instance, e.g. to terminate it.<b>Important</b>: Once you launch an instance, you will be billed per hour for CPU time. Make sure you terminate any instances which you don't intend to leave running indefinitely.It will take a few minutes for the instance to launch. You can follow its progress by running: <b>ec2-describe-instances </b>i-10a64379</span></p>
<p style="margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 10pt;">RESERVATION&nbsp;&nbsp;&nbsp;&nbsp; r-fea54097&nbsp; 495219933132&nbsp;&nbsp; EC2</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 10pt;">INSTANCE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i-10a64379&nbsp; ami-5bae4b32 </span><b><span style="font-size: 12pt;">domU-12-34-31-00-00-05.usma1.compute.amazonaws.com</span></b><span style="font-size: 10pt;"> EC2 </span><b><span style="font-size: 12pt;">running</span></b><span style="font-size: 10pt;"> key1</span><span style="font-size: 10pt;"><br />
</span><span style="font-size: 12pt;"><br />
When the status field reads &ldquo;running&rdquo;, the instance has been created and has started booting. There may still be a short time before it is accessible over the network, however. The DNS name displayed in the sample output above will be different from that assigned to your instance. Make sure you use the appropriate one.</span></p>
<ol type="1" start="4">
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Authorize      network access In order to be able to reach the running instance from the      Internet, you need to enable access for the ssh service which runs on port      22:<br />
    <b>ec2-authorize default -p 22</b></span><b><span style="font-size: 10pt;"><br />
    </span></b><span style="font-size: 10pt;">PERMISSION      default ALLOWS tcp 22 22 FROM CIDR 0.0.0.0/0</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Connect to the instance</span><span style="font-size: 12pt;"><br />
    <b>ssh -i /root/.ec2/keys/key1-keypair      root@domU-12-34-31-00-00-05.usma1.compute.amazonaws.com</b></span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Now      you have complete control over the instance, and you better <b>change the      root password </b>to something else.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Upload      your Amazon Web Services (AWS) private key (PK) &amp; certificate (CERT)      files to that instance.<br />
    You can use <b><i>scp </i></b>to do this.<br />
    <b><i>scp -i /home/azeez/.ec2/keys/key1-keypair pk-XXX.pem cert-xxx.pem<br />
    </i></b><i>root@domU-12-34-31-00-00-05.usma1.compute.amazonaws.com<b>:/tmp</b></i>The      new AMI will be encrypted and signed to ensure that it can only be      accessed by you and Amazon EC2. You therefore need to upload your Amazon EC2      private key and X.509 certificate to the running instance, for use in the AMI      bundling process.<br />
    <b><i><br />
    Note: </i></b>It is important that the key and cert files are uploaded      into /tmp to prevent them being bundled with the new AMI.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Install      Java<br />
    <b><i>sudo vim /etc/apt/sources.list<br />
    </i></b><br />
    Ensure that the following two sources are added to the configuration file:<br />
    <i>deb <u><span style="color: navy;">http://za.archive.ubuntu.com/ubuntu/</span></u></i><i>intrepid main restricted<br />
    deb <u><span style="color: navy;">http://za.archive.ubuntu.com/ubuntu/</span></u></i><i>intrepid multiverse<br />
    </i><br />
    After the configuration file is updated, the package repository needs to      updated with the following command:<br />
    <b><i>sudo apt-get update<br />
    </i></b><br />
    To install Java version 6, the following command needs to be executed:<br />
    <b><i>sudo apt-get install sun-java6-jre</i></b></span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Install      Jmeter<br />
    Download and install Jmeter, and scp the scenarios you&rsquo;d like to run.</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Bundle      the AMI</span></li>
</ol>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><b><span style="font-size: 12pt;">OR<br />
USE THE AWS CONSOLE at</span></b><b><span style="font-size: 10pt;"><br />
</span></b><u><span style="font-size: 12pt;"><a href="http://www.amazon.com/gp/r.html?R=Y10O5SUKRM9Q&amp;C=1C0W35EPQ00G6&amp;H=f3hXV2PYE66jP4fJJ1Xygh2iJysA&amp;T=C&amp;U=https%3A%2F%2Fconsole.aws.amazon.com"><b><span style="color: blue;">https://console.aws.amazon.com</span></b></a></span></u></p>
<p>&nbsp;</p>
