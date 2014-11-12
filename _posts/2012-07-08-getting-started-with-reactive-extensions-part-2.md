---
layout: post
title: Getting Started with Reactive Extensions (part 2)
created: 1341772894
author: menny
permalink: /getting-started-reactive-extensions-part-2
tags:
- .NET
---
<p>This is the second post in the series about RX
<ul>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions/">part 1 – Intro</a>
<li>part 2 – Mouse Events
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-3/">part 3 – Complex Collection Events</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-4/">part 4 – Client Server Async</a></li>
</ul>
<h1>Demo – simple mouse move</h1>
<p>On my <a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions/">previous post</a> I explained what RX is and how to get started with it. Now will go through some examples.
<p>Consider the following window, where the mouse moves and you want to capture the mouse location. Notice I have no buttons to “catch” or “apply” the mouse position and I just want to track the current hovered item.
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image002.jpg"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="clip_image002" border="0" alt="clip_image002" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/clip_image002_thumb.jpg" width="396" height="265"></a>
<p>Without RX I had to open a timer and manage some sort of state machine to track the changes along the timer ticks. If I wanted to track the mouse only when the mouse stops moving I would have ended up with two timers or a much complex state machine. With RX I just have to set the following:</p>
<pre class="brush: csharp;">Observable.FromEventPattern<MouseEventArgs>(this, "MouseMove")
    .Throttle(TimeSpan.FromSeconds(1))
    .ObserveOnDispatcher()
    .Subscribe(ShowColor);
</pre>
<p>What we did here is create an observer on the mouse move, and the Throttle (wait for) 1 second till the mouse stops moving, observer on the dispatcher (UI thread) and finally, subscribe using a method to show the result</p>
<pre class="brush: csharp;">if (VisualTreeHelper.HitTest(blueBorder, e.EventArgs.GetPosition(blueBorder)) != null)
{
    MouseColors.Add("Blue");
}
else if (VisualTreeHelper.HitTest(greenBorder, e.EventArgs.GetPosition(greenBorder)) != null)
.
.
.
</pre>
<p>Now, we can take this a step further and listen to a particular event for each of the borders instead of just HitTesting where the mouse is</p>
<pre class="brush: csharp;">//observer directly the control with merge

Observable.FromEventPattern<MouseEventArgs>(blueBorder, "MouseMove")
    .Merge(Observable.FromEventPattern<MouseEventArgs>(greenBorder, "MouseMove"))
    .Merge(Observable.FromEventPattern<MouseEventArgs>(redBorder, "MouseMove"))
    .Merge(Observable.FromEventPattern<MouseEventArgs>(yellowBorder, "MouseMove"))
    .Throttle(TimeSpan.FromSeconds(1))
    .ObserveOnDispatcher()
    .Subscribe(ShowColor2);
</pre>
<p>Notice that I <strong>merge </strong>different events into one subscription. We can take this even further by only propagating changes – so if the mouse moves over just one border will not raise a new subscription event (DistinctUntilChange)</p>
<pre class="brush: csharp;"> Observable.FromEventPattern<MouseEventArgs>(blueBorder, "MouseMove")
   .Merge(Observable.FromEventPattern<MouseEventArgs>(greenBorder, "MouseMove"))
   .Merge(Observable.FromEventPattern<MouseEventArgs>(redBorder, "MouseMove"))
   .Merge(Observable.FromEventPattern<MouseEventArgs>(yellowBorder, "MouseMove"))
   .Throttle(TimeSpan.FromSeconds(1))
   .DistinctUntilChanged(e => e.Sender) //new 
   .ObserveOnDispatcher()
   .Subscribe(ShowColor2);
</pre>
<p>On the next post I’ll have a more complex demo using collections. </p>
<p> </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/RxWpfDemoMouseMove.rar">Code for this demo here</a></p>
