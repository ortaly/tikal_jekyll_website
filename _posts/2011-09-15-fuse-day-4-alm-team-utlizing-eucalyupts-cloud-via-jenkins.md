---
layout: post
title: Fuse Day 4 - DevOps Team utlizing eucalyupts cloud via Jenkins
created: 1316091918
author: hagzag
permalink: /fuse-day-4-alm-team-utlizing-eucalyupts-cloud-jenkins
tags:
- DevOps
- jenkins
- Hudson
- Eucalyptus
- cloud
---
<p><img vspace="5" hspace="5" border="0" align="left" style="width: 153px; height: 34px;" alt="Eucalyptus" src="/files/upload/29/EucalyptusLogoText-300px_270x60.png" />One of our goals in this Fuse day was utlizing a private cloud and usin it as part of our Build =&gt; Deploy =&gt; Test <img width="100" vspace="5" hspace="5" height="138" border="0" align="right" src="/files/upload/29/jenkins.png" alt="" />scheme.</p>
<p>As a prequisete we have a local setup of Eucalyptus which its setup can be described in a seperate post, In this post we will focus on Jenkins, Jenkins Cloud plugins and Eucalyptus integration, and finally how we tie jobs to instances running on our Eucalyptus cloud.</p>
<p>&nbsp;</p>
<p>Setup consists of Jenkis-ci server, Eucalyptus cloud which includes 1 host for CC (Cloud Controller), Walrus, SC (Storage Controller)&nbsp;and a second machine utlizing our NC (Network controller), a third machine was used in order to create a linux (in our case Ubuntu10.10-64bit) which will be launched by Jenkins build server and execute builds on it.</p>
<p>&nbsp;</p>
<p><strong>Setup 1</strong>:</p>
<p>Go over the above check list and make sure we can mnually start an instance on our Eucalyptus cloud.</p>
<p>&nbsp;</p>
<p><strong>Setup 2</strong>:</p>
<p>Install <a href="https://wiki.jenkins-ci.org/display/JENKINS/Amazon+EC2+Plugin">Amazon EC2 Plugin</a> via manage jenkins &gt;&nbsp;manage plugins, reload jenkins in order to activate the plugin.</p>
<p>&nbsp;</p>
<p><strong>Step 3</strong> - Confiure <a href="https://wiki.jenkins-ci.org/display/JENKINS/Amazon+EC2+Plugin">Amazon EC2 Plugin</a> via manage Jenkins &gt; configure system like so:</p>
<p><img width="639" vspace="5" hspace="5" height="189" border="0" align="left" alt="Jenkins Eucalyptus configure screenshot" src="/files/upload/29/Cloud-Euca-Jenkins.png" />The Access ID and Secret Key can be obtianed from your eucalyptus http://mycloud:8443/#credentials</p>
<p>&nbsp;</p>
<p>The EC2 RSA Pricate Key can be genrated directly from hudson's interface, alternativly you can copy and paste an existing one if needed.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Step 4</strong> - configure a Eucalyptus node (Instance):</p>
<p><img width="639" vspace="5" hspace="5" height="222" border="0" align="left" alt="AMi setup" src="/files/upload/29/AMI-Setup.png" />4.1 Via manage jenkins &gt;&nbsp;manage plugins,</p>
<p>obtain the EMI (AMI is for Amazon Managed Image whilst EMI stand for Eucalyptus Managed Image) via http://mycloud:8443/#images (see <a href="#images">screen-shot below</a>)</p>
<p>&nbsp;</p>
<p>4.2 Set instance type which is the equicalent to the m1.small, c1.medium, m1.large, m1.xlarge, c1.xlarge which is listed in http://mycloud:8443/#conf</p>
<p>4.3 Remote Root FS&nbsp; - the firectory dedicated for Jenkins to use in order to utlize the Jenkins slave instance</p>
<p>4.4 Remote user - for a default eucalyptus image you would use admin</p>
<p>4.5 Label - this is the label you will use in order to tie your job to this node.</p>
<p>&nbsp;</p>
<p><a name="images"><img width="639" vspace="5" hspace="5" height="261" border="0" align="left" alt="euca-Images" src="/files/upload/29/Screenshot_0.png" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Step 5</strong> - Tie hudson Job to the Eucalyptus EMI (Instance):</p>
<p>in the job you wish to tie to the Eucalyptus image just &quot;restrict&quot; it to tha machine like so:</p>
<p><img width="634" vspace="5" hspace="5" height="41" border="0" align="left" src="/files/upload/29/Restrict.png" alt="Restrict job to Euca" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>And there you have it the next build will be excuted on your brand new Eucalyptus instace.</p>
<p>Supprisingly the work around installing Eucalyptus and creating custom images was much longer than expected.</p>
<p>The next step we will be follwing up is creating pre-defined images  linux &amp;&nbsp;windows 32/64 bit with predefined OS versions and types an  creating the equivalent Jeknins configuations combined with the  Jenkins-multi-configuration plugin which is being developed by the rest  of the ALM team members.</p>
