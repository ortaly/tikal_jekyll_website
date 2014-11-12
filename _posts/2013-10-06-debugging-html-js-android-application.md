---
layout: post
title: Debugging HTML + JS Android Application
created: 1381059961
author: menny
permalink: debugging-html-js-android-application
tags:
- Incubator
- Android
- Java
- Chrome
- ADB
- Phonegap
---
<p>This is a small tutorial I wrote for my-self/and team to debug PhoneGap application on android.</p>

<h1>Installing and starting the simulator</h1>

<p>I used <a href="http://www.genymotion.com/">genyomtion</a> cause it&rsquo;s real fast and easy compared to the built in eclipse simulator (specially on windows), but you can use any other simulator/device instead.</p>

<ol>
	<li>Go to <a href="http://www.genymotion.com/">genyomtion</a> site and register + install the emulator (with default settings [next-&gt;next-&gt;next])</li>
	<li>After the installation open the app and add a new virtual machine
	<ol>
		<li>Use your credentials from the previous step</li>
		<li>Choose your machine or add a new machine</li>
		<li><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/10/image1.png"><img alt="image" border="0" height="394" src="http://www.onemenny.com/blog/wp-content/uploads/2013/10/401x394ximage_thumb1.png.pagespeed.ic.5MGbVE6q8X.png" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" title="image" width="401" /></a></li>
		<li>This may take a while (about 200 MB)</li>
	</ol>
	</li>
	<li>Go to eclipse and add an &ldquo;update site&rdquo; (help-&gt;install new software&hellip; and click on the &ldquo;Add&rdquo; button on the upper right side)
	<ol>
		<li>Enter the following url <a href="http://plugins.genymotion.com/eclipse">http://plugins.genymotion.com/eclipse</a></li>
		<li><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/10/image2.png"><img alt="image" border="0" height="445" src="http://www.onemenny.com/blog/wp-content/uploads/2013/10/476x445ximage_thumb2.png.pagespeed.ic.HFNrW3LssK.png" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" title="image" width="476" /></a></li>
		<li>Wait for it to install</li>
		<li>Restart the ADT</li>
	</ol>
	</li>
	<li>Start gynomotion and start your virtual device
	<ol>
		<li>You will be asked to setup the file path to android SDK (the one ADT eclipse uses)</li>
	</ol>
	</li>
	<li>The next time you run/debug your android project you will see the new device listed in the devices window. Choose it and start the debug
	<ol>
		<li>If you have any bundeling or minification to your JavaScript files / css &ndash; this is the right time to stop it so you can debug the code more easily later.</li>
	</ol>
	</li>
</ol>

<h1>Adding the (JavaScript) debugger support</h1>

<ol>
	<li>Add the <a href="https://www.jshybugger.com/#/download">jsHyBugger</a> to the app lib folder (in my case jshybugger-bundle-1.2.2_p4.jar)

	<ol>
		<li><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/10/image3.png"><img alt="image" border="0" height="242" src="http://www.onemenny.com/blog/wp-content/uploads/2013/10/418x242ximage_thumb3.png.pagespeed.ic.uSY7edxYL7.png" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" title="image" width="418" /></a></li>
		<li>Drag it to the eclipse lib folder and add it</li>
	</ol>
	</li>
	<li>Change the Android Manifest file, under the application node, to include the <a href="https://www.jshybugger.com/#/docs/manual">JsHybugger</a> element (more help <a href="https://www.jshybugger.com/#/docs/manual">here</a>)
	<p>&lt;!&ndash; JSHybugger webview content provider &ndash;&gt;<br />
	&lt;provider android:name=&rdquo;org.jshybugger.DebugContentProvider&rdquo; android:exported=&rdquo;false&rdquo; android:authorities=&rdquo;jsHybugger.org&rdquo; /&gt;</p>

	<p>&lt;!&ndash; JSHybugger debug service &ndash;&gt;<br />
	&lt;service android:name=&rdquo;org.jshybugger.DebugService&rdquo; android:exported=&rdquo;false&rdquo; android:enabled=&rdquo;true&rdquo;/&gt;</p>

	<ol>
	</ol>

	<ol>
	</ol>
	</li>
	<li>Make sure you add the internet permission as well to you application.
	<ol>
		<li>Under the hood, JsHybugger works by creating a transparent proxy to all your JS calls (injecting code before and after each JS line).</li>
	</ol>
	</li>
	<li>Change the main activity as follow (for PhoneGap 2.x, for other FW go <a href="https://www.jshybugger.com/#/docs/manual">here</a>)</li>
</ol>

<pre class="csharpcode">
<span class="kwrd">public</span> <span class="kwrd">class</span> MainActivity extends DroidGap { 

@Override
<span class="kwrd">public</span> <span class="kwrd">void</span> onCreate(Bundle savedInstanceState) 

{
super.onCreate(savedInstanceState);
<span class="rem">// example for local page loading</span>
<span class="rem">// load html page via jsHybugger content provider </span>
super.loadUrl(<span class="str">&quot;content://jsHybugger.org//file:///android_asset/www/index.html&quot;</span>);
} 

@Override
<span class="kwrd">public</span> <span class="kwrd">void</span> init(CordovaWebView webView,
CordovaWebViewClient webViewClient, 

CordovaChromeClient webChromeClient) {
super.init(webView, webViewClient, webChromeClient); 

<span class="rem">// attach web view to debugging service </span>
DebugServiceClient.attachWebView(webView, <span class="kwrd">this</span>);
}
} 

</pre>

<h1>Installing the chrome extension</h1>

<ol>
	<li><a href="https://developers.google.com/chrome-developer-tools/docs/remote-debugging#install-adbplugin">Install ADB tools for chrome</a>

	<ol>
		<li>The ADB Chrome extension simplifies the process of setting up remote debugging. The ADB extension includes the Android Debug Bridge (ADB), which lets you debug the device over USB from your development machine. The extension provides the following benefits: &middot; Includes ADB so you don&rsquo;t have to install the full Android SDK. &middot; Provides a UI for easily starting and stopping the ADB daemon, and viewing connected devices.</li>
		<li>The Chrome Web Store installation process does not work on Windows 8. If you have any trouble installing from the Chrome Web Store, see the <a href="https://github.com/GoogleChrome/ADBPlugin/#readme">ADB extension repo on github</a> for details on how to download and install the extension manually.</li>
	</ol>
	</li>
	<li>Go to the adt tool and see the devices</li>
	<li><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/10/image4.png"><img alt="image" border="0" height="296" src="http://www.onemenny.com/blog/wp-content/uploads/2013/10/445x296ximage_thumb4.png.pagespeed.ic.50ULFX_xtu.png" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" title="image" width="445" /></a></li>
	<li>Click the &ldquo;inspect&rdquo; of the jsHyBugger link</li>
	<li><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/10/image5.png"><img alt="image" border="0" height="180" src="http://www.onemenny.com/blog/wp-content/uploads/2013/10/501x180ximage_thumb5.png.pagespeed.ic.o0Fk6QjdYa.png" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" title="image" width="501" /></a></li>
	<li>Now you can see the sources in the new opened window by chrome</li>
	<li>You cannot see the dom (elements) tab though &ndash; just js</li>
</ol>
