---
layout: post
title: Kick off your first JPA2 with Hibernate code
created: 1267647615
author: yanai
permalink: /java/kick-your-first-jpa2-hibernate-code
tags:
- JAVA
- JPA2 Hibernate3.5
---
<p>&nbsp;Since Hibernate 3.5 CR2 was released recently, and the GA release is just around the corner, I decided to pick and test it as a JPA2 provider. I tried to Google for a &quot;step-by-step&quot; or even a sample project which uses JPA2 with Hibernate as its provider and haven't found any, so I decided to publish (the first?) one.</p>
<p>I tried to make this sample as simple as possible, yet demonstrate one of the innovation of JPA2: Type-safe Critaria API. Hibernate 3.5 uses a Java 6 annotation processor used to generate JPA 2 StaticMetamodel classes, intended mostly for use in JPA 2 criteria queries. The processor (JPAMetaModelEntityProcessor) processes all classes annotated with @Entity, as well as entities mapped in /META-INF/orm.xml and mapping files specified in persistence.xml.<br />
On our example we'll have a &quot;User&quot; entity, and the processor will create a metamodel class &quot;User_&quot;. The generated &quot;User_&quot; class enable us to run a type-safe criteria query. The generation of this class can be created either by the IDE or by a build tool (or both).</p>
<p>So without further words, lets start our first Maven JPA2+Hibernate project:<br />
First we need to create the pom.xml which declares all the dependencies (including the Hibernate preprocessor jar to generate our &quot;User_&quot; class)</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;

         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd&quot;&gt;

    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.mycompany.app&lt;/groupId&gt;
    &lt;artifactId&gt;my-app&lt;/artifactId&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;name&gt;Maven Quick Start Archetype&lt;/name&gt;
    &lt;url&gt;http://maven.apache.org&lt;/url&gt;


    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;junit&lt;/groupId&gt;
            &lt;artifactId&gt;junit&lt;/artifactId&gt;
            &lt;version&gt;4.8.1&lt;/version&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;!-- concrete Log4J Implementation for SLF4J API--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
            &lt;artifactId&gt;slf4j-log4j12&lt;/artifactId&gt;
            &lt;version&gt;1.5.11&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!-- Hibernate generate Metamodel --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-jpamodelgen&lt;/artifactId&gt;
            &lt;version&gt;1.0.0-CR-1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;!-- Hibernate dependecies --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate.java-persistence&lt;/groupId&gt;
            &lt;artifactId&gt;jpa-api&lt;/artifactId&gt;
            &lt;version&gt;2.0-cr-1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-entitymanager&lt;/artifactId&gt;
            &lt;version&gt;3.5.0-CR-2&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;hsqldb&lt;/groupId&gt;
            &lt;artifactId&gt;hsqldb&lt;/artifactId&gt;
            &lt;version&gt;1.8.0.7&lt;/version&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                &lt;configuration&gt;
                    &lt;source&gt;1.6&lt;/source&gt;
                    &lt;target&gt;1.6&lt;/target&gt;
                    &lt;compilerArgument&gt;-proc:none&lt;/compilerArgument&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.bsc.maven&lt;/groupId&gt;
                &lt;artifactId&gt;maven-processor-plugin&lt;/artifactId&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;id&gt;process&lt;/id&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;process&lt;/goal&gt;
                        &lt;/goals&gt;
                        &lt;phase&gt;generate-sources&lt;/phase&gt;
                        &lt;configuration&gt;
                            &lt;!-- source output directory --&gt;
                            &lt;outputDirectory&gt;target/metamodel&lt;/outputDirectory&gt;
                        &lt;/configuration&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;build-helper-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.5&lt;/version&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;id&gt;add-source&lt;/id&gt;
                        &lt;phase&gt;generate-sources&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;add-source&lt;/goal&gt;
                        &lt;/goals&gt;
                        &lt;configuration&gt;
                            &lt;sources&gt;
                                &lt;source&gt;target/metamodel&lt;/source&gt;
                            &lt;/sources&gt;
                        &lt;/configuration&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

    &lt;repositories&gt;
        &lt;repository&gt;
            &lt;id&gt;jboss&lt;/id&gt;
            &lt;url&gt;http://repository.jboss.org/maven2&lt;/url&gt;
        &lt;/repository&gt;
    &lt;/repositories&gt;

    &lt;pluginRepositories&gt;
        &lt;pluginRepository&gt;
            &lt;id&gt;maven-annotation-plugin&lt;/id&gt;
            &lt;url&gt;http://maven-annotation-plugin.googlecode.com/svn/trunk/mavenrepo&lt;/url&gt;
        &lt;/pluginRepository&gt;
    &lt;/pluginRepositories&gt;
