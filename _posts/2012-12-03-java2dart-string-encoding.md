---
layout: post
title: Java2Dart - String Encoding
created: 1354569545
author: oren.kleks
permalink: /java/java2dart-string-encoding
tags:
- JAVA
- JAVA DART Encoding UTF-16
---
<a href="http://www.dartlang.org/">DART</a> language from Google is only in M1 release. However, it is interesting to compare it with Java. This blog entry will compare String encoding in both languages.

In <a href="http://www.java.com/">JAVA</a>, <a href="http://docs.oracle.com/javase/7/docs/api/java/lang/String.html">String</a> class uses encodings intensively. For example its <a href="http://docs.oracle.com/javase/7/docs/api/java/lang/String.html#String%28byte[],%20java.nio.charset.Charset%29">constructors</a> receive a  <a href="http://docs.oracle.com/javase/7/docs/api/java/nio/charset/Charset.html">Charset class</a> , and throws <a href="http://docs.oracle.com/javase/7/docs/api/java/io/UnsupportedEncodingException.html">UnsupportedEncodingException</a> .

<a href="http://www.dartlang.org/">DART</a> way of handling this issue, is far more simple. Its <a href="http://api.dartlang.org/docs/bleeding_edge/dart_core/String.html">String</a> class supports only UTF-16. Clean and simple.
