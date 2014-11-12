---
layout: post
title: AngularJS - Select2 Infinite Scroll with Remote Data
created: 1396166372
author: liorb
permalink: angularjs-select2-infinite-scroll-with-remote-data
tags:
- JS
---
<p>I really like the&nbsp;<a href="http://ivaynberg.github.io/select2/">select2</a>&nbsp;project, I&#39;ve already used the library with the different configurations. I could not find however a good sample code for using it&#39;s infinite scroll option with AngularJS, so I made my own. Here&#39;s is my AngularJS version to the select2 docs&nbsp;<a href="http://ivaynberg.github.io/select2/#infinite">Infinite Scroll with Remote Data code sample</a></p>

<h3>&nbsp;</h3>

<h3>Using a Provider</h3>

<p>The select2 collects it&#39;s data from an external API. API calls are made from a service, Obviously, calling this service from the Directive it self is a bad idea, that&#39;s why I used a provider for this purpose. The provider is accessed by the directive and returns a&nbsp;<a href="http://docs.angularjs.org/api/ng/service/$q">Promise</a>&nbsp;while performing the service call. This way I keep my code components loosely coupled.</p>

<p>&nbsp;</p>

<pre style="background-image: URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif); background: #f0f0f0; border: 1px dashed #CCCCCC; color: black; font-family: arial; font-size: 12px; height: auto; line-height: 20px; overflow: auto; padding: 0px; text-align: left; width: 99%;">
<code style="color: black; word-wrap: normal;"> $scope.movieListProvider = {  
    readData: function(term, page, pageSize) {  
     var deferred = $q.defer();  
     rtService.get({  
      q: term,  
      page_limit: pageSize,  
      page: page + 1  
     })  
      .$promise.then(function(data) {  
       deferred.resolve(data);  
      }, function(reason) {  
       deferred.reject(reason);  
      });  
     return deferred.promise;  
    }  
   };  </code></pre>

<p><a href="http://plnkr.co/edit/SgUHU6">See the full source code here</a></p>
