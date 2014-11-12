---
layout: post
title: Scala 2.9 RC1 released
created: 1301214386
author: ittayd
permalink: /incubator/scala-29-rc1-released
tags:
- Incubator
- Scala
---
<p>http://www.scala-lang.org/node/8976</p>
<p>&nbsp;</p>
<p>The main feature is the addition of parallel collections to the standard library:</p>
<p>&quot;</p>
<p>Every collection may be converted into a corresponding parallel collection with the new `<span style="font-family: 'Courier New';">par</span>` method. Parallel collections utilize multicore processors by implementing bulk operations such as `<span style="font-family: 'Courier New';">foreach</span>`, `<span style="font-family: 'Courier New';">map</span>`, `<span style="font-family: 'Courier New';">filter</span>` etc. in parallel. Parallel collections are located in the package `<span style="font-family: 'Courier New';">scala.collection.parallel</span>`.</p>
<p>Depending on the collection in question, `<span style="font-family: 'Courier New';">par</span>`  may require copying the underlying dataset to create a parallel  collection. However, specific collections share their underlying dataset  with a parallel collection, making `par` a constant time operation.</p>
<p>Currently available parallel collections are:</p>
<ul>
    <li>parallel arrays - <span style="font-family: 'Courier New';">scala.collection.parallel.mutable.ParArray</span></li>
    <li>parallel ranges - <span style="font-family: 'Courier New';">scala.collection.parallel.immutable.ParRange</span></li>
    <li>parallel hash maps - <span style="font-family: 'Courier New';">scala.collection.parallel.mutable.ParHashMap</span></li>
    <li>parallel hash sets - <span style="font-family: 'Courier New';">scala.collection.parallel.mutable.ParHashSet</span></li>
    <li>parallel hash tries - <span style="font-family: 'Courier New';">scala.collection.parallel.immutable.{ParHashMap, ParHashSet}</span></li>
    <li>parallel vectors - <span style="font-family: 'Courier New';">scala.collection.parallel.immutable.ParVector</span></li>
</ul>
<p>The method `<span style="font-family: 'Courier New';">seq</span>`  is used to convert from a parallel collection to a corresponding  sequential collection. This method is always efficient (O(1)).</p>
<p>&quot;</p>
