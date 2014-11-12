---
layout: post
title: 'Example of java cache  and  types of reference to object in Java '
created: 1288428058
author: olga
permalink: /java/example-java-cache-and-types-reference-object-java
tags:
- JAVA
- java reference cache
---
<p><span lang="EN-US" style="font-family: Arial; color: black;"> </span></p>
<p>Let's try to write a simple implementation of the memory cache.</p>
<p>To make it simple, we will try to use the standard <i>HashMap</i>, and our cash will save images.</p>
<p>Our code:</p>
<pre class="brush: java;" title="code">
private Map cache = new HashMap();

/**
 * This code is used to load the images used by our class.
 * If an image has already been accessed it may be cached, 
 * so look in the cache first. If it's not in the cache, 
 * load it from the disk.
 */
public ImageIcon getImage(String imageURL)
{
  Object cachedItem = cache.get(imageURL);
  if (cachedItem == null)
  {
    // the item wasn't found in the cache, so we'll have to
    // get it manually
    final ImageIcon imageIcon;
    try
    {
      imageIcon = new ImageIcon(imageURL);
      cache.put(imageName, imageIcon);
      return imageIcon;
    }
    catch (Exception e)
    {
      throw new RuntimeException(&quot;Cannot find image. It must be on the classpath.&quot;,e);
    }
  }
  return (ImageIcon)cachedItem;
}
</pre>
<p>You may have noticed that our cache is never cleared, which may lead to classic memory leak: objects never get dereferenced, so the garbage collector can never reclaim them ..</p>
<p>How can we solve the problem?<o:p></o:p></p>
<p>1. Add deregistration method. And we will hope, that somebody will call to it, removing old pictures from the collection.<br />
2. Use WeakHashMap instead of HashMap.</p>
<pre style="margin-left: 18pt;">
&nbsp;</pre>
<pre class="brush: java;" title="code">
private Map cache = new WeakHashMap();</pre>
<pre style="margin-left: 18pt;">
&nbsp;</pre>
<p>With this one change, we have now enabled our cache to automatically release objects to the garbage collector once those objects are no longer referenced anywhere else in the application.</p>
<p>For understanding, how it works, let&rsquo;s analyze a java package (java.lang.ref ), which allowed us to solve our problem so easily.</p>
<p>&nbsp;</p>
<p class="rtecenter"><i>java.lang.ref</i></p>
<p class="rteleft"><i>This</i> package contains classes giving reference to objects, that don&rsquo;t exist in memory also guarantee close cooperation with garbage collector.</p>
<p class="MsoNormal">Before this package appeared, it was possible to create only strong references to objects, which were accessible, until garbage collector doesn&rsquo;t clear memory allocated to the object.</p>
<pre class="brush: java;" title="code">
Object obj = new Object();</pre>
<p class="MsoNormal">&nbsp;</p>
<p>I would like to remind, that garbage collector algorithm changes all the time. Therefore, we don&rsquo;t have any guaranties, that the object will be cleaned immediately after deleting.</p>
<p>The process of cleaning can be started after number of running of garbage collector. And the process may never start, suppose that the program finishes before the garbage collector starts cleaning memory from the objects that are not used.</p>
<div><i>java.lang.ref</i> provides three classes, that allow to implement close cooperation with the garbage collector, without interfering with it: <em>SoftReference</em>,&nbsp;<em>WeakReference and <em>PhantomReference</em>.<o:p></o:p></em></div>
<p><em> </em></p>
<p class="MsoNormal"><em>&nbsp;</em></p>
<p><em> </em></p>
<h1><em><b>Basic terms:<o:p></o:p></b></em></h1>
<p><em> </em></p>
<p class="MsoNormal"><em><b>Strongly reachable</b>&nbsp;&ndash; it is possible to get an access to this object only via strong reference.</em></p>
<p><em><b>Softly reachable</b>&nbsp; - it is impossible to get an access to the object via strong reference, it can be accessible only via SoftReference.</em></p>
<p>&nbsp;</p>
<p><em><b>Weakly reachable</b>&nbsp; - cannot be accessible via strong and weakly reference. To this object will access only via WeakReference.</em></p>
<p>&nbsp;</p>
<p><em><b>Phantomly reachable</b>&nbsp; - object, therefore cannot be reachable via SoftReference and WeakReference, because its usage ended. It is reachable only via PhantomReference reference.</em></p>
<p>&nbsp;</p>
<p><em><b>Clear</b> &ndash; setting of object&rsquo;s fields to null and determination of the object as finalizable.<o:p></o:p></em></p>
<p><em> </em></p>
<h1><em>Class <i>SoftReference</i><o:p></o:p></em></h1>
<p><em>
<p>Soft reference objects are cleared at the discretion of the garbage collector in response to memory demand. Soft references are most often used to implement memory-sensitive caches.</p>
<pre class="brush: java;" title="code">
SoftReference&lt;Rectangle&gt; rect = new SoftReference&lt;Rectangle&gt;(new Rectangle());</pre>
<p>&nbsp;</p>
<h1>Class <i>WeakReference<o:p></o:p></i></h1>
<p>Weak references usable to objects, that have long lasting life, or can be recreated very easily. The difference is that object with weak reference can be cleared in any running of garbage collector, that means memory demand is not a necessary condition.<o:p></o:p> Weak references are most often used to implement canonicalizing mappings.</p>
<pre class="brush: java;" title="code">
WeakReference&lt;Rectangle&gt; rect = new WeakReference&lt;Rectangle&gt;(new Rectangle());</pre>
<p>&nbsp;</p>
<h1>Class PhantomReference</h1>
<p>Phantom references are most often used for scheduling pre-mortem cleanup actions in a more flexible way than is possible with the Java finalization mechanism. Or in case that it is necessary to save trace of an object in the memory after cleaning by garbage collector. Phantom references must be used with ReferenceQueue class. After an object is cleared from memory, it is enqueued to ReferenceQueue</p>
<pre class="brush: java;" title="code">
PhantomReference&lt;Rectangle&gt; rect =  new PhantomReference&lt;Rectangle&gt;(new Rectangle(), queue);</pre>
<p>Queues are also used with soft and weak references. Their main function is collecting references to objects in ReferenceQueue after the object is cleaned.</p>
<p>That mechanism allows to remove empty references.</p>
<p>&nbsp;</p>
<p>Main deference of phantom from others types of references is impossibility of object undeleting. Because phantom reference is enqueued only after object cleaning. In other cases, reference is enqueued until finalize() is called, therefore it is possible undelete the object, but reference to it must be deleted anyway.</p>
<p class="rtecenter"><b>Illustration of reference work in the memory</b></p>
<pre class="brush: java;" title="code">
MyObject obj = new MyObject();                  //1
ReferenceQueue rq = new ReferenceQueue();       //2
WeakReference wr = new WeakReference(obj, rq);  //3
</pre>
<p class="rteleft">&nbsp;</p>
<p class="rteleft">Let&rsquo;s try to receive the reference back</p>
<pre class="brush: java;" title="code">
wr.get();   //return strong reference to MyObject
rq.poll();  //return null
</pre>
<p class="rteleft">&nbsp;</p>
<p class="rteleft">It is important to understand, that obj is a strong reference, therefore, it must be destroyed to receive&nbsp;desired effect.</p>
<pre class="brush: java;" title="code">
obj = null;
System.gc();
</pre>
<p class="rteleft">Let&rsquo;s try to receive the reference back, now</p>
<pre class="brush: java;" title="code">
wr.get();   //return null
rq.poll();  //return reference to object WeakReference
</pre>
<p class="rteleft">&nbsp;</p>
<p class="rtecenter"><em> </em></p>
<p style="display: inline ! important;" class="rtecenter"><em>&nbsp;</em></p>
<em> </em>
<p>&nbsp;</p>
<p class="rtecenter">&nbsp;<em> </em></p>
<p style="display: inline ! important;" class="rtecenter"><em><a id="fck_paste_padding"><b>Example of program:</b></a></em></p>
<em> </em><a id="fck_paste_padding">﻿</a>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
import java.lang.ref.WeakReference;
 
