---
layout: post
title: Experimenting with OpenStack Essex on Ubuntu 12.04 LTS under VirtualBox
created: 1336864447
author: ori.tzoran
permalink: experimenting-with-openstack-essex-on-ubuntu-12-04-lts-under-virtualbox
tags:
- DevOps
- OpenStack Essex
- cloud
---
<p>The best way to get an insight into OpenStack is playing with a live installation, but OpenStack&#39;s <a href="http://docs.openstack.org/trunk/openstack-compute/install/content/compute-system-requirements.html#d6e155">simplest configuration</a>&nbsp;requires 2 network interfaces, e.g. 2 machines, each equipped with 2 network cards and an additional ethernet hub. Using VirtualBox we can set up a full OpenStack installation on a single laptop or desktop.<br />
	This approach is very appealing and there&#39;s a number of guides that describe it. This guide is a compilation of those sources (credited below) with the neccessary updates and fixes.&nbsp;</p>
<p>&nbsp;</p>
<p>OpenStack is evolving fast and the recent release, Essex, came out by the end of April 2012 - at about the same time Ubuntu released 12.04 LTS &ldquo;Precise Pangolin&rdquo; (LTS stands for <em>Long Term Support</em>). OpenStack&#39;s development is mostly carried out on Ubuntu so this is the easiest platform to get it running on. Ubuntu&#39;s repositories for 12.04 provide all the necessary packages to support OpenStack&#39;s Essex so a POC based on this combination is supposed to be the easiest to set up.<br />
	&nbsp;</p>
<p>&nbsp;</p>
<h1>
	Quick Overview of The Installation</h1>
<p>We will install VirtualBox on whatever host OS you have (provided it runs VirtualBox, even Windows). After configuring VirtualBox&#39;s host-only network adapetrs, we will create a VM (named essex1) in which a fresh ISO of Ubuntu 12.04 will be installed. All subsequent actions are performed inside essex1. We will grab Kevin&#39;s script (credits below) which will do most of the installation and configuration work. Then we will download a tiny cloud-ready image, from which we will create our &ldquo;cloud instance&rdquo;. OpenStack&#39;s Dashboard will be used to launch this instance, we will end the session logging into the cloud instance.</p>
<p>&nbsp;</p>
<p><img alt="" height="263" src="/files/POC setup.png" width="580" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	Ingredients</h1>
<p>Host PC</p>
<p class="rteindent1">recommended 8GB RAM, at least 30GB free disk space, internet connection, VT-X enabled in BIOS.</p>
<p class="rteindent1">The host OS can be any Linux, windows, Mac supporting&nbsp;VirtualBox</p>
<p>VirtualBox 4</p>
<p class="rteindent1">I&#39;m using 4.1.12-dfsg-2 (from &ldquo;universe&rdquo;)</p>
<p>Ubuntu 12.04 LTS <em>Precise Pangolin</em> ISO image</p>
<p class="rteindent1">Most guides use the &ldquo;server&rdquo; edition; since a lot of work is performed inside the VM guest, I use (and highly recommend) the &ldquo;desktop&rdquo;.<br />
	Choose 32 or 64 bits according to your host</p>
<p>Kevin Jackson&#39;s <span style="font-family: 'Courier New'; ">Osinstall.sh</span> script</p>
<p class="rteindent1">is obtained by git-cloning Kevin&#39;s repository [inline below]</p>
<p>Tiny cloud image</p>
<p class="rteindent1">is downloaded by another script (written by Kevin)</p>
<p>&nbsp;</p>
<h1>
	Estimated time</h1>
<p>About 1h30, including VM installation and OpenStack setup (not including the ubuntu ISO download time).<br />
	&nbsp;</p>
<h1>
	Step 1: VirtualBox Install &amp;&nbsp;Setup - performed on Host PC</h1>
