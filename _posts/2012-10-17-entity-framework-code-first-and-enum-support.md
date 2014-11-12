---
layout: post
title: Entity Framework Code First and Enum Support
created: 1350472998
author: amiram
permalink: /net/entity-framework-code-first-and-enum-support
tags:
- .NET
---
<p>In my <a href="http://linqto.net/blog/2012/07/entity-framework-5-and-enum-support/" target="_blank">previous post</a>, I showed how to use the new EF 5 Enum support and have your lookup table populated as enum values. This post was for the <a href="http://msdn.microsoft.com/en-us/data/jj206878" target="_blank">Database First</a> workflow which we all used when we started using Linq to Sql or the first EF release. We used to see an O/R Mapper as one that reflects database structure in object oriented manner, so building your model from a database looked like the right way to go.</p>
<p>Starting from <a href="http://blogs.msdn.com/b/adonet/archive/2011/04/11/ef-4-1-released.aspx" target="_blank">EF 4.1</a>, you can start with your code and let EF make the database for you – the <strong>Code First </strong>workflow. With this workflow, you can forget about adding tables, columns and relations with the database tools.</p>
<p><strong>Note: </strong>For using Code First with existing database look in <a href="http://linqto.net/blog/2012/10/entity-framework-5-and-enum-support-part-2/" target="_blank">this post</a>.</p>
<p>For this demo, the classes structure is as follows:</p>
<p>1. An enum for the possible status of a student:</p><pre class="crayon-plain-tag">public enum StudentStatusType
{
    Student = 1,
    Graduate = 2
}</pre><p>2. A Student class:</p><pre class="crayon-plain-tag">public class Student
{
    public int ID { get; set; }
    public StudentStatusType StatusTypeID { get; set; }
}</pre><p>3. A DbContext class:</p><pre class="crayon-plain-tag">public class SchoolContext : DbContext
{
    public DbSet<Student> Students { get; set; }
}</pre><p>Running this code will create the database:</p><pre class="crayon-plain-tag">using (SchoolContext dc = new SchoolContext())
{
    dc.Students.Add(new Student() 
        {
            ID = 1,
            StatusTypeID = StudentStatusType.Graduate 
        }
    );
    dc.SaveChanges();
}</pre><p>As expected, there is only one table named <strong>Students</strong> in the database. A lookup table for the enum was not created since it doesn’t have a corresponding DbSet, and we can’t add one since the generic type of a DbSet must be a reference type and enum isn’t. We would like to create a table for the enum, fill it with the enum values and add a FK in Students table to this table.</p>
<p>EF Code First mechanism has some <a href="http://msdn.microsoft.com/en-us/data/jj679962" target="_blank">conventions</a> which determine how to create the database structure. For example, if your class has an integer property named “ID” (case-insensitive) or “YourClassNameID”, EF will create a primary key column for this property.</p>
<p>There are several ways to customize the way Code First acts:</p>
<ol>
<li>Using <a href="http://msdn.microsoft.com/en-us/data/jj591583" target="_blank">Data Annotations</a>. You can customize column or table names, add keys, add constraints and so on. You can’t create a new table with no DbSet.</li>
<li><a href="http://msdn.microsoft.com/en-us/data/jj591617" target="_blank">Overriding DbContext.OnModelCreating</a>. Inside this method you can use the Fluent API to customize the model creating process. You can do more advanced changes but still you are limited to an existing DbSet.</li>
<li>Using <a href="http://msdn.microsoft.com/en-us/data/jj554735" target="_blank">Migrations</a>. This method allows you to add code to apply more changes to the database after you’ve created it in the first place. Here you can also create more tables and add plain Sql code.</li>
</ol>
<p>To start using Migrations, you have to enable it first. Open the <strong>Package Manager Console</strong> From <strong>Tools</strong> -> <strong>Library Package Manager </strong>-> <strong>Package Manager Console</strong>. In the tool window make sure your project is selected in the <strong>Default Project:</strong> drop down.</p>
<p>Run the following command: <strong>Enable-Migrations</strong></p>
<p>After running the command, you’ll see a new folder in your project named <strong>Migrations</strong>. In this folder there are two files. One is <strong>Configuration.cs</strong> which applies to the migrations configuration. The other is <strong>InitialCreate.cs</strong> (prefixed with a number) that has the following code:</p><pre class="crayon-plain-tag">public partial class InitialCreate : DbMigration
{
    public override void Up()
    {
        CreateTable(
            "dbo.Students",
            c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    StatusTypeID = c.Int(nullable: false),
                })
            .PrimaryKey(t => t.ID);

    }

    public override void Down()
    {
        DropTable("dbo.Students");
    }
}</pre><p>This code is creating your database according to your classes. The method <strong>Up</strong> is executed when the database is upgraded to this version. The method <strong>Down</strong> is executed when the database is downgraded from this version, and should rollback the changes made in the <strong>Up</strong> method.</p>
<p>I prefer to add another migration to change the database and not change the initial one. This way it will be easy to go back to the default behavior of Code First.</p>
<p>To add a migration, go back to the <strong>Package Manager Console</strong> window and run the following command: <strong>Add-Migration AddEnum</strong>. The <strong>AddEnum</strong> is the migration name and you can change it.</p>
<p>After running this command you’ll see another file in the Migrations folder named <strong>AddEnum</strong> and prefixed with a number. This file has a class with empty <strong>Up</strong> and <strong>Down</strong> methods.</p>
<p>In those methods we would like to add the lookup table as follows:</p>
<ul>
<li>In the <strong>Up</strong> method:
<ul>
<li>Create the table.</li>
<li>Fill it with data.</li>
<li>Add a FK to the Students table.</li>
</ul>
</li>
<li>In the <strong>Down</strong> method:
<ul>
<li>Remove the FK.</li>
<li>Delete the table.</li>
</ul>
</li>
</ul>
<p>The code for this migration:</p><pre class="crayon-plain-tag">public partial class AddEnum : DbMigration
{
    const string FKName = "FK_Student_StudentStatusType";

    public override void Up()
    {
        // Create the lookup table
        this.CreateTable(typeof(StudentStatusType).Name, t =>
            new 
            { 
                ID = t.Int(nullable: false), 
                StatusName = t.String() 
            }
        );

        // Set ID as the primary key
        this.AddPrimaryKey(typeof(StudentStatusType).Name, "ID");

        // Populate the table with enum values
        foreach (StudentStatusType statusType in Enum.GetValues(typeof(StudentStatusType)))
        {
            Sql("INSERT INTO " + 
                typeof(StudentStatusType).Name + 
                " SELECT " + (int)statusType + ", '" + statusType.ToString() + "'");
        }

        // Add the FK to Students table
        this.AddForeignKey("Students", "StatusTypeID",
            typeof(StudentStatusType).Name, "ID", name: FKName); 
    }

    public override void Down()
    {
        // Delete the FK from Students table
        this.DropForeignKey(typeof(StudentStatusType).Name, FKName);

        // Delete the lookup table
        this.DropTable(typeof(StudentStatusType).Name);
    }
}</pre><p>To run the migration run the following command in the <strong>Package Manager Console</strong> window: <strong>Update-Database</strong></p>
<p>After running this command, we have a lookup table with the enum values.</p>
<p>Now what should you do if you add another value to your enum later? You can add another migration and add only the values that are not in the table, however each migration run only once and you’ll have to add another migration with the same code but other values anytime you add a new value.</p>
<p>What we need here is a method that run every time we run the <strong>Update-Database</strong> command. For that we can use the <strong>Seed</strong> method in the <strong>Configuration.cs</strong> file mentioned before. (Notice that every time you update the database you see a message <strong>Running Seed method</strong>). There is no need to write a downgrade code for this since in the <strong>AddEnum</strong> code we delete the table completely.</p>
<p>We should add the following code in the <strong>Seed</strong> method:</p><pre class="crayon-plain-tag">// Get the current enum values
var enumValues = Enum.GetValues(typeof(StudentStatusType))
    .OfType<StudentStatusType>().ToArray();

// Get the current database values
var databaseValues = context.Database.SqlQuery(typeof(StudentStatusType),
    "SELECT ID FROM " + typeof(StudentStatusType).Name)
    .OfType<StudentStatusType>().ToArray();

// Get the values that are not in the database
var newValues = enumValues.Except(databaseValues);

// Add the missing values
foreach (var newValue in newValues)
{
    context.Database.ExecuteSqlCommand("INSERT INTO " +
        typeof(StudentStatusType).Name +
        " SELECT " + (int)newValue + ", '" + newValue.ToString() + "'");
}</pre><p>Now any value we add to the enum will be added to the table when we run the <strong>Update-Database</strong> command even if there is no migration that wasn’t applied before.</p>
<p>This solution is much more cleaner than my solution to the <a href="http://linqto.net/blog/2012/07/entity-framework-5-and-enum-support/" target="_blank">Database First</a> workflow. Using designers is fun and I love it but hook into them is much more complicated. Using <strong>Code First</strong> you got much more simple control over the model generation.</p>
<p> </p>
