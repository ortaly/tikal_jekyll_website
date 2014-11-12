---
layout: post
title: Cucumber, a BDD framework and cuke4duke integrating it with Java
created: 1253019416
author: ittayd
permalink: /java/cucumber-bdd-framework-and-cuke4duke-integrating-it-java
tags:
- JAVA
- java ruby testing bdd cucumber
---
<p>
<meta content="text/html; charset=utf-8" http-equiv="CONTENT-TYPE">
<meta content="OpenOffice.org 3.1  (Linux)" name="GENERATOR"> 	<style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style>     </meta>
</meta>
</p>
<p style="margin-bottom: 0in;"><font color="#000080"><span lang="zxx"><u><a href="http://www.cukes.info/">Cucumber</a></u></span></font><font color="#000000"> is a </font><font color="#000080"><span lang="zxx"><u><a href="http://en.wikipedia.org/wiki/Behavior_driven_development">BDD</a></u></span></font><font color="#000000"> framework: you define the requirements of your software in plain text and then write tests that &ldquo;execute&rdquo; these requirements against the software. The difference from unit testing and TDD (where you write tests before code) is that the requirements are readable by non-technical people, and thus provide and executable documentation of how the application behaves. So it is not the code that is tested, but the application. For that, cucumber has integration with frameworks for in browser testing, httpunit <a href="http://wiki.github.com/aslakhellesoy/cucumber">etc</a>. (see the <a href="http://github.com/aslakhellesoy/cucumber">cucumber source</a> for many examples)</font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><font color="#000000">Cucumber is written in Ruby, it is interesting to note that it started as a port of a Java framework named </font><font color="#000080"><span lang="zxx"><u><a href="http://jbehave.org/">Jbehave</a></u></span></font><font color="#000000">. The benefits of using Ruby is that tests are easy to write and the wealth of testing packages for testing various GUI frameworks. Using Jruby, one can write tests in Ruby that interact with Java classes (see example <a href="http://github.com/aslakhellesoy/cucumber/blob/master/examples/java">here</a>)</font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><font color="#000000">Now cucumber comes full circle with cuke4duke, a bridge of cucumber to other languages on the JVM. </font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><font color="#000000">The project allows to run cucumber tests from an Ant or Maven build (read relevant documentation <a href="http://wiki.github.com/aslakhellesoy/cuke4duke/ant">here</a> and <a href="http://wiki.github.com/aslakhellesoy/cuke4duke/maven">here</a>). It also has API to write the tests in Java. <a href="http://wiki.github.com/aslakhellesoy/cuke4duke/spring">Spring</a> integration is also available.</font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;"><font color="#000000">The classic cucumber example for testing is  one of a <a href="http://github.com/aslakhellesoy/cucumber/tree/master/examples/i18n/en">calculator</a>. </font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Here are the requirements from a calculator (defined in features/addition.feature)</p>
<pre>
Feature: Addition</pre>
<div dir="LTR" id="LC2">
<pre>
&nbsp;&nbsp;In order to avoid silly mistakes</pre>
</div>
<div dir="LTR" id="LC3">
<pre>
&nbsp;&nbsp;As a math idiot </pre>
</div>
<div dir="LTR" id="LC4">
<pre>
&nbsp;&nbsp;I want to be told the sum of two numbers</pre>
</div>
<div dir="LTR" id="LC5">
<pre>
&nbsp;</pre>
</div>
<div dir="LTR" id="LC6">
<pre>
&nbsp;&nbsp;Scenario Outline: Add two numbers</pre>
</div>
<div dir="LTR" id="LC7">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;Given I have entered &lt;input_1&gt; into the calculator</pre>
</div>
<div dir="LTR" id="LC8">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;And I have entered &lt;input_2&gt; into the calculator</pre>
</div>
<div dir="LTR" id="LC9">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;When I press add</pre>
</div>
<div dir="LTR" id="LC10">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;Then the result should be &lt;output&gt; on the screen</pre>
</div>
<div dir="LTR" id="LC11">
<pre>
&nbsp;</pre>
</div>
<div dir="LTR" id="LC12">
<pre>
&nbsp;&nbsp;Examples:</pre>
</div>
<div dir="LTR" id="LC13">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;| input_1 | input_2 | output |</pre>
</div>
<div dir="LTR" id="LC14">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;| 20      | 30      | 50     |</pre>
</div>
<div dir="LTR" id="LC15">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;| 2       | 5       | 7      |</pre>
</div>
<div dir="LTR" id="LC16">
<pre>
&nbsp;&nbsp;&nbsp;&nbsp;| 0       | 40      | 40     |</pre>
</div>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Note how the requirements do not define whether the calculator is tested as a service (API), GUI app or web app. (other requirements may specify that).</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The step definition (first in Ruby) however, needs to know that (in this case testing a simple class):</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">require</font><font color="#2a00ff"> 'spec/expectations'</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">require</font><font color="#2a00ff"> 'cucumber/formatter/unicode'</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">require</font><font color="#2a00ff"> 'calculator'</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">Before</font><font color="#a4357a"><b> do</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#004080">&nbsp;&nbsp;  <font face="Monospace"><font size="2"><b>@calc</b></font><font color="#000000"> = Calculator.new</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#a4357a"><font face="Monospace"><font size="2"><b>end</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">Given</font><font color="#5a1ea0"> /I have entered (\d+) into the calculator/</font><font color="#a4357a"><b> do</b></font><font color="#000000"> |n|</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#004080">&nbsp;&nbsp;  <font face="Monospace"><font size="2"><b>@calc</b></font><font color="#000000">.push n.to_i</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#a4357a"><font face="Monospace"><font size="2"><b>end</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">When</font><font color="#5a1ea0"> /I press (\w+)/</font><font color="#a4357a"><b> do</b></font><font color="#000000"> |op|</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#004080">&nbsp;&nbsp;  <font face="Monospace"><font size="2"><b>@result</b></font><font color="#000000"> =</font><font color="#004080"><b> @calc</b></font><font color="#000000">.send op</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#a4357a"><font face="Monospace"><font size="2"><b>end</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">Then</font><font color="#5a1ea0"> /the result should be (.*) on the screen/</font><font color="#a4357a"><b> do</b></font><font color="#000000"> |result|</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#004080">&nbsp;&nbsp;  <font face="Monospace"><font size="2"><b>@result</b></font><font color="#000000">.should == result.to_f</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#a4357a"><font face="Monospace"><font size="2"><b>end</b></font></font></font></p>
<pre>
&nbsp;</pre>
<p style="margin-bottom: 0in;">Cucumber will iterate over each example in the requirements and feed the values to the Given, When and Then sections.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Note that in this example, the calculator is written to be perfect for the test because we push two numbers and then send the operator. If on the other hand the calculator would have had only an add(num1,num2) method, then the test would have saved the values in local variables and invoke the method in the Then clause.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">At this point we can use Cucumber to test Java code by running it with Jruby.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">If we want to write the test in Java, then we create a Java file in src/test/java:</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>class</b></font><font color="#000000"> CalculatorSteps{</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>private</b></font><font color="#000000"> Calculator </font><font color="#0000c0">calc</font><font color="#000000">;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>private</b></font><font color="#000000"> String </font><font color="#0000c0">result</font><font color="#000000">;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#646464">@Before</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>void</b></font><font color="#000000"> setup() {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;        </font><font face="Monospace"><font size="2"><font color="#0000c0">calc</font><font color="#000000"> = </font><font color="#7f0055"><b>new</b></font><font color="#000000"> Calculator();</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    <font face="Monospace"><font size="2">}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#646464">@Given</font><font color="#000000">(</font><font color="#2a00ff">&quot;I have entered (\\d+) into the calculator&quot;</font><font color="#000000">)</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>void</b></font><font color="#000000"> enterNumber(</font><font color="#7f0055"><b>int</b></font><font color="#000000"> n) {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;        </font><font face="Monospace"><font size="2"><font color="#0000c0">calc</font><font color="#000000">.push(n);</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    <font face="Monospace"><font size="2">}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#646464">@When</font><font color="#000000">(</font><font color="#2a00ff">&quot;I press (\\w+)&quot;</font><font color="#000000">)</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>void</b></font><font color="#000000"> calculate(String op) {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp; &nbsp;&nbsp;        </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>if</b></font><font color="#000000"> (</font><font color="#2a00ff">&quot;add&quot;</font><font color="#000000">.equals(op)) {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp; &nbsp; &nbsp;            </font><font face="Monospace"><font size="2"><font color="#0000c0">result</font><font color="#000000"> = String.</font><font color="#000000"><i>valueOf</i></font><font color="#000000">(</font><font color="#0000c0">calc</font><font color="#000000">.add());</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp; &nbsp; &nbsp;            </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>return</b></font><font color="#000000">;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp; &nbsp;&nbsp;        <font face="Monospace"><font size="2">}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp; &nbsp;&nbsp;        </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>throw</b></font><font color="#000000"> </font><font color="#7f0055"><b>new</b></font><font color="#000000"> RuntimeException(</font><font color="#2a00ff">&quot;Unknown operator &quot;</font><font color="#000000"> + op);</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    <font face="Monospace"><font size="2">}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#646464">@Then</font><font color="#000000">(</font><font color="#2a00ff">&quot;the result should be (.*) on the screen&quot;</font><font color="#000000">)</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    </font><font face="Monospace"><font size="2"><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>void</b></font><font color="#000000"> checkResult(String n) {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;        </font><font face="Monospace"><font size="2"><font color="#000000"><i>assertEquals</i></font><font color="#000000">(n, </font><font color="#0000c0">result</font><font color="#000000">);</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000">&nbsp;&nbsp;    <font face="Monospace"><font size="2">}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">}</font></font></font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><font color="#000000">Some notes abou Maven:</font></p>
<ul>
    <li><font color="#000000">The dependencies on cucumber related packages are defined in the 'test' scope (the documentation lists them as regular dependencies)</font></li>
    <li>
    <p style="margin-bottom: 0in;"><font color="#000000">To work with other Ruby testing frameworks, their gems should be installed. Ruby gems are packages much like rpm or deb that can be installed site-wide so they become available to other packages. To add gems, use &lt;gems&gt; list in the plugin configuration. For example, to use <a href="http://celerity.rubyforge.org/">Celerity</a> (a jruby 	wrapper around HttpUnit), add:</font></p>
    </li>
</ul>
<p style="margin-bottom: 0in;"><font color="#000000">	&lt;gems&gt;</font></p>
<p style="margin-bottom: 0in;"><font color="#000000">                 &lt;gem&gt;celerity:0.0.7&lt;/gem&gt;</font></p>
<p style="margin-bottom: 0in;"><font color="#000000">            &lt;/gems&gt;</font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
