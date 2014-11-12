---
layout: post
title: Entity Framework 5 and Enum support
created: 1343140694
author: amiram
permalink: /net/entity-framework-5-and-enum-support
tags:
- .NET
---
<p>Starting from EF 5 (currently RC, available as a NuGet package), you can use enums in your data model. In older versions, you always needed to use casting if you wanted to compare a property value against an enum value.</p>
<p><strong>Note: </strong>This post is using the <a href="http://msdn.microsoft.com/en-us/data/jj206878" target="_blank">Database First</a> workflow. Have a look also on my posts about <a href="http://linqto.net/blog/2012/10/entity-framework-code-first-and-enum-support/" target="_blank">Code First</a> and <a href="http://linqto.net/blog/2012/10/entity-framework-5-and-enum-support-part-2/" target="_blank">Code First with existing database</a>.</p>
<p>In the following code, Student.StatusID is an FK column with a constraint to the StatusID column in the StudentStatusType lookup table that has another column StatusName (nvarchar).</p><pre class="crayon-plain-tag">from s in db.Students
where s.StatusID == (int)StudentStatusEnum.Graduate
select s;</pre><p>For the above query to work right, you had to hold an enum with values that follow the values in the StudentStatusType table, which was a little risky if for some reason you had to change your data in the StudentStatus table.</p>
<p>With EF 5, you can set a property to be of type enum. To do that, right click on the property in the model designer, and select “Convert to Enum”. After establishing your enum, you have to set both sides of the relation to be of type enum, since like in sql, both sides of a relation must be of the same type.</p>
<p>Now with this enum support you can write:</p><pre class="crayon-plain-tag">from s in db.Students
where s.StatusID == StudentStatusEnum.Graduate
select s;</pre><p>Although your code will look nicer, this feature lacks the ability to generate the enum from the lookup table, so you still need to copy the lookup table to your code.</p>
<p>Fortunately, EF code generation can be customized with <a href="http://msdn.microsoft.com/en-us/data/gg558520.aspx" target="_blank">T4 templates</a>, and you can start with a template from <a href="http://visualstudiogallery.msdn.microsoft.com/site/search?query=ef%205.x&f%5B0%5D.Value=ef%205.x&f%5B0%5D.Type=SearchText&f%5B1%5D.Value=11.0&f%5B1%5D.Type=VisualStudioVersion&f%5B1%5D.Text=Visual%20Studio%202012%20RC&f%5B2%5D.Value=templates&f%5B2%5D.Type=RootCategory&f%5B2%5D.Text=Templates&ac=8" target="_blank">Visual Studio Gallery</a>. The template that can be used to generate code exactly like the Visual Studio does is <a href="http://social.msdn.microsoft.com/Forums/en-US/adodotnetentityframework/thread/4993d0bf-94e8-4d14-aff1-3458b4ad467f/" target="_blank">still not available for EF 5</a>, but you can use the <a href="http://visualstudiogallery.msdn.microsoft.com/da740968-02f9-42a9-9ee4-1a9a06d896a2?SRC=Featured" target="_blank">DbContext generator</a> meanwhile.</p>
<p>The idea is to create the enum as above in the edmx designer, but to query the database in the T4 template.</p>
<p>The original code to generate enums in the template is:</p><pre class="crayon-plain-tag"><#=Accessibility.ForType(enumType)#> enum <#=code.Escape(enumType)#> : <#=code.Escape(enumType.UnderlyingType.ClrEquivalentType, fullyQualifySystemTypes: false)#>
{
<#
    foreach (EnumMember member in enumType.Members)
    {
#>
       <#=code.Escape(member)#> = <#=member.Value#>,
<#
    }

...</pre><p>I replaced the foreach loop with:</p><pre class="crayon-plain-tag">IServiceProvider hostServiceProvider = (IServiceProvider)this.Host;
SettingsManager config = new SettingsManager(hostServiceProvider);

EntityContainer container = ItemCollection.GetItems().FirstOrDefault();
var connectionString = config.ConnectionStrings[container.Name].ConnectionString;

if (connectionString.Contains("|DataDirectory|"))
{
    DTE dte = (DTE)hostServiceProvider.GetService(typeof(DTE));
    Project project = dte.Solution.FindProjectItem(Host.TemplateFile).ContainingProject;
    connectionString = connectionString.Replace("|DataDirectory|", System.IO.Path.GetDirectoryName(project.FileName)+ "\App_Data");
}

var builder = new System.Data.Common.DbConnectionStringBuilder();
builder.ConnectionString = connectionString;
connectionString = builder["provider connection string"].ToString();

var primaryKeyProperty = code.GetItemsToGenerate(ItemCollection).SelectMany(e => e.KeyMembers).FirstOrDefault(km => km.TypeUsage.EdmType == enumType);
var tableName = primaryKeyProperty.DeclaringType.Name;

using (var con = new SqlConnection(connectionString))
{
    var cmd = new SqlCommand("Select * From " + tableName, con);
    con.Open();
    using (var reader = cmd.ExecuteReader())
    {
        while (reader.Read())
        {
#>
    <#=reader[1]#> = <#=reader[0]#>,
<#
        }
    }
}</pre><p>Explanation:</p>
<p>First we need to find the project config file and load it. This is not so simple since the T4 template code is not running in the context of your project and regular config code won’t work here. For this I used the SettingsManager class available <a href="http://gcapnias.wordpress.com/2009/01/17/t4-templates-using-own-project-config-file/">here</a>. Note: Although this code works you can’t debug it in Visual Studio 2012 because it fails iterating ProjectItems collection.</p><pre class="crayon-plain-tag">IServiceProvider hostServiceProvider = (IServiceProvider)this.Host;
SettingsManager config = new SettingsManager(hostServiceProvider);</pre><p>Now you need to get the connection string. The connection string key can be found with the container name. The container is initialized in the template used to generate the DbContext code and you can copy it from there.</p><pre class="crayon-plain-tag">EntityContainer container = ItemCollection.GetItems().FirstOrDefault();
var connectionString = config.ConnectionStrings[container.Name].ConnectionString;</pre><p>In case your database is in your app_data folder, you need to resolve the “|DataDirectory|” macro by yourself since this macro will lead you inside Visual Studio installation folders.</p><pre class="crayon-plain-tag">if (connectionString.Contains("|DataDirectory|"))
{
    DTE dte = (DTE)hostServiceProvider.GetService(typeof(DTE));
    Project project = dte.Solution.FindProjectItem(Host.TemplateFile).ContainingProject;
    connectionString = connectionString.Replace("|DataDirectory|", System.IO.Path.GetDirectoryName(project.FileName)+ "\App_Data");
}</pre><p>Now before using the connection string, you need to extract just the connection string itself without the metadata info since SqlConnection doesn’t like it.</p><pre class="crayon-plain-tag">var builder = new System.Data.Common.DbConnectionStringBuilder();
builder.ConnectionString = connectionString;
connectionString = builder["provider connection string"].ToString();</pre><p>Now that we got the connection string, we are ready to “select * from”, but we still need to know the table name. So we need to find the entity type that represents the lookup table. Because we set earlier its primary key to be of the enum type, it’s very easy:</p><pre class="crayon-plain-tag">var primaryKeyProperty = code.GetItemsToGenerate(ItemCollection).SelectMany(e => e.KeyMembers).FirstOrDefault(km => km.TypeUsage.EdmType == enumType);
var tableName = primaryKeyProperty.DeclaringType.Name;</pre><p>The entity type name won’t always be identical to the table name. <a href="http://stackoverflow.com/a/1895702/1495902" target="_blank">There is no built-in way to get that</a>, but there is a <a href="http://www.codeproject.com/Articles/350135/Entity-Framework-Get-mapped-table-name-from-an-ent" target="_blank">tricky way</a>. I just assumed that the entity name is the table name. If you want you can use the trick.</p>
<p>It’s time to get the data!!!</p><pre class="crayon-plain-tag">using (var con = new SqlConnection(connectionString))
{
    var cmd = new SqlCommand("Select * From " + tableName, con);
    con.Open();
    using (var reader = cmd.ExecuteReader())
    {
       while (reader.Read())
       {
#>
           <#=reader[1]#> = <#=reader[0]#>,
<#
       }
    }
}</pre><p>I assumed the first column is the primary key and the second is the name, and I didn’t deal with whitespaces and capitalization. You can improve that code like in <a href="http://erraticdev.blogspot.co.il/2011/01/generate-enum-of-database-lookup-table.html" target="_blank">here</a>.</p>
<p>Well this was quite an ugly code. I hope MS will add a capability to set the lookup table name when you create the enum type.</p>
