---
layout: post
title: Sync clients with SignalR
created: 1372749294
author: amiram
permalink: /net/sync-clients-signalr
tags:
- .NET
- ASP.NET MVC
- c#
- SignalR
- Javascript
- typescript
---
<p><a href="http://signalr.net/" target="_blank">SignalR</a> gives you a very easy framework to sync clients. In the <a href="https://github.com/tikalk/ComicTales" target="_blank">ComicsTale project</a> we used it to show a client that another client has changed the same story so he can refresh and see the changes. Before using <a href="http://signalr.net/" target="_blank">SignalR</a>, you need to download the nuget package <strong>Microsoft ASP.NET SignalR</strong>. <a href="http://signalr.net/" target="_blank">SignalR</a> is called from client side. You need to create a client side proxy that will connect to server side <a href="http://signalr.net/" target="_blank">SignalR</a> component. Full project can be found on <a href="https://github.com/tikalk/ComicTales" target="_blank">GitHub</a>. Create a class that inherits <strong>Microsoft.AspNet.SignalR.Hub</strong>:</p>
<pre class="lang:c# decode:true ">
[HubName(&quot;comicStoryNotificationsHub&quot;)]
public class StoryNotificationsHub : Hub
{
    // called by the client when editing a story
    public void Join(string groupId /*actualy this is the story Id*/)
    {
        Groups.Add(Context.ConnectionId, groupId);
    }
    
    public void NotifyHasUpdates(string groupId)
    {
        Clients.OthersInGroup(groupId).notifyHasUpdates();
    }
}</pre>
<p>This will create a proxy in javascript, see that <strong>join </strong>and <strong>notifyHasUpdates </strong>are exposed in client side:</p>
<pre class="lang:js decode:true ">
/*!
 * ASP.NET SignalR JavaScript Library v1.1.1
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// &lt;reference path=&quot;..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js&quot; /&gt;
/// &lt;reference path=&quot;jquery.signalR.js&quot; /&gt;
(function ($, window) {
    /// &lt;param name=&quot;$&quot; type=&quot;jQuery&quot; /&gt;
    &quot;use strict&quot;;

    if (typeof ($.signalR) !== &quot;function&quot;) {
        throw new Error(&quot;SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/hubs.&quot;);
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                }
                else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we &quot;disconnect&quot;.  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.comicStoryNotificationsHub = this.createHubProxy(&#39;comicStoryNotificationsHub&#39;); 
        proxies.comicStoryNotificationsHub.client = { };
        proxies.comicStoryNotificationsHub.server = {
            join: function (groupId) {
                return proxies.comicStoryNotificationsHub.invoke.apply(proxies.comicStoryNotificationsHub, $.merge([&quot;Join&quot;], $.makeArray(arguments)));
             },

            notifyHasUpdates: function (groupId) {
                return proxies.comicStoryNotificationsHub.invoke.apply(proxies.comicStoryNotificationsHub, $.merge([&quot;NotifyHasUpdates&quot;], $.makeArray(arguments)));
             },
        };

        return proxies;
    };

    signalR.hub = $.hubConnection(&quot;/signalr&quot;, { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));</pre>
<p>When a client starts, he need to decide what to do when he gets a message from server and to call the <strong>join </strong>method:</p>
<pre class="lang:js decode:true ">
private initConnection() {

    // Proxy created on the fly 
    var storyNotifications = $.connection.comicStoryNotificationsHub;

    // Declare a function on the chat hub so the server can invoke it          
    storyNotifications.client.notifyHasUpdates = () =&gt; {
        console.log(&#39;Receive updates notification!&#39;);
        this.hasUpdates(true);
    };

    // Start the connection
    $.connection.hub.start()
        .done(() =&gt; {
            console.log(&#39;Now connected, connection ID=&#39; + $.connection.hub.id + &#39;, transport=&#39; + $.connection.hub.transport.name);
            storyNotifications.server.join(this.storyId);
        })
        .fail(() =&gt; { console.log(&#39;Could not Connect!&#39;); });
}</pre>
<p>The connection name <strong>comicStoryNotificationsHub </strong>is determined in the <strong>HubName </strong>attribute on the top of our <strong>StoryNotificationsHub </strong>class. We create a new method <strong>notifyHasUpdates </strong>that when called will show a refresh button by notifying the observable collection of <strong>knockout</strong>. Then we start the connection and when it is started we call the <strong>join </strong>method to join the group of clients dealing with the same comic story. When a client change something in a story, all he needs to do is call the server <strong>NotifyHasUpdates </strong>method through the proxy:</p>
<pre class="lang:js decode:true ">
private notifyUpdated()
{
    $.connection.comicStoryNotificationsHub.server.notifyHasUpdates(this.storyId);
}</pre>
<p>The <strong>NotifyHasUpdates </strong>method on the server side will call the <strong>notifyHasUpdates </strong>(that initiated in <strong>initConnection </strong>client method) on each client except from the caller client.</p>
