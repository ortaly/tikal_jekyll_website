---
layout: post
title: Backup all databases (SQL Express) with a single T-Sql
created: 1338394544
author: avit
permalink: /backup-all-databases-sql-express-single-t-sql
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/01/16/shrink-all-databases-on-server-sql/istock_000010274670xsmall/' rel='attachment wp-att-302'><img alt='' class='alignleft size-thumbnail wp-image-302' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/01/iStock_000010274670XSmall-150x150.jpg' title='Database server' width='150' /></a>
<p>One of the things I often see when people talk about the express disadvantages is the lack of support for JOBS so you cannot create a custom backup for your database.</p>

<p>Well, in this post I will show you how you can create a single database on your development machine that will be responsible for all of the backups, create a table that will log the backups and a stored procedure that will do the work.</p>

<p>In a later post, I will also show how you can integrate this into a command line and then into your nightly backup strategy.</p>

<p>The most beautiful part of this solution is that it is totally free of charge and uses custom T-Sql, and the command line is using a custom tool supplied by the EXPRESS package.</p>

<p>So, without talking too much, let’s dive into the solution. <!--more--></p>

<p>First, we will create the database.</p>

<p><span>sql</span> SET ANSI_NULLS ON GO SET QUOTED_IDENTIFIER ON GO SET ANSI_PADDING ON GO CREATE TABLE <span>dbo</span>.DatabaseBackupName] <a href='128'>varchar</a> NOT NULL, <span>BackupFlagFull</span>(1) NOT NULL, <span>BackupFlagLog</span>(1) NOT NULL, <span>RetentionPeriodFull</span> NOT NULL, <span>RetentionPeriodLog</span> NOT NULL, PRIMARY KEY NONCLUSTERED ( <span>Name</span> ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON <span>PRIMARY</span> ) ON <span>PRIMARY</span> GO SET ANSI_PADDING OFF GO <span>/sql</span></p>

<p>Now, we have the database all set-up, let’s create the stored procedure</p>

<p><span>sql</span> SET ANSI_NULLS ON GO SET QUOTED_IDENTIFIER ON GO CREATE Procedure <span>dbo</span>.<span>s_BackupAllDatabases</span> @Path varchar(128) , @Type varchar(4) – Full / Log as set nocount on declare @sql varchar(1000)</p>

<pre><code>-- Get all database names
create table #DBName
	(
	ID int identity (1,1) ,
	Name varchar(128) not null ,
	RetentionPeriod datetime null
	)

insert #DBName
	(Name)
select name
from master..sysdatabases

-- Include any new databases in the backup
insert DatabaseBackup
	(
	Name ,
	BackupFlagFull ,
	BackupFlagLog ,
	RetentionPeriodFull ,
	RetentionPeriodLog
	)
select #DBName.Name ,
	'Y' ,
	'N' ,
	'2 jan 1900' , -- default 2 days
	'1 jan 1900'
from #DBName
	left outer join DatabaseBackup
		on DatabaseBackup.Name = #DBName.Name
