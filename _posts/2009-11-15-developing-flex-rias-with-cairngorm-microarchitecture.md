---
layout: post
title: Developing Flex RIAs with Cairngorm microarchitecture
created: 1258292450
permalink: developing-flex-rias-with-cairngorm-microarchitecture
tags:
- JS
- Cairngorm
---
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong><u>What is Cairngorm?</u></strong></p>
<p class="rteindent1">Cairngorm is fundamentally a methodology for breaking up your</p>
<p class="rteindent1">application code by logical functions; by data, by user views, and by the code that</p>
<p class="rteindent1">controls everything. This is routinely referred to as MVC.</p>
<p>&nbsp;</p>
<p class="rteindent1"><strong><u>The Pieces of Cairngorm</u></strong><br />
&middot; <em><strong>Model Locator</strong></em>: Stores all of your application&rsquo;s Value Objects (data) and<br />
shared variables, in one place. Similar to an HTTP Session object, except that<br />
its stored client side in the Flex interface instead of server side within a<br />
middle tier application server.<br />
&middot; <em><strong>View</strong></em>: One or more Flex components (button, panel, combo box, Tile, etc)<br />
bundled together as a named unit, bound to data in the Model Locator, and<br />
generating custom Cairngorm Events based on user interaction (clicks,<br />
rollovers, dragndrop.)<br />
&middot; <em><strong>Front Controller</strong></em>: Receives Cairngorm Events and maps them to Cairngorm<br />
Commands.<br />
&middot; <em><strong>Command</strong></em>: Handles business logic, calls Cairngorm Delegates and/or other<br />
Commands, and updates the Value Objects and variables stored in the Model<br />
Locator<br />
&middot; <em><strong>Delegate</strong></em>: Created by a Command, they instantiate remote procedure calls<br />
(HTTP, Web Services, etc) and hand the results back to that Command.<br />
&middot; <em><strong>Service</strong></em>: Defines the remote procedure calls (HTTP, Web Services, etc) to<br />
connect to remote data stores.</p>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1"><u><strong>Fit All the Pieces Together</strong></u></p>
<p class="rteindent1">Your client interface is comprised of Views. The Views use Flex binding to display data contained in the Model Locator.</p>
<p class="rteindent1">The Views generate Events based on user gestures such as mouse click, button press, and drag &amp; drop.</p>
<p class="rteindent1">Those Events are &ldquo;broadcast&rdquo; and &ldquo;heard&rdquo; by the Front Controller, which is a map of Events to Commands.</p>
<p class="rteindent1">Commands contain business logic, create Delegates to perform work, handle responses from Delegates,</p>
<p class="rteindent1">and update the data stored in the Model Locator. Since Views are bound to the data in the Model Locator the Views<br />
automatically update when the Model Locator data is changed.</p>
<p class="rteindent1">Delegates call Services and hand results back to Commands, and are optional but recommended.<br />
Services make remote data calls and hand the results back to Delegates.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Read more :</strong></p>
<!--break-->
<p>&nbsp;</p>
<p class="rteindent1">1. good article, explains how to build Flex Application with Cairngorm micro architecture :</p>
<p class="rteindent2"><a href="http://www.adobe.com/devnet/flex/articles/cairngorm_pt1.html" name="Cairngorm microarchitecture " title="Cairngorm microarchitecture ">www.adobe.com/devnet/flex/articles/cairngorm_pt1.html</a></p>
<p class="rteindent1">The presentation demonstrates&nbsp; a real life example Cairngorm Store which includes J2EE container and Flex Data Services/ Java.</p>
<p class="rteindent1">If you still want to run this application but without the J2EE container part (Mockup data),</p>
<p class="rteindent1">Check the&nbsp;<a href="http://ntier.wordpress.com/modcairngormstore/" name="Modified Cairngorm Store" title="Modified Cairngorm Store">ntier.wordpress.com/modcairngormstore/</a> example</p>
<p class="rteindent1">&nbsp;</p>
<p class="rteindent1">2. <a href="http://www.digimmersion.com/support/Flex%20UI%20Design%20For%20Cairngorm.pdf">www.digimmersion.com/support/Flex%20UI%20Design%20For%20Cairngorm.pdf</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
