---
layout: post
title: 'MVC 4 beta: RegisterTemplateBundles and EnableDefaultBundles'
created: 1331813427
author: menny
permalink: /mvc-4-beta-registertemplatebundles-and-enabledefaultbundles
tags:
- .NET
---
<p>After trying to figure out why the bundling of all my JavaScript skips some files (like Knockout.js, and History.js) I opened the reflector to find out more. It seems that the <strong>RegisterTemplateBundles</strong> just adds the default JavaScript libraries, like JQuery and MicrosoftAjax, hardcoded. This means that they are the “template” when registering the template bundle.
<pre class="brush: csharp;">public void RegisterTemplateBundles()
{
    Bundle bundle = new Bundle("~/Scripts/js", new JsMinify());
    bool searchSubdirectories = false;
    bool throwIfNotExist = false;
    bundle.AddDirectory("~/Scripts", "jquery-*", searchSubdirectories, throwIfNotExist);
    bool flag3 = false;
    bool flag4 = false;
    bundle.AddDirectory("~/Scripts", "jquery.mobile*", flag3, flag4);
    bool flag5 = false;
    bool flag6 = false;
    bundle.AddDirectory("~/Scripts", "jquery-ui*", flag5, flag6);
    .
    .
    .
}
</pre>
<p>When calling <strong>EnableDefaultBundles</strong> a completely different thing happens: DynamicFolderBundles are created </p>
<pre class="brush: csharp;">public void EnableDefaultBundles()
{
    this.Add(new DynamicFolderBundle("js", JsMinify.Instance, "*.js"));
    this.Add(new DynamicFolderBundle("css", CssMinify.Instance, "*.css"));
}
</pre>
<p>If we try to figure out the DynamicFolderBundles we can see that code like this</p>
<pre class="brush: csharp;">var context = new BundleContext(new HttpContextWrapper(Context), new BundleCollection(), "~/Scripts/js");
System.IO.DirectoryInfo parent = new System.IO.DirectoryInfo(
    context.HttpContext.Server.MapPath(context.BundleVirtualPath)).Parent;


DynamicFolderBundle bundle = new DynamicFolderBundle("js", new JsMinify(), "*.js");

bundle.EnumerateFiles(context);

</pre>
<p>Results enumerating all the “*.js” files, which is exactly what we need. Frankly <strong>I think this is a bug</strong> in the beta since the global.ascx by default calls RegisterTemplateBundles instead of EnableDefaultBundles. This is important since when you add NuGet packages (like require.js) they will be added to the Scripts folder and won’t get bundled by default. I can see a reason for loading the extra (non template\common\default) JavaScript libraries with a custom bundle. But clearly I can see a better reason why to EnableDefaultBundles by default instead. </p>
