---
layout: post
title: Enyo - the WebOs javascript framework
created: 1327551807
author: ittayd
permalink: /enyo-webos-javascript-framework
tags:
- JS
---
<p>Enyo is the WebOS javascript framework, so its main target is mobile platforms (but it doesn't allow you to interact with native services, the FAQ recommends wrapping it in phonegap).</p>
<p>&nbsp;</p>
<p>It has the same &quot;feel&quot;&nbsp;like sancha (extjs) in that html is generated from javascript. </p>
<p>&nbsp;</p>
<p>One nice thing it has is that it can create a class out of a control configuration:</p>
<pre title="code" class="brush: jscript;">
enyo.kind({
    name: &quot;Hello&quot;,
    kind: enyo.Control,
    components: [
        {name: &quot;hello&quot;, content: &quot;Hello From Enyo&quot;, ontap: &quot;helloTap&quot;},
        {tag: &quot;hr&quot;}
    ],
    helloTap: function() {
        this.$.hello.addStyles(&quot;color: red&quot;);
    }
};
 
// now create and use the new classes
new Hello().write();
new Hello().write();</pre>
<p>&nbsp;</p>
<p>Also note the 'ontap' attribute of the inner control triggers the helloTap method of the enclosing control. Inside helloTap, the inner component is accesssed with this.$.hello</p>
