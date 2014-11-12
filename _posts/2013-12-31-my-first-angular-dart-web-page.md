---
layout: post
title: My First Angular Dart Web Page
created: 1388488002
author: oren.kleks
permalink: my-first-angular-dart-web-page
tags:
- JS
- DART Angular
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><a href="https://github.com/angular/angular.dart" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Angular dart</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"> is another flavour of Angular.js. </span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Let&rsquo;s get started with the squared value example.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The pubspec.yaml (repository definitions) is below.</span></span></p>

<p>&nbsp;</p>

<div dir="ltr">
<table style="border:none;border-collapse:collapse;width:624px">
	<colgroup>
		<col width="*" />
	</colgroup>
	<tbody>
		<tr style="height:0px">
			<td style="border:1px solid #000000;vertical-align:top;padding:7px 7px 7px 7px">
			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">name: angular_dart_squared</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">version: 0.0.1</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">dependencies:</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;angular: any</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;browser: any</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;js: any</span></span></p>
			&nbsp;

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">dev_dependencies:</span></span></p>

			<p dir="ltr" style="line-height:1;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;unittest: any</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The index.html file looks like:</span></span></p>

<p>&nbsp;</p>

<div dir="ltr">
<table style="border:none;border-collapse:collapse;width:624px">
	<colgroup>
		<col width="*" />
	</colgroup>
	<tbody>
		<tr style="height:0px">
			<td style="border:1px solid #000000;vertical-align:top;padding:7px 7px 7px 7px">
			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;!DOCTYPE html&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; vertical-align: baseline; white-space: pre-wrap;">html ng-app</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;head&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&lt;title&gt;Sqaured Value Calculation&lt;/title&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;/head&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;body&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span></span></p>
			&nbsp;

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&lt;input type=&quot;number&quot; ng-model=&quot;</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">value</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&quot;&gt; squared </span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;h3&gt;= {{</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">value*value</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}}!&lt;/h3&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;script type=&quot;application/dart&quot; src=&quot;</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">main.dart</span><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&quot;&gt;&lt;/script&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&lt;script type=&quot;text/javascript&quot; src=&quot;packages/browser/dart.js&quot;&gt;&lt;/script&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;/body&gt;</span></span></p>

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&lt;/html&gt;</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p><br />
&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">As you can notice the value is being taken from the input, and calculated inside the client.</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The main.dart file is pretty simple:</span></span></p>

<p>&nbsp;</p>

<div dir="ltr">
<table style="border:none;border-collapse:collapse;width:624px">
	<colgroup>
		<col width="*" />
	</colgroup>
	<tbody>
		<tr style="height:0px">
			<td style="border:1px solid #000000;vertical-align:top;padding:7px 7px 7px 7px">
			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">import &#39;package:angular/angular.dart&#39;;</span></span></p>
			&nbsp;

			<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">main() =&gt; ngBootstrap();</span></span></p>
			</td>
		</tr>
	</tbody>
</table>
</div>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><span style="font-size: 15px; font-family: Cambria; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">and the result looks like:</span></span></p>

<p><br />
<span id="docs-internal-guid-79dfe619-4850-39c6-0e09-5937819d3a81"><img height="160px;" src="https://lh3.googleusercontent.com/vGku1Qkt-dJyJYySmOlmi9BVwdJsqSmsmzfjTA8a7XzwEOr1NwCdsDyfBN-w-Pc1PTQzPAWCzVXsEorFgeONQGSImH1ZqIvVUdkQm9ZZSJ6lL2wRNdpn6LQnHA" width="422px;" /></span></p>

<p>As you can see in less than 5 minutes you can get started with Angular.Dart.</p>
