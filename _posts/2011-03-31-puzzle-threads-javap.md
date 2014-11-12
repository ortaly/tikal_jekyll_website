---
layout: post
title: 'Puzzle: Threads + Javap'
created: 1301561338
permalink: puzzle-threads-javap
tags:
- JAVA
- threads
---
<p>How many times will the loop iterate? </p>
<pre title="code" class="brush: java;">
public class TestThreads extends Thread {
    static int i = 0;

    public void run() {
        for( ; i &lt; 5; i++) {
            System.out.println(getName() + &quot; &quot; + i);
        }
    }

    public static void main(String args []) {
        new TestThreads().start();
        new TestThreads().start();
    }
}
</pre>
<p>The (long) answer is here: </p>
<p>http://www.javaranch.com/journal/200607/ThreadsAndJavap.html</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
