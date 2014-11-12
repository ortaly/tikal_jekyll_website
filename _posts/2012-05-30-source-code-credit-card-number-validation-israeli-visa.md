---
layout: post
title: 'Source Code: Credit card number validation (Israeli Visa)'
created: 1338394544
author: avit
permalink: /source-code-credit-card-number-validation-israeli-visa
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/01/18/source-code-credit-card-number-validation-israeli-visa/credit-card-with-dollars/' rel='attachment wp-att-309'><img alt='' class='alignleft size-thumbnail wp-image-309' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/01/iStock_000004333130XSmall-150x150.jpg' title='Credit card with dollars' width='150' /></a>
<p>Usually, it’s enough, yet sometimes a client demand or a product demand is to create a more sophisticated validation, using known credit card algorithm that the CreditCard company issues from time to time.</p>

<p>I had just that need a while back.</p>

<p>So, I created the validation and I decided to share it with you here. <!--more--> First, let’s create a helper for checking wether a number is an even or an odd number. this will be used later in the validation process. <script src='http://gist.github.com/279810.js?file=gistfile1.cs' /> A credit card validation is being done using something that’s called a “weight number”, each credit card number is attached to a weight number and some calculations are done accordingly. So, let’s create a class which takes a number and a weight number, we will also create a constructor for this class. <script src='http://gist.github.com/279812.js?file=gistfile1.cs' /></p>

<p>Now, we have the helper to check whether a number is odd or even, we have a class to hold the credit card numbers.</p>

<p>The algorithm says something simple, starting at the <strong>right </strong>side of the number (credit card number) start attaching weight numbers.</p>

<p>Start with 1, then 2 and so on and so fourth till the end of the number.</p>

<p>like so:</p>

<p><span>caption id=”attachment_315” align=”aligncenter” width=”364” caption=”Numbers and weight numbers”</span><a href='http://www.kensodev.com/2010/01/18/source-code-credit-card-number-validation-israeli-visa/18-01-2010-07-50-56/' rel='attachment wp-att-315'><img alt='' class='size-full wp-image-315' height='52' src='http://www.kensodev.com/wp-content/uploads/2010/01/18-01-2010-07-50-56.png' title='Credit card numbers' width='364' /></a><span>/caption</span></p>

<p>After you do this, multiply the number with the weight number, if the result you get is greated then the number 10, add the first number to the second number.</p>

<p>Example: if you get 16 in the result, simply add 1+6 and the final result is 7.</p>

<p>like so:</p>

<p><span>caption id=”attachment_316” align=”aligncenter” width=”373” caption=”Calculation metod - weight numbers”</span><a href='http://www.kensodev.com/2010/01/18/source-code-credit-card-number-validation-israeli-visa/18-01-2010-07-55-39/' rel='attachment wp-att-316'><img alt='' class='size-full wp-image-316' height='109' src='http://www.kensodev.com/wp-content/uploads/2010/01/18-01-2010-07-55-39.png' title='Credit card validation numbers' width='373' /></a><span>/caption</span></p>

<p>After you do this, simply sum up the result</p>

<p>8+5+7+0+2+4+0+0+0+1+4+1+6+2+2+8</p>

<p>Any result should is OK as long as the number is divided by 10, if the number is not divided by 10 exactly something is wrong with the credit card.</p>

<p>This is the final validation function</p>

<p>The function is commented so no further explanation is needed.</p>
<script src='http://gist.github.com/279817.js?file=gistfile1.cs' />
<p>Feel free to ask any question in the comments</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/1DqmUNAdK5c" height="1" width="1"/>
