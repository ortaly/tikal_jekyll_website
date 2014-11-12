---
layout: post
title: Hibernate Proxy
created: 1341468658
author: chaim.turkel
permalink: /java/blog/hibernate-proxy-0
tags:
- JAVA
- Hibernate
---
<p>One of the strenghts of &nbsp;Hibernate is the option for lazy loading. This means that we do not actually load the object from the db, but hibernate creates a proxy object, and only when we actually need the object does it go to the database and get the information.</p>
<p>This helps on performance of the product, but can cause a lot of side effects.</p>
<p>The proxy class is not the actual class, but implemenets all the public methods of the real class and then delegates them to the real class when created.</p>
<p>Some times this is not good enought and you need the actual class and not the proxy.</p>
<p>After searching the internet i have found the following way to get from hibernate the actuall class and not the proxy.</p>
<p>&nbsp;</p>
<p>public static &lt;T&gt; T initializeAndUnproxy(T entity) {</p>
<p>&nbsp; &nbsp;if (entity == null) {</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp;throw new&nbsp;</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NullPointerException(&quot;Entity passed for initialization is null&quot;);</p>
<p>&nbsp; &nbsp;}</p>
<p>&nbsp;</p>
<p>&nbsp; &nbsp;Hibernate.initialize(entity);</p>
<p>&nbsp; &nbsp;if (entity instanceof HibernateProxy) {</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp;entity = (T) ((HibernateProxy) entity).getHibernateLazyInitializer()</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.getImplementation();</p>
<p>&nbsp; &nbsp;}</p>
<p>&nbsp; &nbsp;return entity;</p>
<p>}<span class="Apple-tab-span" style="white-space:pre"> </span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
