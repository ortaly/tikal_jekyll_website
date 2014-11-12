---
layout: post
title: Building SMS marketing application with Twilio
created: 1327045357
author: hanan
permalink: /building-sms-marketing-application-twilio
tags:
- JAVA
- Mobile
- Twilio
- SMS
- marketing
- java application design
---
<div>Twilio provides <b>infrastructure APIs</b> for businesses to build scalable, reliable <b>voice and text messaging</b> applications. Using Twilio you can:</div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>&middot;<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Make and receive phone calls - <span style="Times New Roman&quot;;Times New Roman&quot;">build applications that use the phone network to interact with people on landlines and cell phones all over the world. In just a few lines of code, you'll have phones ringing</span></div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>&middot;<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Send and receive text messages - <span style="Times New Roman&quot;;Times New Roman&quot;">Build applications that interact via text messages. Get up and running in minutes with a simple, phone-number based API or apply for your very own short code today</span></div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>&middot;<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Add voice client to web sites &ndash; an <span style="Times New Roman&quot;;Times New Roman&quot;">audio pipes that turn every application into a phone. Connect your users across web browsers, mobile phones, tablets, and even traditional phones</span></div>
<div class="rteindent1">&nbsp;</div>
<p>Whether you are building voice or text application, Twilio API data flow is quite simple:</p>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span>&nbsp;<span style="Times New Roman&quot;;Times New Roman&quot;">A User calls or sends an SMS to your Twilio phone number</span></div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>2.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style="Times New Roman&quot;;Times New Roman&quot;">Twilio receives the call or SMS and makes a request to your application</span></div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>3.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style="Times New Roman&quot;;Times New Roman&quot;">Your app receives that request information and sends XML back to Twilio</span></div>
<div class="rteindent1" style="text-indent:-18.0pt;"><span>4.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style="Times New Roman&quot;;Times New Roman&quot;">Twilio executes those instructions and interacts with the user</span></div>
<div class="rteindent1">&nbsp;</div>
<div>&nbsp;</div>
<div>Twilio provided many implementations to theirs API including JAVA, PHP, RUBY, NodeJS and more.&nbsp;Following is a simple example for text (SMS) marketing application using JAVA client to Twilio.</div>
<div>Lets assume your business maintains a client base for marketing promotions. Once a week we would like to send text message to all clients stating the upcoming promotion.</div>
<div>&nbsp;</div>
<div>First we authentication our self to Twilio using API key and authentication token</div>
<div>&nbsp;</div>
<pre title="code" class="brush: java;">
String accountId = &ldquo;xxxxxxxx&rdquo;; //your account api key
String authToken = &ldquo;xxxxxxxxxx&rdquo;; //your auth token

final TwilioRestClient client = new TwilioRestClient(accountId, authToken);
final Account mainAccount = client.getAccount();
if (mainAccount == null) {
logger.error(&quot;Authentication failed. Main account is ampty.&quot;);
	return false;
}
</pre>
<div>&nbsp;</div>
<p>&nbsp;</p>
<p><style type="text/css">
<!--
 /* Font Definitions */
@font-face
	{font-family:"ＭＳ 明朝";
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-charset:128;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:fixed;
	mso-font-signature:1 134676480 16 0 131072 0;}
@font-face
	{font-family:"ＭＳ 明朝";
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-charset:128;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:fixed;
	mso-font-signature:1 134676480 16 0 131072 0;}
@font-face
	{font-family:Cambria;
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073743103 0 0 415 0;}
 /* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin:0cm;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"ＭＳ 明朝";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"ＭＳ 明朝";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
@page WordSection1
	{size:612.0pt 792.0pt;
	margin:72.0pt 90.0pt 72.0pt 90.0pt;
	mso-header-margin:36.0pt;
	mso-footer-margin:36.0pt;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
-->
</style>     <span style="font-size:12.0pt;font-family:Cambria;
mso-ascii-theme-font:minor-latin;mso-fareast-font-family:&quot;ＭＳ 明朝&quot;;mso-fareast-theme-font:
minor-fareast;mso-hansi-theme-font:minor-latin;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:minor-bidi;mso-ansi-language:EN-US;mso-fareast-language:
EN-US;mso-bidi-language:AR-SA">Second lets assume you have loaded all you clients phone number into a map. We will iterate over the map and send our promotion text message to all clients</span></p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
Map&lt;String, String&gt; clients; //Map&lt;phone number, client name&gt;
Final SmsFactory smsFactory = mainAccount.getSmsFactory();
if (smsFactory == null) {
logger.error(&quot;Authentication failed. Sms factory empty.&quot;);
	return false;
}

String from = &ldquo;xxxxx&rdquo;;  //our Twilio phone number
String promotion = &ldquo;Best deal ever&rdquo;;  //our promotion text

final Map&lt;String, String&gt; smsParams = new HashMap&lt;String, String&gt;(); //params for the sms object

for (String number : clients.keySet()) {
	String clientName = clients.get(number);
	String message = &ldquo;Hello &ldquo; + clientName + promotion;

smsParams.put(&quot;From&quot;, from);
	smsParams.put(&quot;To&quot;, number);
	smsParams.put(&quot;Body&quot;, message);

	try {
		Sms sms = smsFactory.create(smsParams);
	}
	catch (TwilioRestException e) {
		logger.error(e.getMessage());
	}	
}
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><style type="text/css">
<!--
 /* Font Definitions */
@font-face
	{font-family:"ＭＳ 明朝";
	panose-1:0 0 0 0 0 0 0 0 0 0;
	mso-font-charset:128;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:fixed;
	mso-font-signature:1 134676480 16 0 131072 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:1;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:0 0 0 0 0 0;}
@font-face
	{font-family:Cambria;
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073743103 0 0 415 0;}
 /* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin:0cm;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"ＭＳ 明朝";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:"ＭＳ 明朝";
	mso-fareast-theme-font:minor-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
@page WordSection1
	{size:612.0pt 792.0pt;
	margin:72.0pt 90.0pt 72.0pt 90.0pt;
	mso-header-margin:36.0pt;
	mso-footer-margin:36.0pt;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
-->
</style></p>
<p class="MsoNormal">That it. Simple.</p>
<p class="MsoNormal">This is only a simple example. You can do many things using this API in regards to SMS such as group chatting, password verifications, reminders, text manipulations and more.</p>
<br />
<p>&nbsp;</p>
