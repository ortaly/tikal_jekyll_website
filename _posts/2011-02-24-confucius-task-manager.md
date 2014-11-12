---
layout: post
title: Confucius Task Manager
created: 1298590544
author: dmitri
permalink: "/incubator/confucius-task-manager"
tags:
- Incubator
- xmpp
- todoist
- task manager
- phyton
- gtalk
- GAE
- django-nonrel
- Django
- confucius
- Python
---
<p><strong>Intro</strong><strong>duction</strong></p>
<p><a href="http://confucius-tasks.appspot.com/">Confucius Task Manager</a> or simple Conficius. The idea is standing behind was to create an interactive, annoying, really annoying tool which is able to manage your <strike>life</strike> daily TODO list, makes sure you are making&nbsp; progress in your current task, reminds you about your uncompleted work, and again makes sure and reminds you and, finally, rates you progress at end of the day.</p>
<p>&nbsp;</p>
<p><strong>How it works</strong></p>
<p>Currently Confucius is iteracting you using <a href="http://www.google.com/talk/">GTalk </a>instance messenger and able to spying on your <a href="http://todoist.com/">TODOIST</a> tasks list. If you want to enjoy such experience, just create your daily list on TODOIST and add <span style="color: rgb(51, 51, 153);">confucius-tasks@appspot.com</span> to you GTalk buddies. From now you will find your self chatting with Confucius. Did I mention you also need to be a member of Confucius club? No? So you do need to become a member of our club.</p>
<p>&nbsp;</p>
<p><strong>Technologies Behind</strong></p>
<p>Confucius is a Django based application deployed on GAE cloud. We are using:</p>
<ol>
    <li><a href="http://www.allbuttonspressed.com/projects/django-nonrel">Django-nonrel</a> for GAE&nbsp;integration.</li>
    <li><a href="http://code.google.com/appengine/docs/python/xmpp/overview.html">XMPP Python API</a> for sending, receiving chat messages and detecting changes to a user's chat presence.</li>
    <li><a href="http://todoist.com/API/help">TODOIST API</a> for watching an user's tasks<a href="http://mercurial.selenic.com/">.<br />
    </a></li>
    <li><a href="http://mercurial.selenic.com/">Mercurial</a> for source control and source management.</li>
    <li><a href="http://www.mindmeister.com/">Mindmeister</a> for ideas sharing and project life-cycle management.</li>
</ol>
<p>&nbsp;</p>
<p><strong>Making Progress</strong></p>
<p>A GAE application can send and receive chat messages to and from any XMPP-compatible chat messaging service, such as GTalk. By default the application has several GTalk accounts. In order to use XMPP the application must be configured to enable the service.</p>
<p>You can enable the service by including an <code>inbound_services</code> section in the <code>app.yaml</code> file:</p>
<pre class="brush: java;first-line: 0; ruler: true; " title="code">
inbound_services:
- xmpp_message
- xmpp_presence
- xmpp_subscribe</pre>
<p>&nbsp;</p>
<p>With the XMPP service enabled, App Engine makes:</p>
<ol>
    <li>an HTTP POST to <code>/_ah/xmpp/message/chat/ </code>URL when your app receives a chat message.</li>
    <li>an HTTP POST&nbsp;to <code>/_ah/xmpp/presence/available/</code> as signal that the user is available and provide the user's chat status.</li>
    <li>an HTTP POST to <code>/_ah/xmpp/presence/unavailable/</code> as signal that the user is unavailable.</li>
</ol>
<p>&nbsp;</p>
<p>To handle them, you simply add a request handlers that accepts POST requests at this URL pathes to <code>urls.py</code> file :</p>
<pre class="brush: python;first-line: 0; ruler: true; " title="code">
urlpatterns = patterns(
(r'^_ah/xmpp/message/chat/', 'chat_be.gt_im_provider.handle_user_message'),
(r'^_ah/xmpp/presence/available/', 'chat_be.gt_im_provider.handle_user_online'),
(r'^_ah/xmpp/presence/unavailable/', 'chat_be.gt_im_provider.handle_user_offline')
)

</pre>
<p><strong>Tips</strong></p>
<p>Do not forget to return HttpResponse at the end of the request processing.</p>
<p>&nbsp;</p>
<p><strong>Resources</strong></p>
<p>Site address: <a href="http://confucius-tasks.appspot.com/">confucius-tasks.appspot.com/</a></p>
<p>Todoist API:&nbsp;<a href="https://todoist.com/API/help">todoist.com/API/help</a></p>
<p>Todoist Python Library (that some guy wrote): <a href="http://myzope.kedai.com.my/blogs/kedai/227">myzope.kedai.com.my/blogs/kedai/227</a></p>
<p>Bitbucket project site:&nbsp;<a href="https://bitbucket.org/alexarsh/confucioustasks">bitbucket.org/alexarsh/confucioustasks</a></p>
