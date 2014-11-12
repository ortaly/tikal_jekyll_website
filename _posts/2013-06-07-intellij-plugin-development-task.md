---
layout: post
title: IntelliJ Plugin Development- TASK
created: 1370604505
author: oren.kleks
permalink: intellij-plugin-development-task
tags:
- JAVA
- Intellij plugin Swing java
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">I have just developed a plugin for intelliJ. IntelliJ idea is a stable and rich environment. It was joy to find all my client favorites libraries in the environment, such as </span><a href="http://www.miglayout.com" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">MigLayout</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"> , &nbsp;</span><a href="https://code.google.com/p/guava-libraries/" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Google Guava</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"> (with it&rsquo;s event bus) , </span><a href="http://www.jgoodies.com/" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">JGoodies </span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">and more.</span></span></p>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Idea got a wiki site which describes how to set up a </span><a href="http://confluence.jetbrains.com/display/IDEADEV/PluginDevelopment" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">development environment</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">. The project is open source, and the code can be retrieved from </span><a href="http://www.jetbrains.org/pages/viewpage.action?pageId=983225" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">GIT repository</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">.</span></span></p>
<p>&nbsp;</p>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">In this blog I will describe the Task class of Intellij IDEA Task components. We are all familiar with SwingWorker, Task class is following this principle.</span></span></p>
<p>&nbsp;</p>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Task class enable plugin developer to execute tasks in thread other than the EDT, and bring back feedback to the user. A task can be modal or execute in the background. IntelliJ user are familiar with tasks since the IDE uses them widely.</span></span></p>
<p>&nbsp;</p>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The Task run function is executed outside of the EDT, the onSuccess and onCancel are executed in The EDT. Below there is a sample code of Modal Task which can be canceled:</span></span></p>
<div>
	<sub>public class ModalTaskImpl extends Task.Modal {</sub></div>
<div>
	<sub>&nbsp; &nbsp; public ModalTaskImpl(@Nullable Project project) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; super(project, &quot;Modal Task&quot;, true);</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; @Override</sub></div>
<div>
	<sub>&nbsp; &nbsp; public void run(@NotNull ProgressIndicator progressIndicator) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp;for (int i = 11 ; i &lt; 10000; i++){</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;progressIndicator.setText(&quot;Modal Counter = &quot;+i);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;progressIndicator.setFraction(i/10000);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;try {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Thread.sleep(1000);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;} catch (InterruptedException e) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;e.printStackTrace();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;progressIndicator.checkCanceled();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp;}</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; @Override</sub></div>
<div>
	<sub>&nbsp; &nbsp; public void onSuccess() {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; super.onSuccess();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; Messages.showMessageDialog(getProject(),&quot;Success&quot;,&quot;Success&quot;,Messages.getInformationIcon());</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; @Override</sub></div>
<div>
	<sub>&nbsp; &nbsp; public void onCancel() {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; super.onCancel();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; Messages.showMessageDialog(getProject(),&quot;Cancel&quot;,&quot;Nodal Canceled&quot;,Messages.getQuestionIcon());</sub></div>
<div>
	<sub>&nbsp; &nbsp;}</sub></div>
<div>
	<sub>}</sub></div>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Below there is a sample code of Background Task which cannot be canceled.</span></span></p>
<div>
	<sub>public class BackgroundTaskImpl extends Task.Backgroundable {</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; public BackgroundTaskImpl(@Nullable Project project) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; super(project, &quot;Background Task&quot;,false);</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; @Override</sub></div>
<div>
	<sub>&nbsp; &nbsp; public void run(@NotNull ProgressIndicator progressIndicator) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; for (int i = 11 ; i &lt; 10000; i++){</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; progressIndicator.setText(&quot;Modal Counter = &quot;+i);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; progressIndicator.setFraction(i/10000);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; try {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Thread.sleep(1000);</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } catch (InterruptedException e) {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; e.printStackTrace();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; }</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>&nbsp; &nbsp; @Override</sub></div>
<div>
	<sub>&nbsp; &nbsp; public void onSuccess() {</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; super.onSuccess();</sub></div>
<div>
	<sub>&nbsp; &nbsp; &nbsp; &nbsp; Messages.showMessageDialog(getProject(), &quot;Success&quot;, &quot;Success&quot;, Messages.getInformationIcon());</sub></div>
<div>
	<sub>&nbsp; &nbsp; }</sub></div>
<div>
	&nbsp;</div>
<div>
	<sub>}</sub></div>
<p>&nbsp;</p>
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-3b8b4e7b-1e4d-5188-9fdb-b08058a2019a"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">To download the sample<a href="https://docs.google.com/a/tikalk.com/file/d/0B1oMZQt3rUSNeEsyTGNwTUtqUTA/edit"> plugin click here</a>.</span></span></p>
<p><br />
	<br />
	&nbsp;</p>
