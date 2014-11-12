---
layout: post
title: Creating an image for OpenStack (windows + Ubuntu that'll perform as Jenkins
  slave)
created: 1356973351
author: gil
permalink: /devops/creating-image-openstack-windows-ubuntu-thatll-perform-jenkins-slave
tags:
- DevOps
- tikal
---
<div>As part of Tikal's 6th fuse day, our (ALM team) goal was to integrate Jenkins, Chef and OpenStack.</div>
<div>One of the tasks was to learn how to create an image that will be hosted on OpenStack cloud controller.</div>
<div>&nbsp;</div>
<div>Looking over the net I have found some very useful tutorials that had guide me in creating windows and ubuntu images.&nbsp;</div>
<div>Links to these tutorials are:</div>
<div>windows - http://networkstatic.net/building-a-windows-image-for-openstack/ (Thanks to Brent Salisbury)</div>
<div>ubuntu &nbsp; - https://help.ubuntu.com/12.04/serverguide/jeos-and-vmbuilder.html (Thanks to ubuntu documentation)</div>
<div>&nbsp;</div>
<div>What I want to add in this post are some insights I have in addition to the above tutorials.</div>
<div>As for the windows tutorial, I have found that the following command did not work for me:</div>
<div><strong>kvm -m 2048 -no-reboot -boot order=d -drive file=windowsr2.img,if=virtio,boot=off -drivefile=windows-2008r2.iso,media=cdrom,boot=on -drive file=virtio-win-0.1-30.iso,media=cdrom,boot=off -net nic,model=virtio -nographic -vnc :1</strong></div>
<div>&nbsp;</div>
<div>For some reason, the &quot;-m&quot; flag does not support numbers that are bigger than 2047 therefore I have used 2047 instead and everything worked smoothly after that.</div>
<div>Moreover, I had to enable Rdesktop on the windows machine to be able to connect from my host.</div>
<div>&nbsp;</div>
<div>I still haven't tried to launch this image using Jenkins so I cannot add anything on this but image creation is being done by VNC connection to the image. It makes it easier to install what ever we need to make it work from Jenkins.</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>My main goal was to create a Ubuntu image that'll be able to be launched from Jenkins. The above tutorial explains perfectly how to create a ubuntu image for OpenStack. Problem was that I didn't know what do I need in order to make it work with Jenkins.</div>
<div>I have found out that I need the following packages:</div>
<div>openssh-server - obviously to be able to connect using ssh)</div>
<div>openjdk-7-jre &nbsp; &nbsp; - for the jenkins slave</div>
<div>aptitude</div>
<div>cloud-init</div>
<div>&nbsp;</div>
<div>So my final command was:</div>
<div><strong>vmbuilder kvm ubuntu --suite precise --flavour virtual --arch amd64 -o --libvirt qemu:///system --user tikal --name tikal --pass tikal --addpkg openssh-server --addpkg openjdk-7-jre --addpkg aptitude --addpkg cloud-init</strong></div>
<div>&nbsp;</div>
<div>When the image was ready, I still had problems with creating a jenkins slave. I have found out that the jenkins is trying to run a command and constantly fails. I have launched that image and found that user tikal is part of sudoers but requires password in order to run sudo commands. I read some more about vmbuider and found out that vmbuilder uses a sudoers template file. This file lies under the following folder in Ubuntu OS:</div>
<div><strong>/etc/vmbuilder/ubuntu/sudoers.tmpl</strong></div>
<div>&nbsp;</div>
<div>The default content looks like this:</div>
<div><strong># /etc/sudoers</strong></div>
<div><strong>#</strong></div>
<div><strong># This file MUST be edited with the 'visudo' command as root.</strong></div>
<div><strong>#</strong></div>
<div><strong># See the man page for details on how to write a sudoers file.</strong></div>
<div><strong># Defaults</strong></div>
<div><strong><br />
</strong></div>
<div><strong>Defaults &nbsp; &nbsp; &nbsp; &nbsp;!lecture,tty_tickets,!fqdn</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Uncomment to allow members of group sudo to not need a password</strong></div>
<div><strong># %sudo ALL=NOPASSWD: ALL</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Host alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># User alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Cmnd alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># User privilege specification</strong></div>
<div><strong>root &nbsp; &nbsp;ALL=(ALL) ALL</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Members of the admin group may gain root privileges</strong></div>
<div><strong>&shy;min ALL=(ALL) ALL</strong></div>
<div>&nbsp;</div>
<div>I have changed it to look like that before running the vmbuilder command:</div>
<div><strong># /etc/sudoers</strong></div>
<div><strong>#</strong></div>
<div><strong># This file MUST be edited with the 'visudo' command as root.</strong></div>
<div><strong>#</strong></div>
<div><strong># See the man page for details on how to write a sudoers file.</strong></div>
<div><strong># Defaults</strong></div>
<div><strong><br />
</strong></div>
<div><strong>Defaults &nbsp; &nbsp; &nbsp; &nbsp;!lecture,tty_tickets,!fqdn</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Uncomment to allow members of group sudo to not need a password</strong></div>
<div><strong># %sudo ALL=NOPASSWD: ALL</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Host alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># User alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Cmnd alias specification</strong></div>
<div><strong><br />
</strong></div>
<div><strong># User privilege specification</strong></div>
<div><strong>root &nbsp; &nbsp;ALL=(ALL) ALL</strong></div>
<div><strong>tikal ALL=NOPASSWD: ALL</strong></div>
<div><strong><br />
</strong></div>
<div><strong># Members of the admin group may gain root privileges</strong></div>
<div><strong>#&shy;min ALL=(ALL) ALL</strong></div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div>
<div>&nbsp;</div>
</div>
<p>&nbsp;</p>
