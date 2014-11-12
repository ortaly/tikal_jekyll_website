---
layout: post
title: VMware ext3 partition re-sizing without loosing data ...
created: 1357653164
author: hagzag
permalink: /devops/vmware-ext3-partition-re-sizing-without-loosing-data
tags:
- DevOps
- VMWare
- tune2fs
- fdisk
- ext3
- e2fsck
- VM
---
<p class="c1"><span>One my Virtual appliances in a VMware vSphere environment [VMware Studio to be precise] was clogged up and utilizing 100% of my data partition, by the way this partition was added manually and linked to the VMware Studio build directory, but 20 appliance builds later you are still out of space ... :(</span></p>
<p class="c1"><span class="c4">Disclaimer</span><span>:</span></p>
<p class="c1"><span>This worked for me and if in doubt (which I always have) backup the disk (if you can spare the room ... :), in my case I just duplicated the /dev/sdb HD and I now have the same partition mounted twice so I will perform the following steps (resizing) on /dev/sdc and once I happy with my changes I will remove the old partition, so I mounted /dev/sdb1 as /backup and /dev/sdc1 (cloned HD) as /data.</span></p>
<p class="c1">&nbsp;</p>
<ol>
    <li><strong><span class="c0">Extend</span></strong><span class="c0"> the partition</span><span class="c3">:</span><br />
    From within the vSphere client select the VM, Edit Settings and resize the Virtual Hard disk size in VMware considering you are using Thin Provisioning feel free to give it as much as you think you will use, I increased it from 100GB to 300GB.</li>
    <li><strong><span class="c0">Unmount</span></strong><span class="c3">&nbsp;the active partition [ the one you want to resize ]</span><br />
    <em>umount /dev/sdc1</em></li>
    <li><strong><span class="c0">Remove</span></strong><span class="c0"> the ext3 journal</span><span class="c3">&nbsp;from the file system [basically degrade it to ext2 ...]</span><br />
    tune2fs -O ^has_journal /dev/sdc1<br />
    note the -O ^has_journal option which removes the journal from the partition, if this doesn&rsquo;t work for some reason add the -f  for we will be running fsck after the expansion in any case.</li>
    <li><strong><span class="c0">Re-Partition</span></strong><span class="c0">&nbsp;- step <strong>#1</strong> remove existing </span><span class="c0 c6">sdc1</span><span class="c0">&nbsp;partition</span> <br />
    root@vStudio:~# fdisk /dev/sdc<br />
    The number of cylinders for this disk is set to 39162. There is nothing wrong with that, but this is larger than 1024, and could in certain setups cause problems with: 1) software that runs at boot time (e.g., old versions of LILO) 2) booting and partitioning software from other OSs (e.g., DOS FDISK, OS/2 FDISK)<br />
    Command (m for help): d<br />
    Selected partition 1<br />
    &quot;<em><strong>P</strong></em>&quot; will show the existing partition table on /dev/sdc (this may differ for you of course with /dev/sd&lt;partition<span class="c4">#</span><span>&gt;</span><br />
    You should have nothing now (don&rsquo;t worry fsck will recover it in a sec &hellip;)<br />
    Command (m for help): p<br />
    Disk /dev/sdc: 322.1 GB, 322122547200 bytes<br />
    255 heads, 63 sectors/track, 39162 cylinders<br />
    Units = cylinders of 16065 * 512 = 8225280 bytes<br />
    Disk identifier: 0xd88b5add</li>
    <li><strong><span class="c0">Re-Partition</span></strong><span class="c0">&nbsp;- step <strong>#2</strong> create new </span><span class="c0 c6">sdc1</span><span class="c0">&nbsp;partition (still in fdisk)</span><br />
    Command (m for help): <em><strong>n</strong></em><br />
    Command action<br />
    e extended<br />
    p primary partition (1-4)<br />
    <em><strong>p</strong></em><br />
    Partition number (1-4): <em><strong>1</strong></em><br />
    First cylinder (1-39162, default 1):<br />
    Using default value 1<br />
    Last cylinder or +size or +sizeM or +sizeK (1-39162, default 39162):<br />
    Using default value 39162<br />
    Accepting all defaults will create a partition which will span on the entire disk.<br />
    P option will now return the 300GB partition &hellip; like so:<br />
    Command (m for help): p<br />
    Disk /dev/sdc: 322.1 GB, 322122547200 bytes<br />
    255 heads, 63 sectors/track, 39162 cylinders<br />
    Units = cylinders of 16065 * 512 = 8225280 bytes<br />
    Disk identifier: 0xd88b5add<br />
    Device Boot          Start             End          Blocks   Id  System<br />
    /dev/sdc1                   1           39162   314568733+  83  Linux</li>
    <li><strong><span class="c4">Commit changes</span></strong><span>&nbsp;to partition table:</span> <br />
    Command (m for help): w <br />
    The partition table has been altered! <br />
    <br />
    Calling ioctl() to re-read partition table.<br />
    Syncing disks.</li>
    <li><strong><span class="c4">Declare</span></strong><span>&nbsp;new partition</span><br />
    Some recommend rebooting the machine, but what I found is that fcsk will scan and recover the partition during reboot, thus I used partptrobe.<br />
    So quit fdisk (with &ldquo;q&rdquo;) and type partprobe<br />
    root@vStudio:~# partprobe</li>
    <li><strong><span class="c4">Resize</span></strong><span>&nbsp;file system:</span><br />
    Command (m for help): <em><strong>w</strong></em> <br />
    The partition table has been altered! <br />
    Calling ioctl() to re-read partition table.<br />
    Syncing disks.<br />
    <br />
    root@vStudio:~# <em><strong>e2fsck -f /dev/sdc1</strong></em><br />
    e2fsck 1.40.8 (13-Mar-2008)<br />
    Pass 1: Checking inodes, blocks, and sizes<br />
    Pass 2: Checking directory structure<br />
    Pass 3: Checking directory connectivity<br />
    Pass 4: Checking reference counts<br />
    Pass 5: Checking group summary information<br />
    data: 4193/6553600 files (8.6% non-contiguous), 23476426/26214055 blocks<br />
    root@vStudio:~# <em><strong>resize2fs /dev/sdc1</strong></em><br />
    resize2fs 1.40.8 (13-Mar-2008)<br />
    Resizing the filesystem on /dev/sdc1 to 78642183 (4k) blocks.<br />
    The filesystem on /dev/sdc1 is now 78642183 blocks long.</li>
    <li><strong><span class="c4">Regenerate</span></strong><span>&nbsp;journal [ext3]</span><br />
    root@vStudio:~# tune2fs -j /dev/sdc1<br />
    tune2fs 1.40.8 (13-Mar-2008)<br />
    Creating journal inode: done<br />
    This filesystem will be automatically checked every 28 mounts or<br />
    180 days, whichever comes first.  Use tune2fs -c or -i to override.</li>
</ol>
<p>&nbsp;</p>
<p>So that&rsquo;s about it run mount &ndash;a &amp; df &ndash;h to check your results:<br />
root@vStudio:~# <em><strong>mount -a</strong></em><br />
root@vStudio:~# <em><strong>df -h</strong></em><br />
Filesystem&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Size  Used Avail Use% Mounted on<br />
/dev/sda5 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 50G   16G   31G  35% /<br />
varrun&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;252M  184K  252M   1% /var/run<br />
varlock&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;252M         0  252M   0% /var/lock<br />
udev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;252M   52K  252M   1% /dev<br />
devshm&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 252M         0  252M   0% /dev/shm</p>
<p>lrm&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;252M   40M  213M  16% /lib/modules/2.6.24-26-generic/volatile</p>
<p>/dev/sda1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;122M   23M   93M  20% /boot</p>
<p>/dev/sdb1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;100G   89G  5.4G  95% /backup</p>
<p>/dev/sdc1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>298G</strong>   89G  197G  32% /data &nbsp;</p>
