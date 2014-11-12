---
layout: post
title: Signing Windows executable file on Linux
created: 1256475499
permalink: signing-windows-executable-file-on-linux
tags:
- DevOps
- signcode
---
<p>Signing Windows executable file on Linux.<br />
<br />
If you  build windows executables on linux (on Continuous Integration Machine) you must sign them before release.<br />
<br />
But there is only tool signcode.exe from Microsoft (part of .NET) that can do it and of course this tool runs on Windows only.<br />
<br />
<b>osslsigncode</b> - is open source tool under GPL.<br />
<br />
You may download sources from http://sourceforge.net/projects/osslsigncode and compile / install on linux you want to run it.<br />
It has very similar syntax and parameters set as signcode.exe<br />
<br />
osslsigncode -spc SPC-FILE -key PRIVATE-KEY-FILE -in EXECUTABLE -out OUTFILE</p>
