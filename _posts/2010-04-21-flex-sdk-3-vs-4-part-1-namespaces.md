---
layout: post
title: Flex SDK 3 Vs. 4 - Part 1 - Namespaces
created: 1271828134
author: sefi
permalink: /js/flex-sdk-3-vs-4-part-1-namespaces
tags:
- JS
- Spark
- namespace
- MX
- flex 4
- flex 3
- flex
- comparison
---
<p>Flex 4 added some namespaces, while it still supports the Flex 3 namespaces. This can cause some confusion, more so since some classes are part of two namespaces.</p>
<p>&nbsp;</p>
<p>While Flex3 used only one namespace (xmlns:mx=&quot;http://www.adobe.com/2006/mxml&quot;), Flex4 uses 3 namespaces:<br />
xmlns:fx=&quot;http://ns.adobe.com/mxml/2009&quot;<br />
xmlns:s=&quot;library://ns.adobe.com/flex/spark&quot;<br />
xmlns:mx=&quot;library://ns.adobe.com/flex/mx&quot;<br />
Note, that while there's still a mx namespace, the URI is different.</p>
<p>&nbsp;</p>
<p>Each namespaces defines a component set. The old Flex3 mx namespace is still active but if you use it Flex 4 features will not be available.</p>
<p>&nbsp;</p>
<p>The fx:namespace includes top-level AS building blocks such as Object, Array etc. but does not include any of the mx or spark component sets. It also includes some mxml tags, like &lt;fx:script&gt;, &lt;fx:style&gt; and &lt;fx:declarations&gt;.</p>
<p>&nbsp;</p>
<p>The new mx: namespace includes all of the components in the Flex mx.* packages, the Flex charting components, and the Flex data visualization components.</p>
<p>&nbsp;</p>
<p>The s: namespace includes all of the components in the Flex spark.* packages and the text framework classes in the flashx.* packages.<br />
It also includes a subset of the mx: namespace such as the RPC classes for the WebService, HTTPService, and RemoteObject components and additional classes to support the RPC components as well as several graphics, effect, and state classes from the mx.* packages.</p>
<p>&nbsp;</p>
<p><a href="http://www.tikalk.com/flex/flex-sdk-3-vs-sdk-4">Back to index</a></p>
<p>&nbsp;</p>
