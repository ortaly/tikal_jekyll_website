---
layout: post
title: 'Upload canvas images '
created: 1372601322
author: shmulik
permalink: upload-canvas-images
tags:
- .NET
- 'Task:  take a snapshot from camera (using canvas) and save it to the server as
  a file'
---
<p dir="LTR">Task:&nbsp; take a snapshot from camera (using canvas) and save it to the server as a file</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR"><span style="font-size:20px;"><strong>Cshtml:</strong></span></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&lt;canvas id=&quot;canvas&quot; width=&quot;640&quot; height=&quot;480&quot;&gt;&lt;/canvas&gt;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div style=&quot;text-align: center&quot;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&lt;button data-bind=&quot;click: openCamera&quot;&gt;Take another Snapshot&lt;/button&gt;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;button data-bind=&quot;click: function () { saveSnapshot(document.getElementById(&#39;canvas&#39;).toDataURL(&#39;image/jpeg&#39;)); }&quot;&gt;Save&lt;/button&gt;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;</p>
<h1 dir="LTR">
	&nbsp;</h1>
<h1 dir="LTR">
	<span style="font-size:20px;">Javascript code:</span></h1>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">takeCameraSnapshot = function () {</p>
<p dir="LTR">&nbsp;$.post(&#39;/Story/&#39; + this.StoryId + &#39;/SaveSnapshot&#39;, { dataURL: snapshot },&nbsp; (data, status) =&gt; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.imageUrl(data);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.selectedView(&#39;edtiTile&#39;);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; });</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">openCamera = function () {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // show camera</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.selectedView(&#39;takePictureFromCamera&#39;);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.isCameraVisible(true);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var video = $(&#39;#takePictureFromCamera video&#39;)[0];</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (navigator).webkitGetUserMedia({</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;video: true</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }, function (stream) {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; video.src = (window).webkitURL.createObjectURL(stream);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; video.play();</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }, function (error) {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return console.log(&quot;Video capture error: &quot;, error.code);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; });</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; };</p>
<h1 dir="LTR">
	<span style="font-size:20px;">&nbsp;Server size:</span></h1>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; static string path = @&quot;C:\work\ComicTales\ComicTales.Web\Upload\&quot;;</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [HttpPost]</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public ActionResult SaveSnapshot(string id, string dataURL)</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string fileNameWitPath = string.Empty;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string pathSuffix = string.Empty;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string tick = DateTime.Now.Ticks.ToString();</p>
<p dir="LTR" style="margin-left:36pt;">&nbsp;&nbsp;&nbsp;&nbsp; // For Chrome browsers</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (dataURL.Contains(&quot;jpeg&quot;))</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // To remove the Prefix &#39;data:image/png;base64,&#39;</p>
<p dir="LTR" style="margin-left:36pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dataURL = dataURL.Remove(0, 23);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pathSuffix = &quot;.jpeg&quot;;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // For Explorer browsers</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else if (dataURL.Contains(&quot;png&quot;))</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dataURL = dataURL.Remove(0, 22);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pathSuffix = &quot;.png&quot;;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; fileNameWitPath = path + tick + pathSuffix;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; using (FileStream fs = new FileStream(fileNameWitPath, FileMode.Create))</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; using (BinaryWriter bw = new BinaryWriter(fs))</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; byte[] snapshotData = Convert.FromBase64String(dataURL);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bw.Write(snapshotData);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bw.Close();</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Need to return the full image name to the client</p>
<p dir="LTR" style="margin-left:36pt;">return Json(tick + pathSuffix, JsonRequestBehavior.AllowGet);</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;</p>
