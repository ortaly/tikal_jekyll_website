---
layout: post
title: Building iOS Apps over-the-air site
created: 1381815579
author: yorammi
permalink: building-ios-apps-over-the-air-site
tags:
- DevOps
- iOS
- over-the-air
- TestFlight
---
<h3><strong>Simple steps for creating iOS Apps over-the-air web-site.</strong></h3>

<p>A company who develop&nbsp;many iOS applications needs to test those applications first and need to be able to distribute it between the teams (QA, integration and other users), before uploading it to the AppStore.</p>

<p>A good solution for those needs is&nbsp;<a href="http://testflightapp.com" target="_blank">http://testflightapp.com</a>&nbsp;but:</p>

<ul>
	<li>We encountered many issues with the service, especially with their upload API the is not very reliable. Also their user interface lack of some basic features such as good search options and filtering.</li>
	<li>It is a cloud service - sometimes you want a faster service that will enable you to upload a new test applications and download it to a device within minutes or even seconds - upload and download from the cloud can be a factor for fast or slow ALM service.</li>
	<li>The site is not organized in a corporate-related-logic - if the company&#39;s applications should be divided into sections that is relavant only to the company, there is no way to do it in TestFlight.</li>
	<li>The information displayed for each application and/or build can lack corporate information such as internal-version (which can be different than that one on the AppStore), corporate-relevant-build-information and more.&nbsp;</li>
</ul>

<p>Building an alternative web-site should be considered for such needs, but be aware of the lost of the good features that TestFlight provides such as devices-management, users-management, application-upload-service and more.</p>

<p>For building the site you need - for each application - only 2 files:</p>

<ul>
	<li>The IPA file - there are many good guides on the web for creating it and it is beyond the scope of this post</li>
	<li>IPA-matching .plist file.</li>
</ul>

<p>For a good web-site, it is better that each application will be provided also with:</p>

<ul>
	<li>Application-related image</li>
	<li>Information about the application such as build information, version-information and any information that you want to display about the application</li>
</ul>

<p>The format of the application .plist file is as such:</p>

<hr />
<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;">&lt;?<span class="s1">xml</span> version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span></div>

<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;"><span style="line-height: 1.6em;">&lt;!DOCTYPE </span><span class="s1" style="line-height: 1.6em;">plist</span><span style="line-height: 1.6em;"> PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span></span></div>

<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;"><span style="white-space: pre-wrap; line-height: 1.6em;">&lt;plist version=&quot;1.0&quot;&gt;</span></span></span></div>

<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;"><span style="line-height: 1.6em; white-space: pre-wrap;">&lt;dict&gt;</span></span></span></div>

<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;">&nbsp;&nbsp;&nbsp; &lt;key&gt;items&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;array&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="s1">&lt;dict&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;assets&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;array&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="s1">&lt;dict&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;kind&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;software-package&lt;/string&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;<span class="s1">url</span>&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;<strong>&lt;URL of IPA file&gt;</strong>&lt;/string&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="s1">&lt;/dict&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/array&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;<span class="s1">metadata</span>&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="s1">&lt;dict&gt;</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;bundle-identifier&lt;/key&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;<strong style="font-size: 11px; font-family: 'courier new', courier, monospace; line-height: 1.6em;">&lt;application bundle ID&gt;</strong><span style="line-height: 1.6em;">&lt;/string&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;bundle-version&lt;/key&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;</span><strong style="font-size: 11px; font-family: 'courier new', courier, monospace; line-height: 1.6em;">&lt;application version&gt;</strong><span style="line-height: 1.6em;">&lt;/string&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;kind&lt;/key&gt;</span></span></span></div>

<div class="p1"><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;software&lt;/string&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;key&gt;title&lt;/key&gt;<br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;string&gt;</span><strong style="font-size: 11px; font-family: 'courier new', courier, monospace; line-height: 1.6em;">&lt;application title&gt;</strong><span style="line-height: 1.6em;">&lt;/string&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span class="s1" style="line-height: 1.6em;">&lt;/dict&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span class="s1" style="line-height: 1.6em;">&lt;/dict&gt;</span><br />
<span style="line-height: 1.6em;">&nbsp;&nbsp;&nbsp; &lt;/array&gt;</span><br />
<span style="line-height: 1.6em;">&lt;/dict&gt;</span><br />
<span style="line-height: 1.6em;">&lt;/plist&gt;</span></span></span></div>

<hr />
<p>The files should be better placed in the same folder (for making the web page build simplier) and for each application the web page should contain a link with the following format:</p>

<hr />
<p><span style="font-size:9px;"><span style="font-family:arial,helvetica,sans-serif;">&lt;a href=&quot;itms-services://?action=download-manifest&amp;amp;url=<strong>&lt;URL of the .plist file&gt;</strong>&quot;&gt;<strong>&lt;Test and/or image to describe the application&gt;</strong>&lt;/a&gt;</span></span></p>

<hr />
<p>Make sure also that the mime type of the plist file in the site is &#39;text/xml&#39;.</p>

<p>That&#39;s it!</p>

<p>The rest of the site handling and build is up to your needs and you can build it to fit your corporate needs and have it include all the needed information.</p>

<p>Enjoy,</p>

<p>Yoram Michaeli</p>

<p><a href="mailto:yorammi@tikalk.com">yorammi@tikalk.com</a></p>

<pre>
&nbsp;</pre>
