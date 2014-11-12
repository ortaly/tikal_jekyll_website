---
layout: post
title: Getting Started with Reactive Extensions (part 4)
created: 1341780216
author: menny
permalink: /getting-started-reactive-extensions-part-4
tags:
- .NET
---
<p>This is the forth and final post in the series about RX</p>
<ul>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions/">part 1 – Intro</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-2/">part 2 – Mouse Events</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-3/">part 3 – Complex Collection Events</a>
<li>part 4 – Client Server Async</li>
</ul>
<h1>Demo – Client Server Async events</h1>
<p>Consider the following situation. I have a WCF server and a Windows (or web client). The client can dispatch service request to the server and the server returns an async response. Now, when the user dispatches many requests at the same time for the same data, I only want to get one response from the server. As you can see in the image below, I only get one answer for all my calls.  </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image10.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb10.png" width="569" height="317"></a></p>
<p>Let’s look at the client code (Ctor of main windows in this case)</p>
<pre class="brush: csharp;"> public MainWindow()
{
    InitializeComponent();
    DataContext = _vm = new MyViewModel();

    //create instance of my WCF service
    _service = new MyService.MyServiceClient("BasicHttpBinding_IMyService");

    //register with weak reference to the button click event (instead of using myButton.Click += MyRoutedEventHandler(sender, eventArgs)           
    var buttonClick = Observable.FromEventPattern<RoutedEventHandler, RoutedEventArgs>(h => myButton.Click += h, h => myButton.Click -= h);
    buttonClick.Subscribe(s => 
    { 
        _vm.ClientResponse.Add(_counter.ToString()); 
    });

    //Observer my async service method (AddOne)
    var myAsyncServiceCall = Observable.FromAsyncPattern<int /*service input*/, int /*service output*/>(_service.BeginAddOne, _service.EndAddOne);

    //subscribe
    buttonClick
        .Select(s => _counter) //we dont care for s which is of type RoutedEventArgs, we want to "work" on the _counter instead
        .Throttle(TimeSpan.FromSeconds(1)) //wait for 1 secods to see that nothing happend
        .SelectMany( t=> myAsyncServiceCall(t).TakeUntil(buttonClick)) //select the result from the observer we declared above
        .DistinctUntilChanged() //distinct
        .ObserveOnDispatcher() //work on UI thread
        .Subscribe(s => //what to do with the result
        {
            _counter = s;
            _vm.ServerResponse.Add(s.ToString());
        });
}
</pre>
<p>As you can see I register to the button click event using reactive. This ensures I have a week reference observing an event, which can come quite handy when working with view models where strong references can cause a memory leak at some points. I didn’t have to do it, I could just “+=” the Button click event, but again, this is just to demo RX so hence the event subscription. </p>
<p>Next, I observe from async pattern (my WCF service begin and end methods). Then take the button click observer, change the context to my _counter (using the Linq Select on the second line). Throttle the event for 1 second to see that the user has stopped clicking the button. Then I use SelectMany to get a response from the server async event until (TakeUntil) the button is clicked again; In this case, I discard the response and keep selecting till a new response arrives to my final button click event. </p>
<p>The rest is pretty self-explanatory (you can download the code at the end of this post). </p>
<p>Well, that’s it. This concludes 4 posts on getting started with RX. Personally, I found RX very helpful in many cases. It’s not the answer to everything, but can sure be helpful in today’s async world. </p>
<p>There are many emerging frameworks for instance: <a href="http://www.reactiveui.net/">RX UI, and MVVM</a> I strongly encourage you to evaluate whether you need RX here and there or want to have a complete solution with RX. In many cases you would probably only need a tweak here and there… </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/RxDemoClientServer.rar">Code for this demo</a></p>
