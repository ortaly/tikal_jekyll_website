---
layout: post
title: Selenium Automated Web Testing Flow Control
created: 1278504771
author: dror
permalink: /devops/selenium-automated-web-testing-flow-control
tags:
- DevOps
---
<!--break-->
<p>First, here are some Selenium related links:<br />
* Selenium HQ: <a href="http://seleniumhq.org/" target="_blank">http://seleniumhq.org/</a><br />
* Selenium Flow Control: <a href="http://51elliot.blogspot.com/2008/02/selenium-ide-goto.html" target="_blank">http://51elliot.blogspot.com/2008/02/selenium-ide-goto.html</a></p>
<p>&nbsp;</p>
<p><br />
You need to add extension &quot;<strong>goto_sel_ide.js</strong>&quot; from the following link: <a href="http://docs.google.com/Doc?id=dm6sk55_37fmpg8tcr" target="_blank">http://docs.google.com/Doc?id=dm6sk55_37fmpg8tcr</a><br />
Detailed instructions on how to add this extension may be found at the 'Selenium Flow Control' link above.<br />
Please note that you have to restart Selenium IDE Firefox plug-in in order to have the extension add-on kick in.</p>
<p>&nbsp;</p>
<p><br />
One of the major operations required during tests is flow control.<br />
Sometimes you need to skip a command or commands and not execute them.<br />
For example you try to perform a deletion operation but the element doesn&rsquo;t exist and applying the deletion operation would result in an error.</p>
<p>&nbsp;</p>
<p>Follow these guidelines to create a branch,  Below is a short code snippet sample&quot;</p>
<p><em><strong><hr />
storeTextPresent</strong></em> || [<strong>some_value</strong>] || [<strong>variable_name</strong>]</p>
<p><em><strong>gotoIf</strong></em> || <em><strong>storedVars</strong></em><strong>['variable_name']</strong> == true || <strong>goto_label_name</strong><br />
.... // Command to execute if the condition is not met</p>
<p>&nbsp;</p>
<p><em><strong>label</strong></em> <strong>goto_label_name</strong> // This is where the script will jump to when<br />
.... // Command to execute if the condition is met, this part may be off course unrelated to the initial condition</p>
<hr />
<p>&nbsp;</p>
<p>Code explained:<br />
* The &quot;<em><strong>storeTextPresent</strong></em>&quot; command will set <strong>variable_name</strong> to <strong>true</strong> if <strong>some_value</strong> exists on the page and <strong>false</strong> otherwise<br />
* The &quot;<em><strong>gotoIf</strong></em>&quot; command checks the <em><strong>storedVars</strong></em><strong>['variable_name']</strong> for either <strong>true</strong> or <strong>false</strong>. If the condition is met the script will &quot;jump&quot; to <strong>goto_label_name</strong><br />
* Whatever commands you wish to execute if the condition is not met should follow the label. The part after the label may be off course unrelated to the initial condition<br />
&nbsp;* <em><strong>label</strong></em><strong> goto_label_name</strong> this is the label that marks the start of the part that executes after the condition is jumped. Note that this code, unless defined otherwise, would execute regardless of the condition and in any case</p>
