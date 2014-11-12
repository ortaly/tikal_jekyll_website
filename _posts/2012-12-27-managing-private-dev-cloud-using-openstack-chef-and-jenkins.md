---
layout: post
title: Managing private (dev) cloud using OpenStack, Chef & Jenkins
created: 1356616848
author: hagzag
permalink: /devops/managing-private-dev-cloud-using-openstack-chef-jenkins
tags:
- DevOps
- vm-builder
- opsenstack
- opscode chef
- kvm
- jclouds
- Chef
- jenkins
- cloud
---
<p class="c4"><strong><span class="c1">Background:</span></strong></p>
<p class="c4"><span>As part of Tikal Fuse day #6 we planned to establish a management framework for a private cloud which will be used by the build management / Dev team(s).</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span>The &ldquo;building blocks&rdquo; of this solution consists of:</span></p>
<ol class="c8" start="1">
	<li class="c10 c4 c3">
		<span>OpenStack for the private cloud infrastructure</span></li>
	<li class="c4 c3 c10">
		<span>Chef for build / dev node orchestration / configuration management</span></li>
	<li class="c10 c4 c3">
		<span>Jenkins for build orchestration of both Chef &amp; OSTK infrastructures</span></li>
	<li class="c10 c4 c3">
		<span>Git for Source control [Jenkins &amp; Chef recipies]</span></li>
	<li class="c10 c4 c3">
		<span>VMbuilder for base image creation</span></li>
</ol>
<p class="c4">&nbsp;</p>
<p class="c4"><u><strong><span class="c1">Starting point</span></strong></u></p>
<p class="c4"><span class="c1">Hardware &amp; Configuration</span></p>
<ol>
	<li>
		<span>Single node with Ostk CC &amp; NC components [ dual quad core, 16GB RAM &amp; 2TB storage ]</span></li>
	<li>
		<span>One laptop: running Jenkins master instance &amp; Chef server</span></li>
	<li>
		<span>Developer machine(s) running chef workstation [ powered by knife ]</span></li>
</ol>
<p class="c0 rteindent1">&nbsp;</p>
<p class="c4 c3"><strong><span class="c1">Goals:</span></strong></p>
<ol class="c8" start="1">
	<li class="c11 c10 c4">
		<p><span>Prepare an image for OSTK [ based on ubuntu 12.10 ]</span></p>
	</li>
	<li class="c11 c10 c4">
		<p><span>Setup Jenkins and the required plugins [ Jclouds in particular ]</span></p>
	</li>
	<li class="c11 c10 c4">
		<p><span>Instantiate an instance via Jenkins via Jclouds plugin</span></p>
	</li>
	<li class="c11 c10 c4">
		<p><span>Bootstrap the node with Chef via a Local Chef server, prior to jenkins node instantiation</span></p>
	</li>
</ol>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span class="c1">We divided into three main teams focusing on expertise &amp; qualification for each task,&nbsp;</span><strong><span class="c1">The Team(s):</span></strong></p>
<p class="c4 c3"><u><span class="c1">OSTK &amp; VMbuilder</span></u><span class="c1">:</span></p>
<ol class="c7" start="1">
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/oritzoran">Ori Tzoran</a></span></li>
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/gil">Gil Sinier</a></span></li>
</ol>
<p class="c4 c3"><u><span class="c1">Jenkins</span></u><span class="c1">:</span></p>
<ol class="c7" start="1">
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/liya">Liya Katz</a></span></li>
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/itai">Itai Or</a></span></li>
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/yorammi">Yoram Michaeli</a></span></li>
</ol>
<p class="c4 c3"><u><span class="c1">Chef</span></u><span class="c1">:</span></p>
<ol class="c7" start="1">
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/miron">Miron Gofer</a></span></li>
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/keren">Keren Finkelstein</a></span></li>
	<li class="c11 c10 c4">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/timorraiman">Timor Raiman</a></span></li>
	<li class="c10 c4 c11">
		<span class="c6 c1"><a class="c9" href="http://www.tikalk.com/users/hagzag">Your&rsquo;s truly</a></span></li>
