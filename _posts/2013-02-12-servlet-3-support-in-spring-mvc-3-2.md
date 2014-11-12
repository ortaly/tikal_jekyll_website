---
layout: post
title: Servlet 3 Support in Spring MVC 3.2.
created: 1360693302
author: danny
permalink: servlet-3-support-in-spring-mvc-3-2
tags:
- JAVA
- Asynchronous Servlets
- Spring3
---
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">One of the major changes in Spring MVC 3.2 &nbsp;are Servlet 3.0 and its asynchronous support. Initially it was planned to be &nbsp;added in Spring 3.1, but was postponed and only in 3.2 release dream came true. &nbsp;</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><br />
	<b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">In this article I&rsquo;m not going to discuss Servlet 3 pros and cons, neither its specification</span><br />
	<span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">If you need more info about it use this <a _fcksavedurl="http://www.javaworld.com/javaworld/jw-02-2009/jw-02-servlet3.html" href="http://www.javaworld.com/javaworld/jw-02-2009/jw-02-servlet3.html" style="color: rgb(51, 51, 153); margin: 0px; padding: 0px; text-decoration: initial;">article</a>.</span><br />
	<span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The goal is to see how easily Servlet 3.0 features can be implemented with Spring MVC. &nbsp;</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">There are two ways to use Asynchronous requests &nbsp;in Spring MVC framework:</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<ul style="margin: 0px; padding: 0px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 12px; line-height: 19px;" type="circle">
	<li style="margin: 0px; padding: 0px; list-style-image: none; list-style-type: none;">
		<b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Using controller method which returns Callable&lt;String&gt; where String is the view returned by the method. </span></b></li>
</ul>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<ul style="margin: 0px; padding: 0px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 12px; line-height: 19px;" type="circle">
	<li style="margin: 0px; padding: 0px; list-style-image: none; list-style-type: none;">
		<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px;"><span style="margin: 0px; padding: 0px; vertical-align: baseline; white-space: pre-wrap;">Using DefferedResult&lt;T&gt; which holds the result of Asynchronous operation updated by another thread.</span></p>
	</li>
</ul>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">We will write example for each case:</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">In our first example we have standard HTML form which uploads file to the server. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
 &lt;form method=&quot;post&quot; action=&quot;uploadFile.do&quot; enctype=&quot;multipart/form-data&quot;&gt;
            &lt;input type=&quot;file&quot; name=&quot;file&quot;/&gt;
            &lt;input type=&quot;submit&quot;/&gt;
        &lt;/form&gt;</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">In order to enable multipart support in Spring we will add required bean configuration:</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
&lt;bean id=&quot;multipartResolver&quot;
    class=&quot;org.springframework.web.multipart.commons.CommonsMultipartResolver&quot;&gt;
     &lt;!-- one of the properties available; the maximum file size in bytes --&gt;
    &lt;property name=&quot;maxUploadSize&quot; value=&quot;10000000&quot;/&gt;
&lt;/bean&gt;</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">Our controller looks like this:</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: java;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
@Controller
public class AsyncController {
	
@RequestMapping(value=&quot;/uploadFile.do&quot;, method=RequestMethod.POST)
	public  Callable&lt;String&gt; uploadFile( @RequestParam(&quot;file&quot;)final MultipartFile file) {
		return new Callable&lt;String&gt;() {
			@Override
			public String call() throws Exception {
				  if (!file.isEmpty()) {
					  byte[] bytes = file.getBytes();
					  FileOutputStream fop = null;
					  try{
					     fop = new FileOutputStream(FOLDER_PATH+ file.getOriginalFilename());
					     FileChannel out = fop.getChannel();
					     ByteBuffer buff = ByteBuffer.allocateDirect(bytes.length);
					     out.write(buff);
					     out.force(false);
				         buff.clear();
				         out.close();
					  } catch (Exception ex){
						  throw new Exception(ex);
					  }finally{
				          if (fop != null)
				    	  	fop.close();
					  }
						 
				  }
				return &quot;redirect:success.html&quot;;
			}
		};
	}
}</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">So as you can see the controller returns Callable&lt;String&gt;, Spring MVC start asynchronous process and submits callable to TaskExecutor, inside call() method we store file on server using java.nio methods. As soon as the result returned it passes Servlet container and dispatches it to DispatcherServlet. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Easy!!!!</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Let&rsquo;s look on another case:</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">We have web server which returns Mojodo Corp. stock quotes in real time. This server &nbsp;long polled by Web clients using AJAX. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Every 5 second we receive quote update as JMS message and we need to dispatch result to all currently connected HTTP clients. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Or controller will return DefferedResult&lt;String&gt;. This object will be saved in Set which contains all objects of DefferedResult class returned by other container threads, For example, if three clients are currently long polling server the set will contain three DefferedResult objects.</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Let&rsquo;s see how it works. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">We will create method which stores DfferedResult objects returned by other thread, its Spring bean wrapping HashSet. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: java;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
@Service(value=&quot;deferredResultContainer&quot;)
public class DeferredResultContainer {

