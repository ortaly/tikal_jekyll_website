---
layout: post
title: 'Adventures in Spring: Defining Multiple SessionFactory Objects in Spring/Flex
  Environment'
created: 1285083482
author: zvika
permalink: /java/adventures-spring-defining-multiple-sessionfactory-objects-springflex-environment
tags:
- JAVA
- Spring
- Hibernate
- spring-flex
- SessionFactory
---
<p><span id="internal-source-marker_0.787507569561003" style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">While  consulting at one of our clients, I was asked to configure a Spring  environment serving a Flex application with multiple Session Factories  needed for accessing the old and new generations of the application (due  to a heavy migration process). In order to work with more than one  session factories in our application contex, some modifications were  needed:</span></p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;sessionFactory&quot; class=&quot;org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean&quot;&gt;
       &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;
       &lt;property name=&quot;useTransactionAwareDataSource&quot; value=&quot;true&quot;/&gt;
       &lt;property name=&quot;packagesToScan&quot;&gt;
           &lt;list&gt;
               &lt;value&gt;x.y.z.model&lt;/value&gt;
           &lt;/list&gt;
       &lt;/property&gt;
    &lt;!-- rest of hibernate configuration --&gt;
&lt;/bean&gt;

&lt;bean id=&quot;sessionFactory2&quot; class=&quot;org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean&quot;&gt;
       &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;
       &lt;property name=&quot;useTransactionAwareDataSource&quot; value=&quot;true&quot;/&gt;
       &lt;property name=&quot;packagesToScan&quot;&gt;
           &lt;list&gt;
               &lt;value&gt;xx.yy.zz.model&lt;/value&gt;
           &lt;/list&gt;
       &lt;/property&gt;
    &lt;!-- rest of hibernate configuration --&gt;
&lt;/bean&gt;
&lt;!--Transaction Manager, Data Sources and the rest of the lot  --&gt;</pre>
<p><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Right  after configuring these two contexts and running the server, I got a  Spring error &nbsp;saying: &ldquo;No unique bean of type  [org.hibernate.SessionFactory] is defined: expected single bean but  found 2&rdquo;. Well, that&rsquo;s only natural and could be expected. I quickly  changed my GenericHibernateDao and added a @Qualifier, specifying the  SessionFactory&rsquo;s bean name explicitly, thus solving the problem for all  implementation the application DAOs at once. neat.</span><br />
</p>
<pre class="brush: java;" title="code">
@Repository
public abstract class GenericHibernateDao&lt;T, ID extends Serializable&gt; implements GenericDao&lt;T, ID&gt; {

   private Class&lt;T&gt; persistentClass;

   @Autowired
   @Qualifier(&ldquo;sessionFactory&rdquo;)
   protected SessionFactory sessionFactory;

   // Rest of the generic Dao goes here...
}</pre>
<p><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Next,  I was to discover that the worse is yet to come.Upon starting the  server, I got a somewhat cryptic stack trace, whose most informative  error message was:</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">&ldquo;org.springframework.beans.factory.BeanCreationException:  Error creating bean with name  'org.springframework.flex.core.io.JpaHibernateConfigProcessor#0':  Invocation of init method failed; nested exception is  org.springframework.beans.factory.NoSuchBeanDefinitionException: No  unique bean of type [org.hibernate.SessionFactory] is defined: expected  single bean but found 2&rdquo;</span><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">What was that all about?A thick hint was the name of the bean whose creation had failed. Yes, I mean 'org.springframework.</span><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; font-style: normal; text-decoration: none; vertical-align: baseline;">flex</span><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">... Apparently, somewhere else, inside the web module&rsquo;s applicationContext.xml, laid the following definition:</span></p>
<pre class="brush: xhtml;" title="code">
&lt;flex:message-broker&gt;
  &lt;flex:remoting-service default-channels=&quot;my-amf&quot; /&gt;
