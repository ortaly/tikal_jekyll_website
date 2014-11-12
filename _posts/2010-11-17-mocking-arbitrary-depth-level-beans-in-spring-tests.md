---
layout: post
title: Mocking Arbitrary Depth Level Beans in Spring Tests
created: 1289989626
author: zvika
permalink: /java/mocking-arbitrary-depth-level-beans-spring-tests
tags:
- JAVA
- Spring
---
<p>Recently I had to find a solution for mocking arbitrary-depth-level beans in Spring tests; when saying &quot;arbitrary-depth-level beans&quot; I mean a situation where, for example, I&nbsp;have the following Autowiring Chain:</p>
<p>&nbsp;</p>
<p>Test Class -&gt; ServiceA -&gt; ConnectorFactoryBean(Singleton) -&gt; ConnectorBean (Prototype) -&gt; ConnnectionFactory(Singleton) -&gt; Connection (Prototype).</p>
<p>&nbsp;</p>
<p>During test execution, I'd like to mock the connection factory used by the ConnectorBean, thus opening a fixed-result connection instead of opening a real external data source connection which is not needed by my test, as I'm testing higher level functionality.</p>
<p>Had the object dependency graph been simpler, I could have just injected the mock into the service in the test itself, but that is quite possible, especially as prototype beans are tricky to follow.</p>
<p>&nbsp;</p>
<p>At first, I tried using a static inner class inside my test, that was annotated with @Configuration and having @Bean+@Primary methods that created my mocks programmatically with the help of EasyMock (see <a href="http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/beans.html#beans-java">here </a>if you need an explanation of these annotations and Spring's Java config). Everything worked just fine at first, but than I added another test that had to use a different configuration, but was injected with the same mick beans I created in the previous test! In other words, I now had to localize the test configuration and prevent my mock beans from leaking to other tests.</p>
<p>&nbsp;</p>
<p>I than came across an interesting implementation of Spring's ContextLoader, org.apache.camel.spring.javaconfig.test.JavaConfigContextLoader, which takes the &quot;locations&quot; attribute usually used to specify xml resource file locations (for example, as in@ContextConfiguration(locations = { &quot;classpath:db-context.xml&quot;)}) ) and applies a classloading semantics for tha attribute - in other words, treats the resources as fully qualified class names, and then tries to load them as Configuration files. Nice, now all I had to write in my test is:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@ContextConfiguration(loader = JavaConfigContextLoader.class, locations={&quot;com.blah.MyTest&quot;}) 
@ImportResource({&quot;/db-context.xml&quot;, &quot;/startup-context.xml&quot;}) 
@DirtiesContext 
@RunWith(SpringJUnit4ClassRunner.class)
@TestExecutionListeners({
	DependencyInjectionTestExecutionListener.class,
	TransactionalTestExecutionListener.class,
	DirtiesContextTestExecutionListener.class})
public class MyTest {

    @Autowired
    private MyService testedService;

    /*************************
     *  Test Mocks
     *************************/
    @Bean
    @Primary
    MyConnectionFactory myConnectionFactory() {
        // Simplified code, for the sake of brevity
        return EasyMock.createNiceMock(MyConnectionFactory.class);
    }

    @Test
    public void testMyService() {
        // test code...
    }

}
</pre>
<p>&nbsp;</p>
<p>Note, that I needed the @DirtiesContext annotation to make sure that my mocked beans do not stay in the test context and, again, leak into other tests.</p>
<p>&nbsp;</p>
<p>Hmm, nice.</p>
<p>&nbsp;</p>
<p>3 more improvements were in place:</p>
<p>&nbsp;</p>
<p>One: getting rid of the cumbersome JavaConfigContextLoader configuration by eliminating the need to explicitely specify the name of the @Configuration class - assuming it is always the name of the class where the ContextConfiguration annotation is placed - which is exactly the case for test classes. I wrote the following simple implementation of ContextLoader, extending Camel's excellent&nbsp; implementation:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
import org.apache.camel.spring.javaconfig.test.JavaConfigContextLoader;
import org.springframework.context.ApplicationContext;

public class MockContextLoader extends JavaConfigContextLoader {

    ThreadLocal&lt;String&gt; testClass = new ThreadLocal&lt;String&gt;();
   
    @Override
    public String[] processLocations(Class&lt;?&gt; clazz, String... locations) {
        testClass.set(clazz.getName());
        return super.processLocations(clazz, locations);
    }

    @Override
    public ApplicationContext loadContext(String... locations) {
        try {
            return super.loadContext(testClass.get());
        }
        finally {
            testClass.remove();
        }
    }
}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>I than added another annotation for eliminating the need to specify @Bean and @Primary on every mock-generating method. I only recently discovered annotation contageousness which is super-sweet. All I had to do is annotate my new annotation class with the annotations I needed shortened, and voilla! Meet my new super-annotation:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Primary
@Bean
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface SpringMock {}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Last, I moved the repeating annotations(@RunWith, @TestExecutionListeners and @DirtiesContext)&nbsp; to a super-class, MockGeneratingSpringTest.</p>
<p>&nbsp;</p>
<p>Finally, my test class now looks like this:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@ContextConfiguration(loader = MockContextLoader.class)
@ImportResource({&quot;/db-context.xml&quot;, &quot;/startup-context.xml&quot;})
public class MyTest extends MockGeneratingSpringTest {

    @Autowired
    private MyService testedService;

    /*************************
     *  Test Mocks
     *************************/
    @SpringMock
    MyConnectionFactory myConnectionFactory() {
        // Simplified code, for the sake of brevity
        return EasyMock.createNiceMock(MyConnectionFactory.class);
    }

    @Test
    public void testMyService() {
        // test code...
    }

}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>trimmed-down to bare necessities, just the way I like it...</p>
<p>&nbsp;</p>
