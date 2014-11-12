---
layout: post
title: Solr 3.6.2 - multi cores doesn't take configured parameters dataDir
created: 1359966333
author: itaip
permalink: /java/solr-362-multi-cores-doesnt-take-configured-parameters-datadir
tags:
- JAVA
- solr java
---
<p>&nbsp;when using solr 3.6.2 and multi core option&nbsp;<a href="http://wiki.apache.org/solr/CoreAdmin">wiki.apache.org/solr/CoreAdmin</a>&nbsp;and you want to config the dataDir location(other wise it will save it in the target and in each deployment you will loose your index! <em>dataDir&nbsp;</em></p>
<pre class="brush: xhtml;" title="code">
&lt;solr persistent=&quot;true&quot;&gt; &lt;cores adminPath=&quot;/admin/cores&quot;&gt;
  &lt;core name=&quot;core0&quot; instanceDir=&quot;core0&quot;&gt;
    &lt;property name=&quot;dataDir&quot; value=&quot;mylocation/data/core0&quot; /&gt;
  &lt;/core&gt;
  &lt;core name=&quot;core1&quot; instanceDir=&quot;core1&quot; /&gt;
     &lt;property name=&quot;dataDir&quot; value=&quot;mylocation/data/core1&quot; /&gt;
 &lt;/cores&gt;
&lt;/solr&gt;</pre>
<p>&nbsp;</p>
<p>well, now i was expected that when i create the SolrCore the data dir will get my propertiy and not the default one...</p>
<p>&nbsp;</p>
<p>the blame is in the <em>CoreContainer.java#create(CoreDescriptor dcore)</em> method.</p>
<p>the only place that initiate the solrCore is the constrocture, and in the create method it pass null in this costroctor... (line 480)</p>
<p>&nbsp;</p>
<p>my solution was to overide the create method and pass the dataDir param:</p>
<pre class="brush: java;" title="code">
     // get the dataDir from properties and pass it to SolrCore (this is the bug!!!)
     String dataDir = dcore.getCoreProperties().getProperty(CoreAdminParams.DATA_DIR, null);
     SolrCore core = new SolrCore(dcore.getName(), dataDir, config, schema, dcore);
     // SolrCore core = new SolrCore(dcore.getName(), null, config, schema, dcore);</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
