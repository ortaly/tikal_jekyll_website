---
layout: post
title: load locale at runtime using resource modules
created: 1260350506
permalink: load-locale-at-runtime-using-resource-modules
tags:
- JS
- resource modules
- flex
---
<div dir="ltr" style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">I was asked to find a way for separating our localization resources out of the application swf, so that different locales can be loaded at runtime.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">Pretty quickly I found the &quot;<a href="http://livedocs.adobe.com/flex/3/html/help.html?content=l10n_5.html">Using resource modules</a>&quot; help subject, which explains how to create, compile and load resource modules, &nbsp;which are SWF files, separated from your application SWF, that contain resources bundles for a single locale.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">While trying to set up a demo application (didn't found one) using the instructions in the help files, I bumped into several issues which I will explain here in hopes that it will save you the time, and added the sample app as well.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; text-indent: -18pt; unicode-bidi: embed"><span>1.<span style="font: 7pt 'Times New Roman'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Running MXMLC &ndash; In case you're not familiar with executing the compiler, you should note that you can either use it as mentioned in the article:</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">mxmlc -locale= -resource-bundle-list=myresources.txt MyApp.mxml</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">(supply full path to MyApp.mxml, or run the compiler from the folder of your app. Either way, you better add the path to the mxmlc to your path environment variable).</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">Alternatively you can add the following to the Flex builder additional compiler options :</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">-locale= -resource-bundle-list=myresources.txt&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">In either case, you'll probably want to create this file in a specific place rather than under the compiler folder, so you should use something like:</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">.. -resource-bundle-list=C:/resources/myresources.txt&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">Later, when compiling the resource module, you should note that the -source-path=locale/{locale} argument assumes that you execute the compiler from your project's folder, so your command line will look something like:</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">C:\Flex\Projects\localizationModules&gt;mxmlc -locale=es_ES -source-path=src/locale/{locale} -include-resource-bundles=RegistrationForm,collections,containers,controls,core,&nbsp; effects,skins,styles -output es_ES_ResourceModule.swf&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">Where <em>-locale </em>is the name of the folder containing different locales.&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; text-indent: -18pt; unicode-bidi: embed"><span>2.<span style="font: 7pt 'Times New Roman'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Supported locales- When first trying to compile for the es_ES locale, &nbsp;I got the following error:</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">C:\Program Files\Adobe\Flex Builder 3\sdks\3.4\frameworks\flex-config.xml(75): Error: unable to open 'locale/es_ES'</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/library-path&gt;&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">The reason for this is that the es_ES framework locale (which includes resources for framework classes such as buttons etc.) did not exist on my machine. Only the en_UN is provided by default (I found the ja_JP as well). You can find all the explanations under &quot;<a href="http://livedocs.adobe.com/flex/3/html/help.html?content=l10n_3.html#160654">Adding new locales</a>&quot;.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">In short, You have to add the framework resource locale for this problem to go away.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">If you only want to run a demo to see this working, and don't want to be bothered with adding the locale, just look into your installed locales (something like C:\Program Files\Adobe\Flex Builder 3\sdks\3.4\frameworks\locale). In case you find another one on top of en_UN (i.e ja_JP), you can create a resource module from it, and simply change the sample code to use this locale instead:</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">private var locales:Array = [ &quot;en_US&quot;,&quot;ja_JP&quot; ];&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; unicode-bidi: embed">The sample app included here uses this. Of course, the actual resources you see in the labels remain Spanish&nbsp;:) This is just for demo.&nbsp;</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt 36pt; direction: ltr; text-indent: -18pt; unicode-bidi: embed"><span>3.<span style="font: 7pt 'Times New Roman'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>You should take care of copying the resource module's swf's to your output folder so they can be loaded.</div>
<div dir="ltr" style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">Hope this will save you the time for making this work.</div>
