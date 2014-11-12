---
layout: post
title: MongoDB , Spring and REST – Trio for JEE Dynamic Data Access.
created: 1281555884
author: yanai
permalink: /java/mongodb-spring-and-rest-–-trio-jee-dynamic-data-access
tags:
- JAVA
- MongoDB Spring REST
---
<p>In the last couple of weeks, I've been working on building a new architecture of a product for one of our customers. As many other products you probably know, I had to design the object model and be able to persist it to the the DB. So natively, I wanted to use JPA and Hibernate in order to persist the objects into the RDBMS. But then a new requirement came and bumped my face&nbsp; - &ldquo;parts of the domain-model and the data-model may be changed dynamically at runtime every now and again, while the system should stay running and without downtime&rdquo;. The changes for the model can be applied by end users with &ldquo;admin&rdquo; role of the product, actually without changing the product itself (no new revision the product should be involved in this process). <br />
The dynamic part described above is NOT a small data set: it can contain a few Gigabytes of data. The potential changes of the model include everything you can think of &ndash; adding new types, changing existing types and their fields, changing the field types and constraints, adding/changing/removing relationships between existing types , removing types etc.<br />
In addition to &quot;create&quot;, &quot;update&quot; and &quot;delete&quot; operations on the data, the end user has a dynamic window that can query and filter for dynamic types which had been defined. This filter window includes expression builder, paging ordering etc.<br />
So, while part of the application will remain classic, which I can harness all the classic solution including <a href="http://community.jboss.org/wiki/GenericDataAccessObjects">GeneicDAO</a> for various static entities that uses JPA/Hibernate to persist them, the other part is dynamic , and may need an alternative solution. The challenge with the dynamic part of the model, is both on the software and the storage. There were various alternatives , including <a href="http://docs.jboss.org/hibernate/core/3.3/reference/en/html/persistent-classes.html#persistent-classes-dynamicmodels">Hibernate dynamic model</a>, changing code at runtime, dynamic generation of SQL queries and more. I will NOT detail them here, but you can just taste them <a href="http://www.tikalk.com/alm/forums/dynamic-orm-entity-class-generation">in this thread</a>.</p>
<h1>Enter MongoDB</h1>
<p>I chose another option - <a href="http://www.mongodb.org/">MongoDB</a>. MongoDB belongs to the <a href="http://nosql-database.org/">NoSQL new databases</a> which are NOT RDBMS.&nbsp; More specifically, is a Document DB. Unlike a relational database management system, MongoDB manages collections of JSON-like documents. This allows many applications to model data in a more natural way, as data can be nested in complex hierarchies and still be query-able and indexable. In addition, MongoDB support Ad-Hoc queries which meets perfectly my requirement for the filtering window dicussed above. Unlike many other non-relational database solutions, any field can be queried at any time. MongoDB supports range if queries, regular expression searches, and other special types of queries in addition to exactly matching fields. So, if for example I have the following document in the MongoDB:</p>
<pre title="code" class="brush: jscript;">
{
  &quot;username&quot; : &quot;bob&quot;,
  &quot;address&quot; : {
    &quot;street&quot; : &quot;123 Main Street&quot;,
    &quot;city&quot; : &quot;Springfield&quot;,
    &quot;state&quot; : &quot;NY&quot;
  }
}</pre>
<p>We can query for this document (and all documents with an address in New York) with:<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
db.users.find({&quot;address.state&quot; : &quot;NY&quot;})</pre>
<h1>Building the Architecture</h1>
<p>The new product will be Spring based JEE application and provide REST interface for its services with JAS-RS and JSON mime type. As said, it uses GenericDAO as its strongly type interface for the&nbsp; entities , implemented with JPA/Hibernate. So, I wanted to add yet another DAO called &quot;DynamicModelDao&quot; interface that use Stringed JSON data. This data will be persisted and fetched to and from the DB without going through any defined class. No Domain Driven Design here. No rigid schema. No hard coded columns and tables and no classes and field. This will fullfill the requirements for being dynamic , and enable the end user to change the domain without affecting the software and and the DB underneath it.<br />
<br />
So without much more words lets go to the &ldquo;real&rdquo; stuff and see how to integrate MongoDB within our RESTful Spring application and GenericDAO data access. First lets define the interfaces. The DAO interface is &ldquo;DynamicModelDao&rdquo; and just extends the GenericDAO interface. Note&nbsp; that neither GenericDAO nor DynamicModelDao reveals the the underlying implementation of the data access, so we can move to yet another storage to persist our Stringed information. More than that, both static and dynamic models share the same GenericDAO interface to persist and fetch the data of the application with JPA and MongoDB implementations. <br />
<br />
Here GenericDao interfaces code :</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public interface GenericDao  &lt;T, ID extends Serializable&gt; {
	void create(T entity);
	void create(T entity,ID id);
	
	T findById(ID id);
	void update(T entity);
	void delete(T entity);
	ResultPage&lt;T&gt; findByFilter(String q,String orders, int pageNumber,int pageSize);

}</pre>
<p><br />
&nbsp;</p>
<p>All the methods are self explained except the last one. The last method enables the client to filter results by a query string, defines the order , page number and size. It return a page of the results using the ResultPage. Here is the&nbsp; ResultPage DTO which holds both the results and count of total results:</p>
<pre title="code" class="brush: java;">
@XmlRootElement
public class ResultPage&lt;T&gt; {

