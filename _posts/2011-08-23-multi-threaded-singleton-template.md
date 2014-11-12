---
layout: post
title: Multi threaded Singleton - Template
created: 1314126080
author: ofir
permalink: /multi-threaded-singleton-template
tags:
- .NET
- template
- Singleton
- MultiThreaded
- .Net Open Source
---
<p>Thanks to Dror A. for bringing this issue up.</p>
<p>&nbsp;</p>
<p>from <a href="http://msdn.microsoft.com/en-us/library/ff650316.aspx">MSDN</a>:</p>
<p>Even though&nbsp;<a style="color: rgb(19, 100, 196); " href="http://msdn.microsoft.com/en-us/library/ff650849.aspx"><em xmlns="http://www.w3.org/1999/xhtml">Singleton</em></a>&nbsp;is a comparatively simple pattern, there are various tradeoffs and options, depending upon the implementation. The following is a series of implementation strategies with a discussion of their strengths and weaknesses.</p>
<p>&nbsp;</p>
<p>Simple Singleton:</p>
<pre title="code" class="brush: csharp;">
using System;

public class Singleton
{
   private static Singleton instance;

   private Singleton() {}

   public static Singleton Instance
   {
      get 
      {
         if (instance == null)
         {
            instance = new Singleton();
         }
         return instance;
      }
   }
}</pre>
<p>&nbsp;</p>
<p>The main disadvantage of this implementation, however, is that it is not safe for multithreaded environments. If separate threads of execution enter the&nbsp;<strong>Instance</strong>property method at the same time, more that one instance of the&nbsp;<strong>Singleton</strong>&nbsp;object may be created. Each thread could execute the following statement and decide that a new instance has to be created:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
public sealed class Singleton
{
   private static readonly Singleton instance = new Singleton();
   
   private Singleton(){}

   public static Singleton Instance
   {
      get 
      {
         return instance; 
      }
   }
}</pre>
<p>&nbsp;</p>
<p>For the above solution, even though it's thread safe, we don't have any control for creating the Singleton instance.</p>
<p>From MSDN:</p>
<p>The only potential downside of this approach is that you have less control over the mechanics of the instantiation. In the&nbsp;<em>Design Patterns</em>&nbsp;form, you were able to use a nondefault constructor or perform other tasks before the instantiation. Because the .NET Framework performs the initialization in this solution, you do not have these options. In most cases, static initialization is the preferred approach for implementing a&nbsp;<em>Singleton</em>&nbsp;in .NET.</p>
<p>&nbsp;</p>
<p>I created a MultiThreaded Singleton template to be used via Visual Studio, using this solution:</p>
<pre title="code" class="brush: csharp;">
using System;

public sealed class Singleton
{
   private static volatile Singleton instance;
   private static object syncRoot = new Object();

   private Singleton() {}

   public static Singleton Instance
   {
      get 
      {
         if (instance == null) 
         {
            lock (syncRoot) 
            {
               if (instance == null) 
                  instance = new Singleton();
            }
         }

         return instance;
      }
   }
}</pre>
<p>&nbsp;</p>
<p>From MSDN:</p>
<p>This approach ensures that only one instance is created and only when the instance is needed. Also, the variable is declared to be&nbsp;<strong>volatile</strong>&nbsp;to ensure that assignment to the instance variable completes before the instance variable can be accessed. Lastly, this approach uses a&nbsp;<strong>syncRoot</strong>&nbsp;instance to lock on, rather than locking on the type itself, to avoid deadlocks.</p>
<p>&nbsp;</p>
<p>You can download the template <a href="/files/Multithreaded Singleton.zip">here</a>.</p>
<p>put it at:</p>
<ul style="margin-bottom: 1em; margin-left: 30px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 14px; vertical-align: baseline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; list-style-type: disc; list-style-position: initial; list-style-image: initial; ">
    <li style="border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 14px; vertical-align: baseline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; word-wrap: break-word; ">Item Templates -&nbsp;<code style="border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 14px; vertical-align: baseline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; ">%VSInstallDir%\Common7\IDE\ItemTemplates\</code></li>
    <li style="border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 14px; vertical-align: baseline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; word-wrap: break-word; ">Project Templates -&nbsp;<code style="border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; font-size: 14px; vertical-align: baseline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; ">%VSInstallDir%\Common7\IDE\ProjectTemplates\</code></li>
</ul>
<p>Run&nbsp;&quot;devenv.exe /installvstemplates&quot;.</p>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>Ofir</p>
<p>&nbsp;</p>
