---
layout: post
title: ThreadLocal and WeakReference
created: 1362553442
author: chaim.turkel
permalink: threadlocal-and-weakreference
tags:
- JAVA
- Java
- threadlocal
- WeakReference
---
<p>&nbsp;</p>
<p>Let&rsquo;s say we have a service that does some processing. This service needs to support multithreading, and there is some additional information that needs to be saved along the main process.</p>
<p>For example, I have a dao service. This service in addition to saving the entity, knows to save the full graph of the entity. What I need in the end of an action (update) is a list of all entities that where effected. Since this service is a singleton and multiple threads will be calling the same update function I need to save this information somewhere.</p>
<p>One option is to pass a callback, but that is not very nice. Since the saving calls multiple functions, I will need to pass the callback to all function, or refactor to move all code to a class that will be created for the processing.</p>
<p>A second option is for the calling thread to register a list (not part of the calling function, but a separate one), and for the service to fill that list with all the changes. The list itself will be stored on the ThreadLocal, and then multiple threads can run with no problem. The problem now is, how can I make sure that the calling thread will unregister the list so that the memory will be released?</p>
<p>The simple solution for this is not to store a pointer to the list itself on the local thread, but to use a weak reference. This will hold a pointer to the list, but will not be counted as a holding pointer as far as the garbage collection is concerned. &nbsp;This means that once the client calling thread will leave scope the allocated list will be garbage collected, and then the local thread will not take any extra memory. Within the calling code any access to the weak reference will be null in the case that the list was released.</p>
<p>For further information on weak reference please see: http://weblogs.java.net/blog/2006/05/04/understanding-weak-references</p>
