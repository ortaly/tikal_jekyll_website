---
layout: post
title: Fuse Day, Dec 2012–Getting our hands dirty with WinRT
created: 1356448602
author: menny
permalink: /net/fuse-day-dec-2012–getting-our-hands-dirty-winrt
tags:
- .NET
---
<p>The fuse day tradition @ <a href="http://www.tikalk.com/">Tikal</a> is basically a day and half where you get to put your hands in the mud with the technology of your choice. More like and advanced hello world, which you don’t get to do in the everyday life.
<p>[repository: <a href="https://github.com/manishma/windows-8-javascript-application">https://github.com/manishma/windows-8-javascript-application</a>]
<p>Objective: create a Win8 application which allows the following:
<ul>
<li>- Take a picture snapshot from the web cam
<li>- Save the picture locally
<li>- Browse the picture and apply a canvas on the selected image for custom drawing.
<li>- Save the result as an image </li>
</ul>
<p>For the most of us (we are experienced .Net developers with JavaScript skills), developing on Windows 8 was a very first experience but pretty exciting and really fun part, although working on a virtual machine had its share of hardware problems (application hanged, camera worked only in Igor’s laptop).
<p>We decided to write the whole application using WinJS and it’s really amazing that writing some pieces of code in HTML + JavaScript can actually result in a very nice windows 8 application! Still, not clear whether there is a browser behind or does all HTML controls are rendered to WinRT equivalent? While WinRT has it’s dedicated controls like the List control, most of HTML functionality that we used worked out of the box in our application.
<p>Things went relatively straight forward as the documentation in MSDN and in the internet were relatively enough detailed and <u>good intelligence support in Visual Studio 2012</u> gave the final kick. We also used the Windows 8 SDK samples which supplied a lot of samples as a starting point and I strongly recommend using it whenever you want to search for something. Much like the android SDK it is very detailed and has a lot of samples.
<p>The particularity of WinJS is a strong use of asynchronous events that can be controlled with the use of the promise-deferred module.
<p>We also figured out from the beginning that if we want to use a C# DLL with business logic to integrate into the JavaScript project we had to create Windows Runtime Component project and then add it as a reference into the JavaScript project. Then use it as a normal JavaScript reference as the intelisence will immediately recognize it. Some pointers: all the classes need to be sealed and if we want to debug it, we need to debug either the C# code or the JavaScript code using the project configuration – but not both in the same time.
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image002.png"><img title="clip_image002" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="clip_image002" src="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image002_thumb.png" width="569" height="152"></a><br />
<h2> </h2>
<h2>Application Structure</h2>
<p>We first started with a navigation model: much like HTML when we link between different pages and have a history/back/forward buttons. I cant realy say that the navigation worked out of the box and in the middle of the development we decided to break the navigation model from a multi-page structure to a single page application (SPA). The reason is to have the context state available for all the controls and to get the “navigation” finally working.
<p><strong>MVC</strong> – Views are defined by an HTML page coupled with a JavaScript file. The convention is to place the html file into the html directory and the JavaScript file into the js directory. The HTML is clean and should have any JavaScript in it.
<p>We than need to “bind” them together: from the HTML page we call</p>
<pre class="csharpcode"><script src=<span class="str">"/js/collage.js"</span>></script></pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
<p>And from the JavaScript page we call</p>
<pre class="csharpcode"><span class="kwrd">var</span> page = WinJS.UI.Pages.define(<span class="str">"/collage.html"</span>, {

init: <span class="kwrd">function</span> (element, options) {

},

ready: <span class="kwrd">function</span> (element, options) {

onLoad();

}

});

</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
<p>Because we used a single navigation model we did not have to include every time the themes and base scripts in the HTML page: </p>
<pre class="csharpcode"><link href=<span class="str">"//Microsoft.WinJS.1.0/css/ui-dark.css"</span> rel=<span class="str">"stylesheet"</span> />

<script src=<span class="str">"//Microsoft.WinJS.1.0/js/base.js"</span>></script>

<script src=<span class="str">"//Microsoft.WinJS.1.0/js/ui.js"</span>></script>

<!-- Winstagram references -->

<link href=<span class="str">"/css/default.css"</span> rel=<span class="str">"stylesheet"</span> />

<script src=<span class="str">"/js/default.js"</span>></script>

</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
<h2>Some Code </h2>
<p>while most of the things where trivial we had a very hard time converting a canvas content into an image file (look in the repository for the code)</p>
<p>Here is the code for opening a file from the file picker (taken from the SDK samples)</p>
<pre class="csharpcode"><span class="kwrd">function</span> pickPhoto() {

<span class="rem">// Verify that we are currently not snapped, or that we can unsnap to open the picker</span>

<span class="kwrd">var</span> currentState = Windows.UI.ViewManagement.ApplicationView.value;

<span class="kwrd">if</span> (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&

!Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {

<span class="rem">// Fail silently if we can't unsnap</span>

<span class="kwrd">return</span>;

}

<span class="rem">// Clean output in case of repeat usage</span>

cleanOutput();

<span class="kwrd">var</span> openpicker = <span class="kwrd">new</span> Windows.Storage.Pickers.FileOpenPicker();

openpicker.fileTypeFilter.replaceAll([<span class="str">".jpg"</span>, <span class="str">".png"</span>, <span class="str">".bmp"</span>, <span class="str">".gif"</span>, <span class="str">".tif"</span>]);

openpicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;

openpicker.pickSingleFileAsync().done(<span class="kwrd">function</span> (file) {

loadImage(file);

});

}

<span class="kwrd">var</span> loadImage = <span class="kwrd">function</span>(file) {

<span class="kwrd">if</span> (file) {

file.getThumbnailAsync(thumbnailMode, requestedSize, thumbnailOptions).done(<span class="kwrd">function</span>(thumbnail) {

<span class="kwrd">if</span> (thumbnail) {

outputResult(file, thumbnail, Windows.Storage.FileProperties.ThumbnailMode.singleItem, requestedSize);

} <span class="kwrd">else</span> <span class="kwrd">if</span> (isFastSelected) {

WinJS.log && WinJS.log(SdkSample.errors.noExif, <span class="str">"sample"</span>, <span class="str">"status"</span>);

} <span class="kwrd">else</span> {

WinJS.log && WinJS.log(SdkSample.errors.noThumbnail, <span class="str">"sample"</span>, <span class="str">"status"</span>);

}

}, <span class="kwrd">function</span>(error) {

WinJS.log && WinJS.log(SdkSample.errors.fail, <span class="str">"sample"</span>, <span class="str">"status"</span>);

});

} <span class="kwrd">else</span> {

WinJS.log && WinJS.log(SdkSample.errors.cancel, <span class="str">"sample"</span>, <span class="str">"status"</span>);

}

};

<span class="kwrd">function</span> outputResult(item, thumbnailImage, thumbnailMode, requestedSize) {

document.getElementById(<span class="str">"picture-thumb-modeName"</span>).innerText = thumbnailMode;

document.getElementById(<span class="str">"picture-thumb-fileName"</span>).innerText = <span class="str">"File used: "</span> + item.name;

document.getElementById(<span class="str">"picture-thumb-requestedSize"</span>).innerText = <span class="str">"Requested size: "</span> + requestedSize;

document.getElementById(<span class="str">"picture-thumb-returnedSize"</span>).innerText = <span class="str">"Returned size: "</span> + thumbnailImage.originalWidth + <span class="str">"x"</span> + thumbnailImage.originalHeight;

<span class="kwrd">var</span> can = document.getElementById(<span class="str">'paintCanvas'</span>);

<span class="kwrd">var</span> ctx = can.getContext(<span class="str">'2d'</span>);

<span class="kwrd">var</span> img = <span class="kwrd">new</span> Image();

img.onload = <span class="kwrd">function</span> () {

ctx.drawImage(img, (canvasSize - img.width) / 2, (canvasSize - img.height) / 2);

thumbnailImage.close();

}

img.src = URL.createObjectURL(thumbnailImage, { oneTimeOnly: <span class="kwrd">true</span> });

}

</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
<p>And here is the code for taking a photo</p>
<pre class="csharpcode"><span class="kwrd">function</span> startCamera() {

<span class="kwrd">var</span> livePreview = document.getElementById(<span class="str">"live-preview"</span>);

mediaCapture = <span class="kwrd">new</span> Capture.MediaCapture();

mediaCapture.initializeAsync().then(<span class="kwrd">function</span> () {

livePreview.src = URL.createObjectURL(mediaCapture);

livePreview.play();

});

}

<span class="kwrd">var</span> picturesLib = Storage.KnownFolders.picturesLibrary;

picturesLib.createFolderAsync(<span class="str">"Winstagram"</span>, Storage.CreationCollisionOption.openIfExists)

.then(<span class="kwrd">function</span> (folder) {

pics = folder;

});

<span class="kwrd">function</span> takePhoto() {

<span class="kwrd">if</span> (takePhotoBlock) {

console.log(<span class="str">'take photo is disabled'</span>);

<span class="kwrd">return</span>;

}

takePhotoBlock = <span class="kwrd">true</span>;

pics.createFileAsync((<span class="kwrd">new</span> Date()).getTime()+<span class="str">".jpg"</span>, Storage.CreationCollisionOption.generateUniqueName)

.then(<span class="kwrd">function</span> (file) {

<span class="kwrd">var</span> photoProperties = Windows.Media.MediaProperties.ImageEncodingProperties.createJpeg();

mediaCapture.capturePhotoToStorageFileAsync(photoProperties, file).then(<span class="kwrd">function</span> () {

console.log(<span class="str">"Image saved on disk on: "</span> + file.path);

takePhotoBlock = <span class="kwrd">false</span>; <span class="rem">// not needed, because the page will be rendered again.</span>

WinJS.Navigation.navigate(<span class="str">"/collage.html"</span>, { file: file });

});

mediaCapture.onfailed = <span class="kwrd">function</span> (e) {

takePhotoBlock = <span class="kwrd">false</span>;

console.log(e);

};

});

}

</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image003.png"><img title="clip_image003" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="clip_image003" src="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image003_thumb.png" width="506" height="339"></a> </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image005.jpg"><img title="clip_image005" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="clip_image005" src="http://www.onemenny.com/blog/wp-content/uploads/2012/12/clip_image005_thumb.jpg" width="509" height="319"></a> </p>
<p>Most important thing: It was fun and easy to get started with, unlike many languages and frameworks out there that state so but don’t deliver. Still, the API needs to be learned and understood, and after building our app we still believe that we only understand 80% of the code – which is a good thing for 1 day “getting to know WinRT” thingy. </p>
<p>[repository: <a href="https://github.com/manishma/windows-8-javascript-application">https://github.com/manishma/windows-8-javascript-application</a>]</p>