&lt;/flex:message-broker&gt;
</pre>
<p>&nbsp;</p>
<p><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">This  definition was required for exporting the application layer&rsquo;s services  to the Flex client on top of the BlazeDS protocol. &nbsp;But how did end up  trigerring the creation of this JpaHibernateConfigProcessor? </span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Aha!  Welcome to the wonderful world of Namespace Handlers! Starting from  Spring 2.0, the beans.xml jargon was extended to include additional  namespaces, shortening the lengthy xml and allowing convenient  conventions to kick in. This mechanism is still very much in use today  for everything from transactions configuration, aop, flex, java spaces,  jmx, web services and many many other APIs, allowing easy use by Spring  applications. The first step in finding the not-so-innocent suspect was  opening up the spring-flex-core jar, where the namespace handler was  defined:</span></p>
<p>&nbsp;</p>
<p><img width="388" height="291" alt="" src="/files/image0.png" /></p>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">By  Spring convention, any file named spring.handlers located under  META-INF is read by spring and expected to have a line-delimited list of  mappings between namespace classifiers and class names, implementing  the NamespaceHandler interface (or, conveniently, extending the  NamespaceHandlerSupport class). The spring.handlers inside spring-flex  jar had one line, containing:</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">http\://www.springframework.org/schema/flex=org.springframework.flex.config.xml.FlexNamespaceHandler</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Opening the FlexNamespaceHandler, I found the following :</span><br />
</p>
<pre class="brush: java;" title="code">
public class FlexNamespaceHandler extends NamespaceHandlerSupport {
    /**
    *
    * {@inheritDoc}
    */
    public void init() {
       registerBeanDefinitionParser(&quot;message-broker&quot;, new MessageBrokerBeanDefinitionParser());
       registerBeanDefinitionParser(&quot;remoting-destination&quot;, new RemotingDestinationBeanDefinitionParser());
       registerBeanDefinitionParser(&quot;message-destination&quot;, new MessageDestinationBeanDefinitionParser());
       registerBeanDefinitionParser(&quot;jms-message-destination&quot;, new JmsMessageDestinationBeanDefinitionParser());
       registerBeanDefinitionParser(&quot;integration-message-destination&quot;, new IntegrationMessageDestinationBeanDefinitionParser());
       registerBeanDefinitionDecorator(&quot;remoting-destination&quot;, new RemotingDestinationBeanDefinitionDecorator());
    }
}</pre>
<p><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Hmmm,  pretty neat. I located message-broker as this was the only  flex-oriented element in my Spring configuration, and opened up its  (xml) definition parser, MessageBrokerBeanDefinitionParser. There,  hidden among multitude of lines of xml parsing code (bla333) was hidden  the following line:</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;"><br />
</span></p>
<pre class="brush: java;" title="code">
private void registerHibernateSerializationConfigPostProcessorIfNecessary(Element source, ParserContext parserContext) {
       if (!parserContext.getRegistry().containsBeanDefinition(BeanIds.HIBERNATE_SERIALIZATION_PROCESSOR)) {
           BeanDefinitionBuilder processorBuilder = BeanDefinitionBuilder.genericBeanDefinition(HIBERNATE_CONFIG_PROCESSOR_CLASS_NAME);
           ParsingUtils.registerInfrastructureComponent(source, parserContext, processorBuilder, BeanIds.HIBERNATE_SERIALIZATION_PROCESSOR);
       }
}</pre>
<h4>&nbsp;</h4>
<h4><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Interesting.  looked like this code checks if a bean named  &lsquo;_hibernateSerializationConfigPostProcessor&rsquo; is already defined in the  current application context and if not, creates and registers one.  PostProcessor, or, in their more formal name, BeanFactoryPostProcessor  classes are special, powerful players in the game of application context  initialization. They allow for all kinds of magical things to happen,  for proxies to replace actual beans, for bean definitions to be added,  removed and modified in the application context, as needed. We all know  one famous BeanFactoryPostProcessor implementation, the  PropertyPlaceholderConfigurer or, as shorthanded with the kind help of  namespace handlers into something like &lt;context:property-placeholder  location=&quot;classpath:com/foo/my_app.properties&quot;/&gt;. This piece of  magical code gets all ${} values in our xmls and @Value annotations to  be substituted just before bean is initialized. And that&rsquo;s just the tip  of the iceberg, really. Back to my mission, my next stop was taking a  look at the above mentioned PostProcessor,  HibernateSerializationConfigPostProcessor. There, called from the  powerful postProcessBeanFactory() method, was the following piece of  logic:</span></h4>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
	if (isHibernateDetected(beanFactory.getBeanClassLoader())) {
		//Abort if HibernateConfigProcessor is already present
		if (isHibernateConfigProcessorConfigured(beanFactory)) {
			return;
	}

	// ... after some more code...

	//Add the appropriate HibernateConfigProcessor bean definition

	BeanDefinitionBuilder processorBuilder;
	if (isJpaDetected(beanFactory.getBeanClassLoader())) {
		processorBuilder = BeanDefinitionBuilder.rootBeanDefinition(JPA_HIBERNATE_CONFIG_PROCESSOR_CLASS);
	} else {
		processorBuilder = BeanDefinitionBuilder.rootBeanDefinition(HIBERNATE_CONFIG_PROCESSOR_CLASS);
	}
	// ... and some more code, adding the above processors into the application context
}</pre>
<p><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">getting  warmer... getting warmer... Next, I looked up  JPA_HIBERNATE_CONFIG_PROCESSOR_CLASS to find out that this was the piece  I was looking for:  org.springframework.flex.core.io.JpaHibernateConfigProcessor. Inside  this class laid a session factory reference, which, when not  initialized, caused the error in the following startup callback:</span></p>
<pre class="brush: java;" title="code">
public void afterPropertiesSet() throws Exception {
	if (this.sessionFactory == null) {
		if (BeanFactoryUtils.beanNamesForTypeIncludingAncestors(getBeanFactory(), SessionFactory.class).length &gt; 0) {
			this.sessionFactory = BeanFactoryUtils.beanOfTypeIncludingAncestors(beanFactory, SessionFactory.class);
			this.hibernateConfigured = true;
		}
	} else {
		this.hibernateConfigured = true;
	}
	this.conversionService = conversionService != null ? conversionService : getDefaultConversionService();
}</pre>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">(Just  a small side note, in case you are not very familiar with Spring and  somehow managed to getthis fa:; afterPropertiesSet is a method defined  in the interface InitializingBean, and it gets invoked on every startup,  right after all bean dependencies were satisafies per context  configuration. Nowadays it is better to use the @PostConstruct  annotation for every applicative purpose, and keep your classes clean  from binary Spring dependencies, if possible).</span><br />
<br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">If  you are anything like me, at this point your head starts to bloat with a  mixture of beans, autowirings, processors, postprocessors and alike.  So, here&rsquo;s a quick re-cap of all that happens until now:</span><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">1. Multiple session factories were introduced into the application factory</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">2. &lt;flex:message-broker&gt; caused registration of a spring-flex specific Bean Factory Post Processor</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">3. HibernateSerializationConfigPostProcessor adds a JpaHibernateConfigProcessor to the application context</span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">4. JpaHibernateConfigProcessor tries to get a session factory and fails: more than one exists</span><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">What  needed to be now looked simple enough: Define a  JpaHibernateConfigProcessor of my own in my applicationContext.xml, and  explicitly inject it with the correct session factory. This should cause  HibernateSerializationConfigPostProcessor to skip the creation of the  default JpaHibernateConfigProcessor &nbsp;which didn&rsquo;t know which session  factory to access, and voila! problem solved. &nbsp;After switching the  default implementation with ths custom one, I should inject it to  my&lt;flex:message-broker&gt; using a &lt;flex:config-processor&gt;:</span></p>
<pre class="brush: java;" title="code">
&lt;bean name=&rdquo;myJpaHibernateConfigProcessor&rdquo; class=&rdquo;org.springframework.flex.core.io.JpaHibernateConfigProcessor&rdquo;&gt;
    &lt;property name=&rdquo;sessionFactory&rdquo; ref=&rdquo;sessionFactory&rdquo;/&gt;
