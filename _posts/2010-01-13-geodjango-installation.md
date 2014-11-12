---
layout: post
title: GeoDjango Installation
created: 1263418636
author: dmitri
permalink: /incubator/geodjango-installation
tags:
- Incubator
- Mac
- gis
- geodjango
- Python
- Django
---
<p>GeoDjango is an add-on for Django that turns it into a world-class geographic web framework. GeoDjango strives to make at as simple as possible to create geographic web applications, like location-based services. Some features include:</p>
<ol>
    <li>Django model fields for OGC geometries, that may be edited in the admin.</li>
    <li>Extensions to Django&rsquo;s ORM for the querying and manipulation of spatial data.</li>
    <li>Loosely-coupled, high-level Python interfaces for GIS geometry operations and data formats.</li>
</ol>
<p>&nbsp;</p>
<p>In general, GeoDjango installation requires:</p>
<ol>
    <li>Python and Django</li>
    <li>Spatial Database</li>
    <li>Geospatial Libraries</li>
</ol>
<p>and may be installed on most of modern computers managed by Linux, Windows and Mac OS X operating systems. In this article we are going to deal with GeoDjango installation on Mac OS X computers. That assumes a familiarity with MacPorts tool. Because MacPorts still builds the software from source, Xcode and X11 are required.&nbsp;</p>
<p>&nbsp;</p>
<h1>Installation Summary:</h1>
<p>&nbsp;</p>
<p>$ sudo port sync</p>
<p>$ sudo port install python26</p>
<p>$ sudo port install postgresql84-server</p>
<p>$ sudo port install geos</p>
<p>$ sudo port install proj</p>
<p>$ sudo port install postgis</p>
<p>$ sudo port install libgeoip</p>
<p>$ sudo port install py26-psycopg2</p>
<p>&nbsp;</p>
<h1>PostgreSQL Configuring:</h1>
<p>&nbsp;</p>
<p>$ sudo mkdir /Users/DB/postgresql</p>
<p>$ export PATH=$PATH:/opt/local/lib/postgresql84/bin</p>
<p>$ echo 'export PATH=$PATH:/opt/local/lib/postgresql84/bin' &gt;&gt; ~/.profile</p>
<p>$ chown -R postgres:postgres /Users/DB/postgresql</p>
<p>$ sudo su postgres -c &quot;initdb -E UTF8 -D /Users/DB/postgresql&quot;</p>
<p>&nbsp;</p>
<h1>PostgreSQL Server Controls:</h1>
<p>&nbsp;</p>
<p>$ alias pgstart=&quot;sudo su postgres -c 'pg_ctl -D /Users/DB/postgresql -l /Users/DB/postgresql/logfile start'&quot;</p>
<p>$ alias pgstop=&quot;sudo su postgres -c 'pg_ctl -D /Users/DB/postgresql stop -m fast'&quot;</p>
<p>$ alias pgstatus=&quot;sudo su postgres -c 'pg_ctl status -D /Users/DB/postgresql'&quot;</p>
<p>$ pgstart</p>
<p>&nbsp;</p>
<h1>PostGIS DB Template Creation:</h1>
<p>&nbsp;</p>
<p>$sudo su postgres</p>
<p>$ POSTGIS_SQL_PATH='pg_config &mdash;sharedir'/contrib</p>
<p>$ createdb -E UTF8 postqis_database_template</p>
<p>$ createlang -d postqis_database_template plpgsql</p>
<p>$ psql -d postgres -c &quot;UPDATE pg_database SET datistemplate='true' WHERE datname='postqis_database_template';&quot;</p>
<p>$ psql -d postqis_database_template -f $POSTGIS_SQL_PATH/postgis.sql</p>
<p>$ psql -d postqis_database_template -f $POSTGIS_SQL_PATH/spatial_ref_sys.sql</p>
<p>$ psql -d postqis_database_template -c &quot;GRANT ALL ON geometry_columns TO PUBLIC;&quot;</p>
<p>$ psql -d postqis_database_template -c &quot;GRANT ALL ON spatial_ref_sys TO PUBLIC;&quot;</p>
<p>&nbsp;</p>
<h1>DB Creation:</h1>
<p>&nbsp;</p>
<p>$ createdb -T postqis_database_template [your_database_name]</p>
<p>$ createuser &mdash;createdb [local_user]</p>
<p>&nbsp;</p>
