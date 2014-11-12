---
layout: post
title: 5 ways to 15puzzles
created: 1258735510
permalink: 5-ways-to-15puzzles
tags:
- JAVA
- Yahoo UI
- jQuery
- gwt
- flex
- Ext-Js
---


<p><span style="font-size: large;"><strong> 5 ways to 15puzzles</strong></span></p>
<p>To leverage my programming skills in client side and to concurrently&nbsp; compare modern UI frameworks and most importantly &ldquo;just for fun&rdquo; i start to implement <a id="at8n" title="15 puzzle" href="http://en.wikipedia.org/wiki/Fifteen_puzzle">15 puzzles</a> game</p>
<div>
<div><a href="http://en.wikipedia.org/wiki/File:15-puzzle.svg"><img width="202" height="198" src="http://upload.wikimedia.org/wikipedia/commons/thumb/9/91/15-puzzle.svg/180px-15-puzzle.svg.png" alt="" /></a></div>
</div>
<p>in:<br />
<span style="font-size: small;"><strong>1 <a id="eavp" title="jQuery" href="http://jquery.com/">jQuery</a>;<br />
2 <a id="sa_l" title="Ext-Js" href="http://extjs.com/">Ext-Js</a>;<br />
3 <a id="wfd5" title="Yahoo UI" href="http://developer.yahoo.com/yui/">Yahoo UI</a>;<br />
4 <a id="u.9z" title="GWT" href="http://code.google.com/webtoolkit/">GWT</a>;<br />
5 <a id="y5lk" title="Flex" href="http://www.flex.org/">Flex</a>.</strong></span></p>
<p>I have almost no experience working with this&nbsp; frameworks, so it can be useful to discover, how simple and quick to start with, each of them is.</p>
<p>So, what exactly i want to implement? Really, no much:</p>
<p>puzzle must be dragged, not moved by click.</p>
<p>That&rsquo;s all. No server side <img src="http://www.javaneverdie.com/wp-includes/images/smilies/icon_surprised.gif" alt=":o" class="wp-smiley" /> ). I will use the same (only colors is different) css for all of them. Although, application is not complex it will check&nbsp; selectors, DOM manipulating and drag-n-drop&nbsp; capabilities of those frameworks.</p>
<p>On finish i will compare:<br />
&ndash; starting time,<br />
&ndash; amount and simplicity of code,<br />
&ndash; availability of examples, documentation, demos etc.,<br />
&ndash; integration with some available IDE.</p>
<p><span style="font-size: medium;"><strong><br />
&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..<br />
Two week-ends later</strong></span></p>
<div>
<table cellspacing="0" cellpadding="3" bordercolor="#000000" border="0" width="823" id="ixdx" style="height: 142px;">
    <tbody>
        <tr>
            <td width="20%"><a href="http://javaghost.com/15puzzles/jquery"><img style="width: 131px; height: 131px;" src="http://docs.google.com/File?id=dgnwcmwc_148dg35n8cn_b" alt="" /></a></td>
            <td width="20%">
            <div id="lx4f" style="text-align: left;"><a href="http://javaghost.com/15puzzles/extjs"><img style="width: 131px; height: 132px;" src="http://docs.google.com/File?id=dgnwcmwc_149dztnz3d7_b" alt="" /></a></div>
            </td>
            <td width="20%">
            <div id="nkcq" style="text-align: left;"><a href="http://javaghost.com/15puzzles/yui"><img style="width: 133px; height: 133px;" src="http://docs.google.com/File?id=dgnwcmwc_150dgpb2559_b" alt="" /></a></div>
            </td>
            <td width="20%">
            <div id="p6ie" style="text-align: left;"><a href="http://javaghost.com/15puzzles/flex"><img style="width: 131px; height: 131px;" src="http://docs.google.com/File?id=dgnwcmwc_154gzgvstcx_b" alt="" /></a></div>
            </td>
            <td width="20%">
            <div id="lje7" style="text-align: left;"><a href="http://javaghost.com/15puzzles/gwt"><img style="width: 133px; height: 133px;" src="http://docs.google.com/File?id=dgnwcmwc_151gqg8krf5_b" alt="" /></a></div>
            </td>
        </tr>
    </tbody>
