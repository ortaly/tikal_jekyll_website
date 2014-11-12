---
layout: post
title: 'Mockito in real world: ArgumentMatcher and ArgumentCapture'
created: 1308069213
author: andrew
permalink: /java/mockito-real-world-argumentmatcher-and-argumentcapture
tags:
- JAVA
- unit testing
- testing
- mockito
- JUnit
- Java Junit Tests
---
<p>&nbsp;Mockito really helps when you want to make white box testing. In addition to testing the results of some code, you can make sure that the code makes necessary method calls during its execution.&nbsp;</p>
<p>For example, the following method prints the current time:</p>
<pre title="code" class="brush: java;">
public MyClass {
  public void printTime(PrintStream ps) {
    ps.print(&quot;Current time is: &quot;);
    Date now=new Date();
    SimpleDateFormat sdf=new SimpleDateFormat(&quot;hh:mm&quot;);
    ps.print(sdf.format(now));
  }
}</pre>
<p>Let's try to test this code. We want to make sure the code calls PrintStream 2 times, ignore the first call and check that the second one is in correct format: two digits, colon(:) and another two digits.</p>
<p>I started with writing a custom ArgumentMatcher just to check there is a semicolon in a string:</p>
<pre title="code" class="brush: java;">
class SemicolonMatcher implements ArgumentMatcher&lt;String&gt; {
  public boolean matches(String s) {
    return s.contains(&quot;:&quot;);
  }
}</pre>
<p>If you write the test in most simple form:</p>
<pre title="code" class="brush: java;">
PrintStream ps=mock(PrintStream.class);
new MyClass().printTime(ps);
verify(ps).print(&quot;Current time is: &quot;);
verify(ps).print(argThat(new SemicolonMatcher()));
}</pre>
<p>This test will fail. The first verify() will succeed, but the second will grab all the invocations of print(), including the first invocation with &quot;Current time is: &quot;.</p>
<pre title="code" class="brush: xhtml;">
org.mockito.exceptions.verification.TooManyActualInvocations: 
printStream.print(&lt;Semicolon matcher&gt;);
Wanted 1 time:
-&gt; at .....
But was 2 times. Undesired invocation:
-&gt; at ....</pre>
<p>That was weird. I'd expect every verify worry only on 1 invocation, the same way the verify() with simple arguments checks only 1 invocation.</p>
<p>Anyway, to create a working test, you can use ArgumentCapture:</p>
<pre title="code" class="brush: java;">
PrintStream ps=mock(PrintStream.class);
new MyClass().printTime(ps);
ArgumentCaptor&lt;String&gt; captor=ArgumentCaptor.forClass(String.class);
verify(ps, times(2)).print(captor);
assertTrue(captor.getAllValues().get(1).contains(&quot;:&quot;));</pre>
<p>To my taste, this looks much less readable, but I could not find a better way to solve this problem.</p>
<p>In Mockito documentation it's said that you cannot combine simple arguments with mathchers in same verify(). But I did not find the explanation, why all invocations (of print() in my example)&nbsp;pass through the same verify() if I use the matchers. For me, it's very confusing.</p>
<p>If you have an idea how to combine simple arguments with matchers, please, please let me know.</p>
<p>
<meta charset="utf-8" /></p>
