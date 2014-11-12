---
layout: post
title: Port Forwarding to Broadcast Requests using Iptables
created: 1314790677
author: roni
permalink: port-forwarding-to-broadcast-requests-using-iptables
tags:
- DevOps
- firewall
---
<p>As a part of the last product I am working on, we developed an inherent DHCP server (initiated in a independent thread of tomcat server). The DHCP server is listening to port 9067 instead of port 67 (the original DHCP server port), because we didn&#39;t want the product required root privileges. The solution was to use high ports for the server open sockets and forward to them from the original ports using iptables, which is a part of the OS (Linux / Unix).</p>
<p>We wrote the same port forwarding rule for each port we would like to forward. We use the REDIRECT action on the PREROUTING chain, for example we tried the following rule for forwarding to our DHCP server:</p>
<pre class="brush: jscript;gutter: false; " title="code">
sudo iptables -A PREROUTING -t nat -i eth0 -p udp --dport 67 -j REDIRECT --to-port 9067</pre>
<p>After almost week of tests and simulations we saw that the DHCP request packet is blocked somewhere in the middle, when other requests to different ports e.g. ftp, ntp etc. were redirected as expected.</p>
<p>We saw that the reason for this unwelcome occurrence was because of the special flow of DHCP in which the request is a broadcast request (source ip: 0.0.0.0 / destination ip: 255.255.255.255).</p>
<p>The REDIRECT rule is not good enough for this kind of packet, the action that should be used is DNAT to our wild ip (0.0.0.0) with port 9067. So the rule should be looked something like this:</p>
<pre class="brush: jscript;gutter: false; " title="code">
sudo iptables -I PREROUTING -t nat -i eth0 -p udp --src 0.0.0.0 --dport 67 -j DNAT --to 0.0.0.0:9067
</pre>
<p>After doing this and waiting a few seconds till the rules are committed, we finally got the DHCP request to our DHCP server that is listening to port 9067.</p>
<p>It&#39;s a little tricky but might be saved a lot of time for you.</p>
