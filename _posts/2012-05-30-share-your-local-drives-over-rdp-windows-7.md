---
layout: post
title: Share your local drives over RDP - Windows 7
created: 1338394544
author: avit
permalink: /share-your-local-drives-over-rdp-windows-7
tags:
- Ruby
- web
---
<p>Hi All,</p>

<p>You probably work quite a bit with RDP connections to multiple servers around the globe. I’m currently running 6 servers in Israel, 4 in the US and some more around the world.</p>

<p>Uploading materials or downloading is sometimes quite a mission to handle if you don’t know this crazy little method.</p>

<p>You can share your local drives so that it will be visible to remote connections you manage, those drives are only mapped when you are connected and not someone else, so they are secure and easy to use.</p>

<p>You probably are doing what I did when I discovered this method, grabbing and pulling hard on your hair.</p>

<p>STOP!</p>

<p>Here is how you do it.</p>

<p>I’m using Windows 7 RC2, but it’s the same in Vista, I can’t remember XP (OLD!), but I think you can do it in XP as well, it doesn’t seem like Microsoft did changes in this app.</p>

<p>First, let’s open RDP connection:</p>

<p>Start—>Run—>mstsc and click ENTER</p>

<p>This dialog popped up right?</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114421PM.png'><img alt='6-16-2009 11-44-21 PM' border='0' height='152' src='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114421PM_thumb.png' style='display: inline; border: 0px;' title='6-16-2009 11-44-21 PM' width='244' /></a>
<p>Type in your computer (remote) name or IP address and click the options arrow (bottom left)</p>

<p>Once you do that a dialog opens up. Click “Local Resources”… as shown in this image</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114559PM.png'><img alt='6-16-2009 11-45-59 PM' border='0' height='141' src='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114559PM_thumb.png' style='display: inline; border: 0px;' title='6-16-2009 11-45-59 PM' width='244' /></a>
<p>Then click the ‘”More” button (bottom left), another dialog will pop open, and you will be able to check/uncheck the drives you want to share with the remote computer at the time of the connection.</p>

<p>Let’s hit “Connect” and open up “My Computer” on the remote server.</p>

<p>This is how my it looks now:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114944PM.png'><img alt='6-16-2009 11-49-44 PM' border='0' height='184' src='http://www.kensodev.com/wp-content/uploads/2009/06/6162009114944PM_thumb.png' style='display: inline; border: 0px;' title='6-16-2009 11-49-44 PM' width='244' /></a>
<p>You can now download, Upload, copy, Paste and practically do whatever you want, it is like you are working on your local files.</p>

<p>Keep in mind: If you leave a folder (local) open on the server and you don’t log off, this folder is now “read only” you won’t be able to delete the folder from your computer untill you log off the remote connection.</p>

<p>Good luck!</p>

<p>I would love to hear and read your comments.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/SZCOnmWCnlU" height="1" width="1"/>
