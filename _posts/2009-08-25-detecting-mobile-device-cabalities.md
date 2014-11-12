---
layout: post
title: Detecting Mobile Device Cabalities
created: 1251178333
permalink: detecting-mobile-device-cabalities
tags:
- JAVA
- ASP.NET
- .Net Open Source
- WAP
- Mobile
---
<p>Some web applications require interaction with mobile devices. A key ingredient when writing such application for mobile devices is figuring out which device &quot;talks&quot; with our server, serve it with best fit markup, and make correct business-logic decisions (i.e. send the correct video format, setup package, etc.)</p>
<p>&nbsp;</p>
<p>There are several tools that help us to cope with these challenges, all of them are built on top of a database (mostly XML files) which contains a mapping between devices and User Agents.</p>
<p>&nbsp;</p>
<p>A very well known library that helps to detect device capabilities is <a href="http://wurfl.sourceforge.net/index.php">WURFL</a> - an open source project. The&nbsp;XML that contains&nbsp;devices data is maintained by  the community. WURFL project has started in Java, but today it has libraries for .NET, PHP, Perl, Ruby, and Python (hope I did not forget anyone). As in many community based frameworks, several very nice satellite projects / utilities exists. Some of them can be found <a href="http://wurfl.sourceforge.net/utilities/index.php">here</a>.</p>
<p>&nbsp;</p>
<p>In ASP.NET there are several built in mechanisms that help us to deal with different device capabilities, such as screen size, colors, image support, sound support, and many more.</p>
<p>&nbsp;</p>
<p>All these mechanism are based on the fact that the server can &quot;tell&quot; which device is accessing the web application. The basic mechanism is <a href="http://msdn.microsoft.com/en-us/library/ms228122.aspx">Browser Definition File Schema</a>, which allows saving browser information in files, and makes ASP.NET to tell which browser issued the HTTP request. Accessing this information is easier than using a 3rd party library, because of the simple fact that all data is accessible through the standard Request object - directly: <strong><em>Request.ScreenPixelsHeight</em></strong>, or via the Browser property: <em><strong>Request.Browser[&quot;CapabilityName&quot;]</strong></em>, without the need to program anything (or even without referencing external libraries). But where do we get all device information? - Mapping all these devices can take ages!</p>
<p>&nbsp;</p>
<p>Well, a project called <a href="http://mdbf.codeplex.com">Mobile Device Browser File - MDBF</a> comes to the rescue. It is hosted in Code Plex, and contains a .browser file with many many devices. It is maintained by MS Hotmail team members, and based on their experience serving devices which are used to access their service.</p>
<p>&nbsp;</p>
<p>To summarize, there are two major options you can use for getting device information and capabilities:</p>
<p>&nbsp;</p>
<table width="700" border="1" cellpadding="1" cellspacing="1">
    <tbody>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;Pros</td>
            <td>&nbsp;Cons</td>
        </tr>
        <tr>
            <td>&nbsp;WURFL</td>
            <td>
            <ul>
                <li>- Supports many technologies.</li>
                <li>- Several open source utilities available.</li>
                <li>- Well mantained device list.</li>
                <li>- Vivid community.</li>
            </ul>
            </td>
            <td>
            <p>Minor, but still:</p>
            <p>- Needs a setup.</p>
            <p>- Client needs More lines of code (comparing with MDBF).</p>
            </td>
        </tr>
        <tr>
            <td>&nbsp;MDBF</td>
            <td>
            <ul>
                <li>- Perfectly fits ASP.NET mechanisms.</li>
                <li>- Easy API.</li>
                <li>- Well mantained device list.</li>
                <li>- Very good documentation.</li>
            </ul>
            </td>
            <td>
            <ul>
                <li>- .NET only.</li>
                <li>- Relatively new, and not widely adopted.</li>
                <li>&nbsp;</li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<p>&nbsp;</p>
