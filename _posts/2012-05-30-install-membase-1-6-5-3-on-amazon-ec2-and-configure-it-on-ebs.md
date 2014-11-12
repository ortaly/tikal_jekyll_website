---
layout: post
title: Install Membase 1.6.5.3 on Amazon EC2 and configure it on EBS.
created: 1338394544
author: avit
permalink: /install-membase-1653-amazon-ec2-and-configure-it-ebs
tags:
- Ruby
- web
---
<p>As your application grows (like ours did) you will need more space to store your cache.</p>

<p>In our case, we needed to move from memcached to membase and make use of both memory and disk space. The decision was made and we decided to go with a 2 server solution, each server has 16G of memory and 100G of EBS volume attached to it. Also, both will have membase latest stable version installed and perform as a cluster in case one falls or anything happens, a fail safe if you will.</p>

<p>In this post, I will walk you though what was done to perform this and how exactly it was done on the amazon cloud.</p>

<p>First things first, select an AMI from your list and click on “Launch instance”.</p>

<p><img alt='Launch an instance from an AMI' src='http://farm3.static.flickr.com/2659/5722254735_2ed3106a45.jpg' /></p>

<p>You will see a dialog popup where you need to select the instance type.</p>

<p><img alt='Select instance type on Amazon' src='http://farm3.static.flickr.com/2118/5722254923_c61a5d3950.jpg' /></p>

<p>I selected the 16G memory server, I launched 2 instances from this type. Like I said before, I wanted those to perform in a cluster so I will have a fail safe option.</p>

<p>Now, you have 2 servers up and running. Because those servers are serving as a membase solution to production servers, I also configured an elastic IP to them.</p>

<p>Now, let’s create our volumes.</p>

<h2 id='creating_ebs_volumes_and_attaching_to_your_instance'>Creating EBS volumes and attaching to your instance</h2>

<p>Go to the EBS section and click on create volume (top right in this image).</p>

<p><img alt='Create an EBS volume' src='http://farm3.static.flickr.com/2451/5722811584_f56d95c100.jpg' /></p>

<p>You will see this dialog:</p>

<p><img alt='Select the size of your new EBS volume' src='http://farm4.static.flickr.com/3286/5722811826_28b7e72e44.jpg' /></p>

<p>Just select how many Gigs you want, availability zone (make sure it’s the same as the server availability zone or you will have performance issues).</p>

<p>Once the EBS volumes (I needed 2) are ready, all you need is to attach those to your servers.</p>

<p>You right click on the volume and select “attach”, you will see very detailed information about what you need to do there (very simple)</p>

<p>OK, so now we have our servers and volumes attached to them (instances don’t “know” the EBS’s yet).</p>

<p>SSH into your instance.</p>

<h2 id='mounting_your_ebs_volume_to_the_instance'>Mounting your EBS volume to the instance</h2>

<p>After you ssh into your instance run these commands to have your volume installed on the instance (You can mount in another folder and not the one I selected here).</p>
<div class='highlight'><pre><code class='bash'>yes | mkfs -t ext3 /dev/sdf
mkdir /mnt/data-store
mount /dev/sdf /mnt/data-store
</code></pre>
</div>
<p>This will mount the EBS to the /mnt/data-store folder, which we will use in a few minutes to have membase work on this folder and not steal space from the server main disk (which will result in a crash).</p>

<h2 id='downloading_and_installing_membase_on_your_new_instance'>Downloading and installing membase on your new instance</h2>

<p>First, a cleanup…</p>

<p>I had the instances created from an AMI that already had a previous version of membase (1.6.4) installed on it. So first, you will need to clean those up like so:</p>
<div class='highlight'><pre><code class='bash'>rpm -e membase-server-1.6.5.3
</code></pre>
</div>
<p>Now, go to membase.com, register for the download and you will be able to download the package you need, you can select from a variety of versions.</p>

<p><img alt='Couchbase website, select your download' src='http://farm3.static.flickr.com/2227/5722255511_ce219f2b70.jpg' /></p>

<p>Copy the download link and go back to your server.</p>

<p>Put this in your shell and click ‘Enter’.</p>
<div class='highlight'><pre><code class='bash'>wget your_download_link
</code></pre>
</div>
<p>I have a server with RPM but it’s all the same with another package manager.</p>

<p>After you have the file downloaded to the server, run this command:</p>
<div class='highlight'><pre><code class='bash'>rpm --install your_rpm_file.rpm
</code></pre>
</div>
<p>Now you have membase installed on the server. Congrats! All should be running now.</p>

<h2 id='configuring_the_membase_server_after_installation'>Configuring the membase server after installation</h2>

<p>From here, you can read the getting started in the membase wiki, it’s very good from here on:</p>

<p><a href='http://techzone.couchbase.com/wiki/display/membase/Getting+Started'>Getting started guide, Couchbase website.</a></p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/rZLoX2jL3T8" height="1" width="1"/>
