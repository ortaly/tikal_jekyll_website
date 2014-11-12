---
layout: post
title: 'automatic unit test generation in #java'
created: 1314163656
author: ittayd
permalink: /automatic-unit-test-generation-java
tags:
- JAVA
- testing
---
<p>In this article I'll go over two Java packages that allow to create specifications for automatic unit test generation.&nbsp;</p>
<p>&nbsp;</p>
<p>What does that mean?&nbsp;It means that instead of creating a unit test, you create a description of the properties that the unit under test must hold. A property is something like &quot;the stack size after push is the size before plus 1&quot;. With regular unit tests we would assert this property by creating a specific test case (say, starting from an empty stack) and doing the operation. But then we might miss some corner cases. For eample, maybe our stack is backed by an array starting at size 10 and we forgot to code the array resizing. Then 'push' will work as expected for the first 10 items, but fail for the 11th. Our simple unit test might not try to push 10 items.</p>
<p>&nbsp;</p>
<p>Instead, we want to specify some basic building blocks and then have many instances generated for us. E.g., with the example above, we would like to describe how to generate a stack from a random list of integers and then write a test that pushes an integer to that stack. While generating some of the stack instances, some will be larger than 10 and the test will fail.</p>
<p>&nbsp;</p>
<p>Note:&nbsp;The original idea for this approach came from a Haskell library named <a href="http://haskell.org/haskellwiki/Introduction_to_QuickCheck">quickcheck</a>.</p>
<p>&nbsp;</p>
<p>The first implementation is <a href="http://java.net/projects/quickcheck/pages/Home">quickcheck</a>. </p>
<pre title="code" class="brush: java;">
for (Pair&lt;Integer, List&lt;Integer&gt;&gt; any : somePairs(integers(), lists(integers()))) {
  Integer element = any.getFirst();
  Collection&lt;Integer&gt; collection = any.getSecond();
   
  boolean changedCollection = false;
  boolean exceptionThrown = false;
  try {
    changedCollection = collection.add(element);
  } catch (Exception e) {
    assertException(e);
    exceptionThrown = true;
  }
  assertTrue(collection.contains(element) != exceptionThrown);
  assertTrue(changedCollection == containsInstance(collection,element));
}

</pre>
<p>literaly it means that for any pair of integer and list, out of randomly generated pairs of integers and lists, it takes the integer and adds to the list and then makes some assertions about the modified collection.</p>
<p>&nbsp;</p>
<p>The arbitrary instances are created by creating instance of Generator class that has a next method for returning a new value.</p>
<p>&nbsp;</p>
<p>Another implementation is the package <a href="http://functionaljava.googlecode.com/svn/artifacts/3.0/javadoc/fj/test/package-summary.html">fj.test</a> of <a href="http://functionaljava.org">functionaljava</a>. It is more complex to understand, but much more powerful as it allows more combinations of properties and generators </p>
<p>&nbsp;</p>
<p>In fj.test, the test creates Property instances that work on arbitrary values. fj.test will then generate many values (100 is the default)&nbsp;and will assert the properties hold. </p>
<p>&nbsp;</p>
<p>Here's an example (from the <a href="https://github.com/functionaljava/functionaljava/tree/master/demo/src/main/fj/demo/test">demo source code</a>) that asserts for LinkedList that l1.addAll(l2)&nbsp;will make l1's size the sum of the previous sizes (the code is verbose and explained below):</p>
<pre title="code" class="brush: java;">
final Property p = property(arbLinkedList(arbInteger), arbLinkedList(arbInteger),
   new F2&lt;LinkedList&lt;Integer&gt;, LinkedList&lt;Integer&gt;, Property&gt;() {
   public Property f(final LinkedList&lt;Integer&gt; x, final LinkedList&lt;Integer&gt; y) {
     final LinkedList&lt;Integer&gt; xy = new LinkedList&lt;Integer&gt;(x);
     xy.addAll(y);
     return prop(xy.size() == x.size() + y.size());
   }
});</pre>
<p>&nbsp;</p>
<p>This reads as follows:&nbsp;creates a property that states that for two arbitrary linked lists, they have the property that the size of adding the two is the sum of sizes.</p>
<p>&nbsp;</p>
<p>Lets disect a bit:</p>
<p>property is a method that accepts two Arbitrary objects and a function (F2 objct with f method) that defines a result property. In this case the result is a boolean assertion</p>
<p>arbLinkedList(arbInteger)&nbsp;creates a linked list of arbitrary size. An Arbitrary&lt;A&gt;&nbsp;object generates arbitrary A values. It does this with a Gen object that generates them. arbInteger will generate arbitrary integers and arbLinkedList will generate a list of arbitrary size filled with those integers</p>
<p>&nbsp;</p>
<p>Here's an example of how to create arbitrary values for your own class (<a href="https://github.com/functionaljava/functionaljava/blob/master/demo/src/main/fj/demo/test/EqualsHashCode.java">taken from here</a>): MyClass is constructed with a byte and a String, so to generate an arbitrary instance, we combine two arbitraries of byte and string with a function that acts as a factory</p>
<pre title="code" class="brush: java;">
final Arbitrary&lt;MyClass&gt; arbMyClass = arbitrary(arbByteR.gen.bind(arbStringR.gen, curry(new F2&lt;Byte, String, MyClass&gt;() {
  public MyClass f(final Byte b, final String s) {
    return new MyClass(b, s);
  }
})));</pre>
<p>&nbsp;</p>
<p>We can then use the arbitrary MyClass to create a Property that asserts the hashCode of two equal instances is the same (note:&nbsp;in order to make sure that of the arbitrary instances that are created, there will be equal ones, the arbitrary MyClass instances are created from a limited set of strings and bytes, hense the arbByteR and arbStringR uses above, the R stands for restrictive)</p>
<pre title="code" class="brush: java;">
final Property p = property(arbMyClass, arbMyClass, new F2&lt;MyClass, MyClass, Property&gt;() {
  public Property f(final MyClass m1, final MyClass m2) {
    return bool(m1.equals(m2)).implies(m1.hashCode() == m2.hashCode());
  }
});</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
