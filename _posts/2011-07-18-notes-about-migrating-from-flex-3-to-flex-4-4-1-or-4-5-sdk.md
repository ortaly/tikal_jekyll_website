---
layout: post
title: Notes about Migrating from Flex 3 to Flex 4 (4.1 or 4.5 SDK)
created: 1311017177
author: charlie
permalink: /js/notes-about-migrating-flex-3-flex-4-41-or-45-sdk
tags:
- JS
- RTL
- migration
- flex 4
---
<p>The main incentive for the migration was to support RTL languages namely Hebrew and Japanese. Fact is that Flex 3 does not handle RTL writing properly &ndash; try writing Hebrew and English together.</p>
<p>&nbsp;</p>
<p>After finalizing the long and fragmented process, I found that the migration had two main parts &ndash; handling the visual aspects (styling, skins etc) and handling the application logic (components and AS). I found a workaround that helped me to split the process into these two parts &ndash; i.e. set the styling to backward compatibility mode and handle the logic first. Then, once the application compiles and runs &lsquo;properly&rsquo;, disable the compatibility mode and go thru the styling issues.</p>
<p>&nbsp;</p>
<p>So, to set the backward compatibility with Halo you should do the following:</p>
<p>&nbsp;</p>
<ul>
    <li>Go to the sdk 4.x directory -&gt; frameworks -&gt; flex-config.xml</li>
    <li>Edit the file (as administrator) and add the following line in the <i>&lt;themes&gt;</i> section<br />
    <i>&lt;filename&gt;themes/Halo/halo.swc&lt;/filename&gt;<br />
    </i></li>
    <p>This will prevent all the errors related to style properties such as borederThikness, cornerRadius that are not supported in Flex 4.</p>
    <p>&nbsp;</p>
</ul>
<p>&nbsp;</p>
<p><b><u>Main Issues Handled in the Logic Part</u></b></p>
<ol>
    <li>RTL - To support native RTL writing, all text-based components were switched from MX to Spark &ndash; Label, TextInput, TextArea, and custom components based on them</li>
    <li>DataGrid itemRenderers &ndash; most of my renderers were based on the mx:Label component. None of the renderers worked and I had to base all the renderers on the s:MXDataGridItemRenderer class and include in it a Lable component (<a href="http://help.adobe.com/en_US/flex/using/WS03d33b8076db57b9-1c32bcb9124deadc3e9-8000.html">read this</a>). The rest of the code was untouched.</li>
    <li>Datagrid &ndash; I started the migration process with 4.5 SDK. This was premature because the s:DataGrid component was missing some critical properties which prevented the application to compile. Therefore, I switched to 4.1 SDK (not sure what is the status today as the migration was done less than a year ago)</li>
    <li>RTL popups &ndash; this issue is not related to the migration specifically but since RTL mode has been QA-ed extensively, it worth mentioning. Alert and other views poped up using the PopupManager class were placed out of the main screen in RTL mode. Namely, their x and y properties sent the popup out of the screen. If you did not implement the ESC key to close the popup, the impression was like the application is stuck (glass pane) while the popup is there but you cannot see it.</li>
</ol>
<p>&nbsp;</p>
<p><b><u>Issues Handled in the Visual Part</u></b></p>
<p>First, remove the line <i>&lt;filename&gt;themes/Halo/halo.swc&lt;/filename&gt;</i> from flex-config.xml.</p>
<p>Then, get handful of compilation errors related to usage of styles such as cornerRadius, borderThikness, borerColor inline within components. Another example is the icon property of Button class &ndash; not supported in 4.x SDK. If used in CSS file, these styles were &lsquo;just&rsquo; ignored.</p>
<p>So, after removing these (inline) styles, the application compiled and the main effect is that the application looked completely different style-wise.</p>
<p>&nbsp;</p>
<p>This was a contribution of:</p>
<ol>
    <li>Flex 4 components default styling is different from Flex 3</li>
    <li>Usage more of CSS styling and less of skins caused the unsupported styles to vanish and therefore components adapted their default styles</li>
</ol>
<p>&nbsp;</p>
<p>Several action took place in order to bring some life to the new app</p>
<ol>
    <li>Start over with new CSS file and add to it only the supported styles (i.e. clean it)</li>
    <li>Implement new skins introduced by 4.1 SDK</li>
    <li>In some skin files, implement backward compatibility for old styles such as borderThickness and cornerRadius by overriding updateDisplayList() in the skin file. Same done for the icon property of the Button class (today, I&rsquo;m familiar with skin part and this is the right solution)</li>
    <li>Implement a RTL-specific css file and load it dynamically using tyleManager.loadStyleDeclarations() when the app switched to RTL (and unload otherwise).</li>
</ol>
