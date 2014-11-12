---
layout: post
title: Cache Your JEE Application – Part 1
created: 1279018767
author: yanai
permalink: /java/cache-your-jee-application-–-part-1
tags:
- JAVA
- Cache Proxy Varnish Java
---
<p style="margin-bottom: 0.0001pt;">While working on a new JEE based project at the customer premise, I had to design and implement one of the most important parts of a product architecture &ndash; cache. Cache is defined as &ldquo;a component that improves performance by transparently storing data such that future requests for that data can be served faster.&rdquo; <a href="http://en.wikipedia.org/wiki/Cache">[Wikipedia].</a> There are several kinds of cache, and when you think of it, caching can be integrated in different layers of a product with different kind of cache: web browser cache, web Proxy cache, business-logic (applicative) cache, data access cache, DB cache etc. In this series I'll explore three different kinds of cache, which I integrated into this new product: web proxy cache, business cache, and data access cache. In this first part I'll concentrate on the web proxy cache.</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;"><o:p></o:p></p>
<h2 style="page-break-after: avoid;"><i><span style="font-size: 14pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Enter Varnish <o:p></o:p></span></i></h2>
<p style="margin-bottom: 0.0001pt;">For many years the old standby for caching was Squid, a caching proxy server that with the right magic could be turned into a fairly functional HTTP accelerator. Nevertheless, I decided to use <a href="http://varnish-cache.org/">Varnish</a>. Unlike <a href="http://www.squid-cache.org/">Squid</a>, Varnish is designed from the ground up to be an HTTP accelerator, a caching reverse proxy. But just a second - what does it mean &ldquo;cache reverse proxy&rdquo;? <o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">Well, there are two kind of proxy - forward and reverse. Forward proxies are deployed close to a small set of users (say, on a university campus or by your Internet service provider) for the sole benefit of that group of users. On the other hand, Reverse proxies, are deployed close to the origin web server and are designed with a different set of goals in mind. Varnish, being as a cache reverse proxy, alleviates origin web servers of undue load, giving you greater capacity or the ability to handle a higher number of concurrent hits. This was exactly what I needed for the new product &ndash; our new service was about to serve many users, and we wanted to reduce the load on our web application. Furthermore, Varnish response time is typically measured in microseconds, which is significantly better than most HTTP servers, including the one we used &ndash; Tomcat.<o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">Varnish has another important advantage. Varnish is highly configurable, using its DSL like scripting language called VCL. In these script you can configure and control critical points in the HTTP request/response life cycle. You can even configure load balancing policy (i.e. round robin or random &ldquo;directors&rdquo;), making the Varnish as a load balancer for your application. The VCL script is compiled at runtime to C shared objects , which are linked to the Varnish process. This enable us to change the VCL at runtime without restart Varnish.</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;"><o:p></o:p></p>
<h2 style="page-break-after: avoid;"><i><span style="font-size: 14pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Web Proxy Caching Use Case<o:p></o:p></span></i></h2>
<p style="margin-bottom: 0.0001pt;">As said, in this post, I would like to demonstrate some of the caching functionality I implemented using Varnish, and the way I integrated the Java application with it. The customer product is composed with several decoupled modules which interact each other with REST/HTTP interface. One of the modules is a &ldquo;facade&rdquo; that serves a thin HTML client through REST/HTTP api and interact with other lower level modules. One these modules, had to collect some data for each end user request. The data is collected from external services upon each request. For this reason Varnish served both as forward (for external resources) and as reverse proxy (for facade and internal modules) cache proxy in our application.<o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">By default we wanted all request to be cached by Varnish and gain better performance transparently - upon each request, Varnish tries to look-up the data from cache, and if its not there it falls back to the back-end. On the way back the default behavior is to put the response data into the cache (on successful responses only).<o:p></o:p></p>
<p class="MsoNormal"><br />
Nevertheless, there are some exceptional cases: Either the client or the server sometimes may want to interact with the cache and give it specific instructions. Lets consider, for example, the module that was responsible for data collection from external resources. Some of these resources might be occasionally unavailable, or have bad connectivity to our system, leading to timeout on the external calls. In this case, the module will return partial data (while complete the data collection in background by waiting for the slow resources) and return data only from resources that didn't break the timeout. In this case , we don't want the response to be cached since it is incomplete. The logic layer should somehow &quot;signal&quot; Varnish - &ldquo;hey, don't cache this response &ndash; its incomplete!&quot; , since its partial response. <o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">The requirement above is just an example of the application and cache interaction I had to implement. You may have different requirements from web proxy cache, but in many cases these requirement may involve the Java backed integration. In order to fulfill the requirement above, I had to configure both Varnish VCL file and set a convenient infrastructure on the Java application, that enable the programmer to easily &ldquo;signal&rdquo; Vanish not to cache response in this case.</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;"><o:p></o:p></p>
<h2 style="page-break-after: avoid;"><i><span style="font-size: 14pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Caching in Action <o:p></o:p></span></i></h2>
<p style="margin-bottom: 0.0001pt;">So here is the design for the use case above. First we need to set the Java infrastructure as described above. For that , we'd better separate the application logic from HTTP &ldquo;signaling&rdquo; response. I used a thread local to hold the &ldquo;signal&rdquo; emerged from the business logic layer, and then been used in a dedicated filter, just before the HTTP response goes out of the web server.. <o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">From the API perspective it remains simple and easy &ndash; The end programmer just need to call simple static method that can be invoked from anywhere in the business layer (i.e. our data collector module):<o:p></o:p></p>
<p><o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<pre class="brush: java;" title="code">
import static com.mycompany.myproduct.infrastructure.cache.CacheControl.*