	private List&lt;T&gt; results = new LinkedList&lt;T&gt;();

	private long count;

	public ResultPage() {
	}

	public ResultPage(List&lt;T&gt; results, long count) {
		this.results = results;
		this.count = count;
	}

	@XmlElement
	public List&lt;T&gt; getResults() {
		return results;
	}

	public void setResults(List&lt;T&gt; results) {
		this.results = results;
	}

	@XmlElement
	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return &quot;ResultPage [results=&quot; + results + &quot;, count=&quot; + count + &quot;]&quot;;
	}
}</pre>
<p>The&nbsp; DynamicModelDao just need to extend the GenericDAO interface and mark String as its generic type to be persisted:</p>
<pre title="code" class="brush: java;">
public interface DynamicModelDao extends GenericDao&lt;String, Serializable&gt;{
}</pre>
<p>&nbsp;</p>
<p>Now, lets implement the&nbsp; DynamicModelDao interlace with MongoCollectionDao which uses String as the type parameter to be persisted and fetched from the DB.</p>
<pre title="code" class="brush: java;">
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.PostConstruct;

import &quot;com.mycompany.myproduct.persistence.face.DynamicModelDao;
import &quot;com.mycompany.myproduct.persistence.face.pagination.ResultPage;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;
public  class MongoCollectionDao implements DynamicModelDao {
	private DB db;
	private String collectionName;
	private DBCollection dbCollection;

	public void setDb(DB db) {
		this.db = db;
	}

	public void setCollectionName(String collectionName) {
		this.collectionName = collectionName;
	}
	
	@PostConstruct
	public void init(){
		dbCollection = db.getCollection(collectionName);
	}

	@Override
	public void create(String entity) {
		DBObject dbObject = getDbObject(entity);
		dbCollection.insert(dbObject);
	}

	private DBObject getDbObject(String entity) {
		DBObject dbObject = (DBObject) JSON.parse(entity);
		return dbObject;
	}
	
	@Override
	public void create(String entity,Serializable id) {
		DBObject dbObject = getDbObject(entity);
		dbObject.put(&quot;_id&quot;, id);
		dbCollection.insert(dbObject);
	}
	
	@Override
	public void update(String entity) {
		DBObject dbObject = getDbObject(entity);
		dbCollection.save(dbObject);
	}

	@Override
	public String findById(Serializable id) {
		DBObject dbObject= dbCollection.findOne(id);
		return JSON.serialize(dbObject);
	}

	@Override
	public void delete(String entity) {
		DBObject dbObject = getDbObject(entity);
		dbCollection.remove(dbObject);
	}

	public ResultPage findByFilter(String q,String orders, int pageNumber,int pageSize) {
		List&lt;String&gt; results = new LinkedList&lt;String&gt;();
		long count;
		DBCursor cursor;
		if(q==null){
			count = dbCollection.count();
			cursor = dbCollection.find();
		}
		else{
			DBObject queryDBObject = getDbObject(q);
			count = dbCollection.count(queryDBObject);
			cursor = dbCollection.find(queryDBObject);		
		}
		if(orders != null)
			cursor.sort(getDbObject(orders));
		cursor.skip(pageSize*(pageNumber-1));
		cursor.limit(pageSize);
		while(cursor.hasNext())
            results.add(cursor.next().toString());
        return new ResultPage(results,count);
	}


}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>If you look at the code above you can see that the main interface to access MongoDB is the DB class. The DBCollection represent the collection of the document being accessed by the DAO. In order to create the DB class, we need to define a Spring FactoryBean and inject it into our DAO:</p>
<pre title="code" class="brush: xhtml;">
	&lt;bean id=&quot;mongo&quot; class=&quot;com.mongodb.Mongo&quot;&gt;
		&lt;constructor-arg value=&quot;localhost&quot; /&gt;
		&lt;constructor-arg value=&quot;27017&quot; /&gt;
	&lt;/bean&gt;
	
	&lt;bean id=&quot;db&quot; class=&quot;com.mycompany.myproduct.mongodb.infra.DbFactoryBean&quot;&gt;
		&lt;property name=&quot;mongo&quot; ref=&quot;mongo&quot; /&gt;
		&lt;property name=&quot;name&quot; value=&quot;my-db-name&quot; /&gt;
	&lt;/bean&gt;
	
	
	&lt;bean id=&quot;dynamicModelDao&quot; class=&quot;com.mycompany.myproduct.persistence.mongodb.MongoCollectionDao&quot;&gt;
		&lt;property name=&quot;db&quot; ref=&quot;db&quot; /&gt;
		&lt;property name=&quot;collectionName&quot; value=&quot;myCollectionName&quot; /&gt;
	&lt;/bean&gt;</pre>