&lt;/bean&gt;

&lt;flex:message-broker&gt;
	&lt;flex:remoting-service default-channels=&quot;my-amf&quot; /&gt;
	&lt;flex:config-processor ref=&quot;myJpaHibernateConfigProcessor &quot;&gt;
&lt;/flex:message-broker&gt;
</pre>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Well,  not so fast, amigo. Running the application with the above  configuration yielded no noticable change. I still got errors during the  initialization of the JpaHibernateConfigProcessor, saying session  factory could not be resolved since there were two of them. How Bizzare,  I thoguht. Going &nbsp;to debug, I found out that two instances of  &nbsp;JpaHibernateConfigProcessor &nbsp;were created: one by me and one by the  HibernateSerializationConfigPostProcessor. I took a closer look at the  method that was supposed to detectmy existing  JpaHibernateConfigProcessor &nbsp;and skip its automatic creation:</span><br />
</p>
<pre class="brush: java;" title="code">
private boolean isHibernateConfigProcessorConfigured(ConfigurableListableBeanFactory beanFactory) {
	Set&lt;String&gt; beanNames = new HashSet&lt;String&gt;();
	beanNames.addAll(Arrays.asList(beanFactory.getBeanDefinitionNames()));
	if (beanFactory.getParentBeanFactory() instanceof ListableBeanFactory) {
		beanNames.addAll(Arrays.asList(((ListableBeanFactory) beanFactory
				.getParentBeanFactory()).getBeanDefinitionNames()));
	}
	for (String beanName : beanNames) {
		BeanDefinition bd = beanFactory.getMergedBeanDefinition(beanName);
		if (bd instanceof AbstractBeanDefinition) {
			AbstractBeanDefinition abd = (AbstractBeanDefinition) bd;
			if (abd.hasBeanClass()) {
				if (HibernateConfigProcessor.class.isAssignableFrom(abd.getBeanClass())) {
					return true;
				}
			}
		}
	}
	return false;
}
</pre>
<p><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">I  added a debug point to this method and watched it closely. to my  surprise, server startup went fine! Thinking this must be a code refresh  issue, I re-ran the code without debug, and got the error again. With  debug: no error. Without debug: error. With debug: error. You get the  picture. I was flabbergasted. I mean, what on earth could cause this  kind of flaky behavior? Was the machine obsessed? did I need to say my  prayers that morning and did not? I took a break and then continued  investigating what grew to a mystery from one minute to the next. To  further examine the situation, I had to override  HibernateSerializationConfigPostProcessor, as the method I needed to  override was private - is it my paranoia, or did Spring coding standards  change in the last version? Before, everything used to be declared as  protected. Anyway, adding some print-outs, I ended up with the following  code:</span></p>
<pre class="brush: java;" title="code">

