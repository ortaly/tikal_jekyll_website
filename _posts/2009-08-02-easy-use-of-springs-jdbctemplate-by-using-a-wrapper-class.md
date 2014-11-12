---
layout: post
title: Easy use of Spring's JdbcTemplate by using a wrapper class
created: 1249204073
author: elad
permalink: /java/easy-use-springs-jdbctemplate-using-wrapper-class
tags:
- JAVA
- JDBC
- Spring
- JdbcTemplate
---
<p>The following code below wraps Spring's JdbcTemplate, which is a very useful library that let's you use JDBC without the overhead of handling the creation and disposal of JDBC connection, Statement and ResultSet.</p>
<p>&nbsp;</p>
<p>There are some reasons of using this class instead of using Jdbctemplate directly:</p>
<p>1) The code is very simple to use (only one class).</p>
<p>2) It's a singleton that keeps a cache of javax.sql.DataSource instances.</p>
<p>3) It allows to perform SQL operations (insert, update and query) on many databases without creating a new DataSource each time.</p>
<p>4) The singleton exposes only the most useful API of the JdbcTemplate class.</p>
<p>5) It enforces the usage of Generics when querying for Objects.</p>
<p>&nbsp;</p>
<p>In order to make this class to run, you need to add the following jar files to your classpath:</p>
<p>org.springframework.core-3.0.0.M3.jar</p>
<p>org.springframework.jdbc-3.0.0.M3.jar<br />
org.springframework.transaction-3.0.0.M3.jar</p>
<p>&nbsp;</p>
<p>Here's the code:</p>
<p>------------------------------------------------------------------------------------------------------------------------------------------</p>
<pre class="brush: java;">
package test;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/**
* 
* this class wraps the org.springframework.jdbc.core.JdbcTemplate. 
*/
public class JdbcWrapper
{
 private static JdbcWrapper _instance = new JdbcWrapper();

 private Map&lt;String, DataSource&gt; _jdbcTemplates;

 private static InitialContext _jndiContext;

 /**
 * empty c'tor
 */
 private JdbcWrapper() 
 {
  _jdbcTemplates = new ConcurrentHashMap&lt;String, DataSource&gt;();
 }

 /**
 * @return the singleton instance
 */
 public static JdbcWrapper getInstance() 
 {  
  return _instance;
 }

 /***************************************************************************
 * UPDATE
 **************************************************************************/

 public int insert(String dataSourceName, String sql)
 {
  return update(dataSourceName, sql);
 }

 public int modify(String dataSourceName, String sql)
 {
  return update(dataSourceName, sql);
 }
 
 public int delete(String dataSourceName, String sql)
 {
  return update(dataSourceName, sql);
 }

 public int insert(String dataSourceName, String sql, Object[] args)
 {
  return update(dataSourceName, sql, args);
 }

 public int modify(String dataSourceName, String sql, Object[] args)
 {
  return update(dataSourceName, sql, args);
 }
 
 public int delete(String dataSourceName, String sql, Object[] args)
 {
  return update(dataSourceName, sql, args);
 }

 private int update(String dataSourceName, String sql) 
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);  
  int numUpdates = jdbcTemplate.update(sql);
  return numUpdates;
 }
 
 private int update(String dataSourceName, String sql, Object[] args)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  int numUpdates = jdbcTemplate.update(sql, args);
  return numUpdates;
 }

 /***************************************************************************
 * BATCH
 **************************************************************************/
 
 public int[] batchUpdate(String dataSourceName, List&lt;String&gt; sql)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  int[] numUpdates = jdbcTemplate.batchUpdate(sql.toArray(new String[0]));
  return numUpdates;
 }   
 

 /***************************************************************************
 * QUERY
 **************************************************************************/
 
 public void query(String dataSourceName, String sql)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  jdbcTemplate.queryForInt(sql);
 }
 
 public &lt;T&gt; List&lt;T&gt; query(String dataSourceName, String sql, RowMapper&lt;T&gt; mapper)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  List&lt;T&gt; resutls = jdbcTemplate.query(sql, mapper);
  return resutls;
 }

 public &lt;T&gt; List&lt;T&gt; query(String dataSourceName, String sql, Object[] params,
   RowMapper&lt;T&gt; mapper, int maxRows)
 {
  List&lt;T&gt; resutls = null;
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  jdbcTemplate.setMaxRows(maxRows);
  resutls = jdbcTemplate.query(sql, params, mapper);
  return resutls;
 }

 public &lt;T&gt; T queryForObject(String dataSourceName, String sql, Object[] params,
   RowMapper&lt;T&gt; mapper)
 {
  T result = null;
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  result = jdbcTemplate.queryForObject(sql, params, mapper);
  return result;
 }
 
 public &lt;T&gt; T query(String dataSourceName, String sql, Class&lt;T&gt; requiredClazzType,
   Object[] args) 
   {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  T obj = jdbcTemplate.queryForObject(sql, args, requiredClazzType);
  return obj;
 }
 
 /***************************************************************************
 * QUERY for long and int
 **************************************************************************/ 
 
 public int queryForInt(String dataSourceName, String sql)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  return jdbcTemplate.queryForInt(sql);
 }
 

 public int queryForInt(String dataSourceName, String sql, Object[] params)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  return jdbcTemplate.queryForInt(sql, params);
 }

 public long queryForLong(String dataSourceName, String sql)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  return jdbcTemplate.queryForLong(sql);
 }

 public long queryForLong(String dataSourceName, String sql, List&lt;Object&gt; params)
 {
  JdbcTemplate jdbcTemplate = getJdbcTemplate(dataSourceName);
  return jdbcTemplate.queryForLong(sql, params);
 }

 /***************************************************************************
 * UTILITIES
 **************************************************************************/

 /**
 * get the JdbcTemplate instance that's related to the data source 
 * with the given name
 * 
 * @param dataSourceName the name of the data source
 */
 private JdbcTemplate getJdbcTemplate(String dataSourceName)
 {
  if (!_jdbcTemplates.containsKey(dataSourceName)) 
  {
   addDataSourceToCache(dataSourceName);
  }
  JdbcTemplate jdbcTemplate = new JdbcTemplate(_jdbcTemplates.get(dataSourceName));
  return jdbcTemplate;
 }

 /**
 * add the given data source to the cache of JdbcTemplate's
 * 
 * @param dataSourceName the name of the data source
 */
 private void addDataSourceToCache(String dataSourceName)
 {
  DataSource dataSource = null;
  try 
  {
   if (_jndiContext == null) 
   {
    _jndiContext = new InitialContext();
   }
   dataSource = (DataSource) _jndiContext.lookup(dataSourceName);
  } 
  catch (NamingException e) 
  {
   // TODO handle the exception
  }
  _jdbcTemplates.put(dataSourceName, dataSource);
 }

}
</pre>