<p>&nbsp;</p>
<p>Now all we are left is create our Service layer interface and implementations. Then we need to externalize it with REST using JAXRS:</p>
<pre title="code" class="brush: java;">
@Path(&quot;/dyanmic-entities&quot;)
public interface DynamicEntityService {

	@PUT
	@Path(&quot;/{id}&quot;)
	@Consumes(MediaType.APPLICATION_JSON)
	void createEntity(@PathParam(&quot;id&quot;)String id,String data);

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	void createEntity(String data);

	@POST
	@Path(&quot;/{id}&quot;)
	@Consumes(MediaType.APPLICATION_JSON)
	void updateEntity(@PathParam(&quot;id&quot;)String id,String data);
	
	@DELETE
	@Path(&quot;/{id}&quot;)
	@Consumes(MediaType.APPLICATION_JSON)
	void removeEntity(@PathParam(&quot;id&quot;)String id);
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path(&quot;/{id}&quot;)
	String findEntityById(@PathParam(&quot;id&quot;)String id);
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
 	ResultPage&lt;String&gt; findEntitysByFilter(	@QueryParam(&quot;q&quot;) String q, 
 											@QueryParam(&quot;orders&quot;) String orders, 
 											@QueryParam(&quot;pageNumber&quot;) @DefaultValue(&quot;1&quot;) int pageNumber,
 											@QueryParam(&quot;pageSize&quot;) @DefaultValue(&quot;10&quot;)int pageSize);

}</pre>
<p>And now, to the implementation, which currently delegates the work to the DAO, but in the future will probably have some more logic:</p>
<pre title="code" class="brush: java;">
public class DymaicEntityServiceImpl implements DymanicEntityService {
	private DynamicModelDao dynamicModelDao;

	public void setDynamicModelDao(DynamicModelDao dynamicModelDao) {
		this.dynamicModelDao = dynamicModelDao;
	}

	@Override
	public void createEntity(String data) {
		String id = UUID.randomUUID().toString();
		dynamicModelDao.create(data, id);
	}

	@Override
	public void createEntity(String id, String data) {
		dynamicModelDao.create(data, id);
	}

	@Override
	public void updateEntity(String id, String data) {
		dynamicModelDao.update(data);
	}

	@Override
	public void removeEntity(String id) {
		dynamicModelDao.delete(id);
	}

	@Override
	public String findEntityById(String id) {
		return dynamicModelDao.findById(id);
	}

	@Override
	public ResultPage findEntitysByFilter(String q, String orders,
			int pageNumber, int pageSize) {
		return dynamicModelDao.findByFilter(q, orders, pageNumber, pageSize);
	}

}</pre>
<p>&nbsp;</p>
<h1>Testing the New Product</h1>
<p>That's all - after deploy this application in any web server, you can test a a running service. For example to persist a new dynamic entity instance we can use the &ldquo;POST&rdquo; a user data:<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
echo '{&quot;name&quot;:&quot;Scott&quot;, age :38}' | curl -X POST -H 'Content-type: application/json; charset=UTF-8' -d @- http://localhost/dyanmic-entities</pre>
<p><br />
and we can query first page of users with name &ldquo;Scott&rdquo;<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
http://localhost/dyanmic-entities?q=%7B%22name%22%3A%22Scott%22%7D</pre>
<p><br />
or we can load second page (each page 5 users) of users ordered by id:<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
http://localhost/dyanmic-entities?orders=%7B%22_id%22%3A%221%22%7D&amp;pageSize=5&amp;pageNumber=2</pre>
<p>&nbsp;</p>
