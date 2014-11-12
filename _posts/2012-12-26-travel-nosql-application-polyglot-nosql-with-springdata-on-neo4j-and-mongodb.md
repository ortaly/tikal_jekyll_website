---
layout: post
title: Travel NoSQL Application - Polyglot NoSQL with SpringData on Neo4J and MongoDB
created: 1356518367
author: yanai
permalink: /java/travel-nosql-application-polyglot-nosql-springdata-neo4j-and-mongodb
tags:
- JAVA
- NoSQL SpringData Polyglot Persistence
---
<p>&nbsp;In this Fuse day, Tikal Java group decided to continue <a href="http://www.tikalk.com/java/build-your-first-hadoop-project-maven">its previous Fuse research for NoSQL</a>, but this time from a different point of view &ndash; SpringData and Polyglot persistence. We had two goals in this Fuse day: try working with more than one <a href="http://en.wikipedia.org/wiki/NoSQL">NoSQL</a> in the same application, and also taking advantage of <a href="http://www.springsource.org/spring-data">SpringData</a> data access abstractions for NoSQL databases. We decided to take <a href="http://www.mongodb.org/">MongoDB</a> and <a href="http://www.neo4j.org/">Neo4J</a> as document DB, and Neo4J as graph database and put them behind an existing, classic and well known application &ndash; <a href="http://richweb.springsource.org/swf-booking-faces/spring/intro">Spring Travel Sample application</a>.</p>
<p>&nbsp;</p>
<p><img src="/files/upload/27/fuse_0.jpg" alt="Spring Travel Application" width="1153" height="696" /></p>
<p>&nbsp;</p>
<p>This is a kind of &ldquo;hello world&rdquo; application for Spring users, which demonstrates a very simple hotel bookings application, using Spring framework with JPA to access RDBMS. As said, our goal was to replace the RDBMS behind this app, with the two NoSQL above. Obviously this wasn't done for architecture reasons, since RDBMS can serve perfectly for this simple application. We merely wanted to understand, how hard is to migrate a simple Spring/JPA application to SpringData/NoSQL, and how hard is to use more than one NoSQL on the same project (while gaining some hand-on experience with these technologies).</p>
<p>&nbsp;</p>
<p>We split our work into three phases:</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm"><u><b>Phase 1 &ndash; Integrate Neo4J to Travel Application</b></u></p>
<pre title="code" class="brush: java;">
&lt;dependency&gt;
&lt;groupId&gt;org.springframework.data&lt;/groupId&gt;
   &lt;artifactId&gt;spring-data-neo4j&lt;/artifactId&gt;
   &lt;version&gt;2.1.0.RELEASE&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;			   
   &lt;groupId&gt;org.springframework.data&lt;/groupId&gt;	  
   &lt;artifactId&gt;spring-data-neo4j-rest&lt;/artifactId&gt;
   &lt;version&gt;2.1.0.RELEASE&lt;/version&gt;
