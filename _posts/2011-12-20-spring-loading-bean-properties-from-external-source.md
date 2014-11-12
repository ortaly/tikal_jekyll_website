---
layout: post
title: Spring - Loading bean properties from external source.
created: 1324395130
author: danny
permalink: /spring-loading-bean-properties-external-source
tags:
- JAVA
- Spring
---
<p>&nbsp;Sometimes, when we using Spring we need to define beans such as dataSource or taskExecutor and  pass its parameters as properties. In our example  we will create new <em>ThreadPoolTaskExecutor</em> which will be used as thread pool for our tasks.</p>
<p>&nbsp;</p>
<p>Basic configuration for such bean is very straight forward:</p>
<p>&nbsp;</p>
<p><font color="#008080"><font face="Monospace"><font size="2">&lt;</font></font></font><font color="#3f7f7f"><font face="Monospace"><font size="2">bean</font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">id</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;taskExecutor&quot;</i></font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">class</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor&quot;</i></font></font></font><font color="#008080"><font face="Monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;corePoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;5&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;maxPoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;10&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;queueCapacity&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;25&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in">This example creates thread pool with minimum of 5 threads maximum 10 threads and queue capacity of 25.</p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p>Sometimes (and Spring allows us to do it as &ldquo;out of the box&rdquo; functionality)it might be very useful to declare those values explicitly in external properties file. It could be easily achieved by using  <em>PropertyPlaceholderConfigurer</em> class</p>
<p>&nbsp;</p>
<p>Let's see the example:</p>
<p>&nbsp;</p>
<p><font color="#008080"><font face="Monospace"><font size="2">&lt;</font></font></font><font color="#3f7f7f"><font face="Monospace"><font size="2">bean</font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">id</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;taskExecutor&quot;</i></font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">class</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor&quot;</i></font></font></font><font color="#008080"><font face="Monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;corePoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${corePoolSize}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;maxPoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${maxPoolSize}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	  </font><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;queueCapacity&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${queueCapacity}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#3c3c3c">	</font><font color="#008080">&lt;/</font><font color="#3f7f7f">bean</font><font color="#008080">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font color="#008080"><font face="Monospace"><font size="2">&lt;</font></font></font><font color="#3f7f7f"><font face="Monospace"><font size="2">bean</font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">class</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;c</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>org.</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>spring</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>framework.beans</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>.</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>factory.config</i></font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>.PropertyPlaceholderConfigurer&quot;</i></font></font></font><font color="#008080"><font face="Monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#3c3c3c">    </font><font face="Monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>location</i></font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>&gt;</i></font> </font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2">&lt;<font color="#7f007f">value</font><font color="#3c3c3c">&gt;</font><font color="#2a00ff"><i>pool.properties</i></font><font color="#008080"><i>&lt;/value&gt;</i></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#008080">    </font><font face="Monospace"><font size="2"><font color="#008080"><i>&lt;/property&gt;</i></font></font></font></p>
<p>&nbsp;</p>
<p style="margin-bottom: 0in">or even if we are using Spring version 2.5  or older we can configure it using context namespace</p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p><font color="#000000"><font size="2">&lt;<font color="#3f7f7f">context:property-placeholder</font> <font color="#7f007f">location</font>=<font color="#2a00ff">&quot;pool.properties&quot;</font>/&gt; </font></font></p>
<p>&nbsp;</p>
<p><font color="#000000"><font size="2"> </font></font>and our pool.properties file looks like this:&nbsp;</p>
<p><i style="font-size: small; font-family: monospace; color: rgb(42, 0, 255); ">corePoolSize = 5</i></p>
<p><font color="#2a00ff"><font face="Monospace"><font size="2"><i>maxPoolSize = 10</i></font></font></font></p>
<p><i style="font-size: small; font-family: monospace; color: rgb(42, 0, 255); ">queueCapacity = 25</i></p>
<p>&nbsp;</p>
<p>Well. So far so good, but recently, working on external plug-in for Jboss application on one of our customers project, I've had the following challenge: &nbsp;</p>
<p>&nbsp;</p>
<p>All properties values are centralized and stored in external database table. So what I needed to do is to fetch all those relevant properties values from database and pass it to <em>ThreadPoolTaskExecutor</em> bean in Spring ApplicationContext.xml.</p>
<p>After reading some documentation and playing with code I've found that <em>PropertyPlaceHolderConfigurer</em> extends abstract class <em>PropertiesLoaderSupport</em>&nbsp;and protected void loadProperties(Properties props) call from super class. Therefore, the trick is very simple. We will extend our class from <em>PropertyPlaceHolderConfigurer</em>&nbsp;and override <em>loadProperties</em> function where  properties are retrieved using <em>JdbcTemplate</em>.</p>
<p>&nbsp;</p>
<p>The code in such case looks like this:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public class ThreadPoolPropertyPlaceholderConfigurer extends
		PropertyPlaceholderConfigurer {

           private JdbcTemplate jdbcTemplate;
      private String nameColumn;
      private String valueColumn;
      private String tableName;

	public ThreadPoolPropertyPlaceholderConfigurer(){
		super();
		setPlaceholderPrefix(&quot;${&quot;);
	}
	
	@Override
	  protected void loadProperties(final Properties props) throws IOException {
	    if (null == props) {
	      throw new IOException(&quot;No properties passed by Spring framework - cannot proceed&quot;);
	    }
	 String sql = String.format(&quot;select %s, %s from %s&quot;, nameColumn, valueColumn, propertiesTable);
           log.info(&quot;Reading configuration properties from database&quot;);
           try {
           jdbcTemplate.query(sql, new RowCallbackHandler() {
      public void processRow(ResultSet rs) throws SQLException {
       String name = rs.getString(nameColumn);
       String value = rs.getString(valueColumn);
               if (null == name || null == value) {
		 throw new SQLException(&quot;Configuration database contains empty data. Name='&quot; + name + &quot;' Value='&quot; + value + &quot;'&quot;);
		}
              props.setProperty(name, value);
        }
         });
       } catch (Exception e) {
     log.fatal(&quot;There is an error in either 'application.properties' or the configuration database.&quot;);
     throw new IOException(e);
        }
     if (props.size() == 0) {
    log.fatal(&quot;The configuration database could not be reached or does not contain any properties in '&quot; + propertiesTable + &quot;'&quot;);
   }	    
	}
  //all setters omitted.
}<span style="background-color: transparent; font-size: 10pt; font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; color: rgb(0, 0, 0); line-height: 0.19in; text-align: left; ">  </span><br /></pre>
<p><font color="#008080"><font face="Monospace"><font size="2">&lt;</font></font></font><font color="#3f7f7f"><font face="Monospace"><font size="2">bean</font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">id</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;threadPoolProperties&quot;</i></font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">class</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;com.vanilla.ThreadPoolPropertyPlaceHolderConfigurer&quot;</i></font></font></font><font color="#008080"><font face="Monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &nbsp;&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;nameColumn&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;name</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &nbsp;&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;valueColumn&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>value</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &nbsp;&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;tableName&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;someTableName</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font><font color="#008080" face="monospace" size="2"><br />
</font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &nbsp;&lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;jdbcTemplate&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;someJdbcTemplate</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p><font color="#008080" style="font-size: small; font-family: monospace; ">&lt;/</font><font color="#3f7f7f" style="font-size: small; font-family: monospace; ">bean</font><font color="#008080" style="font-size: small; font-family: monospace; ">&gt;</font></p>
<p><span style="background-color: transparent; font-size: 10pt; font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; color: rgb(0, 0, 0); line-height: 0.19in; text-align: left; ">As the parameters to this bean we pass the following properties:</span></p>
<p>&nbsp;</p>
<p><span style="background-color: transparent; font-size: 10pt; font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; color: rgb(128, 0, 0); line-height: 0.19in; text-align: left; ">* ignoreUnresolvablePlaceholders &ndash; whether we will swallow exception on unknown placeholder.</span></p>
<p><code class="western"><font color="#800000"><font face="Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"><font size="2" style="font-size: 10pt"><span style="background: transparent">* nameColumn &ndash; column name for the properties key values:</span></font></font></font></code></p>
<p><code class="western"><font color="#800000"><font face="Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"><font size="2" style="font-size: 10pt"><span style="background: transparent">* valueColumn &ndash; values for those keys.</span></font></font></font></code></p>
<p><code class="western"><font color="#800000"><font face="Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"><font size="2" style="font-size: 10pt"><span style="background: transparent">* TableName &ndash; table where all these properties stored.&nbsp;</span></font></font></font></code></p>
<p>&nbsp;</p>
<p><span style="background-color: transparent; font-size: 10pt; font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; color: rgb(0, 0, 0); line-height: 0.19in; text-align: left; ">Let's declare our ThreadPoolTaskExecutor:</span></p>
<p>&nbsp;</p>
<p style="margin-bottom: 0in"><font color="#008080"><font face="Monospace"><font size="2">&lt;</font></font></font><font color="#3f7f7f"><font face="Monospace"><font size="2">bean</font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">id</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;taskExecutor&quot;</i></font></font></font><font face="Monospace"><font size="2"> </font></font><font color="#7f007f"><font face="Monospace"><font size="2">class</font></font></font><font color="#3c3c3c"><font face="Monospace"><font size="2">=</font></font></font><font color="#2a00ff"><font face="Monospace"><font size="2"><i>&quot;org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor&quot;</i></font></font></font><font color="#008080"><font face="Monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;corePoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${corePoolSize}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;maxPoolSize&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${maxPoolSize}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Monospace"><font size="2"><font color="#008080">&nbsp; &nbsp; &lt;</font><font color="#3f7f7f">property</font> <font color="#7f007f">name</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;queueCapacity&quot;</i></font> <font color="#7f007f">value</font><font color="#3c3c3c">=</font><font color="#2a00ff"><i>&quot;</i></font><font color="#2a00ff"><i>${queueCapacity}</i></font><font color="#2a00ff"><i>&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
<p><font color="#008080" style="font-size: small; font-family: monospace; ">&lt;/</font><font color="#3f7f7f" style="font-size: small; font-family: monospace; ">bean</font><font color="#008080" style="font-size: small; font-family: monospace; ">&gt;</font></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
