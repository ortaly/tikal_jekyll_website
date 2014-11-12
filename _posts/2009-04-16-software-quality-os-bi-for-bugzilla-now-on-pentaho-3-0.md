---
layout: post
title: Software Quality – OS BI for Bugzilla – now on Pentaho 3.0
created: 1239877143
author: udid
permalink: /java/software-quality-–-os-bi-bugzilla-–-now-pentaho-30
tags:
- JAVA
- bugzilla
- Pentaho
- OSBI
- SQR
---
<p>This post will tell you how we have used Pentaho and SQR to create formated reports and graphs in ALM suite...</p>
<p>Application development is not a trivial task, it is both risky and expensive. To improve the efficiency of the development, we are using a suite of infrastructure tolls, such as: Issue tracking, Source management, Build automation, Test management, IDEs and related methodologies. Once those operational components exists, developers have formal tools to conduct, report and communicate around the development tasks and managers get visibility to the development process.</p>
<p style="margin-bottom: 0in;">Tikal is a provider of open-source ALM suite (<a href="http://tikal.sourceforge.net/" target="_blank">http://tikal.sourceforge.net)</a>, like many others, we believe that open-source software is an attractive alternative licensing and business model with a very appealing value propositions. We have been asked by our customers to supply or integrate business intelligence functionality (i.e. reporting, analysis and dashboarding) to our ALM suite.</p>
<p style="margin-bottom: 0in;">Pentaho (<a href="http://www.pentaho.com/">http://www.pentaho.com/</a>) is an open-source BI platform, like our platform, it integrates best-of-bread open-source projects to offer a complete suite and a powerful platform which we have already used for more than one project, now it was time to integrate it with our own software.</p>
<p style="margin-bottom: 0in;">Lucky we came across SQR, a Pentaho solution for Bugzilla and Jira, the solution (<a href="http://sourceforge.net/projects/qareports">http://sourceforge.net/projects/qareports</a>) is composed of an ETL process to extract raw data from the Bugzilla database and to transform it into a datamart, which is later used to drive reports, analysis views and dashboards that can be accessed ad-hoc or integrated into existing business flows and systems.</p>
<p style="margin-bottom: 0in;">SQR was developed on Pentaho v1.2, we have upgraded it to the latest Pentaho v3.0 (http://dev.tikalk.com:8080), the next post will show you how.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
