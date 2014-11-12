---
layout: post
title: GWT ramblings of a Flex developer - CSS and Images
created: 1329057913
author: sefi
permalink: /gwt-ramblings-flex-developer-css-and-images
tags:
- JAVA
- resources
- GWTP
- gwt
- CssResource
- css
- ClientBundle
---
<p>&nbsp;Hey!</p>
<p>&nbsp;</p>
<p>Last time, we talked about I18N and as promised, this time we'll discuss CSS handling.</p>
<p>Since you can't really talk about CSS without talking about images, we'll also mention them as well.</p>
<!--break-->
<p>&nbsp;</p>
<p>Well, as seasoned Flex devs, you know that using CSS in Flex is a brease.<br />
You just slap the style tag in your application mxml and you're done.</p>
<p>&nbsp;</p>
<p>In GWT, things are not that easy.</p>
<p>Let's say you have the css file, say 'MyCss.css':</p>
<pre title="code" class="brush: java;">
.expanded {
	width: 100%;
	height: 100%;
}

.bold24Title {
	font-size: 24px;
	font-weight: bold;
}

.statusBar {
	font-size: 14px;
}

.mainToolbar {
	padding-left: 10px;
	padding-right: 10px;
}

.loginTitle {
	font-size: 16px;
	font-weight: bold;
}</pre>
<p>&nbsp;</p>
<p>Now, you want to use it, right?</p>
<p>Well, brace yourself - Yuckiness ahead!</p>
<p>&nbsp;</p>
<p>First thing you need to do, is extend CssResource and fill it up with accessors:</p>
<pre title="code" class="brush: java;">
public interface MyCss extends CssResource {
	
	String expanded();
	
	String bold24Title();
	
	String statusBar();
	
	String mainToolbar();
	
	String loginTitle();
}</pre>
<p>&nbsp;</p>
<p>Then, you have to extend the ClientBundle imterface:</p>
<pre title="code" class="brush: java;">
public interface MyBundle extends ClientBundle {
	
	@Source(&quot;MyCss.css&quot;)
	MyCss css();

	@Source(&quot;images/image1.png&quot;)
	ImageResource image1();
	
	@Source(&quot;images/image2.png&quot;)
	ImageResource image2();
}</pre>
<p>&nbsp;</p>
<p><em>* Note: this is also the place where you define image references using ImageResource</em></p>
<p><em>&nbsp; &nbsp;To use it, the CSS should be defined as @sprite and define gwt-image:</em></p>
<pre title="code" class="brush: java;">
@sprite .sampleStyle {
	width: 165px;
	height: 200px;
	margin: 6px;
	background-position: bottom;
	gwt-image: &quot;image1&quot;;
}</pre>
<p>&nbsp;</p>
<p>Then, you have to make sure that MyBundle is injected, in your EntryPoint's onModuleLoad method:</p>
<pre title="code" class="brush: java;">
public void onModuleLoad() {

	// inject css
	MyBundle bundle = GWT.create(MyBundle.class);
	bundle.css().ensureInjected();
}</pre>
<p>&nbsp;</p>
<p>Now, remember the Services class I mentioned last post?<br />
It comes into play here as well, to facilitate better use of it:</p>
<pre title="code" class="brush: java;">
public class Services {
	public static Messages MESSAGES = GWT.create(Messages.class);
	
	public static MyBundle MY_BUNDLE = GWT.create(MyBundle.class);
	public static MyCss MY_CSS = MY_BUNDLE.css();

}</pre>
<p>&nbsp;</p>
<p>This is to allow me to use Services.MY_CSS.expanded to get the expanded style from Java code.</p>
<p>When using UiBinder, you'll have to first define a &lt;ui:with&gt; tag:</p>
<pre title="code" class="brush: java;">
&lt;ui:with type=&quot;com.examples.resources.MyBundle&quot; field=&quot;res&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>And then use it, for example:</p>
<pre title="code" class="brush: java;">
&lt;g:InlineLabel styleName=&quot;{res.css.bold24Title}&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>That's it for now...</p>
<p>Until next time - Happy coding!&nbsp;</p>
<p>&nbsp;</p>
