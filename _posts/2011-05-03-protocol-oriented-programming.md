---
layout: post
title: Protocol Oriented Programming
created: 1304435063
author: ittayd
permalink: /protocol-oriented-programming
tags:
- design
---
<p>A while back I&nbsp;was doing a project in Ruby. I&nbsp;knew Ruby very well, all the insides and outs of classes, mixins, singleton classes etc. And yet, I&nbsp;felt something was missing in how I&nbsp;coded in Ruby.</p>
<p>&nbsp;</p>
<p>I&nbsp;came to the conclusion the reason of my poor Ruby design was my prior experience in statically typed languages. When I&nbsp;came to code in Ruby, I&nbsp;used the same concepts I&nbsp;already knew to build a type hierarchy of classes. But because Ruby is not statically typed, this hierarchy served little purpose. </p>
<p>&nbsp;</p>
<p>Lets see an example of a ruby code:</p>
<pre title="code" class="brush: ruby;">
def printName(person)
   puts &quot;Name is #{person.name}&quot;
end
</pre>
<pre title="code" class="brush: ruby;">

</pre>
<p>For the statically typed mind, this suggest that printName accepts a Person class with a name attribute. However, what it actually accepts is anything with a name method. If other methods of the person argument are used, this adds more constraints on what kind of object can be passed to personName. More arguments mean more constraints.</p>
<p>&nbsp;</p>
<p>What is important to note is that all these constraints are not on type. They are on a protocol. There is a protocol in printName for how its arguments should behave. There's nothing to do with types. </p>
<p>&nbsp;</p>
<p>Looking at it from this point of view, we should not design methods to accepts arguments of a certain type, but of a certain behavior. We might change printName to accept a 'nameable' argument instead of person to reflect that. In a statically typed language this would be analogous to define an interface for every bit of behavior (e.g., a Nameable interface to get a name)&nbsp;and then define classes according to what interfaces they implement. Only this would be very verbose and time consuming to do. </p>
<p>&nbsp;</p>
<p>So if arguments are defined not by type, but by their protocol&nbsp;(behavior). What is the use of classes?&nbsp;For example, this method:</p>
<pre title="code" class="brush: ruby;">
def printNameAndAge(withNameAndAge) 
  puts &quot;Name: #{withNameAndAge.name}, Age: #{withNameAndAge.name}&quot; 
end</pre>
<p>&nbsp;</p>
<p>Can instead be defined as:</p>
<pre title="code" class="brush: ruby;">
def printNameAndAge(name, age)
  puts &quot;Name: #{name}, Age: #{age}&quot;
end</pre>
<p>&nbsp;</p>
<p>The latter versions seems more general. So why use classes (types)?</p>
<p>&nbsp;</p>
<p>One reason is implementation. If I&nbsp;have several behaviors (methods/functions) working on the same state data, it is easier to group all of it in a class. If I want to reuse code then inheritance is sometimes easier. </p>
<p>&nbsp;</p>
<p>Another reason is identity. Accepts a 'withNameAndAge' instead of 'name' &amp;&nbsp;'age', means that the method may use the argument itself as an identifier to the two values 'name' and 'age'.</p>
<p>&nbsp;</p>
<p>So, when coding in a dynamic language, one should not concentrate on types, but on behaviour. Define what a method expects from its arguments. Classes and inheritance are then used mainly as a way of code reuse and modularity but are less important in themselves. </p>
