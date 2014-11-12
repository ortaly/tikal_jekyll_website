---
layout: post
title: 'junitparams - Parameterised tests for JUnit '
created: 1306038389
author: ittayd
permalink: /java/junitparams-parameterised-tests-junit
tags:
- JAVA
- JUnit
---
<p>http://code.google.com/p/junitparams/</p>
<p>&nbsp;</p>
<p>This project adds a new runner to JUnit and provides much easier and readable parameterised tests for JUnit &gt;=4.5.</p>
<p>&nbsp;</p>
<p>For example:</p>
<pre title="code" class="brush: java;">
@Test
@Parameters({ 
            &quot;17, false&quot;, 
            &quot;22, true&quot; })
public void personIsAdult(int age, boolean valid) throws Exception {
    assertThat(new Person(age).isAdult(), is(valid));
}</pre>
<p>&nbsp;</p>
