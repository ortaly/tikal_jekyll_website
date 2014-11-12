---
layout: post
title: Fuse Day3 - Reactor job, new hudson job type - session summary
created: 1298545935
author: admin
permalink: /devops/fuse-day3-reactor-job-new-hudson-job-type-session-summary
tags:
- DevOps
- hudson jenkins
- Hudson
---
<p><strong>Hudson reactor plugin</strong></p>
<p>A new Job type designed to configure a flow of pre defined jobs in a Hudson / Jenkins instance.</p>
<p>The Reactor job type will define Phases, each phase will invoke jobs in parallel.</p>
<p>&nbsp;</p>
<p>Whilst introducing a Reactor Job type and enabelng each job to have it's own behavior when executed seperatelly. We will define a view which will list the execution chain of events, The Reactor acting as the top level invoker which in turn will call each Phase defined in the Recator's configuration.</p>
<p>&nbsp;</p>
<p>Session targets:</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">1. Reactor job configuration</p>
<ol style="margin: 0px; padding: 0px;">
    <li style="margin: 0px 0px 0px 2em; padding: 0px;">Define a new job type called Reactor - based on &quot;free style job&quot;</li>
    <li style="margin: 0px 0px 0px 2em; padding: 0px;">Define build step type - 'Reactor Phase' - with the following fields<br />
    <ol style="margin: 0px; padding: 0px;">
        <li style="margin: 0px 0px 0px 2em; padding: 0px;">Reactor name</li>
        <li style="margin: 0px 0px 0px 2em; padding: 0px;">Jobs to invoke. For each job:<br />
        <ol style="margin: 0px; padding: 0px;">
            <li style="margin: 0px 0px 0px 2em; padding: 0px;">Job name - choose from exiting jobs list or add name and create the job later</li>
            <li style="margin: 0px 0px 0px 2em; padding: 0px;">Job parameters from the job if exist in order to give an option to override default parameters values</li>
            <li style="margin: 0px 0px 0px 2em; padding: 0px;">Step invocation trigger - trigger job when the previous phase is&nbsp;<br />
            <ul style="margin: 0px; padding: 0px;">
                <li style="margin: 0px 0px 0px 2em; padding: 0px; list-style-image: none; list-style-type: none;">- Complete (always trigger)</li>
                <li style="margin: 0px 0px 0px 2em; padding: 0px; list-style-image: none; list-style-type: none;">- Stable</li>
                <li style="margin: 0px 0px 0px 2em; padding: 0px; list-style-image: none; list-style-type: none;">- Unstable</li>
                <li style="margin: 0px 0px 0px 2em; padding: 0px; list-style-image: none; list-style-type: none;">- Stable or Unstable but not Failed</li>
                <li style="margin: 0px 0px 0px 2em; padding: 0px; list-style-image: none; list-style-type: none;">- Failed</li>
            </ul>
            </li>
        </ol>
        </li>
        <li style="margin: 0px 0px 0px 2em; padding: 0px;">Aggregation - checkboxs for change logs and artifacts&nbsp;</li>
    </ol>
    </li>
</ol>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">2. Reactor Job view</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">3. Reactor Build view</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">4. Aggregation of changelog, artifacts (links to archived artifacts of the jobs) and logs (links to jobs logs invoked by reactor build inside the its log)</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; line-height: 21px;">&nbsp;</p>
<p>&nbsp;</p>
<p>An example implementation would be:</p>
<p>&nbsp;Phases configuration</p>
<p>&nbsp;<img width="750" height="366" alt="" src="/files/phases.png" /></p>
<p>&nbsp;</p>
<p>Reactor View</p>
<p><img width="750" height="275" alt="" src="/files/hudson-reactor-view(2).png" /></p>
<p>&nbsp;</p>
<p>Challenges we faced during the session:</p>
<ol>
    <li>Learn jelly implementation in Hudson plugins (hpi)</li>
    <li>Understand view layout implementation for the reactor build</li>
    <li>Create context awareness in Reactor view by Implementing a project&nbsp;wrapper</li>
</ol>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<p>&nbsp;</p>
<p>Achievements:</p>
<p>&nbsp;</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /></p>
<ol style="margin: 0px; padding: 0px;">
    <li>Defined a new job type called Reactor - based on &quot;free style job&quot;</li>
    <li>Defined build step type - 'Reactor Phase' - with the following fields<br />
    <ol style="margin: 0px; padding: 0px;">
        <li>Reactor name</li>
        <li>Jobs to invoke. For each job:<br />
        <ol style="margin: 0px; padding: 0px;">
            <li>Job name - get form exiting jobs list or add name and create the job later</li>
        </ol>
        </li>
    </ol>
    </li>
    <li>Reactor View - a new view which shows all reactor projects with all downstream job phases&nbsp;</li>
</ol>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
