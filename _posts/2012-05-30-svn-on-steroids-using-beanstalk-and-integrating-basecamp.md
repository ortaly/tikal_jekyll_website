---
layout: post
title: SVN on steroids using beanstalk and integrating basecamp
created: 1338394544
author: avit
permalink: /svn-steroids-using-beanstalk-and-integrating-basecamp
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/istock_000006154797xsmall/' rel='attachment wp-att-322'><img alt='' class='alignleft size-thumbnail wp-image-322' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/01/iStock_000006154797XSmall-150x150.jpg' title='Code' width='150' /></a>
<p>Whether you are using GIT or SVN, both self hosted or in the cloud.</p>

<p>Me, I’m a huge fan of cloud services and moving things and services into the cloud, managing my entire work (almost) in the cloud, from my email (GMail) to my backup service (Mozy) and now, SVN.</p>

<p>I will tell you about my solution in this post along with screenshots of what it looks like</p>
<!--more-->
<p>Just to give you an idea, I’m talking about a solution on steroids, the sort of solutions that makes you feel like: “how the hell did I do this up until now”, this solution will work amazing for you if you are working in a team or working alone.</p>

<p>I do both, and I absolutely love this solution.</p>

<p>Like I said in the title, the solution is based on 2 cloud services</p>

<ol>
<li />

<li />
</ol>

<p>The concept of the solution is simple, see what’s being done, by who, when and why, all this inside the context of a web page with a link from the project management system back to the SVN and vice versa.</p>

<p>Also, you are able to track time being “wasted” on a mission, everything from within the comfort of the environment convenient to you.</p>

<p>You won’t need to change anything in your habits, if you are used to using a command line, you will use the same command line with some extra commands to track time and do other things.</p>

<p>So, let’s dig into just how you can do this:</p>

<p>First, open an account in Beanstalk, the pricing range is convenient and I found myself rising from the trial period to my current account in no time.</p>

<p>Second, go and open an account in Basecamp (this is not a must, just an extra).</p>

<p>In Basecamp, find your account details and grab your API token (you can regenerate a new one at any time you want)</p>

<p>OK, we are set to go.</p>

<p>When you log in into Beanstalk you will see the repositories tab on the top, when you click it, you can see all of your repositories. it’s important to understand, each of your clients/users will see different things in this tab, meaning there’s a permission system, if you give access to a client he will see his projects only.</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled/' rel='attachment wp-att-323'><img alt='' class='aligncenter size-medium wp-image-323' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-300x192.png' title='Repositories - Beanstalk' width='300' /></a>
<p>Now, click “Create Repository” This screen will come up</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-1/' rel='attachment wp-att-324'><img alt='' class='aligncenter size-medium wp-image-324' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-1-300x192.png' title='Open new repository - Beanstalk' width='300' /></a>
<p>Select a repository name (you will not be able to change this in the future so select it wisely)</p>

<p>After you give a name, you will be redirected to the next phase in the wizard, here, you can import your working copy (if you have one). This is actually a very important feature for me, all of my SVN was self hosted and I wanted to keep the repo consistent and be able to revert back to older revisions of files and more.</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-2/' rel='attachment wp-att-325'><img alt='' class='aligncenter size-medium wp-image-325' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-2-300x192.png' title='Open new repository - phase 2' width='300' /></a>
<p>After you import (or not) you will be redirected to giving permissions to clients/users. you can skip this phase if you don’t need it or you don’t know yet, you can change the permissions at any time in the future.</p>

<p>You can also select (of course) the type of permissions the user has.</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-3/' rel='attachment wp-att-326'><img alt='' class='aligncenter size-medium wp-image-326' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-3-300x192.png' title='Create repository - permissions' width='300' /></a>
<p>That’s it, your repository (first one) is setup. Nnow, you can click the activity page and you will see just a blank (or something else if you imported data) page.</p>

<p>This is your activity page and it will get filled with each commit user does.</p>

<p>On the right side, you can see a textInput where you can copy and paste he repository URL for this repository. This url is the one you type into the SVN tool you are using, whether you are using the command line or Versions (mac) or even tortoise SVN (windows).</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-4/' rel='attachment wp-att-327'><img alt='' class='aligncenter size-medium wp-image-327' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-4-300x192.png' title='Repository page - Activity' width='300' /></a>
<p>Cool, so let’s create a connection to Basecamp now.</p>

<p>Let’s click the setup tab in the top. We will get this screen</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-5/' rel='attachment wp-att-328'><img alt='' class='aligncenter size-medium wp-image-328' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-5-300x192.png' title='Integration setup' width='300' /></a>
<p>As you can see, Basecamp is my option of choice but you you can select any service they have to offer, from twitter to freckle and many more.</p>

<p>What’s next.</p>

<p>type your Basecamp url, paste in your API token.</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-7/' rel='attachment wp-att-329'><img alt='' class='aligncenter size-medium wp-image-329' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-7-300x192.png' width='300' /></a>
<p>After you type in the details and click next you will be able to select a project from you project management system.</p>

<p>After you select a project you’ll be able to select the category to which every commit message will be transmitted to. I always select “code”</p>

<p>I’ll explain a bit. When you commit a revision and type a message, this message will be posted to the “messages” section in Basecamp. The messages section contains every message users post, so the code revisions and every other message is in once place, for me this is amazing also because I can reply to a message. When a programmer from you team posts a commit message you can reply, giving him anything from a feedback to rejects.</p>

<p>Also, you have a link from Basecamp to the changeset in Beanstalk. you don’t have to exit, log in and look for the latest change, it’s just a click of a button away.</p>

<p>Let’s see how it looks. When I commit a revision it looks like this:</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-9/' rel='attachment wp-att-330'><img alt='' class='aligncenter size-medium wp-image-330' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-9-300x192.png' width='300' /></a>
<p>and this is where I go after I click the link inside Basecamp</p>
<a href='http://www.kensodev.com/2010/01/20/svn-on-steroids-using-beanstalk-and-integrating-basecamp/untitled-10/' rel='attachment wp-att-331'><img alt='' class='aligncenter size-medium wp-image-331' height='192' src='http://www.kensodev.com/wp-content/uploads/2010/01/untitled-10-300x192.png' width='300' /></a>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/a1pqkw_v_FU" height="1" width="1"/>
