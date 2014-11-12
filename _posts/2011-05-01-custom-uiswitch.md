---
layout: post
title: Custom UISwitch
created: 1304239442
permalink: custom-uiswitch
tags:
- Incubator
- Mobile
- iOS
---
<p>Apple has done a great job of providing a decent set of built in UI components to use to develop all kinds of user interfaces.  Most of these controls allow for easy customization via the SDK to all aspects of the view.  However,  the built in UISwitch does not have the ability to change the background color. Allot of my clients have asked to change the background color.  Apples default blue color is great, but that doesn’t always match the color scheme desired.</p>
<p>I have decided to upload a version of the control I developed that has the same function of UISwitch.  Mainly, the ability to indicate the on/off state of the control.  My switch inherits from UIControl.  This allows me to send events like <code>[self sendActionsForControlEvents:UIControlEventValueChanged];</code> when the state of the switch changes.</p>
<p>To simplify this example I have made the switch out of a PNG included in the sample.  To change the background you could change the UIImage.  I recommend changing the code in drawRect to draw the UISwitch the way you want.  You could include a public property to set the background color and use it in drawRect. </p>
<p>You can download the source code from here: <a href='http://ogonium.com/wp-content/uploads/2011/05/DGSwitch.zip' onClick="javascript: _gaq.push(['_trackPageview', '/downloads/DGSwitch_1_0']);">DGSwitch</a>.</p>
<p>Enjoy and let me know what you think in the comments below.</p>
<p>Dov</p>
