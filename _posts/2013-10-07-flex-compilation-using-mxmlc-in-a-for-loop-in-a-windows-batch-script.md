---
layout: post
title: Flex compilation using mxmlc in a for loop in a windows batch script
created: 1381154906
author: gil
permalink: /devops/flex-compilation-using-mxmlc-loop-windows-batch-script
tags:
- DevOps
---
<p>Basically, what I have tried to do is using a Jenkins job to run on a windows machine, run over a few modules folders, get the mxml files under them and compile using mxmlc (flex compiler).</p>

<p>It worked very well but there was a problem when I have tried to catch the exit code of the compilation status.</p>

<p>The errorlevel parameter will have the correct value only outside of the for loop. Inside the for loop it&#39;ll always be equal to zero. This will not help me because in the end of the loop, it&#39;ll only hold the exit code of the last iteration.</p>

<p>To solve this I did the following:</p>

<figure class="code">
<pre>
<code class="shell">


</code></pre>

<p><code class="shell">setlocal enabledelayedexpansion</code></p>

<p><code class="shell">for %%x in (%Modules::= %) do (<br />
&nbsp; mxmlc src\Modules\%%x.mxml -source-path=src -load-config+=Build\Build-Config.xml -output=%deploymentDir%\App\Flex\Modules\%%x.swf<br />
&nbsp; IF !ERRORLEVEL! NEQ 0 exit 1<br />
)</code></p>
</figure>

<p><code class="shell"><code>&nbsp;</code></code></p>

<p><code class="shell"><code>&nbsp;</code></code></p>

<p><code class="shell"><code>The above syntax disables the global parameters and makes them local. That way, the ERROLEVEL with the &#39;!&#39; in the beginning and end of it will have the right value in each iteration and therefore will fail if one of the compilations fails.</code></code></p>

<p><code class="shell"><code>&nbsp;</code></code></p>
