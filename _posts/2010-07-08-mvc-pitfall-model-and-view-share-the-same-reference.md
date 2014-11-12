---
layout: post
title: MVC pitfall - Model and View share the same reference
created: 1278591100
author: oren
permalink: /js/mvc-pitfall-model-and-view-share-same-reference
tags:
- JS
- mvc
- framework separation
- flex
---
<div>&nbsp;</div>
<div>MVC framework has a very narrow goal.</div>
<div>That is to help you separate your application&rsquo;s coding concerns into three discrete tiers; Model, View and Controller.</div>
<div><strong>You should be aware, however, that letting the view and the model reference the same object means bypassing the MVC mechanism</strong>.</div>
<div>&nbsp;</div>
<div>The results is that&nbsp;your proxy being updated without explicitly set it (usually in a command),</div>
<div>preventing aborting changes and reverting back to the original value.</div>
<div>&nbsp;</div>
<div>The recommended flow for updating the model by the view is as follows:</div>
<div>The view notify regarding the change -&gt; a command is being executed</div>
<div>In this case the flow of updating proxy from the view is:</div>
<div><strong>View </strong>(change a value and notify change)<strong> -&gt; Command</strong>(being executed) <strong>-&gt; Proxy</strong> (updated by the command)</div>
<div>&nbsp;</div>
<div>When the proxy and the view reference the same object you get:</div>
<div><strong>View </strong>(change a value and notify change) <strong>-&gt;Proxy </strong>(updated by the view)</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>-&gt;Command</strong>(being executed) <strong>-&gt; Proxy </strong>(updated again by the command)</div>
<div>&nbsp;</div>
<div><strong><span style="font-size: larger">This results in the proxy being updated immediately when the view is changed,</span></strong></div>
<div><strong><span style="font-size: larger">bypassing the MVC mechanism and preventing you from preventing the model from being updated by conditionally execute the command</span></strong><span style="font-size: larger">.</span></div>
<div>&nbsp;</div>
<div>For example:</div>
<div>Consider a navigation tree, where each node represents a view with a &quot;Save&quot; button.</div>
<div>User made any action so the view was changed (became dirty).</div>
<div>Before saving, the user navigates away by selecting another node in the tree (view changes the selected node,</div>
<div>which is held by the model as well), and gets a &quot;Do you want to save changes?&quot; message.</div>
<div>In case the user cancels the navigation, &nbsp;the selected node should revert to the original one.</div>
<div>&nbsp;</div>
<div>In case both view and model reference the same selected node, the original value is lost by now.</div>
<div>&nbsp;</div>
<div>The solution:</div>
<div>The view and the model should work on separate copies of the data.</div>
<div>&nbsp;</div>
<div>Here is a link that also discusses the issue:</div>
<p><span dir="rtl"><a href="http://forums.puremvc.org/index.php?topic=1626.msg7347#msg7347"><span dir="ltr">http://forums.puremvc.org/index.php?topic=1626.msg7347#msg7347</span></a></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
