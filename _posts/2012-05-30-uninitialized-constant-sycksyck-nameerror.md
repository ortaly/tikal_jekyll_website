---
layout: post
title: Uninitialized constant Syck::Syck (NameError)
created: 1338394544
author: avit
permalink: /uninitialized-constant-sycksyck-nameerror
tags:
- Ruby
- web
---
<p>It’s old news for you devoted reader, but as you know I love coding with Ruby on Rails and that’s what my story for today is all about.</p>

<p>I just spent about an hour scratching my head and throwing my keyboard (don’t tell Jobs) around my home office on this issue.</p>

<p>I am upgrading an existing project (guess which…) from rails2 and ruby1.8.7 to rails3 and ruby 1.9.2.</p>

<p>First thing is of course installing bundler and working with the Gemfile (thank god).</p>

<p>So, when I did “bundle install” it crashed on me with this error message:</p>
<div class='highlight'><pre><code class='bash'>Fetching <span class='nb'>source </span>index <span class='k'>for </span>http://rubygems.org/
/Users/avitzurel/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/site_ruby/1.9.1/rubygems/specification.rb:289:in <span class='sb'>`</span>load<span class='s1'>': uninitialized constant Syck::Syck (NameError)</span>
<span class='s1'>	from /Users/avitzurel/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/site_ruby/1.9.1/rubygems/specification.rb:289:in `_load'</span>
	from /Users/avitzurel/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/site_ruby/1.9.1/rubygems/spec_fetcher.rb:133:in <span class='sb'>`</span>load<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/site_ruby/1.9.1/rubygems/spec_fetcher.rb:133:in `fetch_spec'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/remote_specification.rb:47:in <span class='sb'>`</span>_remote_specification<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/remote_specification.rb:53:in `method_missing'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:101:in <span class='sb'>`</span>block in __dependencies<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:98:in `each'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:98:in <span class='sb'>`</span>__dependencies<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:68:in `activate_platform'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:317:in <span class='sb'>`</span>resolve_requirement<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:287:in `block in resolve'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:286:in <span class='sb'>`</span>reverse_each<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:286:in `resolve'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:160:in <span class='sb'>`</span>start<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:128:in `block in resolve'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:127:in <span class='sb'>`</span>catch<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/resolver.rb:127:in `resolve'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/definition.rb:151:in <span class='sb'>`</span>resolve<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/definition.rb:90:in `specs'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/definition.rb:85:in <span class='sb'>`</span>resolve_remotely!<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/installer.rb:43:in `run'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/installer.rb:8:in <span class='sb'>`</span>install<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/cli.rb:220:in `install'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/vendor/thor/task.rb:22:in <span class='sb'>`</span>run<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/vendor/thor/invocation.rb:118:in `invoke_task'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/vendor/thor.rb:263:in <span class='sb'>`</span>dispatch<span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/lib/bundler/vendor/thor/base.rb:386:in `start'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/gems/bundler-1.0.17/bin/bundle:13:in <span class='sb'>`</span><top <span class='o'>(</span>required<span class='o'>)</span>><span class='s1'>'</span>
<span class='s1'>	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/bin/bundle:19:in `load'</span>
	from /Users/avitzurel/.rvm/gems/ruby-1.9.2-p290@rails_3_gogobot/bin/bundle:19:in <span class='sb'>`</span><main><span class='err'>'</span>
</code></pre>
</div>
<p>After digging around the web, reading some useless information that it’s relevance to my issue was close to zero, I updated rubygems on my system to the latest version and this solved the problem.</p>

<p>I executed this command:</p>
<div class='highlight'><pre><code class='bash'>gem update --system
</code></pre>
</div>
<p>Hope this saves you some time, if it does, drop me a comment let me know.</p>

<p>Thanks!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/Hm_bMYItXWE" height="1" width="1"/>