where DatabaseBackup.Name is null
and lower(#DBName.Name) &lt;&gt; 'tempdb'

-- Remove any non-existant databases
delete DatabaseBackup
where not exists
	(
	select *
	from #DBName
	where #DBName.Name = DatabaseBackup.Name
	)

delete #DBName

create table #ExistingBackups
	(
	Name varchar(128) ,
	ID int identity (1,1)
	)

-- loop through databases</code></pre>

<p>declare @Name varchar(128) , @RetentionPeriod datetime , @LastBackupToKeep varchar(8) , @ID int , @MaxID int</p>

<pre><code>insert #DBName
	(Name, RetentionPeriod)
select Name, case when @Type = 'Full' then RetentionPeriodFull else RetentionPeriodLog end
from DatabaseBackup
where (@Type = 'Full' and BackupFlagFull = 'Y')
or (@Type = 'Log' and BackupFlagLog = 'Y')

select @MaxID = max(ID) ,
	@ID = 0
from #DBName

while @ID &lt; @MaxID
begin
	-- get next database to backup
	select @ID = min(ID) from #DBName where ID &gt; @ID

	select @Name = Name ,
		@RetentionPeriod = RetentionPeriod
	from #DBName
	where ID = @ID

	-- Delete old backups
	delete #ExistingBackups
	select @sql = 'dir /B ' + @Path
	select @sql = @sql + '&quot;' + @Name + '_' + @Type + '*.*&quot;'

	insert #ExistingBackups exec master..xp_cmdshell @sql

	if exists (select * from #ExistingBackups where Name like '%File Not Found%')
		delete #ExistingBackups

	select @LastBackupToKeep = convert(varchar(8),getdate() - @RetentionPeriod,112)
	delete #ExistingBackups where Name &gt; @Name + '_' + @Type + '_' + @LastBackupToKeep</code></pre>

<p>declare @eID int , @eMaxID int , @eName varchar(128)</p>

<pre><code>	-- loop round all the out of date backups
	select 	@eID = 0 ,
		@eMaxID = coalesce(max(ID), 0)
	from 	#ExistingBackups

	while @eID &lt; @eMaxID
	begin
		select @eID = min(ID) from #ExistingBackups where ID &gt; @eID
		select @eName = Name from #ExistingBackups where ID = @eID

		select @sql = 'del ' + @Path + '&quot;' + @eName + '&quot;'
		exec master..xp_cmdshell @sql, no_output
	end
	delete #ExistingBackups

	-- now do the backup
	select @sql = @Path + @Name + '_' + @Type + '_'
			+ convert(varchar(8),getdate(),112) + '_'
			+ replace(convert(varchar(8),getdate(),108),':','') + '.bak'
	if @Type = 'Full'
		backup database @Name
			to disk = @sql
	else
		backup log @Name
			to disk = @sql
end</code></pre>

<p>GO /****** Object: Check <span>CK__DatabaseB__Backu__023D5A04</span> Script Date: 04/05/2010 16:49:17 ***<strong><em>/ ALTER TABLE <span>dbo</span>.<span>DatabaseBackup</span> WITH CHECK ADD CHECK ((<span>BackupFlagFull</span>=’N’ OR <span>BackupFlagFull</span>=’Y’)) GO /</em></strong>*** Object: Check <span>CK__DatabaseB__Backu__03317E3D</span> Script Date: 04/05/2010 16:49:17 ***<strong><em>/ ALTER TABLE <span>dbo</span>.<span>DatabaseBackup</span> WITH CHECK ADD CHECK ((<span>BackupFlagLog</span>=’N’ OR <span>BackupFlagLog</span>=’Y’)) GO <span>/sql</span></em></strong></p>

<p>Now, we have our database, we have our stored procedure.</p>

<p>Let’s execute the stored procedure.</p>

<p>Right click on the stored procedure and click on “Execute…” <p style='text-align: center;'><a href='http://www.kensodev.com/wp-content/uploads/2010/04/05-04-2010-16-55-15.png' rel='attachment wp-att-378 facebox'><img alt='' class='aligncenter size-medium wp-image-378' height='225' src='http://www.kensodev.com/wp-content/uploads/2010/04/05-04-2010-16-55-15-300x225.png' title='Execute stored procedure' width='300' /></a></p> Now, set the parameters</p>

<p>The first parameter is the library and the second is the backup type, you can use full, log <p style='text-align: center;'><a href='http://www.kensodev.com/wp-content/uploads/2010/04/05-04-2010-16-55-47.png' rel='attachment wp-att-379 facebox'><img alt='' class='aligncenter size-medium wp-image-379' height='268' src='http://www.kensodev.com/wp-content/uploads/2010/04/05-04-2010-16-55-47-300x268.png' title='Store procedure execution parameters' width='300' /></a></p> That’s it, you have a backup up and running.</p>

<p>in the next post I will show how you can do it from command line and integrate it into your backup program post-backup action.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/frsukHqUtNg" height="1" width="1"/>
