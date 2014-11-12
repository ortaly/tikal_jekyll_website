---
layout: post
title: Writing a Chef Cookbook
created: 1358679639
author: hagzag
permalink: /devops/writing-chef-cookbook
tags:
- DevOps
- recipe
- opscode chef
- cookbook
- Chef
---
<p>Hi,</p>
<p>&nbsp;</p>
<p>In continuation to a Chef Introduction session we had <a href="http://meetup.tikalk.com/events/98888802/">last week on meetup</a>, I thought a blog post was called for in order to emphasize&nbsp;the process of writing a recipie. And/Or working with chef in general as a buy product of that.</p>
<p>I will be using the basic &quot;ntp&quot; example Opscode uses on their wiki, but in order to understand the components of a recipe I will streach it a bit further in order to show the true power of Attributes and Templates.</p>
<p>&nbsp;</p>
<p>At the end of this post [or now if you really insist] you can clone&nbsp;<a href="https://github.com/tikalk/chef-intro-repo">https://github.com/tikalk/chef-intro-repo</a> and see the ntp recipe alogside other stuff which was presented in the meetup.</p>
<p>&nbsp;</p>
<p><strong>Prequisets:</strong></p>
<ol>
    <li>A Chef server [see:&nbsp;<a href="http://www.tikalk.com/alm/blog/installing-chef-server">http://www.tikalk.com/alm/blog/installing-chef-server</a>&nbsp;if you want and set one up ...]</li>
    <li>Configured Knife workstation</li>
</ol>
<p>&nbsp;</p>
<p><strong>Step 1: Install the service you want to recipe ...&nbsp;</strong></p>
<pre title="code" class="brush: ruby;">
yum install ntp
rpm -ql ntp</pre>
<p>&nbsp;</p>
<p>Identify:</p>
<ul>
    <li><strong>package name</strong> you wish to install</li>
    <li>Files which are <strong>template</strong> candidates [which chef will need to populate with your data]</li>
</ul>
<p>&nbsp;</p>
<p>I found the following:</p>
<ul>
    <li>service name &quot;ntpd&quot; [ init file name:&nbsp;<span style="font-size: 12px; line-height: 19px;">/etc/rc.d/init.d/ntpd&nbsp;</span>]</li>
    <li>configuration file our tempalte candidate &quot;/etc/ntp.conf&quot; [ also found via rpm -ql ]</li>
</ul>
<p>&nbsp;</p>
<p><strong>Step 2:&nbsp;Setup a git repository [clone opscode's &quot;template&quot; repository]</strong></p>
<pre title="code" class="brush: ruby;">
git clone git://github.com/opscode/chef-repo.git</pre>
<p>&nbsp;&nbsp;</p>
<p><strong>Step 3: Create a cookbook &nbsp;[named ntp]</strong></p>
<pre title="code" class="brush: ruby;">
cd ~/chef-repo
knife cookbook create ntp
</pre>
<p>&nbsp;</p>
<p>The knife command above will create the foloowing structure [under cookbooks directory]:</p>
<p>&nbsp;</p>
<p class="rteindent1">attributes/</p>
<p class="rteindent1">definitions/</p>
<p class="rteindent1">files/</p>
<p class="rteindent1">libraries/</p>
<p class="rteindent1"><strong>metadata.rb</strong></p>
<p class="rteindent1">providers/</p>
<p class="rteindent1">README.rdoc</p>
<p class="rteindent1"><strong>recipes/</strong></p>
<p class="rteindent1">resources/</p>
<p class="rteindent1"><strong>templates/</strong></p>
<p>&nbsp;We <strong>won't</strong> be using all of these in this tutorial ... highlighted are the ones we are going to use (at this stage)</p>
<p>&nbsp;</p>
<p><strong>Step 4: Create the recipe</strong></p>
<pre title="code" class="brush: ruby;">
vim  cookbooks/ntp/recipes/default.rb</pre>
<p>&nbsp;</p>
<p>Add the following ruby code [<a href="https://github.com/tikalk/chef-intro-repo/blob/d7a67f6a17f5a9308561c9350054223ed9d1f845/cookbooks/ntp/recipes/default.rb">link</a>]:</p>
<pre title="code" class="brush: ruby;">
package &quot;ntp&quot; do
    action [:install]
end
 
template &quot;/etc/ntp.conf&quot; do
    source &quot;ntp.conf.erb&quot;
    variables( :ntp_server =&gt; &quot;time.nist.gov&quot; )
    notifies :restart, &quot;service[ntpd]&quot;
end
 
service &quot;ntpd&quot; do
    action [:enable,:start]
end</pre>
<p>&nbsp;</p>
<p>The first block of code will use chefs built-in packadge installer providor to use the os's package manager (in our case yum/rpm) and use the service name &quot;ntp&quot; the one we located whilst installing the package in step1 above.</p>
<p>&nbsp;</p>
<p><strong>Step 5: Create a template</strong></p>
<p>&nbsp;</p>
<pre title="code" class="brush: ruby;">
vim cookbooks/ntp/templates/default/ntp.conf.erb</pre>
<p>&nbsp;</p>
<p>Unlike files which are placed by chef &quot;as is&quot; files under templates folder ending with <strong>erb</strong>&nbsp;are interpolated and created on the <strong>node </strong>during a chef-client run.</p>
<p>The content of the file [<a href="https://github.com/tikalk/chef-intro-repo/blob/d7a67f6a17f5a9308561c9350054223ed9d1f845/cookbooks/ntp/templates/default/ntp.conf.erb">link</a>]:</p>
<pre title="code" class="brush: ruby;">
restrict default kod nomodify notrap nopeer noquery
restrict -6 default kod nomodify notrap nopeer noquery
restrict 127.0.0.1
restrict -6 ::1
server &lt;%= @ntp_server %&gt;
server  127.127.1.0     # local clock
driftfile /var/lib/ntp/drift
keys /etc/ntp/keys</pre>
<p>&nbsp;</p>
<p>In this simple use case line #7 from&nbsp; cookbooks/ntp/recipes/default.rb will be the one setting the ntp_server parameter for the tempalte file in line #5 of the template above.</p>
<p>&nbsp;</p>
<p>At this stage you could create a <strong>role </strong>add this recipe to a<strong> run_list&nbsp;</strong>and it will just work ... until you try to apply this recipe on <strong>ubuntu </strong>for example, there you will find an issue with the service name ... and whilst were at it , let's add support for more than one ntp server [in case the single one we added is down :(].</p>
<pre title="code" class="brush: ruby;">
apt-get install ntp</pre>
<p>Will revieal the issue I just mentioned</p>
<p>and&nbsp;</p>
<pre title="code" class="brush: ruby;">
dpkg -L ntp </pre>
<p>will give us the list of files [ /etc/ntp.conf ] and service name [ ntp ] =&gt; notice in this case there is no &quot;d&quot; at the end.</p>
<p>&nbsp;</p>
<p><strong>Step 6: Improovment #1 - adding service name resolution to our recipe</strong></p>
<p>Add an attributes file:</p>
<pre title="code" class="brush: ruby;">
vim  cookbooks/ntp/attributes/default.rb</pre>
<p>&nbsp;</p>
<p>With the following content:</p>
<pre title="code" class="brush: ruby;">
case platform
when &quot;redhat&quot;,&quot;centos&quot;,&quot;fedora&quot;,&quot;scientific&quot;
  default[:ntp][:service] = &quot;ntpd&quot;
when &quot;ubuntu&quot;,&quot;debian&quot;
  default[:ntp][:service] = &quot;ntp&quot;
else
  default[:ntp][:service] = &quot;ntpd&quot;
end</pre>
<p>&nbsp;</p>
<p>This case statment will help our recipe in the service name resolution for redhat / centos &amp; other rpm based distros&nbsp;&quot;<strong>ntpd</strong>&quot; for ubutnu / debian use &quot;<strong>ntp</strong>&quot;.</p>
<p>&nbsp;</p>
<p>Let's tell our recipe to respect this attribute ...:</p>
<pre title="code" class="brush: ruby;">
package &quot;ntp&quot; do                                
    action [:install]                           
end

service node[:ntp][:service] do
    service_name node[:ntp][:service]
    action [:enable,:start,:restart]
end

template &quot;/etc/ntp.conf&quot; do                     
    source &quot;ntp.conf.erb&quot;                       
    owner &quot;root&quot;                                
    group &quot;root&quot;                                
    mode 0644                                   
    notifies :restart, resources(:service =&gt; node[:ntp][:service])
end
</pre>
<p>&nbsp;</p>
<p>The diff is in line #7 &amp; line #12 which now uses the node:[ntp][:service] attribute we defined in the <em><strong>attributes.rb</strong></em> file above.</p>
<p>&nbsp;</p>
<p><strong>Step 7: Add support for more than 1 ntp server</strong></p>
<p>In&nbsp;<span style="line-height: 19px;">cookbooks/ntp/attributes/default.rb</span>&nbsp;file add the following array:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: ruby;">
default[:ntp][:servers] = [&quot;0.pool.ntp.org&quot;, &quot;1.pool.ntp.org&quot;, &quot;2.pool.ntp.org&quot;, &quot;3.pool.ntp.org&quot;]</pre>
<p>&nbsp;</p>
<p>And in our template file let's add support for more than one line of ntp server:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: ruby;">
# Generated by Chef for &lt;%= node[:fqdn] %&gt; 
# node[:fqdn] = ohai data collected on node !
# Local modifications will be overwritten.

restrict -6 ::1
#server &lt;%= @ntp_server %&gt;

&lt;% node[:ntp][:servers].each do |ntpsrv| -%&gt;
  server &lt;%= ntpsrv %&gt; iburst
  restrict &lt;%= ntpsrv %&gt; nomodify notrap noquery
&lt;% end -%&gt;

restrict default kod nomodify notrap nopeer noquery
restrict -6 default kod nomodify notrap nopeer noquery
restrict 127.0.0.1

server  127.127.1.0     # local clock
driftfile /var/lib/ntp/drift
keys /etc/ntp/keys</pre>
<p>&nbsp;</p>
<p>As you can see I marked out linet #5 which is our old ntp decleration</p>
<p>and added lines# 7-10:</p>
<pre title="code" class="brush: ruby;">
&lt;% node[:ntp][:servers].each do |ntpsrv| -%&gt;
  server &lt;%= ntpsrv %&gt; iburst
  restrict &lt;%= ntpsrv %&gt; nomodify notrap noquery
&lt;% end -%&gt;</pre>
<p>chef will itterate over the array and inject the vlaues in our case whilst using defaults we will recieve the following:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: ruby;">
  server 0.pool.ntp.org iburst
 restrict 0.pool.ntp.org nomodify notrap noquery
  server 1.pool.ntp.org iburst
 restrict 1.pool.ntp.org nomodify notrap noquery
  server 2.pool.ntp.org iburst
 restrict 2.pool.ntp.org nomodify notrap noquery
  server 3.pool.ntp.org iburst
 restrict 3.pool.ntp.org nomodify notrap noquery</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>That's it all is left is to upload this cookbook to your chef server and add it to one of your nodes and you are good to go.</p>
<pre title="code" class="brush: java;">
knife cookbook upload ntp</pre>
<p>(you might want to bump the version up just so it becomes a habbit - edit the <em><strong>metadata.rb</strong></em> file under the recipies directory).</p>
<p>Coming up [hopefully in the next few days] a test environment for chef cookbooks - I will be taking this example and present how to setup an environment for testing comining Chef-Solo (in case you don't have a chef server), <a href="http://www.vagrantup.com/">Vergrant </a>&amp; <a href="https://www.google.co.il/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;ved=0CDAQFjAA&amp;url=https%3A%2F%2Fwww.virtualbox.org%2F&amp;ei=cdf7UIK1NKTd4QTwp4CQBQ&amp;usg=AFQjCNHpshI_45ZdaFl7Mvf-glSeroKujQ&amp;sig2=470cYUQ3VveKdRKuE-2TYw&amp;bvm=bv.41248874,d.bGE">VirtualBox</a></p>
<p>&nbsp;</p>
<p>Fell free to comment / remark :)</p>
