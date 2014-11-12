---
layout: post
title: Fuse Day 9/11 - An application on node.js & elastic search
created: 1316111500
author: ittayd
permalink: /fuse-day-911-application-nodejs-elastic-search
tags:
- Incubator
- fuse node.js elastic_search
- node.js
---
<p>In this fuse day, several of us learned how to program in <a href="http://nodejs.org/">node.js </a>and how to use <a href="http://www.elasticsearch.org/">elastic search</a> to store data.</p>
<p>&nbsp;</p>
<p>The subject was to create an application that retrieves several rss feeds, parses the items to extract the subjects and indexes the items and subjects so they can later be queried.</p>
<p>&nbsp;</p>
<p>Since node.js is single threaded, we created 2 applications:</p>
<ul>
    <li>A&nbsp;poller that accepts a configuration of feed urls and extractors and periodically processes them to get items and entities, and then pushes the results to elastic search</li>
    <li>A repository that exposes a rest API&nbsp;to retrieve the feed items mentioning an entity.</li>
</ul>
<p>&nbsp;</p>
<p>Some insights we learned:</p>
<ul>
    <li>Node.js cannot be installed on Windows. While there is a premade executable for node.js itself, some modules are still built for linux only. Some other modules support only prior versions of node.js for which there is no binary. Trying to compile node.js (based on cygwin) did not go well creating link errors. Our only solution was to work with a virtual machine, based on <a href="http://www.lazycoder.com/weblog/2010/03/18/getting-started-with-node-js-on-windows/">instructions here</a>. There were several things we had to work around:&nbsp;the ovf file seemed corrupter, so we needed to use the vmdk image, we needed to define bridged networking since NAT&nbsp;did not work.</li>
    <li>Installation of node.js itself and modules is done by downloading source and compiling it. We've becomed accostumed, even in linux for pre-made binaries, so this fealt</li>
    <li>Node.js is in version 0.5.6, but several prominent modules (e.g., express, we've also had issues with npm)&nbsp;still support 0.4.11. This is surprising, since the project is so fresh that we expected all early adopters to keep up to date</li>
    <li>There isn't a lot of documentation, yet node.js is very easy to learn and work with. For elastic search there are several clients and we found <a href="https://github.com/rgrove/node-elastical">elastical</a> to be good for us.</li>
    <li>The module system is very nice. It is based on <a href="http://commonjs.org/">CommonJS</a> which means that even modules not intended for node.js can be used. For example, we've used <a href="http://documentcloud.github.com/underscore/ ">underscore.js</a></li>
</ul>
<p>&nbsp;</p>
<p>Overall, it was a nice experiense. After the initial integration problems, we were quite productive and managed to get something working within a very short time.</p>
<p>&nbsp;</p>
<p>Here are some code snippets, to whet your appetite:</p>
<p>&nbsp;</p>
<p>First, the code that polls from feeds and parses them:</p>
<pre title="code" class="brush: jscript;">
var rss = require('easyrss'),
    inspect = require('util').inspect,
    config = require('./config').config,
    _ = require('./lib/underscore')

exports.poll = function(callback) {
	_.map(config.feeds, function(feed) {
		rss.parseURL(feed.url, function(posts){
			_.each(posts, function(post){
				post.entities = _.reduce(feed.extractors, function(memo, extractor) {
					var extracted = extractor(post.description)
					if (extracted) memo.push(extracted)
					return memo
				}, [])
				callback(post)
			})
		})
		
	})
}
</pre>
<p>&nbsp;</p>
<p>Next, the code that creates an http server and exposes a REST&nbsp;API&nbsp;that queries an elastic search server:</p>
<pre title="code" class="brush: jscript;">
http.createServer(function (req, response) {
	console.log('got request ' + req.url);
	
	var query = require('url').parse(req.url, true).query;
	
	elClient.search({query: {
			query_string: {
				field: &quot;entities&quot;,
				query : {
					query_string: {
						field:  &quot;type&quot;,
						query: query.type
					},
					
				} 
			} 
			//term: {title: &quot;Welcome to my stupid blog&quot;}
		}}, function (err, results, res) {	

		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(results));
		response.end();
		
		console.log(inspect(err));
		
	});
	
	
	
}).listen(1337);</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
