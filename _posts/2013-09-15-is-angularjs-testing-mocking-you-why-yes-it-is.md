---
layout: post
title: Is AngularJS testing mocking you? Why, yes, it is!
created: 1379256350
author: robert
permalink: /js/angularjs-testing-mocking-you-why-yes-it
tags:
- JS
- AngularJS AngularJS-Service Testing
---
<p>Mocking a request in AngularJS, the annoying version.</p>

<p>Let me start this article with a disclaimer: I am new to AngularJS.</p>

<p>That being said, I really enjoyed coding with it, and despite its opinionated nature (as some people keep saying), I found it to be fun, mostly intuitive (once I knew a bit more of the API) and it worked really well. That is, of course, until I got to the point of writing tests.&nbsp;</p>

<p>The first few tests were easy enough. Inject the service I was testing, make sure the object existed and had everything I expected it to have. Awesome. All the tests passed after a few minor noob mistakes of mine were cleared.</p>

<p>Then came the async test. I read a few articles, tried a few things out and everything seemed to be working well there. A simple test for async functionality would look like this:</p>

<div>
<pre>
<code class="js">
it(&#39;should succeed in doing a simple non related async test&#39;, function(){

        var cb = jasmine.createSpy();

        setTimeout(cb,1900);

        waitsFor(function(){return cb.callCount &gt; 0},&#39;should succeed&#39;,2000);

        runs(function(){expect(cb).toHaveBeenCalled();});
    });</code></pre>
</div>

<p>Pretty easy and it works too. But I needed to test an ajax request so I wrote one like this:&nbsp;</p>

<p>&nbsp;</p>

<pre>
&#39;use strict&#39;;

describe(&#39;Service: MyService&#39;, function () {
   // instantiate service
    var MyService , httpBackend, http;
    beforeEach(function(){
        module(&#39;MyApp&#39;);
        inject(function (_MyService_) {
            MyService = _MyService_;
        });
        inject(function($httpBackend, $http) {
            httpBackend = $httpBackend;
            http = $http;
            var message = {msg:&quot;This is a message.&quot;};
            httpBackend.whenGET(&#39;/mock/message/1&#39;).respond(message);
        });
    });

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it(&#39;should make one call to mock service and retrieve something&#39;, function () {

        var cb = jasmine.createSpy();

        http.get(&quot;/mock/message/1&quot;).success(cb).error(cb);

        waitsFor(function(){return cb.callCount &gt; 0},&#39;should succeed&#39;,2000);

        runs(function(){httpBackend.flush();expect(cb).toHaveBeenCalled();});

    });
});</pre>

<p>&nbsp;</p>

<p>This test, according to practically every blog post out there, should have worked. It didn&#39;t. &nbsp;Then came two workdays of banging my head against the desk, the wall, my own fist and various other objects. You may notice that in the tests, I am showing a test without the ngMockE2E module. I tried that too. It didn&#39;t work either. More head banging ensued. &nbsp;You may also notice that I&#39;m actually mocking a request, not trying to go to some outside url like http://www.google.com and simply testing for something to return. No, angular-mocks.js does not allow that. It fails with an error of unexpected request . There IS of course, a way around the unexpected request problem. You could do something like this:</p>

<p>httpBackend.whenGET(&#39;http://www.google.com&#39;).passThrough();</p>

<p>It allows the request to go through the regular channels and not the fake $httpBackend service. Still, you can only do it in the currently unstable versions of AngularJS or with ngMockE2E (still didn&#39;t work properly with ngMockE2E for me, but that may have been an issue with me, not the module).</p>

<p>So AngularJS was mocking me and testing me, instead of it being the other way around. I am nothing if not stubborn so, back to the interwebs I went.&nbsp;</p>

<p>Eventually, I found the answer in some dark corner of the internet on a blog of some kind that I can&#39;t even find again.</p>

<p>The answer was simple, but essential.<u><em><strong> AngularJS is opinionated AND hungry, so to make $http requests fire in a test, you must either $apply or $digest</strong></em></u>.&nbsp;</p>

<p>The test that finally worked looked like this:&nbsp;</p>

<pre>
&#39;use strict&#39;;

describe(&#39;Service: MyService&#39;, function () {
   // instantiate service
    var MyService, httpBackend, http, root;
    beforeEach(function(){
        module(&#39;MyApp&#39;);
        inject(function (_MyService_) {
            MyService= _MyService_;
        });
        inject(function($httpBackend, $http, $rootScope) {
            httpBackend = $httpBackend;
            http = $http;
            root = $rootScope;
            var message = {msg:&quot;This is a message.&quot;};
            httpBackend.whenGET(&#39;/mock/message/1&#39;).respond(message);
        });
    });

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });    

    it(&#39;should make one call to mock service and retrieve something&#39;, function () {

        var cb = jasmine.createSpy();

        http.get(&quot;/mock/message/1&quot;).success(cb);

        waitsFor(function(){return cb.callCount &gt; 0},&#39;should succeed&#39;,2000);
        root.$apply();
        httpBackend.flush();
        runs(function(){expect(cb).toHaveBeenCalled();});
    });
});</pre>

<p>This worked for me, and with a few minor tweaks, managed to work with the actual service I was testing. Your own exprience may vary, and you may want to put the $apply and flush calls in the runs() callback, but as it is written above should work for a simple $http test.</p>

<p>&nbsp;</p>
