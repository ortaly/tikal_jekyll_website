---
layout: post
title: MVC architecture - Tying mediator's registration to view's lifecycle
created: 1280954212
permalink: /js/mvc-architecture-tying-mediators-registration-views-lifecycle
tags:
- JS
- Design & Architecture
---
<p>MVC based applications often offer some kind of a mediation between the actual Flex view component and the rest of the system.</p>
<p><br />
PureMVC has its Mediator, Cairngorm offer the View Helper (though they not encourage using it). I'll focus on PureMVC.</p>
<p>&nbsp;</p>
<p>When the view component is dynamically created, you'll probably want to create it's mediator dynamically as well.&nbsp; This is a very common scenario in large applications.</p>
<p>&nbsp;</p>
<p>First thing comes to mind in this scenario is using the view component's CreationComplete or Initialize events for creating its mediator.<br />
&nbsp;</p>
<p>It is very tempting doing so, especially when guaranteed that by the time these events occur, the component children are created, and the mediator can access them without getting exceptions.</p>
<p>&nbsp;</p>
<p><strong>The problem</strong></p>
<p>Using these events turns out to be quite a limitation in scenarios of dynamic creation of multiple view components, owned by mediators who are interested in each other's notifications. A master/details view is such an example.</p>
<p><br />
In these scenarios, the order of mediator's registration is crucial, and should be handled explicitly. Relying on the above mentioned creation events take the control out of your hands since the creation order is not deterministic (the order of adding the components to the display list does not determine the order of dispatching these events).</p>
<p>&nbsp;</p>
<p><strong>Best practice</strong></p>
<p>A much better solution is to rely instead on the view component's container's addChild event (ChildExistenceChangedEvent.CHILD_ADD), which is dispatched in the same frame where the child is added, and being handled synchronously.&nbsp;</p>
<p>&nbsp;</p>
<p>I discussed this topic in the PureMVC architecture forum, <a href="http://forums.puremvc.org/index.php?topic=1775.0">here</a>.<br />
&nbsp;</p>
<p>-ilan</p>
<p>&nbsp;</p>
