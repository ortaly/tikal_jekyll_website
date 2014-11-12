---
layout: post
title: Annotaed Bean(s) Dependency Analyzer
created: 1300665259
author: dmitri
permalink: "/java/annotaed-beans-dependency-analyzer"
tags:
- JAVA
- Spring
- jgraph
- graph
- dependency
- beans
- annotation
- analyzer
---
<p>For a client I had to implement spring based startup module. The module's context xml file simply defines annotation-config and component-scan element and doesn't define any bean. When I&nbsp;add 50-th bean into the module, I reliazed I&nbsp;can't manage dependencies without painting them anymore.</p>
<p>&nbsp;</p>
<p>The fast search had lead to 3 nice tools: SpringSource Tool Suite, BeanDoc and Maia EAP. Each one of them may analyze dependencies and may paint them. But no one of them may deal with annotations.</p>
<p>&nbsp;</p>
<p>Annotated Bean(s) Dependency Analyzer scans folders and paints dependencies of every discovered spring bean. Behind the scene, the spring is doing the hard work.</p>
<pre title="code" class="brush: java;">
public class ContextProcessor {
    private final HashMap&lt;String, Bean&gt; beanMap;
    private final ClassPathBeanDefinitionScanner scanner;

    public ContextProcessor() {
        beanMap = new HashMap&lt;String, Bean&gt;();
        scanner = new ClassPathBeanDefinitionScanner(
new AnnotationConfigApplicationContext());
    }

    public void process(String ... basePackages)
throws Exception{
        scanner.scan(basePackages);

...

}
</pre>
<p>&nbsp;</p>
<p>For the source code, please see <a href="http://git.tikalk.com/a-bean-soup">http://git.tikalk.com/a-bean-soup</a> project page at Tikal Git space.</p>
<p>&nbsp;</p>
