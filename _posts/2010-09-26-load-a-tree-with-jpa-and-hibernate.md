---
layout: post
title: Load a tree with JPA and Hibernate
created: 1285497315
author: yanai
permalink: /java/load-tree-jpa-and-hibernate
tags:
- JAVA
- Tree JPA Hibernate
---
<p>Every now and again I go to a Tikal customer, who needs to model hierarchical data structure for his domain model. The hierarchy can be a department hierarchy, a category hierarchy , a geographic hierarchy, or any other hierarchy you can think of, that might be needed by the customer. Usually this hierarchy is modeled by a <a href="http://en.wikipedia.org/wiki/Tree_%28data_structure%29">Tree Data Structure</a>. <br />
There are a few implementation variants for the tree data-structure in Java. Lets have a look at a very basic implementation using a class named &ldquo;Node&rdquo;. The &ldquo;Node&rdquo; class can be easily mapped to a table named &ldquo;tree&rdquo; in the DB. This table contains all nodes objects in the tree. The table will have a foreign key from each node record to its parent node's id (the primary key in the table) using a field called &ldquo;parent_id&rdquo;. The &ldquo;Node&quot; entity has a property called &ldquo;children&rdquo; - a <a href="http://en.wikibooks.org/wiki/Java_Persistence/Relationships#Order_Column_.28JPA_2.0.29">persistent ordered list</a> (assuming there is meaning for the children order) of child Nodes, a new feature in JPA 2. We map the join column &ldquo;parent_id&rdquo; for the children association. Here is sample of the &ldquo;Node&rdquo; entity Java class: <br />
&nbsp;</p>
<pre class="brush: java;" title="code">

</pre>
<pre class="brush: java;" title="code">
@Entity 
@Table(name = &quot;tree&quot;) 
public class Node { 

	@Id 
	@GeneratedValue 
	private Integer id; 

	@NotNull 
	private String name; 

	@OneToMany 
	@JoinColumn(name = &quot;parent_id&quot;) 
	@OrderColumn
	private List&lt;Node&gt; children = new LinkedList&lt;Node&gt;(); 

	... 
} </pre>
<h1>&nbsp;</h1>
<h1>The Problem</h1>
<p>What is the best way to load the tree per end-use request? <br />
<br />
Lets assume for our discussion, the tree is not huge, less than a few hundreds of nodes, and you really need to load it all (this is also a valuable question). A naive approach, is to load the tree's root node, and then traverse its descendants. <br />
The problem with this attitude, it will create N queries on a tree with N nodes -&nbsp; For each and every node in the tree, Hibernate will issue an SQL that fetches the node children. <br />
<br />
So is there a better way to load the whole tree, and avoid these N queries ?</p>
<p>&nbsp;</p>
<h1>The Solution</h1>
<p>Luckily, there is a better way...<br />
We can take advantage of the JPA's persistence context (part of the JPA spec). When we issue a query that loads all nodes with their children, all nodes are loaded into the JPA persistence context. Actually, the same node can be loaded either as a parent, a child or both. However, the JPA spec requires that the same entity instance will exist only once in the same persistence context, Thus both references will point to the same instance. The result is that we get the whole hierarchy interrelated. Last thing we need to do, is loading the root category, which will be loaded from the persistence context rather than the DB since it was loaded with all nodes in the query. <br />
<br />
So our data access method to load the whole tree remains simple. Lets have a look on it:</p>
<pre class="brush: java;" title="code">
public Node getTree(){ 
  entityManager.createNamedQuery
    (&quot;findAllNodesWithTheirChildren&quot;).getResultList(); 
   Node root = entityManager.find(Node.class, ROOT_ID); 
   return root;
} </pre>
<p>&nbsp;</p>
<p>Here is the explanation for the code above: <br />
The injected entityManager is been used with JPA in our DAO class. The ROOT_ID is a constant that holds the id for the root category in an application cache. We can see that our method contains only two lines to get the whole tree.<br />
The first line uses a named query called&nbsp; &ldquo;findAllNodesWithTheirChildren&rdquo;. This query loads all nodes from the DB with left join fetch of their children. <br />
Here is the named query implementation for our needs: <br />
select n from Node n left join fetch n.children <br />
<br />
Please note we are not making explicit use of the result list in our method above. The usage is done implicitly, since all nodes are automatically loaded into the persistence context.<br />
<br />
The second line just loads the root node. Since the root node has already been entered the persistence context (due to the first line), there will be no extra select for the root. <br />
&nbsp;</p>
<h1>Working With Bidirectional Tree</h1>
<p>Another use case is when we have the tree built from nodes with parent-child bi-directional association. In this case, we have both association from parent node to its children, and we also have a reverse association from the child to the parent. Since we have a bi-directional association with index column (to preserve the order of the children in the list), we can either map the index column. Another option is to make the OneToMany-side the owning side by removing the &quot;mappedBy&quot; element and setting the @JoinColumn on the ManyToOne-side as &quot;insertable=false&quot; and &quot;updateable=false&quot;.</p>
<p>I chose to do the second option. Here is the code with the added association named &ldquo;parent&rdquo;:</p>
<pre class="brush: java;" title="code">
@Entity
@Table(name = &quot;tree&quot;)
public class Node {

	@Id
	@GeneratedValue
	private Integer id;

	@NotNull
	private String name;

	@OneToMany
	@OrderColumn
	@JoinColumn(name = &quot;parent_id&quot;)
	private List&lt;Node&gt; children = new LinkedList&lt;Node&gt;();
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = &quot;parent_id&quot;,insertable=false,updatable=false)
	private Node parent;

	&hellip;
}</pre>
<p>&nbsp;</p>
<p>Assuming we want to use the same trick of loading all nodes, Should we change our query, by adding a fetch join for &ldquo;parent&rdquo; association ? The answer is &hellip; NO!.<br />
The reason we should NOT apply fetch query on the parent (even-though its declared as lazy) is because &ldquo;parent&rdquo; association is been initialized automatically without extra selects - All nodes are loaded in the query and , when they are loaded the children nodes &ldquo;parent&rdquo; association are been initialized. For this reason the query should be remained as is with fetch join to the children only.</p>
<p>&nbsp;</p>
<h1>Summary</h1>
<p>We are done now &ndash; We ended with only one select that loads the whole tree (all N nodes are been loaded) instead of N selects. This is true with either unidirectional or bidirectional tree, and when we changed our mapping to be bidirectional, we didn't change the query that loads the tree.<br />
Obviously the second option of loading all the nodes with query runs in order of magnitude faster. <br />
Of course, if the tree is read mostly, its also&nbsp; strongly recommended to use the 2nd level cache, and we can spare the single select to the DB per each end user request.</p>
