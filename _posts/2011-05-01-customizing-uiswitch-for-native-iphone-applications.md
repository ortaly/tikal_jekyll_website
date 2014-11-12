---
layout: post
title: Customizing UISwitch For Native iPhone Applications
created: 1304269373
permalink: /js/customizing-uiswitch-native-iphone-applications
tags:
- JS
- UISwitch
- iPhone
- iOS
- Apple
---
<p>Apple has done a great job of providing a decent set of built in UI components to use to develop all kinds of user interfaces. Most of these controls allow for easy customization via the SDK to all aspects of the view. However, the built in UISwitch does not have the ability to change the background color. Allot of my clients have asked to change the background color. Apples default blue color is great, but that doesn&rsquo;t always match the color scheme desired.</p>
<p>&nbsp;</p>
<p>I have decided to upload a version of the control I developed that has the same function of UISwitch. Mainly, the ability to indicate the on/off state of the control. My switch inherits from UIControl. This allows me to send events like</p>
<pre title="code" class="brush: java;">
[self sendActionsForControlEvents:UIControlEventValueChanged]; </pre>
<p>when the state of the switch changes.</p>
<p>&nbsp;</p>
<p>To simplify this example I have made the switch out of a PNG included in the sample. To change the background you could change the UIImage. I recommend changing the code in drawRect to draw the UISwitch the way you want. You could include a public property to set the background color and use it in drawRect.</p>
<p>&nbsp;</p>
<p>You can download the source code from here: <a target="_self" href="http://ogonium.com/2011/05/01/custom-uiswitch/">DGSwitch</a>.</p>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