&lt;/project&gt;</pre>
<p>&nbsp;</p>
<p>Now, lets create a simple entity &quot;User&quot;:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

	User() {
	}

	public User(String name) {
		this.name = name;
	}

	@SuppressWarnings(&quot;unused&quot;)
	@GeneratedValue
	@Id
	private Integer id;

	private String name;

	public String getName() {
		return name;
	}

}</pre>
<p>&nbsp;</p>
<p>Next step is to create create a persistence.xml file under META-INF directory containing the DB properties (HSQL in memory DB in our case) , the entities , and a couple of Hibernate properties (auto-generate the schema and SQL dialect):</p>
<pre class="brush: xhtml;" title="code">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;

&lt;persistence xmlns=&quot;http://java.sun.com/xml/ns/persistence&quot;
             xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
             xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/persistence persistence_2_0.xsd&quot;
             version=&quot;2.0&quot;&gt;

    &lt;persistence-unit name=&quot;sampleEM&quot; transaction-type=&quot;RESOURCE_LOCAL&quot;&gt;
        &lt;provider&gt;org.hibernate.ejb.HibernatePersistence&lt;/provider&gt;
        &lt;class&gt;com.tikal.sample.model.User&lt;/class&gt;

        &lt;properties&gt;
            &lt;property name=&quot;javax.persistence.jdbc.driver&quot; value=&quot;org.hsqldb.jdbcDriver&quot;/&gt;
            &lt;property name=&quot;javax.persistence.jdbc.url&quot; value=&quot;jdbc:hsqldb:mem:aname&quot;/&gt;
            &lt;property name=&quot;javax.persistence.jdbc.user&quot; value=&quot;sa&quot;/&gt;
            &lt;property name=&quot;javax.persistence.jdbc.password&quot; value=&quot;&quot;/&gt;
            &lt;!-- Hibernate required props --&gt;
            &lt;property name=&quot;hibernate.dialect&quot; value=&quot;org.hibernate.dialect.HSQLDialect&quot;/&gt;
            &lt;property name=&quot;hibernate.hbm2ddl.auto&quot; value=&quot;update&quot;/&gt;
        &lt;/properties&gt;

    &lt;/persistence-unit&gt;

&lt;/persistence&gt;</pre>
<p>&nbsp;</p>
<p>Thats all the source needed for the project!</p>
<p>Now you need to run &quot;mvn install&quot;. This will generate java sources for the metamodel and compile it with all other Java sources in the project. In our case a new Java file, User_.java will be created at target/metamodel/com/tikal/sample/model folder:</p>
<pre class="brush: java;" title="code">
@StaticMetamodel(User.class)
public abstract class User_ {

    public static volatile SingularAttribute&lt;User, Integer&gt; id;

    public static volatile SingularAttribute&lt;User, String&gt; name;

}</pre>
<p>&nbsp;</p>
<p>Lets unit test the code above, by creating a type-safe criteria query.</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
public class UserTest {

    private static EntityManagerFactory factory = Persistence.createEntityManagerFactory(&quot;sampleEM&quot;);

    @Test
    public void findUsers() {

        String name = &quot;yanai&quot;;
        EntityManager em = factory.createEntityManager();
        EntityTransaction tx = null;
        try {
            tx = em.getTransaction();
            tx.begin();
            em.persist(new User(name));
            User loadedUser = loadUserByName(name, em);
            assert loadedUser.getName().equals(name);
            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null &amp;&amp; tx.isActive())
                tx.rollback();
            throw e;
        } finally {
            em.close();
        }
    }


    private User loadUserByName(String name, EntityManager em) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery&lt;user&gt; q = cb.createQuery(User.class);
        Root&lt;user&gt; user = q.from(User.class);
        q.select(user).where(cb.equal(user.get(User_.name), name));
        return em.createQuery(q).getSingleResult();
    }
}</pre>
<p>&nbsp;</p>
<p>If you look carefully at the &quot;loadUserByName&quot; method you can see that we use the &quot;User_.name&quot; as a type-safe predicate for our query:</p>
<pre class="brush: sql;" title="code">
q.select(user).where(cb.equal(user.get(User_.name), name));</pre>
<p>&nbsp;</p>
<p>Thats all. I hope this post helped you kick off and taste JPA2 with Hibernate.</p>
