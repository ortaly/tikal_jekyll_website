---
layout: post
title: Advanced dozer mappings
created: 1370959081
author: chaim.turkel
permalink: advanced-dozer-mappings
tags:
- JAVA
- Java
- dozer
---
<h1 align="center" style="text-align: center;">
	Advanced dozer mappings<o:p></o:p></h1>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	We are using dozer to map our external model (used in the soap api) to our internal model. We have been very happy with dozer and it has a lot of options. <o:p></o:p></div>
<div class="MsoNormal">
	We have come across the following problem. We have an object say person. A person can have multiple addresses. We save the addresses in a general class, and the person has a list of all addresses. There are times where this is not a nice presentation to the soap api, and we wanted a specific class per address. <o:p></o:p></div>
<div class="MsoNormal">
	This is the internal model:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: lightgrey; mso-highlight: lightgrey;">Address</span> {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">type</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">street</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">city</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">zip</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> Person {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> <u>List</u>&lt;Address&gt; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">addresses</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	The external model should look like:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> PersonView {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> <u>List</u>&lt;Address&gt; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">addresses</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: lightgrey; mso-highlight: lightgrey;">HomeAddress</span> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">home</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> <u>WorkAddress</u> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">work</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> HomeAddress {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">street</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">city</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><u><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">zip</span></u><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	To make matters harder the reason we left the addresses in the PersonView, is that addresses that are not home or work will still stay in the old list without a specific class.<o:p></o:p></div>
<div class="MsoNormal">
	This brings us to a need to map multiple fields to the same field. From the external we need to map all three fields (addresses,home,work) to the one field of the internal (address). And the same in the reverse &ndash; from one field to three. <o:p></o:p></div>
<div class="MsoNormal">
	The official documentation on dozer for mapping multiple fields to one is as follows:<o:p></o:p></div>
<h3 style="background: white; line-height: 30.0pt; margin-bottom: 7.5pt; margin-left: 0in; margin-right: 0in; margin-top: 7.5pt;">
	<span style="color: #333333; font-family: &quot;Helvetica&quot;,&quot;sans-serif&quot;; font-size: 18.0pt;">How do I map multiple fields to a single field?<a href="" name="How_do_I_map_multiple_fields_to_a_single"></a><o:p></o:p></span></h3>
<div style="background: white; line-height: 15.0pt; margin-bottom: 7.5pt; margin-left: 5.25pt; margin-right: 5.25pt; margin-top: 0in;">
	<span style="color: #333333; font-family: &quot;Helvetica&quot;,&quot;sans-serif&quot;; font-size: 10.5pt;">Dozer doesn&#39;t currently support this. And because of the complexities around implementing it, this feature is not currently on the road map. A possible solution would be to wrap the multiple fields in a custom complex type and then define a custom converter for mapping between the complex type and the single field. This way, you could handle the custom logic required to map the three fields into the single one within the custom converter.<o:p></o:p></span></div>
<div class="MsoNormal">
	(<a href="http://dozer.sourceforge.net/documentation/faq.html#mult-fields-to-single-field">http://dozer.sourceforge.net/documentation/faq.html#mult-fields-to-single-field</a>)<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	Though it is not officially supported it does actually work as follows:<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	Dozer processes the objects according to the order of the fields in the map file. So if you have multiple fields to the set, dozer will run them. But for it to work properly you must create a custom converter. In this converter when converting from external to internal, you need to create a new entry in the list with the parameters from the specific class. In the case of internal to external you need to create the specific class and remove the entry from the list (so that it will not be twice). You need to make sure that the list mapping is the last in the file, so that you can remove the entries that are now mapped to a specific class.<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<h2>
	Mapping inherences<o:p></o:p></h2>
<div class="MsoNormal">
	Now let&rsquo;s say that we have the core project, and want to have other projects that use the core to enhance the person view and add a new type of address. The address already exits in the list of addresses but it does not have a specific class.<o:p></o:p></div>
<div class="MsoNormal">
	Obviously we need to create a new class of PersonExView so that it will hold the new type of address.<o:p></o:p></div>
<div class="MsoNormal">
	The problem is that dozer does not support inheritance in the xml files (to something like parent in spring configuration files). So we cannot add another map file for dozer to map from PersonExView to Person, since this would mean that we have two mappings to the class of Person.<o:p></o:p></div>
<div class="MsoNormal">
	I will describe the different options and the problem with each option, and in the end come back to a solution in the xml files.<o:p></o:p></div>
<h2>
	API mapping (<a href="http://dozer.sourceforge.net/documentation/apimappings.html">http://dozer.sourceforge.net/documentation/apimappings.html</a>)<o:p></o:p></h2>
<div class="MsoNormal">
	This solution actually works nicely were we can create the map via the code. We can define a parameter for the external class (core==PersonView, extention=PresonExView), and then add the specific fields accordingly.<o:p></o:p></div>
<div class="MsoNormal">
	If necessary this is an option that works. I did not like it since it meant that most of the conversions were in the map file and some in the code. This can bring problems in the future when you need to add more fields and don&rsquo;t remember where. <o:p></o:p></div>
<h2>
	Custom Converters (<a href="http://dozer.sourceforge.net/documentation/customconverter.html">http://dozer.sourceforge.net/documentation/customconverter.html</a>)<o:p></o:p></h2>
<div class="MsoNormal">
	Dozer supports a few types of custom converters. The basic ones are field converts and type converters. <o:p></o:p></div>
<h3>
	Field converter<o:p></o:p></h3>
<div class="MsoNormal">
	The field converter is not good enough since we need to map multiple fields to one field.<o:p></o:p></div>
<h3>
	Type converter<o:p></o:p></h3>
<div class="MsoNormal">
	The type converter looked promising since it gives you full access to the object and you can do whatever you want. The problem is that I only wanted to change some fields and let dozer do the rest. Once you use a type converter you need to cover all fields by yourself. If the fields are complex fields you can pass them to dozer to covert for you (by injection the dozer map class into the converter). But basic fields like from string to int, you need to do yourself since the dozer map class assumes they are encapsulated in a class.<o:p></o:p></div>
<h3>
	Dozer Events<o:p></o:p></h3>
<div class="MsoNormal">
	Dozer also supports events, and will let you know every stage of the process, so you can write a hook and catch before a field is converted or after it is converted. This looked more promising since it will allow dozer to all the work, and I can inject my code as part of the process and just do my fields without all the others.<o:p></o:p></div>
<div class="MsoNormal">
	The problem here is that there is no place that maps the class PresonExView to Person. Even if we could map it we come back to the problem that you cannot map two classes to one class.<o:p></o:p></div>
<h3>
	File profile mapping<o:p></o:p></h3>
<div class="MsoNormal">
	In the end I found that the nicest solution is to use only xml files (with the field converter for the addresses) and use what is called mapId (profiles).<o:p></o:p></div>
<div class="MsoNormal">
	This feature will allow you to define two different maps. One will map the PersonView to Person:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">mapping</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">map-null</span>=<i><span style="color: #2a00ff;">&quot;false&quot;</span></i> <span style="color: #7f007f;">type</span>=<i><span style="color: #2a00ff;">&quot;bi-directional&quot;</span></i> <span style="color: #7f007f;">map-id</span>=<i><span style="color: #2a00ff;">&quot;core&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">Person</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">PersonView</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">custom-converter-id</span>=<i><span style="color: #2a00ff;">&quot;addressConverterId&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">addresses</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">home</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">custom-converter-id</span>=<i><span style="color: #2a00ff;">&quot;addressConverterId&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">addresses</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">work</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&nbsp;&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">mapping&gt;<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	&nbsp;</div>
<div class="MsoNormal">
	And in the extended project another file:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">mapping</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">map-null</span>=<i><span style="color: #2a00ff;">&quot;false&quot;</span></i> <span style="color: #7f007f;">type</span>=<i><span style="color: #2a00ff;">&quot;bi-directional&quot;</span></i> <span style="color: #7f007f;">map-id</span>=<i><span style="color: #2a00ff;">&quot;extended&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">Person</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">PersonExView</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">class-b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">custom-converter-id</span>=<i><span style="color: #2a00ff;">&quot;addressConverterId&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">addresses</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">home</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">custom-converter-id</span>=<i><span style="color: #2a00ff;">&quot;addressConverterId&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">addresses</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">work</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">custom-converter-id</span>=<i><span style="color: #2a00ff;">&quot;addressConverterId&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">addresses</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">a</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">mobile</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">b</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">field</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&gt;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&nbsp;&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">mapping&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<br />
<div class="MsoNormal">
	This will work since we do not have both in use at the same time. When you want to convert between objects you specify the mapId. This way at runtime only one definition will be used and dozer will know to use the correct converter. In the way you can achieve what I call mapping inheritance. It is not real inheritance since you need to redefine the whole object, but it allows different types of mappings for the same object to others depending on the scenario (profile/mapId).<o:p></o:p></div>
