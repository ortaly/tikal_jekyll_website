---
layout: post
title: Entity Framework 5 and Enum support – Part 2
created: 1351028221
author: amiram
permalink: /net/entity-framework-5-and-enum-support-–-part-2
tags:
- .NET
---
<p>In my <a href="http://linqto.net/blog/2012/10/entity-framework-code-first-and-enum-support/" target="_blank">previous post</a>, I showed how to populate an enum to a lookup table using <strong>EF Code First</strong> and a new database. Although you might think that having a database prior to coding force you to go to the <strong>Database First</strong> workflow, you’d be happy to know you can still use the Code First workflow with the help of <a href="http://visualstudiogallery.msdn.microsoft.com/72a60b14-1581-4b9b-89f2-846072eff19d" target="_blank">EF Power Tools</a> to <a href="http://msdn.microsoft.com/en-us/data/jj200620" target="_blank">reverse engineer your database</a> to a Code First starting point.</p>
<p>The database schema for this post is:</p>
<p>Lookup table:</p><pre class="crayon-plain-tag">CREATE TABLE [dbo].[StudentStatusType] (
	[ID] INT NOT NULL,
	[StatusName] NVARCHAR (MAX) NULL
);</pre><p>Students table:</p><pre class="crayon-plain-tag">CREATE TABLE [dbo].[Students] (
	[ID] INT IDENTITY (1, 1) NOT NULL,
	[StatusTypeID] INT NOT NULL
);</pre><p>In addition to this, StudentStatusType.ID is the PK for the FK column Students.StatusTypeID.</p>
<p>The steps to reverse engineer a database are:</p>
<ol>
<li>Install <a href="http://visualstudiogallery.msdn.microsoft.com/72a60b14-1581-4b9b-89f2-846072eff19d" target="_blank">EF Power Tools</a> extension.</li>
<li>Create a project (Console, web etc.).</li>
<li>Add <strong>Entity Framework</strong> NuGet package.</li>
<li>Right click on the project. In the context menu click on <strong>Entity Framework -> Reverse Engineer Code First</strong>.</li>
<li>In the connection dialog enter your server and database name and click <strong>OK</strong>.</li>
</ol>
<p>In your project you have now some more files in the <strong>Models</strong> folder.</p>
<p><strong>Student.cs</strong>:</p><pre class="crayon-plain-tag">public class Student
{
	public int ID { get; set; }
	public int StatusTypeID { get; set; }
	public virtual StudentStatusType StudentStatusType { get; set; }
}</pre><p><strong>StudentStatusType.cs</strong>:</p><pre class="crayon-plain-tag">public class StudentStatusType
{
	public StudentStatusType()
	{
		this.Students = new List();
	}

	public int ID { get; set; }
	public string StatusName { get; set; }
	public virtual ICollection Students { get; set; }
}</pre><p>In your <strong>[dbname]Context.cs</strong> you have a standard <strong>DbContext</strong> class with DbSet for <strong>Student</strong> and <strong>StudentStatusType</strong>. In addition you’ll see a folder named <strong>Mapping</strong> with mapping details using the <a href="http://msdn.microsoft.com/en-us/data/jj591617" target="_blank">FluentAPI</a>.</p>
<p>In an earlier post I showed <a href="http://linqto.net/blog/2012/07/entity-framework-5-and-enum-support/" target="_blank">how to generate an enum from a lookup table in the Database First workflow</a>. Although we’re using the Code First workflow, we can use a similar method since the database was created first.</p>
<p>The things we need to change are:</p>
<ul>
<li>Create an enum in addition to the the StudentStatusType class named <strong>StudentStatusTypeEnum</strong> and populate it with the data in the StudentStatusType table.</li>
<li>The PK StudentStatusType.ID should be of type StudentStatusTypeEnum instead of int.</li>
<li>The FK Student.StatusTypeID should be of type StudentStatusTypeEnum instead of int.</li>
</ul>
<p>In order to change the reverse engineer process, right click again on the project but this time click on <strong>Entity Framework -> Customize Reverse Engineer Templates</strong> (No icon for you buddy, it is still beta).</p>
<p>In the project there are now three more T4 files in <strong>CodeTemplates\ReverseEngineerCodeFirst</strong> folder:</p>
<ul>
<li><strong>Context.tt</strong> – generates the class that inherits DbContext</li>
<li><strong>Entity.tt</strong> – generates the entities Student and StudentStatusType</li>
<li><strong>Mapping.tt</strong> – generates the FluentAPI mapping classes</li>
</ul>
<div>I advise you to install the <a href="http://t4-editor.tangible-engineering.com/Download_T4Editor_Plus_ModelingTools.html" target="_blank">Tangible T4 Editor</a>. It has a free version and it really helps editing T4 templates.</div>
<h3>Creating the enum</h3>
<p>Assuming any table name ending with <strong>Type</strong> should be populated as an enum, we need to add the following code in <strong>Entity.tt</strong> right before the enclosing bracket of the namespace:</p><pre class="crayon-plain-tag"><# if (efHost.EntityType.Name.EndsWith("Type")) { #>
	public enum <#= efHost.EntityType.Name + "Enum" #>
	{
	}
