---
layout: post
title: quickcheck
created: 1306226704
author: ittayd
permalink: /java/quickcheck
tags:
- JAVA
- testing
---
<p>http://java.net/projects/quickcheck/pages/Home</p>
<p>&nbsp;</p>
<p>In many cases when we write tests we create dummy data for the test. E.g., <em>new Person(&quot;Ittay Dror&quot;, 37) </em>.  The problem is that while the test may pass for this data, we can't be  sure it works for any data (what happens if a person's age is 0 (a  newborn)?). This is worse if the tested code involves algorithms, which  in many cases have corner cases that we may not be aware of.</p>
<p>&nbsp;</p>
<p>QuickCheck provides utility methods to generate values for our test.  Then we simply embed the test inside a foreach loop of these values.</p>
<p>&nbsp;</p>
<p>See more details in the site.</p>
