---
layout: post
title: Authentication and Authorization as an open source solution service
created: 1383563361
author: idan.fridman
permalink: /incubator/authentication-and-authorization-open-source-solution-service
tags:
- JAVA
- Java security web
---
<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">&nbsp;</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">Designing&nbsp;a centralized&nbsp;service&nbsp;for all&nbsp;user&nbsp;data by implementing authentication and authorization (a&amp;a) mechanism.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">I&#39;ll share my experience and finalize conclusions for a solution.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">The design includes the clients (Web applications) and the server (a&amp;a center).</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);"><span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Terminology:</span></p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">1. Authentication:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">Authentication is the mechanism whereby systems may securely identify their users.<br style="line-height: 2; -webkit-font-smoothing: antialiased;" />
Answering the question &quot;Who is the User?&quot;<br style="line-height: 2; -webkit-font-smoothing: antialiased;" />
Authentication also includes SSO (Single sign on). A mechanism which giving the users the ability to sign-on once and get &#39;free pass&#39; to all participating resources without an additional sign&#39;s.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">2. Authorization:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">Authorization is the process of verifying if the user has role/permission to access certain resources or sections.<br style="line-height: 2; -webkit-font-smoothing: antialiased;" />
Answering the question: Is user X authorized to access resource/Operation Y?</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">3. Secured clients:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">Usually the a&amp;a mechanism working against&nbsp;secured client frameworks: Spring security, Apache Shiro, Wicket Authentication and so on. I will review these later on that post.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);"><span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Main subjects to consider:&nbsp;</span></p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">1. Authentication server</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">2. Secured web clients framework</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">3. Authorization responsibilities</p>

<p data-mce-style="text-align: left;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);"><span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Full solution providers</span>:</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">In my research I came across full solution providers:</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">* Open AM ( known as OpenSSO) - &nbsp;They claim to be an open source&nbsp;project. But after a little while you find out that it&#39;s indeed an open source&nbsp;but not for a commercial use. You need to pay big amount of $$$ for having their&nbsp;a&amp;a package.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">* Crowd - By Atlassian. Seems like a fast, good and very cheap solution. But we still heading into a completely commercial&nbsp;open source solution. This one didn&#39;t&nbsp;fit our needs as well.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);"><span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Secured Clients:</span></p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">* Spring Security: &nbsp;Very popular and widely used. Spring Security demands lots of xml configurations when you want to have more than just a basic setup.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">Additionally if you need to support permissions (and not just roles), Spring security doesn&#39;t&nbsp;support it out of the box.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">* Apache Shiro: - Great product. Very straight forward configuration and permissions support out of the box.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">The problem is that Shiro&#39;s community still considered small and the project is pretty new.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);"><span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Solution:</span></p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">1.&nbsp;<span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Authentication server</span>:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">I came across CAS (Central Authentication Serivce)&nbsp;- &nbsp;great and completely open source project. CAS provides SSO solutions and supports popular protocols such as SAML, OPENID, Auth.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">So if we integrate CAS with an LDAP server (To hold our users&#39; information) we achieve&nbsp;our authentication&nbsp;model (and having SSO out of the box).</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">CAS is based on Spring and very easy to extend in case we want to make&nbsp;custom changes. You can download the source code easily and custom it the way you want it.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">CAS configuration is pretty easy and well documented.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">2.&nbsp;<span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Secured clients framework:</span></p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">I chose Spring Security. Three reasons:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">1. The web application is a Spring based.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">2. Popular and the community behind is more than enough.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">3. Integrates perfectly with CAS.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">* I mention that Spring security lack of permissions. But there&#39;s&nbsp;a workaround. Short example can be found here:&nbsp;<a data-mce-="" href="http://en.tekstenuitleg.net/blog/spring-security-with-roles-and-rights" style="line-height: 2; -webkit-font-smoothing: antialiased; color: rgb(33, 117, 155);">http://en.tekstenuitleg.net/blog/spring-security-with-roles-and-rights</a></p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">So far we have Spring Security, Cas, and LDAP (OpenLdap) server.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">3.&nbsp;<span data-mce-style="text-decoration: underline;" style="line-height: 2; -webkit-font-smoothing: antialiased; text-decoration: underline;">Authorization responsibilities:</span></p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">That one might be tricky depends on your project requirements. You could configure your authorization&nbsp;flow in two ways:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">a. Centralized authorization:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">&nbsp; &nbsp; CAS support attributes. That means you could add additional&nbsp;attributes (roles/permissions) to the returning response (via SAML it&#39;s pretty straightforward).</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">&nbsp; &nbsp; You could actually choose and configure from which source to pull the additional attributes (Database, Ldap, Active Directory and more).</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">&nbsp; &nbsp; That&#39;s a very neat and elegant solution - &nbsp;one central which able to deliver on request the authentication and the authorization roles/permissions per user.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">b. Decentralize authorization:</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">&nbsp; &nbsp; You could configure Spring Security by extending the&nbsp;UserDetails interface. And then let each application to control the authorization&nbsp;logic after a successful authentication.</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">* There is an open debate whether each web client application should be responsible for its authorization logic or centralized&nbsp;it (As I described&nbsp;at Point No.&nbsp;1).</p>

<p data-mce-style="padding-left: 30px;" style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80); padding-left: 30px;">&nbsp; I suggest to determine the&nbsp;right attitude&nbsp;by your project&nbsp;requirements use cases.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">We finished by having a completely a&amp;a open source solution for commercial&nbsp;use.</p>

<p style="font-family: Helvetica, Arial, sans-serif; line-height: 2; -webkit-font-smoothing: antialiased; margin-bottom: 20px; -webkit-margin-before: 0px; color: rgb(80, 80, 80);">Idan.</p>
