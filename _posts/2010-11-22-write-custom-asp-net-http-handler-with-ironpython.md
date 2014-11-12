---
layout: post
title: Write custom ASP.NET HTTP Handler with IronPython
created: 1290445297
author: igorz
permalink: /net/write-custom-aspnet-http-handler-ironpython
tags:
- .NET
- .Net Open Source
- IronPython
- ASP.NET
---
<p>An HTTP handler is the endpoint that responds to handle request made by  an ASP.NET Web application. The request is mapped to HTTP handler based  on name pattern (commonly file extension). ASP.NET provides a few  default HTTP handlers: Page handler (.aspx), Web Service handler  (.asmx), Generic handler (.ashx) and so forth.<br />
<br />
ASHX Generic handler is special since it allows to implement IHttpHandler API immediately.<br />
There is a sample - HelloWorld.ashx:<br />
<br />
<img alt="" src="http://lh3.ggpht.com/_XoCEelnLy98/TOjlq4eb6_I/AAAAAAAAKwo/SvvlJ_vIhXw/s800/2010-11-21%2011h18_24.png" /><br />
<br />
Language  attribute allows me to chose program language to use, but it strongly  limited by only two - C# and VB. What if I want to write my code in  Python?<br />
<br />
<br />
.NET actually provides support for  Python language with IronPython.  And I assume that it is possible to  write such a handle using IronPython. But How?<br />
<br />
.ashx  is  mapped  to System.Web.UI.SimpleHandlerFactory. When .ashx file is requested,  this handler parses .ashx file into .NET class and compiles it using  either C# or VB compiler (accordingly to language attribute). Using  another language requires to setup suitable compiler for this language,  handle parsing and so on. I am not sure I want to work so hard for that.<br />
<br />
So I chose an alternative way. I will create my own handler, which will process a python code.<br />
<br />
At first I chose a file extension to be mapped - .pyhx.<br />
I  want .pyhx be pure python code but looks similar to .ashx. Each file  will define a class implements IHttpHandler. The name of the class have  to be the same as the file name.<br />
There is a sample - HelloWorld.pyhx:<br />
<br />
<img alt="" src="http://lh3.ggpht.com/_XoCEelnLy98/TOjmyjhkPyI/AAAAAAAAKw8/SoNlG0yZRS8/s800/2010-11-21%2011h16_23.png" /><br />
<br />
<br />
The next step is implementing IHttpHandlerFactory, to which .pyhx will be mapped.<br />
Such  factory creates instances of IHttpHandler defined in .pyhx (pure Python  code). It works similar to SimpleHandlerFactory, but instead of parsing  and compiling the file, it executes the python code  using advantage of  DLR hosting API.<br />
<br />
There is C# implementation:<br />
<br />
<img alt="" src="http://lh6.ggpht.com/_XoCEelnLy98/TOjmywFaScI/AAAAAAAAKxA/o-biZijULYw/s800/2010-11-21%2011h21_28.png" /><br />
<br />
The only thing is left is to declare .pyhx mapping in Web.config:<br />
<br />
<img alt="" src="http://lh6.ggpht.com/_XoCEelnLy98/TOjmy9ke2jI/AAAAAAAAKxE/wzq8sDknnt8/s800/2010-11-21%2011h23_51.png" /><br />
<br />
That's it! You can write your custom HTTP handler in Python as well as in C# and VB!<br />
<br />
The sample project may be found on GitHub: <a href="https://github.com/manishma/IronPythonAspNetSamples">https://github.com/manishma/IronPythonAspNetSamples</a></p>
