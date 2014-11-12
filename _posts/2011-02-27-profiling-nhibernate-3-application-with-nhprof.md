---
layout: post
title: Profiling NHibernate 3 application with NHProf
created: 1298803835
author: igorz
permalink: /net/profiling-nhibernate-3-application-nhprof
tags:
- .NET
- NHProf
- NHibernate
- .Net Open Source
---
<p><a href="http://nhprof.com/">NHProf </a>is a great too for profiling a <a href="http://nhforge.org/">NHibernate</a> application. It is powerful and easy to use. <br />
<br />
I used it for a long time, but recently I ran into troubles when I tried to capture DB queries  in my newly started web application using NHibernate 3.0. <br />
<br />
As many times before I downloaded latest NHibernate release, created a new web application, added a references to NHibernate.dll and all dependencies, added a reference to  HibernatingRhinos.Profiler.Appender.dll and put a code, initializing NHProf - <span style="font-style: italic;">HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize(); </span> in Application_Start. <br />
<br />
After all that I expected NHPfrof be working smoothly, but all what I got was NHPfor window with no record, but indicating my application is being profiled: <br />
<br />
<a href="https://picasaweb.google.com/lh/photo/JJdcGkNvI4DykWO5XfxK0TgAANDkdsfZKq9zdjvyQwU?feat=embedwebsite"><img src="https://lh6.googleusercontent.com/_XoCEelnLy98/TWosUOfz4vI/AAAAAAAALGM/r5pG1fkzfZQ/s640/2011-02-27%2011h51_44.png" height="480" width="640" /></a> <br />
<br />
It was strange! <br />
<br />
Since it was my first application using NHibernate 3, I though it is compatibility issue of NHibernate. But then I took one of my previous applications, upgraded it to use NHibernate 3.0  - and this one was profiled perfect. <br />
<br />
I started to look at differences between two applications. Both looked similar, except one detail - all my previous application have reference to <span style="font-weight: bold;">log4net.dll</span>. <br />
<br />
Of course! NHProf use logging interceptions to capture NHibernate logs. It relies on log4net is exists in my application. After I added a reference to log4net.dll (and ensured it's copied to the 'bin' directory), it worked fine. <br />
<br />
The problem had been solved, but I still was interesting, why I did not get such a problem with my previous projects.  The answer was found with <a href="http://www.red-gate.com/products/dotnet-development/reflector/">reflector</a> (amazing tool, BTW). <br />
<br />
I figured out that NHibernate 3.0 download does not contain log4net.dll, and  NHibernate.dll does not reference to log4net.dll either: <br />
<br />
<a href="https://picasaweb.google.com/lh/photo/C4ZZ_pUZXrA0tPaE2pm0fDgAANDkdsfZKq9zdjvyQwU?feat=embedwebsite"><img height="551" width="640" alt="" src="https://lh4.googleusercontent.com/_XoCEelnLy98/TWopqqWPgkI/AAAAAAAALF8/59MUuM7yfYc/s640/2011-02-27%2012h37_58.png" /></a> <br />
<br />
It allowed me to run my application with no log4net. <br />
<br />
If I used NHibernate 2.x with no log4net.dll , I would get an exception at runtime. That why all my previous application have explicit reference to log4net, and I never got a troubled with NHProf. <br />
<br />
Conclusion: Don't forget to add log4net to your project, if you using NHibernate 3!</p>
