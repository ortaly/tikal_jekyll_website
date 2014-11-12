---
layout: post
title: Using jQuery tree for database data
created: 1338394544
author: avit
permalink: /using-jquery-tree-database-data
tags:
- Ruby
- web
---
<p>Hi,</p>

<p>This blog post is actually to answer a really nice guy from a forum (.Net) I run in Hebrew, but I thought it will be really nice to write about it in general.</p>

<p>I get lots of questions regarding the concept of using <a href='http://www.kensodev.com/category/jquery/' target='_blank' title='jQuery'>jQuery</a> (in general) with .net and database data.</p>

<p>I actually blame Microsoft for having the tutorials in their website teaching only SqlDataSource, which I never used and recommend that you don’t use too.</p>

<p>So, the majority of the questions I get are not at all about code. They are all about <a href='http://www.kensodev.com/category/concept/' target='_blank' title='Concept'>concept</a>: How to communicate with data, How to retrieve data and more.</p>

<p>Ok, so this tutorial is all about jQuery, LINQ to Sql, and the jQuery tree. The only difference is that I’m not going to display files in folders, but pages from a Sql table, every page has a “ParentID” fields, so it will be very easy to understand. This tutorial is also to clarify you can use the tree for any relational database or file data.</p>

<p>So, Let’s Start!</p>

<p>First, let’s go and download the 2 packages. <a href='http://www.jquery.com' target='_blank'>jQuery</a> <a href='http://abeautifulsite.net/notebook/58' target='_blank'>jQuery File Tree</a></p>

<p>After downloading the 2 packages, we’ll open up a new website in Visual Studio. Our files should look like this: <a href='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1726.png'><img alt='2009-05-22_1726' border='0' height='244' src='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1726-thumb.png' style='display: inline; border-width: 0px;' title='2009-05-22_1726' width='105' /></a></p>
<strong>What do we have here?
</strong>
<p>Well, we have all the <a href='http://www.kensodev.com/tag/css'>css</a> from the jQuery file tree library, we have the Images also from this library, we have the js files from: jQuery, jQuery file tree and another js file which we created for our custom functions.</p>

<p>Alright, now let’s create our page:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1728.png'><img alt='2009-05-22_1728' border='0' height='157' src='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1728-thumb.png' style='display: inline; border-width: 0px;' title='2009-05-22_1728' width='244' /></a>
<p>We have all the script file and css files in our page. Also, we wrote a div called “myFirstTree” in our page, this div will hold our tree.</p>
<strong>What else do we need?</strong>
<p>Well, like I said, we are displaying database data here, so let’s create a very simple database with one table, also we will create a LINQ mapping file for it. B.T.W, you can use any kind of data access, you can use nHibernate, or whatever you may find comfortable for your use. I use linq for this example, don’t ask why, just felt like it :-)</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1734.png'><img alt='2009-05-22_1734' border='0' height='228' src='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1734-thumb.png' style='display: inline; border-width: 0px;' title='2009-05-22_1734' width='244' /></a>
<p>So, we have these fields: pageID – Identity field pageName pageParentID</p>

<p>Let’s create our data, just randomly fill our table with some data, and then we can go back and retrieve it from the client side using some jQuery.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1738.png'><img alt='2009-05-22_1738' border='0' height='229' src='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1738-thumb.png' style='display: inline; border-width: 0px;' title='2009-05-22_1738' width='244' /></a>
<p>So, we have our data. I don’t think i need to further explain this no? :-)</p>

<p>Now, let’s write some js code to retrieve the data from the server for us.</p>

<p>Our js code should look like this:</p>

<p><span>javascript</span> $(document).ready(function() { $(‘#myFirstTree’).fileTree({ root: ‘0’, script: ‘jQueryTreeHandler.ashx’, multiFolder: true, loadMessage: ‘Tree loading…’ }, function(file) { alert(file); }); }); <span>/javascript</span></p>
<strong>Let’s explain this code a bit shall we?</strong>
<p>First, we chose our pre crated div “myFirstTree”. Then we initialized the fileTree object with these parameters:</p>
<strong>root</strong><strong>script</strong><strong>multiFolder</strong><strong>loadingMessage</strong><strong>fileFunction</strong>
<p>All pretty straight forward up until now, let’s go on and create our handler:</p>

<p>The parameter we know is passed in is called “dir”, so that is what we will use here.</p>

<p>So, this is what your handler code should look like:</p>

<p><span>csharp</span> <%@ WebHandler Language="C#" Class="jQueryTreeHandler" %> using System; using System.Web; using System.Linq;</p>

<p>public class jQueryTreeHandler : IHttpHandler {</p>

<pre><code>public void ProcessRequest (HttpContext context) {
    context.Response.ContentType = &quot;text/plain&quot;;
    int parentID = Convert.ToInt32(context.Request.Form[&quot;dir&quot;]);

    string list = &quot;&quot;;
    jQueryTreeDataContext db = new jQueryTreeDataContext();
    var pages = from p in db.Pages
                where p.pageParentID == parentID
                select p;

    foreach (Page item in pages)
    {
        list += String.Format(&quot;&lt;li class=\&quot;directory collapsed\&quot;&gt;&lt;a href=\&quot;#\&quot; rel=\&quot;{0}\&quot;&gt;{1}&lt;/a&gt;&lt;/li&gt;&quot;, item.pageID.ToString(), item.pageName);
    }

    context.Response.Write(String.Format(&quot;&lt;ul class=\&quot;jqueryFileTree\&quot; style=\&quot;display: none;\&quot;&gt;{0}&lt;/ul&gt;&quot;, list));
}

public bool IsReusable {
    get {
        return false;
    }
}</code></pre>

<p>} <span>/csharp</span></p>

<p>Comment: I didn’t take care of a situation where a row has no children, it wasn’t necessary for my example. However, in real life code you should, and if a row does not have any children, you shouldn’t display a folder, but a file instead.</p>

<p>And this is how our code looks like in the final result (Html output):</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1840.png'><img alt='2009-05-22_1840' border='0' height='173' src='http://www.kensodev.com/wp-content/uploads/2009/05/20090522-1840-thumb.png' style='display: inline; border-width: 0px;' title='2009-05-22_1840' width='244' /></a>
<p>Comment: I had to tweak the jQuery file tree code in order for it to work with database data. Normally it has a regullar expression validating the “rel” attribute actually contains data with ”/”, that needed to be changes.</p>

<p>I uploaded the file to here for you, so download away… <span>download id=”2”</span></p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/R3tvYEDlnCQ" height="1" width="1"/>