</table>
</div>
<div id="w8cn" style="text-align: left;">All implementations definitely not bugs free. It was not a goal to create production level software, but rather to make some starting point and to compare tools.</div>
<p><strong><span style="font-size: medium;">jQuery.</span></strong></p>
<p><strong> </strong><span style="font-size: medium;"><strong><br />
<span style="font-size: small;"><span style="text-decoration: underline;"><a id="cpx5" title="15 puzzles jQuery way demo" href="http://javaghost.com/15puzzles/jquery/">demo</a><a id="r_:t" title="download jq15puzzles.zip" href="http://javaghost.com/download/15puzzles/jq15puzzles.zip"> download</a></span> <span style="color: rgb(255, 0, 0);">*</span> </span></strong><a id="bo_3" title="view source code" href="http://javaghost.com/jquery/15puzzles-jquery-way">view source code</a></span><br />
<strong><span style="font-size: medium;"> </span></strong><br />
jQuery &mdash; the best. API docs online coupled with examples. API itself is easy, natural, intuitive understandable and self described. Required javascript knowledge level to start with jQuery is very low. Starting time is very small. Highly recommended to all from novices to professionals. Only possible reason don&rsquo;t to use it is probable lack of some widget/plugin that you need and can lucky found in ext-js or yui.<span style="font-size: medium;"><strong> </strong></span></p>
<p><strong>Ext-Js and YUI</strong></p>
<p><strong><span style="font-size: small;">YUI</span></strong> <span style="font-size: medium;"><a id="laob" title="15 puzzles YUI way demo" href="http://javaghost.com/15puzzles/yui/">demo</a><strong><span style="font-size: small;"> <span style="text-decoration: underline;"><a id="yu65" title="download yui15puzzles.zip" href="http://javaghost.com/download/15puzzles/yui15puzzles.zip">download</a> </span></span></strong></span><strong style="color: rgb(255, 0, 0);"><span style="font-size: medium;">*</span></strong> <span style="font-size: medium;"><a id="porb" title="view source code" href="http://javaghost.com/yui/15puzzles-yui-way">view source code</a></span></p>
<p><span style="font-size: small;"><strong>Ext &ndash; Js</strong></span><span style="font-size: medium;"><strong><span style="font-size: small;"> <span style="text-decoration: underline;"><a id="k_-5" title="demo" href="http://javaghost.com/15puzzles/extjs">demo</a></span> </span></strong><a id="mrmx" title="download" href="http://javaghost.com/download/15puzzles/xjs15puzzles.zip">download</a></span> <span style="font-size: medium;"> *</span> <span style="font-size: medium;"><a id="sxwl" title="view source code" href="http://javaghost.com/15puzzles-extjs-way">view source code</a></span></p>
<p><span style="color: rgb(255, 0, 0);">*</span> jQuery, Ext-Js and YUI ways designed as Netbeans PHP projects. After downloading use &ldquo;Import Project -&gt; Netbeans project from zip&rdquo; to import project to IDE.</p>
<p>Configure project properties to automatically copy&nbsp; files to your apache server installation folder</p>
<div id="osne" style="text-align: left;"><img style="width: 648px; height: 304.327px;" src="http://docs.google.com/File?id=dgnwcmwc_145kxdw6qf8_b" alt="" /></div>
<p>I never used Netbeans for php projects with windows, but Netbeans has great tutorials about all and will be no problem,&nbsp; i sure, to configure php project to copy files to proper place under apache server in windows too.</p>
<p>Ext-Js and YUI,&nbsp; in my opinion, are in the same level if not the same. Ext-Js may be slightly better written, but YUI better documented. If i was required to choose between YUI and Ext-Js, YUI is better choice, because of better support, more demos and documentations. In other side, as you will see later YUI and Ext-Js are very similar, so YUI demos and examples sometimes can be useful for Ext-js writing.</p>
<p>Minimum size of required javascript files for such applications&nbsp; for YUI is about 60 kB, for Ext-Js is 600 kB(!) (i use ext-all.js) and this is not so obvious how to decrease it. For jQuery is 240 kB.</p>
<p>jQuery and YUI completely free, but Ext-Js has two license&nbsp; and, if used for commercial non open source applications, must be paid on per developer basis.</p>
<p>&nbsp;</p>
<pre style="display: none;" name="code" class="javascript">
  $('#freeSpaceId').droppable();
