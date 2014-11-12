---
layout: post
title: IZWebFileManager 2.6.2 release is out
created: 1287747480
author: igorz
permalink: /net/izwebfilemanager-262-release-out
tags:
- .NET
- .Net Open Source
---
Hi there!<br /><br />I released IZWebFileManager 2.6.2 which has two new features:<br /><br />1. Now is goes with <span style="font-weight: bold;">French translation</span> - thanks a lot to Cédric Mousset who did it.<br /><br />2. New property <span style="font-weight: bold;">EnableContextMenu</span>. I was asked about this at forum: <a href="http://www.izwebfilemanager.com/forums/thread/591.aspx">http://www.izwebfilemanager.com/forums/thread/591.aspx</a><br />You may disable context menu in the file list by setting this property false (it is true by default)<br />Disabling the context menu will not automatically prevent an actions (such delete file or create new folder). It affects UI only. If you need to disable/cancel an action you have to handle proper event (for example SelectedItemsAction of NewFolderCreating) and cancel the action by setting Cancel=true of event argument.<br /><br />The release is available for download from Google Code<br /><a href="https://code.google.com/p/izwebfilemanager/">https://code.google.com/p/izwebfilemanager/</a>
