---
layout: post
title: Autowiring mock objects to spring beans using @Autowired
created: 1300055171
author: shalom
permalink: "/java/autowiring-mock-objects-spring-beans-using-autowired"
tags:
- JAVA
- java spring easymock autowire
---
<p>Today I needed to test some rest services implemented with Jaxrs and Jersey, My intention was to have a fast running unit test that can be run on CI build and will test that the jaxrs+spring wiring, json serialization etc. don't break. All my resources are just calling other internal services, so I decided to deploy my rest resources and wire mock objects to them on an embedded jetty server.</p>
<p>I used spring annotations to wire everything up and all my resources look like that:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
@Component(&quot;myResource&quot;)
@Path(&quot;/somepath&quot;)
public class SomeResource {

    @Autowired
    private mocktest.SomeService someService;
...</pre>
<p>&nbsp;</p>
<p>so the easy way to mock SomeService would be to just create an Easymock factory-method bean:</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;myServiceMock&quot;  class=&quot;org.easymock.EasyMock&quot; factory-method=&quot;createMock&quot;&gt;
            &lt;constructor-arg value=&quot;mocktest.SomeService&quot; /&gt;
&lt;/bean&gt;
</pre>
<p>&nbsp;</p>
<p>But spring does not support the @Autowired annotation with factory-method. the easiest solution would be to use @Resource or @Autowired with @Qualifier.</p>
<p>But there's another thing, because I'm deploying this into an embedded jetty server and my unit tests will actually access the rest resources over http I don't have a hook to record the mock methods in the unit test class.</p>
<p>My solution is a spring FactoryBean for every service I want to mock, spring @Autowired works with FactoryBeans, and the getObject method of the factory bean is a great point to record mock methods, this is how a getObject looks like:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
import static org.easymock.EasyMock.*;
public class SomeServiceMockFactoryBean implements FactoryBean&lt;SomeService&gt;{

    public SomeService getObject() throws Exception {
        SomeService mock = createMock(SomeService.class);
        //teach the mock to walk
        expect(mock.getSomeString()).andStubReturn(&quot;stub string&quot;);
        replay(mock);
        return mock;
    }
...</pre>
<p>&nbsp;</p>
<p>The returned mock is a mock ready for replay, and of course you can teach it many other things to do.</p>
<p>&nbsp;And this is how the spring config for the FactoryBean looks like:</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;myServiceMock&quot; class=&quot;mocktest.SomeServiceMockFactoryBean&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Thanks.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
