---
layout: post
title: Flex SDK 3 Vs. 4 – Part 3 – New language tags
created: 1273820419
author: sefi
permalink: /js/flex-sdk-3-vs-4-–-part-3-–-new-language-tags
tags:
- JS
- Reparent
- Library
- language tags
- Flex 4 SDK
- flex 4
- Definition
- Declarations
---
<div class="snap_preview">
<p>Flex 3 had some language tags we are all familiar with like &lt;fx:Binding&gt;, &lt;fx:metadata&gt;, &lt;fx:script&gt; and &lt;fx:style&gt; to name a few.</p>
<p>Flex 4 introduces some new mxml tags you can use when writing mxml classes. They are &lt;fx:Declarations&gt;, &lt;fx:Definition&gt;, &lt;fx:Library&gt;, &lt;fx:Private&gt; and &lt;fx:Reparent&gt;.</p>
<p>&nbsp;</p>
</div>
<!--break-->
<div>
<p><strong>Declarations<br />
</strong>The &lt;fx:Declarations&gt; tag is used to declare non-visual, non-default properties of the mxml class, but can also be used to declare default properties.<br />
Note, that these types will produce compilation errors if declared outside the &lt;fx:Declarations&gt; tag.</p>
<p>&nbsp;</p>
<p>Some examples (not a complete list) are:</p>
<p>* Basic classes (String, Boolean, Double, etc)<br />
* Data sets (Array, ArrayCollection, XMLList, Vector, etc)<br />
* Simple data models (fx:Model, fx:XML)<br />
* Validators<br />
* Formatters<br />
* Effects<br />
* RadioButtonGroups (Only the group, not the radio buttons themselves)<br />
* Inline renderers (treated as default properties)<br />
* RPC components (WebServices, HTTP Services, Remote Objects)</p>
<p>&nbsp;</p>
<p><strong>Definitions</strong><br />
The &lt;fx:Definition&gt; tag is used to define graphical children that can later be used in other parts of the application. Definition tags <em>MUST</em> be defined within a &lt;fx:Library&gt; tag. It must define a name attribute for reference as the tag name when instantiating the element.</p>
<p>It is similar to a private inline class, and in fact each definition is compiled into a seperate AS class that is a subclass of the first node of the definition. Instances of it are created when referenced outside of the &lt;fx:Library&gt; tag scope, and only then they are instantiated and added to the display list. It is also used with FXG, which we will cover in a future post.</p>
<p>&nbsp;</p>
<p><strong>Library<br />
</strong>We use the &lt;fx:Library&gt; tag to define any number of &lt;fx:Definition&gt; children. As described above, the definition itself is not an instance, but it allows you to make instances of it anywhere in the document.</p>
<p>The &lt;fx:Library&gt; tag <em>MUST</em> be the first tag right after the root tag, and only one can be defined per document.</p>
<p>&nbsp;</p>
<p><strong>Private<br />
</strong>The &lt;fx:Private&gt; tag provides meta information about the MXML or FXG document. The tag must be a child of the root document tag, and it must be the last tag in the file.</p>
<p>The compiler ignores all content of the &lt;fx:Private&gt; tag, although it must be valid XML. The XML can be empty, contain arbitrary tags, or contain a string of characters.</p>
<p>&nbsp;</p>
<p><strong>Reparent<br />
</strong>The &lt;fx:Reparent&gt; tag lets you specify an alternative parent to a child node, as part of a specific state.<br />
We will cover this in length in the post about the new states mechanism introduced with Flex 4, but the general syntax is:</p>
<p>&lt;fx:Reparent target=&rdquo;targetComp&rdquo; includeIn=&rdquo;stateName&rdquo;&gt;</p>
<p>The target property specifies the target component, and the includeIn property specifies a view state. When the current view state is set to stateName, the target component becomes a child of the parent component of&nbsp; the &lt;fx:Reparent&gt; tag. You can think of the &lt;fx:Reparent&gt; tag as a placeholder for the component for a&nbsp; specific view state.</p>
<p>&nbsp;</p>
<p>I attached some sample code. Note, that the sample for &lt;fx:Definition&gt; and &lt;fx:Library&gt; is the same one.</p>
<p>&nbsp;</p>
<p><a href="http://www.tikalk.com/flex/flex-sdk-3-vs-sdk-4">Back to index</a></p>
<p>&nbsp;</p>
</div>
<p>&nbsp;</p>
