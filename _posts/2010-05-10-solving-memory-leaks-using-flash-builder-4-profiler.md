---
layout: post
title: Solving memory leaks using Flash builder 4 profiler
created: 1273518396
permalink: solving-memory-leaks-using-flash-builder-4-profiler
tags:
- JS
- profiler
- methodology
- memory leaks
- guide
- FB4
---
<p><a href="http://help.adobe.com/en_US/flashbuilder/using/WS6f97d7caa66ef6eb1e63e3d11b6c4d0169-7ff6.html#WS6f97d7caa66ef6eb1e63e3d11b6c4d0d21-7ee2">Locating memory leaks </a>section in FB4 docs provides an overview and few techniques for handling this issue.</p>
<p><br />
In this article I would like to offer another technique for using the object references view to quickly track down the root of a memory leak, straight down to the exact line of code causing it.</p>
<!--break-->
<p>&nbsp;</p>
<p><strong>In short:</strong></p>
<p><br />
1. Choose a repeatable sequence.</p>
<p><br />
2. Use the &quot;Generate object allocation stack traces&quot; checkbox when starting the profiling session.</p>
<p><br />
3. Execute the sequence several times, and take a first memory snapshot. Execute it few times more and take a second snapshot.</p>
<p><br />
4. Locate a class whose instances are not being GCed.</p>
<p><br />
5. Open this class in the object references view for both snapshots.</p>
<p><br />
6. Expand the first instance's back reference list, and look for suspicious path.</p>
<p><br />
7. Starting from top to root, go through the path, and for each object compare its instance count for both snapshots.&nbsp;</p>
<p>&nbsp;<br />
The instance whose count is the same for both snapshots is causing the memory leak, and accumulates instances of the object it holds a reference to. it is a one-to-many-reference-holder.</p>
<p>&nbsp;</p>
<p><br />
8. By looking at the Allocation Trace view for the accumulated object, you can find where in the code the reference was added to it.</p>
<p><br />
9. Make sure the reference is removed.<br />
&nbsp;<br />
<strong>Details:<br />
</strong></p>
<p><br />
I assume you are already familiar with this view, and got to the point where you know which the object not being GCed is, and needs to find out who's preventing it from being released.</p>
<p><br />
In an average application, after running a sequence of steps a few times, you may find yourself with hundreds of instances of the same class, each has hundreds of back references listed in the object references view, which can be quite overwhelming. <br />
&nbsp;</p>
<p>Where do you start? What should you look for? <br />
&nbsp;</p>
<p>You came to the right place! I will show you a very quick and simple way to spot the bug:</p>
<p><br />
Before I start, there is an important concept you should get familiar with. I call it &quot;the one to many reference holder&quot;. <br />
The idea is quite simple, and is best visualized by an&nbsp;illustration:</p>
<p>&nbsp;</p>
<p>Let's say you have a memory leak which results with 3 instances of the same object (class A) in the first snapshot, and 6 instances in the second snapshot (taken after repeating the same sequence of steps few more times) . A possible topology of these objects references may look like this in the first and second snapshots:<br />
&nbsp;</p>
<p>&nbsp;</p>
<p><img height="273" alt="" width="576" src="/files/upload/7/snapshots%20topology.JPG" /></p>
<p>In the above illustration, all three instances are referenced by a single object (of class B), which is referenced up to the GC root. <br />
Class B is a one&ndash;to-many-reference-holder,and&nbsp; is a good candidate for causing a memory leak. In case the number of class A instances keeps growing while you repeat the scenario, then class B has a memory leak. <br />
&nbsp;</p>
<p>Another possible reference topology may end up with the same result of 3 and 6 instances:<br />
<br />
&nbsp;</p>
<p><img height="361" alt="" width="586" src="/files/upload/7/snapshots%20topology2.JPG" /></p>
<p>This time, the 3 instances are held by other 3 instances (class B), which in turn are held, again, by a single object (class C), which is held up to the root. In this topology, although class B does hold a reference to class A, we can clearly see that it is pointless to deal with it, since class C is the one accumulating references. He is a one-to-many-reference-holder and causes the memory leak. If we deal with class C, the class B instances along with class A instances are all gone.</p>
<p>&nbsp;</p>
<p>Having this concept clear, answers the question &quot;what do we look for?&quot;.</p>
<p>&nbsp;</p>
<p>Although FB4 does not have this nice topology view for object references (<a href="http://corlan.org/">Mihai Corlan </a>kindly pointed me to <a href="http://www.gskinner.com/blog/archives/2010/04/the_flashsample.html">Grant skinner's article </a>on the flash sampler which might be used for&nbsp;allowing this kind of view), you'll see that finding these one-to-many-reference-holders is a matter of minutes. In the &quot;object references&quot; view, you open a suspected path to the object, and start following it to the root, checking the instance count of each object on this path.</p>
<p>&nbsp;</p>
<p>Let's look on a real life sample:</p>
<p>&nbsp;</p>
<p><img height="408" alt="" width="642" src="/files/upload/7/object%20references%20view.JPG" /></p>
<p>&nbsp;</p>
<p>Looking at this view(part of the namespaces is hidden for client's privacy sake), we see the following classes along this path:</p>
<p>&nbsp;</p>
<p><br />
DatagridItemRenderer, CoverageMetricRenderer, SummaryFooter, ConfigurableDataGrid, DataGridContent, ProfilerExtendedQueryResultWrapper , TransactionclassesProxy and so on.</p>
<p>&nbsp;</p>
<p><br />
We then go back to the <strong>Memory snapshot view</strong>, sort it by class name, and check the number of instances of each class (Instances column).</p>
<p>&nbsp;</p>
<p><br />
The following table summarizes the number instances of the above mentioned classes for two snapshots (the second taken after few more scenario repeats):<br />
&nbsp;</p>
<table cellspacing="1" cellpadding="1" width="200" border="1">
    <thead>
        <tr>
            <th scope="col">class<br />
            &nbsp;</th>
            <th scope="col"><span style="font-size: 11pt; line-height: 115%; font-family: &quot;Calibri&quot;,&quot;sans-serif&quot;; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Arial; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: HE"><font color="#000000">Snapshot <a href="http://search.twitter.com/search?q=%231">#1</a> instances count</font></span></th>
            <th scope="col"><span style="font-size: 11pt; line-height: 115%; font-family: &quot;Calibri&quot;,&quot;sans-serif&quot;; mso-ascii-theme-font: minor-latin; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Arial; mso-bidi-theme-font: minor-bidi; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: HE"><font color="#000000">snapshot <a href="http://search.twitter.com/search?q=%232">#2</a> instances count</font></span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>DatagridItemRenderer<br />
            &nbsp;</td>
            <td>266</td>
            <td>524</td>
        </tr>
        <tr>
            <td>CoverageMetricRenderer<br />
            &nbsp;</td>
            <td>225</td>
            <td>443</td>
        </tr>
        <tr>
            <td>SummaryFooter<br />
            &nbsp;</td>
            <td>7</td>
            <td>13</td>
        </tr>
        <tr>
            <td>ConfigurableDataGrid<br />
            &nbsp;</td>
            <td>9</td>
            <td>18</td>
        </tr>
        <tr>
            <td>DataGridContent<br />
            &nbsp;</td>
            <td>9</td>
            <td>17</td>
        </tr>
        <tr>
            <td><strong><span search.twitter.com="">ProfilerExtendedQueryResultWrapper<br />
            </span></strong></td>
            <td><strong><span search.twitter.com="">4</span></strong></td>
            <td><strong><span search.twitter.com="">4</span></strong></td>
        </tr>
        <tr>
            <td>TransactionclassesProxy<br />
            &nbsp;</td>
            <td>2</td>
            <td>2</td>
        </tr>
    </tbody>
</table>
<p>The picture become very clear now: <strong><span search.twitter.com="">ProfilerExtendedQueryResultWrapper </span></strong>remains with the same number of instances between snapshots, but the number of instances (of class DataGridContent) it holds, keeps growing.</p>
<p>&nbsp;</p>
<p><br />
<strong>This is our one-to-many-reference-holder !</strong></p>
<p>&nbsp;</p>
<p><br />
Resolving this will clear this path from this point up.</p>
<p>&nbsp;</p>
<p>Let's take a closer look at the suspected area:</p>
<p>&nbsp;</p>
<p><img height="91" alt="" width="535" src="/files/upload/7/zooming.JPG" /></p>
<p>&nbsp;</p>
<p>From looking at the object references view, we can see that ProfilerExtendedQueryResultWrapper has a property named _entries, which is of type ArrayCollection. This property accumulates references to DataGridContent instances.</p>
<p>&nbsp;</p>
<p><br />
When you see the [savedThis] and [listener0] properties, it's an indication of reference made by adding event listeners, and should be read as follows:<br />
&nbsp;</p>
<p>&nbsp;</p>
<p>One of DataGridContent's functions was added as an event handler to an event dispatched by _entries property of ProfilerExtendedQueryResultWrapper.<br />
As a result, _entries holds a reference to DataGridContent instance through one of it's functions.</p>
<p>&nbsp;</p>
<p><br />
In case you are familiar with the code, it will probably take you few minutes to locate where exactly in the code does this happen.<br />
However, FB4 can take you to the exact line of code, relieving you from the task of looking for it by yourself:</p>
<p>&nbsp;</p>
<p><br />
In order to let FB4 find the buggy line of code, you should check the &quot;Generate object allocation stack traces&quot; checkbox when starting the profiler session:<br />
&nbsp;</p>
<p><img height="503" alt="" width="398" src="/files/upload/7/generate%20object%20allocation.JPG" /></p>
<p>&nbsp;</p>
<p>Turning this feature on, allows you to see where in the code was an instance created.<br />
In this case, the instance of interest is the instance of the function added to the arrayCollection's list of event listeners.</p>
<p>&nbsp;</p>
<p>Clicking on the &quot;Function&quot; row will show you it's allocation trace on the right &quot;Allocation trace&quot; pane. Clicking on the topmost line of this trace will open the code editor on the line where this function instance was created&nbsp; (line 99 in DataGridContent class):</p>
<p>&nbsp;</p>
<p><img height="355" alt="" width="779" src="/files/upload/7/event%20handler%20memory%20leak.JPG" /><br />
&nbsp;</p>
<p>&nbsp;Let's examine this code excerpt:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
allResults = (value as IProfilerResult).entries;
allResults.addEventListener(CollectionEvent.COLLECTION_CHANGE,handleCollectionChange)
</pre>
<p>&nbsp;</p>
<p><br />
We can see that <em>handleCollectionChange </em>function, which belongs to <em>DataGridContent </em>class, is being added as a handler to the collection change event of the <em>entries </em>property.</p>
<p>&nbsp;</p>
<p><br />
As it turns out, this event listener is not removed, and the entries property does not belong to a child of <em>DataGridContent </em>(adding an event listener to your child does not cause memory leaks due to the GC sweep mechanism).</p>
<p>&nbsp;</p>
<p><br />
This is our memory leak bug&nbsp;&nbsp; !</p>
<p>&nbsp;</p>
<p><u>Resolving event listener memory leaks:</u></p>
<p><br />
A memory leak caused by an event listener can be solved by one of these ways:</p>
<p>&nbsp;</p>
<p><br />
1.&nbsp;Take care of removing the event listener when it is no longer needed.<br />
2.&nbsp;Use the useWeakReference parameter to create a weak event listener .</p>
<p>&nbsp;</p>
<p>In our case changing the code to the following solved the problem:<br />
allResults.addEventListener(CollectionEvent.COLLECTION_CHANGE,handleCollectionChange,false,0, <strong><span search.twitter.com="">true </span></strong>);</p>
<p>&nbsp;</p>
