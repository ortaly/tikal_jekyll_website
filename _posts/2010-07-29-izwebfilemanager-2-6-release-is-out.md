---
layout: post
title: IZWebFileManager 2.6 release is out
created: 1280413320
author: igorz
permalink: /net/izwebfilemanager-26-release-out
tags:
- .NET
- .Net Open Source
---
Welcome the new generation of  IZWebFileManager - v2.6<br /><br /><span style="font-weight: bold;">What's new?</span><br /><br /><span style="font-weight: bold;">1. Multiple files upload.</span><br />File upload bar allows you to select more then one file to upload at once.<br /><br /><a href="http://picasaweb.google.com/lh/photo/1zUhv5WozayoxLijLsgGgDgAANDkdsfZKq9zdjvyQwU?feat=embedwebsite"><img src="http://lh5.ggpht.com/_XoCEelnLy98/TFGS2NdjGzI/AAAAAAAAKfs/TOmNuUsfwT8/s800/filemanager_multi_upload.png" /></a><br /><br />I added two new resource keys to support localization:<br /><br /><span style="font-style: italic;">Upload_Another_File</span> - default value "Upload Another File", text of the link bellow the browse file box.<br /><br /><span style="font-style: italic;">Upload_File_Remove</span> - default value "Remove", text of the link near to each of browse file boxes.<br /><br />To enable localization of this texts just add a proper resources to WebFileManagerResource.XXX.resx suitable you locale.<br /><br /><span style="font-weight: bold;">2. Upgraded to </span><span style="font-weight: bold;">VS 2010/</span><span style="font-weight: bold;">.NET 3.5.</span><br />Since this release using of IZWebFileManager  requires .NET 3.5 or higher.<br /><br />The release is available for download from Google Code<br /><a href="https://code.google.com/p/izwebfilemanager/">https://code.google.com/p/izwebfilemanager/</a><br /><br /><span style="font-weight: bold;">What's next?<br /><br /></span>In current implementation I use reflection to access some not public API. That causes<span style="font-weight: bold;"> </span>application fail when run in Medium trust environment. (<a href="http://www.izwebfilemanager.com/forums/thread/543.aspx">http://www.izwebfilemanager.com/forums/thread/543.aspx</a>)<span style="font-weight: bold;"><br /></span><br />So, in the next release I will solve this problem.<span style="font-weight: bold;"><br /><br />Thanks for support!<br /></span>
