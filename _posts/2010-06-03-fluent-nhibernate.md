---
layout: post
title: Fluent NHibernate
created: 1275567157
permalink: fluent-nhibernate
tags:
- .NET
- ORM
- NHibernate
- .Net Open Source
---
<p>NHibernate is popular in Open-source community, fully featured, mature ORM but the way to config mappings in XML files (.hbm.xml files) is not comfort.</p>
<p>I would prefer to write mappings in strongly typed C# code and enjoy from easy refactoring, improved readability and more concise code.</p>
<p>&nbsp;</p>
<p>Fluent NHibernate resolves this issue and provides alternative to NHibernate's standard XML mapping files - fluent, XML-less, compile safe.</p>
<p>&nbsp;</p>
<p>Samples of mappings:</p>
<pre title="code" class="brush: csharp;">
public class CustomerMap : ClassMap&lt;Customer&gt;
{
    public CustomerMap()
    {
        WithTable(&quot;Customers&quot;);
 
        Id(x =&gt; x.Id, &quot;CustomerId&quot;);
        Map(x =&gt; x.Firstname);
        Map(x =&gt; x.Lastname);
        Map(x =&gt; x.Email, &quot;EmailAddress&quot;);
    }
}
 
Fluently.Configure()
  .Database(MsSqlConfiguration.MsSql2005
    .ConnectionString(c =&gt; c
      .FromAppSetting(&quot;connectionString&quot;))
    .Cache(c =&gt; c
      .UseQueryCache()
      .ProviderClass&lt;HashtableCacheProvider&gt;())
    .ShowSql())
  .Mappings(m =&gt; m
    .FluentMappings.AddFromAssemblyOf&lt;Customer&gt;())
  .BuildSessionFactory();</pre>
<p>&nbsp;</p>
<p>Fluent NHibernate also has several other tools, including:</p>
<p>&middot; Auto mappings - where mappings are inferred from the design of your entities</p>
<p>&middot; Persistence specification testing - round-trip testing for your entities, without ever having to write a line of CRUD</p>
<p>&middot; Full application configuration with Fluent configuration API</p>
<p>&middot; Database configuration - fluently configure your database in code</p>
<p>&nbsp;</p>
<p>Project official site</p>
<p>http://fluentnhibernate.org/</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
