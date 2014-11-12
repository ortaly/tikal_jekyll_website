---
layout: post
title: How to activate and deactivate Hibernate Filters
created: 1359373225
author: roni
permalink: /java/how-activate-and-deactivate-hibernate-filters
tags:
- JAVA
- Java J2EE
- Hibernate
- filters
---
<p>Assume you have hibernate filters you or somebody else have defined in the code for an entity.</p>
<p>For convenience lets take a short example for entity <em>Resource</em>:</p>
<pre class="brush: java;" title="code">
@FilterDefs({@FilterDef(name = &quot;nonDeletedResource&quot;)})
@Filters({@Filter(name = &quot;nonDeletedResource&quot;, condition = &quot;deleted = 0&quot;)})
public class Resource extends AbstractEntity {
...
}</pre>
<p>The idea of the above hibernate filter is to give the option to retrieve only the entities that are not signed as deleted.</p>
<p>In our use case we want to activate the filters all the time so we activate the filter each time the session created:</p>
<pre class="brush: java;" title="code">
Session session() {
	Session session = sessionFactory.getCurrentSession();
	session.enableFilter(&quot;nonDeletedResource&quot;);
	return session;
}</pre>
<p>But then we have a use case we want the deleted entities as well, so we use the <em>disableFiilter</em> API to deactivate the filter in the specific session with the all entities query:</p>
<pre class="brush: java;" title="code">
void getAllEntities (
        Session session = sessionFactory.getCurrentSession();
        if (withDeleted)
	        session.disableFilter(&quot;nonDeletedResource&quot;);
        ...
}
</pre>
<p>Any more questions or feedbacks are welcome!</p>
