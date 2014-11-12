---
layout: post
title: Itest & Remote invocation of parametrized & tokenized builds with Hudson CI
created: 1260074341
author: hagzag
permalink: /devops/itest-remote-invocation-parametrized-tokenized-builds-hudson-ci
tags:
- DevOps
- Hudson
- Groovy
- Continuous Integration
---
<p><strong><u>Background</u>:</strong></p>
<p>In one of my previous projects I was asked to setup the environment / automate <strong>integration tests</strong> (Referred to as Itest from now on) which required a machine with 2 CPU's &amp; 5 GB RAM, this means that in any case a developer wishing to run Itests will never be able to run them locally, and will have to use some existing server.</p>
<p>&nbsp;</p>
<p>The problem with my previous statement is that the developer, whilst checking his tests will be busy most of the time preparing his Itest environment, rather then checking the integrity of his tests, need I say that the fact we need 2 CPU's &amp; 5GB RAM means the server takes time to load and only once it is up you can start testing.</p>
<p>&nbsp;</p>
<p><strong>From a Continues Integration point of view</strong>, these tests should run as part of the Nightly build, automatically &amp; with no user intervention and of course the running server should be using the latest tests from SCM.</p>
<p>The big question was: <strong><em>how do we achieve all of the above with one Maven Project one Job in Hudson-CI and reuse this code as a Maven module for every new scenario we are testing?</em></strong></p>
<p>&nbsp;</p>
<p><strong><u>Solution</u></strong>:</p>
<p>Hudson, Maven &amp; some Groovy on top (<em>or beneath in order to be accurate</em>):</p>
<ol>
    <li><a href="http://www.hudson-ci.org/">Hudson</a> - a built in mechanism of Tokenized builds &amp; parametrized builds which can be invoked by browsing a url</li>
    <li><a href="http://maven.apache.org/">Maven</a> - or any other build tool for that matter can invoke a Hudson url</li>
    <li><a href="http://groovy.codehaus.org/">Groovy</a> - the logic of build invocation is performed by <a href="http://docs.codehaus.org/display/GMAVEN/GMaven+1.0+Release">Maven Groovy Plugin</a> - this is what the client choose, and did most of the writing.</li>
</ol>
<p>&nbsp;</p>
<p><strong><u><img border="0" align="left" width="100" vspace="0" hspace="15" height="100" alt="Hudson logo" src="/files/upload/29/banner-100.png" /></u></strong><img border="0" width="150" hspace="15" height="49" src="/files/upload/29/Maven_logo_0.gif" alt="" /><img width="190" height="100" src="/files/upload/29/medium.png" alt="Gmaven" /></p>
<p>&nbsp;</p>
<p>OK so how does this all come together?</p>
<p><strong>On the <u>Maven side / Developer's side</u></strong> there is a &quot;skeleton&quot; parent pom with some Groovy logic (I will ask clients permission to attach the code to this post) of how to build the hudson url &amp; pass the token's.</p>
<p>&nbsp;</p>
<p>Parent pom includes Groovy logic which uses the a <a href="http://groovy.codehaus.org/modules/http-builder/apidocs/groovyx/net/http/URIBuilder.html#toURL%28%29">url.toURL</a> method whilst passing a token and a parameter to hudson, a time to wait period which waits until we receive &quot;Build Successful&quot; from Hudson and fail after a set period of time (or it will run for ever ...) - parent pom is not to invoke any build but is there so its modules will inherit the url construction logic.</p>
<p>Maven module <strong><em>X</em></strong> has parameters therefore executes the constructed <em>Hudsonurl</em> + <em>Hudsontoken</em> + <em>Jobparam</em>, so does Maven module <em><strong>Y</strong></em> &amp; <em><strong>Z</strong></em> etc etc ...</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><u><strong>In Hudson</strong></u></p>
<ul>
    <li>A slave machine dedicated for Itest / a slave capable &amp; available of running the Itest job - how to set up will be posted in a separate post</li>
    <li>A valid url Token, so it can only be invoked by people / code who &quot;know&quot; the Token</li>
    <li>A Parameter which is passed to Hudson Build step</li>
</ul>
<p>&nbsp;</p>
<p><img border="0" align="left" width="960" vspace="0" hspace="0" height="216" src="/files/upload/29/HCI-string_param_0.png" alt="Hudson String Param" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img border="0" align="left" width="960" vspace="0" hspace="0" height="65" src="/files/upload/29/HCI-job_token_0.png" alt="Hudson Job Tiken" /></p>
<p>&nbsp;</p>
<p><u><strong>Please note</strong></u><strong>:</strong></p>
<ul>
    <li>Token option is available only when running from within a servlet container if your test driving this with java -jar this option will not be available!.</li>
    <li>The defualt value of &quot;default&quot; is there so when hudson runs with no parameter this value will take presence if ot is not there build will not be able to run!.</li>
</ul>
<p>&nbsp;</p>
<p>In a freestyle project the build can look like this (for win / linux):</p>
<p>&nbsp;</p>
<p><img border="0" align="left" width="960" vspace="0" hspace="0" height="310" src="/files/upload/29/HCI-job-builder.png" alt="Hudson Job Builder" /></p>
<p>&nbsp;</p>
<hr />
<p><strong><u>Future Enhancements</u></strong><u> (might need to add in the future)</u>:</p>
<p>As this project involves and there are more and more developers we will need more than one continues integration machine, and we do not want to start specifying the name of the machine inside the project's pom or we will find ourselves editing the pom several times a week.</p>
<p>A Hudson built in solution would be to tie the job to a Group of Nodes rather than a specific Slave Hostname, and add a few machines to that group this will result in the ability to invoke multiple jobs simultaneously.</p>
