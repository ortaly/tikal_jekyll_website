---
layout: post
title: How o force 'select for update' with jpa hibernate
created: 1334223132
author: shalom
permalink: /how-o-force-select-update-jpa-hibernate
tags:
- JAVA
- java jpa hibernate
---
<p>I have a jpa repository where I need to force a select for update query,</p>
<p>this is my code:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public DocumentTransaction findOneNonCompleted(String uuid, boolean lockForUpdate)
    {
        TypedQuery query = getEntityManager().createQuery(&quot;SELECT t FROM DocumentTransaction t WHERE t.uuid = ?1 AND t.docStatus = TransactionStatus.PROCESSING&quot;, DocumentTransaction.class);
        if (lockForUpdate)
        {
            query.setLockMode(LockModeType.PESSIMISTIC_WRITE);
            query.setHint(&quot;javax.persistence.lock.timeout&quot;,30000);
        }

        query.setParameter(1,uuid);
        List&lt;DocumentTransaction&gt; result = query.getResultList();
        ....
    }</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>I didn't get to debug it completely, the code works but I'm not sure about locking because I keep seeing this log message from hibernate:</p>
<p>[timeoutScheduler-2] INFO&nbsp; hibernate.ejb.AbstractQueryImpl - Ignoring unrecognized query hint [javax.persistence.lock.timeout]</p>
<p>&nbsp;</p>
<p>which makes me think that hibernate is ignoring my hint,</p>
<p>any ideas someone?</p>
<p>&nbsp;</p>
<p>Thanks.</p>
<p>&nbsp;</p>
