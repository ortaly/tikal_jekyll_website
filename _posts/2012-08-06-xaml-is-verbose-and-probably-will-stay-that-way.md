---
layout: post
title: XAML is Verbose; and probably will stay that way
created: 1344241960
author: menny
permalink: /net/xaml-verbose-and-probably-will-stay-way
tags:
- .NET
---
<blockquote><p>“XAML is so verbose it’s hard to imagine that humans were ever supposed to write it. And that’s because they weren’t! In the land of lollipops and rainbows, designers were supposed to use Blend and developers were going to use the VS designer, and no one would even look at XAML. Yet, it’s 2012, and even as Blend has improved most people are still hand-writing XAML”</p>
</blockquote>
<p><img style="margin: 10px 0px 0px 7px; display: inline; float: right" align="right" src="http://3.bp.blogspot.com/-LQ4EP75k3X4/TykzBLpZsCI/AAAAAAAABMU/0p-TGOdFXjU/s1600/EvolveFish.jpg" width="180" height="69"><a href="http://www.paulstovell.com/six-years-of-wpf">Paul Stovell wrote this just a couple of days ago</a> in his post “<a href="http://www.paulstovell.com/six-years-of-wpf">Six years of WPF; what’s changed?</a>”, and he is so right. In his post he compares the verbosity of ASP.Net (including the Razor engine) to XAML. I always felt this way and never had the right words to put behind the filling. If you wanna write even the simplest UI you need to type and type and type till your hands hurt. Of course this is still way better then Windows Forms technology but still lacks so many things that open source community could lead to. Just like the Ruby guys where every new easy way for doing things gets built write into the language. </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:20c40e57-0f04-4fcf-861e-3bc12c76102f" class="wlWriterEditableSmartContent">
<pre name="code" class="xml"><StackPanel>
    <TextBlock Margin="20">Welcome to the World of Verbosity XAMLity</TextBlock>
    <Button Margin="10" HorizontalAlignment="Right">OK</Button>
</StackPanel>
</pre>
</div>
<blockquote>
<p>“can’t begin to tell you how tired I am of hearing about this pattern, especially from ex-WinForms developers who think it is the bees knees because they read Silverlight Unleashed and were amazed by MVVM Light. </p>
<p>The reality is that every WPF project I’ve been brought on to has involved some guy thinking he was smart enough to invent his own MVVM framework, only for it to be a half-baked knock-off of someone’s Code Project article. All WPF projects end up with a ViewModelBase that is so choc full of inherited members for threading and progress bars and INotifyPropertyChanged. Showing a view in a dialog takes 20 times more code than it would if you just put the code in Button1_Click, and it’s equally as well tested since most people using MVVM are doing it because they claim it is testable but no one is actually writing unit tests for their view models, except the architects inventing the MVVM frameworks in the first place. “</p>
</blockquote>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: right; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" align="right" src="http://www.onemenny.com/blog/wp-content/uploads/2012/08/image_thumb.png" width="210" height="244"></a>And here again – HE IS SO RIGHT. In 90% of the places and customers I have worked with, unit testing where not implemented for the UI level. The other thing is that everybody likes to think that one day they will change their views into something else (say HTML5) and keep their view models intact – but the mere truth is that even if they do so they would probably end up rewriting everything and not just turn their old code out of the box to serve a new platform. I see developer kill for their MVVM even on small projects (even I found myself falling in that same pit again and again) instead of simplicity. </p>
<p>I remember how much time it took me to learn WPF coming from web and WinFoms technology, and I remember asking “why didn’t MS stick to HTML and CSS that already have proved themselves?” again and again. XAML enables you to do things that are very hard to do with WinForms but (today) are easy to do with HTML. IMHO, that is why the new winRT is supported to work with javascript and not just C++/C# and XAML. </p>
<p>I never saw myself as a WPF/Silverlight developer and never could put the finger on the spot why. Today I know that even in enterprises the desktop apps are shrinking, but still, will always be needed whether they are WPF or some other technology based. So if you never delved into WPF then don’t start now being a WPF master does not sound like a good long term investment. Having said all that, WPF still have a decent place in the windows stack, but I wish it would be HTML like or at least more robust by becoming an open source technology as well.</p>