</ol>
<p class="c4"><span class="c1">Each team had half a day to get his act together so we can integrate after lunch</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><strong><span class="c1">OpenStack </span><span>was installed locally </span></strong><span>- you can reference: </span><span class="c13"><a class="c9" href="http://www.tikalk.com/alm/blog/expreimenting-openstack-essex-ubuntu-1204-lts-under-virtualbox">Experimenting with OpenStack Essex on Ubuntu 12.04 LTS under VirtualBox</a></span><span>&nbsp;post for more details on establishing an OpenStack instance on your local laptops, Ori will soon be release a bare metal to cloud script which will cover bare metal installation of Openstack, which is based on this </span><span class="c6"><a class="c9" href="http://www.tikalk.com/alm/blog/expreimenting-openstack-essex-ubuntu-1204-lts-under-virtualbox">post</a></span><span>.</span></p>
<p class="c4"><span>You can also download an ova with a script which does all this magic described in the post </span><span class="c6"><a class="c9" href="https://www.dropbox.com/sh/hmcsrlbutokn1te/msWUEz7PFq">here</a></span><span>.</span></p>
<p class="c4"><span>At this stage we just validated we can create [&ldquo;without freinds&rdquo;] instances, snapshots, reboot view console etc etc vm related tasks.</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span class="c6 c1"><a class="c9" href="https://launchpad.net/vmbuilder">VMbuilder</a></span><span class="c1">&nbsp;</span><span>A separate post is being prepared by Gil on how to go about and create an image for OpenStack with vmbuilder for windows &amp; linux </span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span>The basics for this day were:</span></p>
<ol class="c8" start="1">
	<li class="c10 c4 c3">
		<span>Install ubutnu-vm-builder (vm-builder requires kvm/qemu):</span></li>
	<li class="c10 c4 c3">
		<span>Once installed use the following command:</span></li>
</ol>
<pre class="brush: java;" title="code">
vmbuilder kvm ubuntu --suite precise --flavour virtual --arch amd64 -o --libvirt \
qemu:///system --user tikal --name tikal --pass tikal --addpkg \
openssh-server --addpkg aptitude --addpkg vim --addpkg git</pre>
<p class="c4">&nbsp;</p>
<p class="c2"><span>where: </span></p>
<p class="c2 c3"><span>ubuntu = hostname</span></p>
<p class="c2 c3"><span>precise = distribution code name</span></p>
<p class="c2 c3"><span>arch = 32/64 bit</span></p>
<p class="c2 c3"><span>user &amp; pass [sudoer]: tikal/tikal</span></p>
<p class="c11 c4"><span>addpkg = &nbsp;we found the need in aptitude in order to run chef bootstrap thus we added that package to the image</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span class="c6 c1"><a class="c9" href="http://jenkins-ci.org">Jenkins</a></span><span class="c6"><a class="c9" href="http://jenkins-ci.org">&nbsp;</a></span><span>installation is straightforward see </span><span class="c6"><a class="c9" href="http://jenkins-ci.org">http://jenkins-ci.org</a></span><span>&nbsp;for you favorate distro - we chose ubuntu, Jclouds SCM configuration plungin and others were installed via the jenkins pluginManager.</span></p>
<p class="c4 c3"><span>The taks in Jenkins was to be able to connect to out private cloud via the </span><span class="c6"><a class="c9" href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=7&amp;cad=rja&amp;ved=0CG8QFjAG&amp;url=https%3A%2F%2Fwiki.jenkins-ci.org%2Fdisplay%2FJENKINS%2FJClouds%2BPlugin&amp;ei=5T_cULSkOOiv0AGJlIFg&amp;usg=AFQjCNGCdVCvNGFOBuhDNNP6xj4iVe5tjA&amp;sig2=LMueiZJZMCgxDNma0Ba92A&amp;bvm=bv.1355534169,d.dmQ">jenkins-jclouds plugin</a></span><span>&nbsp;similar to a POC I ran against EC2 (</span><span class="c6"><a class="c9" href="http://www.tikalk.com/alm/jenkins-jclouds-ec2-kickstart-walk-through">see post here</a></span><span>).</span></p>
<p class="c4 c3"><span>What took most of the time is similar to my challenge with EC2 was to determine the credentials token needed by the plugin + configuring the user and init script in order to &ldquo;get the node rolling&rdquo; (which is still a work in progress).</span></p>
<p class="c4 c3"><img alt="" height="249" src="/files/upload/29/2.png" width="470" /></p>
<p class="c4 c3"><span>&nbsp; This screenshot emphasizes the jenkins manage added to jenkis upon installation of the &nbsp; </span></p>
<p class="c4 c3"><span>&nbsp; jclouds plugins.</span></p>
<p class="c4 c3"><span>&nbsp; The biggest trick was adding the </span><strong><span style="color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 13px; line-height: normal;">admin:</span></strong> in the Identity [which may differ if you install you &nbsp;</p>
<p class="c4 c3"><span>&nbsp; own instance &hellip;]</span></p>
<p class="c4 c3"><span>&nbsp; We didn&rsquo;t find this until the &ldquo;</span><span class="c1">Jenkins team&rdquo; </span><span>got the jeclouds plugin source code and &nbsp; </span></p>
<p class="c4 c3"><span>&nbsp; starting to debug the code (so we had a set back on this).</span></p>
<pre class="brush: java;" title="code">
String identity = &quot;demo:demo&quot;; // tenantName:userName</pre>
<p class="c4 c3">See example:&nbsp;http://www.jclouds.org/documentation/quickstart/openstack/</p>
<p class="c0">&nbsp;</p>
<p class="c4 c3"><span>The second part of the jclouds configuration will determin the image [which we uploaded from the vm-builder image]:</span></p>
<p class="c0">&nbsp;</p>
<p class="c4 c3"><img alt="" height="367" src="/files/upload/29/6.png" width="470" /></p>
<p class="c4 c3"><span>These parameters will define the name of the slave in jenkins and the &ldquo;specify Image ID&rdquo; is the unique identifier in the image, you can get it from the horizon url on your openstack cloud controller instance (or using the ec2 command line utility).</span></p>
<p class="c0">&nbsp;</p>
<p class="c4 c3"><span>Upon completion of this part we are ready to integrate it with Chef and instantiate a build on that instance.</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span class="c6"><a class="c9" href="http://www.opscode.com/chef/">Chef</a></span><span>&nbsp;installation was done in two stages</span></p>
<ol class="c8" start="1">
	<li class="c10 c4 c3">
		<span>install chef server based on Ubuntu 12.04 [ After finding a bug with 12.10 in ruby / ohai packages which caused us to rollback to 12.04 ] installation was based on apt-get and will be covered in full in a separate post [ link will be listed here ] - this was inspired by -&nbsp;</span><span class="c6"><a class="c9" href="http://wiki.opscode.com/display/chef/Installing+Chef+Server+on+Debian+or+Ubuntu+using+Packages">Opscode-Wiki</a></span><span>, but as I said we found some issues with 12.10 which I will talk about in separate post.</span></li>
