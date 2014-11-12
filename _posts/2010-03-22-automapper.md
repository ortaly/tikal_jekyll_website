---
layout: post
title: 'AutoMapper '
created: 1269266566
permalink: automapper
tags:
- .NET
- Dot.Net
- AutoMapper
- .Net Open Source
---
<p>In this post I want to overview AutoMapper library.</p>
<p>&nbsp;</p>
<p>AutoMapper is open-source project for object-to-object mapping.&nbsp;</p>
<p>It uses very nice syntax for mapping configuration based on generic and lambda.</p>
<p>The project is managed on Codeplex (http://www.codeplex.com/AutoMapper) &nbsp;and&nbsp;the source code can be found at GoogleCode &nbsp;(http://automapperhome.googlecode.com/).</p>
<p>&nbsp;</p>
<p>Object mapping is very useful strategy for transforming one type of object into another.&nbsp;</p>
<p>For ex. Business Object into POCO (CLR POJO) or DTO (Data Transfer Object).</p>
<p>&nbsp;</p>
<p>Lets define application domain:</p>
<pre class="brush: c#">
//Business Object
public class Task
{
	public string Name { get; set; }
	public DateTime DueTo { get; set; }
	public string GetDetails() { return &quot;details&quot;; }
	public TaskPriority Priority { get; set; }
	//...
}

//DTO
public class TaskDto
{
	public string Name { get; set; }
	public string DueTo { get; set; }
	public string Details { get; set; }
	public string PriorityCaption { get; set; }
}

public class TaskPriority
{
	public TaskPriority() {}

	public TaskPriority(string caption)
	{
		Caption = caption;
	}

	public string Caption { get; set; }
}

</pre>
<p>Manual conversion code will look like following:&nbsp;</p>
<pre class="brush: c#">
public static TaskDto MapManual(Task task)
{
	return new TaskDto
	{
		Name = task.Name,
		DueTo = task.DueTo.ToLongDateString(),
		Details = task.GetDetails(),
		PriorityCaption = task.Priority.Caption
	};
}

</pre>
<p>And now with AutoMapper:&nbsp;</p>
<pre class="brush: c#">
TaskDto taskDto = Mapper.Map&lt;Task, TaskDto&gt;(task);

</pre>
<p>&nbsp;Of course before need to define mapping configuration:</p>
<pre class="brush: c#">
public static void InitMappings()
{
	Mapper.CreateMap&lt;Task, TaskDto&gt;();
	
	//Recommended to check if the configuration is valid
	Mapper.AssertConfigurationIsValid();
}

</pre>
<p>AutoMapper supports default mappings like matching property names, mapping method GetX() to property X,&nbsp;nested properties (Priority.Caption maps to PriorityCaption by assuming a PascalCase naming convention) and etc.</p>
<p>&nbsp;</p>
<p>If default mappings and default conversions are not enough, &nbsp;possible to use custom converters or custom mapping configuration.</p>
<p>&nbsp;</p>
<p>Let's write custom converter - for ex. from DateTime to string (DueTo property)</p>
<p>&nbsp;</p>
<p>First implement type converter:</p>
<pre class="brush: c#">
public class DateTimeTypeConverter : TypeConverter&lt;DateTime, string&gt;
{
	protected override string ConvertCore(DateTime source)
	{
		return source.ToLongDateString();
	}
}
</pre>
<p>And add to mapping configuration:</p>
<pre class="brush: c#">
public static void InitMappins()
{
	Mapper.CreateMap&lt;DateTime, string&gt;().ConvertUsing(new DateTimeTypeConverter());
	Mapper.CreateMap&lt;Task, TaskDto&gt;();
	
	Mapper.AssertConfigurationIsValid();
}


</pre>
<p>Now let's write&nbsp;custom mapping configuration:</p>
<pre class="brush: c#">
public static void InitMappings()
{
	Mapper.CreateMap&lt;DateTime, string&gt;().ConvertUsing(new DateTimeTypeConverter());
	
	Mapper.CreateMap&lt;Task, TaskDto&gt;()
		.ForMember(dest =&gt; dest.Name, opt =&gt; opt.MapFrom(src =&gt; src.Name))
		.ForMember(dest =&gt; dest.DueTo, opt =&gt; opt.MapFrom(src =&gt; src.DueTo))
		.ForMember(dest =&gt; dest.Details, opt =&gt; opt.MapFrom(src =&gt; src.GetDetails()))
		.ForMember(dest =&gt; dest.PriorityCaption, opt =&gt; opt.MapFrom(src =&gt; src.Priority.Caption));

	Mapper.AssertConfigurationIsValid();
}
</pre>
<p>&nbsp;&nbsp;</p>
<p>General AutoMapper features:</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Flattening</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Projection</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Configuration Validation</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Lists and Arrays</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Nested Mappings</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Custom Type Converters</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Custom Value Resolvers</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Custom Value Formatters</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>Null Substitution</p>
<p>&nbsp;&nbsp;&nbsp;</p>
<p>&nbsp;Currently the project documentation is not full but covers basic features.&nbsp;</p>
<p>&nbsp;In additional possible to lean a lot from source code that consists samples and unit tests.</p>
<p>&nbsp;</p>
<p>&nbsp;Alternative tools:</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>BLToolkit &nbsp; &nbsp; &nbsp;http://bltoolkit.net</p>
<p><span class="Apple-tab-span" style="white-space:pre">	</span>EmitMapper &nbsp;http://emitmapper.codeplex.com</p>
<p>&nbsp;</p>
<p>&nbsp;Path to source http://github.com/lm2000/AutoMapperStuff</p>
<p>&nbsp;</p>
