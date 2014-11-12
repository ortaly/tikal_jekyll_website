---
layout: post
title: Fuse Day– “Jenkins As A service” Chef route – summary
created: 1388938559
author: hagzag
permalink: /devops/fuse-day–jenkins-service-chef-route-summary
tags:
- DevOps
---
<h1>Synopsis</h1>

<p>In order to summarize our Fuse day I would like to take a moment and explain our end goal.</p>

<p>The <strong><em>end goal</em></strong> consist of:</p>

<ul>
	<li>Amazon Instance running multiple tenants of Jenkins</li>
	<li>A CLI / Web interface which will eventually manage this &ldquo;Multi Jenkins&rdquo; instance in a way that one can create a new instance on the fly.</li>
	<li>At the tenant level:
	<ul style="list-style-type:circle;">
		<li>Each tenant will utilize the Jenkins scm sync plugin and in that manor maintain configuration in a git repo for disaster recovery.</li>
		<li>Each tenant will have it&rsquo;s own custom authentication and authorization strategy.</li>
		<li>Each Jenkins tenant will have is own plugin-stack and we already know we might have different tenant types for example Java, Ruby etc, so we would like to have 1 base plugin- stack + a domain specific plugin-stack suitable for each tenant type.</li>
		<li>Each tenant will have it&rsquo;s own listen port, hence we will need a reverse proxy to serve clean urls for each tenant based on his name / dns name.</li>
	</ul>
	</li>
</ul>

<h2>The Plan</h2>

<p>We gathered around the white board [well, it was really a transparent window, but don&rsquo;t be picky] and discussed our options&nbsp;&ndash; we cam up with two options:</p>

<ol>
	<li>Use <a href="https://github.com/opscode-cookbooks/jenkins">Opscode&rsquo;s Jenkins chef cookbook</a> with some customizations in order to support the requirements above.</li>
	<li>Use Docker which will, instantiate isolated Jenkins tenants on one Amazon instance.</li>
</ol>

<p>We had a good feeling we will not be able to do all these tasks in one day, but we have to start somewhere &hellip;</p>

<p>So we split into two groups <strong>One group the Chef Group</strong> &amp; the <strong>Docker group</strong>.</p>

<p>Each group had an initial goal running a Jenkins instance using Chef &amp; Docker and once that is achieved start building the plugin sets.</p>

<p>In the Chef Group<strong> [ Schachar Ben Zeev, Yoram Micaeli, Timor Raiman &amp; yours truly ] we did the following</strong>:</p>

<p>&nbsp;</p>

<h3>Chef</h3>

<p>Use: <a href="https://github.com/tikalk-cookbooks/alm">https://github.com/tikalk-cookbooks/alm</a> a chef-solo repository which manages all the dependency and can be used by us in order to develop it.</p>

<p>&nbsp;</p>

<h3>Vagrant</h3>

<p>Use Vagrant in order to instantiate a local instance on Virtual Box and start iterating on that see <a href="https://github.com/tikalk-cookbooks/alm/blob/master/Vagrantfile">Vagranfile on github</a> &ndash; in this use case&nbsp;<strong style="line-height: 1.6em;"><em>vagrant up ci</em></strong><em style="line-height: 1.6em;"> would do the trick of running 1 instance of jenkins ci-server on our vm.</em></p>

<p><em>So by lunch we had a Vagrant file with a VirtualBox instance running</em></p>

<p>The way we achieved that was by creating a chef role and instructed the Vagrant provisioner to use it:</p>

<p><img src="/sites/default/files/images/image001.png" style="border-width: 0px; border-style: solid; width: 407px; height: 209px;" /></p>

<p>So our cookbook at this stage is empty, no need to do anything for this first instance!</p>

<p>The key in this is our <strong><em>chef.add_role</em></strong>, which sets some parameters used by the Jenkins cookbook:</p>

<p><img src="/sites/default/files/images/image004.png" style="border-width: 0px; border-style: solid; width: 344px; height: 242px;" /></p>

<p>&nbsp;</p>

<p>At this stage it hit us we will need some mechanism of invoking chef on our machine and editing the run-list / node object (our &ldquo;dna.json&rdquo; file in the Vagrant jargon) in order to be able to run more than 1 Jenkins instance, In addition to that we had to start building our plugin-stacks.</p>

