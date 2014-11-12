---
layout: post
title: Node.js plugin for NetBeans and daemons
created: 1316358987
author: andrew
permalink: /nodejs-plugin-netbeans-and-daemons
tags:
- JAVA
---
<p>Today I tried <a href="http://plugins.netbeans.org/plugin/36653/nodejs">NodeJS plugin for NetBeans</a>. It allows to run a node straight from the NetBeans. I took an HTTP variant of &quot;Hello, world&quot; sample, which listens to port 8000, and responses with greetings to every request after a short delay. NetBeans stopped responding. So I downloaded the sources of this plugin to see how to fix it.</p>
<p>&nbsp;</p>
<p>First of all, this is the source of my &quot;Hello, world&quot;:</p>
<pre title="code" class="brush: jscript;">
var sys = require('sys'),
    http = require('http');

    http.createServer(function (req, res) {
        setTimeout(function () {
            sys.puts('requested '+req.url)
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');
        }, 100);
    }).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');</pre>
<p>&nbsp;</p>
<p>So to narrow the problem, I commented out the <code>http.createServer</code> block, so this program only lies about listening, and exits immediately. This time, NetBeans did not stuck, ran the code as expected, and printed the &quot;Server running...&quot; in the output window. Same happens if I do start listening, make a few requests, and then kill the node with <code>killall node</code>. But the output 'requested /' and 'requested /favicon.ico' which were supposed to be printed during requests, were all printed after I killed the Node.js server.</p>
<p>&nbsp;</p>
<p>So I started to suspect that they run the server synchronously, and was right. Here is a snippet from the sources of the plugin, method <code>cz.kec.nb.nodejs.RunNode.performAction</code>:</p>
<pre title="code" class="brush: java;">
            Process proc = Runtime.getRuntime().exec(cmd);
            proc.waitFor();                                           //    &lt;------ NetBeans gets stuck here   !!!
            BufferedReader read = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            BufferedReader readerr = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            while (read.ready()) {
                out.println(read.readLine());
            }
            while (readerr.ready()) {

                printErrLine(readerr.readLine(), io);
                //erout.println(readerr.readLine());
            }</pre>
<p>&nbsp;</p>
<p>Unfortunately, Java designers did not provide a way to check the process status without blocking, you can only wait until process ends. So we have to waste a thread on this <code>proc.waitFor</code>. Really annoying and wasteful.</p>
<p>&nbsp;</p>
<p>BTW, I looked at the implementation class, package private <code>java.lang.UNIXProcess</code>, and it has private <code>hasExited</code> field. Many thanks to whoever decided to make this unaccessible for the rest of us, all the wasted threads will torture you for eternity, when the time comes! Mwahaha!</p>
<p>&nbsp;</p>
<p>Anyway, in addition to this thread, necessary because of a lame API of java.lang.Process, another thread is necessary for reading and printing whatever Node.js application wants to print. I'm pretty sure, that's not a correct way for a NetBeans plugin to deal with long-running tasks, and will be glad if someone shows me a correct way. But it worked for me :-). So, after my changes the code looked like this:</p>
<pre title="code" class="brush: java;">
            final Process proc = Runtime.getRuntime().exec(cmd);
            final BufferedReader read = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            final BufferedReader readerr = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            final AtomicBoolean done = new AtomicBoolean(false);
            new Thread(new Runnable() {
                public void run() {
                    try {
                        while (!done.get()) {
                            while (read.ready()) {
                                out.println(read.readLine());
                            }
                            while (readerr.ready()) {
                                printErrLine(readerr.readLine(), io);
                                //erout.println(readerr.readLine());
                            }
                            Thread.sleep(500);
                        }
                        
                        read.close();
                        readerr.close();
                    
                    } catch (Exception ex) {
                        Exceptions.printStackTrace(ex);
                    }
                }
            }).start();
            new Thread(new Runnable() {
                public void run() {
                    try {
                        proc.waitFor();
                    } catch (InterruptedException ex) {
                        Exceptions.printStackTrace(ex);
                    }
                    finally {
                        done.set(true);
                    }
                }
            }).start();</pre>
<p>&nbsp;</p>
<p>Cross-posted to <a href="http://andskiba.blogspot.com">my abandoned, but hopefully resurrecting blog</a>.</p>
<p>&nbsp;</p>
