---
layout: post
title: ' GWT ramblings of a Flex developer - localization / I18N'
created: 1327855907
author: sefi
permalink: /js/gwt-ramblings-flex-developer-localization-i18n
tags:
- JS
- localization
- i18n
- i10n
- gwt
- flex
---
<p>Hello again,</p>
<p>&nbsp;</p>
<p>This time I want to talk about localization (a.k.a. i18n).</p>
<p>As Flex developers, as I assume you already know, all you have to do is create a *.properties file (say Messages.properties) and in it define keys with localized values, like:</p>
<pre title="code" class="brush: java;">
columnHeaderName=Name</pre>
<p>&nbsp;</p>
<p>Then, in the main application mxml, you would define the resource bundles:</p>
<pre title="code" class="brush: java;">
	&lt;mx:Metadata&gt;
		[ResourceBundle(&quot;Messages&quot;)]
	&lt;/mx:Metadata&gt;</pre>
<p>&nbsp;</p>
<p>And basically you're done. All you need to do to use it, is use the ResourceManager class to access the localized value of the key.</p>
<p>Simple stuff, right?</p>
<p>&nbsp;</p>
<p>Not so with GWT...</p>
<!--break-->
<p>Oh, you still need to define the *.properties file pretty much the same way, but using it is a hassle.</p>
<p>&nbsp;</p>
<p>First, you need to make sure the GWT maven plugin knows about the bundle, you do this by adding the following to the GWT plugin pom definition, under the configuration node:</p>
<pre title="code" class="brush: java;">
&lt;i18nMessagesBundles&gt;
	&lt;resourceBundle&gt;com.samples.resources.Messages&lt;/resourceBundle&gt;
&lt;/i18nMessagesBundles&gt;</pre>
<p>&nbsp;</p>
<p>Second, you need to compile it. Yes, compile it.</p>
<p>You heard me.</p>
<p>Every modification you make, even if it's just a modified value and not a single change to the keys, you need to compile.</p>
<p>That is because when you compile using the GWT maven plugin with the i18n goal, a Java inteface is generated for each properties file, and it looks something like (for the example above):</p>
<pre title="code" class="brush: java;">
  /**
   * Translated &quot;Name&quot;.
   * 
   * @return translated &quot;Name&quot;
   */
  @DefaultMessage(&quot;Name&quot;)
  @Key(&quot;columnHeaderName&quot;)
  String columnHeaderName();</pre>
<p>&nbsp;</p>
<p>Yuck.</p>
<p>Now, you want to use it right? Even more Yuckiness.</p>
<p>You need to have GWT create an instance of it everywhere you want to use it, by calling:</p>
<pre title="code" class="brush: java;">
public static Messages MESSAGES = GWT.create(Messages.class);</pre>
<p>&nbsp;</p>
<p>To facilitate it better, and also for CSS bundles (we'll discuss this in the next post, just ignore that code for now) I have created a Services class that centralizes it:</p>
<pre title="code" class="brush: java;">
public class Services {
	public static Messages MESSAGES = GWT.create(Messages.class);
	
	public static MyBundle MY_BUNDLE = GWT.create(MyBundle.class);
	public static MyCss MY_CSS = MY_BUNDLE.css();

}</pre>
<p>&nbsp;</p>
<p>Then, when you need to use it, you'd call:</p>
<pre title="code" class="brush: java;">
Services.MESSAGES.columnHeaderName()</pre>
<p>&nbsp;</p>
<p>When using UiBinder, you'd have to define a &lt;ui:with&gt; tag:</p>
<pre title="code" class="brush: java;">
&lt;ui:with type=&quot;com.samples.resources.Messages&quot; field=&quot;constants&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>And then use it, for example:</p>
<pre title="code" class="brush: java;">
&lt;g:InlineLabel text=&quot;{constants.enterPasswordHere}&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>For me, the whole thing is unnecessarily combersome.</p>
<p>When you take into consideration that you need to compile on every change, this makes the development process combersome even more.</p>
<p>&nbsp;</p>
<p>Stay tuned, next post will discuss CSS handling...</p>
<p>&nbsp;</p>
