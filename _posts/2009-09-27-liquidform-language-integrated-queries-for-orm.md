---
layout: post
title: liquidform - Language Integrated QUeries For ORM
created: 1254036840
author: ittayd
permalink: /java/liquidform-language-integrated-queries-orm
tags:
- JAVA
- JPA
---
<p>http://code.google.com/p/liquidform/ is a libray that adds a DSL on top of JPA. In particular, the DSL allows for queries to use domain objects in a typesafe manner. for example:</p>
<p>
<meta content="text/html; charset=utf-8" http-equiv="CONTENT-TYPE" />
<title></title>
<meta content="OpenOffice.org 3.1  (Linux)" name="GENERATOR" /> 	<style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
	-->
	</style>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000"><font face="Monospace"><font size="2">List people = em.createQuery(</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">        </font><font face="Monospace"><font size="2"><font color="#2a00ff">&quot;SELECT FROM Person p WHERE p.surname LIKE 'Smith%'&quot;</font><font color="#000000">)</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">        <font face="Monospace"><font size="2">.getResultList();</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;">becomes (notice the use of p.getSurname() for type safety on Person methods)</p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">Person p = LiquidForm.</font><font color="#000000"><i>use</i></font><font color="#000000">(Person.</font><font color="#7f0055"><b>class</b></font><font color="#000000">, </font><font color="#2a00ff">&quot;p&quot;</font><font color="#000000">);</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">List people2 = em.createQuery(</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">    <font face="Monospace"><font size="2">select(p).from(Person.</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>class</b></font></font></font><font color="#000000"><font face="Monospace"><font size="2">).as(p).where(like(p.getSurname(), </font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2">&quot;Smith%&quot;</font></font></font><font color="#000000"><font face="Monospace"><font size="2">)).toString()).getResultList();</font></font></font></p>
</p>
