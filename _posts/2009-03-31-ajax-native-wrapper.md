---
layout: post
title: AJAX (native) Wrapper
created: 1238510442
permalink: ajax-native-wrapper
tags:
- JAVA
---
<p>Hi all,</p>
<p>I wanted to share something I wrote couple of days back. My goal was to catch all AJAX calls so I can override the requests and responses and some other stuff I needed. This is not final just an example which actually works. Any framewrok which creates an ActiveXObject / XMLHttpRequest (it depend on the browser) actually uses this implementation. The amazing thing is - that it's actually work :)</p>
<p>One disadvantage I can think of is the number of object I need to create in advance (pool). And of course it has to be on the most top part of the page (head).</p>
<p>Enjoy.</p>
<pre>
function createXMLHttpRequest() {
 var ajax_request = false;
 if(window.ActiveXObject) {
 //IE
 // loops through the various versions of XMLHTTP to ensure we're using the latest
 var versions = [&quot;Msxml2.XMLHTTP.7.0&quot;, &quot;Msxml2.XMLHTTP.6.0&quot;, &quot;Msxml2.XMLHTTP.5.0&quot;, 
 &quot;Msxml2.XMLHTTP.4.0&quot;, &quot;MSXML2.XMLHTTP.3.0&quot;, &quot;MSXML2.XMLHTTP&quot;,
 &quot;Microsoft.XMLHTTP&quot;];

 for (var i = 0; i &lt; versions.length ; i++) {
 try {
 // try to create the object
 // if it doesn't work, we'll try again
 // if it does work, we'll save a reference to the proper one to 
 // speed up future instantiations
 ajax_request = new ActiveXObject(versions[i]);

 if (ajax_request) {
 break;
 }
 }catch (objException) {
 // trap; try next one
 } ;
 }
 }

 //Firefox
 if (!ajax_request &amp;&amp; typeof XMLHttpRequest != 'undefined') {
 ajax_request = new XMLHttpRequest ();
 }
 return ajax_request;
}

var AJAXObject = new Array;
var AJAXPool = new Array();
AJAXPool[0] = createXMLHttpRequest();
AJAXPool[1] = createXMLHttpRequest();
AJAXPool[2] = createXMLHttpRequest();

var ActiveXObject = XMLHttpRequest = function() {

 this.poolIdx = null;
 this.status ;
 this.onreadystatechange;
 this.onerror = onerror;
 this.readyState;
 this.responseText;
 this.responseXML;

 this.open = function(x, y, z){
 if (this.poolIdx == null) {
 this.poolIdx = AJAXObject.length;
 this.add2Pool(this, this.poolIdx);
 }
 AJAXPool[this.poolIdx].open(x, y, z);
 }

 this.abort = function(){
 if (this.poolIdx != null) {
 return AJAXPool[this.poolIdx].abort(); 
 }
 return null;
 }

 this.getResponseHeader = function(header) {
 if (this.poolIdx != null) {
 return AJAXPool[this.poolIdx].getResponseHeader(header); 
 }
 return null;
 }
 this.getAllResponseHeaders = function(){
 if (this.poolIdx != null) {
 return AJAXPool[this.poolIdx].getAllResponseHeaders(header);
 }
 return null;
 }
 this.setRequestHeader = function(header, value) {
 if (this.poolIdx == null) {
 this.poolIdx = AJAXObject.length;
 this.add2Pool(this, this.poolIdx);
 }
 AJAXPool[this.poolIdx].setRequestHeader(header, value);
 }

 this.send = function(data) {
 readyStateChange.prototype.poolIdx = this.poolIdx;
 readyStateChange(this);
 AJAXPool[this.poolIdx].onreadystatechange = readyStateChange; 
 AJAXPool[this.poolIdx].send(data);
 }

 this.add2Pool = function (obj, idx) {
 if (AJAXObject != null) {
 AJAXObject[idx] = obj;
 }
 }
};
 

function readyStateChange(pool) {
 this.poolIdx = readyStateChange.prototype.poolIdx;
 if (pool != null &amp;&amp; (typeof(pool) != 'undefined' &amp;&amp; 
 typeof(pool.poolIdx) != 'undefined')) { 

 } else {
 if (this.poolIdx != null
 &amp;&amp; AJAXObject[this.poolIdx] != null) {
 pool = AJAXObject[this.poolIdx];
 } 

 }
 if (AJAXPool[this.poolIdx].readyState == 4) { 
 try{
 pool.status = AJAXPool[this.poolIdx].status;
 pool.readyState = AJAXPool[this.poolIdx].readyState;
 pool.responseText = AJAXPool[this.poolIdx].responseText; 
 pool.responseXML = AJAXPool[this.poolIdx].responseXML; 
 } catch(e){
 //
 }
 }
 if (pool != null) {
 pool.readyState = AJAXPool[this.poolIdx].readyState; 
 if (typeof(pool.onreadystatechange) != 'undefined') {
 pool.onreadystatechange();
 }
 }
}
readyStateChange.prototype.poolIdx = 0;

function onerror(){}


</pre>
