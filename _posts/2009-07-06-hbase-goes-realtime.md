---
layout: post
title: HBase Goes Realtime
created: 1246908730
author: yanai
permalink: /java/hbase-goes-realtime
tags:
- JAVA
- Hadoop Hbase Bigtable
- Databases
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<title></title>
<meta name="GENERATOR" content="OpenOffice.org 3.0  (Linux)"> 	<style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style></meta>
</meta>
</p>
<p>HBase release their new version, in which largely rewrites its previous versions, and enhances its performance in order of magnitude . HBase is the Hadoop database. Its an open-source, distributed, column-oriented store modeled after the Google paper, <a href="http://labs.google.com/papers/bigtable.html">Bigtable: A Distributed Storage System for Structured Data</a> by Chang et al. Just as Bigtable leverages the distributed data storage provided by the Google File System, HBase provides Bigtable-like capabilities on top of Hadoop.</p>
<p>HBase's goal is the hosting of very large tables -- billions of rows X millions of columns -- atop clusters of commodity hardware. Try it if your plans for a data store run to big.</p>
<p>&nbsp;</p>
<p>Here is a presentation that summarizes the new version :<a href="http://wiki.apache.org/hadoop-data/attachments/HBase%282f%29HBasePresentations/attachments/HBase_Goes_Realtime.pdf"> http://wiki.apache.org/hadoop-data/attachments/HBase(2f)HBasePresentations/attachments/HBase_Goes_Realtime.pdf</a></p>
