---
layout: post
title: From Java to Scala - The Web Tier
created: 1372469137
author: gabi
permalink: from-java-to-scala-the-web-tier
tags:
- JAVA
- Scala
- web
---
<p>It&#39;s quite clear that switching from Java to Scala can drastically shorten your code, make it more type safe and maintainable, and improve you productivity. However there is concern among developers who need to maintain an existing Java codebase - does switching to Scala means I have to rewrite my entire application from scratch? Can Java and Scala live side by side? What about existing libraries and business logic?<br />
	<br />
	In the next series of posts I intend to demonstrate how to migrate existing parts of common applications from Java to Scala. These will be simple down-to-earth examples, aiming for a smooth transition to Scala.<br />
	<br />
	This post covers the web tier. A very common practice these days is to use JSON services, so for our example we will use a simple service that takes no arguments and returns a JSON containing two string fields: language and framework.<br />
	<br />
	The snippets are part of the example application <a href="https://github.com/GabiAxel/scala-examples/tree/master/scala-web-example" target="_blank">https://github.com/GabiAxel/scala-examples/tree/master/scala-web-example</a><br />
	This is a Maven project with Tomcat plugin which allows you to quickly run it using the following command:</p>
<p><span style="font-family:courier new,courier,monospace;">mvn tomcat7:run-war</span></p>
<p><br />
	When Tomcat is running you can access the following URLs:<br />
	http://localhost:8080/java<br />
	http://localhost:8080/scala<br />
	http://localhost:8080/spring<br />
	http://localhost:8080/unfiltered<br />
	<br />
	The simplest possible implementation in Java would be a Servlet. We will use <a href="http://jackson.codehaus.org/" target="_blank">Jackson</a> to serialize an ImmutableMap from <a href="http://code.google.com/p/guava-libraries/" target="_blank">Guava</a> as the HTTP response body. the POM should contain the following dependencies:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;javax.servlet&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;3.1.0&lt;/version&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;scope&gt;provided&lt;/scope&gt;<br />
	&lt;/dependency&gt;<br />
	&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;com.google.guava&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;guava&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;14.0.1&lt;/version&gt;<br />
	&lt;/dependency&gt;<br />
	&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;com.fasterxml.jackson.core&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;jackson-databind&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;2.2.2&lt;/version&gt;<br />
	&lt;/dependency&gt;</span><br />
	<br />
	and this is the servlet code, using Servlets 3.0 @WebServlet annotation to map it to &quot;/java&quot;:<br />
	&nbsp;</p>
<pre>
@WebServlet(&quot;/java&quot;)
public class JavaServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType(&quot;application/json&quot;);
		
		Map<string,> value = ImmutableMap.of(
			&quot;language&quot;, &quot;Java&quot;,
			&quot;framework&quot;, &quot;Servlet&quot;);
		
		ObjectMapper mapper = new ObjectMapper();
	
		mapper.writeValue(response.getOutputStream(), value);
	}

}
</string,></pre>
<br />
<p>We can rewrite this servlet in Scala, but first we need to add Scala support by adding the Maven Scala plugin so that Scala classes will also be compiled in Maven&#39;s &quot;compile&quot; phase:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;plugin&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;org.scala-tools&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;maven-scala-plugin&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;executions&gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;execution&gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;goals&gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;goal&gt;compile&lt;/goal&gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/goals&gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;/execution&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;/executions&gt;<br />
	&lt;/plugin&gt;</span><br />
	<br />
	and add <a href="https://github.com/FasterXML/jackson-module-scala" target="_blank">Jackson&#39;s Scala module</a> in order to support serializing Scala classes (in this case Scala Map):<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;com.fasterxml.jackson.module&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;jackson-module-scala_2.10&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;2.2.2&lt;/version&gt;<br />
	&lt;/dependency&gt;</span><br />
	<br />
	now we can write the Scala Servlet:<br />
	&nbsp;</p>
<pre>
@WebServlet(Array(&quot;/scala&quot;))
class ScalaServlet extends HttpServlet {

