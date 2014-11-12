---
layout: post
title: searching through the history of commands you ran in terminal
created: 1344862401
author: avit
permalink: /ruby/blog/searching-through-history-commands-you-ran-terminal
tags:
- Ruby
---
<p>Whenever I am logged in to a server or even when I am working on my own machine, I keep searching through the command history through up and down arrows.</p>
<p>While this can be efficient if you have 2-3 commands, it can be quite frustrating to find specific commands.</p>
<p>That is something I keep doing over and over again, and now I have a better way, I just grep through the list of commands, find the one I want, copy it and paste it into a new command, and I&rsquo;m done.</p>
<p>This saves me <strong>a lot</strong> of time.</p>
<p>Here&rsquo;s how:</p>
<p>To show the history of commands you just do:</p>
<figure class="code">
	<div class="highlight">
		<table>
			<tbody>
				<tr>
					<td class="gutter">
						<pre class="line-numbers">
<span class="line-number">1</span>
</pre>
					</td>
					<td class="code">
						<pre>
<code><span class="line">history</span></code></pre>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</figure>
<p>You probably know the rest, but you can just pipe the history into grep and search your history</p>
<figure class="code">
	<div class="highlight">
		<table>
			<tbody>
				<tr>
					<td class="gutter">
						<pre class="line-numbers">
<span class="line-number">1</span>
</pre>
					</td>
					<td class="code">
						<pre>
<code><span class="line">history | grep {command_or_part_of_command}</span></code></pre>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</figure>
<p>For example:</p>
<figure class="code">
	<div class="highlight">
		<table>
			<tbody>
				<tr>
					<td class="gutter">
						<pre class="line-numbers">
<span class="line-number">1</span>
</pre>
					</td>
					<td class="code">
						<pre>
<code><span class="line">history | grep cp -R</span></code></pre>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</figure>
<p>Enjoy!</p>
