---
layout: post
title: 'Tikal''s JavaScript team''s Fuse day project- "LiveCast": The Node.js perspective'
created: 1357060300
author: naor
permalink: /js/tikals-javascript-teams-fuse-day-project-livecast-nodejs-perspective
tags:
- JS
- javascript node nodejs express webrtc socket.io
---
<p>This was my first Fuse day at Tikal, and it was great getting more acquainted with more people in the team. Before this session, I had the chance to play around with Node.js a few times, mainly for self-teaching, but working on this project still felt new and exciting, as this was the first actual project that I had the opportunity to work on with other developers.</p>
<p>When the day started, I teamed up with Assaf, who already had arranged most of the basics and boiler-plate code going, a day before.</p>
<p>&nbsp;</p>
<p>We got a basic setup for a Node.js server- working with 'express' and the middleware we needed:</p>
<pre title="code" class="brush: jscript;">
var express = require('express'),
    path = require('path'),
    app = express.createServer();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({ secret: &quot;session secret&quot; }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(8000);

</pre>
<p>We didn't need any other routes than '/', as we decided we're going for a single page application without any kind server-side rendering of the page.&nbsp;For the same reason, we decided to take out the unused rendering engine settings from the default genrated code under 'configure()'. These are the lines we omitted:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: jscript;">
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');</pre>
<p>&nbsp;</p>
<p>We initialized the 'webrtc.io' node module, which is basically all you need to get WebRTC going in the client-side. For my understanding, the main purpose of this module is to abstract away the STUN/ICE server connection implementation needed for peer discovery.</p>
<p>This can be done with a single line of code:</p>
<pre title="code" class="brush: jscript;">
var webRTC = require('webrtc.io').listen(app);</pre>
<p>&nbsp;</p>
<p>Next, we had to manage user login (just basic identification at this point), roles and different data events going between all the connected users.</p>
<p>To do that elegantly, we needed to use Web Sockets. We could use the 'socket.io' module, but we already have the 'webrtc' included, and it has a socket for every connected client...</p>
<pre title="code" class="brush: java;">
// data- {nickname: String}, sent by the client.
// socket- the WebSocket instance of this client.
webRTC.rtc.on('login', function(data, socket){
    // ...
    // Deciding on role (teacher/student) and handling accordingly.
    //...

    // Storing user metadata
    users.push({
        'socketId' : socket.id,
        'nickname' : data.nickname,
        'role' : role
    });

    //...
    // More code for notifying all current clients that a new user logged in, etc...
    //...
}</pre>
<p>The 'webrtc.io' module uses the 'ws' (WebSocket) library for handling web sockets. It gives us the abilty to utilize this for client-server messaging, in addition to peer-peer data transfer, as demonstrated above.</p>
<p>&nbsp;</p>
<p>We used these sockets to register other events we wanted to manage, such as:</p>
<pre title="code" class="brush: jscript;">
// Handing the teacher event of code editor changes.
webRTC.rtc.on('code_editor', function(data,socket){
    // Storing the last code changes to notify newly logged-in clients later.
    lastCodeEditorData = data;
    
    //...
    // Iterating through all the client sockets and sending them the new code editor contents.
    //...
});</pre>
<p>&nbsp;</p>
<p>Some events should be handled for specific clients, such as the one above, that needs to be handled just for the teacher's client socket.</p>
<p>I attempted to do that by using this syntax with specific sockets:</p>
<pre title="code" class="brush: jscript;">
socket.on('event_name', function(data, soc){ ... });</pre>
<p>From my experience, this works well with 'socket.io', and the documentation I found said it should be the same in this case, but... no matter what I tried, the callback was never called. I couldn't get the listeners on specific sockets, so all the events could be fired from any client.</p>
<p>This, of course, is far from ideal, and unless we could find a way to make it work, I believe we should switch to 'socket.io' for client-server messaging, instead, and keep 'webrtc.io' just for peer discovery purposes.</p>
<p>I hope we could make this change when this project evolves in the future.</p>
<p>&nbsp;</p>
<p>Other server-side&nbsp;project improvements I could think of, are:</p>
<ul>
    <li>Social logins with OAuth (facebook, linkedin, tweeter, etc...)</li>
    <li>Persitent user login</li>
    <li>Functional managment of 'raise hand'/ 'ask a question' designed features</li>
    <li>Better role management</li>
    <li>Workshop session recording</li>
</ul>
<p>&nbsp;</p>
<p>I hope we will see this project becoming a functional useful tool in the future.</p>
<p>This was a great learning experience for me, and I really enjoyed it.&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