	private final Set&lt;DeferredResult&lt;String&gt;&gt; deferredResults = Collections.synchronizedSet(new HashSet&lt;DeferredResult&lt;String&gt;&gt;() );

	public void put(DeferredResult&lt;String&gt; deferredResult){
		deferredResults.add(deferredResult);
	}
	
	public void updateAllResults(String value){	
		for (DeferredResult&lt;String&gt; deferredResult : deferredResults){
			deferredResult.setResult(value);
		}
	}</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">The bean below will receive value from third party services and notify all clients. That bean simply updates all &nbsp;DefferedResult objects located in the Set </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: java;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
@Service
public class QuateUpdateScheduler {
	
	@Autowired
	DeferredResultContainer deferredResultContainer;

 @Scheduled(fixedRate = 5000)
	    public void process() {
	        deferredResultContainer.updateAllResults(getQuateValueFromJMS());
	    }
}</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">and then the only thing is left is Spring MVC controller:</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: java;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
@Controller
public class AsyncController {
		
	@Autowired
	DeferredResultContainer deferredResultContainer;
		
	@RequestMapping(value=&quot;/getQuote.do&quot;, method=RequestMethod.GET)
	@ResponseBody
	public DeferredResult&lt;String&gt; getQuote(){
		final DeferredResult&lt;String&gt; deferredResult= new DeferredResult&lt;String&gt;();
		
		deferredResultContainer.put(deferredResult);
        deferredResult.onTimeout(new Runnable() {
			
			@Override
			public void run() {
				deferredResultContainer.remove(deferredResult);
				
			}
		});
		
		deferredResult.onCompletion(new Runnable() {
			
			@Override
			public void run() {
				deferredResultContainer.remove(deferredResult);
				
			}
		});
		return deferredResult;
	}
}
</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">So our controller is just putting the DefferedResult&lt;String&gt; into Synchronized Map wrapped by Spring bean just before method is returning it. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">After all clients are notified with result by service, its DefferedResult objects are automatically removed from Map. This part of code insures that when object is updated or request times out </span><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">it will be automatically removed from Map. </span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: java;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
 deferredResult.onTimeout(new Runnable() {
			
			@Override
			public void run() {
				deferredResultContainer.remove(deferredResult);
			}
		});
		
		deferredResult.onCompletion(new Runnable() {			
			@Override
			public void run() {
				deferredResultContainer.remove(deferredResult);
			}
		});
</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><span style="margin: 0px; padding: 0px; font-size: larger;"><span style="margin: 0px; padding: 0px; font-family: 'Courier New';"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; vertical-align: baseline; white-space: pre-wrap;">PS: </span></b></span></span><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">Using Apache Tomcat 7.0.34 I was not able to get full asynchronous Servlet 3.0 processing before changing Connector to be &nbsp;Http11NioProtocol.</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
&lt;Connector connectionTimeout=&quot;200000&quot; maxThreads=&quot;105&quot; port=&quot;8080&quot; protocol=&quot;org.apache.coyote.http11.Http11NioProtocol&quot; redirectPort=&quot;8443&quot;/&gt;</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><b id="internal-source-marker_0.5199004774913192" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium; line-height: normal; font-weight: normal;"><span style="margin: 0px; padding: 0px; font-size: 15px; font-family: Arial; vertical-align: baseline; white-space: pre-wrap;">That&rsquo;s weird, promise to use Jetty next time :)</span></b></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
