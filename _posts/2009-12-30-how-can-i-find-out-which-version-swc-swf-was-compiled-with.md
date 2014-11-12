---
layout: post
title: How can I find out which version swc/swf was compiled with?
created: 1262165134
permalink: how-can-i-find-out-which-version-swc-swf-was-compiled-with
tags:
- JS
- flex-3.4
- flex
---
<p>&nbsp;I am in the process of upgrading my flex project to use flex 3.4.<br />
When I am running the application I get the following error in flex builder console.</p>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;">[SWF] C:\dev\DiscoAuto\ria\dci-shell\bin-debug\ECUITFlex_ecue_styles.swf - 115,965 bytes after decompression</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p>&nbsp;</o:p></span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;">method not implemented mx.core::IFlexModuleFactory/mx.core:IFlexModuleFactory::allowInsecureDomain()</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;"><span style="">&nbsp;&nbsp; </span>over-binding 0 in mx.core::FlexModuleFactory</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p>&nbsp;</o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;">accessor not implemented mx.core:IFlexModuleFactory::preloadedRSLs</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;"><span style="">&nbsp;&nbsp; </span>over-binding 0 in mx.core::FlexModuleFactory</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p>&nbsp;</o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;">method not implemented mx.core::IFlexModuleFactory/mx.core:IFlexModuleFactory::allowDomain()</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: black;"><span style="">&nbsp;&nbsp; </span>over-binding 0 in mx.core::FlexModuleFactory</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;; color: red;">VerifyError: Error #1053: Illegal override of FlexModuleFactory in mx.core.FlexModuleFactory.</span><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p></o:p></span></div>
<div><span style="font-size: 10pt; font-family: &quot;Courier New&quot;;"><o:p>&nbsp;</o:p></span></div>
<div><span style="font-size: 10pt; line-height: 115%; font-family: &quot;Courier New&quot;; color: red;"><span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>at global$init()</span></div>
<div><span style="font-size: 10pt; line-height: 115%; font-family: &quot;Courier New&quot;; color: red;"><o:p></o:p></span></div>
<div>&nbsp;</div>
<p>Googling this error I found out that this means that one of my dependencies are not complied with flex 3.4.<br />
How can I can I found out which version swc/swf was compiled with?<br />
<font color="#ff0000" size="3" face="'Courier New'" class="Apple-style-span"><span style="font-size: 13px; line-height: 14px;" class="Apple-style-span"> <br />
</span></font></p>
<p><o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;Thanks</o:p></p>
