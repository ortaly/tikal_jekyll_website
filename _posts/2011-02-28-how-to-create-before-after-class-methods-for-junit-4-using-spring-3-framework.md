---
layout: post
title: How to create before / after class methods for JUnit 4 using Spring 3 framework
created: 1298914147
author: roni
permalink: /java/how-create-after-class-methods-junit-4-using-spring-3-framework
tags:
- JAVA
- JUnit
---
<p>When I wrote a JUnit class for testing inprocess FTP server, I'd like to startup the server when the class initiates and shutdown when the class is being destroyed.</p>
<p>I saw it is pretty easy with JUnit 4 annotations to use the <em><a href="http://twitter.com/BeforeClass">@BeforeClass</a></em> and <em><a href="http://twitter.com/AfterClass">@AfterClass</a></em> above the startup and shutdown methods, and insert the required actions inside them.</p>
<p>The problem is those methods should be defined as static, and when using Spring resource like ftp server it can't be defined as a static variable because the Ioc is happening during the Spring life cycle. Here is a code segment describes the problematic:</p>
<pre class="brush: java;gutter: false; highlight: [1]; " title="code">
// The resource can't be static.
@Resource
private static FtpServer ftpServer;

@BeforeClass
public static void beforeTestClass() throws Exception {
   ftpServer.start();
}
@AfterClass
public static void afterTestClass() throws Exception {
   ftpServer.stop();
}</pre>
<p>To overcome this situation I create <em>TestExecutionListener</em> which is a listener triggered by the Spring life cycle and enables us to add our custom code during the Spring loading process. In the case above I implement the methods <em>beforeTestClass</em> and <em>afterTestClass</em> to achieve my goal. Here is a code segment with the implementation:</p>
<pre class="brush: java;gutter: false; " title="code">
public class FtpTestExecutionListener extends AbstractTestExecutionListener {
   @Override
   public void beforeTestClass(TestContext testContext)
   throws Exception {
      FtpServer ftpServer = (FtpServer)
      testContext.getApplicationContext().getBean(ftpServer);
      ftpServer.start();
   }
   @Override
   public void afterTestClass(TestContext testContext)
   throws Exception {
      FtpServer ftpServer = (FtpServer)
      testContext.getApplicationContext().getBean(ftpServer);
      ftpServer.stop();
   }
}</pre>
<p>Finally we also need to register our listener by adding annotation to the JUnit class:</p>
<pre title="code" class="brush: java;gutter: false; ">
@TestExecutionListeners(listeners = FtpTestExecutionListener.class)</pre>
<p>&nbsp;</p>