<# } #></pre><p>Inside the enum we need to read the table data and populate the enum values. First, just like <a href="http://linqto.net/blog/2012/07/entity-framework-5-and-enum-support/" target="_blank">we did in Database First Workflow</a>, we need to find the connection string in the application config file. With the Database First workflow we used a T4 template who its host can give you access to the Visual Studio environment classes that allows you to enumerate the project files. In our case though, the T4 template host only exposes the model data (it is still beta). Fortunately, the source code of EF Power Tools can be downloaded and changed in a way you’ll get the connection string ready to use!</p>
<p>The steps to do that are:</p>
<ol>
<li>Download EF source code from <a href="http://entityframework.codeplex.com/">http://entityframework.codeplex.com/</a></li>
<li>Download <a href="http://go.microsoft.com/fwlink/?LinkId=251401" target="_blank">Visual Studio 2012 SDK</a></li>
<li>Open the Power Tools solution. The sln file is in the root folder of the source code.</li>
<li>Open the <strong>EfTextTemplateHost </strong>class and add this property:<br />
<pre class="crayon-plain-tag">public string ConnectionString { get; set; }</pre>
</li>
<li>Open the <strong>ReverseEngineerCodeFirstHandler </strong>class. This code is responsible to open the connection dialog when you reverse engineer a database. The line that do it is:<br />
<pre class="crayon-plain-tag">var dialogResult = dialog.ShowDialog(connect: true);</pre><br />
After a few rows the connection string is extracted:<br />
<pre class="crayon-plain-tag">var connectionString = connection.ConnectionString;</pre><br />
In this class, every place an <strong>EfTextTemplateHost</strong> is initiated, set its <strong>ConnectionString</strong> property with the value of the <strong>connectionString</strong> variable, for example:<br />
<pre class="crayon-plain-tag">var entityHost = new EfTextTemplateHost
	{
	    ConnectionString = connectionString
	// Rest of properties
	};</pre>
