---
layout: post
title: Choosing your Linux/Unix production Operating System
created: 1288181033
author: yanai
permalink: /java/choosing-your-linuxunix-production-operating-system
tags:
- JAVA
- Linux Redhat Ubuntu Solaris
---
<p><style type="text/css">p { margin-bottom: 0.08in; }</style></p>
<p style="margin-bottom: 0in;">One of the our customers, using Ubuntu OS to develop its next gen product, considers the best OS for his product. The product is NOT service based, but an &ldquo;appliance&rdquo; computer with OS and all software artifacts installed on it , shipped and deployed to his customers. A natural question would be, which OS to choose for production ?</p>
<p style="margin-bottom: 0in;">One option is we use Ubuntu also for production, lowering our QA time, testing time (system-test, stress tests etc) , training (people are less experienced on Linux/Unix world) etc. Going this way the customer can reduce expenses for the product development. Alternatively, he can use one (or even more , in case there will be demand for it) of the commercial and common OS like Redhat and Solaris.</p>
<p style="margin-bottom: 0in;">We can look on it with two different views : technical and marketing. On the technical level many questions comes to mind: among other are security, support, stability, performance etc. On the marketing level its the time and money (as explained above) and on top of that, making the product itself more expensive for the end customer (especially he uses the commercial OS and NOT&nbsp;CentOS).</p>
<p style="margin-bottom: 0in;">Let me just say , the developed product is pure Java. However, the product product also includes 3<sup>rd</sup> parties component which are OS dependent (i.e. MySQL, Apache). That been said, from development perspective, we will probably NOT change the code, but from other aspects, including build distribution, installer, QA, testing, performance, configuration, managment, tools, and other technical aspects, it surly influence the product agenda and life-time.</p>
<p style="margin-bottom: 0in;">Since my experience is mostly with Ubuntu (both on development and production), I decided to research about it. I read some interesting thread <a href="http://ubuntuforums.org/showthread.php?t=486830">like this one</a>, however, the most valuable answers I've got were from my colleagues at Tikal (please see their comments at the end) &ndash; <a href="http://www.tikalk.com/users/ittayd">Ittay</a> and <a href="http://www.tikalk.com/users/hagzag">Haggai</a>.</p>
<p style="margin-bottom: 0in;">Considering their opinion other links I've read, it seems to me, that Ubuntu is much more convenience for development than other Linux (both commercial and and open source) and Unix distribution. However, for production usage, RedHat is considered to be superior on Ubuntu for most of the technical levels.<br />
The argument to use Ubuntu on production is of course ... money (the marketing view) - the development team will use the same environment for production and will NOT have to invest QA and time on yet another OS. In addition, the price for commercial Ubuntu may be cheaper than Redhat making the PO cheaper to the customer. However, <a href="http://ubuntuforums.org/showthread.php?t=486830&amp;page=2">as detailed here</a> when considering money aspect, it might end as narrow lookup.</p>
<p style="margin-bottom: 0in;">I put here both <a href="http://www.tikalk.com/users/hagzag">Haggai</a> and <a href="http://www.tikalk.com/users/ittayd">Ittay</a> replies (thanks again guys) as a reference:</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Haggai :</p>
<p><i><b>&quot;The fact is RedHat is more reliable / stable than ubuntu, thus more common in the commercial / enterprise market.</b></i></p>
<p><i><b>Convincing one to use ubuntu would be quite hard for the commercial support for ubuntu server side isn't mature enough to convince big companies to trust it.</b></i></p>
<div><i><b>Ubuntu is a flavor of choice for developers due to it's cutting edge adaptation unlike redhat / centos which are much more conservative you can use the release cycle as a benchmark for that fact.</b></i></div>
<div><b>Nevertheless, if you are shipping a blackbox which means the end customer dissent have shell access you can of course embed any flavor you want.&quot;</b></div>
<p>Ittay :&nbsp;</p>
<p><i><b>&quot;Traditionally, RedHat dominates the server-linux market. It has been there longer, offers more mature tools and sysadmins know it best. Ubuntu dominates the desktop-linux market and has just recently entered the server market.<br />
I would have expected RHEL to be the first distro to be supported. Supporting just ubuntu server because it is similar to the desktop environment in which you develop looks like a weak reasoning. I'm surprised no client complained about this before.<br />
&quot;...<br />
&quot;The choice between CentOS and RHEL is the choice of support. I don't think many datacenters will rely on CentOS. However, it is a good platform to develop and test a product in when out-of a datacenter.<br />
While not knowing the exact reasons it is difficult for the customer to support RedHat (maybe just the need to install a few servers?), the way to support many Linux distributions is by following the LSB standard (<a class="moz-txt-link-abbreviated" href="http://www.linuxbase.org/">www.linuxbase.org</a>) which is supported by all major distributions.&quot;</b></i>...<br />
<i><b>&quot;The thing is there's no such thing as a &quot;black box linux&quot; for data centers. In Windows, the vendor of the distribution is always the same (Microsoft) regardless of version. The tools are also similar and the personnel knows them all. In Linux you have different vendors, each with his/her own set of tools which are usually centralized and can manage only machines with the vendor's distribution. <br />
IMHO, they have only one choice and that is to standardize on LSB and test on RHEL (probably different versions of it). They may also need to provide packages (rpm, deb) for each distribution they want to support, mainly to allow for patch management (again, vendor specific). &quot;</b></i></p>
<p>&nbsp;</p>
<p>I hope this post can put some light for you when you come across these same questions for you product.</p>
<p>&nbsp;</p>
