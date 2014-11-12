---
layout: post
title: Installing Cairngorm Plug-in in Flex Builder 3
created: 1259828101
permalink: installing-cairngorm-plug-in-in-flex-builder-3
tags:
- JS
- FlexBuilder Plugin Cairngorm
---
<p>Lately I started working on a project that uses Cairngorm as an MVC framework for flex application.&nbsp; As in many MVC frameworks you quickly found yourself coding the same skeleton of code over and over again. Then I run into the Cairngorm plug-in.<img alt="" src="/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/teeth_smile.gif" /></p>
<!--break-->
<p><br />
As specified in the plug-in web page: The Cairngorm Plug-in is an Eclipse plug-in that augments Flex Builder to provide tooling that improves productivity when developing Cairngorm. It aims to improve productivity by removing the repetitive action of creating a new Command and associated Event and adding them to the Controller.<br />
It provides a new class wizard for the following Cairngorm artifacts:<br />
&middot;&nbsp;&nbsp; &nbsp;Controller - creates a new Controller <br />
&middot;&nbsp;&nbsp; &nbsp;Command - creates a new Event and a new Command and adds them to the Controller. <br />
The class templates used for the codegen are externalized and distributed with Cairngorm. This allows you to modify the templates to support your own code style.</p>
<p><br />
I personally found the installation and usage rather tricky so I decided to collect some pitfalls I run into.<br />
For detailed information repair to the Cairngorm plug-in web site http://opensource.adobe.com/wiki/display/cairngorm/Plugin</p>
<h2><br />
Pitfall 1: Flex builder fails to resolve dependencies for the Cairngorm plug-in</h2>
<p><br />
When you install the plug-in the following error is displayed in the Flex Builder update manager &ldquo;<br />
Cairngorm Plugin (0.0.6.200811131413) requires plug-in &quot;org.eclipse.emf.codegen&quot; &rdquo; as displayed in the image below<br />
&nbsp;<br />
<img height="532" width="608" alt="" src="/files/upload/13/plugin1.PNG" /><br />
To resolve this, I selected the Europa Discovery Site from the wizard along with the Cairngorm plug-in option created by following the installation instructions. Then used the &ldquo;Select required&rdquo; button to install the needed eclipse plug-ins for codegen that are required by the Cairngorm plug-in. The images below display the &ldquo;install&rdquo; after all dependencies were resolved.<br />
&nbsp;</p>
<p><img height="531" width="610" alt="" src="/files/upload/13/plugin2.PNG" /><br />
Resources: http://thanksmister.com/?p=204<br />
&nbsp;</p>
<h2>&nbsp;</h2>
<h2>Pitfall 2: What are Cairngorm locations and how can I set one in my workspace?</h2>
<p><br />
Cairngorm location is a codegen templates files used by the plug-in code generation as the Controller, Command and Event templates. You can download them from <a href="http://download.macromedia.com/pub/opensource/cairngorm/plugin/cairngorm2_2_2beta-bin.zip">this </a>location and although they are specified as Cairngorm 2.2.2-Beta related I can see no reason why you can not use them with Cairngorm 2.2.1.</p>
<p><img height="531" width="610" alt="" src="/files/upload/13/plugin2.PNG" /><br />
Unzip the file to a folder of your choice and follow the user manual from <a href="http://opensource.adobe.com/wiki/display/cairngorm/Cairngorm+Locations">here </a>note that the location is the directory created when you unzipped the file downloaded above. I was not fond with the original templates; I prefer using the ICommand and IResponser interfaces and wanted opening brackets to be on the end of line and not in the beginning of the next line. Editing the defaults was quite straight forward the format used by JET is very similar to the JSP (Java Server Pages) syntax. <br />
Under the folder where you unzipped the files go to &quot;resources\flexbuilder\templates\&quot; and edit the &ldquo;.asjet&rdquo; files using your favorite text editor. If you need something complicate you can have look here.</p>
<h2>&nbsp;</h2>
<h2><br />
Pitfall 3: No controller found under the project<br />
&nbsp;</h2>
<p>This usually happens when you started using the plug-in after you already had your own controller in the project. <br />
&nbsp;<br />
In order for the plug-in to identify your Controller you need to specify a UUID for it as described <a href="http://opensource.adobe.com/wiki/display/cairngorm/Plugin">here </a>under to Known Issues.</p>
<h2>&nbsp;</h2>
<h2><br />
Pitfall 4: Cairngorm Controller and Cairngorm Command not appearing in pop-up menu</h2>
<p><br />
This is a known issue as well and can be found again here (wow reading the instructions can relay help). You need to recreate your workspace which his real bummer.<br />
&nbsp;</p>
