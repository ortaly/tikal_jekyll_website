---
layout: post
title: FuseDay 2013 Android – Tikal share
created: 1372701710
author: michaelh
permalink: /incubator/fuseday-2013-android-–-tikal-share
tags:
- Incubator
- Fuse day
- Android
- YouTube
- Fuseday
---
<p>&nbsp;</p>
<p>In this Android Session of FuseDay June 2013 we took on the task of creating an interactive cross-device (Android) Tikal video knowledge base.&nbsp; The app needed to be easy and enjoyable to use and at the same time allow the user to peruse the content of the (future) Tikal YouTube channel.</p>
<p><strong><span style="font-size:14px;">Video ViewPager Lists</span></strong></p>
<p>In order to present the videos to the user, the app was designed to display a set of lists.&nbsp; Each list would be tied to a specific programming area, and these different &ldquo;pages&rdquo; of programming combined together to comprise the Tikal YouTube channel library.&nbsp; The ViewPager component made a perfect fit for that aspect of the application and each view in the ViewPager would be a different programming subject and contain a list of the videos for that subject.</p>
<p>In order to collate that data, each playlist in the (future) Tikal YouTube channel would represent a programming subject and a data requesting component in the app grabs that data from YouTube using the V2 API.</p>
<p><strong><span style="font-size:14px;">Caching</span></strong></p>
<p>In order to utilize the data the data requester pulls for future launches a caching component was created to display the old data until the data requester can update anything outdated.</p>
<p><strong><span style="font-size:14px;">YouTube Player</span></strong></p>
<p>If the user clicks on an item in one of the ViewPager lists a new view will be opened containing a YouTubePlayerView from the new YouTube Android API.&nbsp; The YouTubePlayerView will allow the user to watch the video and give the application extra control to monitor the user&rsquo;s interactions with the video.&nbsp; This data can then be used to sync the user&rsquo;s data for future viewings.</p>
<p><strong><span style="font-size:14px;">Data Sync using Mobile Backend Starter</span></strong></p>
<p>The newly minted Mobile Backend Starter by Google (one click deployable cloud services) were integrated into the application in order to save the user&rsquo;s place in each video for future viewing on the same device or other Android devices.&nbsp; When the user re-opens a video for viewing the video will continue from where the user last left off.</p>
<p><strong><span style="font-size:14px;">Summary</span></strong></p>
<p>All put together the application presents users with an intuitive interface for viewing the information they need and save their progress in their learning. Below are some helpfull links related to this FuseDay Project.</p>
<p>&nbsp;</p>
<p><a href="http://android-developers.blogspot.fr/2013/06/bootstrap-your-apps-cloud-services-with.html?utm_source=%23AndroidDev+Weekly&amp;utm_campaign=6d31ebe35c-NEWSLETTER&amp;utm_medium=email&amp;utm_term=0_f921dd69d1-6d31ebe35c-75658169">Mobile Backend Starter by Google</a></p>
<p><a href="https://developers.google.com/youtube/android/player/">YouTube Android API</a></p>
<p>&nbsp;</p>
