---
layout: post
title: How to prevent flash crashes in Firefox
created: 1291293554
author: vladislavm
permalink: /js/how-prevent-flash-crashes-firefox
tags:
- JS
- Windows
- Flash
---
<p>From version 3.6.4 Firefox started to use plugin-container.exe as external container over browser plugins in general and flash player specifically</p>
<p>&nbsp;</p>
<p>This to prevent browser crashes in case of plugin crash. The idea is nice, the implementation caused to common plugins instability.</p>
<p>&nbsp;</p>
<p>In cases when plugin is &quot;hard-working&quot; (and Flash is good candidate), the communication between browser and plugin-container can be lost. In that cases FF counts till 45 and kills the plugin, sometimes it causes to FF freeze also.</p>
<p>&nbsp;</p>
<p>There are 2 workarounds - return to version 3.6.3 or disable &quot;plugin-container&quot; feature in FF about:config (search for &quot;ipc&quot; string):</p>
<p><strong>dom.ipc.plugins.enabled = true<br />
</strong></p>
<p><strong>dom.ipc.plugins.enabled.npctrl.dll = false<br />
</strong></p>
<p><strong>dom.ipc.plugins.enabled.npqtplugin.dll = false<br />
</strong></p>
<p><strong>dom.ipc.plugins.enabled.npswf32.dll = false<br />
</strong></p>
<p><strong>dom.ipc.plugins.enabled.nptest.dll = false</strong></p>
<p>&nbsp;</p>
<p><u>*It's better to disable FF updates also, till Mozilla will fix it</u></p>
