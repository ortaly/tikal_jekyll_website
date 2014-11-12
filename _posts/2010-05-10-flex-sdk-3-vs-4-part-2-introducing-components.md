---
layout: post
title: Flex SDK 3 Vs. 4 – Part 2 – Introducing Components
created: 1273491796
author: sefi
permalink: /js/flex-sdk-3-vs-4-–-part-2-–-introducing-components
tags:
- JS
---
<div class="snap_preview">
<p>While the Flex 4 SDK includes the MX  component architecture provided with previous releases of the Flex SDK  (mainly for backwards compatibility), it introduces a new set of  components that utilize the new SDK features, named Spark.</p>
<p>&nbsp;</p>
<p>In most cases, the changes between Spark and MX components are not  visible, but rather involve the component&rsquo;s interaction with the Flex 4  frameworks (i.e. layouts, skins, states etc).</p>
<p>&nbsp;</p>
<p>In Spark architecture, Visual components are &quot;split&quot; up to several  classes. For example, the Button class in Flex 3 is built up of Button  class and in addition the ButtonSkin class in Flex 4. Components are  typically contained in the spark.* package, while skin classes are  typically contained in the spark.skins.* package.</p>
<p>&nbsp;</p>
<p>The Spark component architecture is probably the most significant new  feature introduced with Flex 4. The main reason was to provide a  well-defined separation between the component's functional logic and  visualization logic. As mentioned above, Spark components are built up  of two classes to support this separation of logic: an AS class for the  component functional logic and an MXML skin class for the visualization  logic.</p>
<p>&nbsp;</p>
<p>This allows us to either override the component functional logic and  keep the visualization, override the visualization logic and keep it's  functionality, or override both. Also, being able to define skin in MXML  is a great improvement over Flex 3.</p>
<p>&nbsp;</p>
<p>The fact that the Spark components are build on MX base classes means  that the same component lifecycle applies and we can mix MX and Spark  components in the same application (see attached code samples).</p>
<p>&nbsp;</p>
<p>Spark components <em>should</em> work within MX containers and MX  components <em>should</em> work within Spark containers.</p>
<p>&nbsp;</p>
<p>Some caveats:<br />
A Spark container cannot be the direct child of a MX navigator. To use a  Spark container as the child of a navigator, it must be wrapped in  either a MX container or a Spark NavigatorContent container.</p>
<p>All Spark components require FP 10, so if your application makes use  of Spark components, your users will have to use FP 10.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><a href="http://www.tikalk.com/flex/flex-sdk-3-vs-sdk-4">Back to index</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
