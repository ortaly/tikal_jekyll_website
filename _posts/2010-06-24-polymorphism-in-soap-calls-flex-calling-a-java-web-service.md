---
layout: post
title: Polymorphism in SOAP calls – Flex calling a Java Web service
created: 1277362167
author: yoav.moran
permalink: /js/polymorphism-soap-calls-–-flex-calling-java-web-service
tags:
- JS
- wsdl
- soap
- polymorphism
- cxf
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<title></title>
<meta name="GENERATOR" content="OpenOffice.org 3.2  (Win32)"><style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style>    </meta>
</meta>
</p>
<p style="margin-bottom: 0in;">In the current application I am working on, we are using a Flex client that communicates with a Web service on the server side. The client's VOs are automatically generated.</p>
<p style="margin-bottom: 0in;">One of the things that bothered me in that model is &ndash; how can I implement polymorphysm in this model?</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Let's assume that in the wsdl there is a complex type <em>A</em>.</p>
<p style="margin-bottom: 0in;">Two types extend it (using xsd:extension) &ndash; <em>B1 </em>and <em>B2</em>.</p>
<p style="margin-bottom: 0in;">Another type C has element &ldquo;<em>a</em>&rdquo; of type <em>A</em>.</p>
<p style="margin-bottom: 0in;">Now, this means that SOAP messages with element of type <em>C</em> can have in their property &ldquo;<em>a</em>&rdquo; elements of types <em>A</em>, <em>B1 </em>and <em>B2</em>. Without special treatment, the receiving side (either the server on a SOAP request or the client on a SOAP response) will understand the object as type <em>A</em>, and won't generate the correct object.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">There are two ways to solve this that I know of.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" style="margin-left: -0.02in; margin-bottom: 0in;"><b>1. Substitution Group</b></p>
<p align="LEFT" style="margin-left: 0.23in; text-indent: -0.25in; margin-bottom: 0in;">&nbsp;</p>
<p style="margin-left: 0.01in; text-indent: -0.02in; margin-bottom: 0in;">See also <font color="#000080"><span lang="zxx"><u><a href="http://www.w3schools.com/schema/schema_complex_subst.asp">here</a>.</u></span></font></p>
<p style="margin-left: 0.01in; text-indent: -0.02in; margin-bottom: 0in;">The name of the element is changed according to the actual element. Meaning that if we are using <em>B1</em>, the element's name will be &ldquo;<em>b1</em>&rdquo; and not &ldquo;<em>a</em>&rdquo;.</p>
<p style="margin-left: 0.25in; text-indent: -0.25in; margin-bottom: 0in;">So instead of :</p>
<div class="rteindent1">&lt;C&gt;</div>
<div class="rteindent2">&lt;a/&gt;</div>
<div class="rteindent1">&lt;/C&gt;</div>
<p style="margin-bottom: 0in;">The SOAP will contain:</p>
<div class="rteindent1">&lt;C&gt;</div>
<div class="rteindent2">&lt;b1/&gt;</div>
<div class="rteindent1">&lt;/C&gt;</div>
<p style="margin-bottom: 0in;">To do that, the types <em>B1</em> and <em>B2</em> needs to have element defined with attribute <strong>substitutionGroup</strong>.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<div class="rteindent1">&lt;xs:element name=&rdquo;a&rdquo; type=&rdquo;A&rdquo;/&gt; <strong>&larr; The parent element</strong></div>
<div class="rteindent1">&lt;xs:element name=&rdquo;b1&rdquo; type=&rdquo;B1&rdquo; substitutionGroup=&rdquo;tns:a&rdquo;/&gt;</div>
<div class="rteindent1">&lt;xs:element name=&rdquo;b2&rdquo; type=&rdquo;B2&rdquo; substitutionGroup=&rdquo;tns:a&rdquo;/&gt;</div>
<div class="rteindent1">&nbsp;</div>
<p style="margin-bottom: 0in;">So now everywhere element &ldquo;<em>a</em>&rdquo; is used it can be substituted by element <em>b1 </em>or <em>b2</em>.</p>
<p style="margin-bottom: 0in;">It's a good solution &ndash; the problem is that Flex doesn't support substitutionGroup. It can be implemented, though, by overriding the SOAPDecoder and SOAPEncoder.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><b>2. xsi:type</b></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">See also <font color="#000080"><span lang="zxx"><u><a href="http://www.w3.org/TR/xmlschema-1/#xsi_type">here</a>.</u></span></font></p>
<p style="margin-bottom: 0in;">The elements in the SOAP request will include an additional <b>xsi:type</b> attribute. This attribute tells the receiving end what is the actual type of that element. This attribute can be applied only to the inheriting elements.</p>
<p style="margin-bottom: 0in;">I've chosen to implement this solution because it seemed easier working on the Flex's side. I would love to hear if there are any ideas how to implement the other solution.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><u><b>Implementing xsi:type</b></u></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">For this to work, we need both the Java side and the Flex side to understand xsi:type attributes (i.e. - to read and write these attributes).</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in; text-decoration: none;"><b>Server side:</b></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The server I have uses Apache Cxf to generate the proxy classes. The solution was found <a href="http://java.sun.com/webservices/docs/1.6/jaxb/vendorCustomizations.html#typesub"><u>here</u></a>.<font color="#000080"><span lang="zxx"><u><br />
</u></span></font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Besides adding this globalBindings element, you'll need to run the xjc with <i>-extension</i> argument.</p>
<p style="margin-bottom: 0in;">Since I've been using wsdl2java in ant, I added it as the parameter <b>-xjc-extension</b> like this:</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p align="LEFT" class="rteindent1" style="margin-bottom: 0in;"><font color="#000080"><font face="Courier New, monospace"><font size="2">&lt;java</font></font></font><font color="#000000"><font face="Courier New, monospace"><font size="2"> </font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">classname=</font></font></font><font color="#008000"><font face="Courier New, monospace"><font size="2">&quot;org.apache.cxf.tools.wsdlto.WSDLToJava&quot;</font></font></font><font color="#000000"><font face="Courier New, monospace"><font size="2"> </font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">fork=</font></font></font><font color="#008000"><font face="Courier New, monospace"><font size="2">&quot;true&quot;</font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">&gt;</font></font></font></p>
<p align="LEFT" class="rteindent1" style="margin-bottom: 0in;"><font color="#000000"><font face="Courier New, monospace"><font size="2">	</font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">&lt;arg</font></font></font><font color="#000000"><font face="Courier New, monospace"><font size="2"> </font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">value=</font></font></font><font color="#008000"><font face="Courier New, monospace"><font size="2">&quot;-xjc-extension&quot;</font></font></font><font color="#000080"><font face="Courier New, monospace"><font size="2">/&gt;</font></font></font></p>
<p align="LEFT" class="rteindent1" style="margin-bottom: 0in;"><font color="#000080"><font face="Courier New, monospace"><font size="2">	&hellip;</font></font></font></p>
<p align="LEFT" class="rteindent1" style="margin-bottom: 0in;"><font color="#000080"><font face="Courier New, monospace"><font size="2">&lt;/java&gt;</font></font></font></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in; text-decoration: none;"><b>Client side:</b></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The solution was found <a href="http://dev.c-ware.de/confluence/display/PUBLIC/Seting+up+Flex+to+communicate+with+Apache+CXF+web+service+using+Aegis+databinding#SetingupFlextocommunicatewithApacheCXFwebserviceusingAegisdatabinding-PatchingFlextoworkwithpolymorphdatatypes"><u>here</u></a>. The link points to the only section relevant to this issue. You'll need to override the SOAPEncoder and SOAPDecoder of the web service, and add their CxfSchemaTypeRegistryProxy class.</p>
<p style="margin-bottom: 0in;">Pay attention to the comments section &ndash; there are some important updates to the decoder (and an update I posted to the  CxfSchemaTypeRegistryProxy class).</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
