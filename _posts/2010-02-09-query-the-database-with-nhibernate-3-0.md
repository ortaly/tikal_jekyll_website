---
layout: post
title: Query the database with NHibernate 3.0
created: 1265729085
author: igorz
permalink: /net/query-database-nhibernate-30
tags:
- .NET
- NHibernate
- .Net Open Source
---
<p><b>Introduction</b><br/>
NHibernate gives you many alternative APIs for querying database. There is <a href="https://www.hibernate.org/hib_docs/nhibernate/html/queryhql.html">HQL</a>, which is similar to SQL, <a href="http://ayende.com/Blog/archive/2009/07/26/nhibernate-linq-1.0-released.aspx">Linq to NHibernate</a> and finally <a href="https://www.hibernate.org/hib_docs/nhibernate/html/querycriteria.html">ICriteria</a>.
And once you start to use NHibernate in your project, you have to decide which API to use. Since NH 3.0 you have one more option. It is <a href="http://nhforge.org/blogs/nhibernate/archive/2009/12/17/queryover-in-nh-3-0.aspx?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+NHibernateBlog+%28NHibernate+blog%29">QueryOver API</a>.<br/>
In this post I want to compare a usage of different APIs for a simple query.<br/>
For this sample I created a console application with embedded database. Full source code is available at <a href="http://code.google.com/p/izlabs/source/checkout">google code</a>.<br/>
In my sample I have a database with one table Emploee (Id, Name, Age, Salary) and I want to calculate average salary of employees who's between 25 to 30 years old.<br/>
Lets start!</p>
<p><b>HQL</b><br/>
Since I was not familiar with NH (but had an experience with SQL), I found HQL is easiest way to get started with.<br/>
There is query:<br/>
{syntaxhighlighter brush: xml}
var salary = session.CreateQuery(@"
  select avg(employee.Salary)
  from Employee employee
  where employee.Age >= 25 and employee.Age <=30")
  .UniqueResult<double>();{/syntaxhighlighter}
<br/>
Looks good, readable but not strongly typed. <br/>
Go next one.<br/>
<br/>
<p><b>ICriteria</b><br/>
The ICriteria API is NHibernate's implementation of <a href="http://martinfowler.com/eaaCatalog/queryObject.html">Query Object</a>.
{syntaxhighlighter brush: xml}var salary = session.CreateCriteria(typeof(Employee))
                    .Add(Restrictions.Between("Age", 25, 30))
                    .SetProjection(Projections.Avg("Salary"))
                    .UniqueResult<double>();{/syntaxhighlighter}
Much better, but still has some "magic strings". I am looking for strongly typed code where refactoring tools like 'Find All References', and 'Refactor->Rename' will work perfectly.
<br/></p>
<p>
<b>Linq</b><br/>
NHibernate 3.0 has a built-in Linq provider.<br/>
{syntaxhighlighter brush: xml}
var query = from employee in session.Query<Employee>()
                            where employee.Age >= 25 && employee.Age <= 30
                            select employee.Salary;
                            var salary = query.Average();{/syntaxhighlighter}
Pretty good! Strongly typed, readable.<br/>
But it uses the fact that Enumerable has Average in this case. Would we need a more complicated projection, it would be not available in LINQ. Also, LINQ syntax is still confusing for some people. It just looks different than surrounding C# code.<br/>
Keeping looking for a perfect.<br/>
</p>
<br/>
<p><b>QueryOver</b><br/>
QueryOver combines the use of Extension Methods and Lambda Expressions to provide a statically typesafe wrapper round the ICriteria API. <br/>
{syntaxhighlighter brush: xml}
               var salary = session.QueryOver<Employee>()
                    .WhereRestrictionOn(e => e.Age).IsBetween(25).And(30)
                    .Select(e1 => e1.SelectAvg(e2 => e2.Salary))
                    .List<double>()
                    .Single();{/syntaxhighlighter}
Perfect!<br/>
In my opinion this one is the best.</p>
