---
layout: post
title: '@org.hibernate.search.annotations.IndexedEmbedded and polymorphic associations.'
created: 1247430209
permalink: org-hibernate-search-annotations-indexedembedded-and-polymorphic-associations
tags:
- JAVA
- Hibernate Search
---
<p>While configuring my client model with Hibernate Search annotations <br />
I encountered the following problem:<br />
<br />
&lt;pre class=&quot;brush: java;&quot;&gt;&nbsp; <br />
<br />
@Entity<br />
@org.hibernate.search.annotations.Indexed<br />
public class Form {<br />
&nbsp;&nbsp;&nbsp; ....<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String name;<br />
&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; @OneToMany(cascade = CascadeType.ALL)<br />
&nbsp;&nbsp;&nbsp; @JoinTable(name = &quot;join_form_input&quot;, joinColumns = @JoinColumn(name = &quot;form_id&quot;), inverseJoinColumns = @JoinColumn(name = &quot;input_id&quot;))<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.IndexedEmbedded<br />
&nbsp;&nbsp;&nbsp; private List&lt;Input&gt; fields = new ArrayList&lt;Input&gt;();<br />
&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; ....<br />
}</p>
<p><br />
@Inheritance<br />
@Entity<br />
@DiscriminatorColumn(name = &quot;type&quot;)<br />
public abstract class Input {<br />
&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field(index = Index.UN_TOKENIZED)<br />
&nbsp;&nbsp;&nbsp; @Column(insertable = false, updatable = false)&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String type;<br />
&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; some common properties and methods inherited by all Input's subclasses <br />
&nbsp;&nbsp;&nbsp; ...<br />
}<br />
<br />
<br />
@Entity<br />
@DiscriminatorValue(value = &quot;Comment&quot;)<br />
public class Comment extends Input {<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String comment;<br />
&nbsp;&nbsp;&nbsp; ...<br />
}<br />
<br />
@Entity<br />
@DiscriminatorValue(value = &quot;Address&quot;)<br />
public class Address extends Input {<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String street;<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String city;<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private String postcode;<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; private Integer number;<br />
&nbsp;&nbsp;&nbsp; ...<br />
}&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; // and around 10 more inputs types as such.<br />
&lt;/pre&gt;<br />
<br />
It appears when using this configuration, that only Fields in the super class - Input, were indexed, the comment field and address fields were ignored by hibernate search.<br />
<br />
@org.hibernate.search.annotations.IndexedEmbedded does not support polymorphic associations.<br />
<br />
Keeping in mind the client's requirements, the index mapping should be used to query Forms by type and value, such that value is a String that could much any of the Inputs properties&nbsp; (No need to query a single and specific Input property).<br />
I thought of 2 options:<br />
<br />
1. Map each subclass with its own collection in class Form<br />
<br />
But there are a few drawbacks for taking this route <br />
<br />
1. I had no use case of using form.getAddreses() or form.getComments() and all other at all.<br />
2. Even if I map these associations as lazy and reducing performance damage of unnecessary joins, having such unused fields could be very confusing<br />
3. Whenever a new Input subclass is added - a new association should be defined but nothing to force this design except bad search result&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />
<br />
<br />
2. Add to the Input class the abstract method:<br />
<br />
&lt;snippet class=&quot;brush: java;&quot;&gt;&nbsp; <br />
<br />
&nbsp;&nbsp;&nbsp; @org.hibernate.search.annotations.Field<br />
&nbsp;&nbsp;&nbsp; @Transient<br />
&nbsp;&nbsp;&nbsp; public abstract String getValue();<br />
&lt;/snippet&gt;<br />
&nbsp;&nbsp;&nbsp; <br />
To force all Input subclasses to implement it. Each input will return the concatenation of all its field's non null values, separated by a space.<br />
<br />
This way I'll get an Index field which is Transient to the DB and can be queried to retrieve it's Form.<br />
Also, no damage to performance and a more generic solution. On a case were a new subclass is added design is forced by the abstract method. <br />
<br />
But, one drawback is that&nbsp; all properties of Input subclasses are treated as one single field, which means that they will share the same configuration: <br />
analyzer, Boost, FieldBridge, Index, Store, TermVector.<br />
<br />
Any other ideas?<br />
<br />
Thanks!<br />
<br />
<br />
<br />
&nbsp;</p>
