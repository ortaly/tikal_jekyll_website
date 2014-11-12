---
layout: post
title: Regular expressions (Regex) in Dot.Net 1.1
created: 1250616251
permalink: regular-expressions-regex-in-dot-net-1-1
tags:
- .NET
- Dot.Net
- c#
---
Hey,
I need to create a regular expression with this rule: SpecificString*_1_*AnotherSpecificString. (the asterisk is any string in any length). how do I enforce such a rule using Regex.IsMatch()? (derives from System.Text.RegularExpressions)
I thought it should go like this: "SpecificString.*_1_.*.AnotherSpecificString" but it seems it passes things that shouldn't be passed..
Thanks!
