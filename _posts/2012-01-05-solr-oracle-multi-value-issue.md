---
layout: post
title: Solr-Oracle Multi Value Issue
created: 1325773824
author: itaip
permalink: /solr-oracle-multi-value-issue
tags:
- JAVA
- solr
- oracle
---
<p>&nbsp;Hi</p>
<p>&nbsp;</p>
<p>I'm &nbsp;trying to create Solr index from oracle db.</p>
<p>the trick is that i'm using multivalue field in solr, and expect from solr to split the value to multi value field.</p>
<p>here is my data-config.xml</p>
<pre title="code" class="brush: xhtml;">
&lt;document name=&quot;doc&quot;&gt;           
            &lt;entity name=&quot;EBAYSE_CORE&quot; transformer=&quot;RegexTransformer&quot;
                      query=&quot;SELECT id,value1 FROM multivalue&quot; &gt;

                &lt;field column=&quot;id&quot; name=&quot;id&quot; /&gt;
                &lt;field column=&quot;value1&quot; name=&quot;value1&quot; splitBy=&quot;\;&quot; /&gt;

            &lt;/entity&gt;
        &lt;/document&gt;</pre>
<p>here is the schema.xml:</p>
<pre title="code" class="brush: xhtml;">
 &lt;field name=&quot;id&quot; type=&quot;string&quot; indexed=&quot;true&quot; stored=&quot;true&quot; required=&quot;true&quot;/&gt;
        &lt;field name=&quot;value&quot; type=&quot;text_en&quot; indexed=&quot;true&quot; stored=&quot;true&quot; required=&quot;false&quot; multiValued=&quot;true&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>and here is a data sample:</p>
<pre title="code" class="brush: java;">
id         value1
1	iphone4;iphone3
2	itai;ram;tomer;vladi
3	test1;test2;test3</pre>
<p>&nbsp;</p>
<p>when indexing the data i get the values as one row instead of seperate by ';'&nbsp;</p>
<p>any ideas?</p>
<p>&nbsp;</p>
<p>Note: with mySQL wit works fine, as expexted.</p>
<p>&nbsp;</p>
<p>thanks</p>
<p>Itai</p>
<p>&nbsp;</p>
