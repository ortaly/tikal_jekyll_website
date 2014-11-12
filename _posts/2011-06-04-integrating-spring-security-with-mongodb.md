---
layout: post
title: Integrating Spring Security with MongoDB
created: 1307218025
author: ori
permalink: /java/integrating-spring-security-mongodb
tags:
- JAVA
- Spring Security MongoDB Morphia
---
<p>One of the most powerful features of Spring Security (besides support for industry standard, extensibility, easy configuration, expressive authorization schemes and others) is the ability to easily authenticate users with any data store that can manage users credentials and other authentication attributes.<br />
<br />
In this short tutorial I will explain how to use MongoDB, the popular scalable and high-performance document database for authentication purposes.<br />
<br />
This tutorial assumes a basic knowledge of Spring Security.<br />
<br />
First, we'll create the Subscriber (user) entity which is mapped to the subscribers MongoDB collection.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Entity(value = &quot;subscribers&quot;, noClassnameStored = false)
@XmlRootElement
public class Subscriber  {
 
    @Id
    @XmlJavaTypeAdapter(MongoObjectIdXmlAdapter.class)
    private ObjectId id;
 
    @Indexed(value = IndexDirection.ASC, name=&quot;subscriber_index&quot;, unique = true)
    @Property(&quot;id&quot;)
    @Length(min = 6, max = 12)
    private String identifier;
 
    @Property(&quot;pwd&quot;)
    @Length(min = 6, max = 12)
    private String credentials;
 
    @NotNull
    private Boolean active;
 
    ...
 
}</pre>
<pre>

</pre>
<p>If some of these annotations seem a little bit JPA-ish familiar (@Entity, @Id) it's not because JPA is used here. Instead, Morphia - a lightweight Object / MongoDB wrapper library above MongoDB Java driver - is being used. Morphia has borrowed some of JPA concepts and behaviors.<br />
Morphia also uses Hibernate Validation to process JSR 303 annotation, and has GWT&nbsp;support extension<br />
Note the unique index annotation above the identifier (username) property. This is used to ensure the index on Morphia bootstrap.<br />
<br />
Next, I'll show a minimal Spring Security configuration to be used:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
&lt;http auto-config='true'&gt;
        &lt;intercept-url pattern=&quot;/rest/**&quot; access=&quot;ROLE_USER&quot;/&gt;
&lt;/http&gt;
&lt;authentication-manager&gt;
    &lt;authentication-provider user-service-ref=&quot;userDetailsService&quot;/&gt;
&lt;/authentication-manager&gt;
&lt;beans:bean id=&quot;userDetailsService&quot; class=&quot;com.mycom.security.MongoUserDetailService&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>This means that every web request going through the 'rest' URL pattern must be authenticated. The request principal must be granted the &quot;ROLE_USER&quot; role.<br />
<br />
The Authentication Provider is injected with a custom User Detail Service (in this case the MongoUserDetailService). Alternatively we could have booted our custom Authentication Provider, put the default one supplied with the Spring Security framework (DaoAuthenticationProvider) with it's method additionalAuthenticationChecks is sufficient for our simple example and needs. <br />
<br />
Next we'll have a look at our custom User Details Service:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
public class MongoUserDetailService implements UserDetailsService {
 
    @Autowired
    private SubscriberMorphiaDao subscriberMorphiaDao;
 
    public UserDetails loadUserByUsername(String username) 
           throws UsernameNotFoundException, DataAccessException {
        Subscriber subscriber = subscriberMorphiaDao.find(username);
        if (subscriber == null) {
            return null;
        }
 
        Collection&lt;GrantedAuthorityImpl&gt; authorities = 
             Sets.newHashSet(new GrantedAuthorityImpl(&quot;ROLE_USER&quot;));
        return new User(subscriber.getIdentifier(), subscriber.getCredentials(), 
                subscriber.isActive(),true,true, true, authorities);
    }
}</pre>
<p>&nbsp;</p>
<p>Our MongoUserDetailService implements UserDetailService's loadUserByUsername() method.<br />
<br />
First a DAO a used to retrieve the Subscriber class discussed above using the username which is mapped to a unique key in Mongo's subscriber collection. <br />
Next a Spring Security User instance, which encapsulate user credentials and authorities, is being constructed. The first three parameters are for the username, password and enabled properties respectively. The true triplet is for ignoring account password expiry and lock which is none of our concern for now. The last parameter is a collection of GrantedAuthority (roles) the user is associated with. The &quot;ROLE_USER&quot; authority matches the URL pattern defined in the configuration file.<br />
The &quot;ROLE_USER&quot; is hard coded here, but the collection of authorities could have been easily constructed from an array in the Subscriber document, for example.<br />
&nbsp;</p>
<p>&nbsp;</p>
