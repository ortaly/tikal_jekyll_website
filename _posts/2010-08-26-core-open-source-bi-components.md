---
layout: post
title: Core Open Source BI components
created: 1282807173
author: udid
permalink: /java/core-open-source-bi-components
tags:
- JAVA
- report
- OSBI
- OLAP
- etl
- .Open Source
---
<p>Tikal's recent experience with open source business intelligence, data analysis and report generation tools such as Pentaho CE and many others had proven that the tools are efficient, simple, flexible, scalable, reliable and as free as Linux or Apache.&nbsp;</p>
<!--break-->
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Below is an overview of core OSBI components, if your team is dealing with such requirements without the proper tools, you will find the tools extremely useful and rewarding:</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">1.  The Extract-Transfer-Load (ETL) tool is your best choice if you need to run jobs to transfer lots of data between various sources and targets and the data has to be linked, integrated, aggregated or transformed in any way. Out of the box, the tool provides a <a href="http://wiki.pentaho.com/display/EAI/Pentaho+Data+Integration+Steps">comprehensive set of transformation steps</a> and a simple drag and drop GUI by which you can design just about any structured data transformation in XML scripts which can be later executed in a container that can scale to vast amounts of data by taking care of batching, parallelizing and clustering as well as all data connectivity and format issues.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">2. The second tool deals with quantitative data analysis of large multi dimensional data sets, in a simple way that managers expect to get it (aka <a href="http://sourceforge.net/projects/mondrian/">OLAP</a>). It allows you to view your data as a very long list of &ldquo;occurrences&rdquo; each with a set of measurements and values in many dimensions, which later enables the user to get an aggregative view of the data broken down on the different dimensions in near real-time using a simple web front end.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">3. The <a href="http://wiki.pentaho.com/display/Reporting/1.+Quick+Start">reporting engine</a> is the tool for rendering visual appealing &ldquo;pixel perfect&rdquo; reports in pdf, html, xls, csv or xml. It take care of parameterized querying of the data from rational databases, OLAP engines, XML or web-services, provide means for defining dynamic functions much like excel, supports embedding images, graphs and sub-reports and seamlessly handles sub-grouping and paging of the report. A web-based self-service report generation wizard is also available.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">In addition to all those there is a full ecosystem of tools for data warehousing, dashboarding, data mining, event processing, data quality and much much more, all packed with the benefits of open source code and ready to be used.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Go ahead, give it a <a href="http://wiki.pentaho.com/display/COM/Community+Wiki+Home">try</a>, it's open-source.&nbsp;</p>
