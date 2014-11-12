---
layout: post
title: Caller Information Example (C# 5.0)
created: 1371632793
author: menny
permalink: caller-information-example-c-5-0
tags:
- .NET
---
<p><span style="color: rgb(55, 55, 55); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; line-height: 24px;">Well, just a quick reference mainly to myself about using this new feature for INotifyPropertyChanged where most of the time I had to implement this using reflection. Notice the propertyName is filled in by the compiler</span></p>
<p>&nbsp;</p>
<p><span class="kwrd" style="font-family: inherit; font-size: 13px; line-height: 1.5; border: 0px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">public</span><span style="color: rgb(0, 0, 0); font-family: consolas, 'Courier New', courier, monospace; font-size: small; line-height: 1.5;"> </span><span class="kwrd" style="font-family: inherit; font-size: 13px; line-height: 1.5; border: 0px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">class</span><span style="color: rgb(0, 0, 0); font-family: consolas, 'Courier New', courier, monospace; font-size: small; line-height: 1.5;"> ViewModelBase : INotifyPropertyChanged {</span></p>
<pre class="csharpcode" style="border: 0px; font-family: consolas, 'Courier New', courier, monospace; font-size: small; margin-top: 0px; margin-bottom: 1.625em; outline: 0px; padding: 0.75em 1.625em; vertical-align: baseline; line-height: 1.5; overflow: auto; color: rgb(0, 0, 0);">
  <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">protected</span> <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">void</span> SetValue&lt;T&gt;(<span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">ref</span> T field, T <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">value</span>, [CallerMemberName] <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">string</span> propertyName = <span class="str" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 96, 128);">&quot;&quot;</span>) {
    <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">if</span> (!Object.Equals(field, <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">value</span>)) {
      field = <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">value</span>;
      OnPropertyChanged(propertyName);
    }
  }
}
 
<span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">public</span> <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">class</span> SomeControl : ViewModelBase {
  <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">private</span> <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">int</span> _someInt;
  <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">public</span> <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">int</span> SomeInt {
    get { <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">return</span> _someInt; }
    set { Set(<span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">ref</span> _someInt, <span class="kwrd" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 255);">value</span>); }  <span class="rem" style="border: 0px; font-family: inherit; font-size: 13px; font-style: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: green;">// Compiler maginc -&gt; fills in &quot;SomeInt&quot; as propertyName</span>
  }
}</pre>
<p>&nbsp;</p>
<p>if this post is malformed then go <a href="http://www.onemenny.com/blog/caller-information-example-c-5-0/">here</a></p>
