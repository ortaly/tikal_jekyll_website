---
layout: post
title: JMX connection to JBoss
created: 1249886106
permalink: jmx-connection-to-jboss
tags:
- JAVA
---
<p>Sometimes you need to control JBoss status from outside of JBoss's JVM or just talk with JBoss using JMX.</p>
<p>Good example: starting JBoss from Installation programm and waiting upon it will started.</p>
<p>&nbsp;</p>
<p>Problem is that you must have <strong>jbossall-client.jar</strong> in your classpath but you have not.</p>
<p>In JBoss 5 <strong>jbossall-client.jar</strong> has only references to other 20 jars via MANIFEST.MF<strong><br />
</strong></p>
<p>&nbsp;</p>
<p>Solution is load <strong>jbossall-client.jar</strong> dynamically and obtain MBeanServerConnection using Reflection.</p>
<p>Pay attention, in order to create InitialContext you must to switch ContextClassLoader to your ClassLoader.</p>
<p>&nbsp;</p>
<p>&lt;code&gt;</p>
<p>ClassLoader currentClassLoader = Thread.currentThread().getContextClassLoader();<br />
URLClassLoader cl = new URLClassLoader(new URL[] {new File(&quot;JBOSS_HOME/client/jbossall-client.jar&quot;)});</p>
<p>Thread.currentThread().setContextClassLoader(cl);<br />
Class&lt;Context&gt; clazz = (Class&lt;Context&gt;) cl.loadClass(&quot;javax.naming.InitialContext&quot;);</p>
<p>&nbsp;</p>
<p>Hashtable env = new Hashtable();<br />
env.put(Context.INITIAL_CONTEXT_FACTORY, &quot;org.jnp.interfaces.NamingContextFactory&quot;);<br />
env.put(Context.URL_PKG_PREFIXES, &quot;org.jboss.naming:org.jnp.interfaces&quot;);<br />
env.put(Context.PROVIDER_URL, String.format(&quot;jnp://%s:%d&quot;, getJmxHostname(), getJmxPort()));<br />
Constructor&lt;Context&gt; ctor = clazz.getConstructor(Hashtable.class);<br />
Context ctx = ctor.newInstance(env);<br />
Method method = clazz.getMethod(&quot;lookup&quot;, String.class);<br />
MBeanServerConnection conn = (MBeanServerConnection) method.invoke(ctx, &quot;jmx/invoker/RMIAdaptor&quot;);</p>
<p>Thread.currentThread().setContextClassLoader(currentClassLoader);</p>
<p>&nbsp;</p>
<p>ObjectName name = ObjectName.getInstance(&quot;jboss.system&quot;, &quot;type&quot;, &quot;Server&quot;);<br />
Boolean started = (Boolean) connection.getAttribute(name, &quot;Started&quot;);<br />
&nbsp;</p>
<p>&lt;/code&gt;</p>
