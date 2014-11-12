---
layout: post
title: Simple datastore batch writes in Google AppEngine
created: 1320679691
author: udib
permalink: /simple-datastore-batch-writes-google-appengine
tags:
- Incubator
- Python
- optimization
- Django
- batch
- AppEngine
---
<p>Google AppEngine has just <a href="https://groups.google.com/forum/#!topic/google-appengine/iJjrhJ-4PGk">came out of &quot;Preview&quot;</a> today, &nbsp;&amp; changed the pricing model &amp; quotas accordingly. A major change in the pricing model is that instead of charging for the <em>total CPU time </em>of DB operations, they are now charged by the <em>number </em>of DB operations. This means that instead of tunning the DB operations themselves, a much better approach will be to just batch them together (when possible).</p>
<p>&nbsp;</p>
<p>The <a href="http://code.google.com/appengine/docs/python/taskqueue/overview-pull.html">Pull Task Queue </a>API of AppEngine is very useful for batching DB operations, which can be written to the queue &amp; pulled reliably in batches for execution.</p>
<p>&nbsp;</p>
<p>When working with Django over AppEngine (using the <a href="http://www.allbuttonspressed.com/projects/django-nonrel">Django Nonrel</a> framework), you employ Django's ORM, which doesn't yet support batch operations. How will you therefore implement this highly needed optimization?</p>
<p>&nbsp;</p>
<p>A simple approach is to convert the Django model instances you want to write in a batch, back into AppEngine datastore instances, &amp; use the datastore <em>Put</em> command to save them in 1 DB operation. I assembled code written by Vladimir Mihailenco into <a href="http://baconfile.com/dibau_naum_h/batch.zip/">a small package </a>which you can add to your project, &amp; from it invoke the method: <em><strong>convert_to_gae_entity</strong></em>, providing it the Django instance you want to convert. A parameter allows you to allocate an ID for this instance in advance, in order to save related entities. Once you have the AppEngine entity, you can add it to a list, &amp; write the list to the datastore using datastore <em>Put</em> command.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Hopefully, this will be integrated in Django Nonrel &amp; Django soon.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