</pre>
<p>I wanted to place some code excerpts to compare but it was so lazy. Trust me or compare by yourself.&nbsp; jQuery code is most short and understandable, the Ext-js and YUI code almost the same, except creating element in YUI, that is ugly.</p>
<p>The Ext-js and YUI implementations have the same bug, that can be reproduced if user quickly move mouse and mouseup event occurs&nbsp; outside of container.</p>
<p>I used Netbeans for all above implementations and I repeat again and again&nbsp; that Netbeans is the best IDE for javascript development.</p>
<p><strong><span style="font-size: medium;">Flex</span></strong></p>
<p><span style="font-size: medium;"><strong><span style="font-size: small;"><span style="text-decoration: underline;"><a id="aty9" title="demo" href="http://javaghost.com/15puzzles/flex">demo</a></span> <span style="text-decoration: underline;"><a id="yjrs" title="download" href="http://javaghost.com/download/15puzzles/fx15puzzles.com">download</a></span> </span></strong></span><strong><span style="font-size: small;"><a id="mieb" title="view source code" href="http://javaghost.com/ria-frameworks/15puzzles-flex-way">view source code</a></span></strong></p>
<p>There is still a question if it worth to compare Flex and GWT with above javascript libraries, but until they can be used for the same purpose i think this question is redundant.<br />
Flex pros: &mdash; look and feel, that quiet hard to implement with CSS (rounded corners, gradient backgrounds)<br />
&ndash; all in one workbench, very comfortable to code, deploy and debug,<br />
&ndash; editor design mode allowing simply drag and drop component to container.</p>
<p>contras: &mdash; some css features hard (not obvious) to implement &mdash; for example: inset/outset borders.<br />
&ndash; start time for average web developer is much bigger (java background can&nbsp; be very helpful, because actionscript syntax,&nbsp; i think, is simply dwarfish java),<br />
&ndash; drag and drop API much more complex and confusable,<br />
&ndash; need additional efforts to add Google Adds to application page ,<br />
&ndash; API very big and unfamiliar and intuitively not understandable,<br />
&ndash; compiler error messages is not informative at all,<br />
&ndash; lack of java community (hard to find demos/examples/tutorials) or may be i don&rsquo;t understand them? <img src="http://www.javaneverdie.com/wp-includes/images/smilies/icon_wink.gif" alt=";)" class="wp-smiley" /> ,<br />
&ndash; flex eclipse plugin for linux&nbsp; doesn&rsquo;t have design mode or doesn&rsquo;t properly work,<br />
&ndash; IDE is not free;</p>
<p>I used Flex Builder 3 as IDE and i&nbsp; it was very comfortable to code, deploy and debug with some exceptions. For example class methods autocomplete window&nbsp; contains&nbsp; no information&nbsp; what ancestor this method come from and no method description as well. I hope in Flash 4 it was improved.</p>
<div>Unlike jQuery Flex is very hard to start with. And after starting it is very confused. Flex implementation took me the most time from all, but i also like it more than others.
<p><span style="font-size: medium;"><strong><br />
GWT</strong></span></p>
<p><span style="font-size: medium;"><strong><span style="font-size: small;"><span style="text-decoration: underline;"><a id="j_72" title="demo application" href="http://javaghost.com/15puzzles/flex">demo</a></span> <span style="text-decoration: underline;"><a id="w1pg" title="download" href="http://javaghost.com/download/15puzzles/gwt15puzzles.zip">download</a></span> </span></strong><a id="hbh8" title="view source code" href="http://javaghost.com/ria-frameworks/15puzzles-gwt-way">view source code</a><br />
</span></p>
</div>
<div>Finally the code for real men. Script kids rest aside.<br />
GWT is the one than does not have native support to drag-and-drop. There is some third party library present and may be it suitable for my needs, but i did not find exact example , so i implemented drag n drop by myself, using this&nbsp;<a id="ki7b" title="this great but a little out of date tutorial." href="http://chaoticjava.com/posts/drag-and-drop-in-gwt-the-how-to/"> great but a little out of date tutorial.</a> It work worse than others, but i sure that it not need much work to improve. Currently i don&rsquo;t have time to enter in more details. Although, i had to write additional code, implementation time was very short. Even shortest than jQuery way. Java-java.<br />
I am very comfortable with GWT at all, probably because of big java with some swing experience. In some bigger application lack of markup, probably,&nbsp; will be more valuable.<br />
I used GWT designer eclipse plugin from Instantiations and must to say that it almost so comfortable as Flex Builder if not more.
<p>pros:&nbsp; &mdash; code is pure java ,<br />
&ndash; regular css for look and feel,<br />
&ndash; all in one workbench comfortable to code, deploy, debug,<br />
&ndash; comfortable and intuitive API,<br />
&ndash; java community with all those smart guys, bored at home,<br />
&ndash; editor design mode allowing simply drag and drop component to container,<br />
&ndash; choice of components (using Ext-GWT or GWT-Ext) is richer than standard Flex palette, though may be not cover all covered by Flex components and vice versa.</p>
<p>contras: &nbsp; &mdash; lack of markup,<br />
&ndash; lack of native functionality (drag-n-drop);<br />
&ndash; bigger amount of code compare to others (almost the same as Flex),<br />
&ndash; bigger time to compile compare to Flex and to deploy compare to all others,</p>
</div>
<div>&ndash; very big time (supposing learning java included) to novice to start work with,<br />
&ndash; GWT designer plugin allowing visual editing is not free, though much cheaper than Flex Builder.
<p><strong><span style="font-size: medium;"> </span></strong></p>
<p><strong>Summary</strong></p>
<p>jQuery is the best choice for such applications. Easy to start, best documented and simply the best.</p>
<p>Ext-Js and YUI may be possible alternative/extension to jQuery if your application need some widgets that present in Ext-Js/YUI and not in jQuery.</p>
<p>Flex now is de facto UI standard for java (and not only java) enterprise applications. Look at image below.</p>
<div id="jheg" style="text-align: left;"><img style="width: 648px; height: 350.009px;" src="http://docs.google.com/File?id=dgnwcmwc_141c4kvq6dh_b" alt="" /></div>
<p>5 500 (1298 job offers with title like Flex developer/programmer and 5446 with Flex in description) job offers compare to 600 for gwt/extjs/yui and to 3000 for jQuery. Your experience in Flex surely will be paid.</p>
<p>Flex application very easy can be made to look great. Very recommended for novices as way to programming world as well as for java professionals which are bored from server side programming <img src="http://www.javaneverdie.com/wp-includes/images/smilies/icon_surprised.gif" alt=":o" class="wp-smiley" /> ).</p>
<p>GWT is intended for java programmers, that want to write web applications in traditional swing non-markup way. BTW, <span>rumors are in the air</span>, that in GWT 2.0 (current version 1.7) mark up will be present. In all cases, in tomorrow Google Wave driven world, anyone (any web developer i mean) will have no choice ;0).</p>
<p>Next chart is very self explained.</p>
<div id="vh:k" style="text-align: left;"><img style="width: 648px; height: 340.085px;" src="http://docs.google.com/File?id=dgnwcmwc_14332h7j5cb_b" alt="" /></div>
<p>The next chart confirm previous. Possible to see that in case if tendency will not changed,&nbsp; during next (2010) year, jQuery will beat Flex and will become the most popular UI framework over the world.</p>
<div id="b38f" style="text-align: left;"><img style="width: 648px; height: 340.085px;" src="http://docs.google.com/File?id=dgnwcmwc_146dpp5dnch_b" alt="" /></div>
<p><span style="font-size: medium;"><strong> </strong></span></p>
<p><strong>Usage recommendations.</strong></p>
<p><strong> </strong></p>
<div id="x8lq" style="text-align: left;"><img width="210" height="293" style="" src="http://docs.google.com/File?id=dgnwcmwc_147f2whc5g8_b" alt="" /></div>
<p>If you are web developer with some basic knowledge of html, css, javascript &mdash; go jQuery, don&rsquo;t think twice.</p>
<p>If your application is build around some ExtJs/YUI widget(s) go them. Possible with jQuery.</p>
<p>If you completely novice to programming &mdash; go Flex &mdash; you will get the same starting point with more experienced programmers. One year of experience in your resume must be enough.<br />
If&nbsp; your customer (your own things view) needs Flex &mdash; go it, but remember that it was your own decision.</p>
<p>If you are java programmer &mdash; use GWT.<br />
If you think that Google Wave can change the Web (read the World) &mdash; learn java (its cool!) and then use GWT.</p>
</div>