</pre>
<pre class="brush: java;" title="code">
for (String beanName : beanNames) {
	System.out.println(beanName);
	BeanDefinition bd = beanFactory.getMergedBeanDefinition(beanName);
	if (bd instanceof AbstractBeanDefinition) {
		AbstractBeanDefinition abd = (AbstractBeanDefinition) bd;
		if (abd.hasBeanClass()) {
			System.out.println(abd.getBeanClass().getName());
			if (HibernateConfigProcessor.class.isAssignableFrom(abd.getBeanClass())) {
				return true;
</pre>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Printouts  were, again, different while in and out of debug mode. In debug, many  more class names were printed out. Specifically, my custom  org.springframework.flex.core.io.JpaHibernateConfigProcessor was printed  out - only in debug mode. What could be the problem? Finally, I got to  testing AbstractBeanDefinition.hasBeanClass(). &nbsp;Documentation was  scarce: <br class="kix-line-break" />
&ldquo;Return whether this definition specifies a bean class.&rdquo;. looking at the code, it simply said:</span></p>
<pre class="brush: java;" title="code">
public boolean hasBeanClass() {
       return (this.beanClass instanceof Class);
}</pre>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Here, I had to stop: </span><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Without  overriding AbstractBeanDefinition, one of Spring&rsquo;s fundemental classes,  I was not able to find out what was really happening. It seems like it  must have been a class loader issue, but I cannot be sure about it.  Anyway, After finding the problem, implementing a solution was easy - In  my version of HibernateSerializationConfigPostProcessor, I simply  removed the call to abd.hasBeanClass() and created a Class instance  myself, on the fly, instead of asking it from the application context:</span></p>
<pre class="brush: java;" title="code">
for (String beanName : beanNames) {
	BeanDefinition bd = beanFactory.getMergedBeanDefinition(beanName);
	if (bd instanceof AbstractBeanDefinition) {
		AbstractBeanDefinition abd = (AbstractBeanDefinition) bd;
		// if (abd.hasBeanClass()) {
		// if(HibernateConfigProcessor.class.isAssignableFrom(abd.getBeanClass()))
		// {

		if (HibernateConfigProcessor.class.isAssignableFrom(
				<strong>Class.forName(abd.getBeanClassName())</strong>)) {
			return true;
</pre>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">After  making sure my HibernateSerializationConfigPostProcessor appeared in  the applicationContext.xml file *before* the &lt;flex:message-broker&gt;  element (as namespace handlers tend to be rather touchy to the order of  xml elements), I re-ran the server in normal mode, without debug. </span><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">Application then started up fine.</span><br />
<br />
<span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: normal; font-style: normal; text-decoration: none; vertical-align: baseline;">For  me, this had been a fascinating journey (although frustrating at times,  I&rsquo;ll say!) to the usually invisible complexity areas of runtime  creation and weaving by Spring. Hope those who survived until here have enjoyed the ride...<br />
</span></p>
<p>&nbsp;</p>
