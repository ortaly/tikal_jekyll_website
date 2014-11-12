---
layout: post
title: Compile resource module using Flex builder
created: 1260370351
permalink: compile-resource-module-using-flex-builder
tags:
- JS
- resource
- linked resources
- Flex Builder
- flex
- builder editor
---
<p>&nbsp;</p>
<p>The steps to use resource modules can be found in <a href="http://tikalk.tikalknowledge.com/flex/load-locale-runtime-using-resource-modules">my own post</a>, and <a href="http://www.visible-form.com/blog/flex-localization-with-resource-bundles/">here</a>.</p>
<p>The code snippets here refer to my post.</p>
<p><br />
Although compiling resource modules is not built-in in Flex Builder, you can compile resource modules by using Flex Builder by adding a builder to your project as follows:<br />
&nbsp;</p>
<p>1. Right click on your <strong>project-&gt;Builders</strong>. This shows you the list of builders used for building your project. If you haven't added any builder, you should only see the &quot;Flex&quot; Builder.<br />
&nbsp;</p>
<p>2. Add a new builder by clicking &quot;<strong>New</strong>&quot;. In the &quot;<strong>Choose Configuration type</strong>&quot; dialog, choose &quot;<strong>Program</strong>&quot;-&gt;<strong>OK</strong>. This enables you to run an executable.<br />
&nbsp;</p>
<p>3. Give the builder a meaningful name, such as &quot;ResourceModule_en_UN&quot;<br />
&nbsp;</p>
<p>4. In the &quot;<strong>Main </strong>&quot; tab of the builder editor, set the following:<br />
<strong>location</strong>: The path to MXMLC.exe on your machine. Something like C:\Program Files\Adobe\Flex Builder 3\sdks\3.4\bin\mxmlc.exe<br />
&nbsp;</p>
<p><strong>Arguments</strong>: the arguments for the mxmlc. Use different arguments depending on whether your output folder is regular (like bin-debug) or using Eclipse linked resources.<br />
&nbsp;</p>
<p><strong>For regular output directory</strong>:</p>
<p>In case you use a typical output folder (e.g bin-debug), you can use the follows:<br />
-source-path=${project_loc}\src\locale\{locale} -locale=en_US -include-resource-bundles=RegistrationForm,collections,containers,controls,core,effects,skins,styles -output =${project_loc}/bin-debug}\en_US_ResourceModule.swf</p>
<p><br />
This will compile the resources to swf, and place it in your output bin-debug directory</p>
<p><br />
<strong>For output folder using Eclipse linked resources</strong><br />
-source-path=${project_loc}\src\locale\{locale} -locale=en_US -include-resource-bundles=RegistrationForm,collections,containers,controls,core,effects,skins,styles -output ${workspace_loc:/${project_name}/bin-debug}\en_US_ResourceModule.swf<br />
<strong>Explanation</strong>: When you use linked resources for your Flex output (your project's output folder contains something like ${OUTPUT_FOLDER} which was defined as a linked resource), Flex builder automatically creates a linked folder under your project named &quot;bin-debug&quot;. <br />
This folder is mapped to the path specified in the linked resource.<br />
When you specify ${workspace_loc:/${project_name}/bin-debug}\ you tell the compiler to look for this folder under your project, under the workspace. <br />
It is actually a logical place (try clicking on one of the &quot;Browse workspace&quot; buttons in this editor, choose a folder and see the result string).<br />
This will compile the resources to swf, and place it in the folder specified in your linked resources.<br />
&nbsp;</p>
<p>&nbsp;<img height="639" alt="" width="798" src="/files/upload/7/builderArgs.JPG" /></p>