<p>Timor came up with an idea, which suggested we would generate a datbag per tenant with the following parameters:</p>

<ol>
	<li>Tenant id =&gt; numerical value</li>
	<li>Company Name =&gt; the name of the customer</li>
	<li>Dns Prefix (e-mail suffix) / fqdn of the tenant</li>
	<li>Expire Date &ndash; considering it&rsquo;s a time based tenant it will be removed / blocked if the Expire data is larger than this date.</li>
	<li>Purge Date &ndash; how long is the tenants grace period</li>
	<li>Jenkins Version &ndash; what version of Jenkins is this tenant going to run</li>
	<li>Sync SCM repo &ndash; the repository we will store the data in</li>
	<li>Plugin stacks &ndash; an Array of plugin sets selected by the customer</li>
	<li>Specific plugins &ndash; a plugin set outside of the stacks</li>
</ol>

<p>We came up with this 1<sup>st</sup> version of databag:</p>

<p><img src="/sites/default/files/images/image006.png" style="border-width: 0px; border-style: solid; width: 434px; height: 156px;" /></p>

<p>And whilst we were using data bags we thought why not hold the plugin-sets in a database too like so:</p>

<p>The base databag:</p>

<p><img src="/sites/default/files/images/image008.png" style="border-width: 0px; border-style: solid; width: 245px; height: 129px;" /></p>

<p>A Stack (Java) specific databag:</p>

<p><img src="/sites/default/files/images/image010.png" style="border-width: 0px; border-style: solid; width: 196px; height: 145px;" /></p>

<p>At this stage we started to understand how we could use the chef paradigm utilizing the node object and define a service, we had to do the following:</p>

<ol>
	<li>Collect the information needed in order to construct the databag per user &ndash; based on the hellorandm example</li>
	<li>Connect to the remote machine and run chef (chef solo / server is still debatable) with that json file</li>
	<li>Analyze the chef-run input in order to determine it&rsquo;s success / failure</li>
	<li>Report back to the cli/ui tool.</li>
</ol>

<p>At this stage we ran out of time, but what we are now taking offline is:</p>

<ol>
	<li>Continue the chef-solo + data bag route where we insatiate new tenants from the Jenkins cookbook &ndash; in the current state of the cookbook it looks like we will need to write our own / expand it to facilitate more than 1 Jenkins tenant on 1 Amazon Instance.</li>
	<li>Writing a rest based service which will run on the amazon instance and listen on a web&nbsp; / cli tool for a json object. Once delivered the service will then invoke chef on the node with the new tenant. Another option I am checking out is using <a href="http://puppetlabs.com/mcollective">Mcollective</a> in order to pass a json to the node and instantiate the run (Mcollective already has a CLI ! &ndash; so perhaps all we need to do is expand it for our needs ?)</li>
</ol>

<p>I stumbled upon &ldquo;<a href="http://www.cryptocracy.com/blog/2011/08/21/using-mcollective-with-chef/">Mcollective with chef</a>&rdquo; blog post which is worth cheking out.</p>

<ol>
	<li value="3">Consider combining Docker / Vagrant to do the heavy lifting: The second route in parallel just concluded and reported their finding on Docker (stay tuned for their blog post and findings) &ndash; Another &ldquo;Timor search&rdquo; yielded <a href="https://github.com/hw-cookbooks/lxc">https://github.com/hw-cookbooks/lxc</a> which is basically doing &ldquo;Docker style&rdquo; management of LXC instances so we could have a complete isolated instance running on LXC hosting mutipule Jenkins tenants in this case we will not need to expand the Jenkins cookbook &hellip;</li>
	<li value="4">Write the CLI to interact with the service running on the instance</li>
	<li value="5">Write the Web</li>
</ol>

<p>To summarize: It was a good experience seeing different point of views and methods on how to accomplish this, we will definitely continue hacking on this in our Bi-Weekly workshops and of course following Fuse Days.</p>

<p>We would most appreciate your comments / suggestions / ideas we might have missed.</p>

<p>In addition, the Chef related work is on github under the <a href="https://github.com/tikalk-cookbooks">tikalk-cookbooks</a> organization with the <a href="https://github.com/tikalk-cookbooks/alm">ALM</a> &ndash; &ldquo;chef repo&rdquo; and others feel free to smooch around.</p>

<p>Happy Hacking.</p>

<p>HP</p>

<p>&nbsp;</p>
