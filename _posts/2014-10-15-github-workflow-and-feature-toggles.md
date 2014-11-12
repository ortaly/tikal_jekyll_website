---
layout: post
title: Github Workflow & "Feature Toggles"
created: 1413351255
author: orenf
permalink: github-workflow-and-feature-toggles
tags:
- DevOps
- GitHub
- git
- feature toggles
- feature bits
---
<p>I&#39;m working with git &amp; github as a vcs for the last 3 years. It&#39;s a great concept, and github has supplied great tools for developement workflow and keeping the development process documented in a well user interface system.<br />
Recently, I was introduced to the concept of &quot;Feature Toggles&quot; in software developement.</p>

<p>The demand from the development team was to start supporting in &quot;feature toggles&quot; while developing, and push all code to the master branch - while having no spereate branches - known as - feature branches. That, in order to support Continuous Integration, Automation Tests often and avoiding complicated merge.</p>

<p>As a background, &quot;Feature Toggles&quot; (or &quot;feature bits&quot;) means, that each feature in the application is configurable and can be turned on or off in any time without causing errors on all development layers - let it be ui, server and data base. Practicaly, during the development cycle of a feature, it is in an &quot;off&quot; mode, untill all relevant layers are developed and are ready to introduce the feature. Meantime, all code relevant to this feature is pushed to the &quot;master&quot; branch, but not &quot;active&quot; in ui or server.<br />
the pros for that are (as given):</p>

<ol>
	<li>it promotes CI.</li>
	<li>allows testing earlier</li>
	<li>prevents complicated merge flow / conflicts&nbsp;</li>
	<li>business oriented - allows to toggle features based on user roles, permissions or customer regulations (that&#39;s a business perspective, though)</li>
</ol>

<p>This is a good example of <a href="https://github.com/mjt01/angular-feature-flags">implementing &quot;feature toggles&quot; with angular</a>.</p>

<p>The idea of not using <a href="http://nvie.com/posts/a-successful-git-branching-model/">feature branches</a>&nbsp;and having only one branch to work on led me to confusion.<br />
I wanted to find out if using &quot;Feature Toggles&quot; is a common practice nowadays and whether it contradicts with &quot;feature branch&quot;.</p>

<ol>
	<li>what happens with the history of a feature?</li>
	<li>how do I group several commits under a feature development cycle?</li>
	<li>what if I want to remove this feature from the code?</li>
</ol>

<p>So - I was glad to find out that the concept of &quot;Feature Toggles&quot; doesn&#39;t contradicts with developing iwth feature branches.<br />
On the contrary, the two concepts works well together, and even - should.</p>

<p>A reference to <a href="http://scottchacon.com/2011/08/31/github-flow.html">Scott Chacon blog post on github workflow</a>&nbsp;and an official <a href="https://guides.github.com/introduction/flow/index.html">github workflow</a>&nbsp;really shed some light on this dilema.</p>

<p>I have found out few advantages of using the github workflow:</p>

<ol>
	<li>promotes safer deployable master branch</li>
	<li>promoting code-reviews/testing etc before merging to master</li>
	<li>promotes CI</li>
	<li>visibility of work to the team</li>
	<li>you can use Hubot - also for FUN :), deploy process becomes easier for all</li>
</ol>

<p>Having the above approach to go with &quot;feature branch&quot; led me to wonder what to do with branches that were merged to master.<br />
Since the content and author of the code is preserved, it is safe and preffered to delete these branches (if there&#39;s no other use for them). And still, it is clear what are the active branches and who&#39;s working on them just by viewing teh branches.</p>

<p>Another approach combines some of the above:</p>

<ol>
	<li>Work with a Branch model (feature/ hotfix/ bug/ chore/)</li>
	<li>CI works on all branches with Pull Requests</li>
	<li>Once code is in master you can use any type of feature flag you want. &quot;rollout&quot; can be used, which is a redis based feature rollout system.</li>
	<li>Any branch can be deployed to any environment and not just master, meaning you can deploy a specific feature branch for any amount of time you may want.</li>
</ol>

<p>To&nbsp;conclude, having Scott&#39;s approach seems to win the case for my dilema - It is resonable, takes into an account team work, promotes discussion while saving a certain protocol, and eventually allows Continous Integration &amp; Delivery.</p>