public class ReferenceTest {
	public static void main(String[] args) throws InterruptedException {
 
		Student s1 = new Student(1);
		System.out.println(s1);
		WeakReference&lt;Student&gt; ws = new WeakReference&lt;Student&gt;(s1);
		System.out.println(ws.get());
		s1 = null;
		System.gc();
		Thread.sleep(1000);
 
		System.out.println(ws.get());
	}
}
 
class Student {
	public Student(int id) {
		this.id = id;
	}
 
	int id;
 
	public String toString() {
 
		return &quot;[id=&quot; + id + &quot;]&quot;;
 
	}
}
</pre>
<p class="rtecenter"><b>Examples of using</b></p>
<p class="rteleft"><i><u>WeakReference</u></i></p>
<p class="MsoNormal">We want to save additional information about of object, for example, its serial number.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="rteleft">The standard solution will be using of HashMaps, where key is our object, and value is additional field, that we want to save.</p>
<pre class="brush: java;" title="code">
serialNumberMap.put(widget, widgetSerialNumber); </pre>
<p class="rteleft">But then, the reference to object will always exist, and garbage collector will never get access to it.</p>
<p class="MsoNormal">Therefore, other solution is required. One of posible solutions can be WeakHashMap,as in our first example</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><i><u>PhantomReference</u></i></p>
<p class="MsoNormal">Allows us to determine the exact moment of removing an object from memory. It can be needed in work with very big images, when it is required to clean completely image from memory, before another image starts loading, to prevent of OutOfMemoryError.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="rteleft">&nbsp;</p>
<p class="rteleft">Using of different types of Java references, allows to reduce probability of memory leaks, as well as use memory more effectively. To implement the cache class WeakHashMap can be used.</p>
</em></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>References: http://download.oracle.com/javase/1.4.2/docs/api/java/lang/ref/Reference.html http://www.devdaily.com/blog/post/java/how-use-java-weakhashmap-class-example http://www.javaportal.ru/java/articles/referenceclasses.html (rus)</p>
