---
layout: post
title: JBoss, Selenium, Maven, Hudson, M2 Extra Steps & Files Found Trigger plugins
created: 1284325839
author: hagzag
permalink: /devops/jboss-selenium-maven-hudson-m2-extra-steps-files-found-trigger-plugins
tags:
- DevOps
- selenium
- Hudson
---
<p>JBoss, Selenium, Maven, Hudson, <a href="http://wiki.hudson-ci.org/display/HUDSON/M2+Extra+Steps+Plugin">M2 Extra Steps</a> &amp; <a href="http://wiki.hudson-ci.org/display/HUDSON/Files+Found+Trigger">Files Found Trigger</a> plugins                                                                                                                                      - how do all these work together in a continuous build + Integration test life-cycle ?</p>
<p>&nbsp;</p>
<p><strong>The Story - The Use Case</strong>:</p>
<p>We  have two projects with two war artifacts which need to be deployed to a  JBoss Application Server, whilst both webapps share a common base  configuration, although the release life-cycle of each war have no  correlation to the other.</p>
<p>In production both application  servers are running &amp; serving one another thus, Integration test  should cover both JBoss instances &amp; test their web services.</p>
<p>We  are using selenium tests for both webapps and they need to run  straight after a continuous build of each of the servers mentioned  above. That said a change in project A or in project B should trigger  the Integration tests job, whilst if either project A or project B are  running the integration test plugin shouldn't run (at least until both  projects / one of them is complete).</p>
<p>&nbsp;</p>
<p><strong>The &quot;work around&quot; - forcing the &quot;native Hudson&quot; configuration</strong> (which we didn't go with naturally):</p>
<p>Create  a Job which builds Project A and Project B then as a downstream job  will run ITest job. The problems with this method was -</p>
<p><strong>1.</strong>  Project A and Project B do not have the same release life-cycle  therefore, I would be forced to have a separate build process for their  release / chain the release of these webapps.</p>
<p><strong>2.</strong> I would be  building one of the projects for nothing (~ 10 minuets penalty) - if  nothing changed in Project A / B why build the other for</p>
<p>nothing?</p>
<p>As  a matter fo fact Project A doesn't change much, our consideration was -  Project A will change once in two weeks whilst Project B will change on  a daily basis - that is why we needed a smarter solution:</p>
<p>&nbsp;</p>
<p><strong>A more Creative </strong><strong>Solution</strong>:</p>
<p><u>Step 1 - configure m2 &quot;extra steps&quot; post-build action for Project A &amp; B</u>:</p>
<p>Project  A - build a.war, and as a post build task it would copy the a.war into a  shared location. For example purposes lets call it <em><strong>/sharedfolder</strong></em>, in Project B we would do the same.</p>
<p>Upon a successful build of Project A and Project B we will result with <em><strong>/sharedfolder</strong></em>  with a &amp; b war files in it. Let me point out these are two standard  maven jobs which have the mvn clean install (or deploy) life-cycles and  with <a href="http://wiki.hudson-ci.org/display/HUDSON/M2+Extra+Steps+Plugin">M2 extra steps plugin</a> you can run a shell / bash which will just copy a &amp; b wars to the <strong><em>/sharedfolder</em></strong>.</p>
<p><img border="0" width="531" height="280" alt="Post M2 steps" src="/files/upload/29/ExtraStepsPost.png" /></p>
<p><u><strong>Please note</strong></u>: if running in distributed Hudson make <strong>/sharedfolder </strong>a location both the servers building a, b &amp; ITest Jobs can write to (NFS, SMB mount if you must).<strong><br />
</strong></p>
<p>&nbsp;</p>
<p><u>Step 2 - Add Files Found Trigger &amp; M2 Extra steps:</u></p>
<p>&nbsp;</p>
<p>1. Manage Hudson &gt;&gt; Manage plugins.</p>
<p>2. Install the missing plugins (will be under the available tab if not installed already)</p>
<p>3. Reload / Restart Hudson</p>
<p>&nbsp;</p>
<p><u>Step 3 - create / configure ITest Job:<br />
</u></p>
<p>Create a freestyle (or maven depends on selenium configuration) job named <strong>Itest</strong> which has a <a href="http://wiki.hudson-ci.org/display/HUDSON/Files+Found+Trigger">Files Found Trigger</a><span class="smalltext"> (SCM should be configured to checkout the selenium test - may it be Maven / Ant or whatever executes it for you <img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/regular_smile.gif" alt="" />), in the Files found configuration have </span><strong><em>/sharedfolder </em></strong><strong>and&nbsp;</strong><span class="smalltext"> <em><strong>a.war, b.war</strong></em>  (note the &quot;,&quot; delimiter) watched for changes and configure the trigger  to run every 5 / 10 minuets according to your preference - so the </span><strong>Files Found Trigger </strong>will test <em>/sharedfolder every $n minuets for changes in the filesystem and trigger a build accordingly.</em></p>
<p><img border="0" width="529" height="251" alt="Files Changed Trigger" src="/files/upload/29/FilesChangedTrigger_0.png" /></p>
<p>I thought I was finished but The  only problem was if either Project A or Project B was running I didn't  want ITest to run until the Upstream project (either Project a&nbsp; or b  completes) and the built in upstream / downstream doesn't support &quot;wait for either Project A or Project B to complete&quot;.</p>
<p>So:</p>
<p><u>Step 4 - Add m2 &quot;extra steps&quot; pre-build action</u><span style="text-decoration: underline;"> </span><u>for Project A &amp; B</u>:</p>
<p>I went back to Project A and Project B configuration and added a pre build snippet which removed <strong><em>/sharedfolder/a.war for Project A and </em></strong><strong><em>/sharedfolder/b.war for Project B.<br />
</em></strong></p>
<p><u><strong><em><img border="0" width="530" height="371" alt="Pre &amp; Post steps" src="/files/upload/29/ExtraStepsPrenPost.png" /><br />
</em></strong></u></p>
<p><strong><em>Now I have achieved - </em></strong><u><strong><em>The Final result</em></strong></u><strong><em>:</em></strong></p>
<p><strong>1. </strong>No parallel building of Project A,B or ITest</p>
<p><strong>2. </strong>ITest will be triggered wither if a.war or b.war will change (that is where the Files Found Trigger comes in)</p>
<p><strong>3. </strong>I can still keep Project A &amp; Project B in their regular continuous life-cycle.</p>
<p>&nbsp;</p>
<p><span style="font-weight: bold;">Also</span><strong> note</strong> <strong>that</strong>: The FS-SCM (<a href="http://wiki.hudson-ci.org/display/HUDSON/File+System+SCM">File System SCM</a>)  plugin (which seemed a good candidate at first) - will not work for you  in this case, for on each change the Itest project will run. So even if  Project A removed a.war this will be treated as a SCM change in the FS,  and will trigger a new ITest build.</p>
<p>Hope you find this tip helpful.</p>