public class MyDataCollector{
    public void applyMashup(){
        &hellip;
    if(isTimeOut())
        setCacheMode(CacheMode.NO_CACHE);
    }
} </pre>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">Sure, I could have created yet a simple bean for that, but I found it somewhat more convenient and less intrusive into the user code - Just call static method here (I usually hate these static and anti OO methods, but I gave up this time) and he is done. Please note that I created a simple enum to specify this response should NOT be cached: <o:p></o:p></p>
<p><o:p></o:p></p>
<p class="MsoNormal">&nbsp;</p>
<pre class="brush: java;" title="code">
public enum CacheMode {
    CACHE(&quot;cache&quot;),NO_CAHE(&quot;no-cache&quot;);
    private String value;
    private CacheMode(String value) {
        this.value = value;
    }
    @Override
    public String toString(){
        return value;
    }
}</pre>
<p class="MsoNormal"><o:p><br />
</o:p></p>
<p style="margin-bottom: 0.0001pt;">And here is the CacheControl implementation: <o:p></o:p></p>
<p><o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<pre class="brush: java;" title="code">
public class CacheControl {
    private static ThreadLocal&lt;CacheMode&gt; cacheModeTL = new ThreadLocal&lt;CacheMode&gt;() {
        @Override
        protected CacheMode initialValue() {
            return CacheMode.CACHE;
        }
    };

    public static CacheMode getCacheMode() {
        return cacheModeTL.get();
    }

    public static void setCacheMode(CacheMode cacheMode) {
        cacheModeTL.set(cacheMode);
    }
} </pre>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">Now , we need to create a filter at the web layer that check for the thread local and &ldquo;signal&rdquo; that we don't want to cache the response if the business logic layer changed the cache mode to &ldquo;NO_CACHE&rdquo; (i.e. for partial data collection):<o:p></o:p></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><br />
</span></p>
<pre class="brush: java;" title="code">
import com.mycompany.myproduct.infrastructure.cache.CacheMode;
import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static com.mycompany.myproduct.infrastructure.cache.CacheControl.getCacheMode;

public class CacheControlFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(request, response);
        CacheMode cacheMode = getCacheMode();
        if (cacheMode.equals(CacheMode.NO_CAHE))
            ((HttpServletResponse)response).setHeader(&quot;Cache-Control&quot;, cacheMode.toString());
    }

    @Override
    public void destroy() {
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

}</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">As you can see the Filter checks the thread-local variable and set HTTP header &ldquo;Cache-Control&rdquo; with value &ldquo;no-cache&rdquo; (i.e. due to the partial data returned from the data collection). <o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">The last step is configure our VCL file. The configuration will set Varnish not to cache responses if there is a header with &ldquo;Cache-Control&rdquo; and value &ldquo;no-cache&rdquo;. If you look at the snippest code bellow, you can see the VCL file is more than just a configuration file. It is in fact a mini program, a program that is actually compiled and linked in to Varnish at runtime. There are several steps to how Varnish handles each request and in your VCL file you have the option to customize the behavior of each one. That seems like a lot of work, but in fact Varnish has pretty reasonable defaults, which make the work short and easy. In our case, all we wanted to do here is signal varnish &ldquo;don't&rdquo; cache response for &ldquo;no-cache&rdquo; value. Thus, we just need to override &ldquo;vcl_fetch&rdquo; subroutine. When Varnish enters the vcl_fetch subroutine, it has already requested data from the back-end web server and has received a response. However, it has not inserted anything into the cache yet. In fact, most of what you are likely to be doing in vcl_fetch is determining whether the response should be cached or not. And that is exactly what I did here:<o:p></o:p></p>
<p><o:p></o:p></p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<pre class="brush: java;" title="code">
sub vcl_fetch {
    <a href="http://search.twitter.com/search?q=%23">#</a> For no-cache do NOT store on cache
    if(obj.http.Cache-Control ~ &quot;no-cache&quot;) {
        return (pass);
    }
} </pre>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;">Previously I said we override the &ldquo;vcl_fetch&rdquo; (as we did in the snippets above), but that was NOT accurate. We are NOT overriding the &ldquo;vcl_fetch&rdquo; in the same semantic you are used to in Java. Instead, we are adding our functionality before. In other words, Varnish doesn't actually let you replace its defaults. Our definitions for the above routines simply run before the built-in versions of the same routine. We return 'pass' in case we have &ldquo;no-cache&rdquo; in the Cache-Control header. In vcl_fetch, pass tells Varnish to send the response to the client, but don't save the response in the cache.</p>
<p style="margin-bottom: 0.0001pt;">&nbsp;</p>
<p style="margin-bottom: 0.0001pt;"><o:p></o:p></p>
<h2 style="page-break-after: avoid;"><i><span style="font-size: 14pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Summary <o:p></o:p></span></i></h2>
<p style="margin-bottom: 0.0001pt;">Actually.. that's it - We have set small infrastructure for both Java and Varnish. This was just an example, but you got the idea. It enables the business logic layer to signal the Varnish to deviate from its normal default caching behavior and NOT to cache results in some particular cases. This case can be errors or partial results or any other logic you want. In the next posts of this series we'll examine other aspects of the cache in the JEE application &ndash; &ldquo;application cache&rdquo; and &ldquo;data access cache&rdquo;. <o:p></o:p></p>