<p><strong>Verify</strong> VT-X enabled in your host PC&#39;s BIOS</p>
<p><strong>Download</strong> <a href="http://www.ubuntu.com/download/desktop">Ubuntu 12.04 ISO</a>&nbsp;(i&#39;m using the 64 bits desktop)</p>
<p><strong>install</strong> VirtualBox [apt-get or <a href="https://www.virtualbox.org/wiki/Downloads">here</a>]</p>
<p><strong>Configure</strong> VirtualBox&#39;s Host-Only Networks</p>
<p class="rteindent1">start VirtualBox [on ubuntu prior to Unity it&#39;s in <em>Applications &rarr; Accessories</em>]<br />
	open <em>File &rarr; Preferences &rarr; Network</em> tab<br />
	<strong>Add</strong> host-only netwok for <strong>vboxnet0</strong> &ndash; this will be the <strong>Public</strong> interface</p>
<p class="rteindent2">set IP to 172.16.0.254, mask 255.255.0.0, dhcp disbaled</p>
<p class="rteindent1"><br />
	<strong>Add</strong> host-only netwok for <strong>vboxnet1</strong> &ndash; this will be the <strong>Private</strong> (VLAN) interface</p>
<p class="rteindent2">set IP to 11.0.0.1, mask 255.0.0.0, dhcp disbaled</p>
<p class="rteindent1"><br />
	Note1: In Kevin&#39;s screencast, vboxnet1 is set to 10.0.0.1 which is also used by the default D-Link router (from Bezeq). There shouldn&#39;t be IP addressing issues since VirtualBox is supposed to take care of isolation &ndash; but I had IP clashes and therefore suggest 11.0.0.0/8 instead.</p>
<p class="rteindent1"><br />
	Note2: In my screenshots vboxnet0 is assigned to another test, so I use vboxnet1 and vboxnet2 respectively</p>
<p class="rteindent1">&nbsp;</p>
<p><img alt="" height="457" src="/files/vbox setup net gen1.png" width="610" /></p>
<p>[should be thumbnail]</p>
<p>&nbsp;</p>
<h1>
	Step 2: Create Guest&nbsp;- performed in VirtualBox</h1>
<p>click the &ldquo;New&rdquo; button&nbsp;<img align="right" alt="" height="58" hspace="5" src="/files/vbox button new(1).png" vspace="5" width="127" /></p>
<p><strong>Create</strong> a VM with the following settings:</p>
<p class="rteindent1">Name: Essex1 (or whatever, not really important)<br />
	OS type: Linux<br />
	Version: Ubuntu (or Ubuntu 64, in accordance with the ISO downloaded above)<br />
	Memory: 1536MB<br />
	Hard Disk: accept all the defaults, size 20GB</p>
<p>&nbsp;</p>
<p><strong>Configure</strong> the newly created VM</p>
<p class="rteindent1">Now modify the guest as follows: (performed from the right panel in VirtualBox&#39;s main window, where the new VM is selected on the left).<br />
	<strong>System</strong> tab:</p>
<p class="rteindent2">Processor (optional, but recommended): Increase CPU from 1 set to 2<br />
	Acceleration: make sure VT-x and nested paging are checked</p>
<p class="rteindent1"><strong>Network</strong> tab: see figure above&nbsp;</p>
<p class="rteindent2">Adapter 1: attached to NAT &ndash; eth0 will connect here;&nbsp;</p>
<p class="rteindent2">Adapter 2: attached to Host-Only Adapter, vboxnet0 - eth1 will connect here ;</p>
<p class="rteindent2">Adapter 3: attached to Host-Only Adapter, vboxnet1 - eth2&nbsp;will connect here;</p>
<p class="rteindent1"><strong>Audio</strong> tab: may be disabled</p>
<p class="rteindent1"><strong>Shared Folders</strong>: optional</p>
<p class="rteindent2">if you want to copy files around (from/to the host PC and the VM) that&#39;s handy.</p>
<p class="rteindent1">&nbsp;</p>
<p><strong>Power</strong> the newly created VM</p>
<p class="rteindent1">VirtualBox should popup a wizard to connect the ISO file as boot device.<br />
	Note: If this doesnt happen (e.g. this isn&#39;t your first attmept to boot the VM), you may use the <em>Storage</em> tab to hook the ISO to the virtual CD drive. Alternatively, use the VM window&#39;s <em>Devices</em> menu to do the same.</p>
<p>&nbsp;</p>
<h1>
	Step 3: Guest Install &amp; Initial Configuration</h1>
<p><strong>Install</strong> the guest (from the iso image), use the suggested defaults.</p>
<p class="rteindent1">Create a user with a quick password such as 0000 (you&#39;ll soon have to retype it many times).<br />
	<strong>Choose</strong> <strong>eth0</strong> as your default network interface.<br />
	when prompted to reboot, disconnect the ISO from the CD&nbsp;</p>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1"><img alt="" height="180" src="/files/vbox CD remove.png" width="520" /><br />
	&nbsp;</p>
<p class="rteindent1">&nbsp;</p>
<p><strong>Verify</strong> internet access after reboot (mandatory to continue)</p>
<p class="rteindent1">You should have internet access through eth0. If it doesn&#39;t work, copy the setup for /etc/network/interfaces from the snippet below.<br />
	Normally, eth0 will get an IP address of 10.0.2.15</p>
<p>&nbsp;</p>
<p><strong>Configure</strong> network interfaces</p>
<p class="rteindent1">Become root (from now till the end):<br />
	<strong><span style="font-family: 'Courier New'; ">sudo -i </span></strong><br />
	Edit /etc/network/interfaces, make it look like this:</p>
<p class="rteindent2">&nbsp;<span style="font-family: 'Courier New'; ">auto lo<br />
	iface lo inet loopback</span></p>
<p class="rteindent2">&nbsp;&nbsp;<span style="font-size: small; "> </span></p>
<p class="rteindent2"><span style="font-family: 'Courier New'; "># The primary network interface<br />
	auto eth0<br />
	iface eth0 inet dhcp</span></p>
<p class="rteindent2">&nbsp;&nbsp;</p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">#Public Interface<br />
	auto eth1<br />
	iface eth1 inet static</span></p>
<p class="rteindent3"><span style="font-family: 'Courier New'; ">address 172.16.0.1<br />
	netmask 255.255.0.0<br />
	network 172.16.0.0<br />
	broadcast 172.16.255.255</span></p>
<p class="rteindent2">&nbsp;</p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">#Private VLAN interface<br />
	auto eth2<br />
	iface eth2 inet manual</span></p>
<p class="rteindent3">&nbsp;<span style="font-family: 'Courier New'; ">up ifconfig eth2 up</span></p>
<p>&nbsp;then run:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">ifup eth1 </span></strong><span style="font-family: 'Courier New'; ">#after this, ifconfig shows inet addr:172.16.0.1 Bcast:172.16.255.255 Mask:255.255.0.0<br />
	<strong>ifup eth2 </strong>#after this, ifconfig doesnt report ipv4 addr for eth1</span></p>
<p>or reboot</p>
<p>&nbsp;</p>
<p><strong>Verify</strong> reachability from your host PC</p>
<p class="rteindent1">ping 172.16.0.1&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Update &amp;&amp; upgrade</strong></p>
<p>run</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">apt-get update &amp;&amp;</span></strong>&nbsp;&nbsp;<strong><span style="font-family: 'Courier New'; ">apt-get upgrade</span></strong></p>
<p><br />
	and reboot</p>
<p>&nbsp;</p>
<p><strong>Install</strong> GuestAdditions [optional but highly recommended]</p>
<p class="rteindent1">GuestAdditions provide the ability to resize the main VM window, cut/paste between the Host PC and the guest and enable other productivity gains.<br />
	from the guest window&#39;s top menu, select <em>Devices &rarr; Install Guest Additions</em><br />
	A pop up (from the VM) will ask if you want to autorun, accept and let the script run as root.<br />
	Reboot.<br />
	Note1: after each kernel update, you may be required to reinstall GuestAdditions.</p>
<p>&nbsp;</p>
<p><strong>Install</strong> openssh-server, required when installation ISO is the &ldquo;desktop&rdquo; edition:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">apt-get -y install openssh-server</span></strong></p>
<p>&nbsp;</p>
<p><strong>Install</strong> Git, required to pull down Kevin&#39;s scripts:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">apt-get -y install git</span></strong></p>
<p>&nbsp;</p>
<p class="rteindent1"><img align="right" alt="" height="109" hspace="5" src="/files/vbox snapshot button.png" vspace="5" width="408" /></p>
<p><strong>Take a snapshot</strong> of VirtualBox&#39;s Guest.</p>
<p>The guest is now installed, updated and configured with the basic network setup. If something goes wrong with the OpenStack installation, you can start over using this snapshot.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	&nbsp;</h1>
<h1>
	Step 4: OpenStack installation - Automated Part</h1>
<p>we continue as root on the Guets essex1</p>
<p><strong><span style="font-family: 'Courier New'; ">sudo -i </span></strong><em><span style="font-family: 'Courier New'; "># and cwd is /root</span></em></p>
<p><strong>Clone</strong> Kevin&#39;s repository:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">git clone https://github.com/uksysadmin/OpenStackInstaller.git<br />
	cd OpenStackInstaller<br />
	git checkout essex</span></strong></p>
<p><strong>Run</strong> the combo installer:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">./OSinstall.sh -F 172.16.1.0/24 -f 11.1.0.0/16 -s 512 -p eth2 -t demo -v qemu</span></strong></p>
<p class="rteindent1">Note: option &#39;-p eth2&#39; is missing from Kevin&#39;s screenscat, adding it makes the difference.</p>
<p>The script displays a configuration summary and prompts for yes/no.<br />
	This is what we get:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">OpenStack Essex Release: OpenStack with Keystone and Glance</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">OpenStack will be installed with these options:</span></p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">Installation: all<br />
	Networking: VLAN (100)<br />
	Private Interface = eth2<br />
	&gt;&gt; Private Network: 11.1.0.0/16 1 512<br />
	Public Interface = eth1<br />
	&gt;&gt; Public Floating network = 172.16.1.0/24<br />
	Cloud Controller (API, Keystone + Glance) = 172.16.0.1<br />
	Virtualization Type: qemu</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Note: The larger the public floating range, the longer it takes to create the entries<br />
	Stick to a /24 to create 256 entries in test environments with the -F parameter</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Account Credentials</span></p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">Tenancy: admin<br />
	Role: Admin<br />
	Credentials: admin:admin</span></p>
<p class="rteindent2">&nbsp;</p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">Tenancy: demo<br />
	Role: Member, Admin<br />
	Credentials demo:demo</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Are you sure you want to continue? [Y/n]</span></p>
<p>&nbsp;</p>
<p>Take note of the account credentials for tenants &#39;admin&#39; and &#39;demo&#39;.&nbsp;</p>
<p>Hit enter to start the automated part of the installation. Plenty of output, including installation of openstack components, Apache, MySQL etc.</p>
<p>&nbsp;</p>
<h1>
	Step 5: Finalize OpenStack installation</h1>
<p>We&#39;re root on essex1.<br />
	The last screen of output lists additional commands to run manually in order to finalize the installation, we&#39;ll run them all now and <span style="background-color: rgb(255, 255, 0); ">rectify the errors in the next step</span>.</p>
<p>&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Restarting service to finalize changes...<br />
	To set up your environment and a test VM execute the following:</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Upload a test Ubuntu image:</span></p>
<p class="rteindent2"><strong><span style="font-family: 'Courier New'; ">./upload_ubuntu.sh -a admin -p openstack -t demo -C 172.16.0.1</span></strong></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Setting up user environment</span></p>
<p class="rteindent2"><span style="font-family: 'Courier New'; ">Copy over the demorc file created in this directory to your client<br />
	Source in the demorc file: </span><strong><span style="font-family: 'Courier New'; ">. demorc</span></strong></p>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Add a keypair to your environment so you can access the guests using keys:</span></p>
<p class="rteindent2"><strong><span style="font-family: 'Courier New'; ">euca-add-keypair demo &gt; demo.pem</span></strong><br />
	<strong><span style="font-family: 'Courier New'; ">chmod 0600 demo.pem</span></strong></p>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">Set the security group defaults (iptables):</span></p>
<p class="rteindent2"><strong><span style="font-family: 'Courier New'; ">euca-authorize default -P tcp -p 22 -s 0.0.0.0/0<br />
	euca-authorize default -P tcp -p 80 -s 0.0.0.0/0<br />
	euca-authorize default -P tcp -p 8080 -s 0.0.0.0/0<br />
	euca-authorize default -P icmp -t -1:-1</span></strong></p>
<p class="rteindent1">&nbsp;</p>
<p>copy and run the commands in bold.<br />
	==</p>
<p>&nbsp;</p>
<h1>
	Step 6: Fix Glance</h1>
<p>We&#39;re root on essex1 and the environment variables defined in <span style="font-family: 'Courier New'; ">demorc</span> are sourced [<strong><span style="font-family: 'Courier New'; ">. demorc</span></strong>]</p>
<p><strong>Verify</strong> that the ubuntu cloud image is registered with Glance (at that point, this didn&#39;t work for me and others):</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">glance details</span></strong></p>
<p>&nbsp;</p>
<p>if you get:</p>
<pre>
<span style="font-size: medium; ">ERROR [glance.registry.db.api] (ProgrammingError) (1146, &quot;Table &#39;glance.images&#39; doesn&#39;t exist&quot;)</span></pre>
<p>&nbsp;</p>
<p><strong>Repair</strong> glance:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">glance-manage version_control 0<br />
	glance-manage db_sync<br />
	restart glance-api<br />
	restart glance-registry </span></strong><em><span style="font-family: 'Courier New'; ">#if restart fails, run start instead</span></em></p>
<p>&nbsp;</p>
<p>Run the upload script again (it&#39;s smart enough to skip the wget if the file was already downloaded):</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">./upload_ubuntu.sh -a admin -p openstack -t demo -C 172.16.0.1</span></strong></p>
<p>expect the output tolook something like this:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">ubuntu 11.10 i386 now available in </span><span style="background-color: rgb(0, 255, 0); "><span style="font-family: 'Courier New'; ">Glance (7d7d0f62-35af-4f46-be9d-8659fe786ad2)</span></span></p>
<p>where on the first attempt above we got:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">ubuntu 11.10 i386 now available in </span><span style="background-color: rgb(0, 255, 0); "><span style="font-family: 'Courier New'; ">Glance ()</span></span></p>
<p>&nbsp;</p>
<p>Now&nbsp;<span style="font-family: 'Courier New'; ">glance details</span> should produce something similar to this:</p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">root@essex1:~/OpenStackInstaller# <strong>glance details</strong></span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">================================================================================<br />
	URI: http://172.16.0.1:9292/v1/images/7d7d0f62-35af-4f46-be9d-8659fe786ad2<br />
	Id: 7d7d0f62-35af-4f46-be9d-8659fe786ad2<br />
	Public: Yes<br />
	Protected: No<br />
	Name: ubuntu 11.10 i386 Server<br />
	Status: active<br />
	Size: 1476395008<br />
	Disk format: ami<br />
	Container format: ami<br />
	Minimum Ram Required (MB): 0<br />
	Minimum Disk Required (GB): 0<br />
	Owner: 77009d2c93154ab5975127dbd48faa6d<br />
	Property &#39;kernel_id&#39;: 41185339-9935-454f-acb2-37afaa233e3d<br />
	Property &#39;distro&#39;: ubuntu 11.10<br />
	================================================================================<br />
	URI: http://172.16.0.1:9292/v1/images/41185339-9935-454f-acb2-37afaa233e3d<br />
	Id: 41185339-9935-454f-acb2-37afaa233e3d<br />
	Public: Yes<br />
	Protected: No<br />
	Name: ubuntu 11.10 i386 Kernel<br />
	Status: active<br />
	Size: 4790624<br />
	Disk format: aki<br />
	Container format: aki<br />
	Minimum Ram Required (MB): 0<br />
	Minimum Disk Required (GB): 0<br />
	Owner: 77009d2c93154ab5975127dbd48faa6d<br />
	Property &#39;distro&#39;: ubuntu 11.10</span></p>
<p class="rteindent1"><span style="font-family: 'Courier New'; ">================================================================================</span></p>
<p><span style="font-family: Verdana; ">&nbsp;<em>Update 2012-05-15:</em> new issue with glance details [&quot;</span><em><span style="font-size: smaller; "><font face="Verdana">Response from Keystone does not contain a Glance endpoint.</font></span></em><font face="Verdana">&quot;</font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	Step 7: Launch an instance Using the Horizon Web UI</h1>
<p>Start a browser and login to the Dashboard at http://172.16.0.1 with credentials &lsquo;demo/openstack&rsquo; (the browser can run in the host PC or on essex1).</p>
<p>Click the&nbsp;<em><strong>Project</strong></em>&nbsp;tab, expect something like this:</p>
<p>&nbsp;</p>
<div>
	<img alt="" height="396" hspace="5" src="/files/ostk dashboard project access+security.png" style="font-size: 14px; line-height: 21px; " vspace="5" width="504" /></div>
<p><span style="font-size: smaller; ">Figure <em>Dashboard project access+security</em></span></p>
<p>&nbsp;</p>
<p><strong>Verifications</strong>:<br />
	In <em><strong>Access &amp; Security</strong></em>:<br />
	under <em><strong>Keypairs</strong></em> you should see the keypair that euca-add-keypair&nbsp;created in demo.pem [compare fingerprint]</p>
<p>Under <em><strong>Security Groups</strong></em>/<em>Edit Rules</em>, you should see the routing entries created by the 4 euca-authorize commands we manually entered above.</p>
<p>&nbsp;</p>
<p><strong>Launch </strong>go to&nbsp;<em><strong>Images &amp; Snapshots</strong></em>:</p>
<p><img align="right" alt="" height="351" hspace="5" src="/files/2012-05-16LaunchInstance dialog(1).png" vspace="5" width="348" /></p>
<p>You should see an entry for the cloud image &ldquo;ubuntu 11.10 i386 Server&rdquo; [in Kevin&#39;s updated repo the image is <em><span style="font-size: smaller; "><span style="font-family: 'Trebuchet MS', serif; line-height: 100%; ">ubuntu 12.04 amd64 Server</span></span></em>]</p>
<p>&nbsp;</p>
<p>if all looks good, click the Launch button (on the right of the tiny image), in the popup:</p>
<ol>
	<li>
		<p>give it a name</p>
	</li>
	<li>
		<p>specify the keypair</p>
	</li>
	<li>
		<p>click <em>Launch Instance</em></p>
	</li>
</ol>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	&nbsp;</h1>
<h1>
	&nbsp;</h1>
<h1>
	Step 8: Login to the openstack instance &nbsp;</h1>
<p>You may login from the host PC or from essex1, all you need is the keypair in demo.pem and the public IP address listed in the Dashboard&#39;s <strong>Instances &amp; Volumes</strong> tab.</p>
<p class="rteindent1">it may take up to 5 minutes for the tiny instance to accept the ssh request. Be patient if you get &ldquo;Destination Host Unreachable&rdquo; or &ldquo;Connection refused&rdquo;.</p>
<p>&nbsp;</p>
<p>make sure [!!] the keypair permssions are set correctly:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">chmod 0600 demo.pem </span></strong><em><span style="font-family: 'Courier New'; ">#MUST &ndash; if perms not 0600, ssh will yield Connection refused</span></em><br />
	<strong><span style="font-family: 'Courier New'; ">ssh -i demo.pem ubuntu@172.16.1.1</span></strong></p>
<p>&nbsp;</p>
<p>BTW, passwd isn&#39;t required for sudo -i on this instance.</p>
<p>&nbsp;</p>
<p><strong>Take</strong> a 2nd snapshot.<br />
	&nbsp;</p>
<h1>
	Step 9: Pending Issues&nbsp;</h1>
<p><strong>glance and keystone bugs</strong></p>
<p>Inspecting OpenStack&#39;s state on essex2 using CLI clients generally works fine. For example:</p>
<p><span style="font-family: Courier New;">[14:37:07]root@essex2[OpenStackInstaller]<br />
	# <strong>. demorc</strong>&nbsp; &nbsp; &nbsp; &nbsp;#source demorc to set the OSTKenvironment vars OSTK</span>&nbsp;<br />
	<span style="font-family: Courier New;">[14:37:10]root@essex2[OpenStackInstaller]<br />
	# <strong>keystone service-list</strong><br />
	+----------------------------------+----------+--------------+----------------------------+<br />
	|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; name&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp; type&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
	+----------------------------------+----------+--------------+----------------------------+<br />
	| 0798614d6a0f4dbfad6d4c05867ae49f | volume&nbsp;&nbsp; | volume&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Volume Service&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
	| 6f5d88e2f89b41248f6268f356f13f18 | keystone | identity&nbsp;&nbsp;&nbsp;&nbsp; | OpenStack Identity Service |<br />
	| 83e79cbc07ac47eb86e5c572b877ef0a | nova&nbsp;&nbsp;&nbsp;&nbsp; | compute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | OpenStack Compute Service&nbsp; |<br />
	| 9170c087443d411d9faa88277d691537 | ec2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | ec2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | EC2 Service&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
	| b141b167e5114071982bd024ce961f8a | glance&nbsp;&nbsp; | image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | OpenStack Image Service&nbsp;&nbsp;&nbsp; |<br />
	| cc4961ae75e34bb9a2f163d129069ed2 | swift&nbsp;&nbsp;&nbsp; | object-store | OpenStack Storage Service&nbsp; |<br />
	+----------------------------------+----------+--------------+----------------------------+</span><br />
	&nbsp;</p>
<p><span style="font-family: Courier New;">[14:38:36]root@essex2[OpenStackInstaller]<br />
	# <strong>nova image-list</strong><br />
	+--------------------------------------+---------------------------+--------+--------------------------+<br />
	|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Status | &nbsp; &nbsp;Server&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />
	+--------------------------------------+---------------------------+--------+--------------------------+<br />
	| 31cdfe12-2822-43e2-ba57-055669a38862 | ubuntu 12.04 amd64 Kernel | ACTIVE</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</span></p>
<p><span style="font-family: Courier New;">| 7bb28da2-2979-4dc9-8845-d138c8bc2071 | ubuntu 12.04 amd64 Server | ACTIVE</span><span style="font-family: 'Courier New'; ">&nbsp;</span><span style="font-family: 'Courier New'; ">| &nbsp; &nbsp;</span><span style="font-family: 'Courier New'; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</span></p>
<p><span style="font-family: Courier New;">+--------------------------------------+---------------------------+--------+--------------------------+</span><br />
	&nbsp;</p>
<p>For glance however, it doesn&#39;t work as expected (recall it worked after the fix in step 6):</p>
<p class="rteindent1"><span style="font-family: Courier New;">[14:38:59]root@essex2[OpenStackInstaller]</span><br />
	<span style="font-family: Courier New;"># <strong>glance index</strong><br />
	Failed to show index. Got error:<br />
	<span style="color: rgb(255, 0, 0);">Response from Keystone does not contain a Glance endpoint.</span></span></p>
<p>What goes wrong here?</p>
<p>Keystone has an endpoint for glance, we see it (actually the URL) in the output of <strong><span style="font-family: Courier New;">keystone endpoint-list</span></strong>. So the error string is probably wrong.</p>
<p>We may assume glance doesn&#39;t authenticate correcly with keystone - but all other clients do; In order to dig deeper, we need some verbose output from keystone.</p>
<p>This in turn opens up another issue, which is how to turn verbose logging in keystone. The sample file comes with no comments and the logging section in <a href="http://keystone.openstack.org/configuration.html">keystone&#39;s wiki</a> isn&#39;t of much help.</p>
<p>&nbsp;&nbsp;</p>
<h1>
	solution to the &#39;glance&#39; issues&nbsp;<span style="font-size: smaller; "><em><span style="color: rgb(0, 0, 255); ">update 2012-10-18</span></em></span></h1>
<p>Add this to your env and glance (index, details, etc) will work as expected:</p>
<p class="rteindent1"><strong><span style="font-family: 'Courier New'; ">export OS_TENANT_NAME=demo</span></strong><span style="font-family: 'Courier New'; "> &nbsp; #or whatever you assigned for tenant above</span></p>
<p>This is a bug in &#39;glance 2012.1.X&#39;&nbsp;(where X may be 2, 3 or 4).</p>
<p>As we see above, other OSTK CLI clients (e.g. nova, keystone)&nbsp;don&#39;t use&nbsp;OS_TENANT_NAME and they don&#39;t fail when it&#39;s undefined in the environment.</p>
<p>It&#39;s worth noting that in setups where username == tenant_name, glance will not fail as seen above. The doc states that when&nbsp;OS_TENANT_NAME isn&#39;t defined, autherntication tries a match against OS_USERNAME (&quot;<em>why simple when we can make it complicated?</em>&quot;).&nbsp;</p>
<p>Subsequently, the error string emitted by glance (&quot;<em>Response from Keystone does not contain a Glance endpoint</em>&quot;) &nbsp;reveals a but in auth.py, the returned error string is erronous and misleading.&nbsp;</p>
<p>&nbsp;</p>
<p>Alternatively, you may execute galnce with &#39;-T demo&#39;, as in:&nbsp;</p>
<p class="rteindent1"><strong style="font-family: 'Courier New'; ">glance -T demo index</strong></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>swift</strong></p>
<p>When clicking &quot;Containers&quot; in dashboard, you&#39;ll get</p>
<p class="rteindent1"><span style="color: rgb(0, 0, 255);">error at /nova/containers</span></p>
<p class="rteindent1"><span style="color: rgb(0, 0, 255);">[Errno 111] Connection refused</span></p>
<p>That&#39;s normal as Swift ﻿isn&#39;t installed by Kevin&#39;s script, and <em><strong>That&#39;s All Folks...</strong></em></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h1>
	Credits</h1>
<p style="line-height: 21px; ">This writing is largely based on Kevin Jackson&#39;s excellent blog and&nbsp;<span style="font-family: 'Courier New'; ">Osinstall.sh</span>&nbsp;script, with fixes by Rob Davison and other sources.</p>
<ol>
	<li>
		Kevin&#39;s&nbsp;<a href="http://uksysadmin.wordpress.com/2011/02/17/running-openstack-under-virtualbox-a-complete-guide/">Running OpenStack under VirtualBox &ndash; A Complete Guide (Part 1)</a>&nbsp;[for Diablo]</li>
	<li>
		Kevin&#39;s&nbsp;<a href="http://uksysadmin.wordpress.com/2012/03/28/screencast-video-of-an-install-of-openstack-essex-on-ubuntu-12-04-under-virtualbox">Screencast / Video of an Install of OpenStack Essex on Ubuntu 12.04 under VirtualBox</a>&nbsp;&nbsp;</li>
	<li>
		<a href="http://: http://rob-davison.co.uk/?p=44&amp;goback=.gde_3239106_member_108155926">Rob&#39;s blog with fixes to the screencast</a></li>
</ol>
<p>&nbsp;</p>
