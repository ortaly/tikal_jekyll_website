---
layout: post
title: Enterprise Library for Silverlight– A Quick Start Guide
created: 1344414300
author: menny
permalink: /net/enterprise-library-silverlight–-quick-start-guide
tags:
- .NET
---
<p>Here is a quick guide for setting up EntLib with your solution with a bit of problem solving.  If you want to be able to configure your EntLib blocks from visual studio using the configuration console then you will have to make sure you install the following bits in the correct order
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image1.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image_thumb1.png" width="376" height="75"></a>
<p>Otherwise you will end up with missing SL integration in the configuration console.
<p>If the configuration console does not open and you get the following error:<br />
<blockquote>
<p><em>“Error launching the configuration console. Could not locate the Enterprise Library binaries required to launch the configuration console. Either use NuGet to add references to the application blocks or set a value for the Enterprise Library binaries paths” property on the solution to indicate the location of the binaries.”</em> </p>
</blockquote>
<p>Then add the following to your solution file (or use NuGet instead): </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:8bace29a-c03a-4789-831d-e0d234d3c3e3" class="wlWriterEditableSmartContent">
<pre name="code" class="xml">GlobalSection(ExtensibilityGlobals) = postSolution
EnterpriseLibraryConfigurationToolBinariesPath = C:\Program Files\Microsoft Enterprise Library 5.0\Bin
EndGlobalSection
</pre>
</div>
<p>Afterwards you will have to add a config file to your project (the main silverlight project is good enough) and be able to right click it and configure it using the configuration console </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image2.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image_thumb2.png" width="444" height="241"></a></p>
<p> </p>
<p>You have several option to load the configuration to the EnterpirseLibraryContainer: </p>
<ol>
<li><a href="http://msdn.microsoft.com/en-us/library/hh852712(v=pandp.51).aspx">Loading the XAML configuration from the server</a></li>
<li><a href="http://msdn.microsoft.com/en-us/library/hh852712(v=pandp.51).aspx">Embedding the XAML configuration in the XAP</a></li>
<ol>
<li><a href="http://stackoverflow.com/a/7952035">Load it as a string</a></li>
<li><a href="http://stackoverflow.com/a/7952035">Load it as XAML</a></li>
</ol>
</ol>
<p>unlike the above MSDN documentation suggest you have to set the XAML as “Embedded Resource” and not “Resource” or “Page” if you want to load the file as XAML. You then can call </p>
<p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:2f64b24d-2f4e-4cdd-a386-41dd3281442a" class="wlWriterEditableSmartContent">
<pre name="code" class="c#">this.GetType().Assembly.GetManifestResourceNames();</pre>
</div>
<p>to see what your resource is called inside the returned list (it’s the napespace of your solution + the path to the resource file). Then you can use it to load your cache like so</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:8e75a26a-aa8f-4224-98f9-aeb2f168abcb" class="wlWriterEditableSmartContent">
<pre name="code" class="c#">string xaml;
using (Stream s = this.GetType().Assembly.GetManifestResourceStream("YourSolutionNamepsace.EntLib.xaml"))
using (StreamReader sr = new StreamReader(s))
	xaml = sr.ReadToEnd();

var configDictionary = (IDictionary)XamlReader.Load(xaml);
var configSource = DictionaryConfigurationSource.FromDictionary(configDictionary);
EnterpriseLibraryContainer.Current = EnterpriseLibraryContainer.CreateDefaultContainer(configSource);
Microsoft.Practices.EnterpriseLibrary.Caching.Runtime.Caching.ObjectCache cache1 = EnterpriseLibraryContainer.Current.GetInstance<Microsoft.Practices.EnterpriseLibrary.Caching.Runtime.Caching.ObjectCache>("DefaultIsolatedStorageCache");</pre>
</div>
<p>Don’t forget to add a reference to the “Microsoft.Practices.EnterpriseLibrary.Common.Silverlight.dll” + the application blocks you are using. </p>
<p>From here on, it should be basic settings and usage with the container. </p>
