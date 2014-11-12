---
layout: post
title: FuseDay June 2013 - Upload an image MVC + TypeScript
created: 1372603164
author: ofir
permalink: /net/fuseday-june-2013-upload-image-mvc-typescript
tags:
- .NET
- ASP.NET MVC
- typescript
- ResumableJS
---
<p>The Application is based on&nbsp;<a href="http://www.asp.net/mvc">ASP.Net MVC</a>&nbsp;(server),&nbsp;<a href="http://www.typescriptlang.org/">TypeScript </a>(client)&nbsp;and <a href="http://www.mongodb.org/">MongoDb</a>&nbsp;(Database).</p>
<p>My task was to upload an image from desktop to server.</p>
<p>I used&nbsp;<a href="http://resumablejs.com/">ResumableJS </a>to upload the file asynchronously, it was very simple to use, with a little tweaking.</p>
<h3>
	Client side</h3>
<h4>
	Init:</h4>
<pre>
var r = new Resumable({
       target: &#39;/Story/@Model.StoryId/UploadFile&#39;,
       query: {},
       testChunks: false,
       simultaneousUploads: 1 //make sure chunks are loaded seperatly
});

// Resumable.js isn&#39;t supported, fall back on a different method
if (!r.support) alert(&quot;Cannot upload!&quot;);</pre>
<h4>
	Assign behavior to UI object:</h4>
<pre>
r.assignBrowse(document.getElementById(&#39;uploadSpan&#39;));</pre>
<h4>
	Event handling:</h4>
<pre>
r.on(&#39;fileAdded&#39;, function(file){
    r.upload();
});

r.on(&#39;fileError&#39;, function (file, message) {
    r.cancel();
    alert(&quot;Cancel&quot;);
});

r.on(&#39;fileSuccess&#39;, function (file) {
    // update view model
    editorViewModel.editTileDialog.selectedView(&#39;edtiTile&#39;);
    editorViewModel.editTileDialog.imageUrl(file.uniqueIdentifier + &#39;_&#39; + file.fileName);
});</pre>
<p>&nbsp;</p>
<h3 style="direction: ltr; unicode-bidi: embed;">
	Server side</h3>
<p dir="ltr">I added new Action to <em>StoryController </em>named UploadFile:</p>
<pre>
[HttpPost]
public ActionResult UploadFile*(
    string id,
    int resumableChunkNumber,
    int resumableChunkSize,
    int resumableTotalSize,
    string resumableIdentifier,
    string resumableFilename,
    string resumableRelativePath)</pre>
<p>* all the resumable... fields came from ResumableJS</p>
<p>Here I saved each chunk (from Request.Files[0].InputStream) according to its location (resumableChunkNumber).</p>
<p>&nbsp;</p>
<p>It was fun...</p>
<p>Thank you Menny, Igor &amp; Tikal.</p>
<p>Ofir</p>
<h1 style="direction: ltr; unicode-bidi: embed;">
	<o:p></o:p></h1>
