---
layout: post
title: Image CM from the Ground up with packer
created: 1398445094
author: hagzag
permalink: image-cm-from-the-ground-up-with-packer
tags:
- DevOps
- packer
---
<p><span style="line-height: 1.6em;">Recently I have had the opportunity to test drive packer.io on a project I am working on, and although I have heard the word packer here and there until you start using it you do not understand the power behind it. As a side note until now there was usage <a href="https://github.com/puppetlabs/Razor">Razor</a>&nbsp;which by the look of it the place where&nbsp;<a href="http://packer.io">packer</a>&nbsp;was inspired from + a better version of <a href="https://github.com/jedi4ever/veewee">veewee</a></span></p>

<p><strong>What is packer ?</strong></p>

<p>From packer.io site -&gt; Packer&nbsp;is a tool for creating identical machine images for multiple platforms from a single source configuration.</p>

<p>In My words -&gt; <a href="http://www.packer.io/">Packer</a>, is a complementery tool for DevOps needy of a consistent Infrustructure As Code, taking an image from Dev in to Production - using the same image in Dev with <a href="http://www.vagrantup.com/">Vagrant</a> (as an exmaple) then pushing it to PROD (AWS for exmaple).</p>

<p>BTW it&#39;s important to note that packer was developed by <span class="vcard-fullname" itemprop="name"><strong>Mitchell Hashimoto</strong> the author of Vagrant, <a href="https://vagrantcloud.com/"><em>Vagrant cloud</em></a> for exmaple really needed a tool like packer in order to provide a way to develop and publish boxes in a consitent manor - I recommend taking&nbsp; a look at <a href="https://vagrantcloud.com/">Vagrant Cloud </a></span></p>

<p><strong>Why is this important ?</strong></p>

<p>Nowadays building a product doesn&#39;t end with developing a piece of software you in many cases deliver a virtual machine and more and more we find places where we deliver moire than 1 machine, but how do we makw sure this machine can run on multiple cloud provides - for example AWS &amp; OSTK and many more whilst during development you want to use local hypervisors like VirtualBox, VMware fusion or maybe a local vSphere instance - how do you make sure all these provisioners will use the same image -&gt; <strong>Packer</strong> !</p>

<p>Thats not all <strong>packer&nbsp;</strong>also has an integration with Configuration Management Frameworks like Chef / Puppet / Ansible etc which will do the OS customization for you.</p>

<p><strong>How does packer do it (work)</strong></p>

<p>There is a great approach here in order to create a image which starts from an OS iso and concludes with an <strong>Artifact(s)&nbsp;</strong>which you can take to the cloud ( private / public ) you need a few things:</p>

<ol>
	<li>Template(s) - a json file which&nbsp;declares:</li>
	<li>Builders - What type of machines to build AWS, Virtualbox, VMware etc&nbsp;</li>
	<li>Provisioners - could be shell, chef, puupet, ansible etc&nbsp;</li>
	<li>Post-Processors - a great exmaple is uploading an artifact to a repository</li>
</ol>

<p><strong>Packer by exmaple:</strong> build for centos 6.4 on virtualbox</p>

<p><u>Builder(s)</u></p>
<script src="https://gist.github.com/hagzag/332d9f25c741e1bb7ea4.js"></script>

<p>&nbsp;</p>

<p>What you can see from the builder declaration is that packer will simulate a pxe boot server locally (over http) and will run a kickstart installation (this is the same way veewee and razor operates), of course there is a source url for the iso and other important stuff you can see ...</p>

<p>The next section is provisioners which as mentioned be a number of things but in this example I am using shell scripts:</p>

<p><u>Provisioner(s)</u></p>

<p>&nbsp;</p>
<script src="https://gist.github.com/hagzag/e226635d5b7a5a2a117a.js"></script>

<p>I guess the&nbsp;<em><strong>install-vbox-guest-additions</strong></em>&nbsp;is understandable but the&nbsp;<strong>​</strong><strong><em>clean-empty-space</em></strong> script is used to save space on the instance just before packaging it (example taken from -&gt; <a href="https://github.com/gwagner/packer-centos/blob/master/provisioners/clean-empty-space.sh">here</a>).</p>

<p>An exmaple of chef <u>provisioner</u>:</p>
<script src="https://gist.github.com/hagzag/6159dc1eb3b3c264b2fc.js"></script>

<p>Finally once we have an image we want to pack it (and maybe upload it somewhere), this where post-processing operation come in handy:</p>
<script src="https://gist.github.com/hagzag/a36100f420c84d8b1287.js"></script>

<p>So in this case the post-processor packages the artifact and creates a Vagrant friendly box tar-ball.</p>

<p><u>Post-processor(s)</u> - vagrant exmaple</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>A similar exmaple for an aws box would be somthing like this:</p>
<script src="https://gist.github.com/hagzag/36894aad747ab1db0fa3.js"></script>

<p>&nbsp;</p>

<p>You use your AWS_SECRES_KEY &amp; AWS_ACCESS_KEY + use a base ami (ami-21055220) then create a custom image on AWS.</p>

<p>This post just scratches the surface, I hope to write some more about it as I amture with it -&gt; one of my next tasks is creating a windows image (I wonder how that one pulls through ...).</p>

<p>Hope you enjoyed it.</p>

<p>HP</p>
