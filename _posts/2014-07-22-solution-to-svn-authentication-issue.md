---
layout: post
title: Solution to SVN authentication issue
created: 1406011435
author: yorammi
permalink: "/devops/Solution_SVN_auth_issue"
tags:
- DevOps
- svn
- Centos
- Authentication
- E210007
- ldap
- SASL
---
<p><span style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">svn: E210007: Cannot negotiate authentication mechanism</span></p>

<p>I&#39;ve encountered the above&nbsp;error when trying to activate an Subversion (SVN) action from a Centos server which resides in one of the corporate domains into an SVN server that resides in another corporate domains.</p>

<p><u><strong>The problem</strong></u>:</p>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">&gt; <strong>svn info svn://svn/repo</strong></div>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">svn: E210007: Unable to connect to a repository at URL &#39;svn://svn/<span style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">repo</span>&#39;</div>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">svn: E210007: Cannot negotiate authentication mechanism</div>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">&nbsp;</div>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">
<p><u><strong>The solution</strong></u>:</p>
The solution for the issue is to run the following insallation command:</div>

<div style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">&gt;&nbsp;<b style="color: rgb(0, 0, 0); font-family: arial, sans-serif; line-height: normal;">sudo yum install cyrus-sasl cyrus-sasl-plain cyrus-sasl-ldap</b></div>
