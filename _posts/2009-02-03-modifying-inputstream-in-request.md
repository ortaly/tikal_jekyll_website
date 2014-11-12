---
layout: post
title: Modifying inputStream in request
created: 1233670804
permalink: modifying-inputstream-in-request
tags:
- JAVA
---
<p><br />
<br />
Modifying inputStream in request.<br />
many thanks to Tofig<br />
<br />
<br />
i am sorry if this entry seems to be prosaic (pro zaek;-)).<br />
for me some sensation of miracle presents. so..</p>
<p>&lt;!--break--&gt;<br />
<br />
scenario.<br />
&nbsp;&nbsp; given: <br />
&nbsp;&nbsp; &nbsp;1.webservice on ssl. <br />
&nbsp;&nbsp; &nbsp;2.client and service code can't be changed.<br />
&nbsp;&nbsp; &nbsp;3.service looks for userId in requests inputStream.<br />
&nbsp;&nbsp; &nbsp;4.client don't send userId, but send certificate (client authentication).<br />
&nbsp;&nbsp; &nbsp;<br />
required:<br />
&nbsp;&nbsp; &nbsp; 1.take userId from certificate. <br />
&nbsp;&nbsp; &nbsp; 2.push it into requests inputStream.<br />
&nbsp;&nbsp; &nbsp; <br />
solution:<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.write filter where is all work will be done -- trivial.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.take userId from certificate -- very trivial, but: <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ...<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp; String getUserIdFromCertificate(HttpServletRequest request){<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; ...<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Object o = request.getAttribute(&quot;javax.servlet.request.X509Certificate&quot;);<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (o != null) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;X509Certificate certs[] = (X509Certificate[]) o;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String name = certs[0].getSubjectDN().getName();<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//name = &quot;EMAILADDRESS=yurin@tikalk.com, CN=superadmin, OU=1, O=tikal, L=hertslia, ST=center, C=il&quot;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//we need word &quot;superadmin&quot;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; ...<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; ...<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; return userId;<br />
&nbsp;&nbsp; &nbsp; }</strong><br />
&nbsp;&nbsp; &nbsp; <br />
&nbsp;&nbsp; &nbsp; <br />
&nbsp;&nbsp; &nbsp; <br />
&nbsp;&nbsp; &nbsp; interesting (for me) things start here. &nbsp;<br />
&nbsp;&nbsp; &nbsp; 3.push userId into requests inputStream.<br />
&nbsp;&nbsp; &nbsp; 3.1. create requestWrapper:<br />
&nbsp;&nbsp; &nbsp; <br />
&nbsp;&nbsp; &nbsp;<strong> static class InputStreamModifiedRequestWrapper extends HttpServletRequestWrapper {<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;private ServletInputStream modifiedInputStream;<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;/** Constructor. */<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;public InputStreamModifiedRequestWrapper(HttpServletRequest request) throws IOException {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;super(request);<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;public ServletInputStream getInputStream() {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return modifiedInputStream;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;public void setInputStream(ServletInputStream inputStream) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.modifiedInputStream = inputStream;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
<br />
&nbsp;&nbsp; &nbsp;}</strong><br />
&nbsp;&nbsp; &nbsp;in our case only inputStream can be changed, but in this way all requests content can be modified (!)<br />
&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;3.1. create our own class for inputStream that extends ServetInputStream and take byte[] as <br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; constructors argument:<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> static class ServletByteArrayInputStream extends ServletInputStream {<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;protected byte buf[];<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;protected int pos;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;protected int mark = 0;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;protected int count;<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;public ServletByteArrayInputStream(byte buf[]) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.buf = buf;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.pos = 0;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.count = buf.length;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;...<br />
&nbsp;&nbsp; &nbsp;}</strong><br />
&nbsp;&nbsp; &nbsp;3.3. finally our doFilter method looks something like: <br />
&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; <strong>&nbsp;public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;ServletException {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String content = null;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String modifiedContent = null;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;try {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //get string from requests inputStream<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;content = slurp(request.getInputStream());<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;modifiedContent = modify(new StringBuffer(content));<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (Exception e) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;log.error(e);<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;byte[] bytes = modifiedContent.getBytes();<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;ServletByteArrayInputStream byteArrayInputStream = new ServletByteArrayInputStream(bytes);<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;InputStreamModifiedRequestWrapper requestWrapper = new InputStreamModifiedRequestWrapper((HttpServletRequest) request);<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;requestWrapper.setInputStream(byteArrayInputStream);<br />
<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;chain.doFilter(requestWrapper, response);<br />
&nbsp;&nbsp; &nbsp;}<br />
&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;String modify(StringBuffer contentBuffer){<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ... <br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String userId = getAdminIdFromCertificate();<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//insert userId to contentBuffer<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;...<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return contentBuffer.toString();<br />
&nbsp;&nbsp; &nbsp;}</strong><br />
&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;thats all, everyone is happy.</p>
<p>&nbsp;</p>
