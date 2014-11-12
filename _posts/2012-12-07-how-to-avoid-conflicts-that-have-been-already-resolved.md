---
layout: post
title: How to avoid conflicts that have been already resolved?
created: 1354888814
author: dmitri
permalink: /incubator/how-avoid-conflicts-have-been-already-resolved
tags:
- Incubator
- git
---
We are working on a feature branch that we need to keep alive until QA team will be able to test it and create the automatic tests.

For this reason we need to rebase to main dev branch continuously, but each rebase is really hard because we need to resolve many conflicts, and most of the times we need to resolve conflicts already solved in the previous iteration, because the main dev branch contains merge commit that brings in same commits more than once.

How can we avoid that?
