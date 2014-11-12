---
layout: post
title: Docker service discovery with skydns and skydock
created: 1391156169
author: hagzag
permalink: /devops/docker-service-discovery-skydns-and-skydock
tags:
- DevOps
- Docker
- skydock
- skydns
- service discovery
---
<p>Hi guys,</p>

<p>I stumbled upon skydock on github =&gt;&nbsp;<a href="https://github.com/crosbymichael/skydock">https://github.com/crosbymichael/skydock</a>,&nbsp;<span style="line-height: 1.6em;">Sky dock uses </span><a href="https://github.com/skynetservices/skydns" style="line-height: 1.6em;">skydns</a><span style="line-height: 1.6em;"> for service resolution via dns using </span><a href="https://github.com/skynetservices/skydns" style="line-height: 1.6em;">skydns</a><span style="line-height: 1.6em;"> service.</span></p>

<p><span style="line-height: 1.6em;">Gave it a try myself and it looks promising especially when skydock and skydns have a small foot print runnig as containers, according to michael he is working on a cross docker feature which means name resolution will work with more than 1 instance of Docker which sounds like a service discovery solution to an entire landscape - Star this repo on github this looks like a killer adon to Docker which will make the usage very very easy in terms of configuration.</span></p>

<p><span style="line-height: 1.6em;">In addition you will see that you also get loadbalancing out of the box - this will be a killer feature when it will be abl to run between more than one Dokcer daemon.</span></p>

<p><span style="line-height: 1.6em;">I followed Michael Crosby&#39;s</span>&nbsp;demo on this awesome tool on youtube:</p>

<p><iframe allowfullscreen="" frameborder="0" height="315" src="//www.youtube.com/embed/Nw42q1ofrV0" width="560"></iframe></p>

<p>As always hoep you find this useful.</p>

<p>HP</p>