</li>
<li>Build the project.</li>
<li>Copy <strong>EFPowerTools.dll</strong>from the output directory to the extension directory. The directory should be
<pre class="crayon:false">C:\Users\[YourUserName]\AppData\Local\Microsoft\VisualStudio\11.0\Extensions\rj2pbzdi.3ea</pre>
<p>The last folder name might be different. This path can also be found in the registry in this key</p>
<pre class="crayon:false">HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\11.0_Config\Packages\{2b119c79-9836-46e2-b5ed-eb766cebbf7c}\CodeBase</pre>
<p>Close all Visual Studio windows if you can’t replace the file.</li>
</ol>
<p>Now that we got the connection string in our hand we can add code to query the database and populate the enum:</p>
<p>Add these two lines after the first row in the <strong>Entity.tt</strong> file:</p><pre class="crayon-plain-tag"><#@ assembly name="System.Data" #>
<#@ import namespace="System.Data.SqlClient" #></pre><p>Add this code where we created the enum before:</p><pre class="crayon-plain-tag"><#  if (efHost.EntityType.Name.EndsWith("Type")) 	{ #>
	public enum <#= efHost.EntityType.Name + "Enum" #>
	{
<#   	// assuming the first string column is the name of the enum value 	var firstStringColumnName = efHost.EntityType.Properties.First(p => (p.TypeUsage.EdmType as System.Data.Metadata.Edm.PrimitiveType).ClrEquivalentType.Equals(typeof(string))).Name;
	var keyColumnName = efHost.EntityType.KeyMembers[0].Name;
	var connectionString = efHost.ConnectionString;
	using (var con = new SqlConnection(connectionString))
    {
		con.Open();
		var cmd = new SqlCommand("SELECT * FROM " + efHost.EntityType.Name);
		cmd.Connection = con;
		using (var reader = cmd.ExecuteReader())
        {
            while (reader.Read())
            {
#>
		<#= code.Escape(reader[firstStringColumnName].ToString()) #> = <#= reader[keyColumnName].ToString() #>,
<#             }         }     } #>
	}
<# } #></pre><p></p>
<h3>Change the PK and FK columns type</h3>
<p>In <strong>Entity.tt</strong> file there is a <strong>foreach</strong> loop that creates the properties for each table column. Inside it we need to add some code that will find out if the current property is the PK or the FK and change the type accordingly:</p><pre class="crayon-plain-tag">foreach (var property in efHost.EntityType.Properties)
{
	string typeName = code.Escape(property.TypeUsage);;

	// If we are iterating the properties of the lookup table
	if (efHost.EntityType.Name.EndsWith("Type"))
	{
		// If this property is the primary key - change the type
		if (efHost.EntityType.KeyMembers.Any(km => km.Name == property.Name))
		{
			typeName = efHost.EntityType.Name + "Enum";
		}
	}
	// We are iterating another table - look if this is the FK property
	else
	{
		// Find the navigation property of this property and see if this connects us to the lookup table
		var navProperty = efHost.EntityType.NavigationProperties.FirstOrDefault(np => np.GetDependentProperties().Any(p => p.Name == property.Name) && np.ToEndMember.GetEntityType().Name.EndsWith("Type"));

		if (navProperty != null)
			typeName = code.Escape(navProperty.ToEndMember.GetEntityType()) + "Enum";
	}
#>
	<#= Accessibility.ForProperty(property) #> <#= typeName #> <#= code.Escape(property) #> { get; set; }
<#
}</pre><p>I used some mapping classes that can be found with MSDN help and also by debugging the EF Power Tools. Now that we have the source code we can attach the VS debugger with the source code to the VS with our project.</p>
<p>Save the T4 template we edited and reverse engineer again. In <strong>StudentStatusType.cs</strong> you’ll see our enum, and the PK and the FK properties have the type of the new enum.</p>
<p>Run this code and see if you get a new row in the Students table:</p><pre class="crayon-plain-tag">using (var dc = new YourContext())
{
    dc.Students.Add(new Student() { ID = 1, StatusTypeID = StudentStatusTypeEnum.Graduate });
    dc.SaveChanges();
}</pre><p>What would we do if the lookup table will have more rows? Well, <strong>Code First Reverse Engineer</strong> is still one time action. You can do that again but it will override all your code and you still want to use Code First. Incremental reverse engineering might come in the future, but I think that after reverse engineering you should only edit your code. If you add more enum values, you can add them to the lookup table with <a href="http://msdn.microsoft.com/en-us/data/jj591621" target="_blank">Migrations</a> as I’ve written in my <a href="http://linqto.net/blog/2012/10/entity-framework-code-first-and-enum-support/" target="_blank">previous post</a>.</p>
