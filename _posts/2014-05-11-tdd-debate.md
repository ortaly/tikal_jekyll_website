---
layout: post
title: TDD Debate
created: 1399809170
author: oren.kleks
permalink: "/java/tdd_debate"
tags:
- JAVA
- TDD Software
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">I have just saw the great </span><a href="http://youtu.be/z9quxZsLcfo" style="text-decoration:none;"><span style="color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">hangout &quot; Is TDD dead? &quot;</span></a><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">. The debate was inspired by</span><a href="http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html" style="text-decoration:none;"><span style="color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;"> blog post</span></a><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">.</span></span></span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">All participants in the hangout &nbsp;agreed that testing is a critical practice in software development. </span></span></span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The disagreement were on whether TDD is useful.</span></span></span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">1. Why should developers start their work in a state where test fails? </span></span></span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">2. TDD require Isolation between software modules. This might cause:</span></span></span></span></p>

<ul style="margin-top:0pt;margin-bottom:0pt;">
	<li dir="ltr" style="list-style-type: disc; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline;">
	<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Bad design decisions (developers might design a system which is easy to test, &nbsp;but not wrong to use) </span></span></span></span></p>
	</li>
	<li dir="ltr" style="list-style-type: disc; font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline;">
	<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Extensive mocking - complex mocking is a huge effort to develop and maintain. </span></span></span></span></p>
	</li>
</ul>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">3. Test must be executed in reasonable time, in order to be useful. It does not matter what is the isolation and boundaries of the test as long as it is executed in reasonable time. &nbsp;Test can include file system, database of services with high latency</span></span></span></span></p>

<p><br />
<span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><span id="docs-internal-guid-e4ce2584-eb19-0506-4434-7651335eb5bc"><span style="color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">My favorite part of the discussion was that Kent Back mentioned in the beginning of the conversation is that every software should have input and output. TDD make sure that you give focus to this basic requirement.</span></span></span></span></p>

<p><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:14px;"><font color="#000000"><span style="white-space: pre-wrap;">To sum up, my conculsion from the discussion is that TDD is here to stay. It may not be suitable for every project, but once it is - it will give great value. </span></font></span></span></p>
