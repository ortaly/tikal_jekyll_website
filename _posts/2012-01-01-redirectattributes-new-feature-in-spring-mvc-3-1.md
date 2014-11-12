---
layout: post
title: RedirectAttributes - new feature in Spring MVC 3.1
created: 1325456670
author: danny
permalink: "/redirectattributes-new-feature-spring-mvc-31"
tags:
- JAVA
- spring mvc
- Spring MVC 3.1
- FlashScope
- RedirectAttributes
---
<p>&nbsp;<b id="internal-source-marker_0.21295745158568025" style="font-size: 75%; background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">As every one probably knows Flash Scope would be very useful feature in every modern web framework. It allows us to use POST/Redirect/GET design pattern which solves a lot of issues associated with handling of page Multiple submits or resubmission data to browsers. </span></b></p>
<div>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Unfortunately there </span><a href="https://jira.springsource.org/browse/SPR-6464"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 153); background-color: transparent; font-weight: normal; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; ">was no flash scope </span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">implementation in Spring prior to 3.1, so the only option was to set interceptor which will do all the works for us. You can read more about it in my&nbsp;</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 153); background-color: transparent; font-weight: normal; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; "><a href="http://stackoverflow.com/a/5883270/225396">StackOverflow post</a>.</span></b></p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Luckily for us in Spring MVC 3.1 the picture was changed and <a href="http://static.springsource.org/spring/docs/3.1.x/javadoc-api/org/springframework/web/servlet/mvc/support/RedirectAttributes.html"><em>RedirectAttributes</em></a> class was introduced. Let&rsquo;s see some code example.</span></b></p>
<p style="font-size: 75%; line-height: 21px; ">&nbsp;</p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Let&rsquo;s consider that we have very simple registration form. when user submits his details it will be saved on some database and registration confirmation message will appear on the page. </span></b></p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">This article goal is indeed to demonstrate FlashScope feature, so we will skip all Bean and duplicate user name/mail validation. </span></b></p>
<p style="font-size: 75%; line-height: 21px; ">&nbsp;</p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Our form looks like this and is very simple:</span></b></p>
<p style="font-size: 75%; line-height: 21px; ">&nbsp;</p>
<pre title="code" class="brush: xhtml;" style="line-height: 160%; font-size: 75%; ">
&lt;form:form id=&quot;myform&quot; action=&quot;saveUserDetails.action&quot; method=&quot;POST&quot; commandName=&quot;user&quot;&gt;
   &lt;form:input type=&quot;text&quot; name=&quot;firstName&quot; path=&quot;firstName&quot;/&gt;
   &lt;form:input type=&quot;text&quot; name=&quot;lastName&quot; path=&quot;lastName&quot;/&gt;
   &lt;form:input type=&quot;text&quot; name=&quot;email&quot; path=&quot;email&quot;/&gt;
   &lt;input type=&quot;submit&quot; value=&quot;submit&quot;&gt;
&lt;/form:form&gt;
<br type="_moz" /></pre>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Code which maps saveUserDetails.action:</span></b></p>
<pre title="code" class="brush: java;" style="line-height: 160%; font-size: 75%; ">
        @RequestMapping(value=&quot;/saveUserDetails.action&quot;, method=RequestMethod.POST)
	public String greetingsAction(@Validated User user,RedirectAttributes redirectAttributes){
                //Save user object.
                someUserdetailsService.save(user);
		//setting attributes 
                redirectAttributes.addFlashAttribute(&quot;firstName&quot;, user.getFirstName());
		redirectAttributes.addFlashAttribute(&quot;lastName&quot;, user.getLastName())
		return &quot;redirect:success.html&quot;;
	}</pre>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">As you can see we are passing RedirectAttributes object as a parameter to our greetingAction method and are just using it to add all our flash scope parameters which will be required right after redirect to success.html.</span></b></p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Let&rsquo;s see our success.hml controller method:</span></b>&nbsp;</p>
<pre title="code" class="brush: java;" style="line-height: 160%; font-size: 75%; ">
	@RequestMapping(value=&quot;/success.html&quot;, method=RequestMethod.GET)
	public String successView(){
		return &quot;success&quot;;
	}</pre>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">We don&rsquo;t have any mention of RedirectAttributes &nbsp;object here. So how do we &nbsp;fetch it you would ask? This answer hidden in success.html view jsp page. We simply print it in jstl manner:</span></b></p>
<pre title="code" class="brush: java;" style="line-height: 160%; font-size: 75%; ">
&lt;div&gt;
&lt;h1&gt;Hello ${firstName} ${lastName}. Your details stored in our database.&lt;/h1&gt; 
&lt;/div&gt;<br /></pre>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Looks fantastic, However you need to know something before you start to use it.</span></b></p>
<p style="font-size: 75%; line-height: 21px; "><font color="#333399"><br />
</font></p>
<p style="font-size: 75%; line-height: 21px; "><b id="internal-source-marker_0.21295745158568025"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">1) </span></b><span style="color: rgb(0, 0, 0); "><b id="internal-source-marker_0.21295745158568025"><span style="font-size: 15px; font-family: Arial; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">You should have RequestMappingHandlerMapping, RequestMappingHandlerAdapter, and ExceptionHandlerExceptionResolver enabled. you might enable it using:</span></b></span></p>
<p style="line-height: 160%; ">&lt;mvc:annotation:driven /&gt; <br />
<b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(51, 51, 51); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">in Dispatcher Servlet XML file.&nbsp;&nbsp; </span></b><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(51, 51, 51); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; "> </span></b></p>
<p style="line-height: 160%; ">&nbsp;</p>
<p style="line-height: 160%; ">2)<span style="color: rgb(0, 0, 0); ">&nbsp;<b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; line-height: 160%; "><span style="font-size: 15px; font-family: Arial; background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Pre Spring MVC 2 users were using ModelAndView object which would be returned to Controller from request mapped function. After Spring 2, this approach is still supported, but the preferred way would be to return String with the View Name (as we did in our examples above).</span></b><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; line-height: 160%; "><span style="font-size: 15px; font-family: Arial; background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">I have some bad news for ModelAndView funs - RedirectAttributes will not work if ModelAndView are used in controller. &nbsp;</span></b></span></p>
<p style="line-height: 160%; ">&nbsp;</p>
<div>
<p><span style="color: rgb(0, 0, 0); ">Our example works well, but it has some flow. What would happen if F5 or refresh button would be used in our browser, after flash attributes were printed?&nbsp;</span></p>
<p><span style="color: rgb(0, 0, 0); ">Yep, you are right. It will print userName and password as null values, and the reason for that is simple - Flash Scope supports only one redirect and its attribute are automatically cleared after redirect.&nbsp;</span></p>
<p><b id="internal-source-marker_0.21295745158568025" style="background-color: transparent; "><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Luckily, we can solve it in very simple way. We would check whether &nbsp;inputFlashMap exists in request or not. if it does, then the current GET request is part of Post/Redirect/Get design pattern and if it&rsquo;s not then user got this page by mistake and we will redirect him from there. </span></b></p>
<p>&nbsp;</p>
</div>
<pre title="code" class="brush: java;" style="line-height: 160%; font-size: 75%; ">
@RequestMapping(value=&quot;/success.html&quot;, method=RequestMethod.GET)
	public String successView(HttpServletRequest request){
		Map&lt;String,?&gt; map = RequestContextUtils.getInputFlashMap(request); 
		if (map!=null)
		   return &quot;success&quot;;
		else return &quot;redirect:someOtherView&quot;;&nbsp;</pre>
</div>
<p>&nbsp;</p>