</ol>
<ol class="c8" start="2">
	<li class="c10 c4 c3">
		<span>Configured a laptop as a Chef Workstation</span></li>
	<li class="c10 c4 c3">
		<span>Cloned the chef-repo &ldquo;template repository&rdquo;</span></li>
</ol>
<p class="c4"><span>&nbsp; &nbsp; &nbsp; &nbsp;</span></p>
<pre class="brush: java;" title="code">
git clone git://github.com/opscode/chef-repo.git</pre>
<p class="c4 c3"><span>This command creates a &ldquo;template&rdquo; repository including the chef recommended structure of storing, roles, attributes, environments etc to be used with recipes/</span></p>
<ol class="c8" start="4">
	<li class="c10 c4 c3">
		<span>Install chef client in order to test the following recipes:</span></li>
</ol>
<p class="c4"><span>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
<pre class="brush: java;" title="code">
knife cookbook site install users
knife cookbook site install sudo
knife cookbook site install java</pre>
<p class="c4 c3"><span>running the above commands will download the recipe from the corresponding GitHub repository into your chef-repo/cookbooks directory - I would recommend using this repository [what we didn&rsquo;t do enough during this day &hellip;, so I will be doing it again and will update the post accordingly].</span></p>
<p class="c4"><span>&nbsp; &nbsp; &nbsp; &nbsp;</span></p>
<ol class="c8" start="5">
	<li class="c10 c4 c3">
		<span>For sake of testing the recipes, roles and databags we created we executed chef bootstrap on the host created by Gil (with VMBuilder)</span></li>
</ol>
<p class="c5 c4">&nbsp;</p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span>This post will be continued and will define the entire flow and configuration steps taken to achive the goals I defined at the top of this article.</span></p>
<p class="c5 c4">&nbsp;</p>
<p class="c4"><span>On behalf of the ALM team and myself,</span></p>
<p class="c4"><span>Thanks</span></p>
