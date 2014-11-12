---
layout: post
title: Simple way of using NuGet
created: 1362926924
author: gil
permalink: simple-way-of-using-nuget
tags:
- DevOps
- Dependency mechanism
- NuGet
- c#
---
<p>&nbsp;</p>
<p>Moving a solution file with reasonable amount of references to work with NuGet is quite easy. What you&#39;ll need to do is to install &quot;NuGet Package Manager&quot; using the following link:&nbsp;http://docs.nuget.org/docs/start-here/installing-nuget, right click each project&#39;s references to remove references that had been added using the browse tab (not .NET, COM and project references) and add them back using the Manage NuGet Packages... option that had been added to the right click references menu after installing the&nbsp;&quot;NuGet Package Manager&quot;.</p>
<p style="color: rgb(0, 0, 0); font-family: arial; font-size: small;"><font color="#222222" face="Arial, Verdana, sans-serif"><span style="font-size: 12px;">After the above will be completed, all your browse references will be&nbsp;available&nbsp;from NuGet and that way you&#39;ll not need to save them into your source control.</span></font></p>
<p>In order to maintain restoring packages, you&#39;ll need to right click your solution in the solution explorer and pick &quot;Enable NuGet Package Restore&quot;. This will create a .nuget folder next to your .sln file and will download three files to that folder:</p>
<p style="color: rgb(0, 0, 0); font-family: arial; font-size: small;"><font color="#222222" face="Arial, Verdana, sans-serif"><span style="font-size: 12px;">1) nuget.exe - the&nbsp;actual&nbsp;NuGet&nbsp;command&nbsp;line.</span></font></p>
<p>2) nuget.config - Configure package sources</p>
<p>3) nuget.targets - Some more nuget configurations (we&#39;ll get back to this one soon)</p>
<p>&nbsp;</p>
<p style="color: rgb(0, 0, 0); font-family: arial; font-size: small;"><font color="#222222" face="Arial, Verdana, sans-serif"><span style="font-size: 12px;">Now you&#39;ll need to add this folder into your source control to maintain restoring packages. Problem is that this folder contain a binary file which you are trying to avoid commiting into your source control. The solution I have found for this problem is to change one configuration in the nuget.targets file (I&nbsp;promised&nbsp;I&#39;ll get&nbsp;back to&nbsp;it :-)). The configuration is:</span></font></p>
<p>&lt;DownloadNuGetExe Condition=&quot; &#39;$(DownloadNuGetExe)&#39; == &#39;&#39; &quot;&gt;true&lt;/DownloadNuGetExe&gt;</p>
<p>The default vale for this parameter if false. Change it to true and commit the file to your source control. Next time a new user will open his Visual Studio, this configuration will automatically download nuget.exe to your .nuget folder.</p>
<p>&nbsp;</p>
<p style="color: rgb(0, 0, 0); font-family: arial; font-size: small;"><font color="#222222" face="Arial, Verdana, sans-serif"><span style="font-size: 12px;">Common 3rdParty packages are available at he official NuGet gallery. If you want to use 3rdParty packages that are not available at the official NuGet gallery or you need DLLs/EXEs that you or your&nbsp;colleagues&nbsp;created in house, you&#39;ll need your own feed/gallery/file server.</span></font></p>
<p>I know Nexus and Artifactory as good artifact server programs for java. Problem is they are not free if you want to use them with NuGet.</p>
<p>I still recommend using them but if you insist on free solution, you can always follow the instruction in the below link:</p>
<p>http://docs.nuget.org/docs/Creating-Packages/Hosting-Your-Own-NuGet-Feeds (starting at &quot;Creating Remote Feeds&quot;).</p>
