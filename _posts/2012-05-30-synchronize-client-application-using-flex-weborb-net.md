---
layout: post
title: Synchronize Client Application using flex/WebOrb.net
created: 1338394544
author: avit
permalink: /synchronize-client-application-using-flexweborbnet
tags:
- Ruby
- web
---
<img alt='iStock_000001422752XSmall' border='0' height='120' src='http://www.kensodev.com/wp-content/uploads/2009/11/iStock_000001422752XSmall.jpg' style='margin: 2px; float: left; border-width: 0px;' width='154' />
<p>Let’s say you have a client that’s requesting an application for his sales team. He wants a special screen displaying the calls from clients and the client’s request taken by the secretary.</p>

<p>In addition, the client does not want to “refresh” the page, he wants it displayed the second it happens. I will show you a way to do this in minutes using WebOrb.net / flex and visual Studio.</p>
<!--more--><h3>Planning (Equipment)</h3><ol>
	<li>WebOrb installed on machine (Go now and download from the link below)</li>
	<li><a href='http://www.kensodev.com/tag/flex-builder/'>Flex builder</a> 3</li>
	<li>Visual studio or visual web developer express</li>
	<li>good mood :-)</li>
</ol>
<p>If you are not familiar with the amazing product called <a href='http://www.themidnightcoders.com/products/weborb-for-net/overview.html' target='_blank'>WebOrb.net</a> you should really read about it some more.</p>

<p>I already installed WebOrb newest version on my machine and I will simply start this post from the point that the server is installed and configured. I do plan to post a series of posts about this product - the first one will also include installation and configuration.</p>

<p>If you need any help or explanations for now, please go to MidnightCoders website and have a look at this great tutorial <a href='http://www.themidnightcoders.com/products/weborb-for-net/developer-den/technical-articles/installing-weborb-on-vista-iis-7-install.html' target='_blank'>here</a>.</p>

<p>After installing the application and navigating to <a href='http://localhost/weborb30'>http://localhost/weborb30</a> you see the weborb admin console.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009215336.png'><img alt='01-11-2009 21-53-36' border='0' height='430' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009215336_thumb.png' style='display: inline; border-width: 0px;' title='01-11-2009 21-53-36' width='554' /></a>
<p>Now, the application is installed on the server. Lets move along and create our database shall we?</p>

<p>I created a database called Sales, I will create a table called sales_leads like shown in this image here.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009215931.png'><img alt='01-11-2009 21-59-31' border='0' height='380' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009215931_thumb.png' style='display: inline; border-width: 0px;' title='01-11-2009 21-59-31' width='554' /></a>
<p>By the way, I’m using a sql express 2008 database, but you can use any database you may want.</p>

<p>If you cannot understand from the picture, here is the table creation script so you can better understand and so you can copy+paste for your convenience.</p>

<p><span>sql</span> USE <span>Sales</span> GO</p>

<p>/****** Object: Table <span>dbo</span>.<span>sales_leads</span> Script Date: 11/01/2009 22:01:48 ***<strong><em>/ SET ANSI_NULLS ON GO</em></strong></p>

<p>SET QUOTED_IDENTIFIER ON GO</p>

<p>CREATE TABLE <span>dbo</span>.sales_leadsleadID] <span>int</span> IDENTITY(1,1) NOT NULL, <span>client_name</span>(50) NULL, <span>client_phone</span>(50) NULL, <span>comments</span>(2550) NULL, CONSTRAINT <span>PK_sales_leads</span> PRIMARY KEY CLUSTERED ( <span>leadID</span> ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON <span>PRIMARY</span> ) ON <span>PRIMARY</span></p>

<p>GO <span>/sql</span></p>

<p>Now, we have our database ready, let’s navigate our way inside the weborb admin console to Management –> Data Management</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009220617.png'><img alt='01-11-2009 22-06-17' border='0' height='391' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009220617_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-06-17' width='554' /></a>
<p>In the “Database” section (red square) click the “Add new Database” icon <a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009220811.png'><img alt='01-11-2009 22-08-11' border='0' height='36' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009220811_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-08-11' width='44' /></a></p>

<p>The next 2 dialogs are simple - Just enter your username, password, server URI and click OK. You will be prompted to select your database from the list of db’s on the server.</p>

<p>After selecting a db it should be inside the “Database” section (bottom left).</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221206.png'><img alt='01-11-2009 22-12-06' border='0' height='244' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221206_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-12-06' width='159' /></a>
<p>Now, this is the part where it gets to be magical :-)</p>

<p>Select your table you want to create a model for (right now there’s only one) and drag it into the main work surface</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221329.png'><img alt='01-11-2009 22-13-29' border='0' height='433' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221329_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-13-29' width='554' /></a>
<p>A dialog will popup.</p>

<p>Fill in the model name, server namespace, client namespace (these all are custom and you can fill in whatever naming conventions you are used to)</p>

<p>Here’s mine:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221535.png'><img alt='01-11-2009 22-15-35' border='0' height='295' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221535_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-15-35' width='447' /></a>
<p>Make sure you check the “generate test drive” checkbox, this will generate server side/client side code for you. After you click save, your screen should look like this:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221651.png'><img alt='01-11-2009 22-16-51' border='0' height='357' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221651_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-16-51' width='554' /></a>
<p>Above the model name you see an icon for a zip file, click it and the code will be downloaded. This generated both server side and client side code for you.</p>

<p>Click the build icon and then the download icon.</p>

<p>Here’s the file content:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221916.png'><img alt='01-11-2009 22-19-16' border='0' height='446' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009221916_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-19-16' width='554' /></a>
<p>OK, we are half way there.</p>

<p>Now, open the server project using visual studio, compile it, take the DLL and the config file it created and place it in the BIN folder inside weborb.</p>

<p>Should be something like <em>c:\inetpub\wwwroot\weborb30\bin</em></p>

<p>Create a flex project, place the files inside this project, build and watch the magic happen.</p>

<p>Make sure you create a build reference to the weborb XML (Services) like so:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009223441.png'><img alt='01-11-2009 22-34-41' border='0' height='412' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009223441_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-34-41' width='554' /></a>
<p>Here’s a screenshot of the final result, every change you make, every record you add is immediately transferred to the other client.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/11/01112009224541.png'><img alt='01-11-2009 22-45-41' border='0' height='446' src='http://www.kensodev.com/wp-content/uploads/2009/11/01112009224541_thumb.png' style='display: inline; border: 0px;' title='01-11-2009 22-45-41' width='554' /></a>
<p>Usually, I publish source code with my posts, but this code was generated for me the same as it will be generated for you.</p>

<p>Feel free to comment with questions, I will do my best to answer them. Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/VJd7rAYoEAg" height="1" width="1"/>
