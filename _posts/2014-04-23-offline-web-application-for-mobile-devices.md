---
layout: post
title: Offline Web Application for mobile devices
created: 1398256991
author: oren
permalink: offline-web-application-for-mobile-devices
tags:
- JS
- offline
- web application
- indexedDB
- Web SQL
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:16px;"><span style="background-color: transparent; color: rgb(0, 0, 0); font-family: Arial; white-space: pre-wrap; line-height: 1.2em;">How to develop an offline application for mobile?</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">Today, we&#39;re developing an offline web application, targeted at the mobile market.<br />
One of the main application requirements for the app is to work offline - it should work even when there is no network.</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="background-color: transparent; color: rgb(102, 102, 102); font-family: 'Trebuchet MS'; font-size: 16px; font-weight: bold; white-space: pre-wrap; line-height: 1.2em;">We had two main requirements:</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">1. The app using &nbsp;a lot of data, more than 5 MB - &nbsp;we couldn&#39;t use local storage because its size limitation.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">2. The app should work when there is no network.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">In this post, I will list the solution that we found to the first requirement.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<h3 dir="ltr" style="line-height:1.15;margin-top:8pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 16px; font-family: 'Trebuchet MS'; color: rgb(102, 102, 102); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">How to store data in the browser?</span></span></h3>

<p dir="ltr"><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(34, 34, 34); vertical-align: baseline; white-space: pre-wrap;">Html 5 has a new feature called </span><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">indexedDB</span></a><span style="background-color: transparent; font-size: 19px; font-family: Arial; color: rgb(85, 85, 85); vertical-align: baseline; white-space: pre-wrap;"> - </span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); vertical-align: baseline; white-space: pre-wrap;">It replaced the older (W3C deprecated) </span><a href="http://html5doctor.com/introducing-web-sql-databases/" style="line-height: 1.15; text-decoration: none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Web SQL</span></a><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); vertical-align: baseline; white-space: pre-wrap;"> database. The IndexedDB web database allows your HTML5 web application to store data associated with a </span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); font-style: italic; vertical-align: baseline; white-space: pre-wrap;">host/protocol/port,</span><span style="background-color: transparent; font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); vertical-align: baseline; white-space: pre-wrap;"> locally on the client&rsquo;s hard-drive. Unlike LocalStorage, which lets you store data using a simple key-value pair only, the IndexedDB is more powerful and useful for applications that requires you to store a large amount of data.</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="background-color: transparent; color: rgb(17, 17, 17); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">As a sidenote, at this time we only need a quota of 10MB for storage.</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Also, currently we don&rsquo;t have to use the capabilities of a relational databases such as complex queries, etc. (we may need later).</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<h3 dir="ltr" style="line-height:1.15;margin-top:8pt;margin-bottom:0pt;"><span style="background-color: transparent; color: rgb(102, 102, 102); font-family: Arial; font-size: 16px; font-weight: bold; white-space: pre-wrap; line-height: 1.2em;">The first challenge we encountered - Safari browser doesn&rsquo;t support indexedDB.</span></h3>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">safari </span><a href="http://caniuse.com/indexeddb" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">doesn&rsquo;t support indexedDB</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">So we had to use a polyfill to enable IndexedDB using WebSql, we chose </span><a href="http://nparashuram.com/IndexedDBShim/" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">indexedDBShim</span></a><span style="font-family: Arial; color: rgb(17, 17, 17); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"> as the </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">appropriate polyfill.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The use of the indexedDB is not intuitive and therefore we searched for a wrapper that will simplify the work with the indexedDB.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">We found the </span><a href="http://jensarps.github.io/IDBWrapper/" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">IDBWrapper</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(17, 17, 17); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">, a cross-browser wrapper for the HTML5 IndexedDB API. While this API is the future of offline storage, it is not very intuitive to use. IDBWrapper is there to provide easy access to IndexedDB&#39;s features.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p><span style="background-color: transparent; color: rgb(102, 102, 102); font-family: Arial; font-size: 16px; font-weight: bold; line-height: 1.15; white-space: pre-wrap;">The second challenge we encountered - performance</span></p>

<p><span style="background-color: transparent; color: rgb(17, 17, 17); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">While data loading time in the browser chrome on desktop was reasonable (about 20 sec), data loading time was very long on the iPad (few minutes).</span></p>

<p><span style="background-color: transparent; color: rgb(17, 17, 17); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">We found (dev-tools-&gt;resources) that the chrome arrange the data according index of the array (the stored data was array) </span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><img height="293px;" src="https://docs.google.com/a/tikalk.com/drawings/d/shKsTzzk71Yr3OOXVn96N6A/image?w=624&amp;h=293&amp;rev=3&amp;ac=1" style="border: none; transform: rotate(0.00rad); -webkit-transform: rotate(0.00rad);" width="624px;" /></span></p>

<p>&nbsp;</p>

<p><span style="background-color: transparent; color: rgb(17, 17, 17); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">While the safari stores the data in one long string.</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><img alt="devtools safari.jpg" height="229px;" src="https://lh4.googleusercontent.com/_hUbgpXB_dkEF0xRTD83VbJyAdBBAAr1_a53ngc11wn2zuMNhNVudKbCM71vHPSckrc9yhYWc14DhUkmga_PXO5ALAeOypM8pohmoQAfLfTNPQ8m4PzqwvGGJ9SAwokKGg" style="border: none; transform: rotate(0.00rad); -webkit-transform: rotate(0.00rad);" width="624px;" /></span></p>

<p>&nbsp;</p>

<p><span style="background-color: transparent; color: rgb(17, 17, 17); font-family: Arial; font-size: 15px; white-space: pre-wrap; line-height: 1.15;">The solution that solved the performance problem was to divide the data to bulks</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(210, 205, 134); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">..</span><img alt="code.png" height="267px;" src="https://lh6.googleusercontent.com/0KYU2lzkc9Mn4a4d1erBJ4B-Go4YNt6u__KW_pA0B2jAYpBsV98rsxW-Vt3Ou6phPQxHZt0a2TZGYVwoIDzToj_oxTpXHj55Ak2faeCHew5GOndfmcFbNRclSEwj9QK9Ow" style="border: none; transform: rotate(0.00rad); -webkit-transform: rotate(0.00rad);" width="624px;" /><span style="font-size: 15px; font-family: Arial; color: rgb(210, 205, 134); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">....</span></span></p>

<p>&nbsp;</p>

<p><span style="background-color: transparent; color: rgb(102, 102, 102); font-family: 'Trebuchet MS'; font-size: 16px; font-weight: bold; white-space: pre-wrap; line-height: 1.2em;">For Summary</span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-d21b3d6b-8e7b-3395-3293-3382bda05c41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">In order to develop an offline web application, we used the feature indexedDB</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">And we added two libraries indexedDBShim to support safari and</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">IDBWrapper to simplify the usage of indexedDB.</span></span></p>

<div>&nbsp;</div>
