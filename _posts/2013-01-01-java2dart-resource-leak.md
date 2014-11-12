---
layout: post
title: Java2Dart Resource Leak
created: 1357027410
author: oren.kleks
permalink: /java/java2dart-resource-leak
tags:
- JAVA
- Java DART leak
---
<p>&nbsp;<b id="internal-source-marker_0.8324027063790709" style="font-weight: normal;"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Java developers need to use</span><a href="http://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); vertical-align: baseline; white-space: pre-wrap;"> try finally clause in order to prevent resources leak</span></a><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">. </span></b></p>
<p><b id="internal-source-marker_0.8324027063790709" style="font-weight: normal;"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;"> &nbsp;</span></b></p>
<pre title="code" class="brush: java;">
 try (BufferedReader br =
                   new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }</pre>
<p><b id="internal-source-marker_0.8324027063790709" style="font-weight: normal;"><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Prior to Java SE 7 the code looked like</span><br />
</b></p>
<pre title="code" class="brush: java;">
BufferedReader br = null;
try{
br =  new BufferedReader(new FileReader(path))
} finally{
	if (br == null) {
		br.close();
}
}</pre>
<p><b id="internal-source-marker_0.8324027063790709" style="font-weight: normal;"><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;"><br class="kix-line-break" />
</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The following code will guaranty that br.close(), will be called when the try block is over.</span><br />
<br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">DART too has resources which needs to be closed, in order to prevent leaks. For example, </span><a href="http://api.dartlang.org/docs/bleeding_edge/dart_io/OutputStream.html#close"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); vertical-align: baseline; white-space: pre-wrap;">here </span></a><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">and basically most of the </span><a href="http://api.dartlang.org/docs/bleeding_edge/dart_io.html"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); vertical-align: baseline; white-space: pre-wrap;">dart:io library </span></a><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">&nbsp;requires calling close().</span><br />
<span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">However the </span><a href="https://groups.google.com/a/dartlang.org/forum/?fromgroups=#!topic/misc/XaVCi1_giCU"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); vertical-align: baseline; white-space: pre-wrap;">DART language does not support</span></a><span style="font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;"> syntax which eliminates the finally pitfall.</span><br />
<br />
<span style="font-size: 13px; font-family: Consolas; color: rgb(51, 51, 51); background-color: rgb(245, 245, 245); vertical-align: baseline; white-space: pre-wrap;"> &nbsp;</span></b></p>
<pre title="code" class="brush: java;">
  OutputStream out = null;
    try {
      out =  new File(&quot;c:\\log.txt&quot;).openOutputStream(FileMode.WRITE);
      out.writeString(&quot;FILE ACCESSED ${new Date.now()}&quot;);
      
    } finally{
      if (out != null){
        out.close();
      }
    }</pre>
<p>&nbsp;</p>
