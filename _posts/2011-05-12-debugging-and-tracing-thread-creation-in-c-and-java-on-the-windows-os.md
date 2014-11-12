---
layout: post
title: Debugging and tracing thread creation in C and Java on the Windows OS
created: 1305208854
permalink: debugging-and-tracing-thread-creation-in-c-and-java-on-the-windows-os
tags:
- JAVA
- threads
- job interview
---
<p><b><u>Introduction:</u></b></p>
<p>The introduction of multi core processor computers has spawned a intense argument on the virtues of designating and <span style="mso-spacerun:yes">&nbsp;</span>implementing concurrent programs utilizing threads and synchronization.</p>
<p>&nbsp;</p>
<p>Even so, in the java domain , and in particular, java server side containers and servers, <span style="mso-spacerun:yes">&nbsp;</span>multi-threaded programming is still a regular pattern for writing concurrent <span style="mso-spacerun:yes">&nbsp;</span>software. <span style="mso-spacerun:yes">&nbsp;</span></p>
<p>&nbsp;</p>
<p>More and more vendors have opted to use the java.util.concurrent library or one of its variants (see: http://www.tikalk.com/java/high-performance-java-threading-library ), in order to implement their support for multi-threaded programs.</p>
<p>As a consequence, there is a steep decent in the number of Employers incorporating questions about threads as part of their screening process which brings us to the topic of this post.</p>
<p>&nbsp;</p>
<p>A collogue who has just graduated attended a java job interview and was presented with the following questions:</p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpFirst"><span style="mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span>Given a running java process, how can you list the threads owned by the process?</p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpLast"><span style="mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span>Can you suggest a way to prove that creating a Java thread will create a native OS thread and if not prove otherwise? <span style="mso-spacerun:yes">&nbsp;</span></p>
<p>We can answer the first question <b>(which is NOT the focal of this post)</b> by running either VisualVM, jstat or programmatically (if at all possible inside the jvm) using JMX. <span style="mso-spacerun:yes">&nbsp;</span>But hold your horses before attempting to answer the second question ... <span style="mso-spacerun:yes">&nbsp;</span>let's get back to the first question ...</p>
<p style="margin-top:5.0pt;margin-right:0in;margin-bottom:9.75pt;margin-left:
.5in;text-indent:-.25in;line-height:15.75pt;mso-list:l1 level1 lfo2"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;mso-bidi-theme-font:
minor-latin"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:
minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">Using jstak: once you have the PID of the process (for instance using jps), you can use jstack (http://java.sun.com/j2se/1.5.0/docs/tooldocs/share/jstack.html) to generate a thread dump: </span></p>
<p style="margin-bottom:17.25pt;line-height:15.75pt"><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:
minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">jstack [-l] &lt;pid&gt; </span></p>
<p style="margin-bottom: 17.25pt; line-height: 15.75pt;"><span style="font-size: 11pt; font-family: &quot;Calibri&quot;,&quot;sans-serif&quot;;"><img width="637" height="43" src="/files/upload/15/perf_tun_img_3.jpg" alt="" /></span><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi;mso-no-proof:yes"><br />
</span></p>
<p style="margin-bottom:9.75pt;line-height:15.75pt"><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:
minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">Note that I &ldquo;piped&rdquo; the result into a file for postmortem analysis. Also note that in case of a deadlock the following text will be printed out: &ldquo;Found &lt;n&gt; Java-level deadlock: &ldquo; where &lt;n&gt; is the number of deadlock detected. </span></p>
<p style="margin-top:5.0pt;margin-right:0in;margin-bottom:9.75pt;margin-left:
.5in;text-indent:-.25in;line-height:15.75pt;mso-list:l1 level1 lfo2"><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Calibri;mso-bidi-theme-font:
minor-latin"><span style="mso-list:Ignore">2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-size:
11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:
minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">using VisualVM: attach to the JVM process and click the &ldquo;Thread dump&rdquo; button to generate a thread dump on the fly: </span></p>
<p style="margin-top:5.0pt;margin-right:6.75pt;margin-bottom:35.25pt;
margin-left:0in;line-height:15.75pt"><span style="font-size:11.0pt;font-family:
&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:
Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;mso-no-proof:yes"><img width="475" height="265" src="/files/upload/15/perf_tun_img_4.jpg" alt="" /><br />
</span><span style="mso-bidi-font-family:Calibri;mso-bidi-theme-font:minor-latin"><span style="mso-list:Ignore">3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span>Using JMX: invoke getThreadCount() on the ThreadMXBean<span style="mso-spacerun:yes">&nbsp; </span>interface which returns the current number of live threads including both daemon and non-daemon threads:</p>
<p style="margin: 5pt 6.75pt 35.25pt 0in; line-height: 15.75pt;"><span style=""><img width="960" height="600" src="/files/threads.jpg" alt="" /><br />
</span>For more information see: http://download.oracle.com/javase/1.5.0/docs/api/java/lang/management/ThreadMXBean.html <span style="mso-spacerun:yes">&nbsp;</span></p>
<p><b><u>Creating threads in java:</u></b></p>
<p>Before discussing Java thread creation, let's see how thread are created on a native OS such as Windows. We shall get back to java soon after.</p>
<p>&nbsp;</p>
<p><b><u>Creating a native Windows OS thread using C:</u></b></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;
mso-ascii-theme-font:minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:
minor-latin;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;
mso-bidi-theme-font:minor-bidi">In order to answer question #2 we shall contemplate <span style="mso-spacerun:yes">&nbsp;</span>the issue of the creation of native OS threads from the JVM <span style="mso-spacerun:yes">&nbsp;</span>using a minimalistic program which will demonstrate the creation and concurrent execution of threads using the Windows API C method CreateThread(). </span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">&nbsp;</span></p>
<p><span style="font-size:11.0pt;
font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:
Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">From the documentation </span>(<span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">see : http://msdn.microsoft.com/en-us/library/ms682453%28v=vs.85%29.aspx</span>)<span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">we know <b>exactly</b> where this method is implemented, it is under nt32.dll. We could easily set a breakpoint on that DLL and answer the question bare with me and but more on that later. Even so let's write a program and debug it to trace the call to the DLL, then we can see if the same chain of events takes place <b>under java</b> and answer the question. <span style="mso-spacerun:yes">&nbsp;</span></span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">&nbsp;</span></p>
<p><span style="font-size:11.0pt;
font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:
Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi">I used CodeBlock, which is an open source, cross platform, free C++ IDE available from http://www.codeblocks.org/ alongside the GNU C/C++ tool-chain:</span></p>
<p><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">&nbsp;</span></p>
<pre><span style="font-size:11.0pt;
font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:
Calibri;mso-fareast-theme-font:minor-latin;mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;mso-no-proof:yes"><img alt="" src="/files/gnu.jpg" /><br /></span></pre>
<pre><span style="font-size:11.0pt;font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-ascii-theme-font:
minor-latin;mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;
mso-hansi-theme-font:minor-latin;mso-bidi-font-family:Arial;mso-bidi-theme-font:
minor-bidi">&nbsp;</span></pre>
<p style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
line-height:normal" class="MsoNormal">The Win32 API method signature for new thread creation is:</p>
<pre class="brush: c++;" title="code">
//Creates a thread that will run threadMthood concurrently with the main thread.
    threadHandle = CreateThread(NULL,           // pointer to security attributes
                                0,              // initial thread stack size
                                threadMthood,   // pointer to thread function
                                intPtr,         // argument for new thread
                                0,              // creation flags
                                &amp;threadID);     // pointer to receive thread ID

    //After successful invocation, CreateThread returns immediately and threadMthood begins to run</pre>
<p><span style="mso-no-proof:yes"><br />
</span></p>
<p>&nbsp;</p>
<p>lets view the source code for the whole program which is heavily documented:</p>
<pre class="brush: c++;" title="code">
#include &lt;windows.h&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
//#include &lt;system.h&gt;
#define MAX_THREADS 3

DWORD WINAPI threadMthood(LPVOID threadArgument)
{
    int actualVal;
	actualVal = *(int *)threadArgument;
	fprintf(stderr,&quot;Argument is: %d\n&quot;,actualVal);
	return NULL;
}

int main()
{
    printf(&quot;Hello tikal\n&quot;);

    int i=99;//magic number
	int *intPtr;
	HANDLE threadHandle;
	DWORD threadID;
	DWORD waitRetVal;

    intPtr = (int *)malloc(sizeof(int));
    *intPtr = i;
    //Creates a thread that will run threadMthood concurrently with the main thread.
    threadHandle = CreateThread(NULL,           // pointer to security attributes
                                0,              // initial thread stack size
                                threadMthood,   // pointer to thread function
                                intPtr,         // argument for new thread
                                0,              // creation flags
                                &amp;threadID);     // pointer to receive thread ID

    //After successful invocation, CreateThread returns immediately and threadMthood begins to run
    if (threadHandle == NULL) {
        fprintf(stderr,&quot;Could not create Thread\n&quot;);
        exit(0);
    }
    else {
        printf(&quot;Thread %d was created\n&quot;,threadID);
    }

    printf(&quot;Wait for the child thread to terminate...\n&quot;);
    //Waits until the specified object is in the signaled state
    //or the time-out interval elapses.
    //INFINITE means the function will return only when the object is signaled.
    waitRetVal = WaitForSingleObject(threadHandle,INFINITE);
    printf(&quot;WaitForSingleObject() return value is %d\n&quot;, waitRetVal);

    // Close the handle to the thread
    // Closing the thread handle does NOT terminate the thread.
    if(CloseHandle(threadHandle) != 0) {
            printf(&quot;Child thread handle was successfully closed\n&quot;);
    }
    else {
        printf(&quot;Failed to close child thread handle: reason %u\n&quot;, GetLastError());
    }
	return 0;
}
</pre>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal">&nbsp;</p>
<p>The output for executing Test123.exe is:</p>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal"><img width="511" height="181" alt="" src="/files/console.jpg" /></p>
<p>&nbsp; &nbsp;</p>
<p>Now, assuming we only have the executable, how do we actually trace the call to nt32.dll? There are several ways to accomplish that:</p>
<p>&nbsp;</p>
<p>1- Use an analyzer such as PEiD (http://www.peid.info/) which is a GUI-based program that identifies more than 600 different signatures in PE files. Let's use it.</p>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal">&nbsp;</p>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal"><img alt="" src="/files/peid.jpg" /></p>
<p>Open the executable and click the &quot;Win 32 console arrow&quot;&nbsp;</p>
<p>&nbsp;</p>
<p>You will be prompted with the &quot;PE details&quot; window, from there select the &quot;ImportTable&quot; option and you will be prompted with a forth window ... which will provide us with the information we need: <span style="mso-spacerun:yes">&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="mso-no-proof:yes"><img width="623" height="343" alt="" src="/files/peid2.jpg" /><br />
</span></p>
<p>&nbsp;</p>
<p>As evident from the GUI <span style="mso-spacerun:yes">&nbsp;</span>we can see that our C executable is using the KERNEL32.DLL and we can even see the exact address offset of the CreateThread method inside the DLL.</p>
<p>&nbsp;</p>
<p>2- What would you do in order to see when and where the CreateThread is invoked?<span style="mso-spacerun:yes">&nbsp; </span>simple, we use a debugger/disassembler such as IDA pro (http://www.hex-rays.com/idapro/) or OLLYDBG (http://www.ollydbg.de/). Both tools are very frequently used for reverse engineering and malware analysis.<span style="mso-spacerun:yes">&nbsp; </span>If we open the Test123.exe file using OllyDBG and step through using F8 each line (it's stepping the disassembly which is the actual machine code, in this case X86 assembly instructions).</p>
<p>&nbsp;</p>
<p><span style="mso-no-proof:yes"><img width="960" height="600" alt="" src="/files/olly.jpg" /><br />
</span></p>
<p><span style="mso-spacerun:yes">&nbsp;</span><span style="mso-spacerun:yes">&nbsp;</span><span style="mso-spacerun:yes">&nbsp;</span></p>
<p>We can see that at memory address <strong>004013BB</strong>, there is a call to CreateTjhread and voila, we almost have our answer.</p>
<p><span style="mso-spacerun:yes">&nbsp;</span></p>
<p><b><u>So ... back to Java: </u></b></p>
<p>&nbsp;</p>
<p>The following java program creates a very simple thread in java using the Thread class and is self explanatory:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
package com.tikalk;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;

/**
 * Created by IntelliJ IDEA.
 * User: skashani
 */
public class TikalThreads {

    public static void main(String args[]) {
        ThreadMXBean tb = ManagementFactory.getThreadMXBean();
        System.out.println(&quot;Current thread count:&quot; + tb.getThreadCount());

        Thread thread = new TikalThread();
        thread.start();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException ignore) {
            ignore.printStackTrace();
        }
    }

    static class TikalThread extends Thread {
        // This method is called when the thread runs
        public void run() {
            System.out.println(&quot; I am a java thread, my name is:&quot; + Thread.currentThread().getName());

        }
    }
}
</pre>
<p>&nbsp;</p>
<p>Very important note : even if it is possible to debug a java program using any IDE such as intelliJ or Eclipse, <span style="mso-spacerun:yes">&nbsp;</span>we <b>cannot debug a java program in the sense that we debug a C/C++ program</b> and the reason being that Java is using byte code and a JVM - hence the actual program that needs to be debugged in order to intercept a native Windows API createThread() call is <b>java.exe</b> and NOT the actual class itself.</p>
<p>&nbsp;</p>
<p><b>However</b>, <b>disassembling the java.exe program in a similar fashion as we did with the C program using OLLYDBG is strictly against the law and will invalidate the EULA from oracle, not to mention being at a very high risk for a federal law suit :) </b></p>
<p><b>&nbsp;</b></p>
<p>What we can do is attach a tool named procexp.exe (process explorer available here:<span style="mso-spacerun:yes">&nbsp; </span>http://technet.microsoft.com/en-us/sysinternals/bb896653) . The tool, written by Sysinternals (now owned by Microsoft) is part of a series of system tools that are meant to aid in such circumstances. <span style="mso-spacerun:yes">&nbsp;</span></p>
<p>Let's use it:</p>
<p>Start by executing the tool - you will see a list of all the processes running on the computer (not including hidden process):</p>
<p>&nbsp;</p>
<p><span style="mso-no-proof:yes"><img alt="" src="/files/plist.jpg" /><br />
</span></p>
<p>&nbsp;</p>
<p>We can see that the java.exe program is running.</p>
<p>Next double click the row associated with PID=6784 and you will be prompted with a new window, next select the &quot;threads&quot; tab and click the thread<img alt="" src="/files/dll-call.jpg" />:</p>
<p>&nbsp;<span style="mso-no-proof:yes"><br />
</span></p>
<p>&nbsp;</p>
<p><strong>The tool does NOT disassemble the java.exe and hence does not break any law in doing so.</strong></p>
<p>This shows the STACK of the specific thread, and if you look closely you will <strong>NOT</strong> see a call to createThread(). <strong>We do see a call to <span style="">BaseThreadInitThunk <span style="mso-spacerun:yes">&nbsp;</span>which normally is the function that calls the thread&rsquo;s start function</span></strong><span style="mso-ascii-font-family:
Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:Calibri;mso-bidi-theme-font:
minor-latin"> (more on this here: http://blogs.msdn.com/b/ntdebugging/archive/2009/03/06/it-s-not-my-fault-a-case-of-remote-code-injection-gone-bad.aspx)</span></p>
<p><span style="mso-spacerun:yes">&nbsp;</span></p>
<p>Nevertheless, it will NOT show us the actual chain of events from Java to KERNEL32.DLL, it will only show, as depicted in the above image, what API is being used not when and where. It might have been used <b>prior </b>to running our TikalThread.java program, <strong>and in any case we can sarcastically conclude that:</strong></p>
<p><strong>&nbsp;</strong></p>
<p><strong>We have to break the law if want to pass the job interview :)</strong></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<!--![endif]__comment__end__&nbsp;

-->
