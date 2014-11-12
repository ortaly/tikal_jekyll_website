---
layout: post
title: Albacore - build .Net application with Rake
created: 1279622626
permalink: albacore-build-net-application-with-rake
tags:
- .NET
- Rake
- Albacore
---
<p>&nbsp;</p>
<div>Rake is very popular in Ruby community framework to automate the building process.</div>
<div>Rake provides interesting language (internal DSL programmed in Ruby) to describe the build routines.</div>
<div>&nbsp;</div>
<div>Albacore is suite of Rake tasks that are very useful to build .Net application like running MSBuild, updating AssemblyInfo and etc.</div>
<div>&nbsp;</div>
<div><b><u>How to start </u></b></div>
<div>&nbsp;</div>
<div><b>First need to setup environment</b></div>
<div style="text-indent: -0.25in"><span>1.<span style="font: 7pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Install Ruby - I used IronRuby (<a href="http://ironruby.codeplex.com/">http://ironruby.codeplex.com/</a>) but it's not must</div>
<div style="text-indent: -0.25in">&nbsp;</div>
<div style="text-indent: -0.25in"><span>2.<span style="font: 7pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Install next libraries with Gem (in case of IronRuby use igem)</div>
<div style="text-indent: -0.25in; margin-left: 1in"><span>1.<span style="font: 7pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Install Rake with next command</div>
<div style="text-indent: 0.5in; margin-left: 1in">&nbsp;igem install rake</div>
<div style="text-indent: -0.25in; margin-left: 1in"><span>2.<span style="font: 7pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>Install Albacore with next commands</div>
<div style="text-indent: 0.5in; margin-left: 1in">igem install albacore</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>All installed Ruby utilities (like 'igem' or 'rake') are located in Ruby setup folder (for ex. C:\Program Files\IronRuby 1.0v4\bin)</div>
<div>&nbsp;</div>
<div><b>Define sample&nbsp;build</b></div>
<div>Sample build will update release version and build solution with MSBuild.</div>
<div>&nbsp;</div>
<pre class="brush: ruby;" title="code">
require 'rubygems'
require 'albacore'
     
 namespace :albacore do
    desc &quot;Build project&quot;
    task :sample =&gt; ['albacore:assemblyinfo', 'albacore:msbuild']
		
    desc &quot;Build solution with MSBuild&quot;
    Rake::MSBuildTask.new(:msbuild) do |msb|
		msb.properties :configuration =&gt; :Debug
        msb.targets [:Clean, :Build]
        msb.solution = &quot;AutoMapperStuff.sln&quot;
    end
	
    desc &quot;Update assembly info&quot;
    Rake::AssemblyInfoTask.new(:assemblyinfo) do |asm|
      asm.output_file = &quot;Properties/AssemblyInfo.cs&quot;
      asm.version = &quot;1.2.3.4&quot;
      asm.copyright = &quot;Copyright (c)2009 MyCompany.&quot;
    end

end
</pre>
<div>&nbsp;</div>
<div>Save the build file as rakefile.rb in project folder.</div>
<div>&nbsp;</div>
<div><b>Run sample build</b></div>
<div>Go to project folder(cd) and run the build process with next command</div>
<div class="rteindent1">rake albacore:sample</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Albacore project site&nbsp;<a href="http://albacorebuild.net/">http://albacorebuild.net/</a></div>
<div>&nbsp;</div>
<div>Interesting post about&nbsp;Albacore v0.2.0 from&nbsp;Derick Bailey&nbsp;<a href="http://www.lostechies.com/blogs/derickbailey/archive/2010/07/14/albacore-v0-2-0-preview-1-is-available.aspx">http://www.lostechies.com/blogs/derickbailey/archive/2010/07/14/albacore-v0-2-0-preview-1-is-available.aspx</a>&nbsp;</div>
<p class="MsoNormal"><o:p></o:p></p>
<p>&nbsp;</p>
