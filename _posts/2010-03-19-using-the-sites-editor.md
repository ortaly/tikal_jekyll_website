---
layout: post
title: using the site's editor
created: 1269010759
author: admin
permalink: /using-sites-editor
tags:
- fckeditor
---
<p>&nbsp;We currently use&nbsp;<a href="http://drupal.fckeditor.net/">FCKEditor</a>&nbsp;as&nbsp;a reach text editor for the site, it is meant to be easy to use and familiar to everyone who already uses some kind of word processor like MS word or OpenOffice, following are some tips on using the editor:</p>
<p>&nbsp;</p>
<p>my experience shows that using the 'Show Blocks' feature makes editing much easier, you turn it on and off by clicking the toolbar button 'Show Blocks', its the button with the magnifier icon. which actually shows blocks of content, an image for example takes a block while editing. a paragraph is a block also. just click on it and start editing, you will see its value right away.&nbsp;it will help you manage your blocks and avoid typing inside images or code snippets blocks.</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<p>&nbsp;</p>
<p>if you are permitted to post in full html format and you really need to add html code to your post click the 'Source' button to switch source editing on and off.</p>
<p>&nbsp;</p>
<p>if you prefer to compose your post in ms word or open office then use the 'paste from word' option in the editor.</p>
<p>&nbsp;</p>
<p>we use <a href="http://drupal.org/project/syntaxhighlighter">syntax highlighter module</a> for code snippets, open it's dialog by clicking the 'code' toolbar button. there are many supported languages, but the dialog supports only a subset of them. to add code snippet for a language that is not supported by the dialog, like scala for example, you will have to edit you post in source mode and add the required html tags like:</p>
<pre title="code" class="brush: xhtml;">
&lt;pre class=&quot;SYNTAXHIGHLIGHTER-OPTIONS&quot;&gt;
  program code
  ...
&lt;/pre&gt;</pre>
<p>where the format of SYNTAXHIGHLIGHTER-OPTIONS is: brush: java; , so for scala do:</p>
<pre title="code" class="brush: xhtml;">
&lt;pre class=&quot;brush: scala&quot;&gt;
    def apply(x:Int): Tree = new LeafImpl(x);
&lt;/pre&gt;</pre>
<p>and this is how it really looks:</p>
<p>&nbsp;</p>
<pre class="brush: scala">
    def apply(x:Int): Tree = new LeafImpl(x);
</pre>
<p>&nbsp;</p>
<p>see here the full list of <a href="http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes">supported languages</a>.</p>
<p>note that while hovering over code snippet a small floating button will popup and enable you to copy the code to your clipboard.</p>
<p>and this is how xml code looks like:</p>
<pre title="code" class="brush: xhtml;">
&lt;context-param&gt;
    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;
    &lt;param-value&gt;
        classpath:/applicationContext.xml,
        classpath:/testContext.xml
    &lt;/param-value&gt;
&lt;/context-param&gt;</pre>
<p>&nbsp;</p>
<p>you can also insert images in your post, use the 'insert/edit image' button in the editor's toolbar to open the image upload dialog, click browse server to select an existing image or to upload a new image, select the image and click 'send to fckeditor', &nbsp;</p>
<p>&nbsp;<img width="398" height="427" alt="" src="/files/upload/12/you-v-tech.gif" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>You can also embed videos to your post. upload the video to blip.tv or youtube or some other video hosting site that supports embedding and embed the html code to your post, you must embed the code in source mode editing. it usually looks like:</p>
<pre title="code" class="brush: xhtml;">
&lt;embed width=&quot;450&quot; height=&quot;359&quot; src=&quot;http://blip.tv/play/grVLgc2VRgA&quot;
 type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot;
 allowfullscreen=&quot;true&quot;&gt;&lt;/embed&gt; </pre>
<p>and this is an embedded video:</p>
<p>&nbsp;</p>
<embed width="450" height="359" src="http://blip.tv/play/grVLgc2VRgA" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true"></embed>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>So don't expect this editor to be easy to use as you use MS word, but its OK if you are gentle with it&nbsp;<img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" /></p>
<p>&nbsp;</p>
<p>Enjoy.</p>
