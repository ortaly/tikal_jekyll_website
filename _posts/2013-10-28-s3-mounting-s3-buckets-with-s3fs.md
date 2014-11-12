---
layout: post
title: S3 - Mounting S3 Buckets With S3fs
created: 1382944340
author: hagzag
permalink: /devops/s3-mounting-s3-buckets-s3fs
tags:
- DevOps
- Amazon EC2
- S3
- s3fs
---
<p>A&nbsp;cheap&nbsp;solution on Amazon s3 for uploading files to s3 via SSH</p>

<p>I needed to upload files from my Corporate environment in a&nbsp;push mode&nbsp;meaning I do not open any &ldquo;special&rdquo; ports in my environemnt in order to enable users to put files on S3. I am curentelly testing to see how robust this solution really is but basically what I found myself doing is install s3fs (link to project page) like so:</p>

<blockquote>
<p>wget http://s3fs.googlecode.com/files/s3fs-1.73.tar.gz</p>

<p>tar xvzf s3fs-1.73.tar.gz</p>

<p>cd s3fs-1.73 ./configure --prefix=/usr</p>

<p>make &amp;&amp; make install</p>
</blockquote>

<p>I was installing this for Suse but for Amazon linux/redhat etc you might find a package see:&nbsp;here.</p>

<p>Once the package is installed you can use&nbsp;s3fs</p>

<blockquote>
<p>s3fs BUCKET:[PATH] MOUNTPOINT [OPTION]...</p>

<p>s3fs dev_tools /mnt/dev_tools/</p>
</blockquote>

<p>Worth noting you do not need to specify the s3 url, you only specify the bucket name !</p>

<p>The same thing / very similir in&nbsp;/etc/fstab&nbsp;will look like so:</p>

<blockquote>
<p>s3fs#dev_tools /mnt/dev_tools fuse allow_other,user=youruser 0 0</p>
</blockquote>

<p>The mount opts are&nbsp;extreemly important&nbsp;&ndash; without the&nbsp;allow_other&nbsp;flag the user cannot write to the directory.</p>

<p>This is really awesome &ndash; we now jsut need to make sure the connectivity is reliable / fast enough and this will become very usefull. As always hope you find this useful.</p>