&lt;/dependency&gt;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-bottom: 0cm">Next, we converted the simple domain objects to Graph model. In graph model you have two constructs : Nodes and Relationships. Both nodes and relationships can have properties, so there is somewhat less impedance mismatch to Object Oriented world , compare to RDBMS-to-OO one.</p>
<p style="margin-bottom: 0cm">We converted the Hotel and User entities to graph Nodes and the Booking entity to Relationship typed &ldquo;BOOKD&rdquo;. We also changed the JPA @ID annotation to @GraphID and marked some of the properties as @Index. The @Index enables fast search by Neo4J for nodes by these properties - Behind the scenes Neo4J uses <a href="http://lucene.apache.org/core/">Lucene fast full text search index</a> for that matter. Here are some code snippets from the the entities:</p>
<pre title="code" class="brush: java;">
//@Entity
@NodeEntity
public class Hotel implements Serializable {
	@GraphId
	private Long id;
	@Indexed(indexType = IndexType.FULLTEXT, indexName = &quot;search&quot;)
	private String name;
	...
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<pre title="code" class="brush: java;">
//@Entity
//@Table(name = &quot;Customer&quot;)
@NodeEntity
public class User implements Serializable {
	@GraphId
	private Long id;	
	@Indexed
	private String username;
	private String password;
	@RelatedToVia(type=&quot;BOOKED&quot;)
	List&lt;Booking&gt; bookings;
	&hellip;
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<pre title="code" class="brush: java;">
//@Entity
@RelationshipEntity(type=&quot;BOOKED&quot;)
public class Booking implements Serializable {
	@GraphId
	private Long id;
	@StartNode
	private User user;
	@EndNode
	private Hotel hotel;
	private String creditCard;
	...
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Next step, was to define SpringData Repositories. We created two interfaces: HotelRepository and UserRepository. Both interfaces extends SpringData's <a href="http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RELEASE/api/org/springframework/data/neo4j/repository/GraphRepository.html">GraphRepority</a> interface. We were happy for the no-need to implement the interfaces - They are been implemented automatically by SpringData using method naming conventions :)</p>
<p style="margin-bottom: 0cm">Next, we had to integrate the new interfaces into a new BookingService implementation of the existing BookingService interface. This new implementation uses the new created repositories above, to implement the expected behavior. Thus , we kept the MVC layer and GUI as is.</p>
<p style="margin-bottom: 0cm">Last step, was creating  a small Spring configuration file, which defines the GraphDataService bean and our base package for the repositories interfaces above:</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<pre title="code" class="brush: java;">
&lt;beans...&gt;	
	&lt;context:spring-configured/&gt;
	&lt;context:annotation-config/&gt;
	&lt;context:component-scan base-package=&quot;org.springframework.samples.travel&quot; /&gt;
	&lt;neo4j:config graphDatabaseService=&quot;graphDatabaseService&quot;/&gt;
	&lt;bean id=&quot;graphDatabaseService&quot; 			 			   
                         class=&quot;org.springframework.data.neo4j.rest.SpringRestGraphDatabase&quot;&gt;
		&lt;constructor-arg value=&quot;http://localhost:7474/db/data/&quot; index=&quot;0&quot;/&gt;
	&lt;/bean&gt;
	&lt;neo4j:repositories base-package=&quot;org.springframework.samples.travel&quot;/&gt;
&lt;/beans&gt;</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">That's all for this phase &ndash; After running neo4j server, and deploying the application on Tomcat, we had the same Travel application &ndash; but this time working against Neo4J Graph DB.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm"><u><b>Step 2 &ndash; Integrate MongoDB to Travel Application</b></u></p>
<p style="margin-bottom: 0cm">In this phase we wanted to overload the Travel application with yet another NoSQL &ndash; MongoDB. MongoDB is very popular document datastore, which keeps its documents aggregated in one or more collections inside the DB. MongoDB has a flexible query language (much more flexible than other NoSQL). Nevertheless, for complex operations, like grouping results, you may need to write <a href="http://docs.mongodb.org/manual/applications/map-reduce/">a map-reduce program in MongoDB</a>, and this is exactly what we had to do here.</p>
<p style="margin-bottom: 0cm">Again, we started with Maven dependencies artifacts, and we spent some time to understand, we must take the last dependencies in integrate also with Neo4J dependencies without clashes.</p>
<p style="margin-bottom: 0cm">Then, we created a new domain object called BookingDoc, containing the booking-id and userId:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Document
public class BookingDoc implements Serializable {
	@Id
	private String id;
	private Long userId;
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">As you can see, this domain class is annotated with @Document to denote its been persistent as a document in MongoDB, and @Id is the document id.</p>
<p style="margin-bottom: 0cm">Next step, we created a BookingDocRepository interface, which extends SpringData's <a href="http://static.springsource.org/spring-data/data-mongo/docs/1.0.x/apidocs/org/springframework/data/mongodb/repository/MongoRepository.html">MongoRepository</a> base interface. Again no implementation here &ndash; we have the auto-generated one from the SpringData on application startup :)</p>
<p style="margin-bottom: 0cm">Here we have more complicated use case than in Neo4J: In addition to the basic inherited methods from MongoRepository, we wanted to create a custom implementation. This custom implementation method, could NOT be created automatically by naming conventions, as we saw before. The custom method should invoke a map reduce functionality inside the MongoDB. This map-reduce calculates the bookings count for a given user. For that, we had to create yet another interface, BookingDocCustomRepository:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public interface BookingDocCustomRepository {
	long countBookingsForUser(long userId);
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">This new custom interface is also a base interface for our  BookingDocRepository as follow:</p>
<pre title="code" class="brush: java;">
public interface BookingDocRepository 
                   extends MongoRepository&lt;BookingDoc, Serializable&gt;,BookingDocCustomRepository {
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">We created a new implementation repository BookingDocRepositoryImpl, which implements the map-reduce method to calculate the bookings count for the user. Thus, the result on runtime is a &ldquo;mixed-in&rdquo; implementation &ndash; Containing our custom implementation, and the SpringData generated code. Our custom implementation uses SpringData's <a href="http://static.springsource.org/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html">MongoTemplate</a> to invoke the map-reduce code in the DB:</p>
<pre title="code" class="brush: java;">
public class BookingDocRepositoryImpl implements BookingDocCustomRepository{
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public long countBookingsForUser(long userId) {
		String mapFunc = String.format(&quot;function() {&quot; +
							&quot;if(this.userId == %d) &quot; +
								&quot;emit(this.userId, 1);&quot; +
							&quot;}&quot;,userId);
		String reduceFunc = &quot;function(k,vals) {&quot; +
					&quot;var sum=0;&quot;+
					&quot;for(var i in vals) sum += vals[i];&quot;+
					&quot;return sum;&quot;+
				&quot;}&quot;;
		    
		MapReduceResults&lt;BookingDoc&gt; result = mongoTemplate.mapReduce(&quot;bookingDoc&quot;, mapFunc, reduceFunc, BookingDoc.class);
		BasicDBList list = (BasicDBList) result.getRawResults().get(&quot;results&quot;);
		if(list.isEmpty())
			return 0;
		DBObject object = (DBObject) list.get(0);
		Double d = (Double) object.get(&quot;value&quot;);
		return (long)d.doubleValue();
		
	}
}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">As you can see, the map method emits tuples of userId and 1, for every booking associated with the input userId. On the other hand, the reduce method accepts the userId and the list of 1, and sum the 1 values. The reduce returns a list of tuples. Nevertheless, since we have only one user as the output of the map method, we have only one tuple in the list.  The tuple's &ldquo;value&rdquo; is the booking count for given user.</p>
<p style="margin-bottom: 0cm">Last, we added Spring configuration for MongoDB. This includes the DB configuration, MongoTemplate and our MongoDB's repositories base package:</p>
<pre title="code" class="brush: java;">
&lt;beans...&gt;
	&lt;context:annotation-config /&gt;
	&lt;util:properties id=&quot;appConfig&quot; location=&quot;classpath:META-INF/spring/application.properties&quot;/&gt;
	&lt;context:property-placeholder properties-ref=&quot;appConfig&quot;/&gt;
	&lt;mongo:mongo host=&quot;${app.config.mongo.host}&quot; port=&quot;${app.config.mongo.port}&quot; /&gt;
	&lt;mongo:repositories base-package=&quot;org.springframework.samples.travel.mongo.repository&quot; mongo-template-ref=&quot;mongoTemplate&quot;/&gt;
	&lt;bean id=&quot;userCredentials&quot; class=&quot;org.springframework.data.authentication.UserCredentials&quot;&gt;
		&lt;constructor-arg name=&quot;username&quot; value=&quot;${app.config.mongo.user}&quot; /&gt;
    	&lt;constructor-arg name=&quot;password&quot; value=&quot;${app.config.mongo.password}&quot; /&gt;
	&lt;/bean&gt;
	&lt;bean id=&quot;mongoTemplate&quot; class=&quot;org.springframework.data.mongodb.core.MongoTemplate&quot;&gt;
		&lt;constructor-arg ref=&quot;mongo&quot; /&gt;
		&lt;constructor-arg name=&quot;databaseName&quot; value=&quot;${app.config.mongo.databasename}&quot; /&gt;
		&lt;constructor-arg ref=&quot;userCredentials&quot; /&gt;
	&lt;/bean&gt;
&lt;/beans&gt;</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm"><u><strong>Phase 3 &ndash; Put it all together</strong></u></p>
<p style="margin-bottom: 0cm">We updated the BookingService implementation code to save the BookingDoc to MongoDB right after saving the Booking to Neo4J, using our new repositories:</p>
<pre title="code" class="brush: java;">
public Booking createBooking(Long hotelId, String username) {
		Hotel hotel = hotelRepository.findOne(hotelId);
		User user = userRepository.findByUsername(username);
		Booking booking = new Booking(hotel, user);
		neo4jOps.save(booking);
		bookingDocRepository.save(new BookingDoc(user.getId(), booking.getCreditCard()));
		return booking;
	}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">We also added simple method that calculates the booking count in the service that delegates it to our repository:</p>
<pre title="code" class="brush: java;">
@Override
	public long countBookingsForUser(long userId){
		return bookingDocRepository.countBookingsForUser(userId);
	}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">That's it &ndash; you have a running Spring travel application using two NoSQL storages with SpringData.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm"><u><b>Conclusion</b></u></p>
<p style="margin-bottom: 0cm">We had much pleasure playing with NoSQL and SpringData in this Tikal Fuse day. We faced the nice SpringData features, neglecting the <a href="http://relation.to/1350.lace">old &ldquo;GenericDao&rdquo; pattern</a>. We were also happy to drop DAO implementations classes (typically dozens empty useless in a regular applications), and use SpringData's &ldquo;query by convention&rdquo; and annotations.</p>
<p style="margin-bottom: 0cm">We have the confidence now,we can really integrate more than one NoSQL in the same project with SpringData, by making sure the right Maven dependencies, making it as a <a href="http://martinfowler.com/bliki/PolyglotPersistence.html">Polyglot Persistence</a> application. You can download the Travel NoSQL application from Tikal GitHub.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p>&nbsp;</p>