  override def doGet(request: HttpServletRequest, response: HttpServletResponse) = {
	
    response setContentType &quot;application/json&quot;
    
    val value = Map(
        &quot;language&quot; -&gt; &quot;Scala&quot;, 
        &quot;framework&quot; -&gt; &quot;Servlet&quot;)
    
    val mapper = new ObjectMapper().registerModule(DefaultScalaModule)
    
    mapper.writeValue(response.getOutputStream, value)
  }

}
</pre>
<br />
<p>This example is pretty self-explanatory. The difference from the Java servlet is that we are using Scala Map, so we don&#39;t need a syntactic sugar third-party library like Guava. We also need to register Jackson Scala module so that the mapper will be able to serialize the Scala map.<br />
	<br />
	If you implemented a REST API in Java, you probably used a framework for that, and not used Servlets directly. <a href="http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html/mvc.html" target="_blank">Spring MVC</a> is a popular framework for implementing such services. To use it we first add it to the POM:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;org.springframework&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;3.2.2.RELEASE&lt;/version&gt;<br />
	&lt;/dependency&gt;</span><br />
	<br />
	add the dispatcher servlet configuration to web.xml:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;servlet&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;servlet-name&gt;spring&lt;/servlet-name&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;servlet-class&gt;org.springframework.web.servlet.DispatcherServlet&lt;/servlet-class&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;load-on-startup&gt;1&lt;/load-on-startup&gt;<br />
	&lt;/servlet&gt;<br />
	&lt;servlet-mapping&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;servlet-name&gt;spring&lt;/servlet-name&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;url-pattern&gt;/&lt;/url-pattern&gt;<br />
	&lt;/servlet-mapping&gt;</span><br />
	<br />
	and add bean definitions in spring-servlet.xml, in this case we use package scan and annotation support:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;context:component-scan base-package=&quot;com.gabiaxel.example&quot;/&gt;<br />
	&lt;mvc:annotation-driven /&gt;</span><br />
	<br />
	Here is a controller which is equivalent to the Servlet we saw earlier:<br />
	&nbsp;</p>
<pre>
@Controller
public class SpringController {

	@ResponseBody
	@RequestMapping(value=&quot;/spring&quot;, method=GET)
	public Object getValue() {

		return ImmutableMap.of(
			&quot;language&quot;, &quot;Java&quot;,
			&quot;framework&quot;, &quot;Spring MVC&quot;);
	}
}
</pre>
<br />
<p>@Controller marks this class as a Spring controller bean, @RequestMapping maps HTTP GET requests to &quot;/spring&quot; path to the getValue method, and @ResponseBody indicates that the method&#39;s returned value will be serialized to JSON (when Jackson is in the classpath).<br />
	<br />
	This time we will not simply rewrite the code in Scala, but look for a library that provides this functionality &quot;the Scala way&quot;. The library I chose for this example is <a href="http://unfiltered.databinder.net/Unfiltered.html" target="_blank">Unfiltered</a>, accompanied by <a href="http://argonaut.io/doc/integration/" target="_blank">Argonaut Unfiltered JSON integration</a>. The dependencies are:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;net.databinder&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;unfiltered-filter_2.10&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;0.6.8&lt;/version&gt;<br />
	&lt;/dependency&gt;<br />
	&lt;dependency&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;groupId&gt;io.argonaut&lt;/groupId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;artifactId&gt;argonaut-unfiltered_2.10&lt;/artifactId&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;version&gt;6.0-RC3&lt;/version&gt;<br />
	&lt;/dependency&gt;</span><br />
	<br />
	With Unfiltered we write a filter that extends Plan and map it in web.xml:<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;filter&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;filter-name&gt;unfiltered&lt;/filter-name&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;filter-class&gt;com.gabiaxel.example.UnfilteredApp&lt;/filter-class&gt;<br />
	&lt;/filter&gt;<br />
	&lt;filter-mapping&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;filter-name&gt;unfiltered&lt;/filter-name&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;url-pattern&gt;/*&lt;/url-pattern&gt;<br />
	&lt;/filter-mapping&gt;</span><br />
	<br />
	in the filter itself we implement the intent method, where we map HTTP requests to partial methods:<br />
	&nbsp;</p>
<pre>
class UnfilteredApp extends Plan {

  def intent = {
    
  	case GET(Path(&quot;/unfiltered&quot;)) =&gt; {
    
  	  val value = Map(
          &quot;language&quot; -&gt; &quot;Scala&quot;, 
          &quot;framework&quot; -&gt; &quot;Unfiltered&quot;)
      
      JsonResponse(value)
    }
  }
}
</pre>
<br />
<p>Pretty much the same idea as Spring MVC, but using Scala constructs.<br />
	<br />
	Of course there are plenty of libraries for implementing RESTful services, and we barely scratched the surface even with Unfiltered. What was important for me to convey is how easy it is to gradually make the transition to Scala in an existing Java web application - you don&#39;t have to switch to SBT (Scala build system) and you can have Java and Scala Servlets and filters co-existing while each handles its own HTTP mappings.<br />
	<br />
	So go ahead - pick a few methods in your web app and migrate them to Scala servlets or any Scala REST framework and share your experience in the comments - What libraries did you use? How smooth was the transition? What challenges did you encounter and how did you overcome them?</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
