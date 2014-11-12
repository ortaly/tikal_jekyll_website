---
layout: post
title: Understanding Form Validation in AngularJS
created: 1395618801
author: liorb
permalink: "/understanding-form-validation-angularjs"
tags:
- JS
- AngularJS ngModel
---
<div>For my current project I needed to add custom validation to form-input fields in AngularJS. In order to do that, I had to interact with the validation mechanism and to extend it. I started by looking in the AngularJS docs and resources I found on Google. You may gain some basic understanding by reading the resources that are out there, but like with most open-source technologies, to really understand what is going on you need to dive into the source code &ndash; in this case the entire Angular source is under angular.js file. Let us see how we can learn about the validation mechanism by understanding the Angular library source code.</div>

<div><br />
Now, assuming your markup tells Angular the following:</div>

<pre style="background-image: URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif); background: #f0f0f0; border: 1px dashed #CCCCCC; color: black; font-family: arial; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;">
<code style="color: black; word-wrap: normal;"> &lt;input type=&quot;email&quot; ng-model=&quot;user.email&quot; /&gt;  
</code></pre>

<div><br />
The result will be an input text field that is bound to a certain model property (represented by ng-model). Additionally, if you have bootstrap or any other CSS handling for this scenario the fields will react to the values that are typed inside it, typing anything but a valid email address will result in the field being marked on the screen as invalid.</div>

<div>&nbsp;</div>

<div>But what is really happening under the hood? Let us look at the Angular code and see..</div>

<div><br />
First, Angular maps each input tag to its input Directive, which means that when you are working under Angular and writing an &ldquo;input&rdquo; tag, your HTML will be compiled and replaced by an Angular directive.</div>

<pre style="background-image: URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif); background: #f0f0f0; border: 1px dashed #CCCCCC; color: black; font-family: arial; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;">
<code style="color: black; word-wrap: normal;"> var inputDirective = [&#39;$browser&#39;, &#39;$sniffer&#39;, function($browser, $sniffer) {  
  return {  
   restrict: &#39;E&#39;,  
   require: &#39;?ngModel&#39;,  
   link: function(scope, element, attr, ctrl) {  
    if (ctrl) {  
     (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer,  
                               $browser);  
    }  
   }  
  };  
 }];  
</code></pre>

<div>&nbsp;</div>

<div>Note that the directive is expecting your input tag to include an <a href="http://docs.angularjs.org/api/ng/directive/ngModel">ngModel</a>, the created <a href="http://docs.angularjs.org/api/ng/type/ngModel.NgModelController">ngModelController</a> is then passed to the link function. By doing this Angular creates a connection between the input field (the view) and the model. This connection is the core of every validation action.</div>

<p>&nbsp;</p>

<div>Angular then uses the type attribute that was used (&#39;email&#39; in our case), to a matching function (&#39;emailInputType&#39; in our case), the code for emailInputType is as follows:</div>

<p>&nbsp;</p>

<p>&nbsp;</p>

<pre style="background-image: URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif); background: #f0f0f0; border: 1px dashed #CCCCCC; color: black; font-family: arial; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;">
<code style="color: black; word-wrap: normal;"> function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {  
  textInputType(scope, element, attr, ctrl, $sniffer, $browser);  
  ....  
 }  
</code></pre>

<div>&nbsp;</div>

<div>In the above code you can see the one of Angualr&#39;s internal basic code-reuse pattern. What this code does is referencing the &ldquo;parent&rdquo; function textInputType, this function is called from all text input types...from an OO point of view you can almost say that our emailInputType &ldquo;extends&rdquo; textInputType.<br />
&nbsp;
<pre style="background-color: #f0f0f0; background-position: initial initial; background-repeat: initial initial; border: 1px dashed rgb(204, 204, 204); font-family: arial; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;">
<code style="color: black; word-wrap: normal;"> function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {  
  textInputType(scope, element, attr, ctrl, $sniffer, $browser);  
  var emailValidator = function(value) {  
   if (ctrl.$isEmpty(value) || </code><code style="word-wrap: normal;"><span style="color: red;">EMAIL_REGEXP.test(value</span></code><code style="color: black; word-wrap: normal;">)) {  
    </code><code style="word-wrap: normal;"><span style="color: blue;">ctrl.$setValidity(&#39;email&#39;, true); </span></code><code style="color: black; word-wrap: normal;"> 
    return value;  
   } else {  
    </code><code style="word-wrap: normal;"><span style="color: blue;">ctrl.$setValidity(&#39;email&#39;, false);  </span></code><code style="color: black; word-wrap: normal;">
    return undefined;  
   }  
  };  
  ctrl.$formatters.push(emailValidator);  
  ctrl.$parsers.push(emailValidator);  
 }  
</code></pre>
&nbsp;

<div>As you can see, this code uses a simple REGEX validation test, it interacts with the ctrl (the ngModelController that was &#39;required&#39; in the first snippet). Once a test succeeds or fails, the code updates the ngModelController&#39;s $setValidity method. This controller wraps the model used by the input, and the input tells it the model is now valid or invalid.
<h4>So what have we learned?</h4>
We have learned that:

<ol>
	<li>Angular renders your input HTML tags as directives,</li>
	<li>it uses REGEX to match the text inside the directive against the input type pattern (email in our case).&nbsp;</li>
	<li>We have also learned how code reuse or extension like is done for Angular form items.</li>
</ol>
</div>
<br />
<br />
<br />
<br />
<br />
&nbsp;</div>
