---
layout: post
title: How to save new Entity inside Hibernate Listeners
created: 1359568977
author: roni
permalink: /java/how-save-new-entity-inside-hibernate-listeners
tags:
- JAVA
- Java J2EE
- Hibernate
---
<p>Most of times the simple and effective way to create auditing for Hibernate entities is envers framework.</p>
<p>But sometimes you wish to control the audited entity and create the Pojo explicit in your code and not be dependent with the implementation of envers.</p>
<p>For example you have general entities' filtering mechanism which has to receive an entity. I didn't find any way to retrieve the envers audited entity.</p>
<p>In this case you can use Hibernatre Listeners to achieve the same concept.</p>
<p>The idea is to create the audited entity for each action like: insert, update &amp; delete.</p>
<p>Saving the new audited entity is pretty simple for <em>PostUpdateListener</em> &amp; <em>PostDeleteListener</em>:</p>
<pre title="code" class="brush: java;">
public class PostUpdateListener implements org.hibernate.event.PostUpdateEventListener {
        @Override
        public void onPostUpdate(PostUpdateEvent event) {
                AuditedEntity auditedEntity = new AuditedEntity(...);
                event.getSession().save(auditedEntity);
        }
}
</pre>
<p>But saving a new entity for <em>PostInsertListener</em> is more complicated. The reason is you cannot use the same Hibernate session for saving a new entity in the middle of saving the original entity.</p>
<p>The solution I use to overcome this issue was to create another session factory and save the audited entity with the new session factory:</p>
<pre title="code" class="brush: java;">
public class PostInsertListener implements org.hibernate.event.PostInsertEventListener {
        private SessionFactory sessionFactory;

        public void setSessionFactory(SessionFactory sessionFactory) {
                this.sessionFactory = sessionFactory;
        }
        @Override
        public void onPostInsert(PostInsertEvent event) {
                AuditedEntity auditedEntity = new AuditedEntity(...);
                saveNewEntityFromWithinEventListener(auditedEntity);
        }
        private void saveNewEntityFromWithinEventListener(Object newEntity) {
                sessionFactory.getCurrentSession().save(newEntity);
        }
}</pre>
<pre class="western"><br /></pre>
<p>Pay attention to create your audited entity in a different package and set it to the new session factory package to scan property. This way the session factory maps only the audited entity it used.</p>
<p>I'm sure there are more methods to overcome this issue with Hibernate insert listener, and it will be great you share them with us in your comments.</p>
